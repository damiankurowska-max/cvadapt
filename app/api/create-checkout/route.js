import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { userId } = await auth();
  const { plan } = await request.json();

  const prices = {
    essentiel: {
      name: "CVAdapt Essentiel",
      amount: 499, // 4.99€ en centimes
      description: "10 CV par mois",
    },
    pro: {
      name: "CVAdapt Pro",
      amount: 999, // 9.99€ en centimes
      description: "CV illimités",
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
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/tarifs`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
