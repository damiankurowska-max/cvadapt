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
TEMPLATE SOBRE — rendu premium, qualité impression A4.

STRUCTURE HTML EXACTE à produire :
<div style="width:794px;min-height:1123px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#1e293b;background:#ffffff;box-sizing:border-box;">

  <!-- EN-TÊTE -->
  <div style="background:#1e293b;padding:40px 44px 34px;display:flex;align-items:flex-end;justify-content:space-between;gap:32px;">
    <div style="flex:1;">
      <span style="display:block;font-size:28px;font-weight:600;color:#f8fafc;letter-spacing:-0.4px;line-height:1.2;margin-bottom:8px;">[NOM COMPLET]</span>
      <span style="display:block;font-size:13px;color:#94a3b8;font-weight:400;letter-spacing:0.3px;">[TITRE DU POSTE]</span>
    </div>
    <div style="text-align:right;font-size:11px;color:#94a3b8;line-height:2.1;flex-shrink:0;">
      [email si fourni — sinon omettre la ligne]<br>
      [téléphone si fourni — sinon omettre la ligne]<br>
      Paris, France
    </div>
  </div>

  <!-- CORPS : 2 colonnes -->
  <div style="display:grid;grid-template-columns:210px 1fr;min-height:983px;">

    <!-- COLONNE GAUCHE -->
    <div style="background:#f8fafc;padding:30px 22px;border-right:1px solid #e2e8f0;box-sizing:border-box;">

      <span id="cv-photo-slot" style="display:block;text-align:center;margin-bottom:20px;"></span>

      <!-- Section COMPÉTENCES -->
      <span style="display:block;font-size:9px;font-weight:700;color:#64748b;letter-spacing:1.8px;text-transform:uppercase;margin-bottom:14px;">Compétences</span>
      [chaque compétence : <span style="display:block;font-size:12px;color:#334155;padding:6px 0;border-bottom:1px solid #e2e8f0;line-height:1.4;">[compétence]</span>]

      <!-- Section FORMATION -->
      <span style="display:block;font-size:9px;font-weight:700;color:#64748b;letter-spacing:1.8px;text-transform:uppercase;margin-top:28px;margin-bottom:14px;">Formation</span>
      [pour chaque diplôme :
        <div style="margin-bottom:14px;">
          <span style="display:block;font-size:12px;font-weight:600;color:#1e293b;line-height:1.4;">[Diplôme]</span>
          <span style="display:block;font-size:11px;color:#64748b;margin-top:2px;">[Établissement]</span>
          <span style="display:block;font-size:10.5px;color:#94a3b8;margin-top:2px;">[Année]</span>
        </div>
      ]

    </div>

    <!-- COLONNE DROITE -->
    <div style="padding:30px 36px;background:#ffffff;box-sizing:border-box;">

      <!-- Section PROFIL -->
      <span style="display:block;font-size:9px;font-weight:700;color:#64748b;letter-spacing:1.8px;text-transform:uppercase;margin-bottom:14px;">Profil</span>
      <p style="font-size:13px;line-height:1.8;color:#334155;margin:0 0 24px;">[3 phrases percutantes, mots-clés de l'offre intégrés]</p>

      <!-- Section EXPÉRIENCES -->
      <span style="display:block;font-size:9px;font-weight:700;color:#64748b;letter-spacing:1.8px;text-transform:uppercase;margin-bottom:16px;">Expériences</span>
      [pour chaque expérience :
        <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f1f5f9;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;">
            <span style="font-size:13px;font-weight:600;color:#0f172a;">[Titre du poste]</span>
            <span style="font-size:11px;color:#94a3b8;font-style:italic;">[Dates]</span>
          </div>
          <span style="display:block;font-size:12px;color:#475569;font-weight:500;margin-bottom:8px;">[Entreprise]</span>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="position:relative;padding:3px 0 3px 16px;font-size:12.5px;color:#475569;line-height:1.55;"><span style="position:absolute;left:0;color:#94a3b8;font-size:15px;top:1px;">·</span>[résultat chiffré]</li>
          </ul>
        </div>
      ]

    </div>
  </div>
</div>

RÈGLES ABSOLUES : aucune couleur vive dans le corps. Pas de border-left colorée. Pas de background coloré sur le profil. Les titres de section restent exclusivement en #64748b uppercase tiny. Le nom seul en grand dans l'en-tête sombre.`,

  classique: `
TEMPLATE COUPURE — rendu éditorial magazine, qualité impression A4.

STRUCTURE HTML EXACTE à produire :
<div style="width:794px;min-height:1123px;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.65;color:#1c1c1c;background:#ffffff;padding:56px 60px 48px;box-sizing:border-box;">

  <!-- EN-TÊTE -->
  <div style="margin-bottom:24px;">
    <span id="cv-photo-slot" style="float:right;margin:4px 0 12px 24px;"></span>
    <span style="display:block;font-size:34px;font-weight:700;color:#1c1c1c;letter-spacing:-0.6px;line-height:1.15;margin-bottom:6px;">[NOM COMPLET]</span>
    <span style="display:block;font-size:14px;color:#92400e;font-style:italic;font-weight:400;margin-bottom:16px;">[Titre du poste ciblé]</span>
    <div style="border-top:2px solid #1c1c1c;margin-bottom:10px;"></div>
    <div style="display:flex;gap:28px;flex-wrap:wrap;font-size:11px;color:#6b7280;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;padding-top:6px;">
      [si email : <span>[email]</span>]
      [si téléphone : <span>[téléphone]</span>]
      <span>Paris, France</span>
    </div>
  </div>

  <!-- PROFIL -->
  <span style="display:block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:2.2px;color:#92400e;margin:0 0 6px;">Profil</span>
  <div style="border-top:1px solid #e5e7eb;margin-bottom:12px;"></div>
  <p style="font-size:13.5px;line-height:1.85;color:#374151;margin:0 0 24px;">[3 phrases, mots-clés de l'offre]</p>

  <!-- EXPÉRIENCES -->
  <span style="display:block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:2.2px;color:#92400e;margin:0 0 6px;">Expériences professionnelles</span>
  <div style="border-top:1px solid #e5e7eb;margin-bottom:16px;"></div>
  [pour chaque expérience :
    <div style="margin-bottom:18px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;">
        <span style="font-weight:700;font-size:13.5px;color:#1c1c1c;font-family:Georgia,serif;">[Titre du poste]</span>
        <span style="font-size:11px;color:#6b7280;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-style:italic;">[Dates]</span>
      </div>
      <span style="display:block;font-size:12px;color:#92400e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:600;margin-bottom:7px;">[Entreprise]</span>
      <ul style="list-style:none;padding:0;margin:0;">
        <li style="position:relative;padding:2px 0 2px 18px;font-size:12.5px;color:#4b5563;line-height:1.6;"><span style="position:absolute;left:0;color:#9ca3af;font-size:11px;top:4px;">—</span>[résultat chiffré]</li>
      </ul>
    </div>
  ]

  <!-- COMPÉTENCES -->
  <span style="display:block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:2.2px;color:#92400e;margin:24px 0 6px;">Compétences</span>
  <div style="border-top:1px solid #e5e7eb;margin-bottom:14px;"></div>
  <div style="display:flex;flex-wrap:wrap;gap:7px;">
    [chaque compétence : <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11.5px;padding:4px 12px;background:#fef3c7;color:#92400e;border-radius:2px;">[compétence]</span>]
  </div>

  <!-- FORMATION -->
  <span style="display:block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:2.2px;color:#92400e;margin:24px 0 6px;">Formation</span>
  <div style="border-top:1px solid #e5e7eb;margin-bottom:14px;"></div>
  [pour chaque diplôme :
    <div style="margin-bottom:12px;">
      <span style="font-weight:700;font-size:13px;color:#1c1c1c;">[Diplôme]</span>
      <span style="display:block;font-style:italic;color:#6b7280;font-size:12px;">[Établissement]</span>
      <span style="color:#9ca3af;font-size:11px;">[Année]</span>
    </div>
  ]

</div>`,

  creatif: `
TEMPLATE ATELIER — sidebar sombre premium, qualité impression A4.

STRUCTURE HTML EXACTE à produire :
<div style="width:794px;min-height:1123px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#1e293b;background:#ffffff;display:flex;box-sizing:border-box;">

  <!-- SIDEBAR GAUCHE -->
  <div style="width:224px;min-height:1123px;background:#0f172a;padding:44px 24px 40px;flex-shrink:0;display:flex;flex-direction:column;box-sizing:border-box;">

    <span id="cv-photo-slot" style="display:block;text-align:center;margin-bottom:22px;"></span>

    <!-- Identité -->
    <span style="display:block;font-size:19px;font-weight:700;color:#f8fafc;line-height:1.3;margin-bottom:5px;letter-spacing:-0.3px;">[NOM COMPLET]</span>
    <span style="display:block;font-size:11px;color:#f59e0b;font-weight:500;letter-spacing:0.4px;margin-bottom:36px;">[Titre du poste]</span>

    <!-- Compétences -->
    <span style="display:block;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:12px;padding-bottom:7px;border-bottom:1px solid #1e293b;">Compétences</span>
    [chaque compétence : <span style="display:block;font-size:12px;color:#cbd5e1;padding:5px 0;border-bottom:1px solid #1e293b;line-height:1.45;">[compétence]</span>]

    <!-- Formation -->
    <span style="display:block;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-top:28px;margin-bottom:12px;padding-bottom:7px;border-bottom:1px solid #1e293b;">Formation</span>
    [pour chaque diplôme :
      <div style="margin-bottom:14px;">
        <span style="display:block;font-size:12px;font-weight:600;color:#f8fafc;line-height:1.4;">[Diplôme]</span>
        <span style="display:block;font-size:11px;color:#94a3b8;margin-top:2px;">[Établissement]</span>
        <span style="display:block;font-size:10.5px;color:#475569;margin-top:2px;">[Année]</span>
      </div>
    ]

    <!-- Coordonnées en bas -->
    <div style="margin-top:auto;padding-top:28px;border-top:1px solid #1e293b;">
      <span style="display:block;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:10px;">Contact</span>
      [si email : <span style="display:block;font-size:11px;color:#64748b;line-height:2;">[email]</span>]
      [si téléphone : <span style="display:block;font-size:11px;color:#64748b;line-height:2;">[téléphone]</span>]
      <span style="display:block;font-size:11px;color:#64748b;line-height:2;">Paris, France</span>
    </div>
  </div>

  <!-- CORPS PRINCIPAL -->
  <div style="flex:1;padding:44px 40px;background:#ffffff;box-sizing:border-box;">

    <!-- Profil -->
    <span style="display:block;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #f1f5f9;">Profil</span>
    <p style="font-size:13px;line-height:1.8;color:#475569;background:#fafafa;padding:14px 18px;margin:0 0 28px;box-sizing:border-box;">[3 phrases, mots-clés de l'offre]</p>

    <!-- Expériences -->
    <span style="display:block;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid #f1f5f9;">Expériences</span>
    [pour chaque expérience :
      <div style="margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;">
          <span style="font-weight:700;font-size:13px;color:#0f172a;">[Titre du poste]</span>
          <span style="font-size:11px;color:#94a3b8;font-style:italic;">[Dates]</span>
        </div>
        <span style="display:block;font-size:12px;color:#f59e0b;font-weight:600;margin-bottom:8px;">[Entreprise]</span>
        <ul style="list-style:none;padding:0;margin:0;">
          <li style="position:relative;padding:3px 0 3px 16px;font-size:12.5px;color:#475569;line-height:1.55;"><span style="position:absolute;left:0;color:#94a3b8;font-size:13px;top:2px;">›</span>[résultat chiffré]</li>
        </ul>
      </div>
    ]

  </div>
</div>`,

  minimaliste: `
TEMPLATE TRAIT — ultra-minimaliste, typographie fine, qualité impression A4.

STRUCTURE HTML EXACTE à produire :
<div style="width:794px;min-height:1123px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.8;color:#111827;background:#ffffff;padding:60px 68px 52px;box-sizing:border-box;">

  <!-- EN-TÊTE -->
  <div style="margin-bottom:36px;">
    <span id="cv-photo-slot" style="float:right;margin:4px 0 16px 28px;"></span>
    <span style="display:block;font-size:38px;font-weight:300;color:#111827;letter-spacing:-0.6px;line-height:1.15;margin-bottom:6px;">[NOM COMPLET]</span>
    <span style="display:block;font-size:14px;color:#0f766e;font-weight:500;letter-spacing:0.1px;margin-bottom:16px;">[Titre du poste ciblé]</span>
    <div style="border-top:1.5px solid #111827;margin-bottom:14px;"></div>
    <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:11px;color:#6b7280;">
      [si email : <span>[email]</span>]
      [si téléphone : <span>[téléphone]</span>]
      <span>Paris, France</span>
    </div>
  </div>

  <!-- PROFIL -->
  <div style="display:flex;align-items:center;gap:14px;margin:0 0 14px;">
    <span style="font-size:10px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:2.2px;white-space:nowrap;">Profil</span>
    <span style="flex:1;height:1px;background:#e5e7eb;display:inline-block;"></span>
  </div>
  <p style="font-size:13.5px;line-height:1.9;color:#374151;margin:0 0 28px;">[3 phrases, mots-clés de l'offre]</p>

  <!-- EXPÉRIENCES -->
  <div style="display:flex;align-items:center;gap:14px;margin:0 0 18px;">
    <span style="font-size:10px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:2.2px;white-space:nowrap;">Expériences</span>
    <span style="flex:1;height:1px;background:#e5e7eb;display:inline-block;"></span>
  </div>
  [pour chaque expérience :
    <div style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;">
        <span style="font-weight:600;font-size:13.5px;color:#111827;">[Titre du poste]</span>
        <span style="font-size:11.5px;color:#9ca3af;font-style:italic;">[Dates]</span>
      </div>
      <span style="display:block;font-size:12px;color:#0f766e;font-weight:500;margin-bottom:8px;">[Entreprise]</span>
      <ul style="list-style:none;padding:0;margin:0;">
        <li style="padding:2px 0;font-size:12.5px;color:#4b5563;line-height:1.65;"><span style="color:#9ca3af;margin-right:6px;">–</span>[résultat chiffré]</li>
      </ul>
    </div>
  ]

  <!-- COMPÉTENCES -->
  <div style="display:flex;align-items:center;gap:14px;margin:4px 0 16px;">
    <span style="font-size:10px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:2.2px;white-space:nowrap;">Compétences</span>
    <span style="flex:1;height:1px;background:#e5e7eb;display:inline-block;"></span>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:9px;margin-bottom:28px;">
    [chaque compétence : <span style="font-size:12px;padding:5px 16px;border:1px solid #ccfbf1;color:#0f766e;border-radius:20px;background:#f0fdfa;">[compétence]</span>]
  </div>

  <!-- FORMATION -->
  <div style="display:flex;align-items:center;gap:14px;margin:0 0 16px;">
    <span style="font-size:10px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:2.2px;white-space:nowrap;">Formation</span>
    <span style="flex:1;height:1px;background:#e5e7eb;display:inline-block;"></span>
  </div>
  [pour chaque diplôme :
    <div style="margin-bottom:14px;">
      <span style="display:block;font-weight:600;font-size:13px;color:#111827;">[Diplôme]</span>
      <span style="display:block;color:#6b7280;font-size:12px;font-style:italic;">[Établissement]</span>
      <span style="color:#9ca3af;font-size:11px;">[Année]</span>
    </div>
  ]

</div>`,
};

