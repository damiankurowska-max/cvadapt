import Anthropic from "@anthropic-ai/sdk";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { upgradeReminderEmail } from "@/lib/email-templates";
import { sanitizeInput } from "@/lib/rate-limit";
import { saveCV } from "@/lib/supabase";

// Skills appliqués : context-engineering · stop-slop · server-side-auth
// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }); — initialized per-request
// resend initialized per-request

// Limites par plan (source unique de vérité — côté serveur uniquement)
const PLAN_LIMITS = {
  free:      { max: 3,   period: "total" },
  essentiel: { max: 15,  period: "month" },
  pro:       { max: Infinity, period: "none" },
};

const TEMPLATE_STYLES = {
  moderne: `
TEMPLATE MODERNE — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.5; color:#1a1a1a; background:#fff.
EN-TÊTE : background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%); padding:32px 36px 28px; position:relative.
  - Nom : font-size:28px; font-weight:700; color:#fff; letter-spacing:-0.5px; margin-bottom:4px.
  - Titre poste : font-size:14px; color:rgba(255,255,255,0.88); font-weight:400; letter-spacing:0.3px.
LAYOUT CORPS : display:grid; grid-template-columns:220px 1fr; min-height:calc(1123px - 120px).
COLONNE GAUCHE : background:#f0f5ff; padding:24px 20px; border-right:1px solid #e0e7ff.
COLONNE DROITE : padding:24px 28px; background:#fff.
TITRES DE SECTION : font-size:10px; font-weight:700; color:#2563eb; letter-spacing:1.5px; text-transform:uppercase; padding-bottom:6px; border-bottom:2px solid #2563eb; margin-bottom:12px; margin-top:20px.
  - Premier titre gauche et droite : margin-top:0.
COMPÉTENCES (gauche) : chaque compétence = display:block; font-size:12px; color:#374151; padding:4px 0; border-bottom:1px solid #e5e7eb.
FORMATION (gauche) : diplôme en font-weight:600; font-size:12px; établissement en color:#6b7280; font-size:11px; année en color:#9ca3af; font-size:11px.
PROFIL (droite) : font-size:13px; line-height:1.7; color:#374151; background:#eff6ff; border-left:3px solid #2563eb; padding:12px 14px; border-radius:0 4px 4px 0.
EXPÉRIENCES (droite) : chaque poste = margin-bottom:16px.
  - Titre poste : font-weight:700; font-size:13px; color:#111827.
  - Entreprise : color:#2563eb; font-size:12px; font-weight:600 — séparateur " | " — Dates : color:#6b7280; font-size:11px; font-style:italic.
  - Bullets : list-style:none; padding:0; margin:6px 0 0 0.
    Chaque li : padding:3px 0 3px 16px; position:relative; color:#374151; font-size:12.5px; line-height:1.5.
    Chaque li::before : content:"▸"; position:absolute; left:0; color:#2563eb; font-size:10px; top:4px.`,

  classique: `
TEMPLATE CLASSIQUE — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:Georgia,'Times New Roman',serif; font-size:13px; line-height:1.6; color:#1a1a1a; background:#fff; padding:48px 52px.
EN-TÊTE : text-align:center; border-bottom:2px solid #1a1a1a; padding-bottom:20px; margin-bottom:24px.
  - Nom : font-size:30px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px.
  - Titre poste : font-size:14px; color:#555; font-style:italic.
LAYOUT : une seule colonne.
TITRES DE SECTION : font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#1a1a1a; border-bottom:1px solid #888; padding-bottom:4px; margin:20px 0 10px 0.
PROFIL : font-size:13px; line-height:1.8; color:#2d2d2d; margin-bottom:4px.
EXPÉRIENCES : chaque poste = margin-bottom:14px.
  - Titre poste : font-weight:700; font-size:13px.
  - Entreprise + dates : color:#555; font-size:12px; font-style:italic; margin-bottom:4px.
  - Bullets : li style="margin:2px 0; padding-left:18px; list-style:disc inside; color:#333; font-size:12.5px".
COMPÉTENCES : display:flex; flex-wrap:wrap; gap:6px — chaque item = background:#f3f4f6; padding:3px 10px; border:1px solid #ccc; font-size:12px.
FORMATION : diplôme gras, établissement + année en italique couleur #555.`,

  creatif: `
TEMPLATE CRÉATIF — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.5; color:#1a1a1a; background:#fff; display:flex.
SIDEBAR (gauche 230px) : background:linear-gradient(180deg,#5b21b6 0%,#7c3aed 100%); padding:36px 20px; min-height:1123px; color:#fff; flex-shrink:0.
  - Nom : font-size:20px; font-weight:700; color:#fff; line-height:1.3; margin-bottom:4px.
  - Titre : font-size:12px; color:rgba(255,255,255,0.78); margin-bottom:28px.
  - Titres sections sidebar : font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.6); border-bottom:1px solid rgba(255,255,255,0.25); padding-bottom:6px; margin:20px 0 10px.
  - Compétences : chaque item = font-size:12px; color:rgba(255,255,255,0.9); padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.12).
  - Formation : diplôme en font-weight:600; font-size:12px; color:#fff — établissement+année en font-size:11px; color:rgba(255,255,255,0.7).
CORPS PRINCIPAL (droite flex:1) : padding:36px 32px; background:#fff.
  - Titres sections : font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#7c3aed; border-bottom:2px solid #ede9fe; padding-bottom:5px; margin:20px 0 12px.
  - Profil : font-size:13px; line-height:1.7; color:#374151; margin-bottom:4px.
  - Expériences : titre poste gras 13px; entreprise en color:#7c3aed font-weight:600 12px; dates en color:#9ca3af italic 11px; bullets ▸ couleur #7c3aed.`,

  minimaliste: `
TEMPLATE MINIMALISTE — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:-apple-system,'Inter',Arial,sans-serif; font-size:13px; line-height:1.8; color:#111; background:#fff; padding:52px 60px.
EN-TÊTE : margin-bottom:32px.
  - Nom : font-size:34px; font-weight:800; color:#111; letter-spacing:-1px; margin-bottom:4px.
  - Titre poste : font-size:15px; color:#059669; font-weight:500; letter-spacing:0.2px.
LAYOUT : une seule colonne.
TITRES DE SECTION : font-size:11px; font-weight:700; color:#059669; text-transform:uppercase; letter-spacing:2px; margin:28px 0 10px; display:flex; align-items:center; gap:10px — ajouter un <span style="flex:1;height:1px;background:#d1fae5"></span> après le texte.
PROFIL : font-size:13.5px; line-height:1.9; color:#374151.
EXPÉRIENCES : chaque poste = border-left:3px solid #059669; padding-left:16px; margin-bottom:20px.
  - Titre poste : font-weight:700; font-size:14px; color:#111.
  - Entreprise : color:#059669; font-size:12px; font-weight:500 — dates : color:#6b7280; font-size:11.5px; font-style:italic.
  - Bullets : li style="color:#4b5563; font-size:12.5px; padding:2px 0; list-style:none" — ajouter "– " avant chaque bullet.
COMPÉTENCES : display:flex; flex-wrap:wrap; gap:8px — chaque item = font-size:12px; padding:4px 12px; border:1.5px solid #059669; color:#059669; border-radius:20px.
FORMATION : diplôme en font-weight:700; font-size:13px; établissement en color:#6b7280; année en color:#9ca3af.`,
};

