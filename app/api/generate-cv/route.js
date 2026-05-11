import Anthropic from "@anthropic-ai/sdk";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { upgradeReminderEmail } from "@/lib/email-templates";
import { sanitizeInput } from "@/lib/rate-limit";

// Skills appliqués : context-engineering · stop-slop · server-side-auth
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

// Limites par plan (source unique de vérité — côté serveur uniquement)
const PLAN_LIMITS = {
  free:      { max: 3,   period: "total" },
  essentiel: { max: 15,  period: "month" },
  pro:       { max: Infinity, period: "none" },
};

const TEMPLATE_STYLES = {
  moderne:     `En-tête dégradé bleu (#1e3a5f→#2563eb), nom+titre en blanc. Grid CSS 2 colonnes (1fr 2fr) : gauche=compétences+formation, droite=profil+expériences. Titres section : uppercase 11px bleu #2563eb + ligne bleue.`,
  classique:   `Fond blanc, texte noir. En-tête centré, nom 28px gras, trait gris. Sections : titre gras souligné, une colonne. Formel.`,
  creatif:     `Sidebar violette #7c3aed (32%, min-height:100%). Sidebar : nom blanc, titre, compétences, formation. Droite (68%) : profil+expériences, titres violets.`,
  minimaliste: `Fond blanc, nom 32px 800 #111, titre vert #059669. Sections : border-left 3px #059669 + padding-left 12px. Line-height 1.8. Zéro décoration.`,
};

// System prompt stable → cache API Anthropic
const SYSTEM_PROMPT = `Expert recruteur français. Tu génères des CV HTML optimisés ATS.

RÈGLES STRICTES :
- Réponds UNIQUEMENT avec du HTML inline CSS. Aucun markdown, aucun texte hors HTML.
- Commence par <div et termine par </div>.
- Intègre TOUS les mots-clés de l'offre dans le profil et les compétences.
- Chaque expérience : 2-3 bullet points avec résultats chiffrés (%, €, délais).
- Police sans-serif, taille lisible (13-14px corps), A4 optimisé impression.`;

export async function POST(request) {
  // ── 1. AUTHENTIFICATION ──────────────────────────────────────────────
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connexion requise pour générer un CV." }, { status: 401 });
  }

  // ── 2. LECTURE METADATA CLERK (source de vérité) ─────────────────────
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const meta = user.unsafeMetadata || {};

  const isPro   = meta.isPro  || false;
  const plan    = meta.plan   || "free";
  const email   = user.emailAddresses?.[0]?.emailAddress || "";
  const prenom  = user.firstName || "";

  const cvCount = parseInt(meta.cvCount || 0);

  // Compteur mensuel (réinitialisé automatiquement chaque mois)
  const currentMonthKey = new Date().toISOString().slice(0, 7); // "2025-05"
  const storedMonthKey  = meta.cvMonthKey || "";
  const cvMonthCount    = storedMonthKey === currentMonthKey
    ? parseInt(meta.cvMonthCount || 0)
    : 0;

  // ── 3. VÉRIFICATION DES LIMITES (côté serveur) ───────────────────────
  if (!isPro) {
    if (cvCount >= PLAN_LIMITS.free.max) {
      return Response.json(
        { error: "Limite gratuite atteinte (3 CV). Abonne-toi pour continuer.", code: "LIMIT_FREE" },
        { status: 403 }
      );
    }
  } else if (plan === "essentiel") {
    if (cvMonthCount >= PLAN_LIMITS.essentiel.max) {
      return Response.json(
        { error: "Limite mensuelle atteinte (15 CV). Passe au plan Pro pour des CV illimités.", code: "LIMIT_ESSENTIEL" },
        { status: 403 }
      );
    }
  }
  // plan === "pro" → illimité, aucune vérification

  // ── 4. VALIDATION DES INPUTS ─────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const offre      = sanitizeInput(body.offre,      8000);
  const nom        = sanitizeInput(body.nom,         200);
  const experience = sanitizeInput(body.experience,  3000);
  const competences= sanitizeInput(body.competences, 2000);
  const formation  = sanitizeInput(body.formation,   1000);
  const template   = ["moderne","classique","creatif","minimaliste"].includes(body.template)
    ? body.template : "moderne";

  if (!offre || !nom) {
    return Response.json({ error: "L'offre et le nom sont requis." }, { status: 400 });
  }

  // ── 5. GÉNÉRATION CV ─────────────────────────────────────────────────
  const styleDesc = TEMPLATE_STYLES[template];

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 3500,
      system: SYSTEM_PROMPT,
      messages: [{
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
      }],
    });

    let cv = message.content[0].text;
    cv = cv.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    // ── 6. MISE À JOUR METADATA CLERK (côté serveur) ─────────────────────
    const newCvCount      = cvCount + 1;
    const newCvMonthCount = cvMonthCount + 1;

    await clerk.users.updateUser(userId, {
      unsafeMetadata: {
        ...meta,
        cvCount:      newCvCount,
        cvMonthCount: newCvMonthCount,
        cvMonthKey:   currentMonthKey,
      },
    });

    // ── 7. EMAIL DE RELANCE si dernier CV gratuit ─────────────────────────
    if (!isPro && newCvCount === PLAN_LIMITS.free.max && email) {
      await resend.emails.send({
        from: "CVAdapt <contact@cvadapt.eu>",
        to: email,
        subject: `${prenom ? prenom + ", tu" : "Tu"} as utilisé tes 3 CV gratuits — continue sans limite 🚀`,
        html: upgradeReminderEmail({ prenom }),
      }).catch(() => {}); // ne jamais bloquer la génération pour un email
    }

    return Response.json({ cv, cvCount: newCvCount, cvMonthCount: newCvMonthCount });

  } catch (error) {
    console.error("generate-cv error:", error);
    return Response.json({ error: "Erreur lors de la génération. Réessaie dans quelques secondes." }, { status: 500 });
  }
}
