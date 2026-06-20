"use client";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function SignInPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ padding: "20px 32px", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={32} />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: "-0.4px" }}>Postulera</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "#fff", borderRadius: 20, padding: "40px 36px",
          boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0",
        }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Connexion
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 32 }}>
            Connecte-toi pour accéder à tes CV
          </p>

          <a href="/generate" style={{
            display: "block", textAlign: "center",
            background: "#2563eb", color: "#fff",
            padding: "14px 20px", borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: "none",
            marginBottom: 16,
          }}>
            Accéder à mon espace →
          </a>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginBottom: 24 }}>
            La connexion complète sera disponible très prochainement.
          </p>

          <div style={{ paddingTop: 20, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>Pas encore de compte ? </span>
            <Link href="/sign-up" style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>S'inscrire</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
