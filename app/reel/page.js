"use client";
import { useState, useEffect } from "react";

export default function ReelPage() {
  const [phase, setPhase] = useState(0);
  // phases : 0=intro 1=scan 2=résultat 3=after 4=cta

  useEffect(() => {
    const timings = [2200, 3800, 3200, 2800];
    if (phase >= timings.length) return;
    const t = setTimeout(() => setPhase((p) => p + 1), timings[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#000",
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* ══ PHASE 0 : ACCROCHE ══════════════════════════════════════ */}
      {phase === 0 && <Phase0 />}
      {phase === 1 && <Phase1 />}
      {phase === 2 && <Phase2 />}
      {phase === 3 && <Phase3 />}
      {phase >= 4 && <Phase4 onReplay={() => setPhase(0)} />}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.3); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes scan {
          0%   { top: 0; }
          100% { top: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes grow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes countUp {
          from { opacity: 0.5; }
          to   { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(74,222,128,0.3); }
          50%       { box-shadow: 0 0 60px rgba(74,222,128,0.7); }
        }
      `}</style>
    </div>
  );
}

/* ─── Phase 0 : Accroche ─────────────────────────────────────── */
function Phase0() {
  return (
    <div style={{ textAlign: "center", padding: "0 32px" }}>
      <div style={{
        fontSize: 80, marginBottom: 24,
        animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}>😩</div>
      <p style={{
        color: "#fff", fontSize: 38, fontWeight: 900,
        lineHeight: 1.2, marginBottom: 16,
        animation: "fadeUp 0.5s ease 0.2s both",
      }}>
        3 mois de recherche,<br />
        <span style={{ color: "#f87171" }}>zéro réponse</span>
      </p>
      <p style={{
        color: "#64748b", fontSize: 20,
        animation: "fadeUp 0.5s ease 0.5s both",
      }}>
        Jusqu&apos;à ce que je comprenne pourquoi…
      </p>
    </div>
  );
}

/* ─── Phase 1 : Scan du CV ───────────────────────────────────── */
function Phase1() {
  const [lines, setLines] = useState(0);
  const [found, setFound] = useState([]);

  const ISSUES = [
    { delay: 600,  label: "Mots-clés manquants", color: "#f87171" },
    { delay: 1200, label: "Structure incorrecte", color: "#f87171" },
    { delay: 1900, label: "Score ATS : 24/100",   color: "#fbbf24" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setLines((l) => l < 12 ? l + 1 : l), 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    ISSUES.forEach((issue, i) => {
      const t = setTimeout(() => setFound((f) => [...f, i]), issue.delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 340, padding: "0 20px" }}>
      <p style={{
        color: "#94a3b8", fontSize: 13, fontWeight: 700,
        letterSpacing: 3, textTransform: "uppercase",
        textAlign: "center", marginBottom: 20,
        animation: "fadeIn 0.3s ease",
      }}>
        Analyse IA en cours…
      </p>

      {/* Faux document CV */}
      <div style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 16,
        padding: 20,
        position: "relative",
        overflow: "hidden",
        animation: "fadeIn 0.4s ease",
      }}>
        {/* Ligne de scan */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
          animation: "scan 1.8s ease-in-out infinite",
        }} />

        {/* Header CV fake */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ width: 80, height: 10, background: "#1e293b", borderRadius: 4, marginBottom: 6 }} />
          <div style={{ width: 140, height: 7, background: "#0f2040", borderRadius: 4 }} />
        </div>

        {/* Lignes de texte */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            height: 6, borderRadius: 4, marginBottom: 8,
            background: i < lines ? "#1e293b" : "#0a0f1a",
            width: [90, 75, 85, 60, 95, 70, 80, 65, 88, 72, 78, 50][i] + "%",
            transition: "background 0.2s",
          }} />
        ))}
      </div>

      {/* Erreurs détectées */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {ISSUES.map((issue, i) => (
          found.includes(i) && (
            <div key={i} style={{
              background: "#0f172a",
              border: `1px solid ${issue.color}30`,
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "fadeUp 0.4s ease both",
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ color: issue.color, fontSize: 14, fontWeight: 600 }}>{issue.label}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

/* ─── Phase 2 : Score révélé ──────────────────────────────────── */
function Phase2() {
  return (
    <div style={{ textAlign: "center", padding: "0 32px" }}>
      <p style={{
        color: "#94a3b8", fontSize: 13, fontWeight: 700,
        letterSpacing: 3, textTransform: "uppercase",
        marginBottom: 24, animation: "fadeIn 0.3s ease",
      }}>Résultat de l&apos;analyse</p>

      {/* Gros score rouge */}
      <div style={{
        width: 180, height: 180, borderRadius: "50%",
        border: "6px solid #f87171",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
        animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both, shake 0.5s ease 0.7s both",
      }}>
        <span style={{ color: "#f87171", fontSize: 72, fontWeight: 900, lineHeight: 1 }}>24</span>
        <span style={{ color: "#475569", fontSize: 16 }}>/100</span>
      </div>

      <p style={{
        color: "#f87171", fontSize: 22, fontWeight: 800,
        marginBottom: 12,
        animation: "fadeUp 0.4s ease 0.4s both",
      }}>
        ❌ Invisible pour les recruteurs
      </p>
      <p style={{
        color: "#475569", fontSize: 16,
        animation: "fadeUp 0.4s ease 0.6s both",
      }}>
        Mon CV était rejeté automatiquement
      </p>
    </div>
  );
}

/* ─── Phase 3 : Après optimisation ───────────────────────────── */
function Phase3() {
  const [score, setScore] = useState(24);

  useEffect(() => {
    let n = 24;
    const interval = setInterval(() => {
      n = Math.min(n + 4, 91);
      setScore(n);
      if (n >= 91) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const color = score >= 70 ? "#4ade80" : score >= 40 ? "#fbbf24" : "#f87171";

  return (
    <div style={{ textAlign: "center", padding: "0 32px" }}>
      <p style={{
        color: "#94a3b8", fontSize: 13, fontWeight: 700,
        letterSpacing: 3, textTransform: "uppercase",
        marginBottom: 24, animation: "fadeIn 0.3s ease",
      }}>Après CVAdapt</p>

      <div style={{
        width: 180, height: 180, borderRadius: "50%",
        border: `6px solid ${color}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
        transition: "border-color 0.1s",
        animation: score >= 91 ? "glow 2s ease infinite" : "none",
      }}>
        <span style={{ color, fontSize: 72, fontWeight: 900, lineHeight: 1, transition: "color 0.1s" }}>
          {score}
        </span>
        <span style={{ color: "#475569", fontSize: 16 }}>/100</span>
      </div>

      {score >= 91 ? (
        <p style={{ color: "#4ade80", fontSize: 22, fontWeight: 800, animation: "popIn 0.4s ease" }}>
          ✅ Excellent — Top 5%
        </p>
      ) : (
        <p style={{ color: "#fbbf24", fontSize: 22, fontWeight: 800, animation: "blink 0.6s ease infinite" }}>
          Optimisation en cours…
        </p>
      )}
    </div>
  );
}

/* ─── Phase 4 : Résultat final + CTA ─────────────────────────── */
function Phase4({ onReplay }) {
  return (
    <div style={{ textAlign: "center", padding: "0 28px", width: "100%", maxWidth: 380 }}>
      <div style={{ fontSize: 56, marginBottom: 12, animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        🎉
      </div>

      <p style={{
        color: "#fff", fontSize: 28, fontWeight: 900,
        lineHeight: 1.2, marginBottom: 8,
        animation: "fadeUp 0.4s ease 0.1s both",
      }}>
        Entretien décroché<br />
        <span style={{ color: "#4ade80" }}>la semaine suivante</span>
      </p>

      {/* Avant / Après */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 20,
        margin: "24px 0",
        animation: "fadeUp 0.4s ease 0.3s both",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            border: "4px solid #f87171",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#f87171", fontSize: 28, fontWeight: 900 }}>24</span>
            <span style={{ color: "#475569", fontSize: 11 }}>/100</span>
          </div>
          <p style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>Avant</p>
        </div>

        <div style={{ fontSize: 30, color: "#fff" }}>→</div>

        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            border: "4px solid #4ade80",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            animation: "glow 2s ease infinite",
          }}>
            <span style={{ color: "#4ade80", fontSize: 28, fontWeight: 900 }}>91</span>
            <span style={{ color: "#475569", fontSize: 11 }}>/100</span>
          </div>
          <p style={{ color: "#4ade80", fontSize: 12, marginTop: 8, fontWeight: 700 }}>Après ✓</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        borderRadius: 20, padding: "20px 24px",
        animation: "fadeUp 0.5s ease 0.5s both",
        boxShadow: "0 0 50px rgba(37,99,235,0.5)",
      }}>
        <p style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 4 }}>
          Teste ton CV gratuitement
        </p>
        <p style={{ color: "#93c5fd", fontSize: 15, fontWeight: 600 }}>
          cvadapt.eu/analyse
        </p>
        <p style={{ color: "#3b82f6", fontSize: 13, marginTop: 4 }}>
          Sans inscription · Résultat en 30 sec
        </p>
      </div>

      <button
        onClick={onReplay}
        style={{
          marginTop: 20, background: "transparent",
          border: "1px solid #1e293b", borderRadius: 10,
          color: "#475569", padding: "8px 20px",
          fontSize: 13, cursor: "pointer",
        }}
      >
        🔄 Rejouer
      </button>
    </div>
  );
}
