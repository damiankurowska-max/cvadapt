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
          content: `Tu es un expert en recrutement français. Génère un CV professionnel adapté à cette offre d'emploi.

OFFRE D'EMPLOI :
${offre}

INFORMATIONS DU CANDIDAT :
- Nom : ${nom}
- Expérience : ${experience}
- Compétences : ${competences}
- Formation : ${formation}

Génère un CV complet, structuré et optimisé pour cette offre. Utilise les mots-clés de l'offre. Format : HTML propre avec des sections claires (Profil, Expérience, Compétences, Formation). Style professionnel français.`,
        },
      ],
    });

    const cv = message.content[0].text;
    return Response.json({ cv });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
