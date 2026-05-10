import Anthropic from "@anthropic-ai/sdk";

// Skills appliqués : context-engineering · stop-slop
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TEMPLATE_STYLES = {
  moderne: `En-tête dégradé bleu (#1e3a5f→#2563eb), nom+titre en blanc. Grid CSS 2 colonnes (1fr 2fr) : gauche=compétences+formation, droite=profil+expériences. Titres section : uppercase 11px bleu #2563eb + ligne bleue.`,
  classique: `Fond blanc, texte noir. En-tête centré, nom 28px gras, trait gris. Sections : titre gras souligné, une colonne. Formel.`,
  creatif: `Sidebar violette #7c3aed (32%, min-height:100%). Sidebar : nom blanc, titre, compétences, formation. Droite (68%) : profil+expériences, titres violets.`,
  minimaliste: `Fond blanc, nom 32px 800 #111, titre vert #059669. Sections : border-left 3px #059669 + padding-left 12px. Line-height 1.8. Zéro décoration.`,
};

// Prompt système séparé — Context Engineering : instructions stables = cache côté API
const SYSTEM_PROMPT = `Expert recruteur français. Tu génères des CV HTML optimisés ATS.

RÈGLES STRICTES :
- Réponds UNIQUEMENT avec du HTML inline CSS. Aucun markdown, aucun texte hors HTML.
- Commence par <div et termine par </div>.
- Intègre TOUS les mots-clés de l'offre dans le profil et les compétences.
- Chaque expérience : 2-3 bullet points avec résultats chiffrés (%, €, délais).
- Police sans-serif, taille lisible (13-14px corps), A4 optimisé impression.`;

export async function POST(request) {
  const { offre, nom, experience, competences, formation, template = "moderne" } = await request.json();

  if (!offre || !nom) {
    return Response.json({ error: "Données manquantes" }, { status: 400 });
  }

  const styleDesc = TEMPLATE_STYLES[template] || TEMPLATE_STYLES.moderne;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 3500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `TEMPLATE : ${styleDesc}

OFFRE :
${offre}

CANDIDAT :
Nom: ${nom}
Expérience: ${experience || "Aucune expérience professionnelle"}
Compétences: ${competences || "À déduire du profil et de l'offre"}
Formation: ${formation || "Non précisée"}

STRUCTURE DU CV :
1. En-tête : nom + titre extrait de l'offre
2. Profil (3 phrases) : mots-clés offre + valeur ajoutée candidate
3. Expériences : titre | entreprise | dates | 2-3 bullets chiffrés
4. Compétences : liste filtrée sur l'offre
5. Formation : diplôme | établissement | année

Génère le CV maintenant.`,
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
