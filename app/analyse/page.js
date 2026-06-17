"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

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

function scoreColor(s) {
  if (s >= 75) return { stroke: "#22c55e", bg: "rgba(34,197,94,.1)", text: "#4ade80", label: "Excellent" };
  if (s >= 50) return { stroke: "#f59e0b", bg: "rgba(245,158,11,.1)", text: "#fbbf24", label: "Bon" };
  return { stroke: "#ef4444", bg: "rgba(239,68,68,.1)", text: "#f87171", label: "À améliorer" };
}

export default function Analyse() {
  const [form, setForm] = useState({ offre: "", nom: "", email: "", telephone: "", adresse: "", experience: "", competences: "", formation: "", langues: "", linkedin: "" });
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
    <main style={{ minHeight: "100vh", background: "#070c1b", fontFamily: "var(--font-outfit, Outfit, system-ui, sans-serif)", position: "relative" }}>

      {/* ── Fond ambiance ── */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 800, height: 800,
          background: "radial-gradient(circle, rgba(29,78,216,0.13) 0%, transparent 65%)",
          top: -300, left: "50%", transform: "translateX(-50%)",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          bottom: "10%", right: "-5%",
        }} />
      </div>

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-dot { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }

        .ats-input {
          width: 100%; background: rgba(255,255,255,.035);
          border: 1.5px solid rgba(255,255,255,.07);
          border-radius: 12px; padding: 12px 16px;
          color: #fff; font-size: 14px; outline: none; resize: none;
          transition: border-color .2s, background .2s;
          font-family: inherit; box-sizing: border-box;
        }
        .ats-input::placeholder { color: rgba(255,255,255,.2); }
        .ats-input:focus { border-color: rgba(59,130,246,.55); background: rgba(59,130,246,.05); }

        .ats-label {
          font-size: 11px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.38);
          margin-bottom: 7px; display: block;
        }

        .ats-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          color: #fff; font-weight: 800; font-size: 16px;
          padding: 17px 32px; border-radius: 14px; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(29,78,216,.4);
          transition: transform .2s, box-shadow .2s; font-family: inherit;
        }
        .ats-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(29,78,216,.5); }
        .ats-btn:disabled { opacity: .55; cursor: not-allowed; }
        .ats-btn-sm { width: auto; padding: 12px 24px; font-size: 14px; border-radius: 12px; }

        .ats-btn-ghost {
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.06); border: 1.5px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.65); font-weight: 700; font-size: 14px;
          padding: 12px 24px; border-radius: 12px; cursor: pointer; font-family: inherit;
          transition: background .2s, border-color .2s;
        }
        .ats-btn-ghost:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.18); }

        .card {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px; padding: 24px;
          backdrop-filter: blur(12px);
          transition: border-color .25s;
        }
        .card:hover { border-color: rgba(59,130,246,.22); }

        .kw-found { display:inline-flex; align-items:center; gap:5px; background:rgba(34,197,94,.1); color:#4ade80; border:1px solid rgba(34,197,94,.2); font-size:12px; font-weight:700; padding:5px 12px; border-radius:999px; }
        .kw-miss  { display:inline-flex; align-items:center; gap:5px; background:rgba(239,68,68,.09); color:#f87171; border:1px solid rgba(239,68,68,.18); font-size:12px; font-weight:700; padding:5px 12px; border-radius:999px; }

        .score-track { fill:none; stroke:rgba(255,255,255,.06); stroke-width:8; }
        .score-fill  { fill:none; stroke-width:8; stroke-linecap:round; transform-origin:center; transition: stroke-dashoffset .05s linear; }

        @media (max-width: 768px) {
          .form-grid, .res-grid { grid-template-columns: 1fr !important; }
          .score-row { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <header style={{ padding: "18px 28px", maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Logo size={26} />
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-.3px" }}>CVAdapt</span>
          </Link>
          <Link href="/generate" style={{
            fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none",
            background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
            padding: "9px 18px", borderRadius: 10, backdropFilter: "blur(8px)",
            transition: "background .2s",
          }}>
            Générer mon CV →
          </Link>
        </header>

        {/* ── HERO ── */}
        <section style={{ paddingTop: 44, paddingBottom: 52, textAlign: "center", padding: "44px 24px 52px" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.28)",
              color: "#93c5fd", fontSize: 12, fontWeight: 700,
              padding: "6px 16px", borderRadius: 999, marginBottom: 26,
              animation: "fadeUp .5s both",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              Analyse ATS gratuite · Sans inscription
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900,
              color: "#fff", letterSpacing: "-2px", lineHeight: 1.08,
              marginBottom: 18, animation: "fadeUp .5s .07s both",
            }}>
              Ton CV passe-t-il<br />
              <span style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                les filtres ATS ?
              </span>
            </h1>

            <p style={{
              fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.75,
              marginBottom: 40, animation: "fadeUp .5s .14s both",
            }}>
              Colle ton offre et ton profil — reçois ton score en 30 secondes.<br />
              Gratuit, sans compte requis.
            </p>

            {/* Étapes */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              flexWrap: "wrap", gap: 0, animation: "fadeUp .5s .21s both",
            }}>
              {[["Colle l'offre", "1"], ["Entre ton profil", "2"], ["Score instantané", "3"]].map(([label, n], i) => (
                <div key={n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: "#fff",
                      boxShadow: "0 2px 10px rgba(29,78,216,.45)",
                      flexShrink: 0,
                    }}>{n}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.55)" }}>{label}</span>
                  </div>
                  {i < 2 && <div style={{ width: 28, height: 1, background: "rgba(255,255,255,.08)", margin: "0 14px" }} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULAIRE ── */}
        {!result && (
          <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 90px", animation: "fadeUp .6s .25s both" }}>
            <form onSubmit={handleSubmit}>

              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

                {/* ── Offre d'emploi ── */}
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 11,
                      background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, flexShrink: 0,
                    }}>📋</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>L'offre d'emploi</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Copie-colle depuis LinkedIn, Indeed…</div>
                    </div>
                  </div>
                  <textarea
                    className="ats-input"
                    name="offre"
                    value={form.offre}
                    onChange={handleChange}
                    required
                    rows={16}
                    placeholder={"Développeur React H/F\n\nNous recherchons un développeur React expérimenté…\n\nCompétences requises :\n- React, TypeScript\n- Node.js, Docker, AWS"}
                  />
                </div>

                {/* ── Ton profil ── */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 11,
                      background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, flexShrink: 0,
                    }}>👤</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>Ton profil</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Tes informations pour l'analyse</div>
                    </div>
                  </div>

                  {/* Nom complet */}
                  <div>
                    <label className="ats-label">Nom complet <span style={{ color: "#ef4444" }}>*</span></label>
                    <input className="ats-input" type="text" name="nom" value={form.nom} onChange={handleChange} required placeholder="Sophie Martin" />
                  </div>

                  {/* Email + Téléphone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label className="ats-label">Email</label>
                      <input className="ats-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="sophie@email.com" />
                    </div>
                    <div>
                      <label className="ats-label">Téléphone</label>
                      <input className="ats-input" type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="06 12 34 56 78" />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="ats-label">Ville / Adresse</label>
                    <input className="ats-input" type="text" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Paris 75008" />
                  </div>

                  {/* Expérience */}
                  <div>
                    <label className="ats-label">Expérience professionnelle <span style={{ color: "#ef4444" }}>*</span></label>
                    <textarea className="ats-input" name="experience" value={form.experience} onChange={handleChange} required rows={4} placeholder="2 ans chez Accenture en tant que développeur React…&#10;Chef de projet chez Orange (2020–2023)…" />
                  </div>

                  {/* Compétences */}
                  <div>
                    <label className="ats-label">Compétences <span style={{ color: "#ef4444" }}>*</span></label>
                    <input className="ats-input" type="text" name="competences" value={form.competences} onChange={handleChange} required placeholder="React, JavaScript, Node.js, SQL, Git…" />
                  </div>

                  {/* Formation */}
                  <div>
                    <label className="ats-label">Formation <span style={{ color: "#ef4444" }}>*</span></label>
                    <input className="ats-input" type="text" name="formation" value={form.formation} onChange={handleChange} required placeholder="Licence Informatique — Université Paris VI, 2021" />
                  </div>

                  {/* Langues + LinkedIn */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label className="ats-label">Langues</label>
                      <input className="ats-input" type="text" name="langues" value={form.langues} onChange={handleChange} placeholder="Français (natif), Anglais (B2)" />
                    </div>
                    <div>
                      <label className="ats-label">LinkedIn / Portfolio</label>
                      <input className="ats-input" type="text" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/sophie-martin" />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{
                  background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.22)",
                  borderRadius: 12, padding: "13px 18px", marginBottom: 14,
                  color: "#f87171", fontSize: 14,
                }}>
                  {error}
                </div>
              )}

              <button type="submit" className="ats-btn" disabled={loading}>
                {loading ? (
                  <>
                    <svg style={{ animation: "spin 1s linear infinite", flexShrink: 0 }} width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.25)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Analyse ATS en cours…
                  </>
                ) : "🎯  Analyser mon CV gratuitement →"}
              </button>

              <p style={{ textAlign: "center", color: "rgba(255,255,255,.2)", fontSize: 12, marginTop: 14 }}>
                ✓ Gratuit · ✓ Sans inscription · ✓ Résultat en 30 secondes
              </p>
            </form>
          </section>
        )}

        {/* ── RÉSULTATS ── */}
        {result && (
          <section ref={resultRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 100px" }}>

            {/* Score principal */}
            <div style={{
              position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, rgba(15,36,96,.85) 0%, rgba(29,78,216,.55) 100%)",
              border: "1px solid rgba(59,130,246,.28)",
              borderRadius: 24, padding: "40px 40px 40px 40px",
              marginBottom: 16, animation: "scaleIn .5s cubic-bezier(.16,1,.3,1) both",
              boxShadow: "0 20px 60px rgba(29,78,216,.25)",
            }}>
              <div aria-hidden style={{
                position: "absolute", width: 480, height: 480,
                background: `radial-gradient(circle, ${colors.bg} 0%, transparent 70%)`,
                top: -200, right: -100, pointerEvents: "none",
              }} />

              <div className="score-row" style={{ display: "flex", alignItems: "center", gap: 44, position: "relative", zIndex: 1 }}>

                {/* Jauge */}
                <div style={{
                  flexShrink: 0, position: "relative",
                  animation: "float 4s ease-in-out infinite",
                  filter: `drop-shadow(0 16px 32px ${colors.stroke}55)`,
                }}>
                  <svg width="150" height="150" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,.02)" strokeWidth="1"/>
                    <circle className="score-track" cx="50" cy="50" r="42" />
                    <circle
                      className="score-fill"
                      cx="50" cy="50" r="42"
                      stroke={colors.stroke}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - dash}
                      style={{ filter: `drop-shadow(0 0 6px ${colors.stroke})` }}
                    />
                  </svg>
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{displayScore}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", fontWeight: 600 }}>/100</span>
                  </div>
                </div>

                {/* Texte */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: colors.bg, border: `1px solid ${colors.stroke}33`,
                    color: colors.text, fontSize: 12, fontWeight: 800,
                    padding: "5px 14px", borderRadius: 999, marginBottom: 14,
                  }}>
                    {colors.label}
                  </div>

                  <h2 style={{
                    fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 900, color: "#fff",
                    letterSpacing: "-.5px", lineHeight: 1.25, marginBottom: 10,
                  }}>
                    {result.score >= 75
                      ? "Excellent ! Ton profil correspond bien à cette offre."
                      : result.score >= 50
                      ? "Bon début — quelques ajustements pour décrocher l'entretien."
                      : "Ton CV nécessite des optimisations importantes."}
                  </h2>

                  <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, lineHeight: 1.7, marginBottom: 22 }}>
                    {result.score >= 75
                      ? "Tu as de bonnes chances de passer les filtres automatiques. Génère ton CV pour maximiser tes chances."
                      : "CVAdapt peut intégrer automatiquement les mots-clés manquants et booster ton score ATS."}
                  </p>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button onClick={goGenerate} className="ats-btn ats-btn-sm">
                      Générer mon CV optimisé →
                    </button>
                    <button
                      onClick={() => { setResult(null); setError(""); setAnimate(false); }}
                      className="ats-btn-ghost"
                    >
                      ← Nouvelle analyse
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mots-clés */}
            <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

              <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(34,197,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#4ade80" }}>Mots-clés présents</span>
                  </div>
                  <span style={{ background: "rgba(34,197,94,.12)", color: "#4ade80", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>
                    {result.keywords_found?.length}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {result.keywords_found?.map((kw, i) => <span key={i} className="kw-found">✓ {kw}</span>)}
                </div>
              </div>

              <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(239,68,68,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✗</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f87171" }}>Mots-clés manquants</span>
                  </div>
                  <span style={{ background: "rgba(239,68,68,.12)", color: "#f87171", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>
                    {result.keywords_missing?.length}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {result.keywords_missing?.map((kw, i) => <span key={i} className="kw-miss">✗ {kw}</span>)}
                </div>
              </div>
            </div>

            {/* Points forts + Recommandations */}
            <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(96,165,250,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>💪</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#93c5fd" }}>Points forts</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {result.strengths?.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: "rgba(59,130,246,.06)", borderRadius: 10, padding: "10px 14px",
                    }}>
                      <span style={{ color: "#3b82f6", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ color: "rgba(255,255,255,.7)", fontSize: 13, lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(251,191,36,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🎯</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24" }}>Recommandations</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {result.recommendations?.map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: "rgba(251,191,36,.1)", color: "#fbbf24",
                        fontSize: 10, fontWeight: 800, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{i + 1}</span>
                      <span style={{ color: "rgba(255,255,255,.6)", fontSize: 13, lineHeight: 1.6 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div style={{
              position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)",
              borderRadius: 20, padding: "36px 44px", textAlign: "center",
              boxShadow: "0 16px 50px rgba(29,78,216,.3)",
            }}>
              <div aria-hidden style={{
                position: "absolute", width: 280, height: 280,
                background: "radial-gradient(circle, rgba(255,255,255,.05) 0%, transparent 70%)",
                top: -100, right: -60, pointerEvents: "none",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-.5px" }}>
                  Génère maintenant ton CV optimisé
                </div>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                  CVAdapt intègre automatiquement les mots-clés manquants.<br />
                  Passe de {result.score} à 90+ en 30 secondes.
                </p>
                <button
                  onClick={goGenerate}
                  style={{
                    background: "#fff", color: "#1d4ed8", fontWeight: 800, fontSize: 15,
                    padding: "13px 34px", borderRadius: 12, border: "none", cursor: "pointer",
                    boxShadow: "0 6px 22px rgba(0,0,0,.18)", fontFamily: "inherit",
                    transition: "transform .2s, box-shadow .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(0,0,0,.18)"; }}
                >
                  Générer mon CV optimisé →
                </button>
                <p style={{ color: "rgba(255,255,255,.3)", fontSize: 11, marginTop: 14 }}>
                  ✓ 3 CV gratuits · ✓ Sans carte bancaire · ✓ 30 secondes
                </p>
              </div>
            </div>

          </section>
        )}
      </div>
    </main>
  );
}
