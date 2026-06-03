/**
 * POST /api/institution/join
 * Rattache l'utilisateur connecté à un établissement via son slug.
 * Appelé depuis la page /join/[slug] après connexion Clerk.
 */
import { auth } from "@clerk/nextjs/server";
import { getInstitutionBySlug, joinInstitution, getUserInstitution } from "@/lib/supabase";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connexion requise." }, { status: 401 });
  }

  const { slug } = await request.json();
  if (!slug) return Response.json({ error: "Slug manquant." }, { status: 400 });

  try {
    // Vérifie que l'établissement existe et est actif
    const institution = await getInstitutionBySlug(slug);
    if (!institution) {
      return Response.json({ error: "Établissement introuvable ou inactif." }, { status: 404 });
    }

    // Vérifie que l'user n'est pas déjà dans un autre établissement
    const existing = await getUserInstitution(userId);
    if (existing && existing.id !== institution.id) {
      return Response.json({ error: "Tu es déjà rattaché à un autre établissement." }, { status: 409 });
    }

    // Récupère l'email Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses?.[0]?.emailAddress || "";

    await joinInstitution(institution.id, userId, email);

    // Marque l'user comme membre institution dans Clerk metadata
    await clerk.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        ...user.unsafeMetadata,
        institutionId: institution.id,
        institutionSlug: institution.slug,
        institutionName: institution.name,
      },
    });

    return Response.json({
      success: true,
      institution: { id: institution.id, name: institution.name, slug: institution.slug, plan: institution.plan },
    });
  } catch (err) {
    console.error("join institution error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
