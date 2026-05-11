import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@clerk/nextjs/server";
import { sanitizeInput } from "@/lib/rate-limit";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Expert en recrutement français. Tu génères des lettres de motivation HTML inline CSS professionnelles.
Réponds UNIQUEMENT avec du HTML brut (CSS inline). Pas de markdown. Commence par <div et termine par </div>.`;

export async function POST(request) {
  // Auth requise — LM consomme des crédits Claude
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connexion requise." }, { status: 401 });
  }

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

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `OFFRE D'EMPLOI :
${offre}

INFORMATIONS DU CANDIDAT :
- Nom : ${nom}
- Expérience : ${experience || "Aucune expérience professionnelle"}
- Compétences : ${competences || "À déduire de l'offre"}
- Formation : ${formation || "Non précisée"}

La lettre doit avoir ce format HTML :
- Conteneur blanc, max-width 700px, police Arial, padding 48px
- En-tête : nom du candidat à droite (gras, 18px), date du jour en dessous
- Objet en gras : "Objet : Candidature au poste de [titre du poste]"
- Corps en 3 paragraphes (line-height 1.8, font-size 14px, color #374151) :
  1. Accroche : pourquoi CE poste dans CETTE entreprise
  2. Valeur apportée : expériences concrètes avec résultats chiffrés, mots-clés de l'offre
  3. Conclusion : disponibilité, entretien, formule de politesse française complète
- Signature : "Cordialement," puis le nom en gras

Style sobre, professionnel, maximum 1 page imprimée.`,
      }],
    });

    let lm = message.content[0].text;
    lm = lm.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    return Response.json({ lm });

  } catch (error) {
    console.error("generate-lm error:", error);
    return Response.json({ error: "Erreur lors de la génération." }, { status: 500 });
  }
}
