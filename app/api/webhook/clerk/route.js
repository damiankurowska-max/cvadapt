import { Webhook } from "svix";

export const runtime = "nodejs";

const BREVO_LIST_ID = 4; // cvadapt-free-users

/**
 * Ajoute ou met à jour un contact dans Brevo (liste cvadapt-free-users #4)
 */
async function addToBrevo({ email, firstName, lastName }) {
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: firstName || "",
        LASTNAME: lastName || "",
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true, // si le contact existe déjà, on l'ajoute quand même à la liste
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${err}`);
  }

  return res.json().catch(() => ({}));
}

export async function POST(request) {
  // ── 1. Vérification signature Clerk (svix) ───────────────────────────────
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET non défini");
    return Response.json({ error: "Configuration manquante" }, { status: 500 });
  }

  const svixId        = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Headers svix manquants" }, { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Clerk webhook signature invalide:", err.message);
    return Response.json({ error: "Signature invalide" }, { status: 400 });
  }

  // ── 2. Traitement de l'événement user.created ────────────────────────────
  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      console.warn(`user.created sans email (userId: ${id})`);
      return Response.json({ received: true });
    }

    try {
      await addToBrevo({ email, firstName: first_name, lastName: last_name });
      console.log(`✅ Brevo: ${email} ajouté à la liste cvadapt-free-users (#${BREVO_LIST_ID})`);
    } catch (err) {
      // On ne bloque pas Clerk — on log l'erreur seulement
      console.error(`❌ Brevo ajout échoué pour ${email}:`, err.message);
    }
  }

  return Response.json({ received: true });
}
