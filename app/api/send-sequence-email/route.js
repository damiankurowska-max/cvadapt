import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import {
  atsEducationEmail,
  testimonialEmail,
  reactivationEmail,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

// Token secret pour sécuriser l'endpoint (appels cron ou webhook)
const CRON_SECRET = process.env.CRON_SECRET;

const SEQUENCES = {
  "ats-education": {
    subject: ({ prenom }) =>
      `${prenom ? prenom + ", comment" : "Comment"} les ATS filtrent ton CV (et comment passer) 🤖`,
    html: atsEducationEmail,
  },
  "testimonial": {
    subject: ({ prenom }) =>
      `${prenom ? prenom + " — " : ""}Comment Théo a décroché 3 alternances en 2 semaines 🎯`,
    html: testimonialEmail,
  },
  "reactivation": {
    subject: ({ prenom }) =>
      `${prenom ? prenom + ", ton" : "Ton"} CV attend toujours d'être optimisé ⚡`,
    html: reactivationEmail,
  },
};

export async function POST(request) {
  // Vérification du secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps invalide." }, { status: 400 });
  }

  const { userId, email: directEmail, prenom: directPrenom, type } = body;

  if (!type || !SEQUENCES[type]) {
    return Response.json(
      { error: `Type invalide. Valeurs acceptées : ${Object.keys(SEQUENCES).join(", ")}` },
      { status: 400 }
    );
  }

  let email = directEmail;
  let prenom = directPrenom || "";

  // Si userId fourni, récupérer depuis Clerk
  if (userId && !email) {
    try {
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      email = user.emailAddresses?.[0]?.emailAddress;
      prenom = user.firstName || "";
    } catch (err) {
      console.error("Clerk user fetch error:", err);
      return Response.json({ error: "Utilisateur introuvable." }, { status: 404 });
    }
  }

  if (!email) {
    return Response.json({ error: "Email requis." }, { status: 400 });
  }

  const seq = SEQUENCES[type];

  try {
    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: email,
      replyTo: "contact@cvadapt.eu",
      subject: seq.subject({ prenom }),
      html: seq.html({ prenom }),
      headers: {
        "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `seq-${type}-${Date.now()}`,
      },
    });

    return Response.json({ success: true, type, email });
  } catch (error) {
    console.error("Sequence email error:", error);
    return Response.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
