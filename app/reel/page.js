"use client";
import { useState, useEffect } from "react";

export default function ReelPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(31);
  const [displayScore, setDisplayScore] = useState(31);
  const [started, setStarted] = useState(false);

  // Animation du score 31 → 89
  useEffect(() => {
    if (step !== 3) return;
    let current = 31;
    const interval = setInterval(() => {
      current += 2;
      if (current >= 89) {
        setDisplayScore(89);
        clearInterval(interval);
        setTimeout(() => setStep(4), 600);
      } else {
        setDisplayScore(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [step]);

  function handleStart() {
    setStarted(true);
    // Étape 1 : intro
    setTimeout(() => setStep(1), 500);
    // Étape 2 : analyse en cours
    setTimeout(() => setStep(2), 2500);
    // Étape 3 : mauvais score
    setTimeout(() => setStep(3), 4500);
  }

  const scoreColor = displayScore >= 70 ? "#16a34a" : displayScore >= 40 ? "#d97706" : "#dc2626";
  const scoreLabel = displayScore >= 70 ? "Excellent 🎉" : displayScore >= 40 ? "Moyen" : "Trop faible ❌";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fond animé */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── ÉTAPE 0 : Écran de démarrage ── */}
      {step === 0 && (
        <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <p style={{ color: "#94a3b8", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            CVAdapt · Analyse ATS
          </p>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, lineHeight: 1.3, marginBottom: 12, maxWidth: 320 }}>
            Mon CV était rejeté sans que personne le lise
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 40, maxWidth: 280 }}>
            Jusqu&apos;à ce que je découvre mon score ATS...
          </p>
          {!started && (
            <button
              onClick={handleStart}
              style={{
                background: "#2563eb", color: "#fff",
                border: "none", borderRadius: 14,
                padding: "14px 32px", fontSize: 16,
                fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 30px rgba(37,99,235,0.4)",
              }}
            >
              ▶ Lancer l&apos;analyse
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 1 : Chargement de l'offre ── */}
      {step === 1 && (
        <div style={{ width: "100%", maxWidth: 360, animation: "fadeIn 0.4s ease" }}>
          <p style={{ color: "#94a3b8", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>
            Offre détectée
          </p>
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #334155" }}>
            <p style={{ color: "#64748b", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Offre d&apos;emploi</p>
            <p style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Chef de projet digital</p>
            <p style={{ color: "#64748b", fontSize: 13 }}>Capgemini · Paris · CDI</p>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 20, border: "1px solid #334155" }}>
            <p style={{ color: "#64748b", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Ton CV</p>
            <p style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Thomas Dupont</p>
            <p style={{ color: "#64748b", fontSize: 13 }}>Alternant Licence Pro</p>
          </div>
        </div>
      )}

      {/* ── ÉTAPE 2 : Analyse en cours ── */}
      {step === 2 && (
        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "4px solid #1e293b",
            borderTop: "4px solid #2563eb",
            margin: "0 auto 24px",
            animation: "spin 0.8s linear infinite",
          }} />
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Analyse en cours...
          </p>
          <p style={{ color: "#64748b", fontSize: 14 }}>Comparaison CV vs offre · Mots-clés · Structure</p>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10, width: 280 }}>
            {[
              { label: "Mots-clés ATS", done: true },
              { label: "Structure du CV", done: true },
              { label: "Lisibilité", done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: item.done ? "#2563eb" : "#1e293b",
                  border: item.done ? "none" : "2px solid #334155",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#fff",
                }}>
                  {item.done ? "✓" : ""}
                </div>
                <span style={{ color: item.done ? "#e2e8f0" : "#475569", fontSize: 14 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ÉTAPE 3 : Score avant ── */}
      {step === 3 && (
        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease" }}>
          <p style={{ color: "#94a3b8", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>
            Résultat de l&apos;analyse
          </p>

          {/* Cercle score */}
          <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px" }}>
            <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="12" />
              <circle
                cx="80" cy="80" r="70" fill="none"
                stroke={scoreColor}
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - displayScore / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.3s" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: scoreColor, fontSize: 42, fontWeight: 900, lineHeight: 1 }}>
                {displayScore}
              </span>
              <span style={{ color: "#64748b", fontSize: 13 }}>/100</span>
            </div>
          </div>

          <p style={{ color: scoreColor, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{scoreLabel}</p>

          {displayScore < 70 && (
            <div style={{ background: "#1e293b", borderRadius: 14, padding: 16, maxWidth: 300, margin: "16px auto 0", border: "1px solid #334155" }}>
              <p style={{ color: "#f87171", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>❌ Mots-clés manquants détectés :</p>
              {["Agile / Scrum", "KPI & reporting", "Gestion de planning"].map((kw, i) => (
                <div key={i} style={{
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 8, padding: "6px 10px", marginBottom: 6,
                  color: "#fca5a5", fontSize: 12,
                }}>
                  {kw}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ÉTAPE 4 : Score après optimisation ── */}
      {step === 4 && (
        <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <div style={{
            background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)",
            borderRadius: 12, padding: "8px 20px", marginBottom: 24, display: "inline-block",
          }}>
            <p style={{ color: "#4ade80", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
              ✓ CV optimisé par IA
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 24 }}>
            {/* Avant */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "rgba(220,38,38,0.1)", border: "2px solid #dc2626",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#ef4444", fontSize: 28, fontWeight: 900 }}>31</span>
                <span style={{ color: "#64748b", fontSize: 11 }}>/100</span>
              </div>
              <p style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>Avant</p>
            </div>

            {/* Flèche */}
            <div style={{ fontSize: 28 }}>→</div>

            {/* Après */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "rgba(22,163,74,0.15)", border: "2px solid #16a34a",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 30px rgba(22,163,74,0.3)",
              }}>
                <span style={{ color: "#4ade80", fontSize: 28, fontWeight: 900 }}>89</span>
                <span style={{ color: "#64748b", fontSize: 11 }}>/100</span>
              </div>
              <p style={{ color: "#4ade80", fontSize: 12, marginTop: 8, fontWeight: 700 }}>Après ✓</p>
            </div>
          </div>

          <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 8, maxWidth: 300 }}>
            +58 points en 30 secondes
          </p>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>
            Entretien décroché la semaine suivante.
          </p>

          <div style={{
            background: "#2563eb", borderRadius: 14,
            padding: "14px 28px", display: "inline-block",
            boxShadow: "0 0 40px rgba(37,99,235,0.5)",
          }}>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 2 }}>
              Teste ton CV gratuitement
            </p>
            <p style={{ color: "#93c5fd", fontSize: 13 }}>cvadapt.eu/analyse · Sans inscription</p>
          </div>

          <p style={{ color: "#334155", fontSize: 13, marginTop: 32 }}>
            Rejoue depuis le début ↓
          </p>
          <button
            onClick={() => { setStep(0); setDisplayScore(31); setStarted(false); }}
            style={{
              background: "transparent", border: "1px solid #334155",
              borderRadius: 10, color: "#64748b", padding: "8px 20px",
              fontSize: 13, cursor: "pointer", marginTop: 8,
            }}
          >
            🔄 Recommencer
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
