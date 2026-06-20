"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useAuth } from "@clerk/nextjs";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) { router.push("/generate"); return; }
    // Si Clerk ne charge pas en 4s → redirige vers generate
    const t = setTimeout(() => { router.push("/generate"); }, 4000);
    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, router]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
    }}>
      <SignIn afterSignInUrl="/generate" redirectUrl="/generate" signUpUrl="/sign-up" />
      <p style={{ color: "#475569", fontSize: 13 }}>
        Connexion indisponible temporairement — redirection automatique...
      </p>
    </div>
  );
}
