import Anthropic from "@anthropic-ai/sdk";
import { alertCronFailure } from "@/lib/monitoring";

const BASE_URL = "https://postulera.com";

const DAILY_THEMES = [
  { stat: "75%",     statLabel: "des CV filtrés sans jamais être lus",              tip: "Pas parce que tu n'étais pas qualifié. Parce que le filtre ne t'a pas laissé passer." },
  { stat: "6 sec",   statLabel: "c'est le temps d'un recruteur sur un CV",          tip: "Postulera structure ton CV pour ces 6 secondes qui font tout." },
  { stat: "0",       statLabel: "réponse. C'est ce qu'on reçoit sans réseau",       tip: "J'ai vécu ça. C'est pour ça que j'ai créé Postulera." },
  { stat: "30s",     statLabel: "pour adapter ton CV à une offre",                  tip: "Le même CV pour toutes les offres, c'est la première erreur à éviter." },
  { stat: "250",     statLabel: "candidatures reçues par offre en moyenne",         tip: "Les mots-clés de l'offre dans ton CV font toute la différence." },
  { stat: "3×",      statLabel: "plus de rappels avec un CV adapté à l'offre",      tip: "Adapter son CV n'est plus réservé à ceux qui ont du temps ou du réseau." },
  { stat: "1er filtre", statLabel: "c'est un algorithme, pas un humain",            tip: "Postulera t'aide à passer ce filtre. Le reste, c'est toi." },
];

export async function GET(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const secret = process.env.CRON_SECRET;
  if (!secret) return Response.json({ error: "Non configuré" }, { status: 500 });
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const makeWebhookUrl = process.env.MAKE_INSTAGRAM_WEBHOOK;
  if (!makeWebhookUrl) return Response.json({ error: "MAKE_INSTAGRAM_WEBHOOK non configuré" }, { status: 500 });

  const dayNum = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const theme = DAILY_THEMES[dayNum % DAILY_THEMES.length];

  try {
    // 1. Générer la caption avec Claude
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: "Tu écris des captions Instagram courtes pour Postulera (postulera.com). Ton direct, une stat par post, pas de fioriture.",
      messages: [{
        role: "user",
        content: `Écris une caption Instagram pour ce post :
Stat : ${theme.stat} — ${theme.statLabel}
Conseil : ${theme.tip}

Règles :
- 3-4 phrases maximum
- Commence par la stat
- Mentionne postulera.com une fois
- Termine par une question courte
- 5 hashtags : #emploi #CV #ATS #recrutement #alternance
- Aucune phrase cliché type "tu savais que"

Caption uniquement, sans introduction.`,
      }],
    });

    const caption = message.content[0].text;

    // 2. Construire l'URL de l'image (stat card générée dynamiquement, convertie en JPEG via wsrv.nl)
    // Instagram Graph API exige du JPEG — wsrv.nl proxie l'image et la convertit
    const ogUrl = `${BASE_URL}/api/og-image?stat=${encodeURIComponent(theme.stat)}&statLabel=${encodeURIComponent(theme.statLabel)}&tip=${encodeURIComponent(theme.tip)}`;
    const imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(ogUrl)}&output=jpg&w=1080&h=1080`;

    // 3. Envoyer à Make.com → Instagram
    const makeRes = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
        date: new Date().toLocaleDateString("fr-FR"),
      }),
    });

    if (!makeRes.ok) {
      throw new Error(`Make.com webhook Instagram failed: ${makeRes.status}`);
    }

    return Response.json({ success: true, theme: theme.stat, imageUrl });

  } catch (error) {
    console.error("Instagram cron error:", error);
    await alertCronFailure("instagram-post", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
