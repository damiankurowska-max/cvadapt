/**
 * Cron : email J+2 aux inscrits Clerk qui n'ont pas encore généré de CV
 *
 * Filtre : users Clerk créés il y a 1.5 à 2.5 jours avec cvCount === 0.
 * Ces users ne sont pas dans Brevo list #4 (ajoutés seulement au 1er CV),
 * donc ils ne reçoivent aucun email de la séquence normale.
 *
 * Sécurité anti-doublon : on marque `noCvEmailSent: true` dans unsafeMetadata
 * après envoi pour ne pas renvoyer le lendemain.
 */
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import { noCvReminderEmail } from "@/lib/email-templates";
import { alertCronFailure } from "@/lib/monitoring";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!CRON_SECRET) {
    return Response.json({ error: "Non configuré" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const clerk = await clerkClient();

    // Récupère les 100 derniers inscrits (suffisant pour une app early-stage)
    const { data: users } = await clerk.users.getUserList({
      limit: 100,
      orderBy: "-created_at",
    });

    const now = Date.now();
    const minAge = 1.5 * 24 * 60 * 60 * 1000; // 1.5 jours en ms
    const maxAge = 2.5 * 24 * 60 * 60 * 1000; // 2.5 jours en ms

    const targets = users.filter((u) => {
      const age = now - u.createdAt;
      const neverGenerated = !parseInt(u.unsafeMetadata?.cvCount || 0);
      const notYetSent = !u.unsafeMetadata?.noCvEmailSent;
      return age >= minAge && age <= maxAge && neverGenerated && notYetSent;
    });

    if (!targets.length) {
      return Response.json({ sent: 0, message: "Aucun utilisateur J+2 sans CV." });
    }

    let sent = 0;
    const dateStr = new Date().toISOString().split("T")[0];

    for (const user of targets) {
      const email = user.emailAddresses?.[0]?.emailAddress;
      const prenom = user.firstName || "";
      if (!email) continue;

      try {
        await resend.emails.send({
          from: "CVAdapt <contact@cvadapt.eu>",
          to: email,
          replyTo: "contact@cvadapt.eu",
          subject: `${prenom ? prenom + ", ton" : "Ton"} premier CV ATS t'attend — ça prend 30 secondes`,
          html: noCvReminderEmail({ prenom }),
          headers: {
            "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            "X-Entity-Ref-ID": `cron-j2-no-cv-${email}-${dateStr}`,
          },
        });

        // Marquer l'envoi pour éviter les doublons
        await clerk.users.updateUserMetadata(user.id, {
          unsafeMetadata: { ...user.unsafeMetadata, noCvEmailSent: true },
        });

        sent++;
      } catch (err) {
        console.error(`j2-no-cv email failed for ${email}:`, err.message);
      }
    }

    console.log(`Cron j2-no-cv: ${sent}/${targets.length} emails envoyés.`);
    return Response.json({ sent, total: targets.length });

  } catch (error) {
    console.error("j2-no-cv cron error:", error);
    await alertCronFailure("j2-no-cv-email", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
