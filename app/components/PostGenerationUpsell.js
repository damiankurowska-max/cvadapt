"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * PostGenerationUpsell — Modal "Pack candidature" affiché après la génération du 1er CV
 * Se ferme après 1 affichage par session. Ne s'affiche pas pour les utilisateurs Pro.
 */
export default function PostGenerationUpsell({ show, onClose, isPro }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show && !isPro) {
      // Délai court pour laisser le CV s'afficher d'abord
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, [show, isPro]);

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec score animé */}
        <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)" }}
          className="px-7 pt-6 pb-5 relative">
          <button onClick={handleClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white text-lg">✕</button>

          <div className="flex items-center gap-4 mb-3">
            <div className="bg-white/15 rounded-2xl px-4 py-2 text-center">
              <p className="text-white/70 text-xs font-semibold mb-0.5">Ton CV</p>
              <p className="text-white font-extrabold text-xl leading-none">✅ Prêt</p>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                Ton CV est optimisé 🎉
              </p>
              <p className="text-blue-200 text-sm">
                Maintenant, envoie-le avec une lettre parfaite.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Les candidats qui envoient <strong>CV + lettre de motivation adaptée</strong> ont{" "}
            <strong className="text-blue-600">2× plus de chances d'obtenir un entretien</strong>.
          </p>

          {/* Features du plan */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">Plan Étudiant — 4,99€/mois</p>
            <div className="space-y-2">
              {[
                { icon: "📝", text: "Lettre de motivation adaptée à l'offre" },
                { icon: "🎯", text: "15 CV optimisés par mois" },
                { icon: "📊", text: "Score ATS complet + recommandations" },
                { icon: "🔓", text: "Annulation en 1 clic, sans engagement" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/tarifs"
            onClick={handleClose}
            className="block w-full text-center bg-blue-600 text-white font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-colors text-sm shadow-md"
          >
            Ajouter la lettre de motivation — 4,99€/mois →
          </Link>

          <button onClick={handleClose}
            className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-3 py-1 transition-colors">
            Non merci, je télécharge juste le CV
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