const CV_LANG_NAMES = {
  fr: "French",
  en: "English",
  de: "German (Deutsch)",
  es: "Spanish (Español)",
  it: "Italian (Italiano)",
  pt: "Portuguese / Português Brasileiro",
  ar: "Arabic (العربية)",
  ru: "Russian (Русский)",
  zh: "Simplified Chinese (中文)",
};

const VALID_CV_LANGS = Object.keys(CV_LANG_NAMES);

// System prompts (stable → cache API Anthropic)
const SYSTEM_PROMPT_FR = `Tu es un expert RH et designer CV de haut niveau. Tu génères des CV HTML en CSS inline, prêts à imprimer, d'une qualité professionnelle irréprochable.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec du HTML pur en CSS inline. Zéro markdown, zéro texte avant ou après le HTML.
2. Commence EXACTEMENT par <div et termine EXACTEMENT par </div>. Jamais de <html>, <head>, <body>.
3. Suis la STRUCTURE HTML fournie dans le template à la lettre : réutilise les styles CSS exacts, remplace uniquement les placeholders [entre crochets] par le contenu réel. Les balises <span id="cv-photo-slot" ...></span> sont des emplacements réservés côté client — inclus-les EXACTEMENT telles quelles dans le HTML généré, ne les supprime pas.
4. Pour les coordonnées : inclus uniquement les informations fournies (email, téléphone). Omets les lignes vides. Ajoute "Paris, France" si aucune ville n'est précisée.
5. Pour le contenu : intègre les mots-clés exacts de l'offre dans le profil et les compétences. Chaque bullet d'expérience = action concrète + résultat chiffré si possible (%, €, délai, volume).
6. N'invente JAMAIS d'informations absentes. Si l'expérience est vide, génère quand même une section avec ce qui est disponible.
7. width:794px exact sur le conteneur racine. Pas de débordements. Espacement précis.
8. Rendu A4 impression : sections compactes, pas de sauts de page intempestifs.`;

