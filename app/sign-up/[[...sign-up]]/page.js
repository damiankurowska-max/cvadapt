"use client";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function SignUpPage() {
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
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "4px 12px", borderRadius: 999 }}>
              3 CV gratuits · Sans CB
            </span>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Créer un compte
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 32 }}>
            Génère jusqu'à 3 CV optimisés gratuitement
          </p>

          <a href="/generate" style={{
            display: "block", textAlign: "center",
            background: "#2563eb", color: "#fff",
            padding: "14px 20px", borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: "none",
            marginBottom: 16,
          }}>
            Commencer gratuitement →
          </a>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginBottom: 24 }}>
            L'inscription complète sera disponible très prochainement.
          </p>

          <div style={{ paddingTop: 20, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>Déjà un compte ? </span>
            <Link href="/sign-in" style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
