/**
 * Rate limiter simple — fonctionne par instance Vercel
 * Protège les endpoints publics (analyse ATS) contre l'abus
 */

const store = new Map(); // ip → { count, resetAt }

/**
 * @param {string} ip
 * @param {number} max - requêtes max
 * @param {number} windowMs - fenêtre en ms
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(ip, max = 10, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetIn: windowMs };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count, resetIn: entry.resetAt - now };
}

/**
 * Extrait l'IP réelle depuis les headers Vercel/Next
 * @param {Request} request
 */
export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Valide et sanitise les inputs texte
 * @param {string} value
 * @param {number} maxLength
 */
export function sanitizeInput(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength).trim();
}
