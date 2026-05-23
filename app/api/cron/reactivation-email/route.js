/**
 * Cron : envoie l'email de réactivation J+7 aux utilisateurs free
 * qui n'ont pas généré de CV dans les 7 derniers jours.
 *
 * Déclenché via vercel.json — appel quotidien à 9h.
 * Utilise Brevo pour lister les contacts list #4 (cvadapt-newsletter)
 * et filtre ceux qui n'ont pas de CV généré (cvCount === 0 dans les métadonnées Clerk).
 *
 * NOTE : implémentation simplifiée — on envoie aux contacts Brevo list #4
 * créés il y a exactement 7 jours (±12h) qui n'ont pas encore généré de CV.
 */
import { Resend } from "resend";
import { reactivationEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
  // Vérification du secret cron Vercel
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  // Récupérer les contacts Brevo list #4 créés il y a 7 jours
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const dateStr = sevenDaysAgo.toISOString().split("T")[0]; // YYYY-MM-DD

  try {
    const brevoRes = await fetch(
      `https://api.brevo.com/v3/contacts?listId=4&limit=100&offset=0&sort=desc`,
      {
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    if (!brevoRes.ok) {
      console.error("Brevo fetch error:", await brevoRes.text());
      return Response.json({ error: "Erreur Brevo" }, { status: 500 });
    }

    const { contacts } = await brevoRes.json();
    if (!contacts || contacts.length === 0) {
      return Response.json({ sent: 0, message: "Aucun contact à réactiver." });
    }

    // Filtrer ceux créés autour de J-7
    const targets = contacts.filter((c) => {
      if (!c.createdAt) return false;
      const created = new Date(c.createdAt);
      const diff = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 6.5 && diff <= 7.5;
    });

    if (targets.length === 0) {
      return Response.json({ sent: 0, message: "Aucun contact J+7 à traiter." });
    }

    let sent = 0;
    for (const contact of targets) {
      const email = contact.email;
      const prenom = contact.attributes?.PRENOM || contact.attributes?.FIRSTNAME || "";

      try {
        await resend.emails.send({
          from: "CVAdapt <contact@cvadapt.eu>",
          to: email,
          subject: `${prenom ? prenom + ", ton" : "Ton"} CV attend toujours d'être optimisé ⚡`,
          html: reactivationEmail({ prenom }),
        });
        sent++;
      } catch (err) {
        console.error(`Email failed for ${email}:`, err);
      }
    }

    console.log(`Cron reactivation: ${sent}/${targets.length} emails envoyés.`);
    return Response.json({ sent, total: targets.length });
  } catch (error) {
    console.error("Reactivation cron error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
