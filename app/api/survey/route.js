/**
 * Endpoint : enregistre une réponse au sondage et accorde +1 CV
 * Appelé via les liens dans l'email J+3
 * GET /api/survey?email=xxx&q=objectif&a=stage
 */
import { Resend } from "resend";
import { surveyThanksEmail } from "@/lib/email-templates";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const QUESTION_LABELS = {
  objectif: "Ce que tu cherches",
  frustration: "Ta principale frustration",
  source: "Comment tu nous as trouvés",
};

const ANSWER_LABELS = {
  stage: "Un stage 🎓",
  emploi: "Un emploi 💼",
  alternance: "Une alternance 🔄",
  "adapter-cv": "Adapter mon CV 📝",
  ats: "Passer les ATS 🤖",
  "lettre-motivation": "Rédiger la LM ✉️",
  "trouver-offres": "Trouver des offres 🔍",
  reddit: "Reddit 🔴",
  ami: "Un ami 👥",
  google: "Google 🔎",
  "reseaux-sociaux": "Réseaux sociaux 📱",
  autre: "Autre ❓",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const question = searchParams.get("q");
  const answer = searchParams.get("a");

  if (!email || !question || !answer) {
    return new Response("Paramètres manquants", { status: 400 });
  }

  try {
    // 1. Enregistrer la réponse dans Supabase
    const { error: dbError } = await supabase
      .from("survey_responses")
      .upsert(
        { email, question, answer, created_at: new Date().toISOString() },
        { onConflict: "email,question" }
      );

    if (dbError) {
      console.error("Supabase survey insert error:", dbError);
    }

    // 2. Accorder +1 CV via Clerk (chercher l'utilisateur par email)
    try {
      const { clerkClient } = await import("@clerk/nextjs/server");
      const client = await clerkClient();
      const { data: users } = await client.users.getUserList({ emailAddress: [email] });
      if (users?.length > 0) {
        const user = users[0];
        const currentBonus = user.unsafeMetadata?.surveyBonus || 0;
        const answeredQuestions = user.unsafeMetadata?.surveyAnswered || [];

        // Éviter les doublons (1 CV par question max)
        if (!answeredQuestions.includes(question)) {
          await client.users.updateUserMetadata(user.id, {
            unsafeMetadata: {
              ...user.unsafeMetadata,
              surveyBonus: currentBonus + 1,
              surveyAnswered: [...answeredQuestions, question],
            },
          });
        }
      }
    } catch (clerkError) {
      console.error("Clerk survey bonus error:", clerkError.message);
      // Non bloquant — on continue quand même
    }

    // 3. Envoyer l'email de confirmation
    const reponseLabel = ANSWER_LABELS[answer] || answer;
    const prenomMatch = email.split("@")[0];

    await resend.emails.send({
      from: "CVAdapt <contact@cvadapt.eu>",
      to: email,
      replyTo: "contact@cvadapt.eu",
      subject: "✅ +1 CV ajouté à ton compte",
      html: surveyThanksEmail({ prenom: "", question, reponse: reponseLabel }),
      headers: {
        "List-Unsubscribe": "<mailto:contact@cvadapt.eu?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `survey-thanks-${email}-${question}`,
      },
    });

    // 4. Rediriger vers une page de remerciement
    return Response.redirect("https://cvadapt.eu/merci-sondage", 302);

  } catch (error) {
    console.error("Survey response error:", error);
    return Response.redirect("https://cvadapt.eu", 302);
  }
}
