import Anthropic from "@anthropic-ai/sdk";
import { createSupabaseServer } from "@/lib/supabase-server";
import { sanitizeInput } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `Expert en recrutement français. Tu génères des lettres de motivation HTML inline CSS professionnelles.
Réponds UNIQUEMENT avec du HTML brut (CSS inline). Pas de markdown. Commence par <div et termine par </div>.`;

export async function POST(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  // Auth via Supabase — même méthode que generate-cv
  const supabase = await createSupabaseServer();
  const { data: { user: sbUser } } = await supabase.auth.getUser();
  // Guests autorisés (génération sans compte) — comme generate-cv

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

  const FORMAT_PROMPT = `La lettre doit avoir ce format HTML :
- Conteneur blanc, max-width 700px, police Arial, padding 48px
- En-tête : nom du candidat à droite (gras, 18px), date du jour en dessous
- Objet en gras : "Objet : Candidature au poste de [titre du poste]"
- Corps en 3 paragraphes (line-height 1.8, font-size 14px, color #374151) :
  1. Accroche : pourquoi CE poste dans CETTE entreprise
  2. Valeur apportée : expériences concrètes avec résultats chiffrés, mots-clés de l'offre
  3. Conclusion : disponibilité, entretien, formule de politesse française complète
- Signature : "Cordialement," puis le nom en gras
Style sobre, professionnel, maximum 1 page imprimée.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{
        role: "user",
        content: [
          { type: "text", text: FORMAT_PROMPT + "\n\n", cache_control: { type: "ephemeral" } },
          { type: "text", text: `OFFRE D'EMPLOI :\n${offre}\n\nINFORMATIONS DU CANDIDAT :\n- Nom : ${nom}\n- Expérience : ${experience || "Aucune expérience professionnelle"}\n- Compétences : ${competences || "À déduire de l'offre"}\n- Formation : ${formation || "Non précisée"}` },
        ],
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
