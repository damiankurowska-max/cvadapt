/**
 * GET /api/institution/stats
 * Retourne les stats d'un établissement.
 * Accessible uniquement à l'admin (adminUserId === userId Clerk).
 */
import { auth } from "@clerk/nextjs/server";
import { getInstitutionStats, getUserInstitution } from "@/lib/supabase";

export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Connexion requise." }, { status: 401 });

  try {
    const institution = await getUserInstitution(userId);
    if (!institution) {
      return Response.json({ error: "Aucun établissement trouvé pour cet utilisateur." }, { status: 404 });
    }

    // Seul l'admin peut voir les stats complètes
    if (institution.admin_user_id !== userId) {
      return Response.json({ error: "Accès réservé à l'administrateur de l'établissement." }, { status: 403 });
    }

    const stats = await getInstitutionStats(institution.id);
    return Response.json(stats);
  } catch (err) {
    console.error("institution stats error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
