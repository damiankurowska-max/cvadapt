import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { userId } = await auth();

  // L'utilisateur doit être connecté pour payer
  if (!userId) {
    return Response.json({ error: "Connecte-toi pour accéder au paiement.", redirect: "/sign-in" }, { status: 401 });
  }

  const { plan } = await request.json();

  const prices = {
    essentiel: {
      name: "CVAdapt Étudiant",
      amount: 499,
      description: "15 CV par mois + Lettre de motivation + Score ATS complet",
    },
    pro: {
      name: "CVAdapt Pro",
      amount: 999,
      description: "CV illimités + Tout Étudiant + Templates premium + Support prioritaire",
    },
  };

  const selected = prices[plan];
  if (!selected) {
    return Response.json({ error: "Plan invalide" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selected.name,
              description: selected.description,
            },
            unit_amount: selected.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      client_reference_id: userId,
      metadata: { plan, userId },
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/tarifs`,
      locale: "fr",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return Response.json({ error: `Erreur Stripe : ${error.message}` }, { status: 500 });
  }
}
