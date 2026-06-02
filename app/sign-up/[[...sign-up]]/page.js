"use client";
import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    // Redirige vers la page hébergée Clerk avec retour sur /generate
    window.location.href = "https://clerk.cvadapt.eu/sign-up?redirect_url=" + encodeURIComponent("https://cvadapt.eu/generate");
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#6b7280", fontSize: 14 }}>Chargement...</p>
      </div>
    </main>
  );
}
