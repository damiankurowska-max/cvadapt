import Anthropic from "@anthropic-ai/sdk";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { sanitizeInput } from "@/lib/rate-limit";

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Non authentifié" }, { status: 401 });

  // Plan check — paid only
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const isPro = user.unsafeMetadata?.isPro || false;
  if (!isPro) {
    return Response.json({ error: "Fonctionnalité réservée aux plans payants" }, { status: 403 });
  }

  const body = await req.json();
  const cv = typeof body.cv === "string" ? body.cv.substring(0, 20000) : "";
  const missingKeywords = Array.isArray(body.missingKeywords) ? body.missingKeywords.slice(0, 15) : [];
  const extraInfo = typeof body.extraInfo === "string" ? sanitizeInput(body.extraInfo).substring(0, 1000) : "";
  const lang = body.lang === "en" ? "en" : "fr";

  if (!cv) return Response.json({ error: "CV manquant" }, { status: 400 });
  if (!missingKeywords.length) return Response.json({ error: "Aucun mot-clé manquant" }, { status: 400 });

  const kwList = missingKeywords.map(k => `"${k}"`).join(", ");
  const extraBlock = extraInfo
    ? (lang === "en"
      ? `\n\nAdditional information to incorporate:\n${extraInfo}`
      : `\n\nInformations complémentaires à intégrer :\n${extraInfo}`)
    : "";

  const prompt = lang === "en"
    ? `You are an expert CV optimizer and ATS specialist. Your task is to improve the following CV HTML to boost its ATS score by naturally integrating the missing keywords: ${kwList}.${extraBlock}

Rules:
- Return ONLY the improved HTML — no explanations, no markdown, no code blocks
- Keep EXACTLY the same HTML structure, layout, and inline styles
- Integrate the missing keywords naturally into the existing content (skills, experience descriptions, job titles, etc.)
- Do not invent experience that wasn't there — enhance what exists with better terminology
- The output must be valid, complete HTML matching the original template style`
    : `Tu es un expert en optimisation de CV et en filtres ATS. Ta tâche est d'améliorer le HTML du CV suivant pour booster son score ATS en intégrant naturellement les mots-clés manquants : ${kwList}.${extraBlock}

Règles :
- Retourne UNIQUEMENT le HTML amélioré — aucune explication, aucun markdown, aucun bloc de code
- Conserve EXACTEMENT la même structure HTML, mise en page et styles inline
- Intègre les mots-clés manquants naturellement dans le contenu existant (compétences, descriptions d'expériences, titres de poste, etc.)
- N'invente pas d'expérience absente — valorise ce qui existe avec une meilleure terminologie ATS
- Le résultat doit être un HTML valide et complet correspondant au style du template original`;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    messages: [
      { role: "user", content: `${prompt}\n\nCV actuel :\n${cv}` },
    ],
  });

  let improved = message.content[0]?.text?.trim() || "";
  // Strip markdown code blocks if Claude wrapped it
  improved = improved.replace(/^```(?:html)?\n?/i, "").replace(/\n?```$/i, "").trim();
  if (!improved) return Response.json({ error: "Amélioration impossible" }, { status: 500 });

  return Response.json({ cv: improved });
}
