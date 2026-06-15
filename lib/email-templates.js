/**
 * Templates HTML pour les emails CVAdapt
 * Couleurs : bleu #2563eb, fond #f5f5f7, texte #111827
 */

const BASE = `
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
`;

const CLOSE = `
  </body>
  </html>
`;

function wrapper(content) {
  return `${BASE}
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 16px;">
      <tr><td align="center">
        <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

          <!-- HEADER -->
          <tr><td style="padding-bottom:24px;text-align:center;">
            <img src="https://cvadapt.eu/logo-256.png" width="44" height="44"
              alt="CVAdapt" style="border-radius:10px;display:inline-block;vertical-align:middle;margin-right:10px;" />
            <span style="font-size:20px;font-weight:800;color:#2563eb;vertical-align:middle;letter-spacing:-0.5px;">CVAdapt</span>
          </td></tr>

          <!-- CARD -->
          <tr><td style="background:#ffffff;border-radius:20px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
            ${content}
          </td></tr>

          <!-- FOOTER -->
          <tr><td style="padding-top:24px;text-align:center;">
            <p style="font-size:12px;color:#9ca3af;margin:0 0 8px;">
              CVAdapt · <a href="https://cvadapt.eu" style="color:#9ca3af;">cvadapt.eu</a> ·
              <a href="mailto:contact@cvadapt.eu" style="color:#9ca3af;">contact@cvadapt.eu</a>
            </p>
            <p style="font-size:11px;color:#d1d5db;margin:0 0 6px;">© ${new Date().getFullYear()} CVAdapt — Fait en France 🇫🇷</p>
            <p style="font-size:11px;color:#d1d5db;margin:0;">
              <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#d1d5db;text-decoration:underline;">Se désinscrire</a>
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  ${CLOSE}`;
}

