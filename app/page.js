"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ModernLanding = dynamic(
  () => import("@/components/ui/modern-landing").then((m) => ({ default: m.ModernLanding })),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "100vh", background: "#080C14", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid rgba(59,130,246,0.2)", borderTopColor: "#3B82F6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    ),
  }
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "CVAdapt est-il vraiment gratuit ?", acceptedAnswer: { "@type": "Answer", text: "Oui, 3 CV complets sont générés gratuitement, sans carte bancaire requise." } },
    { "@type": "Question", name: "Comment fonctionne l'optimisation ATS ?", acceptedAnswer: { "@type": "Answer", text: "L'IA analyse l'offre d'emploi, extrait les mots-clés ATS exacts et réécrit votre CV pour maximiser votre score de correspondance." } },
    { "@type": "Question", name: "En combien de temps est généré mon CV ?", acceptedAnswer: { "@type": "Answer", text: "Le CV optimisé est généré en moins de 30 secondes." } },
    { "@type": "Question", name: "Puis-je annuler mon abonnement ?", acceptedAnswer: { "@type": "Answer", text: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client." } },
    { "@type": "Question", name: "CVAdapt fonctionne-t-il pour tous les secteurs ?", acceptedAnswer: { "@type": "Answer", text: "Oui, CVAdapt analyse le vocabulaire spécifique de chaque offre et adapte le CV en conséquence, quel que soit le secteur." } },
  ],
};

export default function Home() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ModernLanding
        onNewsletter={handleNewsletter}
        emailStatus={emailStatus}
        email={email}
        setEmail={setEmail}
      />
    </>
  );
}
