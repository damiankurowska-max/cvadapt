/**
 * Rate limiter — utilise Vercel KV si disponible, sinon in-memory (fallback)
 *
 * Pour activer Vercel KV (recommandé en production) :
 * Vercel Dashboard → Storage → Create Database → KV → Link to project
 * Les env vars KV_REST_API_URL et KV_REST_API_TOKEN sont ajoutées automatiquement.
 */

// ─── Fallback in-memory ───────────────────────────────────────────────────────
const store = new Map(); // ip → { count, resetAt }

// Nettoyage périodique pour éviter les fuites mémoire
let lastCleanup = Date.now();
function cleanupStore() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return; // toutes les 5 min max
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
  lastCleanup = now;
}

function rateLimitInMemory(key, max, windowMs) {
  cleanupStore();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetIn: windowMs };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count, resetIn: entry.resetAt - now };
}

// ─── Vercel KV (si configuré) ────────────────────────────────────────────────
async function rateLimitKV(key, max, windowMs) {
  const { kv } = await import("@vercel/kv");
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, Math.ceil(windowMs / 1000));
  }
  const ttl = await kv.pttl(key);
  return {
    allowed: count <= max,
    remaining: Math.max(0, max - count),
    resetIn: ttl > 0 ? ttl : windowMs,
  };
}

/**
 * @param {string} key   - clé unique (ex: "subscribe:1.2.3.4")
 * @param {number} max   - requêtes max dans la fenêtre
 * @param {number} windowMs - fenêtre en ms
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(key, max = 10, windowMs = 60 * 60 * 1000) {
  // API synchrone pour rétrocompatibilité — utilise toujours le fallback in-memory
  // rateLimitKV est disponible via rateLimitAsync pour les endpoints qui peuvent être async
  return rateLimitInMemory(key, max, windowMs);
}

/**
 * Version async — utilise Vercel KV si configuré, sinon fallback in-memory
 * Utilise cette version dans les nouvelles routes API pour une meilleure protection.
 */
export async function rateLimitAsync(key, max = 10, windowMs = 60 * 60 * 1000) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      return await rateLimitKV(key, max, windowMs);
    } catch (err) {
      console.warn("Vercel KV rate limit failed, falling back to in-memory:", err.message);
    }
  }
  return rateLimitInMemory(key, max, windowMs);
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
