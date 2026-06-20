"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "@/app/components/SupabaseProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function SignInPage() {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.push("/generate");
    });
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ padding: "20px 32px", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={32} />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: "-0.4px" }}>Postulera</span>
        </Link>
      </header>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: "36px", boxShadow: "0 4px 32px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.5px" }}>Connexion</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: "#2563eb", brandAccent: "#1d4ed8" } } } }}
            providers={["google"]}
            redirectTo={typeof window !== "undefined" ? `${window.location.origin}/generate` : "/generate"}
            view="sign_in"
          />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link href="/sign-up" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>
              Pas encore de compte ? <span style={{ color: "#2563eb", fontWeight: 600 }}>S'inscrire</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
