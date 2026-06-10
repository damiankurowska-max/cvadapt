import Anthropic from "@anthropic-ai/sdk";
import { alertCronFailure } from "@/lib/monitoring";

const BASE_URL = "https://cvadapt.eu";

const DAILY_THEMES = [
  { stat: "75%",  statLabel: "des CV sont filtrés avant d'être lus",           tip: "CVAdapt intègre les mots-clés de chaque offre automatiquement." },
  { stat: "6 sec", statLabel: "c'est le temps qu'un recruteur passe sur un CV", tip: "Un CV ATS optimisé double tes chances d'être rappelé." },
  { stat: "250",  statLabel: "candidatures reçues en moyenne par offre",        tip: "Seuls les CV avec les bons mots-clés passent les filtres." },
  { stat: "3×",   statLabel: "plus de rappels avec un CV adapté",               tip: "Adapte ton CV à chaque offre en 30 secondes avec CVAdapt." },
  { stat: "80%",  statLabel: "des recruteurs utilisent un ATS",                 tip: "Si ton CV n'est pas optimisé ATS, il n'est jamais lu." },
  { stat: "30s",  statLabel: "pour générer un CV optimisé",                     tip: "Colle l'offre, entre tes infos, reçois ton CV PDF." },
  { stat: "#1",   statLabel: "outil CV ATS gratuit pour étudiants français",    tip: "3 CV complets gratuits, sans carte bancaire." },
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
      system: "Tu écris des captions Instagram courtes pour CVAdapt (cvadapt.eu). Ton direct, une stat par post, pas de fioriture.",
      messages: [{
        role: "user",
        content: `Écris une caption Instagram pour ce post :
Stat : ${theme.stat} — ${theme.statLabel}
Conseil : ${theme.tip}

Règles :
- 3-4 phrases maximum
- Commence par la stat
- Mentionne cvadapt.eu une fois
- Termine par une question courte
- 5 hashtags : #emploi #CV #ATS #recrutement #alternance
- Aucune phrase cliché type "tu savais que"

Caption uniquement, sans introduction.`,
      }],
    });

    const caption = message.content[0].text;

    // 2. Construire l'URL de l'image (stat card générée dynamiquement)
    const imageUrl = `${BASE_URL}/api/og-image?stat=${encodeURIComponent(theme.stat)}&statLabel=${encodeURIComponent(theme.statLabel)}&tip=${encodeURIComponent(theme.tip)}`;

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
