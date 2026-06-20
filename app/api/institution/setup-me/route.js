/**
 * GET /api/institution/setup-me
 * Crée l'établissement demo — lookup Clerk par email côté serveur.
 * Protégé par ADMIN_SECRET.
 */

import { createInstitution, getUserInstitution, joinInstitution } from "@/lib/supabase";

const SETUP_SECRET = process.env.ADMIN_SECRET;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!SETUP_SECRET || secret !== SETUP_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const adminEmail = searchParams.get("email") || "damiankurowska@icloud.com";
  const name  = searchParams.get("name")  || "BTS Montaigne Bordeaux";
  const slug  = searchParams.get("slug")  || "bts-montaigne-bordeaux";
  const plan  = searchParams.get("plan")  || "starter";

  // Lookup Clerk user by email (côté serveur, pas besoin de session)
  let adminUserId;
  try {
    const clerk = await clerkClient();
    const { data: users } = await clerk.users.getUserList({ emailAddress: [adminEmail] });
    if (!users || users.length === 0) {
      return Response.json({ error: `Aucun compte Clerk trouvé pour ${adminEmail}` }, { status: 404 });
    }
    adminUserId = users[0].id;
  } catch (err) {
    return Response.json({ error: `Erreur Clerk: ${err.message}` }, { status: 500 });
  }

  try {
    // Vérifie si déjà créé
    const existing = await getUserInstitution(adminUserId);
    if (existing) {
      return Response.json({
        message: "Établissement déjà existant.",
        institution: existing,
        dashboard: "https://postulera.com/institution/dashboard",
        inviteLink: `https://postulera.com/join/${existing.slug}`,
      });
    }

    const institution = await createInstitution({
      name, slug, type: "bts", plan,
      adminUserId, adminEmail,
    });

    await joinInstitution(institution.id, adminUserId, adminEmail);

    return Response.json({
      success: true,
      adminUserId,
      institution,
      dashboard: "https://postulera.com/institution/dashboard",
      inviteLink: `https://postulera.com/join/${slug}`,
    });
  } catch (err) {
    if (err.code === "23505") {
      return Response.json({ error: `Slug "${slug}" déjà pris.` }, { status: 409 });
    }
    return Response.json({ error: err.message }, { status: 500 });
  }
}
