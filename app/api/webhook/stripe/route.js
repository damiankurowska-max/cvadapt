import Stripe from "stripe";
import { Resend } from "resend";
import { paymentConfirmationEmail, ownerNotificationEmail } from "@/lib/email-templates";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder");
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const plan = session.metadata?.plan;
      const stripeCustomerId = session.customer;
      const customerEmail = session.customer_details?.email;

      if (!userId) {
        console.error("No userId found in session client_reference_id");
        return Response.json({ received: true });
      }

      // Mise à jour Clerk
      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: {
          isPro: true,
          plan: plan || "essentiel",
          stripeCustomerId,
        },
      });

      // Email de confirmation au client
      if (customerEmail) {
        await resend.emails.send({
          from: "CVAdapt <contact@cvadapt.eu>",
          to: customerEmail,
          subject: "✅ Ton abonnement CVAdapt est actif !",
          html: paymentConfirmationEmail({ plan: plan || "essentiel", email: customerEmail }),
        });
      }

      // Notification interne
      const planLabels = {
        essentiel: "Plan Étudiant — 4,99€/mois",
        pro: "Plan Pro — 9,99€/mois",
        essentiel_annuel: "Plan Étudiant Annuel — 39,99€/an",
        pro_annuel: "Plan Pro Annuel — 79,99€/an",
      };
      await resend.emails.send({
        from: "CVAdapt <contact@cvadapt.eu>",
        to: "damiankurowska@icloud.com",
        subject: "💰 Nouveau paiement CVAdapt !",
        html: ownerNotificationEmail({
          type: "payment",
          data: {
            Plan: planLabels[plan] || plan || "Inconnu",
            Email: customerEmail || "Non renseigné",
            "Stripe Customer ID": stripeCustomerId || "—",
            "Clerk User ID": userId,
            Date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          },
        }),
      });

      console.log(`User ${userId} upgraded to plan: ${plan}`);

    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      const { data: users } = await client.users.getUserList({ limit: 500 });
      const user = users.find(
        (u) => u.unsafeMetadata?.stripeCustomerId === customerId
      );

      if (user) {
        await client.users.updateUserMetadata(user.id, {
          unsafeMetadata: {
            isPro: false,
            plan: "free",
            stripeCustomerId: customerId,
          },
        });

        // Email d'annulation
        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (userEmail) {
          await resend.emails.send({
            from: "CVAdapt <contact@cvadapt.eu>",
            to: userEmail,
            subject: "Ton abonnement CVAdapt a été annulé",
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:40px 20px;">
                <h2 style="color:#111827;">Ton abonnement est terminé</h2>
                <p style="color:#6b7280;">Ton accès Pro a été désactivé. Tu peux continuer à utiliser CVAdapt gratuitement (3 CV).</p>
                <p style="color:#6b7280;">Si tu as des questions, réponds à cet email ou écris à <a href="mailto:contact@cvadapt.eu">contact@cvadapt.eu</a>.</p>
                <a href="https://cvadapt.eu/tarifs" style="display:inline-block;margin-top:20px;background:#2563eb;color:#fff;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
                  Réabonner →
                </a>
              </div>
            `,
          });
        }

        console.log(`User ${user.id} downgraded to free`);
      }
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }

  return Response.json({ received: true });
}
