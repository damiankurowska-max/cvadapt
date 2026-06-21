"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";
import dynamic from "next/dynamic";

const Pricing = dynamic(
  () => import("@/components/blocks/pricing").then((m) => ({ default: m.Pricing })),
  { ssr: false, loading: () => <div style={{ minHeight: 400 }} /> }
);

export default function Tarifs() {
  const [loading, setLoading] = useState("");
  const [error, setError]     = useState("");

  async function handleCheckout(planId) {
    setLoading(planId);
    setError("");
    try { window.clarity?.("event", `checkout_attempt_${planId}`); } catch {}
    try {
      const res  = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        setError(data.error || `Erreur ${res.status} — réessaie dans quelques secondes.`);
        setLoading("");
      }
    } catch {
      setError("Connexion impossible, vérifie ta connexion internet.");
      setLoading("");
    }
  }

  /** Plans Postulera — price / yearlyPrice en nombre (€/mois) */
  const plans = [
    {
      name: "Gratuit",
      price: 0,
      yearlyPrice: 0,
      period: "mois",
      features: [
        "3 CV au total",
        "4 templates visuels",
        "Téléchargement PDF",
      ],
      description: "Pour découvrir Postulera sans engagement.",
      buttonText: "Commencer gratuitement",
      href: "/generate",
      isPopular: false,
    },
    {
      name: "Étudiant",
      price: 4.99,
      yearlyPrice: 3.33,
      period: "mois",
      features: [
        "15 CV par mois",
        "Score ATS complet + recommandations",
        "4 templates professionnels",
        "Lettre de motivation incluse",
        "Mots-clés détectés automatiquement",
        "Support prioritaire",
      ],
      description: "Sans engagement · Annule quand tu veux.",
      buttonText: "Choisir Étudiant →",
      onAction: (billing) =>
        handleCheckout(billing === "monthly" ? "essentiel" : "essentiel_annuel"),
      isLoading: loading === "essentiel" || loading === "essentiel_annuel",
      isPopular: true,
    },
    {
      name: "Pro",
      price: 9.99,
      yearlyPrice: 7.99,
      period: "mois",
      features: [
        "CV illimités",
        "4 templates visuels",
        "Lettre de motivation incluse",
        "Téléchargement PDF",
        "CV optimisés par IA",
        "Conseils personnalisés",
        "Support prioritaire",
      ],
      description: "Pour les candidatures intensives.",
      buttonText: "Choisir Pro →",
      onAction: (billing) =>
        handleCheckout(billing === "monthly" ? "pro" : "pro_annuel"),
      isLoading: loading === "pro" || loading === "pro_annuel",
      isPopular: false,
    },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#f0f6ff", colorScheme: "light" }}>
      <style>{`html,body{background:#f0f6ff!important}`}</style>

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="text-xl font-bold text-blue-600">Postulera</span>
        </Link>
        <Link
          href="/generate"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Essayer gratuitement
        </Link>
      </header>

      {/* Hero titre */}
      <div className="text-center pt-16 pb-2 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Des tarifs pensés pour les étudiants
        </h1>
        <p className="text-gray-500">
          Sans engagement · Annule quand tu veux · 🎓 Remise étudiant disponible
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-sm my-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center max-w-md mx-auto">
          {error}
        </p>
      )}

      {/* Composant pricing animé */}
      <Pricing
        plans={plans}
        title=""
        description=""
      />

      {/* Garantie */}
      <div className="text-center space-y-2 px-6 pb-6 -mt-6">
        <p className="text-gray-500 text-sm">
          🔒 Paiement 100% sécurisé par Stripe · Annulation en 1 clic · Aucun engagement
        </p>
        <p className="text-blue-600 text-sm font-semibold">
          🎓 Remise de 50% disponible sur justificatif étudiant —{" "}
          <a href="mailto:contact@postulera.com" className="underline">
            contact@postulera.com
          </a>
        </p>
      </div>

      {/* Bloc établissements */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div
          style={{
            background: "linear-gradient(135deg, #0c1445 0%, #1a2d7a 50%, #2451c7 100%)",
            borderRadius: 20,
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute", top: -60, right: -60,
              width: 240, height: 240, borderRadius: "50%",
              background: "rgba(255,255,255,0.04)", pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: -40, left: -40,
              width: 180, height: 180, borderRadius: "50%",
              background: "rgba(255,255,255,0.03)", pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  color: "#93c5fd",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: 980,
                  letterSpacing: "0.1em",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                🏫 Pour les établissements
              </div>
              <h3
                style={{
                  fontSize: 26, fontWeight: 800, color: "#fff",
                  marginBottom: 10, letterSpacing: "-0.03em", lineHeight: 1.2,
                }}
              >
                Offrez Postulera à toute votre promo
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  marginBottom: 24,
                  maxWidth: 420,
                }}
              >
                Un lien, tous vos étudiants inscrits en 30 secondes. Dashboard admin,
                statistiques d'insertion et quota mensuel inclus. À partir de{" "}
                <strong style={{ color: "#fff" }}>299€/an.</strong>
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { label: "Essentiel", price: "299€",   sub: "50 CV/mois" },
                  { label: "Starter",   price: "599€",   sub: "200 CV/mois" },
                  { label: "Pro",       price: "990€",   sub: "500 CV/mois" },
                  { label: "Campus",    price: "1 990€", sub: "Illimité" },
                ].map((p) => (
                  <div
                    key={p.label}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      padding: "8px 14px",
                      textAlign: "center",
                      minWidth: 80,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10, fontWeight: 700,
                        color: "rgba(255,255,255,0.45)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 2,
                      }}
                    >
                      {p.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                      {p.price}
                      <span style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                        /an
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
                      {p.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 200 }}>
              <a
                href="/tarifs-etablissements"
                style={{
                  display: "block", textAlign: "center",
                  background: "#fff", color: "#1e3a8a",
                  fontWeight: 800, fontSize: 15,
                  padding: "14px 28px", borderRadius: 12, textDecoration: "none",
                }}
              >
                Voir les offres →
              </a>
              <a
                href="mailto:contact@postulera.com?subject=Devis Postulera Établissement&body=Bonjour, je souhaite un devis pour mon établissement.%0AType :%0ANombre d'étudiants :%0AContact :"
                style={{
                  display: "block", textAlign: "center",
                  background: "rgba(255,255,255,0.1)", color: "#fff",
                  fontWeight: 600, fontSize: 13,
                  padding: "11px 20px", borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-6 pb-16 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Questions fréquentes
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { q: "Puis-je annuler à tout moment ?", r: "Oui, sans condition. Tu peux annuler depuis ton espace Stripe à tout moment, l'accès reste actif jusqu'à la fin de la période payée." },
            { q: "L'offre annuelle est-elle remboursable ?", r: "Oui, sous 14 jours après l'achat (droit de rétractation légal français). Au-delà, l'accès reste actif jusqu'à la fin de l'année." },
            { q: "La lettre de motivation est-elle incluse ?", r: "Oui, dans les plans Étudiant et Pro. Elle est générée automatiquement en même temps que ton CV, adaptée à l'offre d'emploi." },
            { q: "Les CV générés m'appartiennent ?", r: "Oui, à 100%. Tu peux télécharger, modifier et utiliser tes CV comme tu le souhaites, sans restriction." },
            { q: "Combien de temps pour générer un CV ?", r: "30 secondes en moyenne. L'IA analyse l'offre, intègre les mots-clés ATS et génère un CV complet prêt à télécharger." },
            { q: "Ça fonctionne pour tous les secteurs ?", r: "Oui — marketing, tech, finance, santé, droit, commerce. L'IA s'adapte au vocabulaire spécifique de chaque offre." },
          ].map((item) => (
            <div key={item.q} style={{ display: "flex", background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
              <div style={{ width: 4, flexShrink: 0, background: "#10b981" }} />
              <div style={{ padding: "18px 20px" }}>
                <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 6 }}>{item.q}</p>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{item.r}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/"                className="hover:text-gray-600">Accueil</Link>
          <Link href="/blog"            className="hover:text-gray-600">Blog</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgu"             className="hover:text-gray-600">CGU</Link>
        </div>
        © 2025 Postulera — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
