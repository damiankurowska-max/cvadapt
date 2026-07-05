/**
 * Cron BDE outreach — Prospection quotidienne automatisée
 * Envoie 5 emails directement aux BDE chaque jour à 7h
 * Schedule : tous les jours à 7h (vercel.json)
 */
import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";

const BDE_CONTACTS = [
  // ── Grandes écoles Business ─────────────────────────────────────────────
  { ecole: "HEC Paris",              type: "business",     email: "bde@hec.edu" },
  { ecole: "ESSEC",                  type: "business",     email: "bde@essec.edu" },
  { ecole: "ESCP",                   type: "business",     email: "bde@escp.eu" },
  { ecole: "EM Lyon",                type: "business",     email: "bde@emlyon.com" },
  { ecole: "KEDGE",                  type: "business",     email: "bde@kedge.edu" },
  { ecole: "EDHEC",                  type: "business",     email: "bde@edhec.edu" },
  { ecole: "Audencia",               type: "business",     email: "bde@audencia.com" },
  { ecole: "Grenoble EM",            type: "business",     email: "bde@grenoble-em.com" },
  { ecole: "TBS Education",          type: "business",     email: "bde@tbs-education.fr" },
  { ecole: "Skema",                  type: "business",     email: "bde@skema.edu" },
  { ecole: "NEOMA",                  type: "business",     email: "bde@neoma-bs.fr" },
  { ecole: "ICN Business School",    type: "business",     email: "bde@icn-artem.com" },
  { ecole: "Montpellier BS",         type: "business",     email: "bde@montpellier-bs.com" },
  { ecole: "BSB Dijon",              type: "business",     email: "bde@bsb-education.fr" },
  { ecole: "ESC Pau",                type: "business",     email: "bde@esc-pau.fr" },
  { ecole: "INSEEC",                 type: "business",     email: "bde@inseec.com" },
  { ecole: "Ipag",                   type: "business",     email: "bde@ipag.fr" },

  // ── Sciences Po / IEP ───────────────────────────────────────────────────
  { ecole: "Sciences Po Paris",      type: "sciencespo",   email: "bde@sciencespo.fr" },
  { ecole: "Sciences Po Lyon",       type: "sciencespo",   email: "bde@iep-lyon.fr" },
  { ecole: "Sciences Po Bordeaux",   type: "sciencespo",   email: "bde@sciencespobordeaux.fr" },
  { ecole: "Sciences Po Grenoble",   type: "sciencespo",   email: "bde@iepg.fr" },
  { ecole: "Sciences Po Lille",      type: "sciencespo",   email: "bde@sciencespo-lille.eu" },
  { ecole: "Sciences Po Rennes",     type: "sciencespo",   email: "bde@sciencespo-rennes.fr" },
  { ecole: "Sciences Po Aix",        type: "sciencespo",   email: "bde@sciencespo-aix.fr" },
  { ecole: "Sciences Po Strasbourg", type: "sciencespo",   email: "bde@iep.unistra.fr" },
  { ecole: "Sciences Po Toulouse",   type: "sciencespo",   email: "bde@iep.ut-capitole.fr" },

  // ── Grandes Écoles Ingénieurs ────────────────────────────────────────────
  { ecole: "Polytechnique",          type: "engineering",  email: "bde@polytechnique.edu" },
  { ecole: "CentraleSupélec",        type: "engineering",  email: "bde@centralesupelec.fr" },
  { ecole: "Télécom Paris",          type: "engineering",  email: "bde@telecom-paris.fr" },
  { ecole: "ENSTA Paris",            type: "engineering",  email: "bde@ensta-paris.fr" },
  { ecole: "ISAE-SUPAERO",           type: "engineering",  email: "bde@isae-supaero.fr" },
  { ecole: "Arts et Métiers",        type: "engineering",  email: "bde@ensam.eu" },
  { ecole: "INSA Lyon",              type: "engineering",  email: "bde@insa-lyon.fr" },
  { ecole: "INSA Toulouse",          type: "engineering",  email: "bde@insa-toulouse.fr" },
  { ecole: "INSA Rennes",            type: "engineering",  email: "bde@insa-rennes.fr" },
  { ecole: "INSA Strasbourg",        type: "engineering",  email: "bde@insa-strasbourg.fr" },
  { ecole: "IMT Atlantique",         type: "engineering",  email: "bde@imt-atlantique.fr" },
  { ecole: "UTC Compiègne",          type: "engineering",  email: "bde@utc.fr" },
  { ecole: "UTT Troyes",             type: "engineering",  email: "bde@utt.fr" },
  { ecole: "UTBM Belfort",           type: "engineering",  email: "bde@utbm.fr" },
  { ecole: "ENSAE Paris",            type: "engineering",  email: "bde@ensae.fr" },
  { ecole: "ENSAI Rennes",           type: "engineering",  email: "bde@ensai.fr" },
  { ecole: "Mines ParisTech",        type: "engineering",  email: "bde@minesparis.psl.eu" },
  { ecole: "Mines Saint-Étienne",    type: "engineering",  email: "bde@emse.fr" },
  { ecole: "Grenoble INP",           type: "engineering",  email: "bde@grenoble-inp.fr" },
  { ecole: "CPE Lyon",               type: "engineering",  email: "bde@cpe.fr" },
  { ecole: "ESIEE Paris",            type: "engineering",  email: "bde@esiee.fr" },
  { ecole: "EFREI Paris",            type: "engineering",  email: "bde@efrei.fr" },
  { ecole: "EPITA",                  type: "engineering",  email: "bde@epita.fr" },
  { ecole: "EPITECH",                type: "engineering",  email: "bde@epitech.eu" },
  { ecole: "ISEP Paris",             type: "engineering",  email: "bde@isep.fr" },
  { ecole: "ECE Paris",              type: "engineering",  email: "bde@ece.fr" },
  { ecole: "ENSIIE",                 type: "engineering",  email: "bde@ensiie.fr" },

  // ── Universités Île-de-France ────────────────────────────────────────────
  { ecole: "Sorbonne Université",    type: "university",   email: "bde@sorbonne-universite.fr" },
  { ecole: "Paris Dauphine",         type: "university",   email: "bde@dauphine.eu" },
  { ecole: "Paris Nanterre",         type: "university",   email: "bde@parisnanterre.fr" },
  { ecole: "Paris Saclay",           type: "university",   email: "bde@universite-paris-saclay.fr" },
  { ecole: "CY Cergy Paris",         type: "university",   email: "bde@cyu.fr" },
  { ecole: "UPEC",                   type: "university",   email: "bde@u-pec.fr" },
  { ecole: "Paris 8 Vincennes",      type: "university",   email: "bde@univ-paris8.fr" },
  { ecole: "Université Paris Cité",  type: "university",   email: "bde@u-paris.fr" },
  { ecole: "Paris 1 Panthéon",       type: "university",   email: "bde@univ-paris1.fr" },

  // ── Universités Régions ──────────────────────────────────────────────────
  { ecole: "Lyon 2",                 type: "university",   email: "bde@univ-lyon2.fr" },
  { ecole: "Lyon 3",                 type: "university",   email: "bde@univ-lyon3.fr" },
  { ecole: "Bordeaux",               type: "university",   email: "bde@u-bordeaux.fr" },
  { ecole: "Aix-Marseille",          type: "university",   email: "bde@univ-amu.fr" },
  { ecole: "Toulouse 1 Capitole",    type: "university",   email: "bde@ut-capitole.fr" },
  { ecole: "Toulouse 3",             type: "university",   email: "bde@univ-tlse3.fr" },
  { ecole: "Toulouse 2 Jean-Jaurès", type: "university",   email: "bde@univ-tlse2.fr" },
  { ecole: "Strasbourg",             type: "university",   email: "bde@unistra.fr" },
  { ecole: "Lille",                  type: "university",   email: "bde@univ-lille.fr" },
  { ecole: "Grenoble Alpes",         type: "university",   email: "bde@univ-grenoble-alpes.fr" },
  { ecole: "Nantes",                 type: "university",   email: "bde@univ-nantes.fr" },
  { ecole: "Rennes 1",               type: "university",   email: "bde@univ-rennes.fr" },
  { ecole: "Rennes 2",               type: "university",   email: "bde@univ-rennes2.fr" },
  { ecole: "Montpellier",            type: "university",   email: "bde@umontpellier.fr" },
  { ecole: "Nice Côte d'Azur",       type: "university",   email: "bde@univ-cotedazur.fr" },
  { ecole: "Rouen",                  type: "university",   email: "bde@univ-rouen.fr" },
  { ecole: "Caen Normandie",         type: "university",   email: "bde@unicaen.fr" },
  { ecole: "Clermont Auvergne",      type: "university",   email: "bde@uca.fr" },
  { ecole: "Tours",                  type: "university",   email: "bde@univ-tours.fr" },
  { ecole: "Poitiers",               type: "university",   email: "bde@univ-poitiers.fr" },
  { ecole: "Bourgogne Dijon",        type: "university",   email: "bde@u-bourgogne.fr" },
  { ecole: "Lorraine",               type: "university",   email: "bde@univ-lorraine.fr" },
  { ecole: "Le Mans",                type: "university",   email: "bde@univ-lemans.fr" },
  { ecole: "Limoges",                type: "university",   email: "bde@unilim.fr" },
  { ecole: "La Rochelle",            type: "university",   email: "bde@univ-larochelle.fr" },
  { ecole: "Pau",                    type: "university",   email: "bde@univ-pau.fr" },
  { ecole: "Reims",                  type: "university",   email: "bde@univ-reims.fr" },
  { ecole: "Amiens (UPJV)",          type: "university",   email: "bde@u-picardie.fr" },
  { ecole: "Brest (UBO)",            type: "university",   email: "bde@univ-brest.fr" },
  { ecole: "Angers",                 type: "university",   email: "bde@univ-angers.fr" },
  { ecole: "Orléans",                type: "university",   email: "bde@univ-orleans.fr" },
  { ecole: "Haute-Alsace Mulhouse",  type: "university",   email: "bde@uha.fr" },
  { ecole: "Perpignan Via Domitia",  type: "university",   email: "bde@univ-perp.fr" },
  { ecole: "Toulon",                 type: "university",   email: "bde@univ-tln.fr" },
  { ecole: "Valenciennes",           type: "university",   email: "bde@univ-valenciennes.fr" },
  { ecole: "Artois",                 type: "university",   email: "bde@univ-artois.fr" },
  { ecole: "Avignon",                type: "university",   email: "bde@univ-avignon.fr" },
  { ecole: "La Réunion",             type: "university",   email: "bde@univ-reunion.fr" },
];

