import { createSupabaseServer } from "@/lib/supabase-server";
import Stripe from "stripe";

export async function GET() {
  try {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Non autorisé" }, { status: 401 });

    const stripeCustomerId = user.user_metadata?.stripeCustomerId;
    if (!stripeCustomerId) return Response.json({});

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const subs = await stripe.subscriptions.list({ customer: stripeCustomerId, limit: 1, status: "active" });
    if (!subs.data.length) return Response.json({});

    const sub = subs.data[0];
    return Response.json({
      status: sub.status,
      current_period_end: sub.current_period_end,
      cancel_at_period_end: sub.cancel_at_period_end,
    });
  } catch {
    return Response.json({});
  }
}
