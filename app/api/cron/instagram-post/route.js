import Anthropic from "@anthropic-ai/sdk";
import { renderMediaOnLambda, getRenderProgress } from "@remotion/lambda/client";
import { alertCronFailure } from "@/lib/monitoring";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const REMOTION_FUNCTION = "remotion-render-4-0-459-mem2048mb-disk2048mb-120sec";
const REMOTION_REGION = "us-east-1";
const REMOTION_SERVE_URL = process.env.REMOTION_SERVE_URL;

const DAILY_THEMES = [
  { stat: "75%", statLabel: "des CV sont filtrés avant d'être lus", tip: "CVAdapt intègre les mots-clés de chaque offre automatiquement." },
  { stat: "6 sec", statLabel: "c'est le temps qu'un recruteur passe sur un CV", tip: "Un CV ATS optimisé double tes chances d'être rappelé." },
  { stat: "250", statLabel: "candidatures reçues en moyenne par offre", tip: "Seuls les CV avec les bons mots-clés passent les filtres." },
  { stat: "3×", statLabel: "plus de rappels avec un CV adapté", tip: "Adapte ton CV à chaque offre en 30 secondes avec CVAdapt." },
  { stat: "80%", statLabel: "des recruteurs utilisent un ATS", tip: "Si ton CV n'est pas optimisé ATS, il n'est jamais lu." },
  { stat: "30s", statLabel: "pour générer un CV optimisé", tip: "Colle l'offre, entre tes infos, reçois ton CV PDF." },
  { stat: "1er", statLabel: "outil CV ATS gratuit pour étudiants français", tip: "3 CV complets gratuits, sans carte bancaire." },
];

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("CRON_SECRET non configuré — cron désactivé");
    return Response.json({ error: "Non configuré" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!REMOTION_SERVE_URL) {
    console.error("REMOTION_SERVE_URL non configuré");
    return Response.json({ error: "Non configuré" }, { status: 500 });
  }

  const dayOfWeek = new Date().getDay();
  const theme = DAILY_THEMES[dayOfWeek % DAILY_THEMES.length];

  try {
    // 1. Générer la caption avec Claude
    const message = await client.messages.create({
      model: "claude-opus-4-5",
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

    // 2. Rendre la vidéo sur Lambda
    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REMOTION_REGION,
      functionName: REMOTION_FUNCTION,
      serveUrl: REMOTION_SERVE_URL,
      composition: "CVAdaptReel",
      inputProps: {
        stat: theme.stat,
        statLabel: theme.statLabel,
        tip: theme.tip,
        cta: "cvadapt.eu — Gratuit",
      },
      codec: "h264",
      imageFormat: "jpeg",
    });

    // 3. Attendre la fin du rendu
    let videoUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName: REMOTION_FUNCTION,
        region: REMOTION_REGION,
      });

      if (progress.done) {
        videoUrl = progress.outputFile;
        break;
      }
      if (progress.fatalErrorEncountered) {
        throw new Error("Erreur rendu Remotion : " + progress.errors[0]?.message);
      }
    }

    if (!videoUrl) throw new Error("Timeout rendu vidéo");

    // 4. Envoyer à Make.com → Instagram
    const makeWebhookUrl = process.env.MAKE_INSTAGRAM_WEBHOOK;
    if (!makeWebhookUrl) throw new Error("MAKE_INSTAGRAM_WEBHOOK non configuré");
    const makeRes = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_url: videoUrl,
        caption: caption,
        date: new Date().toLocaleDateString("fr-FR"),
      }),
    });

    if (!makeRes.ok) {
      throw new Error(`Make.com webhook Instagram failed: ${makeRes.status}`);
    }

    return Response.json({
      success: true,
      theme: theme.stat,
      videoUrl,
      makeStatus: makeRes.status,
    });

  } catch (error) {
    console.error("Instagram cron error:", error);
    // 🚨 Alerte monitoring
    await alertCronFailure("instagram-post", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
