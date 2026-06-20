import { Resend } from "resend";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dhofekpfpunvabcrbfek.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email } = await request.json();

  if (!email) return Response.json({ error: "Email requis" }, { status: 400 });

  // Génère le lien de réinitialisation via Supabase Admin API
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "recovery",
      email,
      options: { redirect_to: "https://postulera.com/reset-password" },
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.action_link) {
    return Response.json({ error: "Email non trouvé" }, { status: 400 });
  }

  // Envoie l'email via Resend avec un beau template
  await resend.emails.send({
    from: "Postulera <contact@postulera.com>",
    to: email,
    subject: "Réinitialise ton mot de passe Postulera",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:32px 40px;text-align:center;">
            <span style="font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Postulera</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="font-size:20px;font-weight:700;color:#0f172a;margin-bottom:12px;">Réinitialise ton mot de passe</h2>
            <p style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:28px;">
              Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous — ce lien est valable <strong>1 heure</strong>.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
              <tr>
                <td style="background:#2563eb;border-radius:10px;">
                  <a href="${data.action_link}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;">
                    Réinitialiser mon mot de passe →
                  </a>
                </td>
              </tr>
            </table>
            <p style="font-size:13px;color:#94a3b8;text-align:center;">Si tu n'as pas demandé ça, ignore cet email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f1f5f9;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">© 2026 Postulera · <a href="https://postulera.com" style="color:#94a3b8;">postulera.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  return Response.json({ ok: true });
}
