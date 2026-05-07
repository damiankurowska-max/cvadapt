"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

const PLANS = {
  mensuel: {
    essentiel: { id: "essentiel",        prix: "4,99€", prixSub: "/mois",      economie: null,      badge: null },
    pro:       { id: "pro",              prix: "9,99€", prixSub: "/mois",      economie: null,      badge: null },
  },
  annuel: {
    essentiel: { id: "essentiel_annuel", prix: "3,33€", prixSub: "/mois",      economie: "39,99€/an", badge: "-33%" },
    pro:       { id: "pro_annuel",       prix: "6,67€", prixSub: "/mois",      economie: "79,99€/an", badge: "-33%" },
  },
};

export default function Tarifs() {
  const [loading, setLoading]   = useState("");
  const [error, setError]       = useState("");
  const [periode, setPeriode]   = useState("mensuel"); // "mensuel" | "annuel"

  const plan = PLANS[periode];

  async function handleCheckout(planId) {
    setLoading(planId);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        window.location.href = data.redirect + "?redirect_url=/tarifs";
      } else {
        setError(data.error || "Erreur lors du paiement, réessaie.");
        setLoading("");
      }
    } catch {
      setError("Connexion impossible, vérifie ta connexion internet.");
      setLoading("");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <Link href="/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Essayer gratuitement
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Titre */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tarifs</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Des tarifs pensés pour les étudiants</h1>
          <p className="text-gray-500">Sans engagement · Annule quand tu veux · 🎓 Remise étudiant disponible</p>
        </div>

        {/* Toggle mensuel / annuel */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setPeriode("mensuel")}
            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-colors ${
              periode === "mensuel" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setPeriode("annuel")}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg transition-colors ${
              periode === "annuel" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Annuel
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -33%
            </span>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-8 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center max-w-md mx-auto">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Gratuit */}
          <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Gratuit</p>
            <div className="mb-1">
              <span className="text-5xl font-extrabold text-gray-900">0€</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">pour toujours</p>
            <ul className="space-y-3 mb-10 flex-1">
              {["3 CV au total", "4 templates visuels", "Téléchargement PDF"].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
              {["CV illimités", "Lettre de motivation", "Conseils personnalisés"].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 text-xs flex-shrink-0">✗</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/generate" className="block text-center bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
              Commencer gratuitement
            </Link>
          </div>

          {/* Étudiant */}
          <div className="rounded-2xl p-8 flex flex-col relative bg-gray-900 shadow-xl ring-1 ring-gray-800 md:-mt-4 md:-mb-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide whitespace-nowrap">
              LE PLUS POPULAIRE
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Étudiant</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-white">{plan.essentiel.prix}</span>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-gray-400 text-sm">{plan.essentiel.prixSub}</span>
              {plan.essentiel.economie && (
                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  {plan.essentiel.economie} facturé
                </span>
              )}
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "15 CV par mois",
                "Score ATS complet + recommandations",
                "4 templates professionnels",
                "Lettre de motivation incluse",
                "Mots-clés détectés automatiquement",
                "Support prioritaire",
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(plan.essentiel.id)}
              disabled={loading === plan.essentiel.id}
              className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm disabled:opacity-50"
            >
              {loading === plan.essentiel.id ? "Chargement..." : "Choisir Étudiant →"}
            </button>
            {periode === "annuel" && (
              <p className="text-center text-green-400 text-xs font-semibold mt-3">
                Tu économises 19,89€ par an 🎉
              </p>
            )}
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-gray-900">{plan.pro.prix}</span>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-gray-500 text-sm">{plan.pro.prixSub}</span>
              {plan.pro.economie && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {plan.pro.economie} facturé
                </span>
              )}
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "CV illimités",
                "4 templates visuels",
                "Lettre de motivation incluse",
                "Téléchargement PDF",
                "CV optimisés par IA",
                "Conseils Pro personnalisés",
                "Support prioritaire",
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(plan.pro.id)}
              disabled={loading === plan.pro.id}
              className="block w-full text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm disabled:opacity-50"
            >
              {loading === plan.pro.id ? "Chargement..." : "Choisir Pro →"}
            </button>
            {periode === "annuel" && (
              <p className="text-center text-green-600 text-xs font-semibold mt-3">
                Tu économises 39,89€ par an 🎉
              </p>
            )}
          </div>
        </div>

        {/* Garantie */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-gray-500 text-sm">🔒 Paiement 100% sécurisé par Stripe · Annulation en 1 clic · Aucun engagement</p>
          <p className="text-blue-600 text-sm font-semibold">🎓 Remise de 50% disponible sur justificatif étudiant — <a href="mailto:contact@cvadapt.eu" className="underline">contact@cvadapt.eu</a></p>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Puis-je annuler à tout moment ?",         r: "Oui, sans condition. Tu peux annuler depuis ton espace Stripe à tout moment, l'accès reste actif jusqu'à la fin de la période payée." },
              { q: "L'offre annuelle est-elle remboursable ?", r: "Oui, sous 14 jours après l'achat (droit de rétractation légal français). Au-delà, l'accès reste actif jusqu'à la fin de l'année." },
              { q: "La lettre de motivation est-elle incluse ?",r: "Oui, dans les plans Étudiant et Pro. Elle est générée automatiquement en même temps que ton CV, adaptée à l'offre d'emploi." },
              { q: "Les CV générés m'appartiennent ?",         r: "Oui, à 100%. Tu peux télécharger, modifier et utiliser tes CV comme tu le souhaites, sans restriction." },
            ].map((item) => (
              <div key={item.q} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400 mt-16">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/"               className="hover:text-gray-600">Accueil</Link>
          <Link href="/blog"           className="hover:text-gray-600">Blog</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgu"            className="hover:text-gray-600">CGU</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
