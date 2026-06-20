// Clerk proxy: routes /api/clerk-proxy/* → frontend-api.clerk.services/*
// Bypasses Cloudflare zone conflict (Error 1000) by connecting directly
// to Clerk's IP while setting host:clerk.postulera.com so Clerk identifies the instance.

const TARGET = "https://frontend-api.clerk.services";
const CLERK_HOST = "clerk.postulera.com";

async function clerkProxy(request) {
  const url = new URL(request.url);
  const clerkPath = url.pathname.replace(/^\/api\/clerk-proxy/, "") || "/";
  const targetUrl = `${TARGET}${clerkPath}${url.search}`;

  // Forward all headers, override host to identify our Clerk instance
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    headers[k] = v;
  }
  headers["host"] = CLERK_HOST;
  headers["x-clerk-proxy-url"] = "https://postulera.com/api/clerk-proxy";
  delete headers["content-length"]; // let fetch recalculate

  const init = { method: request.method, headers };
  if (!["GET", "HEAD"].includes(request.method)) {
    try { init.body = await request.arrayBuffer(); } catch {}
  }

  try {
    const upstream = await fetch(targetUrl, init);
    const resHeaders = {};
    for (const [k, v] of upstream.headers.entries()) {
      if (!["content-encoding", "transfer-encoding", "connection"].includes(k)) {
        resHeaders[k] = v;
      }
    }
    return new Response(upstream.body, { status: upstream.status, headers: resHeaders });
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
