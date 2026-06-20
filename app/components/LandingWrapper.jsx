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
      <div>
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
