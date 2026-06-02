"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

// ── Animated score counter hook ──────────────────────────────────────────────
function useCountUp(target, duration = 1400, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime = null;
    const tick = (now) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(target * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, start, duration]);
  return val;
}

// ── Score color helper ────────────────────────────────────────────────────────
function scoreColor(s) {
  if (s >= 75) return { stroke: "#22c55e", bg: "rgba(34,197,94,.12)", text: "#16a34a", label: "Excellent" };
  if (s >= 50) return { stroke: "#f59e0b", bg: "rgba(245,158,11,.12)", text: "#d97706", label: "Bon" };
  return { stroke: "#ef4444", bg: "rgba(239,68,68,.12)", text: "#dc2626", label: "À améliorer" };
}

export default function Analyse() {
  const [form, setForm] = useState({ offre: "", nom: "", experience: "", competences: "", formation: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const resultRef = useRef(null);

  const displayScore = useCountUp(result?.score ?? 0, 1600, animate);
  const colors = result ? scoreColor(result.score) : scoreColor(0);
  const circumference = 2 * Math.PI * 42;
  const dash = result ? circumference * (displayScore / 100) : 0;

  useEffect(() => {
    if (result) {
      setTimeout(() => setAnimate(true), 100);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [result]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setAnimate(false);
    try {
      const res = await fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) setError(data.error || "Erreur lors de l'analyse");
      else setResult(data);
    } catch {
      setError("Une erreur est survenue, réessaie.");
    }
    setLoading(false);
  }

  function goGenerate() {
    try { localStorage.setItem("cvadapt_analyse_data", JSON.stringify(form)); } catch {}
    window.location.href = "/generate";
  }

  return (
    <main style={{ minHeight: "100vh", background: "#060d1f", fontFamily: "var(--font-outfit, Outfit, system-ui, sans-serif)" }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(.88); } to { opacity:1; transform:scale(1); } }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse    { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes spin     { to { stroke-dashoffset: 0; } }
        @keyframes drawCircle { from { stroke-dashoffset: 264; } to { stroke-dashoffset: 0; } }

        .ats-reveal { opacity:0; transform:translateY(24px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
        .ats-visible { opacity:1 !important; transform:none !important; }

        .ats-input {
          width: 100%; background: rgba(255,255,255,.04); border: 1.5px solid rgba(255,255,255,.08);
          border-radius: 14px; padding: 12px 16px; color: #fff; font-size: 14px;
          outline: none; resize: none; transition: border-color .2s, background .2s;
          font-family: inherit;
        }
        .ats-input::placeholder { color: rgba(255,255,255,.25); }
        .ats-input:focus { border-color: #3b82f6; background: rgba(59,130,246,.06); }

        .ats-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 8px; display: block; }

        .ats-card {
          background: rgba(255,255,255,.04); border: 1.5px solid rgba(255,255,255,.08);
          border-radius: 20px; padding: 24px; backdrop-filter: blur(12px);
          transition: border-color .25s, transform .25s;
        }
        .ats-card:hover { border-color: rgba(59,130,246,.3); }

        .ats-btn-primary {
          display: block; width: 100%; background: linear-gradient(135deg,#1d4ed8,#2563eb);
          color: #fff; font-weight: 800; font-size: 16px; padding: 18px 32px;
          border-radius: 999px; border: none; cursor: pointer;
          box-shadow: 0 12px 40px rgba(37,99,235,.45);
          transition: transform .2s, box-shadow .2s; font-family: inherit;
        }
        .ats-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 50px rgba(37,99,235,.55); }
        .ats-btn-primary:disabled { opacity: .6; cursor: not-allowed; }

        .ats-keyword-found { display:inline-flex; align-items:center; gap:5px; background:rgba(34,197,94,.12); color:#4ade80; border:1px solid rgba(34,197,94,.2); font-size:12px; font-weight:700; padding:5px 12px; border-radius:999px; }
        .ats-keyword-miss  { display:inline-flex; align-items:center; gap:5px; background:rgba(239,68,68,.1); color:#f87171; border:1px solid rgba(239,68,68,.2); font-size:12px; font-weight:700; padding:5px 12px; border-radius:999px; }

        .score-ring-track { fill:none; stroke:rgba(255,255,255,.06); stroke-width:8; }
        .score-ring-fill  { fill:none; stroke-width:8; stroke-linecap:round; transform-origin:center; transition: stroke-dashoffset .05s linear; }

        .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }

        @media (max-width: 768px) {
          .ats-grid { grid-template-columns: 1fr !important; }
          .ats-result-flex { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ padding: "20px 24px", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={28} />
          <span style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>CVAdapt</span>
        </Link>
        <a href="/generate" style={{
          fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none",
          background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
          padding: "9px 20px", borderRadius: 999, backdropFilter: "blur(8px)",
          transition: "background .2s",
        }}>
          Générer mon CV →
        </a>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: 40, paddingBottom: 60, textAlign: "center" }}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(99,102,241,.15)", top: -200, left: "50%", transform: "translateX(-50%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.25)",
            color: "#93c5fd", fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 999,
            marginBottom: 24, animation: "fadeUp .6s both",
          }}>
            🎯 <span>Analyse ATS gratuite · Sans inscription</span>
          </div>

          <h1 style={{
            fontSize: "clamp(34px,5vw,58px)", fontWeight: 900, color: "#fff",
            letterSpacing: "-2px", lineHeight: 1.06, marginBottom: 18,
            animation: "fadeUp .6s .08s both",
          }}>
            Ton CV passe-t-il<br />
            <span style={{
              background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>les filtres ATS ?</span>
          </h1>

          <p style={{
            fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 48,
            animation: "fadeUp .6s .16s both",
          }}>
            Colle ton offre et ton profil — reçois ton score en 30 secondes.<br />
            Gratuit, sans compte requis.
          </p>

          {/* Steps */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 0,
            animation: "fadeUp .6s .24s both",
          }}>
            {[["1","Colle l'offre"],["2","Entre ton profil"],["3","Score instantané"]].map(([n, label], i) => (
              <div key={n} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, color: "#fff",
                    boxShadow: "0 4px 14px rgba(37,99,235,.4)",
                  }}>{n}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.65)" }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: 32, height: 1, background: "rgba(255,255,255,.1)", margin: "0 12px" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      {!result && (
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 80px", animation: "fadeUp .7s .3s both" }}>
          <form onSubmit={handleSubmit}>
            <div className="ats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

              {/* LEFT — Offre */}
              <div className="ats-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>1</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>L'offre d'emploi</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>Copie-colle depuis LinkedIn, Indeed…</div>
                  </div>
                </div>
                <textarea
                  className="ats-input"
                  name="offre"
                  value={form.offre}
                  onChange={handleChange}
                  required
                  rows={14}
                  placeholder={"Développeur React H/F\n\nNous recherchons un développeur React expérimenté…\n\nCompétences requises :\n- React, TypeScript\n- Node.js, Docker, AWS"}
                />
              </div>

              {/* RIGHT — Profil */}
              <div className="ats-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6d28d9,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>2</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Ton profil</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>Tes infos pour l'analyse</div>
                  </div>
                </div>

                {[
                  { name: "nom", label: "Nom complet", placeholder: "Sophie Martin", type: "input" },
                  { name: "experience", label: "Expérience", placeholder: "2 ans chez Accenture en tant que développeur React…", type: "textarea", rows: 3 },
                  { name: "competences", label: "Compétences", placeholder: "React, JavaScript, Node.js, SQL, Git…", type: "input" },
                  { name: "formation", label: "Formation", placeholder: "Licence Informatique, École d'ingénieur…", type: "input" },
                ].map(({ name, label, placeholder, type, rows }) => (
                  <div key={name}>
                    <label className="ats-label">{label}</label>
                    {type === "textarea" ? (
                      <textarea className="ats-input" name={name} value={form[name]} onChange={handleChange} required rows={rows} placeholder={placeholder} />
                    ) : (
                      <input className="ats-input" type="text" name={name} value={form[name]} onChange={handleChange} required placeholder={placeholder} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 14, padding: "14px 20px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>
                {error}
              </div>
            )}

            <button type="submit" className="ats-btn-primary" disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.25)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Analyse ATS en cours…
                </span>
              ) : "🎯 Analyser mon CV gratuitement →"}
            </button>

            <p style={{ textAlign: "center", color: "rgba(255,255,255,.25)", fontSize: 13, marginTop: 16 }}>
              ✓ Gratuit · ✓ Sans inscription · ✓ Résultat en 30 secondes
            </p>
          </form>
        </section>
      )}

      {/* ── RESULTS ── */}
      {result && (
        <section ref={resultRef} style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>

          {/* Score hero card */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: `linear-gradient(135deg, rgba(15,36,96,.9) 0%, rgba(29,78,216,.6) 100%)`,
            border: "1.5px solid rgba(59,130,246,.3)",
            borderRadius: 28, padding: "40px 40px", marginBottom: 20,
            animation: "scaleIn .6s cubic-bezier(.16,1,.3,1) both",
          }}>
            <div className="orb" style={{ width: 400, height: 400, background: `${colors.bg}`, top: -150, right: -100 }} />

            <div className="ats-result-flex" style={{ display: "flex", alignItems: "center", gap: 48, position: "relative", zIndex: 1 }}>

              {/* 3D Score gauge */}
              <div style={{
                flexShrink: 0, position: "relative",
                animation: "float 4s ease-in-out infinite",
                filter: `drop-shadow(0 20px 40px ${colors.stroke}44)`,
              }}>
                <svg width="160" height="160" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  {/* Background rings for 3D depth */}
                  <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,.02)" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.03)" strokeWidth="1"/>
                  {/* Track */}
                  <circle className="score-ring-track" cx="50" cy="50" r="42" />
                  {/* Fill */}
                  <circle
                    className="score-ring-fill"
                    cx="50" cy="50" r="42"
                    stroke={colors.stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - dash}
                    style={{ filter: `drop-shadow(0 0 8px ${colors.stroke})` }}
                  />
                </svg>
                {/* Center number */}
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{displayScore}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>/100</span>
                </div>
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: colors.bg, border: `1px solid ${colors.stroke}44`,
                  color: colors.stroke, fontSize: 12, fontWeight: 800,
                  padding: "5px 14px", borderRadius: 999, marginBottom: 14,
                  animation: "fadeIn .5s .4s both",
                }}>
                  {colors.label}
                </div>

                <h2 style={{
                  fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, color: "#fff",
                  letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 12,
                  animation: "fadeUp .5s .3s both",
                }}>
                  {result.score >= 75
                    ? "Excellent ! Ton profil correspond bien à cette offre."
                    : result.score >= 50
                    ? "Bon début — quelques ajustements pour décrocher l'entretien."
                    : "Ton CV nécessite des optimisations importantes."}
                </h2>

                <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 24, animation: "fadeUp .5s .4s both" }}>
                  {result.score >= 75
                    ? "Tu as de bonnes chances de passer les filtres automatiques. Génère ton CV pour maximiser tes chances."
                    : "CVAdapt peut intégrer automatiquement les mots-clés manquants et booster ton score."}
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp .5s .5s both" }}>
                  <button onClick={goGenerate} className="ats-btn-primary" style={{ width: "auto", padding: "13px 28px", fontSize: 14 }}>
                    Générer mon CV optimisé →
                  </button>
                  <button
                    onClick={() => { setResult(null); setError(""); setAnimate(false); }}
                    style={{
                      background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.1)",
                      color: "rgba(255,255,255,.7)", fontWeight: 700, fontSize: 14,
                      padding: "13px 24px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
                      transition: "background .2s",
                    }}
                  >
                    ← Nouvelle analyse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords grid */}
          <div className="ats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

            {/* Found */}
            <div className="ats-card" style={{ animation: "fadeUp .5s .2s both" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(34,197,94,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✓</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>Mots-clés présents</span>
                </div>
                <span style={{ background: "rgba(34,197,94,.15)", color: "#4ade80", fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>
                  {result.keywords_found?.length}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {result.keywords_found?.map((kw, i) => (
                  <span key={i} className="ats-keyword-found" style={{ animationDelay: `${.1 + i * .05}s` }}>✓ {kw}</span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="ats-card" style={{ animation: "fadeUp .5s .3s both" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✗</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#f87171" }}>Mots-clés manquants</span>
                </div>
                <span style={{ background: "rgba(239,68,68,.15)", color: "#f87171", fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>
                  {result.keywords_missing?.length}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {result.keywords_missing?.map((kw, i) => (
                  <span key={i} className="ats-keyword-miss">✗ {kw}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths + Recommendations */}
          <div className="ats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>

            {/* Strengths */}
            <div className="ats-card" style={{ animation: "fadeUp .5s .4s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 18 }}>💪</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#93c5fd" }}>Points forts</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.strengths?.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    background: "rgba(59,130,246,.06)", borderRadius: 12, padding: "10px 14px",
                  }}>
                    <span style={{ color: "#3b82f6", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ color: "rgba(255,255,255,.75)", fontSize: 13, lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="ats-card" style={{ animation: "fadeUp .5s .5s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 18 }}>🎯</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fbbf24" }}>Recommandations</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.recommendations?.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(251,191,36,.12)", color: "#fbbf24",
                      fontSize: 11, fontWeight: 800, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{i + 1}</span>
                    <span style={{ color: "rgba(255,255,255,.65)", fontSize: 13, lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#4f46e5 100%)",
            borderRadius: 24, padding: "40px 48px", textAlign: "center",
            animation: "fadeUp .5s .6s both",
            boxShadow: "0 24px 60px rgba(37,99,235,.35)",
          }}>
            <div className="orb" style={{ width: 300, height: 300, background: "rgba(255,255,255,.05)", top: -100, right: -60 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.5px" }}>
                Génère maintenant ton CV optimisé
              </div>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, marginBottom: 28 }}>
                CVAdapt intègre automatiquement les mots-clés manquants.<br/>Passe de {result.score} à 90+ en 30 secondes.
              </p>
              <button onClick={goGenerate} style={{
                background: "#fff", color: "#1d4ed8", fontWeight: 800, fontSize: 15,
                padding: "14px 36px", borderRadius: 999, border: "none", cursor: "pointer",
                boxShadow: "0 8px 28px rgba(0,0,0,.2)", fontFamily: "inherit",
                transition: "transform .2s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 14px 36px rgba(0,0,0,.3)"; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 28px rgba(0,0,0,.2)"; }}
              >
                Générer mon CV optimisé →
              </button>
              <p style={{ color: "rgba(255,255,255,.35)", fontSize: 12, marginTop: 16 }}>
                ✓ 3 CV gratuits · ✓ Sans carte bancaire · ✓ 30 secondes
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
