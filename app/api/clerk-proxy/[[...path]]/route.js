// Clerk proxy: simple passthrough to frontend-api.clerk.services

export async function GET(req) { return proxy(req); }
export async function POST(req) { return proxy(req); }
export async function PUT(req) { return proxy(req); }
export async function DELETE(req) { return proxy(req); }
export async function PATCH(req) { return proxy(req); }
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
      "access-control-allow-headers": "*",
    },
  });
}

async function proxy(req) {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/api\/clerk-proxy/, "") || "/";
    const target = `https://frontend-api.clerk.services${path}${url.search}`;

    const headers = new Headers();
    for (const [k, v] of req.headers) {
      const l = k.toLowerCase();
      if (l === "host" || l === "content-length" || l === "connection") continue;
      headers.set(k, v);
    }

    const init = { method: req.method, headers };
    if (req.method !== "GET" && req.method !== "HEAD") {
      const body = await req.arrayBuffer();
      if (body.byteLength > 0) init.body = body;
    }

    const res = await fetch(target, init);

    const resHeaders = new Headers();
    for (const [k, v] of res.headers) {
      if (["transfer-encoding", "connection"].includes(k.toLowerCase())) continue;
      resHeaders.set(k, v);
    }
    resHeaders.set("access-control-allow-origin", "*");

    const body = await res.arrayBuffer();
    return new Response(body, { status: res.status, headers: resHeaders });

  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 502 });
  }
}
