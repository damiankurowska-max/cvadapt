/**
 * Cron : rapport quotidien Postulera envoyé par email à Damian.
 * Appelé chaque jour via /api/cron/sequences (tourne sur Vercel,
 * indépendant de Claude Code). CV générés hier + revenus abonnements.
 */
import { Resend } from "resend";

// Paiements uniques ShopConforme (centimes) — compte Stripe partagé
const SHOPCONFORME_AMOUNTS = new Set([1999, 3999, 6999]);

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
  if (!CRON_SECRET) {
    return Response.json({ error: "Non configuré" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  const start = now - 24 * 3600;

  // 1. CV générés hier (Supabase)
  let cvCount = "?";
  try {
    const startIso = new Date(start * 1000).toISOString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cv_history?select=id&created_at=gte.${startIso}`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          Prefer: "count=exact",
        },
      }
    );
    const rows = await res.json();
    cvCount = Array.isArray(rows) ? String(rows.length) : "?";
  } catch (e) {
    console.error("Rapport: erreur Supabase", e);
  }

  // 2. Revenus abonnements hier (Stripe, hors paiements uniques ShopConforme)
  let revenus = 0;
  let paiements = 0;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/charges?created[gte]=${start}&limit=100`,
      { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
    );
    const data = await res.json();
    const postulera = (data.data || []).filter(
      (c) => c.paid && !SHOPCONFORME_AMOUNTS.has(c.amount)
    );
    paiements = postulera.length;
    revenus = postulera.reduce((sum, c) => sum + c.amount, 0) / 100;
  } catch (e) {
    console.error("Rapport: erreur Stripe", e);
  }

  const dateStr = new Date(start * 1000).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Paris",
  });

  const line = (label, value) =>
    `<tr><td style="padding:8px 0;color:#a1a1aa;font-size:14px">${label}</td><td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;text-align:right">${value}</td></tr>`;

  const html = `
  <div style="background:#050507;padding:32px;font-family:-apple-system,Segoe UI,sans-serif;border-radius:16px;max-width:560px;margin:0 auto">
    <h1 style="color:#fff;font-size:20px;margin:0 0 4px">📄 Rapport Postulera</h1>
    <p style="color:#71717a;font-size:13px;margin:0 0 24px">${dateStr}</p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(255,255,255,0.08)">
      ${line("CV générés", cvCount)}
      ${line("Revenus abonnements", `${revenus.toFixed(2)}€`)}
      ${line("Paiements", String(paiements))}
    </table>
    <p style="color:#52525b;font-size:12px;margin:24px 0 0">postulera.com · rapport automatique quotidien</p>
  </div>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Postulera <contact@cvadapt.eu>",
    to: "damiankurowska@icloud.com",
    subject: `Postulera — ${cvCount} CV · ${revenus.toFixed(2)}€ hier`,
    html,
  });

  if (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
  return Response.json({ ok: true, cv: cvCount, revenus, paiements });
}