// ─── Bouton CTA ────────────────────────────────────────────────
function btn(label, href, color = "#2563eb") {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:24px auto 0;">
      <tr><td style="background:${color};border-radius:12px;">
        <a href="${href}" style="display:block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;text-align:center;">
          ${label}
        </a>
      </td></tr>
    </table>`;
}

// ─── Ligne séparatrice ─────────────────────────────────────────
const divider = `<tr><td style="height:1px;background:#f3f4f6;"></td></tr>`;

// ══════════════════════════════════════════════════════════════
// 1. BIENVENUE — inscription newsletter
// ══════════════════════════════════════════════════════════════
export function welcomeNewsletterEmail() {
  const content = `
    <!-- Bandeau bleu -->
    <tr><td style="background:linear-gradient(135deg,#1e40af,#2563eb);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">📬</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        Bienvenue dans la liste CVAdapt !
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">
        Tu recevras chaque semaine des conseils pour décrocher ton entretien.
      </p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
        Merci pour ton inscription 🙌
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
        Chaque semaine tu recevras&nbsp;:
      </p>

      <!-- Liste -->
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ["🎯", "Des astuces pour passer les filtres ATS"],
          ["📝", "Les erreurs de CV les plus fréquentes"],
          ["💡", "Des conseils d'entretien concrets"],
          ["🚀", "Des offres et ressources exclusives"],
        ].map(([icon, text]) => `
          <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
            <span style="font-size:18px;vertical-align:middle;">${icon}</span>
            <span style="font-size:14px;color:#374151;margin-left:10px;vertical-align:middle;">${text}</span>
          </td></tr>
        `).join("")}
      </table>

      ${btn("Analyser mon CV gratuitement →", "https://cvadapt.eu/analyse")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Tu peux te désinscrire à tout moment en répondant "STOP" à cet email.
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 2. CONFIRMATION DE PAIEMENT
// ══════════════════════════════════════════════════════════════
export function paymentConfirmationEmail({ plan, email }) {
  const isEtudiant = plan === "essentiel";
  const planLabel  = isEtudiant ? "Plan Étudiant" : "Plan Pro";
  const planDesc   = isEtudiant ? "15 CV/mois · Score ATS · Lettre de motivation" : "CV illimités · Score ATS · Support prioritaire";
  const planPrice  = isEtudiant ? "4,99€/mois" : "9,99€/mois";

  const content = `
    <!-- Bandeau vert succès -->
    <tr><td style="background:linear-gradient(135deg,#065f46,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="width:60px;height:60px;background:rgba(255,255,255,0.15);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;">✅</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        Paiement confirmé !
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#a7f3d0;">
        Ton abonnement ${planLabel} est actif.
      </p>
    </td></tr>

    <!-- Récapitulatif plan -->
    <tr><td style="padding:32px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;overflow:hidden;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Ton abonnement</p>
          <p style="margin:0 0 4px;font-size:20px;font-weight:800;color:#111827;">${planLabel}</p>
          <p style="margin:0 0 12px;font-size:14px;color:#6b7280;">${planDesc}</p>
          <span style="background:#2563eb;color:#fff;font-size:13px;font-weight:700;padding:6px 14px;border-radius:8px;">${planPrice}</span>
        </td></tr>
      </table>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:24px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
        Merci pour ta confiance ! Tu peux maintenant générer des CV illimités et optimisés pour chaque offre.
      </p>

      <!-- Ce que tu peux faire maintenant -->
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ["⚡", "Générer ton prochain CV", "https://cvadapt.eu/generate"],
          ["🎯", "Analyser ton CV existant", "https://cvadapt.eu/analyse"],
          ["📊", "Voir ton dashboard", "https://cvadapt.eu/dashboard"],
        ].map(([icon, label, href]) => `
          <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
            <a href="${href}" style="display:flex;align-items:center;text-decoration:none;gap:10px;">
              <span style="font-size:18px;">${icon}</span>
              <span style="font-size:14px;color:#2563eb;font-weight:600;">${label} →</span>
            </a>
          </td></tr>
        `).join("")}
      </table>

      ${btn("Générer mon CV maintenant →", "https://cvadapt.eu/generate")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Une question ? Réponds à cet email ou écris à
        <a href="mailto:contact@cvadapt.eu" style="color:#2563eb;">contact@cvadapt.eu</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 3b. EMAIL J+2 SANS CV — inscrits qui n'ont pas encore essayé
// ══════════════════════════════════════════════════════════════
export function noCvReminderEmail({ prenom }) {
  const content = `
    <!-- Header -->
    <tr><td style="background:#0f172a;padding:36px 40px 28px;text-align:center;">
      <h1 style="margin:0;font-size:21px;font-weight:800;color:#f8fafc;line-height:1.3;">
        ${prenom ? `${prenom}, ton` : "Ton"} premier CV ATS t'attend.
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#64748b;line-height:1.5;">
        Tu t'es inscrit(e) il y a 2 jours. Ça prend 30 secondes.
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px 0;">

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;">
        La plupart des CV envoyés ne sont jamais lus par un humain.
        Pas parce que le profil est mauvais — parce qu'un algorithme filtre avant.
      </p>

      <!-- 3 étapes simples -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        ${[
          ["1", "Colle une offre d'emploi", "Copie l'URL ou le texte de l'offre"],
          ["2", "Entre ton profil en 3 lignes", "Expériences, compétences, formation"],
          ["3", "Télécharge ton CV PDF", "Optimisé ATS avec les bons mots-clés"],
        ].map(([num, title, desc]) => `
          <tr><td style="padding:12px 16px;background:#f8fafc;border-radius:10px;margin-bottom:8px;display:block;border-left:3px solid #2563eb;">
            <span style="font-size:11px;font-weight:700;color:#2563eb;letter-spacing:1px;">ÉTAPE ${num}</span>
            <p style="margin:4px 0 2px;font-size:14px;font-weight:600;color:#111827;">${title}</p>
            <p style="margin:0;font-size:12px;color:#6b7280;">${desc}</p>
          </td></tr>
          <tr><td style="height:8px;"></td></tr>
        `).join("")}
      </table>

      ${btn("Générer mon premier CV →", "https://cvadapt.eu/generate")}

      <p style="margin:20px 0 32px;font-size:12px;color:#9ca3af;text-align:center;">
        Gratuit · Sans carte bancaire · 3 CV complets offerts
      </p>

    </td></tr>
    ${divider}
    <tr><td style="padding:20px 40px 28px;">
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.7;font-style:italic;">
        "J'ai construit CVAdapt pour les gens qui cherchent sans réseau.
        Si tu postules seul(e), cet outil est fait pour toi." — Damian, fondateur
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 3. EMAIL RELANCE — LIMITE 3 CV ATTEINTE
// ══════════════════════════════════════════════════════════════
export function upgradeReminderEmail({ prenom }) {
  const content = `
    <!-- Header navy -->
    <tr><td style="background:#0f172a;padding:36px 40px 32px;text-align:center;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">CVAdapt</p>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#f8fafc;line-height:1.3;">
        ${prenom ? `${prenom}, tu` : "Tu"} as généré 3 CV.<br>Le filtre n'a plus le même pouvoir.
      </h1>
    </td></tr>

    <tr><td style="padding:32px 40px 0;">

      <!-- Texte personnel -->
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;">
        75% des CV n'arrivent jamais sur le bureau d'un recruteur. Pas parce que le profil est mauvais —
        parce que le filtre ATS ne laisse pas passer.
      </p>
      <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.75;">
        Avec CVAdapt, tu es passé de l'autre côté. Tu sais comment ça fonctionne, et tu l'utilises.
        <strong style="color:#111827;">Continue.</strong>
      </p>

      <!-- Stat centrale -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:14px;margin-bottom:28px;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:30px;font-weight:900;color:#2563eb;letter-spacing:-1px;">4,99€<span style="font-size:16px;font-weight:600;color:#6b7280;">/mois</span></p>
            <p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">
              15 CV adaptés · Score ATS inclus · Lettre de motivation · Annulable en 1 clic
            </p>
          </td>
        </tr>
      </table>

      ${btn("Continuer — Plan Étudiant 4,99€/mois", "https://cvadapt.eu/tarifs")}

      <p style="margin:20px 0 32px;font-size:12px;color:#9ca3af;text-align:center;">
        Sans engagement · Paiement sécurisé Stripe · Annulation immédiate
      </p>

    </td></tr>

    <!-- Séparateur + note fondateur -->
    ${divider}
    <tr><td style="padding:20px 40px 28px;">
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.7;font-style:italic;">
        "J'ai construit CVAdapt parce que j'ai cherché un emploi sans réseau, en envoyant des CV dans le vide.
        Si tu postules activement, tu mérites que ton CV soit lu." — Damian, fondateur
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 4. EMAIL J+1 — ÉDUCATION ATS (séquence activation)
// ══════════════════════════════════════════════════════════════
export function atsEducationEmail({ prenom }) {
  const content = `
    <!-- Header bleu indigo -->
    <tr><td style="background:linear-gradient(135deg,#312e81,#4f46e5);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🤖</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Comment les ATS filtrent ton CV${prenom ? `, ${prenom}` : ""} ?
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#c7d2fe;">
        Ce que 75% des candidats ne savent pas.
      </p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        Un ATS (Applicant Tracking System) est un logiciel utilisé par <strong>99% des grandes entreprises</strong>
        pour trier les CV automatiquement — avant qu'un humain ne les lise.
      </p>

      <!-- 3 faits choc -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        ${[
          ["📊", "75%", "des CV sont rejetés par les ATS avant tout contact humain"],
          ["🔑", "60%", "des refus viennent de mots-clés manquants dans le CV"],
          ["⚡", "6 sec", "c'est le temps qu'un recruteur passe sur un CV qui passe le filtre"],
        ].map(([icon, stat, desc]) => `
          <tr><td style="padding:12px 16px;background:#f5f3ff;border-radius:12px;margin-bottom:8px;display:block;">
            <span style="font-size:22px;vertical-align:middle;">${icon}</span>
            <span style="font-size:20px;font-weight:800;color:#4f46e5;vertical-align:middle;margin:0 8px;">${stat}</span>
            <span style="font-size:13px;color:#6b7280;vertical-align:middle;">${desc}</span>
          </td></tr>
          <tr><td style="height:8px;"></td></tr>
        `).join("")}
      </table>

      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
        <strong>La solution :</strong> adapter ton CV à chaque offre avec les mots-clés exacts du poste.
        C'est exactement ce que CVAdapt fait en 30 secondes.
      </p>

      ${btn("Optimiser mon CV maintenant →", "https://cvadapt.eu/generate", "#4f46e5")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Tu reçois cet email car tu t'es inscrit(e) sur CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=STOP" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 5. EMAIL J+3 — TÉMOIGNAGE (preuve sociale)
// ══════════════════════════════════════════════════════════════
export function testimonialEmail({ prenom }) {
  const content = `
    <!-- Header vert -->
    <tr><td style="background:linear-gradient(135deg,#065f46,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🎯</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Comment Théo a décroché 3 alternances en 2 semaines
      </h1>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>

      <!-- Témoignage -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f0fdf4;border-left:4px solid #059669;border-radius:0 12px 12px 0;margin-bottom:24px;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;font-style:italic;">
            "Mon profil était générique. Zéro réponse pendant 3 semaines. J'ai utilisé CVAdapt
            pour adapter mon CV à chaque offre — les mots-clés exacts, la structure optimisée.
            En 2 semaines, j'avais 3 propositions d'alternance."
          </p>
          <p style="margin:0;font-size:13px;font-weight:700;color:#059669;">— Théo V., étudiant en alternance · Paris</p>
        </td></tr>
      </table>

      <!-- Before / After chiffres -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="width:48%;background:#fef2f2;border-radius:12px;padding:16px;text-align:center;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#dc2626;">34</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Score ATS avant</p>
          </td>
          <td style="width:4%;text-align:center;">
            <p style="font-size:20px;color:#9ca3af;">→</p>
          </td>
          <td style="width:48%;background:#f0fdf4;border-radius:12px;padding:16px;text-align:center;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#059669;">91</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Score ATS après</p>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        Théo n'est pas une exception. Chaque jour, des étudiants utilisent CVAdapt pour transformer
        leur candidature en 30 secondes. <strong>Tu es à 30 secondes de ton premier entretien.</strong>
      </p>

      ${btn("Générer mon CV optimisé →", "https://cvadapt.eu/generate", "#059669")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=STOP" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 6. EMAIL J+7 — RÉACTIVATION (inactifs)
// ══════════════════════════════════════════════════════════════
export function reactivationEmail({ prenom }) {
  const content = `
    <tr><td style="padding:40px 40px 32px;">

      <div style="text-align:center;margin-bottom:28px;">
        <span style="font-size:48px;">👋</span>
      </div>

      <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#111827;text-align:center;line-height:1.3;">
        ${prenom ? `${prenom}, ton` : "Ton"} CV attend toujours d'être optimisé
      </h1>
      <p style="margin:0 0 28px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        Pendant cette semaine, ${Math.floor(Math.random() * 300 + 800)} étudiants ont décroché des entretiens grâce à CVAdapt.
      </p>

      <!-- Stats urgence -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;margin-bottom:28px;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#ea580c;">⚠️ Ce que tu rates en ce moment</p>
          ${[
            "Des offres qui correspondent à ton profil",
            "Des CV adaptés aux mots-clés de chaque poste",
            "Un score ATS qui booste tes chances de 3×",
          ].map(f => `
            <p style="margin:0 0 6px;font-size:13px;color:#374151;">
              <span style="color:#ea580c;font-weight:700;margin-right:6px;">→</span>${f}
            </p>
          `).join("")}
        </td></tr>
      </table>

      <!-- Rappel offre gratuite -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;margin-bottom:28px;">
        <tr><td style="padding:20px 24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Rappel : tu as encore</p>
          <p style="margin:0 0 8px;font-size:32px;font-weight:800;color:#2563eb;">3 CV gratuits</p>
          <p style="margin:0;font-size:13px;color:#6b7280;">Sans carte bancaire · Résultat en 30 secondes</p>
        </td></tr>
      </table>

      ${btn("Reprendre maintenant →", "https://cvadapt.eu/generate")}

      <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
        C'est la dernière fois qu'on te contacte si tu ne génères pas de CV.
        <a href="mailto:contact@cvadapt.eu?subject=STOP" style="color:#9ca3af;">Se désinscrire</a>
      </p>

    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 7. EMAIL J+2 — FILTRE ATS (déclencheur)
// ══════════════════════════════════════════════════════════════
export function j2Email({ prenom }) {
  const content = `
    <!-- Header rouge-orange -->
    <tr><td style="background:linear-gradient(135deg,#991b1b,#dc2626);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🚨</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Ton CV est peut-être invisible pour les recruteurs
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#fca5a5;">
        La vérité que personne ne te dit
      </p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        <strong>75% des CV ne sont jamais lus par un humain.</strong><br>
        Ils sont filtrés automatiquement par un logiciel ATS avant même d'atteindre le recruteur.
      </p>

      <!-- Stat choc -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#fef2f2;border:1px solid #fecaca;border-radius:16px;margin-bottom:24px;">
        <tr><td style="padding:24px;text-align:center;">
          <p style="margin:0;font-size:48px;font-weight:900;color:#dc2626;line-height:1;">75%</p>
          <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">des CV filtrés <strong>avant</strong> d'être lus</p>
        </td></tr>
      </table>

      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
        Ces filtres cherchent des mots-clés précis. Si ton CV ne les contient pas <strong>dans le bon format</strong> — tu es éliminé en 3 secondes, automatiquement.
      </p>

      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
        CVAdapt analyse l'offre d'emploi et intègre exactement les mots-clés attendus dans ton CV. <strong>Résultat : ton CV passe les filtres et atterrit sur le bureau du recruteur.</strong>
      </p>

      ${btn("Tester mon score ATS gratuitement →", "https://cvadapt.eu/analyse", "#dc2626")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 8. EMAIL J+5 — PREUVE SOCIALE (Emma)
// ══════════════════════════════════════════════════════════════
export function j5Email({ prenom }) {
  const content = `
    <!-- Header violet -->
    <tr><td style="background:linear-gradient(135deg,#4c1d95,#7c3aed);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🏆</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Emma a décroché son stage en 2 semaines sans expérience
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#ddd6fe;">Voilà exactement ce qu'elle a fait</p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>

      <!-- Témoignage Emma -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f5f3ff;border-left:4px solid #7c3aed;border-radius:0 12px 12px 0;margin-bottom:24px;">
        <tr><td style="padding:20px 24px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div style="width:40px;height:40px;background:#7c3aed;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:white;vertical-align:middle;margin-right:10px;">E</div>
            <span style="font-weight:700;color:#4c1d95;vertical-align:middle;">Emma T. — Master Marketing · Toulouse</span>
          </div>
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;font-style:italic;">
            "Sans expérience professionnelle, je ne savais pas quoi mettre dans mon CV.
            CVAdapt a mis en avant mes projets universitaires exactement comme les recruteurs les cherchent.
            J'ai eu 4 entretiens en 2 semaines et j'ai signé mon stage chez L'Oréal."
          </p>
        </td></tr>
      </table>

      <!-- Ce qu'Emma a fait -->
      <p style="margin:0 0 16px;font-size:15px;font-weight:700;color:#111827;">Ce qu'Emma a fait :</p>
      ${[
        ["📋", "Elle a collé l'offre de stage dans CVAdapt"],
        ["✍️", "Elle a ajouté ses projets et compétences"],
        ["🚀", "CVAdapt a généré un CV optimisé en 30 secondes"],
        ["📞", "4 entretiens décrochés en 2 semaines"],
      ].map(([icon, text]) => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
          <tr>
            <td style="width:36px;text-align:center;font-size:18px;">${icon}</td>
            <td style="font-size:14px;color:#374151;line-height:1.6;">${text}</td>
          </tr>
        </table>
      `).join("")}

      <p style="margin:20px 0 24px;font-size:15px;color:#374151;line-height:1.7;">
        <strong>Tu peux faire exactement pareil.</strong> Gratuit. 30 secondes. Sans CB.
      </p>

      ${btn("Générer mon CV comme Emma →", "https://cvadapt.eu/generate", "#7c3aed")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 9. EMAIL J+7 — PREUVE SOCIALE + STATS (push upgrade)
// ══════════════════════════════════════════════════════════════
export function j7Email({ prenom }) {
  const content = `
    <!-- Header vert -->
    <tr><td style="background:linear-gradient(135deg,#064e3b,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">📊</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Ce que les recruteurs voient sur ton CV
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#a7f3d0;">Données réelles — cette semaine</p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
        Voici ce qu'on observe chez les utilisateurs CVAdapt cette semaine :
      </p>

      <!-- Stats -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;margin-bottom:24px;">
        <tr><td style="padding:20px 24px;border-bottom:1px solid #d1fae5;">
          <span style="font-size:32px;font-weight:900;color:#059669;">85%</span>
          <span style="font-size:14px;color:#374151;margin-left:12px;">des CV passent les filtres ATS dès le <strong>premier essai</strong></span>
        </td></tr>
        <tr><td style="padding:20px 24px;border-bottom:1px solid #d1fae5;">
          <span style="font-size:32px;font-weight:900;color:#059669;">3×</span>
          <span style="font-size:14px;color:#374151;margin-left:12px;">plus de réponses en moyenne vs un CV non optimisé</span>
        </td></tr>
        <tr><td style="padding:20px 24px;">
          <span style="font-size:32px;font-weight:900;color:#059669;">6s</span>
          <span style="font-size:14px;color:#374151;margin-left:12px;">c'est le temps qu'un recruteur passe sur un CV — <strong>les mots-clés font tout</strong></span>
        </td></tr>
      </table>

      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
        Si tu n'as pas encore postulé avec ton CV optimisé, c'est le bon moment.<br>
        Le plan Étudiant débloque le <strong>score ATS complet</strong> et les <strong>mots-clés manquants</strong> identifiés automatiquement.
      </p>

      ${btn("Voir mon score ATS →", "https://cvadapt.eu/analyse", "#059669")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 10. EMAIL J+14 — DERNIÈRE RELANCE / CODE PROMO
// ══════════════════════════════════════════════════════════════
export function j14Email({ prenom }) {
  const content = `
    <!-- Header orange foncé -->
    <tr><td style="background:linear-gradient(135deg,#92400e,#d97706);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">⏰</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Ça fait 2 semaines — une offre pour toi
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#fde68a;">Valable 72h uniquement</p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        Ça fait 2 semaines que tu as créé ton compte sur CVAdapt. Si tu cherches encore
        un poste, les fonctionnalités premium font vraiment la différence :
        score ATS complet, mots-clés manquants identifiés, lettre de motivation incluse.
      </p>

      <!-- Code promo -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#fffbeb;border:2px dashed #f59e0b;border-radius:16px;margin-bottom:24px;">
        <tr><td style="padding:24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Code promo exclusif</p>
          <p style="margin:0 0 8px;font-size:36px;font-weight:900;color:#d97706;letter-spacing:4px;font-family:monospace;">CV20</p>
          <p style="margin:0;font-size:14px;color:#374151;font-weight:600;">-20% sur le premier mois &nbsp;·&nbsp; Valable 72h</p>
        </td></tr>
      </table>

      ${btn("Activer mon -20% →", "https://cvadapt.eu/tarifs?promo=CV20", "#d97706")}

      <p style="margin:20px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
        Après ça, je ne te dérangerai plus. Promis. 🙏
      </p>
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 11. EMAIL J+3 — SONDAGE (3 questions, récompense 3 CV)
// ══════════════════════════════════════════════════════════════
export function j3SurveyEmail({ prenom, baseUrl = "https://cvadapt.eu" }) {
  function surveyBtn(label, emoji, q, val, email) {
    const url = `${baseUrl}/api/survey?email=${encodeURIComponent(email)}&q=${encodeURIComponent(q)}&a=${encodeURIComponent(val)}`;
    return `
      <a href="${url}" style="display:inline-block;margin:6px;padding:10px 20px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:600;color:#111827;text-decoration:none;">
        ${emoji} ${label}
      </a>`;
  }

  const content = `
    <!-- Header vert -->
    <tr><td style="background:linear-gradient(135deg,#064e3b,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🎁</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        30 secondes → 3 CV offerts
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:#a7f3d0;">
        Aide-nous à améliorer CVAdapt pour toi
      </p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}<br><br>
        3 questions rapides sur ta recherche d'emploi — tes réponses nous aident à rendre CVAdapt vraiment utile. En échange, <strong>3 CV supplémentaires</strong> sont ajoutés à ton compte.
      </p>

      <!-- Q1 -->
      <div style="background:#f9fafb;border-radius:14px;padding:20px 24px;margin-bottom:20px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;">
          1️⃣ Tu cherches plutôt…
        </p>
        <div style="text-align:center;">
          ${surveyBtn("Un stage", "🎓", "objectif", "stage", prenom || "")}
          ${surveyBtn("Un emploi", "💼", "objectif", "emploi", prenom || "")}
          ${surveyBtn("Une alternance", "🔄", "objectif", "alternance", prenom || "")}
        </div>
      </div>

      <!-- Q2 -->
      <div style="background:#f9fafb;border-radius:14px;padding:20px 24px;margin-bottom:20px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;">
          2️⃣ La partie la plus frustrante quand tu postules…
        </p>
        <div style="text-align:center;">
          ${surveyBtn("Adapter mon CV", "📝", "frustration", "adapter-cv", prenom || "")}
          ${surveyBtn("Passer les ATS", "🤖", "frustration", "ats", prenom || "")}
          ${surveyBtn("Rédiger la LM", "✉️", "frustration", "lettre-motivation", prenom || "")}
          ${surveyBtn("Trouver des offres", "🔍", "frustration", "trouver-offres", prenom || "")}
        </div>
      </div>

      <!-- Q3 -->
      <div style="background:#f9fafb;border-radius:14px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;">
          3️⃣ Tu as découvert CVAdapt comment ?
        </p>
        <div style="text-align:center;">
          ${surveyBtn("Reddit", "🔴", "source", "reddit", prenom || "")}
          ${surveyBtn("Un ami", "👥", "source", "ami", prenom || "")}
          ${surveyBtn("Google", "🔎", "source", "google", prenom || "")}
          ${surveyBtn("Réseaux sociaux", "📱", "source", "reseaux-sociaux", prenom || "")}
          ${surveyBtn("Autre", "❓", "source", "autre", prenom || "")}
        </div>
      </div>

      <!-- Récompense -->
      <div style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:14px;padding:16px 24px;text-align:center;margin-bottom:8px;">
        <p style="margin:0;font-size:14px;color:#065f46;font-weight:600;">
          🎁 Chaque réponse = 1 CV ajouté à ton compte · 3 questions = <strong>3 CV offerts</strong>
        </p>
      </div>
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 10. EMAIL MERCI SONDAGE — confirmation récompense
// ══════════════════════════════════════════════════════════════
export function surveyThanksEmail({ prenom, question, reponse }) {
  const labels = {
    objectif: "Ce que tu cherches",
    frustration: "Ta principale frustration",
    source: "Comment tu nous as trouvés",
  };
  const content = `
    <tr><td style="background:linear-gradient(135deg,#064e3b,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">✅</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">
        Réponse enregistrée !
      </h1>
    </td></tr>
    <tr><td style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Merci ${prenom} !` : "Merci !"} Ton avis compte vraiment.
      </p>
      <div style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:14px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">${labels[question] || question}</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#065f46;">${reponse}</p>
      </div>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;">
        <strong>+1 CV ajouté à ton compte.</strong> Réponds aux 2 autres questions pour obtenir tes 3 CV au total.
      </p>
      ${btn("Générer mon CV optimisé →", "https://cvadapt.eu/generate", "#059669")}
    </td></tr>
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:16px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 11. BROADCAST — campagne mass email
// ══════════════════════════════════════════════════════════════
export function broadcastEmail({ prenom }) {
  const content = `
    <!-- Header bleu impact -->
    <tr><td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🎯</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        ${prenom ? `${prenom}, tu` : "Tu"} postules sans avoir de réponse ?
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">
        C'est l'ATS — pas ton profil. Voilà comment le passer.
      </p>
    </td></tr>

    <!-- Corps -->
    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Salut ${prenom},` : "Salut,"}
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        <strong>75% des CV ne sont jamais lus par un humain.</strong><br>
        Ils sont filtrés automatiquement avant d'atteindre le recruteur — souvent à cause de mots-clés manquants.
      </p>

      <!-- Stat visuelle -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:32px;font-weight:800;color:#dc2626;">34</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Score ATS moyen</p>
          </td>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:24px;font-weight:800;color:#2563eb;">→</p>
          </td>
          <td style="padding:20px;text-align:center;">
            <p style="margin:0;font-size:32px;font-weight:800;color:#059669;">91</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Après CVAdapt</p>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        CVAdapt analyse l'offre d'emploi et intègre automatiquement les mots-clés attendus dans ton CV.
        <strong>Résultat : ton CV passe les filtres et arrive sur le bureau du recruteur.</strong>
      </p>

      <!-- Ce que ça fait -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        ${[
          ["📋", "Tu colles l'offre d'emploi"],
          ["✍️", "Tu entres ton expérience en quelques lignes"],
          ["🚀", "CVAdapt génère ton CV optimisé en 30 secondes"],
          ["📞", "Les recruteurs commencent à te rappeler"],
        ].map(([icon, text]) => `
          <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
            <span style="font-size:18px;vertical-align:middle;">${icon}</span>
            <span style="font-size:14px;color:#374151;margin-left:10px;vertical-align:middle;">${text}</span>
          </td></tr>
        `).join("")}
      </table>

      <!-- Réassurance -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;margin-bottom:28px;">
        <tr><td style="padding:16px 24px;text-align:center;">
          <p style="margin:0;font-size:14px;color:#065f46;font-weight:600;">
            ✓ Gratuit pour commencer &nbsp;·&nbsp; ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ 30 secondes
          </p>
        </td></tr>
      </table>

      ${btn("Générer mon CV maintenant — C'est gratuit →", "https://cvadapt.eu/generate")}
    </td></tr>

    <!-- Footer card -->
    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Tu reçois cet email car tu t'es inscrit(e) sur CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Se désinscrire</a>
      </p>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// ENGLISH VERSIONS — wrapper + drip sequence
// ══════════════════════════════════════════════════════════════

function wrapperEN(content) {
  return `${BASE}
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 16px;">
      <tr><td align="center">
        <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

          <!-- HEADER -->
          <tr><td style="padding-bottom:24px;text-align:center;">
            <img src="https://cvadapt.eu/logo-256.png" width="44" height="44"
              alt="CVAdapt" style="border-radius:10px;display:inline-block;vertical-align:middle;margin-right:10px;" />
            <span style="font-size:20px;font-weight:800;color:#2563eb;vertical-align:middle;letter-spacing:-0.5px;">CVAdapt</span>
          </td></tr>

          <!-- CARD -->
          <tr><td style="background:#ffffff;border-radius:20px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
            ${content}
          </td></tr>

          <!-- FOOTER -->
          <tr><td style="padding-top:24px;text-align:center;">
            <p style="font-size:12px;color:#9ca3af;margin:0 0 8px;">
              CVAdapt · <a href="https://cvadapt.eu" style="color:#9ca3af;">cvadapt.eu</a> ·
              <a href="mailto:contact@cvadapt.eu" style="color:#9ca3af;">contact@cvadapt.eu</a>
            </p>
            <p style="font-size:11px;color:#d1d5db;margin:0 0 6px;">© ${new Date().getFullYear()} CVAdapt</p>
            <p style="font-size:11px;color:#d1d5db;margin:0;">
              <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#d1d5db;text-decoration:underline;">Unsubscribe</a>
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  ${CLOSE}`;
}

// EN-1. Welcome email — newsletter signup
export function welcomeNewsletterEmailEN() {
  const content = `
    <tr><td style="background:linear-gradient(135deg,#1e40af,#2563eb);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">📬</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        Welcome to CVAdapt!
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">
        Weekly tips to land more interviews — starting now.
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
        Thanks for joining 🙌
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
        Every week you'll get:
      </p>

      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ["🎯", "Tips to pass ATS filters every time"],
          ["📝", "The most common resume mistakes (and how to fix them)"],
          ["💡", "Concrete interview advice"],
          ["🚀", "Exclusive job search resources"],
        ].map(([icon, text]) => `
          <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
            <span style="font-size:18px;vertical-align:middle;">${icon}</span>
            <span style="font-size:14px;color:#374151;margin-left:10px;vertical-align:middle;">${text}</span>
          </td></tr>
        `).join("")}
      </table>

      ${btn("Analyze my resume for free →", "https://cvadapt.eu/analyse")}
    </td></tr>

    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        You can unsubscribe at any time by replying "STOP" to this email.
      </p>
    </td></tr>
  `;
  return wrapperEN(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// EN-2. J+2 email — "Your resume might be invisible"
export function j2EmailEN({ prenom }) {
  const content = `
    <tr><td style="background:linear-gradient(135deg,#1e40af,#2563eb);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">👻</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        ${prenom ? `${prenom}, your` : "Your"} resume might be invisible to recruiters
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">
        Here's why — and how to fix it in 30 seconds.
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Hi ${prenom},` : "Hi,"}
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        <strong>75% of resumes are rejected before a human ever reads them.</strong><br>
        ATS software automatically filters them out — usually because of missing keywords.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:32px;font-weight:800;color:#dc2626;">34</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Average ATS score</p>
          </td>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:24px;font-weight:800;color:#2563eb;">→</p>
          </td>
          <td style="padding:20px;text-align:center;">
            <p style="margin:0;font-size:32px;font-weight:800;color:#059669;">91</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">After CVAdapt</p>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        CVAdapt reads the job posting and automatically weaves in the right keywords.
        <strong>Result: your resume passes the filters and lands on the recruiter's desk.</strong>
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        ${[
          ["📋", "Paste the job posting"],
          ["✍️", "Enter your experience in a few lines"],
          ["🚀", "CVAdapt generates your optimized resume in 30 seconds"],
          ["📞", "Recruiters start calling back"],
        ].map(([icon, text]) => `
          <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
            <span style="font-size:18px;vertical-align:middle;">${icon}</span>
            <span style="font-size:14px;color:#374151;margin-left:10px;vertical-align:middle;">${text}</span>
          </td></tr>
        `).join("")}
      </table>

      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;margin-bottom:28px;">
        <tr><td style="padding:16px 24px;text-align:center;">
          <p style="margin:0;font-size:14px;color:#065f46;font-weight:600;">
            ✓ Free to start &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ 30 seconds
          </p>
        </td></tr>
      </table>

      ${btn("Generate my resume now — It's free →", "https://cvadapt.eu/generate")}
    </td></tr>

    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        You're receiving this because you signed up on CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </td></tr>
  `;
  return wrapperEN(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// EN-3. J+5 email — social proof
export function j5EmailEN({ prenom }) {
  const content = `
    <tr><td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">⭐</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        How Alex landed his job in 2 weeks with no experience
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">
        One thing made the difference.
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Hey ${prenom},` : "Hey,"}
      </p>

      <!-- Testimonial card -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:16px;margin-bottom:24px;">
        <tr><td style="padding:28px 28px;">
          <p style="margin:0 0 16px;font-size:16px;color:#0f172a;line-height:1.7;font-style:italic;">
            "I applied to 30 jobs with my old resume — zero responses.
            I tried CVAdapt for one posting, adapted my resume in 30 seconds,
            and got a call back the next day. <strong>I'm now 3 weeks into my new job.</strong>"
          </p>
          <p style="margin:0;font-size:14px;font-weight:700;color:#2563eb;">Alex M. — Software Engineer, 23</p>
        </td></tr>
      </table>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        Alex's profile wasn't exceptional — he had a standard CV and some internships.
        <strong>What changed? A resume tailored to each job posting, with the exact keywords recruiters were looking for.</strong>
      </p>

      <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
        If you haven't tried CVAdapt yet, here's your chance. 3 resumes free, no credit card.
      </p>

      ${btn("Generate my tailored resume →", "https://cvadapt.eu/generate")}
    </td></tr>

    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        You're receiving this because you signed up on CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </td></tr>
  `;
  return wrapperEN(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// EN-4. J+7 email — ATS stats
export function j7EmailEN({ prenom }) {
  const content = `
    <tr><td style="background:linear-gradient(135deg,#065f46,#059669);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">📊</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        ${prenom ? `${prenom}, here's` : "Here's"} why 85% of CVAdapt resumes pass ATS
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#a7f3d0;">
        The numbers that explain everything.
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Hi ${prenom},` : "Hi,"}
      </p>

      <!-- Stats table -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;margin-bottom:28px;overflow:hidden;">
        ${[
          ["85%", "of CVAdapt resumes pass ATS filters"],
          ["3×", "more callbacks for tailored resumes"],
          ["6 sec", "average time a recruiter spends on a resume"],
        ].map(([stat, label]) => `
          <tr>
            <td style="padding:16px 20px;border-bottom:1px solid #dcfce7;width:30%;text-align:center;">
              <span style="font-size:28px;font-weight:800;color:#059669;">${stat}</span>
            </td>
            <td style="padding:16px 20px;border-bottom:1px solid #dcfce7;font-size:14px;color:#374151;line-height:1.5;">
              ${label}
            </td>
          </tr>
        `).join("")}
      </table>

      <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
        6 seconds. That's it. Your resume needs to make an instant impact — with the exact keywords the recruiter searched for. CVAdapt does this automatically.
      </p>

      ${btn("Check my ATS score — Free →", "https://cvadapt.eu/analyse")}
    </td></tr>

    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        You're receiving this because you signed up on CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </td></tr>
  `;
  return wrapperEN(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// EN-5. J+14 email — promo
export function j14EmailEN({ prenom }) {
  const content = `
    <tr><td style="background:linear-gradient(135deg,#78350f,#d97706);padding:36px 40px 32px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🎁</div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">
        ${prenom ? `${prenom}, a` : "A"} gift for you — 20% off
      </h1>
      <p style="margin:10px 0 0;font-size:15px;color:#fde68a;">
        Exclusive offer · Expires in 72 hours
      </p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        ${prenom ? `Hi ${prenom},` : "Hi,"}
      </p>

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        You've been with CVAdapt for 2 weeks. To help you land your next interview, here's a <strong>20% discount on any plan</strong>.
      </p>

      <!-- Promo code -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#fffbeb;border:2px dashed #fbbf24;border-radius:16px;margin-bottom:28px;">
        <tr><td style="padding:24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Your promo code</p>
          <p style="margin:0 0 4px;font-size:32px;font-weight:900;color:#d97706;letter-spacing:3px;font-family:monospace;">CV20</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">Valid 72 hours · One use per account</p>
        </td></tr>
      </table>

      <!-- Plans -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        ${[
          ["🎓", "Student plan", "15 resumes/month · ATS score · Cover letter", "€3.99/mo"],
          ["⚡", "Pro plan", "Unlimited resumes · Priority support", "€7.99/mo"],
        ].map(([icon, plan, desc, price]) => `
          <tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:36px;font-size:22px;">${icon}</td>
                <td>
                  <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#111827;">${plan}</p>
                  <p style="margin:0;font-size:12px;color:#6b7280;">${desc}</p>
                </td>
                <td style="text-align:right;white-space:nowrap;">
                  <span style="font-size:16px;font-weight:800;color:#d97706;">${price}</span>
                  <span style="font-size:11px;color:#9ca3af;display:block;">with CV20</span>
                </td>
              </tr>
            </table>
          </td></tr>
        `).join("")}
      </table>

      ${btn("Unlock unlimited resumes →", "https://cvadapt.eu/tarifs?promo=CV20", "#d97706")}
    </td></tr>

    <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;border-radius:0 0 20px 20px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        You're receiving this because you signed up on CVAdapt.
        <a href="mailto:contact@cvadapt.eu?subject=unsubscribe" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </td></tr>
  `;
  return wrapperEN(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 12. NOTIFICATION INTERNE (pour toi)
// ══════════════════════════════════════════════════════════════
export function ownerNotificationEmail({ type, data }) {
  const titles = {
    newsletter: "📬 Nouvelle inscription newsletter",
    payment:    "💰 Nouveau paiement reçu",
  };

  const content = `
    <tr><td style="padding:32px 40px;">
      <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#111827;">${titles[type] || "📢 Notification CVAdapt"}</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        ${Object.entries(data).map(([key, val]) => `
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-size:13px;font-weight:600;color:#6b7280;width:40%;">${key}</td>
            <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-size:13px;color:#111827;">${val}</td>
          </tr>
        `).join("")}
      </table>
    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}
