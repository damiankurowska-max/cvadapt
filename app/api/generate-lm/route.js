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
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Tu es un expert en recrutement français. Génère une lettre de motivation professionnelle et percutante.

OFFRE D'EMPLOI :
${offre}

INFORMATIONS DU CANDIDAT :
- Nom : ${nom}
- Expérience : ${experience}
- Compétences : ${competences}
- Formation : ${formation}

RÈGLE ABSOLUE : réponds UNIQUEMENT avec du HTML brut (CSS inline). Pas de markdown. Commence par <div et termine par </div>.

La lettre doit avoir ce format HTML :
- Conteneur blanc, max-width 700px, police Arial, padding 48px
- En-tête : nom du candidat à droite (gras, 18px), date du jour en dessous
- Objet en gras : "Objet : Candidature au poste de [titre du poste]"
- Corps en 3 paragraphes (line-height 1.8, font-size 14px, color #374151) :
  1. Accroche : pourquoi CE poste dans CETTE entreprise (utilise les infos de l'offre)
  2. Valeur apportée : expériences concrètes avec résultats chiffrés, mots-clés de l'offre
  3. Conclusion : disponibilité, entretien, formule de politesse française complète
- Signature : "Cordialement," puis le nom en gras

Style sobre, professionnel, maximum 1 page imprimée.`,
        },
      ],
    });

    let lm = message.content[0].text;
    lm = lm.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    return Response.json({ lm });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
