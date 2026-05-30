/**
 * Cron health-check — tourne chaque jour à 7h (avant tous les autres crons)
 * Vérifie : endpoints critiques + Resend API + Brevo API
 * Envoie un email d'alerte si quelque chose ne va pas
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CRON_SECRET = process.env.CRON_SECRET;
const ALERT_EMAIL = "damiankurowska@icloud.com";
const BASE_URL = "https://cvadapt.eu";

const CHECKS = [
  { name: "Homepage",               url: `${BASE_URL}/`,                      method: "GET",  expectedStatus: 200 },
  { name: "Tarifs",                  url: `${BASE_URL}/tarifs`,                method: "GET",  expectedStatus: 200 },
  { name: "Blog",                    url: `${BASE_URL}/blog`,                  method: "GET",  expectedStatus: 200 },
  { name: "API generate-cv (401)",  url: `${BASE_URL}/api/generate-cv`,       method: "POST", expectedStatus: 401 },
  { name: "API analyze-ats (400)",  url: `${BASE_URL}/api/analyze-ats`,       method: "POST", expectedStatus: 400 },
];

async function checkEndpoint({ name, url, method, expectedStatus }) {
  const start = Date.now();
  try {
    const res = await fetch(url, { method, cache: "no-store" });
    const latencyMs = Date.now() - start;
    return { name, url, status: res.status, latencyMs, ok: res.status === expectedStatus };
  } catch (err) {
    return { name, url, status: null, latencyMs: null, ok: false, error: err.message };
  }
}

async function checkResend() {
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    return { ok: res.ok, details: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, details: err.message };
  }
}

async function checkBrevo() {
  try {
    const res = await fetch("https://api.brevo.com/v3/account", {
      headers: { accept: "application/json", "api-key": process.env.BREVO_API_KEY },
    });
    return { ok: res.ok, details: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, details: err.message };
  }
}

export async function GET(request) {
  if (!CRON_SECRET) return Response.json({ error: "Non configuré" }, { status: 500 });
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const [endpointResults, resendStatus, brevoStatus] = await Promise.all([
    Promise.all(CHECKS.map(checkEndpoint)),
    checkResend(),
    checkBrevo(),
  ]);

  const failed  = endpointResults.filter((r) => !r.ok);
  const slow    = endpointResults.filter((r) => r.latencyMs > 2000);
  const hasIssue = failed.length > 0 || !resendStatus.ok || !brevoStatus.ok;

  if (hasIssue || slow.length > 0) {
    const rows = endpointResults.map((r) => `
      <tr>
        <td style="padding:8px;border:1px solid #eee">${r.name}</td>
        <td style="padding:8px;border:1px solid #eee">${r.status ?? "Erreur réseau"}</td>
        <td style="padding:8px;border:1px solid #eee">${r.latencyMs ? r.latencyMs + "ms" : "—"}</td>
        <td style="padding:8px;border:1px solid #eee">${r.ok ? "✅" : "❌"} ${r.error || ""}</td>
      </tr>`).join("");

    await resend.emails.send({
      from: "CVAdapt Monitoring <contact@cvadapt.eu>",
      to: ALERT_EMAIL,
      subject: `⚠️ CVAdapt — ${failed.length} problème(s) détecté(s)`,
      html: `
        <div style="font-family:monospace;max-width:700px;margin:0 auto">
          <h2 style="color:#dc2626">⚠️ Rapport de santé cvadapt.eu</h2>
          <p style="color:#6b7280">${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>

          <h3>Endpoints</h3>
          <table style="border-collapse:collapse;width:100%;font-size:13px">
            <thead>
              <tr style="background:#f5f5f5">
                <th style="padding:8px;border:1px solid #eee;text-align:left">Endpoint</th>
                <th style="padding:8px;border:1px solid #eee;text-align:left">Status</th>
                <th style="padding:8px;border:1px solid #eee;text-align:left">Latence</th>
                <th style="padding:8px;border:1px solid #eee;text-align:left">Résultat</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <h3>Services externes</h3>
          <p>Resend : ${resendStatus.ok ? "✅" : "❌"} — ${resendStatus.details}</p>
          <p>Brevo : ${brevoStatus.ok ? "✅" : "❌"} — ${brevoStatus.details}</p>

          ${slow.length > 0 ? `<p style="color:orange">⚠️ Lents (&gt;2s) : ${slow.map((r) => r.name).join(", ")}</p>` : ""}
        </div>
      `,
    });
  }

  return Response.json({
    checkedAt: new Date().toISOString(),
    issuesFound: hasIssue,
    alertSent: hasIssue || slow.length > 0,
    results: endpointResults,
    resend: resendStatus,
    brevo: brevoStatus,
  });
}
