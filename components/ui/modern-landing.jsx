// components/ui/modern-landing.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/app/components/Logo";

const C = {
  bg: "#FFFFFF",
  bgAlt: "#F8FAFF",
  navy: "#0F172A",
  slate: "#475569",
  slateLight: "#94A3B8",
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  amber: "#F59E0B",
  amberLight: "#FEF3C7",
  green: "#10B981",
  greenLight: "#ECFDF5",
  red: "#EF4444",
  border: "#E2E8F0",
  shadow: "0 4px 24px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
  shadowLg: "0 20px 64px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)",
};


function CVMockup() {
  return (
    <div className="cv-mockup-wrap" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="cv-card" style={{ background: C.bg, borderRadius: 20, boxShadow: C.shadowLg, padding: "24px 22px", width: 280, position: "relative", border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>M</div>
          <div>
            <div style={{ width: 100, height: 9, background: C.navy, borderRadius: 5, marginBottom: 5 }} />
            <div style={{ width: 70, height: 7, background: C.border, borderRadius: 4, marginBottom: 4 }} />
            <div style={{ width: 54, height: 6, background: C.blueLight, borderRadius: 3 }} />
          </div>
        </div>
        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 7 }}>EXPÉRIENCE</div>
          {[95, 75, 88, 60, 70].map((w, i) => (
            <div key={i} style={{ height: 6, background: i % 2 === 0 ? "#E2E8F0" : "#F1F5F9", borderRadius: 3, marginBottom: 4, width: `${w}%` }} />
          ))}
        </div>
        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 7 }}>COMPÉTENCES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {["React", "Python", "SQL", "Excel"].map(s => (
              <div key={s} style={{ padding: "2px 7px", background: C.blueLight, color: C.blue, borderRadius: 99, fontSize: 7.5, fontWeight: 700 }}>{s}</div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 7 }}>FORMATION</div>
          {[80, 55].map((w, i) => (
            <div key={i} style={{ height: 6, background: "#F1F5F9", borderRadius: 3, marginBottom: 4, width: `${w}%` }} />
          ))}
        </div>
        {/* Badge score ATS */}
        <div className="badge-ats" style={{ position: "absolute", top: -16, right: -14, background: C.green, color: "#fff", borderRadius: 12, padding: "8px 11px", textAlign: "center", boxShadow: `0 8px 28px rgba(16,185,129,0.4)` }}>
          <div style={{ fontSize: 7.5, fontWeight: 600, opacity: 0.9, marginBottom: 1 }}>Score ATS</div>
          <div style={{ fontSize: 21, fontWeight: 900, lineHeight: 1 }}>91</div>
          <div style={{ fontSize: 7.5, opacity: 0.75 }}>/100</div>
        </div>
        {/* Badge mots-clés */}
        <div className="badge-kw" style={{ position: "absolute", bottom: -12, left: -10, background: C.bg, border: `2px solid ${C.blue}`, borderRadius: 10, padding: "6px 10px", display: "flex", alignItems: "center", gap: 5, boxShadow: C.shadow }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>✓</div>
          <div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.navy }}>18 mots-clés ATS</div>
            <div style={{ fontSize: 7.5, color: C.slateLight }}>intégrés automatiquement</div>
          </div>
        </div>
        {/* Chrono — masqué sur mobile via CSS */}
        <div className="badge-chrono cv-badge-chrono" style={{ position: "absolute", top: 95, left: -58, background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 10, padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, boxShadow: C.shadow }}>
          <span style={{ fontSize: 13 }}>⚡</span>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#92400E" }}>Généré en 30s</div>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Romain S.", role: "Alternant finance · Paris", result: "Alternance en 5 jours", text: "Rappelé en 5 jours après 3 semaines sans réponse.", color: C.blue },
  { name: "Emma T.", role: "Master · Toulouse", result: "Stage en 2 semaines", text: "Postulera a mis en avant mes projets universitaires parfaitement.", color: "#7C3AED" },
  { name: "Antoine P.", role: "Data Analyst · Paris", result: "Score ATS : 34 → 91", text: "Score passé de 34 à 91 en un clic. Résultat immédiat.", color: "#0891B2" },
  { name: "Théo V.", role: "Étudiant · Paris", result: "3 offres reçues", text: "Mon profil générique transformé en 30 secondes. 3 propositions.", color: C.green },
  { name: "Anaïs G.", role: "Marketing · Lyon", result: "Taux de réponse ×3", text: "Avant je galérais, maintenant 30 secondes. Résultat immédiat.", color: C.amber },
  { name: "Julien F.", role: "Comptable · Marseille", result: "CDI en 3 semaines", text: "Les recruteurs ont commencé à me rappeler.", color: C.red },
];