const TONE_BY_TYPE = {
  business:    "professionnel et orienté carrière — ces étudiants cherchent des stages et jobs dans les grandes entreprises, les filtres ATS sont leur principal obstacle",
  engineering: "direct et technique — mentionne que les offres d'ingénieur sont très compétitives et que l'adaptation ATS fait vraiment la différence",
  university:  "accessible et chaleureux — insiste sur la gratuité et la simplicité, ces étudiants ont souvent moins d'accompagnement carrière",
  sciencespo:  "analytique et concis — ces étudiants sont exigeants, va droit au but avec la valeur concrète",
};

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return Response.json({ error: "Non configuré" }, { status: 500 });
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const resend    = new Resend(process.env.RESEND_API_KEY);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const ownerEmail = process.env.OWNER_EMAIL || "damiankurowska@icloud.com";

  try {
    // Sélectionne 5 BDE du jour (rotation déterministe)
    const BATCH = 5;
    const dayNum = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    const startIdx = (dayNum * BATCH) % BDE_CONTACTS.length;
    const targets = Array.from({ length: BATCH }, (_, i) =>
      BDE_CONTACTS[(startIdx + i) % BDE_CONTACTS.length]
    );

    // Génère les 5 emails en un seul appel Haiku
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2500,
      messages: [{
        role: "user",
        content: `Tu es Damian, fondateur de cvadapt.eu — outil IA gratuit qui adapte le CV étudiant à chaque offre en 30 secondes et augmente les chances de passer les filtres ATS.

Génère 5 emails de prospection courts et directs, un par BDE. Ces emails seront envoyés automatiquement.

BDE à contacter aujourd'hui :
${targets.map((t, i) => `${i + 1}. ${t.ecole} (type: ${t.type}) — ton recommandé : ${TONE_BY_TYPE[t.type]}`).join("\n")}

Règles STRICTES :
- 5-7 lignes maximum dans le corps
- Ton humain, jamais corporate
- Pas de "J'espère que ce message vous trouve bien" ni formules creuses
- Valeur claire : outil gratuit, adapte le CV à chaque offre, passe les filtres ATS
- Proposition : accès premium offert pour leurs membres + relai via leurs canaux (newsletter, groupe, Discord…)
- Jamais mentionner un réseau social spécifique
- Signature : "Damian — cvadapt.eu | contact@cvadapt.eu"
- Objet court et accrocheur (max 8 mots)

Réponds en JSON valide UNIQUEMENT (pas de markdown, pas de texte avant/après) :
{
  "emails": [
    {
      "ecole": "Nom exact",
      "objet": "Objet court",
      "corps": "Corps complet avec sauts de ligne \\n"
    }
  ]
}`,
      }],
    });

    const raw = msg.content[0].text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Claude n'a pas retourné de JSON valide");
    const { emails } = JSON.parse(jsonMatch[0]);

    const sent = [];
    const failed = [];

    // Envoie chaque email directement au BDE
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const emailData = emails[i];
      if (!emailData) continue;

      try {
        await resend.emails.send({
          from: "Damian — CVAdapt <contact@cvadapt.eu>",
          to: target.email,
          replyTo: "contact@cvadapt.eu",
          subject: emailData.objet,
          text: emailData.corps,
          html: `<div style="font-family:-apple-system,sans-serif;font-size:15px;color:#111827;line-height:1.7;max-width:560px">
            ${emailData.corps.split("\n").map(l => l.trim() ? `<p style="margin:0 0 12px 0">${l}</p>` : "").join("")}
          </div>`,
        });
        sent.push({ ecole: target.ecole, email: target.email, objet: emailData.objet, corps: emailData.corps });
      } catch (err) {
        failed.push({ ecole: target.ecole, error: err.message });
      }
    }

    // Résumé quotidien pour Damian
    const today = new Date().toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long",
    });
    const totalContacted = dayNum * BATCH;
    const progress = Math.min(100, Math.round((totalContacted / BDE_CONTACTS.length) * 100));

    await resend.emails.send({
      from: "CVAdapt BDE Bot <contact@cvadapt.eu>",
      to: ownerEmail,
      subject: `📤 Outreach BDE — ${sent.length} envoyés aujourd'hui (${progress}% de la liste)`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body { font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1f2937;max-width:620px;margin:0 auto;padding:24px 16px }
  h1 { font-size:20px;font-weight:800;color:#1d4ed8;margin:0 0 4px }
  .sub { color:#6b7280;font-size:13px;margin:0 0 20px }
  .stat { display:inline-block;background:#eff6ff;color:#1d4ed8;border-radius:8px;padding:8px 16px;font-weight:700;font-size:14px;margin:0 8px 12px 0 }
  .card { border:1.5px solid #e5e7eb;border-radius:12px;padding:16px 20px;margin-bottom:14px }
  .school { font-weight:800;font-size:16px;color:#111827;margin:0 0 4px }
  .meta { font-size:12px;color:#6b7280;margin:0 0 10px }
  .label { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9ca3af;margin:0 0 4px }
  .subject { font-weight:700;color:#111827;font-size:14px;margin:0 0 8px }
  .body { white-space:pre-line;font-size:13px;line-height:1.6;color:#374151;background:#f9fafb;padding:12px 14px;border-radius:8px }
  .progress-bar { background:#e5e7eb;border-radius:999px;height:8px;margin:12px 0 }
  .progress-fill { background:#1d4ed8;border-radius:999px;height:8px }
  .failed { color:#ef4444;font-size:13px;margin-top:12px }
  footer { margin-top:24px;padding-top:16px;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af }
</style>
</head>
<body>
  <h1>Outreach BDE — ${today}</h1>
  <p class="sub">${sent.length} emails envoyés automatiquement · Réponses gérées par l'auto-reply</p>

  <div>
    <span class="stat">📤 ${sent.length} envoyés</span>
    <span class="stat">🎯 ${totalContacted} contactés au total</span>
    <span class="stat">📊 ${progress}% de la liste</span>
  </div>

  <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>

  ${sent.map(e => `
  <div class="card">
    <div class="school">${e.ecole}</div>
    <div class="meta">${e.email}</div>
    <p class="label">Objet</p>
    <div class="subject">${e.objet}</div>
    <p class="label">Corps envoyé</p>
    <div class="body">${e.corps}</div>
  </div>`).join("")}

  ${failed.length > 0 ? `<p class="failed">⚠️ Échecs : ${failed.map(f => `${f.ecole} (${f.error})`).join(", ")}</p>` : ""}

  <footer>
    Envoyé automatiquement · Prochain batch demain à 7h<br>
    Les réponses des BDE sont gérées automatiquement par l'auto-reply.
  </footer>
</body>
</html>`,
    });

    return Response.json({
      success: true,
      sent: sent.length,
      failed: failed.length,
      targets: sent.map(s => s.ecole),
      progress: `${progress}%`,
    });

  } catch (err) {
    console.error("bde-outreach error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
