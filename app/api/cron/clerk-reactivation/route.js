/**
 * Cron MRE : réactivation des utilisateurs Clerk inactifs
 * Cible : inscrits il y a 2-6 jours, plan free, cvCount >= 1 mais < 3, pas abonnés
 * Déclenché quotidiennement à 11h
 */
import { Resend } from "resend";

const CRON_SECRET = process.env.CRON_SECRET;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

async function getAllClerkUsers() {
  const users = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const res = await fetch(`https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}&order_by=-created_at`, {
      headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` },
    });
    if (!res.ok) throw new Error(`Clerk API error: ${res.status}`);
    const page = await res.json();
    if (!page.length) break;
    users.push(...page);
    if (page.length < limit) break;
    offset += limit;
  }
  return users;
}

function buildHtml(prenom, cvCount) {
  const remaining = 3 - cvCount;
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#7AAAF9,#3B6EE8);padding:28px 40px;text-align:center;">
            <span style="font-size:26px;font-weight:800;color:#fff;">Postulera</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 18px;font-size:16px;color:#111827;">${prenom ? `Salut ${prenom},` : "Bonjour,"}</p>
            <p style="margin:0 0 18px;font-size:16px;color:#374151;line-height:1.6;">
              Tu as généré ${cvCount} CV avec Postulera — ${remaining === 1 ? "il t'en reste encore 1 gratuit" : `il t'en reste encore ${remaining} gratuits`}.
            </p>
            <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.6;">
              Chaque offre mérite un CV adapté. Les recruteurs reçoivent en moyenne <strong>250 candidatures</strong> par poste — un CV non-optimisé passe directement à la corbeille.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.6;">
              30 secondes suffisent. Colle l'offre, génère le CV.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td style="background:#3B6EE8;border-radius:8px;">
                  <a href="https://postulera.com/generate" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#fff;text-decoration:none;">
                    Générer mon CV maintenant →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:14px;color:#374151;">— Damian<br><span style="color:#6b7280;">Postulera</span></p>
            <p style="margin:12px 0 0;font-size:11px;color:#9ca3af;">
              <a href="mailto:contact@postulera.com?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function GET(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!CRON_SECRET || request.headers.get("authorization") !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (!CLERK_SECRET_KEY) {
    return Response.json({ error: "CLERK_SECRET_KEY manquant" }, { status: 500 });
  }

  try {
    const users = await getAllClerkUsers();
    const now = Date.now();

    const targets = users.filter(u => {
      const createdAt = new Date(u.created_at).getTime();
      const daysSince = (now - createdAt) / (1000 * 60 * 60 * 24);
      const meta = u.unsafe_metadata || {};
      const isPro = meta.isPro || false;
      const cvCount = parseInt(meta.cvCount || 0);
      // Signed up 2-6 days ago, used 1-2 CVs, not subscribed
      return daysSince >= 2 && daysSince <= 6 && !isPro && cvCount >= 1 && cvCount < 3;
    });

    if (!targets.length) return Response.json({ sent: 0, message: "Aucune cible MRE." });

    let sent = 0;
    const errors = [];
    const dateStr = new Date().toISOString().split("T")[0];

    for (const u of targets) {
      const email = u.email_addresses?.[0]?.email_address;
      if (!email) continue;
      const prenom = u.first_name || "";
      const cvCount = parseInt(u.unsafe_metadata?.cvCount || 0);

      try {
        await resend.emails.send({
          from: "Damian — Postulera <contact@postulera.com>",
          to: email,
          replyTo: "contact@postulera.com",
          subject: `${prenom ? prenom + ", tu" : "Tu"} as encore ${3 - cvCount} CV gratuit${3 - cvCount > 1 ? "s" : ""} ⚡`,
          html: buildHtml(prenom, cvCount),
          headers: {
            "List-Unsubscribe": "<mailto:contact@postulera.com?subject=unsubscribe>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            "X-Entity-Ref-ID": `mre-${u.id}-${dateStr}`,
          },
        });
        sent++;
      } catch (err) {
        errors.push({ email, error: err.message });
      }
      await new Promise(r => setTimeout(r, 150));
    }

    console.log(`MRE cron: ${sent}/${targets.length} emails envoyés`);
    return Response.json({ sent, total: targets.length, errors: errors.length ? errors : undefined });
  } catch (err) {
    console.error("MRE cron error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
