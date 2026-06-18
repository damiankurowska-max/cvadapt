/**
 * POST /api/admin/broadcast
 * Envoie un email à tous les contacts Brevo liste #4
 * Requiert : Authorization: Bearer <CRON_SECRET>
 *
 * Body optionnel : { "dryRun": true } pour simuler sans envoyer
 */
import { Resend } from "resend";
import { broadcastEmail } from "@/lib/email-templates";

const CRON_SECRET = process.env.CRON_SECRET;
const BREVO_LIST_ID = 4;
const BREVO_PAGE_SIZE = 100;

async function getAllBrevoContacts() {
  const contacts = [];
  let offset = 0;

  while (true) {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts?listId=${BREVO_LIST_ID}&limit=${BREVO_PAGE_SIZE}&offset=${offset}&sort=desc`,
      { headers: { accept: "application/json", "api-key": process.env.BREVO_API_KEY } }
    );

    if (!res.ok) throw new Error(`Brevo API error: ${res.status}`);

    const { contacts: page, count } = await res.json();
    if (!page?.length) break;

    contacts.push(...page);

    if (contacts.length >= count || page.length < BREVO_PAGE_SIZE) break;
    offset += BREVO_PAGE_SIZE;
  }

  return contacts;
}

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Auth
  const authHeader = request.headers.get("authorization");
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body = {};
  try { body = await request.json(); } catch {}
  const dryRun = body.dryRun === true;

  try {
    const contacts = await getAllBrevoContacts();

    if (!contacts.length) {
      return Response.json({ sent: 0, total: 0, message: "Aucun contact dans la liste." });
    }

    const dateStr = new Date().toISOString().split("T")[0];
    let sent = 0;
    const errors = [];

    for (const contact of contacts) {
      const email = contact.email;
      const prenom = contact.attributes?.PRENOM || contact.attributes?.FIRSTNAME || "";

      if (dryRun) {
        sent++;
        continue;
      }

      try {
        await resend.emails.send({
          from: "Postulera <contact@cvadapt.eu>",
          to: email,
          replyTo: "contact@cvadapt.eu",
          subject: prenom
            ? `${prenom}, tu postules sans avoir de réponse ? Voilà pourquoi 🎯`
            : "Tu postules sans avoir de réponse ? Voilà pourquoi 🎯",
          html: broadcastEmail({ prenom }),
          headers: {
            "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            "X-Entity-Ref-ID": `broadcast-${email}-${dateStr}`,
          },
        });
        sent++;
      } catch (err) {
        errors.push({ email, error: err.message });
      }

      // Pause légère pour éviter le rate limit Resend (2 req/s)
      await new Promise((r) => setTimeout(r, 60));
    }

    console.log(`Broadcast ${dryRun ? "(dry run) " : ""}${sent}/${contacts.length} emails.`);

    return Response.json({
      sent,
      total: contacts.length,
      dryRun,
      errors: errors.length ? errors : undefined,
    });
  } catch (error) {
    console.error("Broadcast error:", error);
    return Response.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
