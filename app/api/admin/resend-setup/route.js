/**
 * Admin temporaire : gestion du domaine Resend depuis le serveur Vercel
 * (l'API Resend est bloquée par Cloudflare 1010 depuis le poste local).
 * Auth : header Bearer CRON_SECRET. La clé Resend full-access est passée en query (?key=).
 * Actions : ?action=create | get | verify   &id=<domainId>
 * À SUPPRIMER une fois la config terminée.
 */
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const action = url.searchParams.get("action") || "list";
  const id = url.searchParams.get("id");
  if (!key) return Response.json({ error: "clé Resend manquante (?key=)" }, { status: 400 });

  const H = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const R = "https://api.resend.com";
  let res;
  if (action === "create") {
    res = await fetch(`${R}/domains`, { method: "POST", headers: H, body: JSON.stringify({ name: "cvadapt.eu", region: "eu-west-1" }) });
  } else if (action === "verify" && id) {
    res = await fetch(`${R}/domains/${id}/verify`, { method: "POST", headers: H });
  } else if (action === "get" && id) {
    res = await fetch(`${R}/domains/${id}`, { headers: H });
  } else {
    res = await fetch(`${R}/domains`, { headers: H });
  }
  const data = await res.json();
  return Response.json({ status: res.status, data });
}
