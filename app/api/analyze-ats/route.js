import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const { offre, nom, experience, competences, formation } = await request.json();

  if (!offre || !nom) {
    return Response.json({ error: "Données manquantes" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Tu es un expert ATS (Applicant Tracking System). Analyse la compatibilité entre ce profil et cette offre d'emploi.

OFFRE D'EMPLOI:
${offre}

PROFIL DU CANDIDAT:
Nom: ${nom}
Expérience: ${experience}
Compétences: ${competences}
Formation: ${formation}

Retourne UNIQUEMENT un JSON valide (sans markdown, sans backticks) avec cette structure exacte:
{
  "score": <nombre entre 0 et 100>,
  "niveau": "<Excellent|Très bon|Bon|Moyen|Faible>",
  "keywords_found": ["<mot-clé présent dans le profil ET l'offre>", ...],
  "keywords_missing": ["<mot-clé important de l'offre absent du profil>", ...],
  "strengths": ["<point fort du profil par rapport à l'offre>", ...],
  "recommendations": ["<action concrète pour améliorer la correspondance>", ...]
}

RÈGLES:
- score basé sur: correspondance des mots-clés (40%), expérience pertinente (30%), compétences (20%), formation (10%)
- keywords_found: 3-6 mots-clés
- keywords_missing: 3-5 mots-clés manquants importants
- strengths: 2-3 points forts
- recommendations: 3-4 recommandations concrètes et actionnables
- Réponds UNIQUEMENT avec le JSON, rien d'autre`,
        },
      ],
    });

    let raw = message.content[0].text;
    raw = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const { score, niveau, keywords_found, keywords_missing, strengths, recommendations } = JSON.parse(raw);
    return Response.json({ score, niveau, keywords_found, keywords_missing, strengths, recommendations });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur lors de l'analyse ATS" }, { status: 500 });
  }
}
