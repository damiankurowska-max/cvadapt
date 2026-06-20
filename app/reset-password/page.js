"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import { useSupabase } from "@/app/components/SupabaseProvider";

export default function ResetPasswordPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase envoie le token dans le hash de l'URL (#access_token=...&type=recovery)
    // onAuthStateChange détecte automatiquement PASSWORD_RECOVERY
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true); // token valide, afficher le formulaire
      }
      if (event === "SIGNED_IN" && !ready) {
        setReady(true);
      }
    });

    // Vérifier si déjà une session (lien déjà cliqué)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 6) { setError("Minimum 6 caractères."); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("Lien expiré ou invalide. Recommence depuis la page de connexion.");
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/generate"), 2000);
    }
  }

  if (success) return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Mot de passe mis à jour !</h2>
        <p style={{ color: "#64748b" }}>Redirection vers l'outil...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ padding: "20px 32px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", width: "fit-content" }}>
          <Logo size={32} /><span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>Postulera</span>
        </Link>
      </header>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>

          {!ready ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "#64748b", fontSize: 14 }}>Vérification du lien...</p>
              <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 8 }}>
                Si rien ne se passe, <Link href="/forgot-password" style={{ color: "#2563eb" }}>redemande un lien</Link>.
              </p>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>Nouveau mot de passe</h1>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>Choisis un nouveau mot de passe sécurisé.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Nouveau mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required autoFocus minLength={6}
                      style={{ width: "100%", padding: "11px 44px 11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                      {showPwd
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Confirmer le mot de passe</label>
                  <input type={showPwd ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)} required
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                {error && <p style={{ fontSize: 13, color: "#ef4444", background: "#fef2f2", padding: "10px 14px", borderRadius: 8, marginBottom: 16 }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
