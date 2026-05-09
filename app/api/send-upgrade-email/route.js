import { Resend } from "resend";
import { upgradeReminderEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, prenom } = await request.json();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: email,
      subject: `${prenom ? prenom + ", tu" : "Tu"} as utilisé tes 3 CV gratuits — continue sans limite 🚀`,
      html: upgradeReminderEmail({ prenom }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Upgrade email error:", error);
    return Response.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
