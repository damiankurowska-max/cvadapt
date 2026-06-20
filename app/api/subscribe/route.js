import { Resend } from "resend";
import { welcomeNewsletterEmail, welcomeNewsletterEmailEN, ownerNotificationEmail } from "@/lib/email-templates";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// resend initialized per-request

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Rate limit : 3 inscriptions par IP par heure
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`subscribe:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return Response.json({ error: "Trop de tentatives. Réessaie dans 1 heure." }, { status: 429 });
  }

  const body = await request.json();
  const { email } = body;
  const lang = body.lang === "en" ? "en" : "fr";

  // Validation email stricte
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  try {
    // Ajouter à Brevo liste #4 (postulera-free-users) pour la séquence email J+2/J+5/J+7/J+14
    if (process.env.BREVO_API_KEY) {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          attributes: { SOURCE: "newsletter-homepage", LANGUAGE: lang },
          listIds: [4],
          updateEnabled: true,
        }),
      }).catch((err) => console.error("Brevo subscribe error:", err.message));
    }

    // Email de bienvenue à l'utilisateur (FR ou EN)
    await resend.emails.send({
      from: "Postulera <contact@postulera.com>",
      to: email,
      replyTo: "contact@postulera.com",
      subject: lang === "en" ? "Welcome to Postulera 👋" : "Bienvenue dans la liste Postulera 👋",
      html: lang === "en" ? welcomeNewsletterEmailEN() : welcomeNewsletterEmail(),
      headers: {
        "List-Unsubscribe": "<mailto:contact@postulera.com?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `subscribe-welcome-${Date.now()}`,
      },
    });

    // Notification interne
    await resend.emails.send({
      from: "Postulera <contact@postulera.com>",
      to: process.env.OWNER_EMAIL || "contact@postulera.com",
      subject: "📬 Nouvelle inscription newsletter",
      html: ownerNotificationEmail({
        type: "newsletter",
        data: {
          Email: email,
          Date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          Source: "postulera.com",
        },
      }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
