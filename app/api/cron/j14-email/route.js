/**
 * Cron J+14 — Dernière relance / offre limitée
 * Cible : contacts Brevo list #4 créés il y a 13.5 à 14.5 jours, pas encore upgradés
 * Objectif : dernière chance de conversion avec promo
 */
import { Resend } from "resend";
import { j14Email, j14EmailEN } from "@/lib/email-templates";

// resend initialized per-request
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!CRON_SECRET) return Response.json({ error: "Non configuré" }, { status: 500 });
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const brevoRes = await fetch(
      `https://api.brevo.com/v3/contacts?listId=4&limit=100&offset=0&sort=desc`,
      { headers: { accept: "application/json", "api-key": process.env.BREVO_API_KEY } }
    );

    if (!brevoRes.ok) return Response.json({ error: "Erreur Brevo" }, { status: 500 });

    const { contacts } = await brevoRes.json();
    if (!contacts?.length) return Response.json({ sent: 0, message: "Aucun contact." });

    // Cible : inscrits il y a 14 jours (±12h)
    const targets = contacts.filter((c) => {
      if (!c.createdAt) return false;
      const diff = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 13.5 && diff <= 14.5;
    });

    if (!targets.length) return Response.json({ sent: 0, message: "Aucune cible J+14." });

    let sent = 0;
    for (const contact of targets) {
      const firstName = contact.attributes?.FIRSTNAME || contact.email.split("@")[0];
      const isEN = contact.attributes?.LANGUAGE === "en";
      await resend.emails.send({
        from: "Damian de CVAdapt <contact@cvadapt.eu>",
        to: contact.email,
        subject: isEN
          ? `It's been 2 weeks — a gift for ${firstName || "you"}`
          : "Ça fait 2 semaines — une offre pour toi",
        headers: {
          "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-Entity-Ref-ID": `cron-j14-${contact.email}-${new Date().toISOString().split("T")[0]}`,
        },
        html: isEN ? j14EmailEN({ prenom: firstName }) : j14Email({ prenom: firstName }),
      });
      sent++;
    }

    return Response.json({ sent, targets: targets.length });
  } catch (err) {
    console.error("j14-email error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
