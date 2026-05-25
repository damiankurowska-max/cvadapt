import { Resend } from "resend";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { upgradeReminderEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request) {
  // Auth requise — seul le serveur (generate-cv) devrait appeler cet endpoint
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  // On récupère l'email depuis Clerk — pas depuis le body (non fiable)
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const email = user.emailAddresses?.[0]?.emailAddress;
  const prenom = user.firstName || "";

  if (!email) {
    return Response.json({ error: "Email introuvable." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: email,
      replyTo: "contact@cvadapt.eu",
      subject: `${prenom ? prenom + ", tu" : "Tu"} as utilisé tes 3 CV gratuits — continue sans limite 🚀`,
      html: upgradeReminderEmail({ prenom }),
      headers: {
        "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `upgrade-reminder-${Date.now()}`,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Upgrade email error:", error);
    return Response.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
