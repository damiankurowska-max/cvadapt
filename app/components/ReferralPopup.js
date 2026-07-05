"use client";
import { useState } from "react";

export default function ReferralPopup({ show, onClose, userId }) {
  const [copied, setCopied] = useState(false);

  if (!show || !userId) return null;

  // Code de parrainage = 8 premiers chars du userId Clerk
  const refCode = userId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toLowerCase();
  const refLink = `https://cvadapt.eu/generate?ref=${refCode}`;

  function copyLink() {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}
          className="px-7 pt-7 pb-6 relative text-center">
          <button onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white text-lg">✕</button>
          <div className="text-4xl mb-3">🎁</div>
          <h2 className="text-xl font-extrabold text-white mb-1">
            +2 CV gratuits pour toi
          </h2>
          <p className="text-blue-200 text-sm">
            Partage CVAdapt à un ami → vous gagnez chacun 2 CV supplémentaires
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {/* Steps */}
          <div className="space-y-3 mb-6">
            {[
              { n: "1", t: "Copie ton lien personnel ci-dessous" },
              { n: "2", t: "Envoie-le à un ami qui cherche un emploi/stage" },
              { n: "3", t: "Il s'inscrit → vous gagnez chacun 2 CV gratuits" },
            ].map(s => (
              <div key={s.n} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {s.n}
                </span>
                {s.t}
              </div>
            ))}
          </div>

          {/* Lien copiable */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4 flex items-center gap-2">
            <span className="text-xs text-gray-500 flex-1 truncate font-mono">{refLink}</span>
            <button
              onClick={copyLink}
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: copied ? "#dcfce7" : "#dbeafe", color: copied ? "#16a34a" : "#1d4ed8" }}
            >
              {copied ? "✓ Copié !" : "Copier"}
            </button>
          </div>

          {/* Share native */}
          {typeof navigator !== "undefined" && navigator.share && (
            <button
              onClick={() => navigator.share({ title: "CVAdapt — CV ATS en 30s", url: refLink, text: "J'utilise CVAdapt pour optimiser mes CV, essaie !" })}
              className="w-full text-center bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 transition-colors text-sm mb-3"
            >
              📤 Partager directement →
            </button>
          )}

          <button onClick={onClose}
            className="w-full text-center text-xs text-gray-300 hover:text-gray-500 py-1 transition-colors">
            Pas maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
