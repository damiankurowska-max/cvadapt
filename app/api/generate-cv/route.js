import Anthropic from "@anthropic-ai/sdk";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { upgradeReminderEmail } from "@/lib/email-templates";
import { sanitizeInput } from "@/lib/rate-limit";
import { saveCV, consumeInstitutionQuota } from "@/lib/supabase";

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
TEMPLATE SOBRE — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.5; color:#1e293b; background:#fff.
EN-TÊTE : background:#1e293b; padding:36px 40px 30px; display:flex; align-items:flex-end; justify-content:space-between.
  - Bloc nom/titre (gauche, flex:1) :
    · Nom : font-size:26px; font-weight:600; color:#f8fafc; letter-spacing:-0.3px; display:block; margin-bottom:6px.
    · Titre poste : font-size:13px; color:#94a3b8; font-weight:400; letter-spacing:0.2px.
  - Coordonnées (droite, text-align:right) : font-size:11px; color:#94a3b8; line-height:2.
LAYOUT CORPS : display:grid; grid-template-columns:210px 1fr; min-height:calc(1123px - 102px).
COLONNE GAUCHE : background:#f8fafc; padding:28px 20px; border-right:1px solid #e2e8f0.
COLONNE DROITE : padding:28px 32px; background:#fff.
TITRES DE SECTION : font-size:9px; font-weight:700; color:#64748b; letter-spacing:1.8px; text-transform:uppercase; margin-bottom:12px; margin-top:24px. Pas de border-bottom colorée. Pas de couleur vive.
  - Premier titre gauche et droite : margin-top:0.
