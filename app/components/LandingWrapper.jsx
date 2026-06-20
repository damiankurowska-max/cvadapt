"use client";
import { useState, useEffect } from "react";
import { ModernLanding } from "@/components/ui/modern-landing";
import ExitIntentPopup from "@/app/components/ExitIntentPopup";
import { useSupabase } from "@/app/components/SupabaseProvider";
import Link from "next/link";

export function LandingWrapper({ faqSchema }) {
  const supabase = useSupabase();
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleNewsletter(e) {
    e.preventDefault();
    setEmailStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, lang: "fr" }),
    });
    setEmailStatus(res.ok ? "success" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <>
      {user && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: "#2563eb", padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, margin: 0 }}>
            👋 Connecté en tant que <strong style={{ color: "#fff" }}>{user.user_metadata?.full_name || user.email}</strong>
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/generate" style={{ fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.2)", padding: "5px 14px", borderRadius: 8 }}>
              Générer mon CV →
            </Link>
            <Link href="/account" style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "5px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)" }}>
              Mon profil
            </Link>
          </div>
        </div>
      )}
      <div style={{ marginTop: user ? 44 : 0 }}>
        <ModernLanding
          onNewsletter={handleNewsletter}
          emailStatus={emailStatus}
          email={email}
          setEmail={setEmail}
          user={user}
        />
      </div>
      <ExitIntentPopup />
    </>
  );
}
