"use client";
// Skills appliqués : paywall-upgrade-cro · stop-slop · ui-ux-pro-max
import { useEffect } from "react";
import Link from "next/link";

export default function UpgradeModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header — valeur d'abord, pas limite */}
        <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)" }}
          className="px-8 pt-7 pb-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white text-lg font-light leading-none"
            aria-label="Fermer"
          >✕</button>

          {/* Social proof en haut */}
          <div className="bg-white/15 rounded-xl px-4 py-2 mb-5 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {["#f59e0b", "#10b981", "#6366f1"].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white/30"
                  style={{ background: c }} />
              ))}
            </div>
            <p className="text-white/90 text-xs font-medium">
              <span className="font-bold text-white">2 341 étudiants</span> ont upgradé ce mois
            </p>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-2 leading-tight">
            Tes 3 CV gratuits ont servi.<br />
            <span className="text-blue-200">Tu postules — continue.</span>
          </h2>
          <p className="text-blue-100 text-sm">
            Score ATS complet + lettre de motivation à chaque CV.
          </p>
        </div>

        {/* Preview — ce qu'ils ratent concrètement */}
        <div className="px-8 pt-5 pb-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Ce que Pro débloque sur ton prochain CV
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 shrink-0">
                <svg viewBox="0 0 100 100" width="48" height="48">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="12"
                    strokeDasharray={`${(91 / 100) * 239} 239`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs font-extrabold text-green-600 leading-none">91</span>
                  <span className="text-[7px] text-gray-400">/100</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Score ATS · Excellent</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Tous les mots-clés de l'offre intégrés</p>
                <span className="inline-block mt-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  +57 points vs ton CV actuel
                </span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[11px] font-semibold text-gray-500 mb-2">Lettre de motivation générée</p>
              <div className="bg-white rounded-xl border border-gray-200 px-3 py-2">
                <div className="space-y-1.5">
                  {["Madame, Monsieur,", "Fort de mes expériences en…", "Je reste à votre disposition…"].map((l, i) => (
                    <div key={i} className="h-2 rounded-full bg-gray-100"
                      style={{ width: i === 0 ? "40%" : i === 1 ? "85%" : "60%" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="px-8 mb-5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "3×", label: "plus de rappels" },
              { val: "30s", label: "par candidature" },
              { val: "4,99€", label: "/mois seulement" },
            ].map((s, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-2.5 text-center">
                <p className="text-lg font-extrabold text-blue-600">{s.val}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 pb-6">
          <Link
            href="/tarifs"
            className="block w-full text-center font-bold py-4 rounded-2xl transition-all text-base shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", color: "white" }}
          >
            Débloquer le score ATS complet — 4,99€/mois
          </Link>
          <p className="text-center text-xs text-gray-400 mt-2.5">
            Sans engagement · Annulation en 1 clic · Stripe
          </p>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-2 py-1 transition-colors"
          >
            Rester sur le plan gratuit
          </button>
        </div>
      </div>
    </div>
  );
}
