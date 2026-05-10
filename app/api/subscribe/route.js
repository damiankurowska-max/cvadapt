import { Resend } from "resend";
import { welcomeNewsletterEmail, ownerNotificationEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
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
