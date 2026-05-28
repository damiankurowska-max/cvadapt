/**
 * Cron : envoie l'email J+2 aux nouveaux inscrits
 * Objet : "Ton CV est peut-être invisible pour les recruteurs"
 * Filtre : contacts Brevo list #4 créés il y a 1.5 à 2.5 jours
 */
import { Resend } from "resend";
import { j2Email } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
  if (!CRON_SECRET) {
    console.error("CRON_SECRET non configuré — cron désactivé");
    return Response.json({ error: "Non configuré" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const brevoRes = await fetch(
      `https://api.brevo.com/v3/contacts?listId=4&limit=100&offset=0&sort=desc`,
      { headers: { accept: "application/json", "api-key": process.env.BREVO_API_KEY } }
    );

    if (!brevoRes.ok) {
      return Response.json({ error: "Erreur Brevo" }, { status: 500 });
    }

    const { contacts } = await brevoRes.json();
    if (!contacts?.length) return Response.json({ sent: 0, message: "Aucun contact." });

    // Filtrer J+2 (1.5 à 2.5 jours)
    const targets = contacts.filter((c) => {
      if (!c.createdAt) return false;
      const diff = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 1.5 && diff <= 2.5;
    });

    if (!targets.length) return Response.json({ sent: 0, message: "Aucun contact J+2." });

    let sent = 0;
    const dateStr = new Date().toISOString().split("T")[0];

    for (const contact of targets) {
      const email = contact.email;
      const prenom = contact.attributes?.PRENOM || contact.attributes?.FIRSTNAME || "";
      try {
        await resend.emails.send({
          from: "CVAdapt <contact@cvadapt.eu>",
          to: email,
          replyTo: "contact@cvadapt.eu",
          subject: `${prenom ? prenom + ", ton" : "Ton"} CV est peut-être invisible pour les recruteurs`,
          html: j2Email({ prenom }),
          headers: {
            "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            "X-Entity-Ref-ID": `cron-j2-${email}-${dateStr}`,
          },
        });
        sent++;
      } catch (err) {
        console.error(`J+2 email failed for ${email}:`, err.message);
      }
    }

    console.log(`Cron J+2: ${sent}/${targets.length} emails envoyés.`);
    return Response.json({ sent, total: targets.length });
  } catch (error) {
    console.error("J+2 cron error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
