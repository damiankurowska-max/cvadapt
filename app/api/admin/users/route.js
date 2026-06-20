const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "postulera-admin-2026";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=100`, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  });

  const { users = [] } = await res.json();
  const clean = users.map(u => ({
    email: u.email,
    name: u.user_metadata?.full_name || "",
    plan: u.user_metadata?.plan || "free",
    cvCount: u.user_metadata?.cvCount || 0,
    createdAt: u.created_at?.slice(0, 10),
    lastSignIn: u.last_sign_in_at?.slice(0, 10) || "-",
    provider: u.app_metadata?.provider || "email",
  }));

  return Response.json({ users: clean, total: clean.length });
}
