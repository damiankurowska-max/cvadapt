/**
 * POST /api/institution/create
 * Crée un établissement après paiement Stripe (ou manuellement par l'admin Damian).
 * Protégé par ADMIN_SECRET. Si adminUserId est absent, utilise le user Clerk authentifié.
 */
import { auth, currentUser } from "@clerk/nextjs/server";
import { createInstitution } from "@/lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function POST(request) {
  // Auth : ADMIN_SECRET requis
  const authHeader = request.headers.get("authorization");
  if (!ADMIN_SECRET || authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, type, plan, stripeCustomerId, stripeSubscriptionId } = body;
  let { adminUserId, adminEmail } = body;

  // Si adminUserId non fourni, utilise le user Clerk connecté
  if (!adminUserId) {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "adminUserId requis (ou connecte-toi)." }, { status: 400 });
    }
    adminUserId = userId;
    if (!adminEmail) {
      const user = await currentUser();
      adminEmail = user?.emailAddresses?.[0]?.emailAddress || "";
    }
  }

  if (!name || !slug || !adminUserId || !adminEmail) {
    return Response.json({ error: "Champs manquants : name, slug, adminEmail." }, { status: 400 });
  }

  try {
    const institution = await createInstitution({
      name, slug, type, plan,
      adminUserId, adminEmail,
      stripeCustomerId, stripeSubscriptionId,
    });
    return Response.json({ success: true, institution });
  } catch (err) {
    if (err.code === "23505") {
      return Response.json({ error: "Ce slug est déjà utilisé." }, { status: 409 });
    }
    console.error("create institution error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
