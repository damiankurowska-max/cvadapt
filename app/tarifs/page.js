"use client";
import Link from "next/link";
import { useState } from "react";

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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">CVAdapt</Link>
        <Link href="/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Essayer gratuitement
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choisis ton plan</h1>
        <p className="text-xl text-gray-500 mb-4">Sans engagement. Annule quand tu veux.</p>
        {error && (
          <p className="text-red-500 text-sm mb-8 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Gratuit */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Gratuit</h2>
            <p className="text-gray-500 text-sm mb-4">Pour essayer</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">0€</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> 3 CV au total
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Téléchargement PDF
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>✗</span> CV illimités
              </li>
            </ul>
            <Link href="/generate" className="block text-center border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50">
              Commencer
            </Link>
          </div>

          {/* Essentiel */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 text-left relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              LE PLUS POPULAIRE
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Essentiel</h2>
            <p className="text-gray-500 text-sm mb-4">Pour ta recherche d'emploi</p>
            <div className="text-4xl font-bold text-gray-900 mb-1">4,99€</div>
            <p className="text-gray-400 text-sm mb-6">par mois</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> 10 CV par mois
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Téléchargement PDF
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> CV optimisés IA
              </li>
            </ul>
            <button
              onClick={() => handleCheckout("essentiel")}
              disabled={loading === "essentiel"}
              className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {loading === "essentiel" ? "Chargement..." : "Choisir Essentiel"}
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Pro</h2>
            <p className="text-gray-500 text-sm mb-4">Pour les pros</p>
            <div className="text-4xl font-bold text-gray-900 mb-1">9,99€</div>
            <p className="text-gray-400 text-sm mb-6">par mois</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> CV illimités
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Téléchargement PDF
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> CV optimisés IA
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Support prioritaire
              </li>
            </ul>
            <button
              onClick={() => handleCheckout("pro")}
              disabled={loading === "pro"}
              className="block w-full text-center border border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 disabled:opacity-50"
            >
              {loading === "pro" ? "Chargement..." : "Choisir Pro"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
