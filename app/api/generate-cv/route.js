import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TEMPLATE_STYLES = {
  moderne: `Design moderne : en-tête avec dégradé bleu (#1e3a5f → #2563eb), nom et titre du poste en blanc sur fond coloré. Corps en 2 colonnes CSS grid (1fr 2fr) : colonne gauche (compétences + formation), colonne droite (profil + expériences). Titres de section en uppercase, petits (11px), bleu #2563eb, avec ligne de séparation bleue.`,
  classique: `Design classique français : fond blanc, texte noir. En-tête centré avec nom en grand (28px, gras), trait horizontal gris en dessous. Sections linéaires avec titre en gras souligné gris clair. Format traditionnel une colonne. Sobre et formel.`,
  creatif: `Design créatif : sidebar violette (#7c3aed) sur 32% de largeur à gauche (position fixe, min-height: 100%), contenu blanc sur 68% à droite. Dans la sidebar : nom en blanc gras, titre du poste, compétences avec puces blanches, formation. À droite : profil et expériences avec titres violets (#7c3aed). Impression moderne et dynamique.`,
  minimaliste: `Design minimaliste : fond blanc pur, beaucoup d'espace. Nom en très grand (32px, font-weight 800, #111). Titre du poste en vert (#059669, 16px). Sections avec juste un accent vert à gauche (border-left: 3px solid #059669, padding-left: 12px). Typographie claire, aucune décoration superflue, ligne-height 1.8.`,
};

export async function POST(request) {
  const { offre, nom, experience, competences, formation, template = "moderne" } = await request.json();

  if (!offre || !nom) {
    return Response.json({ error: "Données manquantes" }, { status: 400 });
  }

  const styleDesc = TEMPLATE_STYLES[template] || TEMPLATE_STYLES.moderne;

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

RÈGLE ABSOLUE : réponds UNIQUEMENT avec du HTML brut (CSS inline). Pas de markdown. Pas de texte avant ou après. Commence par <div et termine par </div>.

TEMPLATE À UTILISER : ${styleDesc}

Contenu du CV :
1. En-tête : nom complet + titre du poste (extrait de l'offre)
2. Profil : 3-4 phrases percutantes avec les mots-clés de l'offre
3. Expérience : chaque poste avec titre, entreprise, dates, et 2-3 bullet points avec résultats chiffrés
4. Compétences : liste adaptée à l'offre
5. Formation : diplôme, établissement, année

Utilise impérativement les mots-clés de l'offre. Rends le CV convaincant et professionnel.`,
        },
      ],
    });

    let cv = message.content[0].text;
    cv = cv.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    return Response.json({ cv });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
