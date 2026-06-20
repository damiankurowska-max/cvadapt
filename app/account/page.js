"use client";
import { useSupabase } from "../components/SupabaseProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";

export default function AccountPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  if (!user) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#64748b" }}>Chargement...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f7", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={28} />
          <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Postulera</span>
        </Link>
        <button onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
          style={{ fontSize: 13, color: "#64748b", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
          Déconnexion
        </button>
      </header>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Mon compte</h1>
        <p style={{ color: "#64748b", marginBottom: 32 }}>{user.email}</p>
        <Link href="/generate" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
          Générer un CV →
        </Link>
      </div>
    </div>
  );
}
