/**
 * GET /api/institution/setup-me
 * Crée l'établissement demo pour l'utilisateur connecté.
 * Route temporaire — à désactiver après usage.
 */
import { auth, currentUser } from "@clerk/nextjs/server";
import { createInstitution, getUserInstitution, joinInstitution } from "@/lib/supabase";

const SETUP_SECRET = process.env.ADMIN_SECRET;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!SETUP_SECRET || secret !== SETUP_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connecte-toi d'abord sur cvadapt.eu" }, { status: 401 });
  }

  const user = await currentUser();
  const adminEmail = user?.emailAddresses?.[0]?.emailAddress || "";

  // Récupère les paramètres ou utilise les valeurs par défaut
  const name = searchParams.get("name") || "BTS Montaigne Bordeaux";
  const slug = searchParams.get("slug") || "bts-montaigne-bordeaux";
  const plan = searchParams.get("plan") || "starter";

  try {
    // Vérifie si l'institution existe déjà
    const existing = await getUserInstitution(userId);
    if (existing) {
      return Response.json({
        message: "Établissement déjà existant.",
        institution: existing,
        dashboard: "https://cvadapt.eu/institution/dashboard",
        inviteLink: `https://cvadapt.eu/join/${existing.slug}`,
      });
    }

    const institution = await createInstitution({
      name,
      slug,
      type: "bts",
      plan,
      adminUserId: userId,
      adminEmail,
    });

    // Rattache l'admin comme membre aussi
    await joinInstitution(institution.id, userId, adminEmail);

    return Response.json({
      success: true,
      institution,
      dashboard: "https://cvadapt.eu/institution/dashboard",
      inviteLink: `https://cvadapt.eu/join/${slug}`,
    });
  } catch (err) {
    if (err.code === "23505") {
      return Response.json({ error: `Le slug "${slug}" est déjà pris. Ajoute ?slug=autre-nom dans l'URL.` }, { status: 409 });
    }
    return Response.json({ error: err.message }, { status: 500 });
  }
}
