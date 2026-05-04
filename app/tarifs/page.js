"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

export default function Tarifs() {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  async function handleCheckout(plan) {
    setLoading(plan);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Erreur lors du paiement, réessaie.");
        setLoading("");
      }
    } catch {
      setError("Connexion impossible, vérifie ta connexion.");
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
        <Link href="/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Essayer gratuitement
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tarifs</span>
        </div>
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Simple et transparent</h1>
        </div>
        <p className="text-center text-gray-500 mb-3">Sans engagement · Annule quand tu veux · Paiement sécurisé</p>

        {error && (
          <p className="text-red-500 text-sm mb-8 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center max-w-md mx-auto">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-12">

          {/* Gratuit */}
          <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Gratuit</p>
            <div className="flex items-end gap-1 mb-1">
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

          {/* Essentiel */}
          <div className="rounded-2xl p-8 flex flex-col relative bg-gray-900 shadow-xl ring-1 ring-gray-800 md:-mt-4 md:-mb-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide whitespace-nowrap">
              LE PLUS POPULAIRE
            </div>
            <div className="text-4xl mb-4">⚡</div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Essentiel</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-white">7,99€</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">par mois</p>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "10 CV par mois",
                "4 templates visuels",
                "Lettre de motivation incluse",
                "Téléchargement PDF",
                "CV optimisés par IA",
                "Conseils personnalisés",
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("essentiel")}
              disabled={loading === "essentiel"}
              className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm disabled:opacity-50"
            >
              {loading === "essentiel" ? "Chargement..." : "Choisir Essentiel →"}
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-gray-900">14,99€</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">par mois</p>
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
              onClick={() => handleCheckout("pro")}
              disabled={loading === "pro"}
              className="block w-full text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm disabled:opacity-50"
            >
              {loading === "pro" ? "Chargement..." : "Choisir Pro →"}
            </button>
          </div>
        </div>

        {/* Garantie */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">🔒 Paiement 100% sécurisé par Stripe · Annulation en 1 clic · Aucun engagement</p>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Puis-je annuler à tout moment ?", r: "Oui, sans condition. Tu peux annuler depuis ton espace Stripe à tout moment, l'accès reste actif jusqu'à la fin de la période payée." },
              { q: "Qu'est-ce que les Conseils personnalisés ?", r: "Des guides et astuces pour améliorer ton CV selon ton secteur, ton niveau d'expérience et le type de poste visé — accessibles depuis ton espace." },
              { q: "La lettre de motivation est-elle incluse ?", r: "Oui, dans les plans Essentiel et Pro. Elle est générée automatiquement en même temps que ton CV, adaptée à l'offre d'emploi." },
              { q: "Les CV générés m'appartiennent ?", r: "Oui, à 100%. Tu peux télécharger, modifier et utiliser tes CV comme tu le souhaites, sans restriction." },
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
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-gray-600">CGU</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
