"use client";
import { useState, useEffect } from "react";
import Logo from "@/app/components/Logo";

const SECRET = "postulera-admin-2026";

const PLAN_COLOR = { free: "#64748b", essentiel: "#2563eb", pro: "#7c3aed" };
const PLAN_BG = { free: "#f1f5f9", essentiel: "#eff6ff", pro: "#f5f3ff" };

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/admin/users?secret=${SECRET}`)
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false); });
  }, []);

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.length,
    pro: users.filter(u => u.plan === "pro").length,
    essentiel: users.filter(u => u.plan === "essentiel").length,
    free: users.filter(u => u.plan === "free").length,
    cvTotal: users.reduce((s, u) => s + (u.cvCount || 0), 0),
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={28} />
          <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Postulera</span>
          <span style={{ fontSize: 12, background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>ADMIN</span>
        </div>
        <a href="/" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Retour au site</a>
      </header>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Utilisateurs</h1>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total", value: stats.total, color: "#0f172a", bg: "#f1f5f9" },
            { label: "Gratuit", value: stats.free, color: "#64748b", bg: "#f1f5f9" },
            { label: "Étudiant", value: stats.essentiel, color: "#2563eb", bg: "#eff6ff" },
            { label: "Pro", value: stats.pro, color: "#7c3aed", bg: "#f5f3ff" },
            { label: "CV générés", value: stats.cvTotal, color: "#10b981", bg: "#ecfdf5" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: "16px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par email ou nom..."
          style={{ width: "100%", padding: "11px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box", fontFamily: "inherit" }}
        />

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8faff" }}>
                {["Email", "Nom", "Plan", "CV", "Inscrit", "Dernière connexion", "Via"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>Aucun résultat</td></tr>
              ) : filtered.map((u, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{u.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{u.name || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: PLAN_COLOR[u.plan] || "#64748b", background: PLAN_BG[u.plan] || "#f1f5f9", padding: "3px 8px", borderRadius: 999 }}>
                      {u.plan === "free" ? "Gratuit" : u.plan === "essentiel" ? "Étudiant" : "Pro"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151", fontWeight: 700 }}>{u.cvCount || 0}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{u.createdAt}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{u.lastSignIn}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{u.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12, textAlign: "center" }}>
          {filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} · Actualise la page pour rafraîchir
        </p>
      </div>
    </div>
  );
}
