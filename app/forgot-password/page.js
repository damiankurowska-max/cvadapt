"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import { useSupabase } from "@/app/components/SupabaseProvider";

export default function ForgotPasswordPage() {
  const supabase = useSupabase();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError("Une erreur est survenue. Vérifie l'adresse email.");
      setLoading(false);
    } else {
      setSent(true);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ padding: "20px 32px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", width: "fit-content" }}>
          <Logo size={32} /><span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>Postulera</span>
        </Link>
      </header>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Email envoyé !</h2>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
                Un lien de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifie tes spams si tu ne le vois pas.
              </p>
              <Link href="/sign-in" style={{ fontSize: 14, color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                ← Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>Mot de passe oublié</h1>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>Entre ton email et on t'envoie un lien pour le réinitialiser.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                {error && <p style={{ fontSize: 13, color: "#ef4444", background: "#fef2f2", padding: "10px 14px", borderRadius: 8, marginBottom: 16 }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
                </button>
              </form>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <Link href="/sign-in" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>
                  ← Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
