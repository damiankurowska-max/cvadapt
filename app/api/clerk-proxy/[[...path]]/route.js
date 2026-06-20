const CLERK_FAPI = "https://clerk.postulera.com";

async function clerkProxy(request) {
  const url = new URL(request.url);
  const clerkPath = url.pathname.replace(/^\/api\/clerk-proxy/, "") || "/";
  const clerkUrl = `${CLERK_FAPI}${clerkPath}${url.search}`;

  const reqHeaders = new Headers();
  for (const [key, value] of request.headers.entries()) {
    if (!["host", "content-length"].includes(key.toLowerCase())) {
      reqHeaders.set(key, value);
    }
  }
  reqHeaders.set("x-clerk-proxy-url", "https://postulera.com/api/clerk-proxy");

  const init = { method: request.method, headers: reqHeaders, redirect: "follow" };
  if (!["GET", "HEAD"].includes(request.method)) {
    try { init.body = await request.arrayBuffer(); init.duplex = "half"; } catch {}
  }

  try {
    const res = await fetch(clerkUrl, init);
    const resHeaders = new Headers();
    for (const [key, value] of res.headers.entries()) {
      if (!["content-encoding", "transfer-encoding", "connection"].includes(key.toLowerCase())) {
        resHeaders.set(key, value);
      }
    }
    return new Response(res.body, { status: res.status, headers: resHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: "proxy_error", detail: err.message }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function GET(req) { return clerkProxy(req); }
export async function POST(req) { return clerkProxy(req); }
export async function PUT(req) { return clerkProxy(req); }
export async function DELETE(req) { return clerkProxy(req); }
export async function PATCH(req) { return clerkProxy(req); }
export async function OPTIONS(req) { return clerkProxy(req); }
