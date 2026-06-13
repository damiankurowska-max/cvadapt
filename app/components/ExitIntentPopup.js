"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(34);

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

  // Anime le score 34 → 91 quand le popup s'ouvre
  useEffect(() => {
    if (!show) return;
    setScore(34);
    let current = 34;
    const step = () => {
      current += 2;
      if (current >= 91) { setScore(91); return; }
      setScore(current);
      setTimeout(step, 28);
    };
    setTimeout(step, 400);
  }, [show]);

  function close() {
    localStorage.setItem("exitPopupLastSeen", Date.now().toString());
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(10,15,30,0.7)", backdropFilter: "blur(8px)" }}
      onClick={close}
    >
      <div
        style={{ background: "#fff", borderRadius: 24, maxWidth: 420, width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.1)", overflow: "hidden", animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top : score transformation */}
        <div style={{ padding: "32px 32px 24px", textAlign: "center", borderBottom: "1px solid #F1F5F9", position: "relative" }}>
          <button onClick={close} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", cursor: "pointer", fontSize: 16, color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

          {/* Badge urgence */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
            75% des CV ne passent jamais le filtre
          </div>

          {/* Transformation visuelle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            {/* Avant */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", marginBottom: 6, letterSpacing: "0.05em" }}>TON CV</div>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FEF2F2", border: "4px solid #FCA5A5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#EF4444", lineHeight: 1 }}>34</span>
                <span style={{ fontSize: 9, color: "#FCA5A5" }}>/100</span>
              </div>
            </div>

            {/* Flèche + chrono */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 8px", borderRadius: 99 }}>⚡ 30s</div>
              <div style={{ fontSize: 22, color: "#CBD5E1" }}>→</div>
            </div>

            {/* Après */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginBottom: 6, letterSpacing: "0.05em" }}>AVEC CVADAPT</div>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ECFDF5", border: "4px solid #6EE7B7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(16,185,129,0.2)" }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#10B981", lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 9, color: "#6EE7B7" }}>/100</span>
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>
            Ton CV passe-t-il les filtres ?
          </h2>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5 }}>
            Analyse gratuite en 30 secondes — sans inscription.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 28px" }}>
          {/* Mini témoignage */}
          <div style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#2563EB", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>A</div>
            <div>
              <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.5, marginBottom: 4 }}>
                "Score passé de <strong style={{ color: "#EF4444" }}>34</strong> à <strong style={{ color: "#10B981" }}>91</strong> en un clic. Rappelé en 5 jours."
              </p>
              <p style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>Antoine P. · Data Analyst, Paris</p>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            {[
              ["✓", "Score ATS de ton CV actuel", "#10B981"],
              ["✓", "Mots-clés manquants identifiés", "#10B981"],
              ["✓", "CV optimisé généré en 30s", "#10B981"],
              ["✓", "Sans carte bancaire", "#10B981"],
            ].map(([icon, text, color], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#334155" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color, flexShrink: 0 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          <Link
            href="/analyse"
            onClick={close}
            style={{ display: "block", width: "100%", textAlign: "center", padding: "15px", background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#fff", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35)", letterSpacing: "-0.2px" }}
          >
            Analyser mon CV gratuitement →
          </Link>

          <button onClick={close}
            style={{ display: "block", width: "100%", textAlign: "center", padding: "10px", marginTop: 10, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#CBD5E1" }}>
            Non merci, mon CV est déjà parfait
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.88) translateY(24px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
