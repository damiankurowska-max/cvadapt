"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignUp, useAuth } from "@clerk/nextjs";

export default function SignUpPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) { router.push("/generate"); return; }
    const t = setTimeout(() => { router.push("/generate"); }, 4000);
    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, router]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
    }}>
      <SignUp afterSignUpUrl="/generate" redirectUrl="/generate" signInUrl="/sign-in" />
      <p style={{ color: "#475569", fontSize: 13 }}>
        Inscription indisponible temporairement — redirection automatique...
      </p>
    </div>
  );
}
