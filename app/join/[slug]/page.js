"use client";
import { useEffect, useState } from "react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import Logo from "@/app/components/Logo";

export default function JoinPage() {
  const { slug } = useParams();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState("idle"); // idle | joining | success | error | already
  const [institutionName, setInstitutionName] = useState("");
  const [error, setError] = useState("");

  // Si l'user est déjà dans cette institution, redirige vers generate
  useEffect(() => {
    if (!isLoaded || !user) return;
    const meta = user.unsafeMetadata || {};
    if (meta.institutionSlug === slug) {
      setStatus("already");
      return;
    }
    // Auto-join dès que l'user est connecté
    handleJoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  async function handleJoin() {
    setStatus("joining");
    try {
      const res = await fetch("/api/institution/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) setStatus("already");
        else { setError(data.error || "Erreur"); setStatus("error"); }
        return;
      }
      setInstitutionName(data.institution?.name || "");
      setStatus("success");
      // Refresh Clerk session pour que les métadonnées soient à jour
      await user.reload();
      setTimeout(() => router.push("/generate"), 2000);
    } catch {
      setError("Erreur réseau. Réessaie.");
      setStatus("error");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f0f7ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", maxWidth: 440, width: "100%", boxShadow: "0 4px 32px rgba(29,78,216,0.08)", textAlign: "center" }}>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Logo size={36} />
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          Accès établissement
        </div>

        {/* État : pas encore connecté */}
        {isLoaded && !user && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1e3a8a", marginBottom: 10, lineHeight: 1.3 }}>
              Ton école t&apos;a offert Postulera
            </h1>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
              Crée un compte gratuit pour accéder à la génération de CV optimisée pour ton BDE / ta filière.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SignUpButton mode="modal" redirectUrl={`/join/${slug}`}>
                <button style={{ width: "100%", background: "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 20px", borderRadius: 12, border: "none", cursor: "pointer" }}>
                  Créer un compte gratuit
                </button>
              </SignUpButton>
              <SignInButton mode="modal" redirectUrl={`/join/${slug}`}>
                <button style={{ width: "100%", background: "#f3f4f6", color: "#374151", fontWeight: 600, fontSize: 14, padding: "12px 20px", borderRadius: 12, border: "none", cursor: "pointer" }}>
                  J&apos;ai déjà un compte
                </button>
              </SignInButton>
            </div>
          </>
        )}

        {/* Chargement */}
        {(!isLoaded || status === "joining") && (
          <div style={{ padding: "32px 0" }}>
            <div style={{ width: 36, height: 36, border: "3px solid #1d4ed8", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 14, color: "#6b7280" }}>Rattachement en cours…</p>
          </div>
        )}

        {/* Succès */}
        {status === "success" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎓</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1e3a8a", marginBottom: 8 }}>Bienvenue !</h2>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 4 }}>
              Tu es maintenant rattaché à <strong style={{ color: "#1d4ed8" }}>{institutionName}</strong>.
            </p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Redirection vers le générateur…</p>
          </>
        )}

        {/* Déjà membre */}
        {status === "already" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1e3a8a", marginBottom: 8 }}>Déjà activé</h2>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24 }}>Tu es déjà rattaché à cet établissement.</p>
            <a href="/generate" style={{ display: "inline-block", background: "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 12, textDecoration: "none" }}>
              Générer un CV →
            </a>
          </>
        )}

        {/* Erreur */}
        {status === "error" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Lien invalide</h2>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>{error}</p>
            <a href="/" style={{ fontSize: 14, color: "#1d4ed8" }}>Retour à l&apos;accueil</a>
          </>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
