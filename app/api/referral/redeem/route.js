/**
 * POST /api/referral/redeem
 * Crédite +2 CV gratuits au nouvel utilisateur (referee)
 * et +1 CV au parrain (referrer) via son code.
 */
import { auth, clerkClient } from "@clerk/nextjs/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Non authentifié" }, { status: 401 });

  // Rate limit : 5 tentatives par IP par heure (anti brute-force)
  const ip = getClientIp(req);
  const { allowed } = rateLimit(`referral:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return Response.json({ error: "Trop de tentatives. Réessaie dans 1 heure." }, { status: 429 });
  }

  const { refCode } = await req.json();
  if (!refCode || typeof refCode !== "string" || refCode.length < 6) {
    return Response.json({ error: "Code invalide" }, { status: 400 });
  }

  const clerk = await clerkClient();

  // Vérifier que le user actuel n'a pas déjà utilisé un code parrainage
  const me = await clerk.users.getUser(userId);
  if (me.unsafeMetadata?.referredBy) {
    return Response.json({ error: "Code déjà utilisé" }, { status: 409 });
  }

  // Trouver le parrain par son refCode (les 10 premiers chars alphanum de son userId)
  let referrer = null;
  try {
    const { data: users } = await clerk.users.getUserList({ limit: 500 });
    referrer = users.find(u => {
      const code = u.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toLowerCase();
      return code === refCode.toLowerCase() && u.id !== userId;
    });
  } catch (e) {
    console.error("Referral search error:", e);
    return Response.json({ error: "Erreur recherche parrain" }, { status: 500 });
  }

  if (!referrer) {
    return Response.json({ error: "Code parrain introuvable" }, { status: 404 });
  }

  // Créditer le nouveau user : +2 CV (bonus)
  const myMeta = me.unsafeMetadata || {};
  const myBonus = parseInt(myMeta.referralBonus || 0) + 2;
  await clerk.users.updateUser(userId, {
    unsafeMetadata: { ...myMeta, referredBy: refCode, referralBonus: myBonus },
  });

  // Créditer le parrain : +1 CV bonus
  const refMeta = referrer.unsafeMetadata || {};
  const refBonus = parseInt(refMeta.referralBonus || 0) + 1;
  const refCount = parseInt(refMeta.referralCount || 0) + 1;
  await clerk.users.updateUser(referrer.id, {
    unsafeMetadata: { ...refMeta, referralBonus: refBonus, referralCount: refCount },
  });

  return Response.json({ success: true, bonusAdded: 2 });
}
