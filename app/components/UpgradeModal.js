"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function UpgradeModal({ onClose }) {
  // Bloquer le scroll quand la modal est ouverte
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bleu */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 pt-8 pb-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-xl font-light"
          >
            ✕
          </button>
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Tu as utilisé tes 3 CV gratuits !
          </h2>
          <p className="text-blue-100 text-sm">
            Tu postules activement — continue sans limite.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { val: "3×", label: "plus de rappels" },
              { val: "30s", label: "par candidature" },
              { val: "4,99€", label: "par mois" },
            ].map((s, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-blue-600">{s.val}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {[
              "15 CV adaptés par mois",
              "Score ATS complet à chaque génération",
              "Lettre de motivation incluse",
              "Annulation en 1 clic",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/tarifs"
            className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors text-base"
          >
            Continuer — 4,99€/mois →
          </Link>

          <p className="text-center text-xs text-gray-400 mt-3">
            Sans engagement · Paiement sécurisé Stripe
          </p>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-2 py-1"
          >
            Non merci, je reste sur le plan gratuit
          </button>
        </div>
      </div>
    </div>
  );
}
