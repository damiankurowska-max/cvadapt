import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const THEMES = [
  { theme: "ATS", angle: "Révèle un fait choquant sur les ATS (filtres automatiques CV) et comment s'en sortir. Mentionne CVAdapt naturellement à la fin." },
  { theme: "Alternance", angle: "Conseil pratique pour décrocher une alternance en 2025. Public : étudiants français. Mentionne CVAdapt naturellement." },
  { theme: "Reconversion", angle: "Histoire inspirante fictive d'une reconversion réussie grâce à un CV bien adapté. Mentionne CVAdapt naturellement." },
  { theme: "Erreurs CV", angle: "Top 3 erreurs qui font rejeter un CV automatiquement. Conseil actionnable. Mentionne CVAdapt naturellement." },
  { theme: "Mots-clés", angle: "Pourquoi les mots-clés de l'offre doivent être dans ton CV mot pour mot. Exemple concret. Mentionne CVAdapt." },
  { theme: "Motivation", angle: "Conseil anti-procrastination pour les chercheurs d'emploi qui n'envoient pas assez de candidatures." },
  { theme: "Stats emploi", angle: "Une stat surprenante sur le marché de l'emploi français en 2025 et ce que ça implique pour les candidats." },
];

export async function GET(request) {
  // Vérification : header Vercel cron OU query param secret
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  const secret = process.env.CRON_SECRET || "cvadapt-cron-2025";

  const validHeader = authHeader === `Bearer ${secret}`;
  const validQuery = querySecret === secret;

  if (!validHeader && !validQuery) {
    return Response.json({ error: "Unauthorized", debug: { secret: secret?.slice(0, 4) + "..." } }, { status: 401 });
  }

  // Choisir un thème selon le jour de la semaine
  const dayOfWeek = new Date().getDay();
  const theme = THEMES[dayOfWeek % THEMES.length];

  try {
    // Générer le post LinkedIn avec Claude
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `Tu es un expert en personal branding et recrutement en France.
Génère un post LinkedIn en français, engageant et authentique pour promouvoir CVAdapt (cvadapt.eu).

Thème : ${theme.theme}
Angle : ${theme.angle}

Contraintes :
- 150-250 mots maximum
- Commence par une accroche forte (question choc, stat, ou affirmation surprenante)
- Ton conversationnel et authentique, pas corporate
- 2-3 emojis maximum, bien placés
- Termine par une question pour générer des commentaires
- Mentionne CVAdapt (cvadapt.eu) de façon naturelle, pas publicitaire
- Ajoute 3-5 hashtags pertinents à la fin (#emploi #CV #recrutement #alternance etc.)

Génère UNIQUEMENT le texte du post, sans introduction ni commentaire.`,
        },
      ],
    });

    const postContent = message.content[0].text;

    // Envoyer vers Make (LinkedIn automatique)
    const makeWebhookUrl = "https://hook.eu1.make.com/vjwe41hw42ua1l3aayf6rflbg6pzvahi";
    await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: theme.theme,
        content: postContent,
        date: new Date().toLocaleDateString("fr-FR"),
      }),
    });

    // Envoyer aussi par email (backup)
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: "damiankurowska@icloud.com",
      subject: `📱 Post LinkedIn publié — Thème : ${theme.theme}`,
      html: linkedinPostEmail({ theme: theme.theme, content: postContent }),
    });

    return Response.json({ success: true, theme: theme.theme });
  } catch (error) {
    console.error("LinkedIn cron error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function linkedinPostEmail({ theme, content }) {
  const date = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return `
  <html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 16px;">
      <tr><td align="center">
        <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr><td style="padding-bottom:20px;text-align:center;">
            <img src="https://cvadapt.eu/logo-256.png" width="40" height="40"
              alt="CVAdapt" style="border-radius:10px;display:inline-block;vertical-align:middle;margin-right:8px;" />
            <span style="font-size:18px;font-weight:800;color:#2563eb;vertical-align:middle;">CVAdapt</span>
          </td></tr>

          <!-- Card -->
          <tr><td style="background:#fff;border-radius:20px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

            <!-- Top banner -->
            <tr><td style="background:linear-gradient(135deg,#0077b5,#00a0dc);padding:20px 32px;">
              <p style="margin:0;font-size:12px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;">Post LinkedIn · ${date}</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:800;color:#fff;">Thème : ${theme}</p>
            </td></tr>

            <!-- Post content -->
            <tr><td style="padding:28px 32px;">
              <p style="margin:0 0 20px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Texte à copier-coller ↓</p>
              <div style="background:#f8faff;border:1px solid #dbeafe;border-radius:12px;padding:20px 24px;font-size:15px;color:#111827;line-height:1.7;white-space:pre-wrap;">${content}</div>
            </td></tr>

            <!-- Instructions -->
            <tr><td style="padding:0 32px 28px;">
              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#166534;">Comment publier (30 secondes) :</p>
                ${["Copie le texte ci-dessus", "Va sur linkedin.com → Démarrer un post", "Colle le texte → Publie"].map((s, i) => `
                  <p style="margin:0 0 4px;font-size:13px;color:#15803d;">
                    <span style="font-weight:700;">${i + 1}.</span> ${s}
                  </p>`).join("")}
              </div>
            </td></tr>

            <!-- CTA -->
            <tr><td style="padding:0 32px 28px;text-align:center;">
              <a href="https://www.linkedin.com/feed/" style="display:inline-block;background:#0077b5;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">
                Ouvrir LinkedIn →
              </a>
            </td></tr>

          </td></tr>

          <!-- Footer -->
          <tr><td style="padding-top:20px;text-align:center;">
            <p style="font-size:11px;color:#9ca3af;margin:0;">© 2025 CVAdapt · Cet email est envoyé automatiquement 3x/semaine</p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}
