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

IMPORTANT : Retourne UNIQUEMENT du HTML brut avec CSS inline. Aucun markdown, aucun \`\`\`html, aucun texte avant ou après. Commence directement par <div.

Génère un CV professionnel complet avec ce design précis :

<div style="font-family: 'Arial', sans-serif; max-width: 780px; margin: 0 auto; color: #1a1a2e; background: white;">

  <!-- EN-TÊTE avec bande colorée -->
  <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); color: white; padding: 36px 40px; border-radius: 0;">
    <h1 style="font-size: 28px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.5px;">[NOM COMPLET]</h1>
    <p style="font-size: 16px; opacity: 0.9; margin: 0; font-weight: 500;">[TITRE DU POSTE VISÉ — extrait de l'offre]</p>
  </div>

  <!-- CORPS -->
  <div style="padding: 32px 40px; display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">

    <!-- COLONNE GAUCHE -->
    <div>
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 12px;">Compétences</h2>
        <!-- Liste des compétences avec tags -->
        [COMPÉTENCES en bullet points]
      </div>
      <div>
        <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 12px;">Formation</h2>
        [FORMATION]
      </div>
    </div>

    <!-- COLONNE DROITE -->
    <div>
      <div style="margin-bottom: 28px;">
        <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 16px;">Profil</h2>
        <p style="font-size: 14px; line-height: 1.7; color: #374151;">[RÉSUMÉ professionnel de 3-4 phrases utilisant les mots-clés de l'offre]</p>
      </div>
      <div>
        <h2 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 16px;">Expérience professionnelle</h2>
        [EXPÉRIENCES avec titre, entreprise, dates, et bullet points de réalisations chiffrées]
      </div>
    </div>
  </div>
</div>

Adapte ce template avec les vraies informations du candidat. Utilise impérativement les mots-clés de l'offre d'emploi dans le profil et les expériences. Rends le CV convaincant et professionnel.`,
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