const SYSTEM_PROMPT_EN = `You are a senior HR expert and resume designer. You generate print-ready HTML resumes with inline CSS of impeccable professional quality.

ABSOLUTE RULES:
1. Reply ONLY with pure HTML using inline CSS. Zero markdown, zero text before or after the HTML.
2. Start EXACTLY with <div and end EXACTLY with </div>. Never use <html>, <head>, <body>.
3. Follow the HTML STRUCTURE provided in the template exactly: reuse the precise CSS styles, only replace the [bracketed placeholders] with real content. The <span id="cv-photo-slot" ...></span> tags are client-side reserved slots — include them EXACTLY as-is in the generated HTML, do not remove them.
4. For contact info: include only the information provided (email, phone). Omit empty lines. If no city is specified, omit it.
5. For content: integrate exact keywords from the job posting in the profile and skills. Each experience bullet = concrete action + measurable result where possible (%, $, timeframe, volume).
6. NEVER invent missing information. If experience is empty, still generate a section with what is available.
7. width:794px exact on the root container. No overflow. Precise spacing.
8. Print-ready A4 layout: compact sections, no unwanted page breaks.
9. Section headers and ALL text content MUST be in the language specified in the user message.`;

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

  const offre       = sanitizeInput(body.offre,      8000);
  const nom         = sanitizeInput(body.nom,         200);
  const emailCv     = sanitizeInput(body.email,       200);
  const telephoneCv = sanitizeInput(body.telephone,   100);
  const adresse     = sanitizeInput(body.adresse,     200);
  const experience  = sanitizeInput(body.experience,  3000);
  const competences = sanitizeInput(body.competences, 2000);
  const formation   = sanitizeInput(body.formation,   1000);
  const langues     = sanitizeInput(body.langues,     500);
  const linkedin    = sanitizeInput(body.linkedin,    300);
  const template    = ["moderne","classique","creatif","minimaliste"].includes(body.template)
    ? body.template : "moderne";
  const lang        = body.lang === "en" ? "en" : "fr";
  const cvLang      = VALID_CV_LANGS.includes(body.cvLang) ? body.cvLang : lang;

  if (!offre || !nom) {
    return Response.json({
      error: lang === "en"
        ? "Job posting and name are required."
        : "L'offre et le nom sont requis.",
    }, { status: 400 });
  }

  // ── 5. GÉNÉRATION CV ─────────────────────────────────────────────────
  const styleDesc = TEMPLATE_STYLES[template];
  const systemPrompt = cvLang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN;

  // French labels for French CVs, English labels for everything else
  const labels = cvLang === "fr" ? {
    template: "TEMPLATE",
    jobPosting: "OFFRE",
    candidate: "CANDIDAT",
    name: "Nom",
    phone: "Téléphone",
    experience: "Expérience",
    skills: "Compétences",
    education: "Formation",
    noExp: "Aucune expérience professionnelle",
    inferSkills: "À déduire du profil et de l'offre",
    noEdu: "Non précisée",
    structure: "STRUCTURE DU CV",
    s1: `En-tête : nom + titre extrait de l'offre + coordonnées (${emailCv || "email si fourni"}${telephoneCv ? ` · ${telephoneCv}` : ""}${adresse ? ` · ${adresse}` : ""}${linkedin ? ` · ${linkedin}` : ""})`,
    s2: "Profil (3 phrases percutantes) : mots-clés de l'offre + valeur ajoutée concrète",
    s3: "Expériences : titre poste | entreprise | dates | 2–3 bullets avec résultats chiffrés",
    s4: "Compétences : liste filtrée et pertinente pour l'offre",
    s5: "Formation : diplôme | établissement | année",
    quality: "QUALITÉ REQUISE : rendu professionnel impression-ready, espacement précis, hiérarchie visuelle impeccable. Pas de contenu générique. Génère le CV maintenant.",
  } : {
    template: "TEMPLATE",
    jobPosting: "JOB POSTING",
    candidate: "CANDIDATE",
    name: "Name",
    phone: "Phone",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    noExp: "No work experience",
    inferSkills: "To be inferred from profile and job posting",
    noEdu: "Not specified",
    structure: "RESUME STRUCTURE",
    s1: `Header: name + job title from posting + contact info (${emailCv || "email if provided"}${telephoneCv ? ` · ${telephoneCv}` : ""}${adresse ? ` · ${adresse}` : ""}${linkedin ? ` · ${linkedin}` : ""})`,
    s2: "Profile (3 impactful sentences): job keywords + concrete value",
    s3: "Work Experience: job title | company | dates | 2–3 bullets with measurable results",
    s4: "Skills: filtered list relevant to the job posting",
    s5: "Education: degree | institution | year",
    quality: "REQUIRED QUALITY: professional print-ready output, precise spacing, impeccable visual hierarchy. No generic content. Generate the resume now.",
  };

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: `${cvLang !== "fr" && cvLang !== "en" ? `[LANGUAGE OVERRIDE — READ FIRST] The CV MUST be written entirely in ${CV_LANG_NAMES[cvLang]}. All section titles, profile text, experience bullets, skills, and education content must be in ${CV_LANG_NAMES[cvLang]}. Using French or English in the CV content is forbidden.${cvLang === "ar" ? ' Add dir="rtl" on the root div.' : ""}\n\n` : ""}${labels.template} : ${styleDesc}

${labels.jobPosting} :
${offre}

${labels.candidate} :
${labels.name}: ${nom}
${emailCv ? `Email: ${emailCv}` : ""}
${telephoneCv ? `${labels.phone}: ${telephoneCv}` : ""}
${adresse ? `Address: ${adresse}` : ""}
${linkedin ? `LinkedIn/Portfolio: ${linkedin}` : ""}
${labels.experience}: ${experience || labels.noExp}
${labels.skills}: ${competences || labels.inferSkills}
${labels.education}: ${formation || labels.noEdu}
${langues ? `Languages: ${langues}` : ""}

${labels.structure} :
1. ${labels.s1}
2. ${labels.s2}
3. ${labels.s3}
4. ${labels.s4}
5. ${labels.s5}

${labels.quality}${cvLang !== "fr" && cvLang !== "en" ? `\n\n[REMINDER] Write every word of the CV in ${CV_LANG_NAMES[cvLang]}. Zero French. Zero English.` : ""}`,
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
          attributes: { FIRSTNAME: prenom || "", LANGUAGE: lang },
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
    return Response.json({
      error: lang === "en"
        ? "Generation failed. Please try again in a few seconds."
        : "Erreur lors de la génération. Réessaie dans quelques secondes.",
    }, { status: 500 });
  }
}
