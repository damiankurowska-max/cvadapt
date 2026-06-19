/**
 * Script one-shot : envoie l'email de rebrand CVAdapt → Postulera aux 10 utilisateurs réels.
 * Usage : RESEND_API_KEY=re_xxx node scripts/send-rebrand-email.js
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) { console.error("RESEND_API_KEY manquant"); process.exit(1); }

const users = [
  { email: "marie-ines.s@hotmail.fr",          prenom: "Marie-Inès" },
  { email: "fiacrezossou13@gmail.com",          prenom: null },
  { email: "mahanoanais@gmail.com",             prenom: "Anaïs" },
  { email: "amine.gaman99@gmail.com",           prenom: "Amine" },
  { email: "annakasri43@gmail.com",             prenom: "Anaïs" },
  { email: "renaissance34.loison@gmail.com",    prenom: null },
  { email: "emilie.delva@gmail.com",            prenom: "Émilie" },
  { email: "valentin9862@gmail.com",            prenom: null },
  { email: "marie.wissler12@gmail.com",         prenom: null },
  { email: "marine.provost1402@gmail.com",      prenom: "Marine" },
];

function buildHtml(prenom) {
  const salutation = prenom ? `Salut ${prenom},` : "Bonjour,";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7AAAF9 0%,#3B6EE8 100%);padding:32px 40px;text-align:center;">
            <span style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Postulera</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 20px;font-size:16px;color:#111827;line-height:1.6;">${salutation}</p>
            <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">
              Une petite nouvelle importante : <strong>CVAdapt change de nom et devient Postulera.</strong>
            </p>
            <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">
              Ton compte est toujours actif — même identifiants, mêmes CV générés, rien ne change de ton côté.
            </p>
            <p style="margin:0 0 32px;font-size:16px;color:#374151;line-height:1.6;">
              Le site est maintenant sur <strong>postulera.com</strong>.
            </p>
            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td style="background:#3B6EE8;border-radius:8px;">
                  <a href="https://postulera.com" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                    Accéder à Postulera →
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-size:15px;color:#6b7280;line-height:1.6;">
              Pourquoi ce changement ? Le nom <em>Postulera</em> colle mieux à ce qu'on fait : t'aider à postuler plus efficacement, pas juste générer un CV.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
              — Damian<br>
              <span style="color:#6b7280;">Fondateur de Postulera</span>
            </p>
            <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">
              Tu reçois cet email car tu as un compte sur postulera.com (anciennement cvadapt.eu).<br>
              <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmail(user) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Damian — Postulera <contact@postulera.com>",
      to: user.email,
      reply_to: "contact@postulera.com",
      subject: "CVAdapt devient Postulera — ton compte est toujours actif",
      html: buildHtml(user.prenom),
      headers: {
        "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || JSON.stringify(data));
  return data.id;
}

async function main() {
  console.log(`Envoi à ${users.length} utilisateurs...\n`);
  for (const user of users) {
    try {
      const id = await sendEmail(user);
      console.log(`✓ ${user.email} (id: ${id})`);
    } catch (err) {
      console.error(`✗ ${user.email} — ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log("\nTerminé.");
}

main();