// System prompt stable → cache API Anthropic
const SYSTEM_PROMPT = `Expert RH et designer CV français. Tu génères des CV HTML avec CSS inline de haute qualité visuelle.

RÈGLES STRICTES :
- Réponds UNIQUEMENT avec du HTML inline CSS. Zéro markdown, zéro texte hors HTML.
- Commence par <div et termine par </div>. Pas de balise <html>, <head>, <body>.
- Respecte EXACTEMENT les instructions CSS du template fourni (couleurs, tailles, espacements).
- Intègre tous les mots-clés pertinents de l'offre dans le profil et les compétences.
- Chaque expérience : 2-3 bullets avec résultats chiffrés quand possible (%, €, délais).
- N'invente PAS d'informations : si une donnée est absente, omets la section plutôt que d'inventer.
- Optimisé A4 impression : width:794px exact, évite les coupures de page au milieu d'une section.
- Qualité pro : espacement cohérent, hiérarchie visuelle claire, lisible à l'impression.`;

export async function POST(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const resend = new Resend(process.env.RESEND_API_KEY);
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
      model: "claude-sonnet-4-5",
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

    // ── 7. SAUVEGARDE SUPABASE ────────────────────────────────────────────
    let savedId = null;
    try {
      const saved = await saveCV({
        userId,
        nom,
        offre,
        template,
        cvHtml: cv,
      });
      savedId = saved?.id || null;
    } catch (dbErr) {
      // Ne jamais bloquer la génération si Supabase est down
      console.error("Supabase save error:", dbErr);
    }

    // ── 8. BREVO : ajout liste cvadapt-free-users au 1er CV ──────────────────
    if (cvCount === 0 && email) {
      fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          attributes: { FIRSTNAME: prenom || "" },
          listIds: [4],
          updateEnabled: true,
        }),
      }).catch((err) => console.error("Brevo add error:", err));
    }

    // ── 9. EMAIL DE RELANCE si dernier CV gratuit ─────────────────────────
    if (!isPro && newCvCount === PLAN_LIMITS.free.max && email) {
      await resend.emails.send({
        from: "CVAdapt <contact@cvadapt.eu>",
        to: email,
        subject: `${prenom ? prenom + ", tu" : "Tu"} as utilisé tes 3 CV gratuits — continue sans limite 🚀`,
        html: upgradeReminderEmail({ prenom }),
      }).catch(() => {});
    }

    return Response.json({ cv, cvCount: newCvCount, cvMonthCount: newCvMonthCount, savedId });

  } catch (error) {
    console.error("generate-cv error:", error);
    return Response.json({ error: "Erreur lors de la génération. Réessaie dans quelques secondes." }, { status: 500 });
  }
}
