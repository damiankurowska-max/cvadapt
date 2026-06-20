"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useAuth } from "@clerk/nextjs";
import Logo from "@/app/components/Logo";
import Link from "next/link";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [clerkReady, setClerkReady] = useState(false);

  useEffect(() => {
    if (isSignedIn) { router.push("/generate"); return; }
    const t = setTimeout(() => setClerkReady(true), 2000);
    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, router]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "20px 32px", display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={32} />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: "-0.4px" }}>Postulera</span>
        </Link>
      </header>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {clerkReady && isLoaded ? (
            <SignIn afterSignInUrl="/generate" redirectUrl="/generate" signUpUrl="/sign-up" />
          ) : (
            <div style={{
              background: "#fff", borderRadius: 20, padding: "40px 36px",
              boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0",
            }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
                Connexion
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>
                Connecte-toi pour accéder à tes CV
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "3px solid #e2e8f0", borderTopColor: "#2563eb",
                  animation: "spin 0.8s linear infinite",
                }} />
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
                Chargement en cours...
              </p>

              <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                <span style={{ fontSize: 13, color: "#64748b" }}>Pas encore de compte ? </span>
                <Link href="/sign-up" style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>S'inscrire</Link>
              </div>

              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Link href="/generate" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
                  Continuer sans compte →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
