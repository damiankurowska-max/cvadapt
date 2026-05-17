import { Resend } from "resend";
import { welcomeNewsletterEmail, ownerNotificationEmail } from "@/lib/email-templates";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request) {
  // Rate limit : 3 inscriptions par IP par heure
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`subscribe:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return Response.json({ error: "Trop de tentatives. Réessaie dans 1 heure." }, { status: 429 });
  }

  const { email } = await request.json();

  // Validation email stricte
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  try {
    // Email de bienvenue à l'utilisateur
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: email,
      subject: "Bienvenue dans la liste CVAdapt 👋",
      html: welcomeNewsletterEmail(),
    });

    // Notification interne
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: "damiankurowska@icloud.com",
      subject: "📬 Nouvelle inscription newsletter",
      html: ownerNotificationEmail({
        type: "newsletter",
        data: {
          Email: email,
          Date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          Source: "cvadapt.eu",
        },
      }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
