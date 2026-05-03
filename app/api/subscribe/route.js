import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  try {
    // Notifie le propriétaire
    await resend.emails.send({
      from: "CVAdapt <onboarding@resend.dev>",
      to: "damiankurowska@icloud.com",
      subject: "Nouvelle inscription liste d'attente",
      html: `<p>Nouvel inscrit : <strong>${email}</strong></p>`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
