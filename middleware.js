import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/generate(.*)", "/dashboard(.*)", "/account(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // Visiteur non connecté sur /generate → inscription (pas tarifs — frein conversion)
  if (!userId && isProtectedRoute(req)) {
    const url = new URL("/sign-up", req.url);
    url.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
