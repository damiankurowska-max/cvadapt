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
      max_tokens: 4000,
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

Génère un CV professionnel complet et adapté à cette offre. Utilise les mots-clés de l'offre dans le profil et les expériences.

RÈGLE ABSOLUE : réponds UNIQUEMENT avec du HTML brut (CSS inline). Pas de markdown. Pas de texte avant ou après. Commence par <div et termine par </div>.

Structure du CV :
1. En-tête : fond dégradé bleu (#1e3a5f vers #2563eb), nom en blanc gras, titre du poste visé en dessous
2. Corps en 2 colonnes (CSS grid) :
   - Gauche : Compétences (liste), Formation
   - Droite : Profil (3-4 phrases avec mots-clés), Expériences (avec bullet points et chiffres)
3. Titres de sections : petits, majuscules, bleu #2563eb, avec ligne de séparation
4. Police Arial, fond blanc, couleurs professionnelles`,
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
