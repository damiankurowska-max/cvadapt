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

Génère un CV complet, structuré et optimisé pour cette offre. Utilise les mots-clés de l'offre.

IMPORTANT : Retourne UNIQUEMENT le HTML brut, sans balises markdown, sans \`\`\`html, sans aucun texte avant ou après. Commence directement par <div et termine par </div>.

Le HTML doit inclure des styles CSS inline modernes et professionnels. Structure : en-tête avec nom et contact, puis sections Profil, Expérience, Compétences, Formation. Police Arial, couleurs sobres bleu marine et gris, mise en page propre.`,
        },
      ],
    });

    let cv = message.content[0].text;
    // Supprimer les balises markdown si Claude les ajoute quand même
    cv = cv.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    return Response.json({ cv });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
