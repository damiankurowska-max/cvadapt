import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, getClientIp, sanitizeInput } from "@/lib/rate-limit";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// L'analyse ATS est gratuite et sans inscription — rate limit par IP : 20/heure
const RATE_LIMIT_MAX    = 20;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure

export async function POST(request) {
  // ── Rate limiting par IP ──────────────────────────────────────────────
  const ip = getClientIp(request);
  const { allowed, remaining, resetIn } = rateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

  if (!allowed) {
    const resetMinutes = Math.ceil(resetIn / 60000);
    return Response.json(
      { error: `Trop d'analyses. Réessaie dans ${resetMinutes} minutes.` },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) },
      }
    );
  }

  // ── Validation des inputs ─────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const offre       = sanitizeInput(body.offre,       8000);
  const nom         = sanitizeInput(body.nom,          200);
  const experience  = sanitizeInput(body.experience,   3000);
  const competences = sanitizeInput(body.competences,  2000);
  const formation   = sanitizeInput(body.formation,    1000);

  if (!offre || !nom) {
    return Response.json({ error: "L'offre et le nom sont requis." }, { status: 400 });
  }

  if (offre.length < 50) {
    return Response.json({ error: "L'offre d'emploi semble trop courte." }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: `Tu es un expert ATS (Applicant Tracking System). Analyse la compatibilité entre ce profil et cette offre d'emploi.

OFFRE D'EMPLOI:
${offre}

PROFIL DU CANDIDAT:
Nom: ${nom}
Expérience: ${experience || "Aucune"}
Compétences: ${competences || "Non précisées"}
Formation: ${formation || "Non précisée"}

Retourne UNIQUEMENT un JSON valide (sans markdown, sans backticks) avec cette structure exacte:
{
  "score": <nombre entre 0 et 100>,
  "niveau": "<Excellent|Très bon|Bon|Moyen|Faible>",
  "keywords_found": ["<mot-clé présent dans le profil ET l'offre>"],
  "keywords_missing": ["<mot-clé important de l'offre absent du profil>"],
  "strengths": ["<point fort du profil par rapport à l'offre>"],
  "recommendations": ["<action concrète pour améliorer la correspondance>"]
}

RÈGLES:
- score: correspondance mots-clés (40%), expérience (30%), compétences (20%), formation (10%)
- keywords_found: 3-6 mots-clés
- keywords_missing: 3-5 mots-clés manquants importants
- strengths: 2-3 points forts
- recommendations: 3-4 recommandations concrètes
- Réponds UNIQUEMENT avec le JSON`,
      }],
    });

    let raw = message.content[0].text;
    raw = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const { score, niveau, keywords_found, keywords_missing, strengths, recommendations } = JSON.parse(raw);

    return Response.json(
      { score, niveau, keywords_found, keywords_missing, strengths, recommendations },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );

  } catch (error) {
    console.error("analyze-ats error:", error);
    return Response.json({ error: "Erreur lors de l'analyse ATS." }, { status: 500 });
  }
}
