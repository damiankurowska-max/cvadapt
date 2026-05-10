"use client";
// Skills appliqués : popup-cro · stop-slop
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem("exitPopupLastSeen");
    if (lastSeen && Date.now() - parseInt(lastSeen) < 24 * 60 * 60 * 1000) return;

    const path = window.location.pathname;
    if (path === "/tarifs" || path === "/generate" || path === "/sign-up") return;

    let triggered = false;

    function handleMouseLeave(e) {
      if (triggered) return;
      if (e.clientY <= 5) {
        triggered = true;
        setTimeout(() => setShow(true), 200);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function close() {
    localStorage.setItem("exitPopupLastSeen", Date.now().toString());
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={close}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden"
        style={{ animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header — accroche factuelle, pas émotionnelle */}
        <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)" }}
          className="px-7 pt-6 pb-5 relative">
          <button onClick={close}
            className="absolute top-4 right-4 text-white/50 hover:text-white text-lg leading-none">✕</button>

          {/* Stat choc */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-200 text-xs font-bold">75% des CV sont filtrés avant d'être lus</span>
          </div>

          <h2 className="text-xl font-extrabold text-white mb-1 leading-snug">
            Ton CV passe-t-il les filtres automatiques ?
          </h2>
          <p className="text-blue-200 text-sm">
            Vérifie ton score ATS en 30 secondes — gratuit.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          {/* Ce qu'ils obtiennent concrètement */}
          <div className="space-y-2.5 mb-5">
            {[
              { icon: "🎯", text: "Score ATS sur ton CV actuel" },
              { icon: "🔑", text: "Mots-clés manquants détectés" },
              { icon: "⚡", text: "CV optimisé généré en 30s" },
              { icon: "💳", text: "Aucune carte bancaire" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-base w-5 text-center">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <Link
            href="/analyse"
            onClick={close}
            className="block w-full text-center font-bold py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm shadow-md hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", color: "white" }}
          >
            Analyser mon CV gratuitement →
          </Link>

          <button onClick={close}
            className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-3 py-1 transition-colors">
            Mon CV est déjà optimisé
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.85) translateY(20px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
