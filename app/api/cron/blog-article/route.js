/**
 * Cron blog-article — Article SEO hebdomadaire
 * Génère un article avec Claude et le stocke dans Supabase `blog_articles`
 * Schedule : tous les lundis à 6h (vercel.json)
 */
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const CRON_SECRET = process.env.CRON_SECRET;

const TOPIC_POOL = [
  "CV pour une alternance en banque et finance en France",
  "Comment passer les filtres ATS dans le secteur tech en 2025",
  "CV pour un stage en cabinet de conseil — exemples et erreurs à éviter",
  "Mots-clés ATS essentiels pour les offres en marketing digital",
  "CV parfait pour l'ingénierie en France — structure et contenu",
  "Comment rédiger une lettre de motivation percutante en 2025",
  "CV étudiant sans expérience professionnelle — ce qui fonctionne vraiment",
  "Erreurs ATS qui sabotent ton CV sans que tu le saches",
  "Comment adapter son CV pour une offre d'emploi en 30 secondes",
  "Stage vs alternance — adapter son CV selon le type de contrat",
  "CV pour changer de secteur — stratégie de reconversion réussie",
  "Les compétences à mettre en avant sur un CV en 2025",
];

export async function GET(request) {
  if (!CRON_SECRET) return Response.json({ error: "Non configuré" }, { status: 500 });
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  );

  try {
    // Rotation déterministe par semaine
    const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const topic = TOPIC_POOL[weekNum % TOPIC_POOL.length];

    const msg = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 3500,
      messages: [
        {
          role: "user",
          content: `Tu es un expert en recherche d'emploi en France. Génère un article de blog SEO complet sur : "${topic}".

L'article doit :
- Cibler les étudiants et jeunes diplômés français cherchant un stage ou une alternance
- Être optimisé pour Google (structure H2/H3, mots-clés naturels intégrés)
- Faire environ 900-1100 mots de contenu réel (pas de padding)
- Donner des conseils actionnables avec des exemples concrets
- Mentionner cvadapt.eu une seule fois de manière naturelle (pas en intro)
- Ton direct, pas corporate, comme si tu parlais à un ami étudiant

Réponds UNIQUEMENT en JSON valide avec ces champs exacts :
{
  "slug": "url-kebab-case-en-minuscules-sans-accents",
  "titre": "Titre accrocheur et SEO (60-70 caractères)",
  "description": "Meta description SEO (150-160 caractères, inclure le mot-clé principal)",
  "categorie": "Conseils CV",
  "tempsLecture": "6 min",
  "contenu": "<article HTML avec <h2>, <h3>, <p>, <ul>, <li>, <strong> — sans balise <article> ou <main>"
}

Pour le champ categorie, utilise exactement l'une de ces valeurs : "Conseils CV", "CV ATS", "Lettre de motivation", "Premier emploi", "Reconversion"`,
        },
      ],
    });

    const raw = msg.content[0].text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Claude n'a pas retourné de JSON valide");

    const article = JSON.parse(jsonMatch[0]);
    const today = new Date().toISOString().split("T")[0];

    // Vérifie que le slug n'existe pas déjà
    const { data: existing } = await supabase
      .from("blog_articles")
      .select("slug")
      .eq("slug", article.slug)
      .maybeSingle();

    if (existing) {
      return Response.json({ skipped: true, reason: "Slug déjà existant", slug: article.slug });
    }

    const { error } = await supabase.from("blog_articles").insert({
      slug: article.slug,
      titre: article.titre,
      description: article.description,
      date: today,
      categorie: article.categorie,
      temps_lecture: article.tempsLecture,
      contenu: article.contenu,
      published: true,
    });

    if (error) throw new Error(`Supabase insert error: ${error.message}`);

    return Response.json({
      success: true,
      slug: article.slug,
      titre: article.titre,
      topic,
    });
  } catch (err) {
    console.error("blog-article cron error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
