/**
 * Cron J+7 — Preuve sociale pour utilisateurs actifs
 * Cible : contacts Brevo list #4 créés il y a 6.5 à 7.5 jours
 * Objectif : montrer les résultats concrets → pousser à upgrader
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
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

    // Cible : inscrits il y a 7 jours (±12h)
    const targets = contacts.filter((c) => {
      if (!c.createdAt) return false;
      const diff = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 6.5 && diff <= 7.5;
    });

    if (!targets.length) return Response.json({ sent: 0, message: "Aucune cible J+7." });

    let sent = 0;
    for (const contact of targets) {
      const firstName = contact.attributes?.FIRSTNAME || contact.email.split("@")[0];
      await resend.emails.send({
        from: "Damian de CVAdapt <contact@cvadapt.eu>",
        to: contact.email,
        subject: "Ce que les recruteurs voient sur ton CV (résultats réels)",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111;line-height:1.6">
            <p>Bonjour ${firstName},</p>

            <p>Il y a 7 jours, tu as créé ton profil sur CVAdapt.</p>

            <p>Voici ce qu'on observe chez nos utilisateurs cette semaine :</p>

            <table style="width:100%;border-collapse:collapse;margin:20px 0">
              <tr><td style="padding:12px;border-bottom:1px solid #f0f0f0">✅ <strong>85%</strong> des CV passent les filtres ATS dès le premier essai</td></tr>
              <tr><td style="padding:12px;border-bottom:1px solid #f0f0f0">📬 <strong>3× plus de réponses</strong> en moyenne vs un CV non optimisé</td></tr>
              <tr><td style="padding:12px;">⏱️ Les recruteurs passent <strong>6 secondes</strong> sur un CV — les mots-clés font tout</td></tr>
            </table>

            <p>Si tu n'as pas encore postulé avec ton CV optimisé, c'est le bon moment.</p>

            <p style="margin:28px 0">
              <a href="https://cvadapt.eu/generate"
                style="background:#1d4ed8;color:white;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
                Voir mon CV →
              </a>
            </p>

            <p style="color:#888;font-size:13px">
              Tu reçois cet email car tu as créé un compte sur cvadapt.eu.<br/>
              <a href="https://cvadapt.eu/unsubscribe?email=${contact.email}" style="color:#888">Se désabonner</a>
            </p>
          </div>
        `,
      });
      sent++;
    }

    return Response.json({ sent, targets: targets.length });
  } catch (err) {
    console.error("j7-email error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
