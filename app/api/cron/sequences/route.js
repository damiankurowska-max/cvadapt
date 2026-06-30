/**
 * Cron combiné — exécute toutes les séquences email en un seul slot Vercel
 * Remplace les 8 crons individuels j2/j3/j5/j7/j14/reactivation
 */

const SEQUENCES = [
  "/api/cron/j2-email",
  "/api/cron/j2-no-cv-email",
  "/api/cron/j3-survey",
  "/api/cron/j5-email",
  "/api/cron/j7-email",
  "/api/cron/j14-email",
  "/api/cron/reactivation-email",
  "/api/cron/clerk-reactivation",
];

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return Response.json({ error: "Non configuré" }, { status: 500 });

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://postulera.com";

  const results = await Promise.all(
    SEQUENCES.map(async (path) => {
      try {
        const res = await fetch(`${baseUrl}${path}`, {
          headers: { authorization: `Bearer ${secret}` },
        });
        const data = await res.json();
        return { path, ok: res.ok, ...data };
      } catch (err) {
        return { path, ok: false, error: err.message };
      }
    })
  );

  return Response.json({ sequences: results });
}
