"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";

const PLAN_LABELS = {
  starter: { label: "Starter", color: "#6b7280", price: "990€/an" },
  pro:     { label: "Pro",     color: "#1d4ed8", price: "1 990€/an" },
  campus:  { label: "Campus",  color: "#7c3aed", price: "3 990€/an" },
};

function StatCard({ value, label, sub, accent }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e0ecff", borderRadius: 16, padding: "24px 28px", flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: accent || "#1e3a8a", lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function InstitutionDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/sign-in?redirect_url=/institution/dashboard"); return; }

    const meta = user.unsafeMetadata || {};
    if (!meta.institutionId) { router.push("/"); return; }

    fetch("/api/institution/stats")
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setStats(d); })
      .catch(() => setError("Erreur réseau"))
      .finally(() => setLoading(false));
  }, [isLoaded, user, router]);

  if (!isLoaded || loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f7ff" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #1d4ed8", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f7ff", flexDirection: "column", gap: 16 }}>
        <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>
        <a href="/" style={{ color: "#1d4ed8", fontSize: 14 }}>Retour à l&apos;accueil</a>
      </div>
    );
  }

  if (!stats) return null;

  const { institution, members, totalMembers, totalCVs, cvsThisMonth, quotaMonthly, avgScore } = stats;
  const plan = PLAN_LABELS[institution.plan] || PLAN_LABELS.starter;
  const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : "https://cvadapt.eu"}/join/${institution.slug}`;
  const quotaPct = institution.plan === "campus" ? 100 : Math.min(100, Math.round((cvsThisMonth / quotaMonthly) * 100));

  function copyLink() {
    navigator.clipboard.writeText(inviteUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f0f7ff", fontFamily: "var(--font-outfit, system-ui, sans-serif)" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e0ecff", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={26} />
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1d4ed8" }}>CVAdapt</span>
            <span style={{ fontSize: 12, color: "#9ca3af", margin: "0 4px" }}>·</span>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{institution.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: plan.color, color: "#fff", padding: "3px 10px", borderRadius: 980, letterSpacing: "0.04em" }}>
              {plan.label}
            </span>
            <a href="/generate" style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>Générer un CV →</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e3a8a", letterSpacing: "-0.5px", marginBottom: 6 }}>
            Dashboard — {institution.name}
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            Plan {plan.label} · {plan.price} · Lien d&apos;invitation actif
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
          <StatCard value={totalMembers} label="Étudiants inscrits" sub="via le lien d'invitation" accent="#1d4ed8" />
          <StatCard value={totalCVs} label="CV générés" sub="depuis l'activation" accent="#7c3aed" />
          <StatCard value={cvsThisMonth} label="CV ce mois" sub={institution.plan === "campus" ? "Illimité" : `quota : ${quotaMonthly}/mois`} accent="#059669" />
          <StatCard value={avgScore !== null ? `${avgScore}/100` : "—"} label="Score ATS moyen" sub="tous templates confondus" accent="#d97706" />
        </div>

        {/* Quota bar */}
        {institution.plan !== "campus" && (
          <div style={{ background: "#fff", border: "1px solid #e0ecff", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Quota mensuel</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{cvsThisMonth} / {quotaMonthly} CV</span>
            </div>
            <div style={{ background: "#e0ecff", borderRadius: 980, height: 8 }}>
              <div style={{ width: `${quotaPct}%`, background: quotaPct > 85 ? "#dc2626" : "#1d4ed8", height: 8, borderRadius: 980, transition: "width 0.5s" }} />
            </div>
            {quotaPct > 85 && (
              <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8, fontWeight: 600 }}>
                Quota presque atteint — <a href="mailto:contact@cvadapt.eu?subject=Upgrade établissement" style={{ color: "#dc2626" }}>contacte-nous pour upgrader</a>
              </p>
            )}
          </div>
        )}

        {/* Lien d'invitation */}
        <div style={{ background: "#fff", border: "1px solid #e0ecff", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>Lien d&apos;invitation</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
            Partage ce lien à tes étudiants par email, groupe WhatsApp ou intranet. Ils créent un compte et sont automatiquement rattachés à {institution.name}.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <code style={{ flex: 1, background: "#f0f7ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#1d4ed8", wordBreak: "break-all" }}>
              {inviteUrl}
            </code>
            <button onClick={copyLink} style={{ background: copied ? "#059669" : "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
              {copied ? "Copié ✓" : "Copier"}
            </button>
          </div>
        </div>

        {/* Liste membres */}
        <div style={{ background: "#fff", border: "1px solid #e0ecff", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #e0ecff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a" }}>Étudiants inscrits ({totalMembers})</h2>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Les plus récents en premier</span>
          </div>

          {members.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 15, color: "#9ca3af" }}>Aucun étudiant encore inscrit.</p>
              <p style={{ fontSize: 13, color: "#d1d5db", marginTop: 6 }}>Partage le lien d&apos;invitation ci-dessus.</p>
            </div>
          ) : (
            <div>
              {members.slice(0, 50).map((m, i) => (
                <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", borderBottom: i < members.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dbeafe", color: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {(m.email || "?")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: "#374151", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {m.email || "Anonyme"}
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: "#9ca3af", flexShrink: 0 }}>
                    {new Date(m.joined_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))}
              {members.length > 50 && (
                <div style={{ padding: "12px 24px", textAlign: "center", fontSize: 12, color: "#9ca3af" }}>
                  + {members.length - 50} autres étudiants
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer contact */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 32 }}>
          Question ou upgrade ? <a href="mailto:contact@cvadapt.eu" style={{ color: "#1d4ed8" }}>contact@cvadapt.eu</a>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
