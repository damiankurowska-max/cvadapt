// Clerk proxy: routes /api/clerk-proxy/* → frontend-api.clerk.services/*
// Clerk JS is loaded from jsDelivr CDN directly.
// API calls come here and are forwarded server-side (Vercel → Clerk, no CF conflict).

const FAPI = "https://frontend-api.clerk.services";

async function clerkProxy(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/clerk-proxy/, "") || "/";
  const targetUrl = `${FAPI}${path}${url.search}`;

  // Forward headers but strip problematic ones
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    const lower = k.toLowerCase();
    if (["host", "connection", "content-length"].includes(lower)) continue;
    headers[k] = v;
  }
  // Tell Clerk which proxy this came from
  headers["x-clerk-proxy-url"] = "https://postulera.com/api/clerk-proxy";
  // Include publishable key so Clerk identifies the instance
  headers["x-publishable-key"] = "pk_live_Y2xlcmsucG9zdHVsZXJhLmNvbSQ";

  const init = { method: request.method, headers };
  if (!["GET", "HEAD"].includes(request.method)) {
    try { init.body = await request.arrayBuffer(); } catch {}
  }

  try {
    const res = await fetch(targetUrl, init);
    const resHeaders = {};
    for (const [k, v] of res.headers.entries()) {
      if (!["transfer-encoding", "connection", "content-encoding"].includes(k.toLowerCase())) {
        resHeaders[k] = v;
      }
    }
    return new Response(res.body, { status: res.status, headers: resHeaders });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "proxy_error", detail: err.message }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}

export async function GET(req) { return clerkProxy(req); }
export async function POST(req) { return clerkProxy(req); }
export async function PUT(req) { return clerkProxy(req); }
export async function DELETE(req) { return clerkProxy(req); }
export async function PATCH(req) { return clerkProxy(req); }
export async function OPTIONS(req) { return clerkProxy(req); }
