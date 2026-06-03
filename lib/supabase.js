import { createClient } from "@supabase/supabase-js";

// Client Supabase — initialisé à la demande pour éviter l'évaluation au build
let _client = null;
function getClient() {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("SUPABASE_URL et SUPABASE_ANON_KEY sont requis");
    _client = createClient(url, key);
  }
  return _client;
}

// Export nommé pour les fichiers qui importent { supabase }
export const supabase = new Proxy({}, {
  get(_, prop) { return getClient()[prop]; }
});

/**
 * Sauvegarde un CV généré dans l'historique
 */
export async function saveCV({ userId, nom, offre, template, cvHtml, scoreAts, institutionId }) {
  const offre_snippet = offre?.slice(0, 300) || "";

  const { data, error } = await getClient()
    .from("cv_history")
    .insert({
      user_id:        userId,
      nom:            nom || "",
      offre_snippet,
      template:       template || "moderne",
      cv_html:        cvHtml,
      score_ats:      scoreAts || null,
      institution_id: institutionId || null,
    })
    .select("id, created_at")
    .single();

  if (error) throw error;
  return data;
}

/**
 * Récupère l'historique CV d'un utilisateur (10 derniers)
 */
export async function getUserCVHistory(userId, limit = 10) {
  const { data, error } = await getClient()
    .from("cv_history")
    .select("id, nom, offre_snippet, template, score_ats, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Récupère un CV complet par ID (vérifie que ça appartient à l'user)
 */
export async function getCVById(id, userId) {
  const { data, error } = await getClient()
    .from("cv_history")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime un CV de l'historique
 */
export async function deleteCV(id, userId) {
  const { error } = await getClient()
    .from("cv_history")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

/* ─────────────────────────────────────────────────────────────
   INSTITUTIONS (B2B)
───────────────────────────────────────────────────────────── */

const PLAN_QUOTAS = { starter: 300, pro: 1000, campus: Infinity };

/**
 * Crée un établissement (appelé après paiement ou par l'admin)
 */
export async function createInstitution({ name, slug, type, plan, adminUserId, adminEmail, stripeCustomerId, stripeSubscriptionId }) {
  const { data, error } = await getClient()
    .from("institutions")
    .insert({
      name,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      type: type || "bts",
      plan: plan || "starter",
      quota_monthly: PLAN_QUOTAS[plan] === Infinity ? 999999 : (PLAN_QUOTAS[plan] || 300),
      admin_user_id: adminUserId,
      admin_email: adminEmail,
      stripe_customer_id: stripeCustomerId || null,
      stripe_subscription_id: stripeSubscriptionId || null,
      active: true,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

/**
 * Récupère un établissement par slug
 */
export async function getInstitutionBySlug(slug) {
  const { data, error } = await getClient()
    .from("institutions")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
}

/**
 * Récupère l'établissement d'un user (s'il est membre)
 */
export async function getUserInstitution(userId) {
  const { data, error } = await getClient()
    .from("institution_members")
    .select("institution_id, joined_at, institutions(*)")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data?.institutions || null;
}

/**
 * Rattache un user à un établissement
 */
export async function joinInstitution(institutionId, userId, email) {
  const { error } = await getClient()
    .from("institution_members")
    .upsert({ institution_id: institutionId, user_id: userId, email }, { onConflict: "institution_id,user_id" });

  if (error) throw error;
}

/**
 * Vérifie et consomme 1 unité du quota mensuel d'un établissement.
 * Retourne { allowed: boolean, remaining: number }
 */
export async function consumeInstitutionQuota(institutionId) {
  const db = getClient();

  // Récupère l'établissement
  const { data: inst, error: fetchErr } = await db
    .from("institutions")
    .select("quota_monthly, cv_used_this_month, month_key, plan")
    .eq("id", institutionId)
    .single();

  if (fetchErr) throw fetchErr;

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const isNewMonth = inst.month_key !== currentMonthKey;
  const used = isNewMonth ? 0 : inst.cv_used_this_month;

  if (inst.plan !== "campus" && used >= inst.quota_monthly) {
    return { allowed: false, remaining: 0 };
  }

  // Incrémente le compteur
  const { error: updateErr } = await db
    .from("institutions")
    .update({ cv_used_this_month: used + 1, month_key: currentMonthKey })
    .eq("id", institutionId);

  if (updateErr) throw updateErr;

  return {
    allowed: true,
    remaining: inst.plan === "campus" ? 999 : inst.quota_monthly - (used + 1),
  };
}

/**
 * Stats d'un établissement pour le dashboard admin
 */
export async function getInstitutionStats(institutionId) {
  const db = getClient();

  const [instRes, membersRes, cvsRes] = await Promise.all([
    db.from("institutions").select("*").eq("id", institutionId).single(),
    db.from("institution_members").select("user_id, email, joined_at").eq("institution_id", institutionId).order("joined_at", { ascending: false }),
    db.from("cv_history").select("id, score_ats, created_at").eq("institution_id", institutionId).order("created_at", { ascending: false }).limit(200),
  ]);

  if (instRes.error) throw instRes.error;

  const inst = instRes.data;
  const members = membersRes.data || [];
  const cvs = cvsRes.data || [];

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const isNewMonth = inst.month_key !== currentMonthKey;
  const usedThisMonth = isNewMonth ? 0 : inst.cv_used_this_month;

  const avgScore = cvs.filter(c => c.score_ats).length > 0
    ? Math.round(cvs.filter(c => c.score_ats).reduce((s, c) => s + c.score_ats, 0) / cvs.filter(c => c.score_ats).length)
    : null;

  return {
    institution: inst,
    members,
    totalMembers: members.length,
    totalCVs: cvs.length,
    cvsThisMonth: usedThisMonth,
    quotaMonthly: inst.quota_monthly,
    avgScore,
    recentCVs: cvs.slice(0, 10),
  };
}
