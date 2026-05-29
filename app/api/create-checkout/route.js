import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY );

const PRICES = {
  essentiel: {
    name: "CVAdapt Étudiant — Mensuel",
    amount: 499,
    interval: "month",
    description: "15 CV par mois + Lettre de motivation + Score ATS complet",
  },
  pro: {
    name: "CVAdapt Pro — Mensuel",
    amount: 999,
    interval: "month",
    description: "CV illimités + Templates premium + Support prioritaire",
  },
  essentiel_annuel: {
    name: "CVAdapt Étudiant — Annuel",
    amount: 3999, // 39,99€
    interval: "year",
    description: "15 CV par mois + Lettre de motivation + Score ATS complet (facturé annuellement)",
  },
  pro_annuel: {
    name: "CVAdapt Pro — Annuel",
    amount: 7999, // 79,99€
    interval: "year",
    description: "CV illimités + Templates premium + Support prioritaire (facturé annuellement)",
  },
};

export async function POST(request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json(
      { error: "Connecte-toi pour accéder au paiement.", redirect: "/sign-in" },
      { status: 401 }
    );
  }

  const { plan } = await request.json();
  const selected = PRICES[plan];

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
            recurring: { interval: selected.interval },
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
