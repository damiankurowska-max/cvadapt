"use client";
import { useSupabase } from "../components/SupabaseProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";

const PLAN_LABELS = { free: "Gratuit", essentiel: "Étudiant", pro: "Pro" };
const PLAN_COLORS = { free: "#64748b", essentiel: "#2563eb", pro: "#7c3aed" };

export default function AccountPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stripeData, setStripeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/sign-in"); return; }
      setUser(user);
      setLoading(false);
      // Récupérer infos Stripe si abonné
      const plan = user.user_metadata?.plan;
      if (plan && plan !== "free") {
        fetch("/api/billing/info").then(r => r.json()).then(setStripeData).catch(() => {});
      }
    });
  }, [supabase, router]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8faff" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const meta = user?.user_metadata || {};
  const plan = meta.plan || "free";
  const cvCount = parseInt(meta.cvCount || 0);
  const cvLimit = plan === "free" ? 3 : plan === "essentiel" ? 15 : "∞";
  const createdAt = user?.created_at ? new Date(user.created_at) : null;
  const avatar = user?.user_metadata?.avatar_url;
  const name = meta.full_name || meta.first_name || user?.email?.split("@")[0];

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={28} />
          <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Postulera</span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/generate" style={{ fontSize: 14, color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>Générer un CV</Link>
          <button onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            style={{ fontSize: 13, color: "#64748b", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
            Déconnexion
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        {/* Profil card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 2px 16px rgba(15,23,42,0.06)", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #f1f5f9" }}>
            {avatar ? (
              <img src={avatar} alt="avatar" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 22 }}>
                {name?.[0]?.toUpperCase() || "P"}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{name}</h1>
              <p style={{ fontSize: 14, color: "#64748b" }}>{user.email}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={{ background: "#f8faff", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: PLAN_COLORS[plan] || "#2563eb", marginBottom: 4 }}>{cvCount}</p>
              <p style={{ fontSize: 12, color: "#64748b" }}>CV générés</p>
            </div>
            <div style={{ background: "#f8faff", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", marginBottom: 4 }}>{cvLimit}</p>
              <p style={{ fontSize: 12, color: "#64748b" }}>Limite {plan === "free" ? "totale" : "/mois"}</p>
            </div>
            <div style={{ background: "#f8faff", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#10b981", marginBottom: 4 }}>
                {plan === "free" ? Math.max(0, 3 - cvCount) : plan === "essentiel" ? Math.max(0, 15 - parseInt(meta.cvMonthCount || 0)) : "∞"}
              </p>
              <p style={{ fontSize: 12, color: "#64748b" }}>CV restants</p>
            </div>
          </div>
        </div>

        {/* Abonnement */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: "1px solid #e2e8f0", boxShadow: "0 2px 16px rgba(15,23,42,0.06)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Abonnement</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ display: "inline-block", background: plan === "free" ? "#f1f5f9" : plan === "essentiel" ? "#eff6ff" : "#f5f3ff", color: PLAN_COLORS[plan], fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 999, marginBottom: 8 }}>
                {PLAN_LABELS[plan] || "Gratuit"}
              </span>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                {plan === "free" ? "3 CV gratuits · Sans carte bancaire" :
                 plan === "essentiel" ? "15 CV/mois · Score ATS · Lettre de motivation" :
                 "CV illimités · Toutes fonctionnalités"}
              </p>
              {createdAt && (
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                  Membre depuis {createdAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
              {stripeData?.current_period_end && (
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                  Prochain paiement : {new Date(stripeData.current_period_end * 1000).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
            </div>
            {plan === "free" ? (
              <Link href="/tarifs" style={{ background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                Passer Pro →
              </Link>
            ) : (
              <button onClick={() => fetch("/api/billing/portal").then(r => r.json()).then(d => d.url && (window.location.href = d.url))}
                style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontSize: 14 }}>
                Gérer l'abonnement
              </button>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px 32px", border: "1px solid #fee2e2" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Zone dangereuse</h2>
          <button onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            style={{ fontSize: 13, color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 16px", cursor: "pointer" }}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
