"use client";
import { useState } from "react";
import { ModernLanding } from "@/components/ui/modern-landing";
import ExitIntentPopup from "@/app/components/ExitIntentPopup";

export function LandingWrapper({ faqSchema }) {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");

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
      <ModernLanding
        onNewsletter={handleNewsletter}
        emailStatus={emailStatus}
        email={email}
        setEmail={setEmail}
      />
      <ExitIntentPopup />
    </>
  );
}
