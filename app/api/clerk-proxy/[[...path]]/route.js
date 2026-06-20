async function clerkProxy(request, { params }) {
  const path = ((await params)?.path || []).join("/");
  const searchParams = new URL(request.url).searchParams.toString();
  const clerkUrl = `https://frontend-api.clerk.services/${path}${searchParams ? `?${searchParams}` : ""}`;

  const headers = new Headers(request.headers);
  headers.set("host", "frontend-api.clerk.services");

  const init = { method: request.method, headers };
  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
    init.duplex = "half";
  }

  return fetch(clerkUrl, init);
}

export async function GET(request, ctx) { return clerkProxy(request, ctx); }
export async function POST(request, ctx) { return clerkProxy(request, ctx); }
export async function PUT(request, ctx) { return clerkProxy(request, ctx); }
export async function DELETE(request, ctx) { return clerkProxy(request, ctx); }
export async function PATCH(request, ctx) { return clerkProxy(request, ctx); }