COMPÉTENCES (gauche) : chaque compétence = display:block; font-size:12px; color:#334155; padding:5px 0; border-bottom:1px solid #e2e8f0; line-height:1.4.
FORMATION (gauche) : diplôme en font-weight:600; font-size:12px; color:#1e293b — établissement en color:#64748b; font-size:11px; display:block; margin-top:1px — année en color:#94a3b8; font-size:10.5px.
PROFIL (droite) : font-size:13px; line-height:1.75; color:#334155. Pas de background coloré, pas de border-left colorée.
EXPÉRIENCES (droite) : chaque poste = margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid #f1f5f9.
  - Ligne titre + dates : display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px.
  - Titre poste : font-weight:600; font-size:13px; color:#0f172a.
  - Dates : color:#94a3b8; font-size:11px; font-style:italic.
  - Entreprise : color:#475569; font-size:12px; font-weight:500; margin-bottom:6px; display:block.
  - Bullets : list-style:none; padding:0; margin:0.
    Chaque li : padding:2px 0 2px 14px; position:relative; color:#475569; font-size:12.5px; line-height:1.5.
    Chaque li::before : content:"·"; position:absolute; left:0; color:#94a3b8; font-size:16px; top:-1px.`,

  classique: `
TEMPLATE COUPURE — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:Georgia,'Times New Roman',serif; font-size:13px; line-height:1.65; color:#1c1c1c; background:#fff; padding:52px 56px 40px.
EN-TÊTE : margin-bottom:20px; padding-bottom:16px.
  - Nom : font-size:32px; font-weight:700; color:#1c1c1c; letter-spacing:-0.5px; display:block; margin-bottom:4px.
  - Titre poste : font-size:14px; color:#92400e; font-style:italic; font-weight:400; margin-bottom:14px; display:block.
  - Trait de séparation : display:block; border-top:2px solid #1c1c1c; margin-bottom:10px.
  - Coordonnées (sous le trait) : font-size:11px; color:#6b7280; font-family:'Helvetica Neue',Arial,sans-serif; display:flex; gap:24px; flex-wrap:wrap; padding-top:4px.
LAYOUT : une seule colonne.
TITRES DE SECTION : font-family:'Helvetica Neue',Arial,sans-serif; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#92400e; margin:24px 0 4px 0; display:block.
  Immédiatement après le titre, ajouter une ligne : <hr style="border:none;border-top:1px solid #e5e7eb;margin:4px 0 10px 0">
PROFIL : font-size:13.5px; line-height:1.8; color:#374151; margin-bottom:4px.
EXPÉRIENCES : chaque poste = margin-bottom:16px.
  - Ligne titre + dates : display:flex; justify-content:space-between; align-items:baseline.
  - Titre poste : font-weight:700; font-size:13.5px; color:#1c1c1c; font-family:Georgia,serif.
  - Dates : font-size:11px; color:#6b7280; font-family:'Helvetica Neue',Arial,sans-serif; font-style:italic.
  - Entreprise : color:#92400e; font-size:12px; font-family:'Helvetica Neue',Arial,sans-serif; font-weight:600; margin-bottom:5px; display:block.
  - Bullets : list-style:none; padding:0; margin:0.
    Chaque li : padding:2px 0 2px 16px; position:relative; color:#4b5563; font-size:12.5px; line-height:1.55.
    Chaque li::before : content:"—"; position:absolute; left:0; color:#9ca3af; font-size:11px; top:3px.
COMPÉTENCES : display:flex; flex-wrap:wrap; gap:6px — chaque item = font-family:'Helvetica Neue',Arial,sans-serif; font-size:11.5px; padding:3px 10px; background:#fef3c7; color:#92400e; border-radius:2px.
FORMATION : diplôme en font-weight:700; font-size:13px; color:#1c1c1c — établissement en font-style:italic; color:#6b7280; font-size:12px; display:block — année en color:#9ca3af; font-size:11px.`,

  creatif: `
TEMPLATE ATELIER — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.5; color:#1e293b; background:#fff; display:flex.
SIDEBAR (gauche 220px) : background:#0f172a; padding:40px 22px 36px; min-height:1123px; flex-shrink:0; display:flex; flex-direction:column.
  - Nom : font-size:18px; font-weight:700; color:#f8fafc; line-height:1.3; margin-bottom:4px; letter-spacing:-0.2px.
  - Titre : font-size:11px; color:#f59e0b; font-weight:500; letter-spacing:0.3px; margin-bottom:32px; display:block.
  - Titres sections sidebar : font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#64748b; margin:24px 0 10px; padding-bottom:6px; border-bottom:1px solid #1e293b; display:block.
  - Compétences : chaque item = display:block; font-size:12px; color:#cbd5e1; padding:4px 0; border-bottom:1px solid #1e293b; line-height:1.4.
  - Formation : diplôme en font-weight:600; font-size:12px; color:#f8fafc; display:block; margin-bottom:2px — établissement en font-size:11px; color:#94a3b8; display:block — année en font-size:10.5px; color:#64748b; display:block; margin-bottom:10px.
  - Coordonnées (en bas sidebar, margin-top:auto) : padding-top:24px; border-top:1px solid #1e293b; font-size:11px; color:#64748b; line-height:1.9.
CORPS PRINCIPAL (droite, flex:1) : padding:40px 36px; background:#fff.
TITRES SECTIONS CORPS : font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#64748b; margin:24px 0 12px; padding-bottom:7px; border-bottom:1px solid #f1f5f9; display:block.
  - Premier titre : margin-top:0.
PROFIL : font-size:13px; line-height:1.75; color:#475569; padding:14px 16px; background:#fafafa; margin-bottom:4px.
EXPÉRIENCES : chaque poste = margin-bottom:18px.
  - Ligne titre + dates : display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px.
  - Titre poste : font-weight:700; font-size:13px; color:#0f172a.
  - Dates : font-size:11px; color:#94a3b8; font-style:italic.
  - Entreprise : font-size:12px; color:#f59e0b; font-weight:600; margin-bottom:6px; display:block.
  - Bullets : list-style:none; padding:0; margin:0.
    Chaque li : padding:2px 0 2px 14px; position:relative; color:#475569; font-size:12.5px; line-height:1.5.
    Chaque li::before : content:"›"; position:absolute; left:0; color:#94a3b8; font-size:13px; top:1px.`,

  minimaliste: `
TEMPLATE TRAIT — instructions CSS précises :
Conteneur global : width:794px; min-height:1123px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.8; color:#111827; background:#fff; padding:56px 64px.
EN-TÊTE : margin-bottom:32px.
  - Nom : font-size:36px; font-weight:300; color:#111827; letter-spacing:-0.5px; display:block; margin-bottom:4px.
  - Titre poste : font-size:14px; color:#0f766e; font-weight:500; letter-spacing:0.1px; margin-bottom:14px; display:block.
  - Trait de séparation : display:block; border-top:1.5px solid #111827; margin-bottom:12px.
  - Coordonnées : font-size:11px; color:#6b7280; display:flex; gap:20px; flex-wrap:wrap.
LAYOUT : une seule colonne.
TITRES DE SECTION : font-size:10px; font-weight:700; color:#0f766e; text-transform:uppercase; letter-spacing:2px; display:flex; align-items:center; gap:12px; margin:28px 0 12px 0.
  Après le texte du titre, ajouter exactement : <span style="flex:1;height:1px;background:#e5e7eb;display:inline-block;vertical-align:middle"></span>
PROFIL : font-size:13.5px; line-height:1.9; color:#374151; margin-bottom:0.
EXPÉRIENCES : chaque poste = margin-bottom:22px.
  - Ligne titre + dates : display:flex; justify-content:space-between; align-items:baseline; margin-bottom:1px.
  - Titre poste : font-weight:600; font-size:13.5px; color:#111827.
  - Dates : font-size:11.5px; color:#9ca3af; font-style:italic.
  - Entreprise : font-size:12px; color:#0f766e; font-weight:500; margin-bottom:6px; display:block.
  - Bullets : list-style:none; padding:0; margin:0.
    Chaque li : padding:2px 0; color:#4b5563; font-size:12.5px; line-height:1.6. Commencer chaque bullet par "– " (tiret demi-cadratin + espace) en color:#9ca3af.
COMPÉTENCES : display:flex; flex-wrap:wrap; gap:8px — chaque item : font-size:12px; padding:4px 14px; border:1px solid #ccfbf1; color:#0f766e; border-radius:16px; background:#f0fdfa.
FORMATION : diplôme en font-weight:600; font-size:13px; color:#111827; display:block — établissement en color:#6b7280; font-size:12px; font-style:italic; display:block — année en color:#9ca3af; font-size:11px.`,
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
  const institutionId = meta.institutionId || null;

  if (institutionId) {
    // Membre institution : quota géré au niveau de l'établissement
    const { allowed, remaining } = await consumeInstitutionQuota(institutionId);
    if (!allowed) {
      return Response.json(
        { error: "Le quota mensuel de ton établissement est atteint. Contacte ton responsable insertion.", code: "LIMIT_INSTITUTION" },
        { status: 403 }
      );
    }
    // On continue sans vérifier les limites personnelles
    void remaining;
  } else if (!isPro) {
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
        institutionId: institutionId || undefined,
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
