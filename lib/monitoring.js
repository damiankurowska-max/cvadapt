/**
 * Monitoring des cron jobs — alerte email si erreur
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");
const OWNER_EMAIL = process.env.OWNER_EMAIL || "damiankurowska@icloud.com";

/**
 * Envoie une alerte email si un cron job plante
 * @param {string} cronName - nom du cron
 * @param {Error} error - l'erreur
 */
export async function alertCronFailure(cronName, error) {
  try {
    await resend.emails.send({
      from: "CVAdapt Monitoring <contact@cvadapt.eu>",
      to: OWNER_EMAIL,
      subject: `🚨 Cron ÉCHOUÉ : ${cronName}`,
      html: `
        <html><body style="font-family:sans-serif;padding:32px;background:#fff;">
          <h2 style="color:#dc2626;">🚨 Cron Job Échoué</h2>
          <p><strong>Cron :</strong> ${cronName}</p>
          <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
          <p><strong>Erreur :</strong></p>
          <pre style="background:#fef2f2;border:1px solid #fecaca;padding:16px;border-radius:8px;font-size:13px;overflow-x:auto;">${error?.message || String(error)}</pre>
          ${error?.stack ? `<pre style="font-size:11px;color:#6b7280;">${error.stack}</pre>` : ""}
          <hr style="border-color:#e5e7eb;margin:24px 0;" />
          <p style="color:#6b7280;font-size:12px;">CVAdapt Monitoring — automatique</p>
        </body></html>
      `,
    });
  } catch (emailError) {
    // Ne jamais laisser l'alerting faire planter le process
    console.error("Monitoring email failed:", emailError);
  }
}
