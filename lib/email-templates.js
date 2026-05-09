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
            <p style="font-size:11px;color:#d1d5db;margin:0;">© 2025 CVAdapt — Fait en France 🇫🇷</p>
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
// 3. EMAIL RELANCE — LIMITE 3 CV ATTEINTE
// ══════════════════════════════════════════════════════════════
export function upgradeReminderEmail({ prenom }) {
  const content = `
    <tr><td style="padding:40px 40px 32px;">

      <!-- Emoji header -->
      <div style="text-align:center;margin-bottom:28px;">
        <span style="font-size:48px;">🚀</span>
      </div>

      <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#111827;text-align:center;line-height:1.3;">
        Tu as utilisé tes 3 CV gratuits${prenom ? `, ${prenom}` : ""} !
      </h1>
      <p style="margin:0 0 28px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        Tu postules activement — c'est le bon moment pour continuer sans limite.
      </p>

      <!-- Stats -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:16px;margin-bottom:28px;">
        <tr>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#2563eb;">3×</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">plus de rappels</p>
          </td>
          <td style="padding:20px;text-align:center;border-right:1px solid #dbeafe;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#2563eb;">30s</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">par candidature</p>
          </td>
          <td style="padding:20px;text-align:center;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#2563eb;">4,99€</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">par mois</p>
          </td>
        </tr>
      </table>

      <!-- Offre -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;margin-bottom:28px;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;">Plan Étudiant — 4,99€/mois</p>
          ${["15 CV adaptés par mois", "Score ATS complet sur chaque CV", "Lettre de motivation incluse", "Annulation en 1 clic"].map(f => `
            <p style="margin:0 0 8px;font-size:13px;color:#374151;">
              <span style="color:#2563eb;font-weight:700;margin-right:8px;">✓</span>${f}
            </p>
          `).join("")}
        </td></tr>
      </table>

      ${btn("Continuer avec le plan Étudiant — 4,99€/mois", "https://cvadapt.eu/tarifs")}

      <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
        Sans engagement · Annulable à tout moment · Paiement sécurisé Stripe
      </p>

    </td></tr>
  `;
  return wrapper(`<table width="100%" cellpadding="0" cellspacing="0">${content}</table>`);
}

// ══════════════════════════════════════════════════════════════
// 4. NOTIFICATION INTERNE (pour toi)
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
