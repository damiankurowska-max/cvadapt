import https from "https";

// Direct TCP connection to Clerk's FAPI IP, bypassing DNS and Cloudflare conflict.
// Sets SNI + Host to clerk.postulera.com so Clerk identifies the correct instance.

const CLERK_HOST = "clerk.postulera.com";
// Clerk FAPI IPs (from DNS resolution of frontend-api.clerk.services)
const CLERK_IP = "172.64.153.110";

function rawRequest(method, path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CLERK_IP,
      port: 443,
      path,
      method,
      servername: CLERK_HOST, // SNI
      headers: { ...headers, host: CLERK_HOST },
      rejectUnauthorized: false, // Clerk cert is valid for clerk.postulera.com via wildcard
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on("error", reject);
    if (body && body.length) req.write(body);
    req.end();
  });
}

async function clerkProxy(request) {
  const url = new URL(request.url);
  const clerkPath = url.pathname.replace(/^\/api\/clerk-proxy/, "") || "/";
  const fullPath = `${clerkPath}${url.search}`;

  // Forward select headers
  const fwdHeaders = {
    "x-clerk-proxy-url": "https://postulera.com/api/clerk-proxy",
  };
  for (const k of ["cookie", "authorization", "content-type", "accept", "user-agent",
    "x-forwarded-for", "_clerk_js_version", "origin", "referer"]) {
    const v = request.headers.get(k);
    if (v) fwdHeaders[k] = v;
  }

  let bodyBuf;
  if (!["GET", "HEAD"].includes(request.method)) {
    bodyBuf = Buffer.from(await request.arrayBuffer());
    if (bodyBuf.length) fwdHeaders["content-length"] = String(bodyBuf.length);
  }

  try {
    const { status, headers: resHeaders, body } = await rawRequest(
      request.method, fullPath, fwdHeaders, bodyBuf
    );

    const outHeaders = {};
    for (const [k, v] of Object.entries(resHeaders)) {
      if (!["transfer-encoding", "connection"].includes(k)) {
        outHeaders[k] = Array.isArray(v) ? v.join(", ") : v;
      }
    }

    return new Response(body, { status, headers: outHeaders });
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
