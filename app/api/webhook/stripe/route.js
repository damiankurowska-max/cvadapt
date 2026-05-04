import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

      if (!userId) {
        console.error("No userId found in session client_reference_id");
        return Response.json({ received: true });
      }

      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: {
          isPro: true,
          plan: plan || "essentiel",
          stripeCustomerId,
        },
      });

      console.log(`User ${userId} upgraded to plan: ${plan}`);
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      // Find user by stripeCustomerId
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
        console.log(`User ${user.id} downgraded to free (subscription deleted)`);
      } else {
        console.warn(`No user found with stripeCustomerId: ${customerId}`);
      }
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }

  return Response.json({ received: true });
}
