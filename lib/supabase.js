import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_KEY  = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("SUPABASE_URL et SUPABASE_ANON_KEY sont requis");
}

// Client Supabase — utilisé uniquement côté serveur (API routes)
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Sauvegarde un CV généré dans l'historique
 */
export async function saveCV({ userId, nom, offre, template, cvHtml, scoreAts }) {
  const offre_snippet = offre?.slice(0, 300) || "";

  const { data, error } = await supabase
    .from("cv_history")
    .insert({
      user_id:      userId,
      nom:          nom || "",
      offre_snippet,
      template:     template || "moderne",
      cv_html:      cvHtml,
      score_ats:    scoreAts || null,
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { error } = await supabase
    .from("cv_history")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}
