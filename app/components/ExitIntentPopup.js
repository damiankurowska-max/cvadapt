"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Ne pas afficher si déjà vu dans les 24h
    const lastSeen = localStorage.getItem("exitPopupLastSeen");
    if (lastSeen && Date.now() - parseInt(lastSeen) < 24 * 60 * 60 * 1000) return;

    // Ne pas afficher sur /tarifs ou /generate (déjà en conversion)
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

    // Délai avant activation (évite le trigger immédiat)
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
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-7 pt-7 pb-5 text-center relative">
          <button onClick={close} className="absolute top-4 right-4 text-white/60 hover:text-white text-lg">✕</button>
          <div className="text-4xl mb-2">✋</div>
          <h2 className="text-xl font-extrabold text-white mb-1">Attends ! Avant de partir…</h2>
          <p className="text-blue-100 text-sm">Essaie CVAdapt gratuitement — 3 CV sans carte bancaire.</p>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          <div className="space-y-2 mb-5">
            {[
              "CV adapté à l'offre en 30 secondes",
              "Score ATS et mots-clés manquants",
              "Lettre de motivation incluse",
              "Gratuit, sans carte bancaire",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-600 font-bold">✓</span> {f}
              </div>
            ))}
          </div>

          <Link
            href="/generate"
            onClick={close}
            className="block w-full bg-blue-600 text-white text-center font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-colors"
          >
            Essayer gratuitement →
          </Link>

          <button onClick={close} className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3">
            Non merci, je pars sans essayer
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
