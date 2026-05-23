import { rateLimit, getClientIp } from "@/lib/rate-limit";

const BREVO_LIST_ID = 3; // recup-newsletter

const ALLOWED_ORIGINS = [
  "https://recuperation.fr",
  "https://www.recuperation.fr",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request) {
  const origin = request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request) {
  const origin = request.headers.get("origin") || "";
  const headers = corsHeaders(origin);

  // Rate limit : 3 inscriptions par IP par heure
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`recup-subscribe:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return Response.json(
      { error: "Trop de tentatives. Réessaie dans 1 heure." },
      { status: 429, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400, headers });
  }

  const { email } = body;

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return Response.json({ error: "Email invalide" }, { status: 400, headers });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // 201 = créé, 204 = déjà existant mis à jour → les deux sont succès
    if (!res.ok && res.status !== 204) {
      const err = await res.text();
      console.error("Brevo recup-subscribe error:", res.status, err);
      // On renvoie succès quand même (ne pas bloquer l'UX)
    }

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error("recup-subscribe error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