const STEPS = [
  { n: "01", icon: "📋", label: "Colle l'offre", desc: "Tu copies-colles l'offre d'emploi dans Postulera. Rien d'autre." },
  { n: "02", icon: "🧠", label: "L'IA analyse", desc: "Notre IA détecte les mots-clés ATS exacts que le logiciel va chercher." },
  { n: "03", icon: "🚀", label: "CV optimisé", desc: "Ton CV est réécrit et optimisé. Score ATS 85+ garanti. En 30 secondes." },
];

// Remplacer par l'ID YouTube de ta vidéo démo (ex: "dQw4w9WgXcQ")
const DEMO_VIDEO_ID = null;

const BRANDS = [
  "Capgemini", "L'Oréal", "BNP Paribas", "TotalEnergies", "Decathlon",
  "LVMH", "Airbus", "Renault", "Société Générale", "Crédit Agricole",
  "Deloitte", "McKinsey", "KPMG", "Thales", "Schneider Electric",
  "Orange", "Peugeot", "Michelin", "SNCF", "Dassault Systèmes",
];

const DEMO_STEPS = [
  {
    label: "Colle l'offre d'emploi",
    desc: "Copie-colle n'importe quelle offre depuis LinkedIn, Indeed ou une page carrière.",
    screen: (
      <div style={{ background: "#0F172A", borderRadius: 10, padding: "16px 18px", fontFamily: "monospace" }}>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 10 }}>📋 Offre collée</div>
        <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.7 }}>
          <span style={{ color: "#38BDF8" }}>Poste :</span> Chargé de Projet Digital<br />
          <span style={{ color: "#38BDF8" }}>Entreprise :</span> Capgemini<br />
          <span style={{ color: "#38BDF8" }}>Compétences requises :</span><br />
          <span style={{ color: "#A3E635", paddingLeft: 12 }}>→ Gestion de projet agile</span><br />
          <span style={{ color: "#A3E635", paddingLeft: 12 }}>→ Excel, PowerPoint</span><br />
          <span style={{ color: "#A3E635", paddingLeft: 12 }}>→ Communication client</span>
        </div>
      </div>
    ),
  },
  {
    label: "L'IA analyse tes mots-clés",
    desc: "Postulera identifie les 18+ mots-clés ATS que les recruteurs attendent exactement.",
    screen: (
      <div style={{ background: "#0F172A", borderRadius: 10, padding: "16px 18px" }}>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 10 }}>🧠 Analyse ATS en cours…</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Agile", "Scrum", "Excel", "PowerPoint", "Gestion projet", "Client", "Reporting", "KPI", "Budgets", "Planning", "Stakeholders", "Coordination"].map((kw, i) => (
            <span key={i} style={{ padding: "3px 9px", background: i < 6 ? "rgba(56,189,248,0.15)" : "rgba(163,230,53,0.12)", color: i < 6 ? "#38BDF8" : "#A3E635", borderRadius: 999, fontSize: 10, fontWeight: 700, border: `1px solid ${i < 6 ? "rgba(56,189,248,0.3)" : "rgba(163,230,53,0.2)"}` }}>{kw}</span>
          ))}
        </div>
        <div style={{ marginTop: 12, height: 4, background: "#1E293B", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: "78%", height: "100%", background: "linear-gradient(90deg,#38BDF8,#818CF8)", borderRadius: 999 }} />
        </div>
        <div style={{ fontSize: 9, color: "#475569", marginTop: 5 }}>Score ATS estimé : <strong style={{ color: "#A3E635" }}>91/100</strong></div>
      </div>
    ),
  },
  {
    label: "Télécharge ton CV en PDF",
    desc: "Ton CV optimisé est prêt. Clique Télécharger et postule immédiatement.",
    screen: (
      <div style={{ background: "#0F172A", borderRadius: 10, padding: "16px 18px" }}>
        <div style={{ fontSize: 10, color: "#64748B", marginBottom: 10 }}>✅ CV généré en 28 secondes</div>
        <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
          <div style={{ height: 7, background: "#0F172A", borderRadius: 3, width: "60%", marginBottom: 5 }} />
          <div style={{ height: 5, background: "#E2E8F0", borderRadius: 3, width: "40%", marginBottom: 10 }} />
          <div style={{ height: 4, background: "#E2E8F0", borderRadius: 3, width: "90%", marginBottom: 3 }} />
          <div style={{ height: 4, background: "#E2E8F0", borderRadius: 3, width: "80%", marginBottom: 3 }} />
          <div style={{ height: 4, background: "#EFF6FF", borderRadius: 3, width: "95%", marginBottom: 3 }} />
          <div style={{ height: 4, background: "#E2E8F0", borderRadius: 3, width: "70%", marginBottom: 6 }} />
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {["Agile", "Scrum", "KPI"].map(k => <span key={k} style={{ padding: "1px 6px", background: "#EFF6FF", color: "#2563EB", borderRadius: 4, fontSize: 7, fontWeight: 700 }}>{k}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "#A3E635", fontWeight: 700 }}>● Score ATS : 91/100</span>
          <span style={{ padding: "5px 12px", background: "#2563EB", color: "#fff", borderRadius: 6, fontSize: 10, fontWeight: 700 }}>📄 Télécharger PDF</span>
        </div>
      </div>
    ),
  },
];

function DemoSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive(a => (a + 1) % DEMO_STEPS.length), 3500);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <section style={{ background: "#0A0F1E", padding: "80px 40px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#38BDF8", marginBottom: 12 }}>
            Comment ça marche
          </p>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-1.5px", color: "#F1F5F9", marginBottom: 12 }}>
            30 secondes. Du collage au PDF.
          </h2>
          <p style={{ fontSize: 15, color: "#64748B", maxWidth: 400, margin: "0 auto" }}>
            {DEMO_VIDEO_ID ? "Regarde comment ça marche." : "Trois étapes, zéro friction."}
          </p>
        </div>

        {DEMO_VIDEO_ID ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            <iframe
              src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?rel=0&modestbranding=1`}
              title="Démo Postulera"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32, alignItems: "start" }}>
            {/* Steps nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {DEMO_STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); setPlaying(false); }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px",
                    background: active === i ? "rgba(37,99,235,0.12)" : "transparent",
                    border: `1px solid ${active === i ? "rgba(37,99,235,0.3)" : "transparent"}`,
                    borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    background: active === i ? "#2563EB" : "#1E293B",
                    color: active === i ? "#fff" : "#475569",
                    fontSize: 12, fontWeight: 800, transition: "all 0.2s",
                  }}>{i + 1}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: active === i ? "#F1F5F9" : "#64748B", marginBottom: 4, transition: "color 0.2s" }}>{s.label}</p>
                    <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </button>
              ))}
              <a href="/generate" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, padding: "12px 20px", background: "#2563EB", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Essayer maintenant — gratuit →
              </a>
            </div>

            {/* Screen preview */}
            <div style={{ background: "#111827", borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
              {/* Browser chrome */}
              <div style={{ background: "#1E293B", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
                </div>
                <div style={{ flex: 1, background: "#0F172A", borderRadius: 6, padding: "4px 12px", fontSize: 10, color: "#475569", textAlign: "center" }}>
                  postulera.com/generate
                </div>
              </div>
              <div style={{ padding: 20, minHeight: 220, transition: "opacity 0.25s" }}>
                {DEMO_STEPS[active].screen}
              </div>
              {/* Progress dots */}
              <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "center", gap: 6 }}>
                {DEMO_STEPS.map((_, i) => (
                  <div key={i} onClick={() => { setActive(i); setPlaying(false); }} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 999, background: i === active ? "#2563EB" : "#1E293B", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function ModernLanding({ onNewsletter, emailStatus, email, setEmail }) {
  const containerRef = useRef(null);
  const [counters, setCounters] = useState({ pct: 0, users: 0 });
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero — PAS de masquage initial pour éviter le flash
      gsap.from(".cv-card", { x: 30, autoAlpha: 0, rotate: 1, duration: 0.9, ease: "expo.out", delay: 0.3 });
      gsap.from(".badge-ats", { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(1.5)", delay: 0.8 });
      gsap.from(".badge-kw", { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(1.5)", delay: 0.95 });
      gsap.from(".badge-chrono", { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(1.5)", delay: 1.05 });
      gsap.to(".cv-card", { y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 });

      // Scroll-triggered
      ScrollTrigger.create({
        trigger: ".stats-section", start: "top 80%", once: true,
        onEnter: () => {
          const p = { val: 0 }, u = { val: 0 };
          gsap.to(p, { val: 75, duration: 2, ease: "power2.out", onUpdate: () => setCounters(c => ({ ...c, pct: Math.round(p.val) })) });
          gsap.to(u, { val: 4200, duration: 2.2, ease: "power2.out", onUpdate: () => setCounters(c => ({ ...c, users: Math.round(u.val) })) });
        },
      });
      gsap.from(".stat-card", { scrollTrigger: { trigger: ".stats-section", start: "top 82%", once: true }, y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.7 });
      gsap.from(".step-card", { scrollTrigger: { trigger: ".steps-section", start: "top 76%", once: true }, y: 50, autoAlpha: 0, stagger: 0.15, duration: 0.8, ease: "expo.out" });
      gsap.from(".compare-before", { scrollTrigger: { trigger: ".compare-section", start: "top 76%", once: true }, x: -30, autoAlpha: 0, duration: 0.8 });
      gsap.from(".compare-after", { scrollTrigger: { trigger: ".compare-section", start: "top 76%", once: true }, x: 30, autoAlpha: 0, duration: 0.8, delay: 0.1 });

      const circ = 2 * Math.PI * 54;
      ScrollTrigger.create({
        trigger: ".compare-section", start: "top 72%", once: true,
        onEnter: () => {
          const rb = containerRef.current?.querySelector(".ring-before");
          const ra = containerRef.current?.querySelector(".ring-after");
          if (rb) gsap.fromTo(rb, { strokeDashoffset: circ }, { strokeDashoffset: circ * (1 - 0.34), duration: 1.5, ease: "power2.out", delay: 0.3 });
          if (ra) gsap.fromTo(ra, { strokeDashoffset: circ }, { strokeDashoffset: circ * (1 - 0.91), duration: 2, ease: "power2.out", delay: 0.5 });
        },
      });
      gsap.from(".testimonial-card", { scrollTrigger: { trigger: ".testimonials-section", start: "top 78%", once: true }, y: 40, autoAlpha: 0, stagger: 0.08, duration: 0.7 });
      gsap.from(".price-card", { scrollTrigger: { trigger: ".pricing-section", start: "top 78%", once: true }, y: 50, autoAlpha: 0, scale: 0.97, stagger: 0.12, duration: 0.8 });
      gsap.from(".final-cta > *", { scrollTrigger: { trigger: ".final-cta", start: "top 80%", once: true }, y: 36, autoAlpha: 0, stagger: 0.1, duration: 0.7 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const circ = 2 * Math.PI * 54;
  const faqItems = [
    { q: "Postulera est-il vraiment gratuit ?", a: "Oui, 3 CV complets sont générés gratuitement, sans carte bancaire requise." },
    { q: "Comment fonctionne l'optimisation ATS ?", a: "L'IA analyse l'offre d'emploi, extrait les mots-clés exacts et réécrit votre CV pour maximiser votre score de correspondance." },
    { q: "En combien de temps est généré mon CV ?", a: "Le CV optimisé est généré en moins de 30 secondes." },
    { q: "Puis-je annuler mon abonnement ?", a: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client." },
  ];

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.navy, fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      {/* ── HEADER ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 60, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={30} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.4px", color: C.navy }}>Postulera</span>
        </div>
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div className="cv-nav-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#steps" style={{ color: C.slate, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Comment ça marche</a>
            <a href="/tarifs" style={{ color: C.slate, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Tarifs</a>
            <a href="/sign-in" style={{ color: C.slate, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Se connecter</a>
          </div>
          <a href="/sign-up" className="cv-cta-btn" style={{ background: C.blue, color: "#fff", padding: "9px 20px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Commencer gratuitement
          </a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="cv-hero cv-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 48, maxWidth: 1200, margin: "0 auto", padding: "100px 40px 80px", position: "relative", minHeight: "100vh" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.3, pointerEvents: "none", zIndex: 0 }} />

        <div className="hero-left" style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", background: C.blueLight, border: `1px solid #BFDBFE`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, display: "inline-block" }} />
              Outil IA marché français
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: C.greenLight, border: `1px solid #A7F3D0`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#065F46" }}>
              3 CV gratuits · Sans CB
            </div>
          </div>

          <h1 className="cv-hero-h1" style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 16, color: C.navy }}>
            T'as envoyé des CV partout.<br />
            <span style={{ color: C.blue }}>Personne n'a répondu.</span><br />
            <span style={{ color: C.slateLight, fontWeight: 700, fontSize: "0.78em" }}>Ce n'était pas toi. C'était le filtre.</span>
          </h1>

          <p className="cv-hero-p" style={{ fontSize: 17, color: C.slate, lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
            <strong style={{ color: C.navy }}>75% des candidatures sont éliminées par un algorithme avant d'atteindre un recruteur.</strong>{" "}
            Postulera adapte ton CV aux filtres ATS en 30 secondes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 26px", background: C.blue, color: "#fff", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
              Générer mon CV gratuit →
            </a>
            <a href="/analyse" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "14px 22px", background: C.bg, color: C.navy, borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", border: `1.5px solid ${C.border}` }}>
              🎯 Tester mon score ATS
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {[C.blue, "#7C3AED", "#0891B2", C.green, C.red].map((c, i) => (
                <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: `2px solid ${C.bg}`, marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>
                  {["R","E","A","T","J"][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: C.slateLight }}>✓ Sans CB · 3 CV gratuits</span>
          </div>

          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.slateLight, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              Génère ton CV en :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[
                { flag: "🇫🇷", code: "fr", name: "Français" },
                { flag: "🇬🇧", code: "en", name: "Anglais" },
                { flag: "🇩🇪", code: "de", name: "Allemand" },
                { flag: "🇪🇸", code: "es", name: "Espagnol" },
                { flag: "🇮🇹", code: "it", name: "Italien" },
                { flag: "🇵🇹", code: "pt", name: "Portugais" },
                { flag: "🇳🇱", code: "nl", name: "Néerlandais" },
                { flag: "🇵🇱", code: "pl", name: "Polonais" },
                { flag: "🇰🇷", code: "ko", name: "Coréen" },
                { flag: "🇯🇵", code: "ja", name: "Japonais" },
                { flag: "🇸🇪", code: "sv", name: "Suédois" },
                { flag: "🇫🇮", code: "fi", name: "Finnois" },
                { flag: "🇸🇦", code: "ar", name: "Arabe" },
                { flag: "🇷🇺", code: "ru", name: "Russe" },
                { flag: "🇨🇳", code: "zh", name: "Chinois" },
                { flag: "🇮🇳", code: "hi", name: "Hindi" },
                { flag: "🇮🇱", code: "he", name: "Hébreu" },
                { flag: "🇹🇷", code: "tr", name: "Turc" },
              ].map((l) => (
                <a key={l.code} href={`/generate?cvlang=${l.code}`}
                  title={`CV en ${l.name}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 10px", borderRadius: 999,
                    border: `1px solid ${C.border}`, background: C.bg,
                    fontSize: 13, fontWeight: 600, color: C.navy,
                    textDecoration: "none", cursor: "pointer",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueLight; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                >
                  <span style={{ fontSize: 16 }}>{l.flag}</span>
                  <span>{l.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <CVMockup />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 36s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; }
        }
        .marquee-fade-l {
          background: linear-gradient(to right, #fff 0%, transparent 100%);
        }
        .marquee-fade-r {
          background: linear-gradient(to left, #fff 0%, transparent 100%);
        }
      `}</style>
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", padding: "18px 28px", borderRight: `1px solid ${C.border}`, minWidth: 148 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slateLight, lineHeight: 1.6, margin: 0 }}>
            Nos utilisateurs<br />recrutés chez
          </p>
        </div>
        <div style={{ position: "relative", overflow: "hidden", flex: 1 }}>
          <div className="marquee-fade-l" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, pointerEvents: "none" }} />
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", padding: "20px 0", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#94A3B8", letterSpacing: "-0.2px", padding: "0 36px" }}>{b}</span>
                <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: C.border, flexShrink: 0 }} />
              </span>
            ))}
          </div>
          <div className="marquee-fade-r" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, pointerEvents: "none" }} />
        </div>
      </section>

      {/* ── DEMO VIDEO ── */}
      <DemoSection />

      {/* ── STATS ── */}
      <section className="stats-section cv-section cv-py" style={{ padding: "72px 40px", background: C.bgAlt }}>
        <div className="cv-grid-3" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            { value: counters.pct + "%", label: "des CV filtrés\npar les ATS", sublabel: "avant tout recruteur humain", color: C.red, bg: "#ffffff" },
            { value: counters.users.toLocaleString("fr-FR") + "+", label: "candidats ont\noptimisé leur CV", sublabel: "note moyenne 4,9/5", color: C.blue, bg: "#ffffff" },
            { value: "30s", label: "pour générer\nun CV ATS-optimisé", sublabel: "garanti sans carte bancaire", color: C.green, bg: "#ffffff" },
          ].map((s, i) => (
            <div key={i} className="stat-card cv-card-pad" style={{ background: s.bg, borderRadius: 18, padding: "28px 24px", border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <div className="cv-stat-num" style={{ fontSize: "clamp(38px,5vw,58px)", fontWeight: 900, color: s.color, letterSpacing: "-2px", lineHeight: 1, marginBottom: 8, fontVariantNumeric: "tabular-nums" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, lineHeight: 1.5, marginBottom: 4, whiteSpace: "pre-line" }}>{s.label}</div>
              <div style={{ fontSize: 12, color: C.slateLight }}>{s.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="steps" className="steps-section cv-section cv-py" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="steps-header cv-steps-mb" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 12 }}>
              COMMENT ÇA MARCHE
            </div>
            <h2 className="cv-h2" style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>
              Trois étapes. Zéro prise de tête.
            </h2>
            <p style={{ fontSize: 15, color: C.slate, maxWidth: 420, margin: "0 auto" }}>
              Pas besoin de savoir ce qu'est un ATS. Postulera s'en charge.
            </p>
          </div>
          <div className="cv-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {STEPS.map((step, i) => (
              <div key={i} className="step-card cv-card-pad" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14 }}>{step.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: C.blue, marginBottom: 6 }}>ÉTAPE {step.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8, color: C.navy }}>{step.label}</h3>
                <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: C.blueLight, color: C.blue, borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", border: `1px solid rgba(37,99,235,0.2)` }}>
              Essayer gratuitement →
            </a>
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ── */}
      <section className="compare-section cv-section cv-py" style={{ padding: "88px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="compare-header" style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 12 }}>RÉSULTATS CONCRETS</div>
            <h2 className="cv-h2" style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-1.5px" }}>
              Avant Postulera. <span style={{ color: C.slateLight }}>Après Postulera.</span>
            </h2>
          </div>
          <div className="cv-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="compare-before cv-card-pad" style={{ padding: 28, background: "#FEF2F2", border: `1px solid #FECACA`, borderRadius: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ fontSize: 16 }}>❌</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#991B1B" }}>CV générique</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div style={{ position: "relative", width: 70, height: 70, flexShrink: 0 }}>
                  <svg width="70" height="70" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#FECACA" strokeWidth="12" />
                    <circle className="ring-before" cx="64" cy="64" r="54" fill="none" stroke={C.red} strokeWidth="12" strokeDasharray={circ} strokeDashoffset={circ} strokeLinecap="round" transform="rotate(-90 64 64)" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 900, color: C.red }}>34</span>
                    <span style={{ fontSize: 9, color: C.slateLight }}>/100</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: C.navy, marginBottom: 3 }}>Score ATS faible</p>
                  <p style={{ fontSize: 13, color: C.slate }}>Filtré automatiquement</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                {["Mots-clés manquants", "Structure basique", "Ignoré par l'ATS"].map(t => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: C.slate }}>
                    <span style={{ color: C.red, fontWeight: 700 }}>✗</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare-after cv-card-pad" style={{ padding: 28, background: C.greenLight, border: `1px solid #A7F3D0`, borderRadius: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ fontSize: 16 }}>✅</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#065F46" }}>CV Postulera</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div style={{ position: "relative", width: 70, height: 70, flexShrink: 0 }}>
                  <svg width="70" height="70" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#A7F3D0" strokeWidth="12" />
                    <circle className="ring-after" cx="64" cy="64" r="54" fill="none" stroke={C.green} strokeWidth="12" strokeDasharray={circ} strokeDashoffset={circ} strokeLinecap="round" transform="rotate(-90 64 64)" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 900, color: C.green }}>91</span>
                    <span style={{ fontSize: 9, color: C.slateLight }}>/100</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: C.navy, marginBottom: 3 }}>Score ATS excellent</p>
                  <p style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>Entretien en 5 jours</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                {["Mots-clés de l'offre intégrés", "Structure optimisée ATS", "Lu par un humain"].map(t => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: C.navy, fontWeight: 500 }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="testimonials-section cv-section cv-py" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="testimonials-header" style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 10 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: C.amber, fontSize: 18 }}>★</span>)}
            </div>
            <h2 className="cv-h2" style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 6 }}>Ils ont décroché leur poste.</h2>
            <p style={{ fontSize: 14, color: C.slateLight }}>Premiers résultats de nos testeurs</p>
          </div>
          <div className="cv-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} className="testimonial-card cv-card-pad" style={{ padding: 20, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, display: "flex", flexDirection: "column", gap: 10, boxShadow: C.shadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: tm.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                      {tm.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{tm.name}</p>
                      <p style={{ fontSize: 11, color: C.slateLight }}>{tm.role}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: C.amber, fontSize: 9 }}>★</span>)}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.slate, lineHeight: 1.6, flex: 1 }}>"{tm.text}"</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", background: C.greenLight, border: `1px solid #A7F3D0`, borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#065F46", alignSelf: "flex-start" }}>
                  ✓ {tm.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className="pricing-section cv-section cv-py" style={{ padding: "88px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="pricing-header cv-steps-mb" style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 12 }}>TARIFS</div>
            <h2 className="cv-h2" style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 8 }}>Ton investissement.</h2>
            <p style={{ fontSize: 14, color: C.slateLight }}>Commence gratuitement. Passe à l'accompagnement complet quand tu veux.</p>
          </div>
          <div className="cv-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "center" }}>
            <div className="price-card cv-card-pad" style={{ padding: 26, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slateLight, marginBottom: 12 }}>ESSENTIEL</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-2px", color: C.navy }}>0€</span>
                <span style={{ fontSize: 13, color: C.slateLight }}> / toujours</span>
              </div>
              <p style={{ fontSize: 12, color: C.slateLight, marginBottom: 16 }}>Sans carte bancaire</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {[["3 CV en accès exclusif", true], ["Score ATS inclus", true], ["Analyse de l'offre", true], ["Lettre de motivation", false], ["Accompagnement illimité", false]].map(([f, ok], i) => (
                  <li key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: ok ? C.navy : C.slateLight }}>
                    <span style={{ color: ok ? C.green : C.border, fontWeight: 700 }}>{ok ? "✓" : "✗"}</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/generate" style={{ display: "block", textAlign: "center", padding: "11px", background: "#F8FAFC", border: `1px solid ${C.border}`, color: C.navy, borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                Démarrer gratuitement
              </a>
            </div>

            <div className="price-card cv-pricing-featured cv-card-pad" style={{ padding: 26, background: C.blue, borderRadius: 20, position: "relative", marginTop: -12, marginBottom: -12, boxShadow: "0 20px 48px rgba(37,99,235,0.3)" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.amber, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>LE PLUS CHOISI</div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>ACCOMPAGNEMENT ÉTUDIANT</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>4,99€</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}> / mois</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Annulable à tout moment</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {["15 CV / mois", "Score ATS inclus", "Lettre de motivation", "Analyse ATS détaillée", "Accès prioritaire"].map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
                    <span style={{ color: "#93C5FD", fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: "11px", background: "#fff", color: C.blue, borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Commencer pour 4,99€/mois →
              </a>
              <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8 }}>Satisfait ou remboursé · 7 jours</p>
            </div>

            <div className="price-card cv-card-pad" style={{ padding: 26, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slateLight, marginBottom: 12 }}>ACCOMPAGNEMENT PRO</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-2px", color: C.navy }}>9,99€</span>
                <span style={{ fontSize: 13, color: C.slateLight }}> / mois</span>
              </div>
              <p style={{ fontSize: 12, color: C.slateLight, marginBottom: 16 }}>Annulable à tout moment</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {["Accompagnement illimité", "Score ATS inclus", "Lettre de motivation", "Analyse ATS détaillée", "Accès prioritaire"].map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 9, fontSize: 13, color: C.navy }}>
                    <span style={{ color: C.blue, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: "11px", border: `2px solid ${C.navy}`, color: C.navy, borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Commencer pour 9,99€/mois →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="cv-section cv-py" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 className="cv-h2" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, letterSpacing: "-1px", textAlign: "center", marginBottom: 40 }}>Questions fréquentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 13, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 17px", background: openFaq === i ? C.bgAlt : C.bg, border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                  <span style={{ fontWeight: 600, color: C.navy, fontSize: 14 }}>{item.q}</span>
                  <span style={{ color: C.slateLight, fontSize: 20, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 17px 15px", background: C.bgAlt }}>
                    <p style={{ color: C.slate, fontSize: 14, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="cv-section cv-py" style={{ padding: "80px 40px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 10 }}>Nos guides</div>
            <h2 className="cv-h2" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 900, color: C.navy, letterSpacing: "-0.5px", marginBottom: 10 }}>
              Tout ce qu'il faut savoir pour décrocher un entretien
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {[
              { href: "/blog/comment-optimiser-son-cv", icon: "🎯", cat: "Guide essentiel", title: "Comment optimiser son CV en 2025", desc: "Le guide complet pour passer les filtres ATS et ×3 tes réponses." },
              { href: "/blog/cv-ats-passer-les-filtres-automatiques", icon: "🤖", cat: "ATS & Mots-clés", title: "CV ATS : passer les filtres automatiques", desc: "5 règles vérifiées sur +1 000 candidatures réelles." },
              { href: "/blog/comment-faire-un-cv-en-2025", icon: "📄", cat: "Bases du CV", title: "Faire un CV qui attire les recruteurs", desc: "Structure, formulations, et les erreurs à ne pas commettre." },
              { href: "/blog/cv-alternance-2025", icon: "🎓", cat: "Alternance", title: "CV alternance 2025 : le modèle qui fonctionne", desc: "Comment présenter ton profil étudiant pour convaincre en alternance." },
              { href: "/blog/lettre-motivation-efficace-2025", icon: "✉️", cat: "Lettre de motivation", title: "Lettre de motivation percutante en 2025", desc: "La structure en 3 paragraphes que lisent vraiment les recruteurs." },
              { href: "/blog/erreurs-cv-qui-font-rejeter", icon: "❌", cat: "Erreurs à éviter", title: "Les erreurs CV qui font rejeter en 10 secondes", desc: "Les fautes les plus fréquentes — et comment les corriger rapidement." },
            ].map(({ href, icon, cat, title, desc }) => (
              <a key={href} href={href} style={{ display: "block", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "17px 18px", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 17 }}>{icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 5, lineHeight: 1.4 }}>{title}</div>
                <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{desc}</div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <a href="/blog" style={{ fontSize: 14, fontWeight: 600, color: C.blue, textDecoration: "none" }}>Voir tous les guides →</a>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cv-section cv-py" style={{ padding: "88px 40px", background: C.blueLight, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="final-cta" style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 22, boxShadow: C.shadow }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
            Outil CV IA — marché français
          </div>
          <h2 className="cv-h2" style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, color: C.navy, marginBottom: 14 }}>
            Ton prochain entretien<br />
            <span style={{ color: C.blue }}>commence ici.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.slate, lineHeight: 1.7, marginBottom: 28 }}>
            Gratuit pour commencer. Sans carte bancaire. Résultat en 30 secondes.
          </p>
          <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 32px", background: C.blue, color: "#fff", borderRadius: 14, fontSize: 16, fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35)", marginBottom: 18 }}>
            Générer mon CV gratuit →
          </a>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 44, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {[C.blue,"#7C3AED","#0891B2",C.green,C.amber].map((c, i) => (
                <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: `2px solid ${C.blueLight}`, marginLeft: i > 0 ? -7 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "#fff" }}>
                  {["R","E","A","T","J"][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: C.slateLight }}>Sans CB · 3 CV gratuits</span>
          </div>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 18, padding: "26px 24px", boxShadow: "0 4px 24px rgba(37,99,235,0.06)" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 3 }}>Conseils CV chaque semaine</p>
            <p style={{ fontSize: 13, color: C.slateLight, marginBottom: 16 }}>Des conseils CV chaque semaine. Sans spam.</p>
            {emailStatus === "success" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: C.green, fontWeight: 700, fontSize: 15 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: C.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</span>
                Inscription confirmée !
              </div>
            ) : (
              <form onSubmit={onNewsletter} className="cv-newsletter-form" style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ton@email.fr" required
                  style={{ flex: 1, padding: "11px 14px", background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 10, color: C.navy, fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
                <button type="submit" disabled={emailStatus === "loading"}
                  style={{ padding: "11px 18px", background: C.navy, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", opacity: emailStatus === "loading" ? 0.7 : 1, fontFamily: "inherit" }}>
                  {emailStatus === "loading" ? "..." : "S'abonner →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <a href="/generate" className="cv-sticky-cta">
        Générer mon CV gratuit → <span style={{ fontSize: 12, opacity: 0.75, fontWeight: 600 }}>· Sans CB · 30s</span>
      </a>

      {/* ── FOOTER ── */}
      <footer className="cv-section" style={{ padding: "22px 40px 18px", borderTop: `1px solid ${C.border}`, background: C.bg }}>
        <div className="cv-footer-inner" style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={26} />
            <span style={{ fontWeight: 800, fontSize: 14, color: C.navy }}>Postulera</span>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[["Blog","/blog"],["Tarifs","/tarifs"],["Générer","/generate"],["Analyser","/analyse"],["Mentions légales","/mentions-legales"],["CGU","/cgu"]].map(([label, href]) => (
              <a key={href} href={href} style={{ fontSize: 12, color: C.slateLight, textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: C.slateLight }}>© 2026 Postulera</p>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          {[["🔒","Données SSL"],["🇪🇺","Hébergé en Europe · RGPD"],["✓","Sans carte bancaire"],["↩","Remboursé si non satisfait · 7j"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.slateLight }}>
              <span>{icon}</span>{text}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
