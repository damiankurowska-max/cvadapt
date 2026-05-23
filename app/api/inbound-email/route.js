import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "placeholder" });
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request) {
  try {
    // Vérification du token secret — configuré dans l'URL du webhook Resend
    // ex: https://cvadapt.eu/api/inbound-email?token=MON_SECRET
    const secret = process.env.INBOUND_EMAIL_SECRET;
    if (secret) {
      const url = new URL(request.url);
      const token = url.searchParams.get("token");
      if (token !== secret) {
        return Response.json({ error: "Non autorisé" }, { status: 401 });
      }
    }

    const payload = await request.json();

    // Resend inbound format
    const from = payload.from || "";
    const subject = payload.subject || "";
    const text = payload.text || payload.html || "";
    const to = payload.to || "contact@cvadapt.eu";

    // Ignore les bounces et les réponses automatiques
    const subjectLower = subject.toLowerCase();
    if (
      subjectLower.includes("out of office") ||
      subjectLower.includes("absence") ||
      subjectLower.includes("delivery failed") ||
      subjectLower.includes("mailer-daemon") ||
      !from
    ) {
      return Response.json({ skipped: true });
    }

    // Génère une réponse contextuelle avec Claude
    const completion = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `Tu es Damian, fondateur de CVAdapt.eu (générateur de CV gratuit pour étudiants français).
Tu reçois une réponse d'un BDE (bureau des étudiants) à qui tu avais proposé un partenariat.

Email reçu de : ${from}
Sujet : ${subject}
Contenu : ${text}

Rédige une réponse email courte (5-8 lignes max), chaleureuse et directe en français.
- Si la réponse est positive ou curieuse → remercie, propose un appel de 15 min ou un lien direct pour tester CVAdapt, mentionne l'accès premium gratuit pour leurs membres
- Si la réponse est négative ou pas intéressée → remercie poliment, laisse la porte ouverte
- Si la réponse demande plus d'infos → réponds précisément à leur question
- Signe avec "Damian, fondateur de CVAdapt.eu"
- Ne mets PAS d'objet, juste le corps de l'email
- Ton naturel, pas corporate`,
        },
      ],
    });

    const replyBody = completion.content[0].text;

    // Envoie la réponse
    await resend.emails.send({
      from: "Damian — CVAdapt <contact@cvadapt.eu>",
      to: from,
      subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
      text: replyBody,
      html: `<div style="font-family:-apple-system,sans-serif;font-size:15px;color:#111827;line-height:1.7;max-width:560px">
        ${replyBody.split("\n").map(l => `<p style="margin:0 0 12px 0">${l}</p>`).join("")}
      </div>`,
    });

    // Notifie Damian
    await resend.emails.send({
      from: "CVAdapt Bot <contact@cvadapt.eu>",
      to: "damiankurowska@icloud.com",
      subject: `📬 Réponse BDE reçue + réponse envoyée — ${from}`,
      html: `<div style="font-family:sans-serif;font-size:14px;color:#111827;max-width:560px">
        <h2 style="color:#2563eb">Réponse automatique envoyée</h2>
        <p><strong>De :</strong> ${from}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <p><strong>Leur message :</strong></p>
        <div style="background:#f9fafb;border-left:3px solid #e5e7eb;padding:12px 16px;border-radius:4px;margin-bottom:16px">
          ${text.substring(0, 800)}
        </div>
        <p><strong>Ma réponse envoyée :</strong></p>
        <div style="background:#eff6ff;border-left:3px solid #2563eb;padding:12px 16px;border-radius:4px">
          ${replyBody.split("\n").map(l => `<p style="margin:0 0 8px 0">${l}</p>`).join("")}
        </div>
      </div>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Inbound email error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
