/**
 * Cron J+14 — Dernière relance / offre limitée
 * Cible : contacts Brevo list #4 créés il y a 13.5 à 14.5 jours, pas encore upgradés
 * Objectif : dernière chance de conversion avec promo
 */
import { Resend } from "resend";

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
      await resend.emails.send({
        from: "Damian de CVAdapt <contact@cvadapt.eu>",
        to: contact.email,
        subject: "Ça fait 2 semaines — une offre pour toi",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111;line-height:1.6">
            <p>Bonjour ${firstName},</p>

            <p>Ça fait 2 semaines que tu as créé ton profil sur CVAdapt.</p>

            <p>Je voulais juste te faire signe : si tu cherches encore un poste,
            les fonctionnalités premium font vraiment la différence — score ATS complet,
            mots-clés manquants identifiés, lettre de motivation incluse.</p>

            <div style="background:#f0f7ff;border-radius:12px;padding:20px;margin:24px 0;border-left:4px solid #1d4ed8">
              <p style="margin:0;font-weight:700;color:#1d4ed8;font-size:16px">-20% sur le premier mois</p>
              <p style="margin:8px 0 0;color:#374151">Code : <code style="background:#dbeafe;padding:3px 8px;border-radius:4px;font-weight:700">CV20</code></p>
            </div>

            <p style="margin:28px 0">
              <a href="https://cvadapt.eu/tarifs?promo=CV20"
                style="background:#1d4ed8;color:white;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
                Voir les offres →
              </a>
            </p>

            <p style="color:#888;font-size:12px">Offre valable 72h.</p>

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
    console.error("j14-email error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
