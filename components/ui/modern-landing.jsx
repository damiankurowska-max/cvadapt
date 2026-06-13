// components/ui/modern-landing.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/app/components/Logo";

gsap.registerPlugin(ScrollTrigger);

// ── Palette ──────────────────────────────────────────────────────────────
const C = {
  bg: "#FFFFFF",
  bgAlt: "#F8FAFF",
  bgDeep: "#F1F5FF",
  navy: "#0F172A",
  slate: "#475569",
  slateLight: "#94A3B8",
  blue: "#2563EB",
  blueDark: "#1E40AF",
  blueLight: "#EFF6FF",
  amber: "#F59E0B",
  amberLight: "#FEF3C7",
  green: "#10B981",
  greenLight: "#ECFDF5",
  red: "#EF4444",
  redLight: "#FEF2F2",
  border: "#E2E8F0",
  shadow: "0 4px 24px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
  shadowLg: "0 20px 64px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)",
};

// ── Mockup CV (HTML/CSS — montre le produit, pas un stock photo générique) ──
function CVMockup() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      {/* Blob de fond */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 340, height: 340, background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Carte CV principale */}
      <div className="cv-card" style={{ background: C.bg, borderRadius: 20, boxShadow: C.shadowLg, padding: "28px 26px", width: 300, position: "relative", border: `1px solid ${C.border}` }}>
        {/* En-tête CV */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>M</div>
          <div>
            <div style={{ width: 110, height: 11, background: C.navy, borderRadius: 6, marginBottom: 7 }} />
            <div style={{ width: 80, height: 8, background: C.border, borderRadius: 5, marginBottom: 5 }} />
            <div style={{ width: 60, height: 7, background: C.blueLight, borderRadius: 4 }} />
          </div>
        </div>

        {/* Expérience */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 9 }}>EXPÉRIENCE</div>
          {[95, 75, 88, 60, 70].map((w, i) => (
            <div key={i} style={{ height: 7, background: i % 2 === 0 ? "#E2E8F0" : "#F1F5F9", borderRadius: 4, marginBottom: 5, width: `${w}%` }} />
          ))}
        </div>

        {/* Compétences */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 9 }}>COMPÉTENCES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {["React", "Python", "Gestion", "SQL", "Excel"].map(s => (
              <div key={s} style={{ padding: "3px 9px", background: C.blueLight, color: C.blue, borderRadius: 99, fontSize: 9, fontWeight: 700 }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Formation */}
        <div>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: 9 }}>FORMATION</div>
          {[80, 55].map((w, i) => (
            <div key={i} style={{ height: 7, background: "#F1F5F9", borderRadius: 4, marginBottom: 5, width: `${w}%` }} />
          ))}
        </div>

        {/* Badge score ATS */}
        <div className="badge-ats" style={{ position: "absolute", top: -18, right: -18, background: C.green, color: "#fff", borderRadius: 14, padding: "10px 14px", textAlign: "center", boxShadow: `0 8px 28px rgba(16,185,129,0.4)` }}>
          <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.9, marginBottom: 2 }}>Score ATS</div>
          <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}>91</div>
          <div style={{ fontSize: 9, opacity: 0.75 }}>/100</div>
        </div>

        {/* Badge mots-clés */}
        <div className="badge-kw" style={{ position: "absolute", bottom: -14, left: -14, background: C.bg, border: `2px solid ${C.blue}`, borderRadius: 12, padding: "8px 13px", display: "flex", alignItems: "center", gap: 6, boxShadow: C.shadow }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>18 mots-clés ATS</div>
            <div style={{ fontSize: 9, color: C.slateLight }}>intégrés automatiquement</div>
          </div>
        </div>

        {/* Chrono badge */}
        <div className="badge-chrono" style={{ position: "absolute", top: 100, left: -60, background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 10, padding: "7px 11px", display: "flex", alignItems: "center", gap: 6, boxShadow: C.shadow }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E" }}>Généré en 30s</div>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Romain S.", role: "Alternant finance · Paris", result: "Alternance en 5 jours", text: "Rappelé en 5 jours après 3 semaines sans réponse.", color: C.blue },
  { name: "Emma T.", role: "Master · Toulouse", result: "Stage en 2 semaines", text: "CVAdapt a mis en avant mes projets universitaires parfaitement.", color: "#7C3AED" },
  { name: "Antoine P.", role: "Data Analyst · Paris", result: "Score ATS : 34 → 91", text: "Score passé de 34 à 91 en un clic. Résultat immédiat.", color: "#0891B2" },
  { name: "Théo V.", role: "Étudiant · Paris", result: "3 offres reçues", text: "Mon profil générique transformé en 30 secondes. 3 propositions.", color: C.green },
  { name: "Anaïs G.", role: "Marketing · Lyon", result: "Taux de réponse ×3", text: "Avant je galérais, maintenant 30 secondes. Résultat immédiat.", color: C.amber },
  { name: "Julien F.", role: "Comptable · Marseille", result: "CDI en 3 semaines", text: "Les recruteurs ont commencé à me rappeler.", color: C.red },
];

const STEPS = [
  { n: "01", icon: "📋", label: "Colle l'offre", desc: "Tu copies-colles l'offre d'emploi dans CVAdapt. Rien d'autre." },
  { n: "02", icon: "🧠", label: "L'IA analyse", desc: "Notre IA détecte les mots-clés ATS exacts que le logiciel va chercher." },
  { n: "03", icon: "🚀", label: "CV optimisé", desc: "Ton CV est réécrit et optimisé. Score ATS 85+ garanti. En 30 secondes." },
];

const BRANDS = ["Capgemini", "Société Générale", "L'Oréal", "BNP Paribas", "Decathlon", "Orange", "Thales"];

export function ModernLanding({ onNewsletter, emailStatus, email, setEmail }) {
  const containerRef = useRef(null);
  const [counters, setCounters] = useState({ pct: 0, users: 0 });
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── HERO ────────────────────────────────────────────────────────────
      gsap.set(".hero-left > *", { y: 32, autoAlpha: 0 });
      gsap.set(".cv-card", { x: 60, autoAlpha: 0, rotate: 2 });
      gsap.set(".badge-ats, .badge-kw, .badge-chrono", { scale: 0.6, autoAlpha: 0 });

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .to(".hero-left > *", { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.7 }, 0.1)
        .to(".cv-card", { x: 0, autoAlpha: 1, rotate: 0, duration: 0.9, ease: "expo.out" }, 0.35)
        .to(".badge-ats", { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.85)
        .to(".badge-kw", { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" }, 1.0)
        .to(".badge-chrono", { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" }, 1.1);

      // Floating animation for CV card
      gsap.to(".cv-card", {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });

      // ── STATS ────────────────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        once: true,
        onEnter: () => {
          const p = { val: 0 }, u = { val: 0 };
          gsap.to(p, { val: 75, duration: 2, ease: "power2.out", onUpdate: () => setCounters(c => ({ ...c, pct: Math.round(p.val) })) });
          gsap.to(u, { val: 4200, duration: 2.2, ease: "power2.out", onUpdate: () => setCounters(c => ({ ...c, users: Math.round(u.val) })) });
        },
      });
      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-section", start: "top 82%", once: true },
        y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });

      // ── LOGOS ────────────────────────────────────────────────────────────
      gsap.from(".brand-item", {
        scrollTrigger: { trigger: ".brands-section", start: "top 88%", once: true },
        y: 16, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "power2.out",
      });

      // ── STEPS ────────────────────────────────────────────────────────────
      gsap.from(".steps-header > *", {
        scrollTrigger: { trigger: ".steps-section", start: "top 82%", once: true },
        y: 36, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".step-card", {
        scrollTrigger: { trigger: ".steps-section", start: "top 76%", once: true },
        y: 70, autoAlpha: 0, stagger: 0.18, duration: 0.9, ease: "expo.out",
      });

      // ── COMPARE ──────────────────────────────────────────────────────────
      gsap.from(".compare-header > *", {
        scrollTrigger: { trigger: ".compare-section", start: "top 82%", once: true },
        y: 36, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".compare-before", {
        scrollTrigger: { trigger: ".compare-section", start: "top 76%", once: true },
        x: -60, autoAlpha: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".compare-after", {
        scrollTrigger: { trigger: ".compare-section", start: "top 76%", once: true },
        x: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out", delay: 0.12,
      });

      // SVG rings
      const circ = 2 * Math.PI * 54;
      ScrollTrigger.create({
        trigger: ".compare-section",
        start: "top 72%",
        once: true,
        onEnter: () => {
          const rb = containerRef.current?.querySelector(".ring-before");
          const ra = containerRef.current?.querySelector(".ring-after");
          if (rb) gsap.fromTo(rb, { strokeDashoffset: circ }, { strokeDashoffset: circ * (1 - 0.34), duration: 1.5, ease: "power2.out", delay: 0.3 });
          if (ra) gsap.fromTo(ra, { strokeDashoffset: circ }, { strokeDashoffset: circ * (1 - 0.91), duration: 2, ease: "power2.out", delay: 0.5 });
        },
      });

      // ── TESTIMONIALS ─────────────────────────────────────────────────────
      gsap.from(".testimonials-header > *", {
        scrollTrigger: { trigger: ".testimonials-section", start: "top 84%", once: true },
        y: 36, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".testimonials-section", start: "top 78%", once: true },
        y: 50, autoAlpha: 0, scale: 0.97, stagger: 0.08, duration: 0.8, ease: "power3.out",
      });

      // ── PRICING ──────────────────────────────────────────────────────────
      gsap.from(".pricing-header > *", {
        scrollTrigger: { trigger: ".pricing-section", start: "top 84%", once: true },
        y: 36, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".price-card", {
        scrollTrigger: { trigger: ".pricing-section", start: "top 78%", once: true },
        y: 60, autoAlpha: 0, scale: 0.95, stagger: 0.14, duration: 0.85, ease: "back.out(1.2)",
      });

      // ── FINAL CTA ────────────────────────────────────────────────────────
      gsap.from(".final-cta > *", {
        scrollTrigger: { trigger: ".final-cta", start: "top 80%", once: true },
        y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const circ = 2 * Math.PI * 54;
  const faqItems = [
    { q: "CVAdapt est-il vraiment gratuit ?", a: "Oui, 3 CV complets sont générés gratuitement, sans carte bancaire requise." },
    { q: "Comment fonctionne l'optimisation ATS ?", a: "L'IA analyse l'offre d'emploi, extrait les mots-clés exacts et réécrit votre CV pour maximiser votre score de correspondance." },
    { q: "En combien de temps est généré mon CV ?", a: "Le CV optimisé est généré en moins de 30 secondes." },
    { q: "Puis-je annuler mon abonnement ?", a: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client." },
  ];

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.navy, fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={34} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.4px", color: C.navy }}>CVAdapt</span>
        </div>
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#steps" style={{ color: C.slate, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Comment ça marche</a>
          <a href="/tarifs" style={{ color: C.slate, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Tarifs</a>
          <a href="/generate" style={{ background: C.blue, color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 12px rgba(37,99,235,0.3)" }}>Commencer gratuitement</a>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 48, maxWidth: 1200, margin: "0 auto", padding: "100px 40px 80px", position: "relative" }}>
        {/* Fond à points */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.35, pointerEvents: "none", zIndex: 0 }} />

        {/* Left */}
        <div className="hero-left" style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 24, alignSelf: "flex-start" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.amber, display: "inline-block" }} />
            87 CV optimisés aujourd'hui · Gratuit pour commencer
          </div>

          <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20, color: C.navy }}>
            Ton CV passe<br />
            <span style={{ color: C.blue }}>les filtres ATS.</span><br />
            <span style={{ color: C.slateLight, fontWeight: 700, fontSize: "0.8em" }}>En 30 secondes.</span>
          </h1>

          <p style={{ fontSize: 18, color: C.slate, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            <strong style={{ color: C.navy }}>75% des CV sont filtrés avant qu'un humain les lise.</strong>{" "}
            CVAdapt analyse l'offre et génère un CV qui passe — automatiquement.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 28px", background: C.blue, color: "#fff", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35)", transition: "transform 0.2s ease" }}>
              Générer mon CV — Gratuit 🚀
            </a>
            <a href="#steps" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 22px", background: C.bg, color: C.navy, borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", border: `2px solid ${C.border}` }}>
              Voir comment ça marche
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {[C.blue, "#7C3AED", "#0891B2", C.green, C.red].map((c, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: `2px solid ${C.bg}`, marginLeft: i > 0 ? -9 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                  {["R","E","A","T","J"][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 14, color: C.slate }}>
              <strong style={{ color: C.navy }}>4 200+ étudiants</strong> · ⭐ 4,9/5
            </span>
            <span style={{ fontSize: 12, color: C.slateLight }}>✓ Sans CB</span>
            <span style={{ fontSize: 12, color: C.slateLight }}>✓ 3 CV gratuits</span>
          </div>
        </div>

        {/* Right — mockup CV */}
        <CVMockup />
      </section>

      {/* ── MARQUES ──────────────────────────────────────────────────────────── */}
      <section className="brands-section" style={{ padding: "24px 40px 32px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slateLight, marginBottom: 18 }}>
          Utilisé par des candidats chez
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 36px", maxWidth: 800, margin: "0 auto" }}>
          {BRANDS.map(b => (
            <span key={b} className="brand-item" style={{ fontSize: 13, fontWeight: 700, color: C.slateLight, letterSpacing: "-0.3px" }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="stats-section" style={{ padding: "72px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            { value: counters.pct + "%", label: "des CV filtrés\npar les ATS", sublabel: "avant tout recruteur humain", color: C.red, bg: "#FEF2F2" },
            { value: counters.users.toLocaleString("fr-FR") + "+", label: "candidats ont\noptimisé leur CV", sublabel: "note moyenne 4,9/5", color: C.blue, bg: C.blueLight },
            { value: "30s", label: "pour générer\nun CV ATS-optimisé", sublabel: "garanti sans carte bancaire", color: C.green, bg: C.greenLight },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ background: s.bg, borderRadius: 20, padding: "32px 28px", border: `1px solid rgba(0,0,0,0.04)` }}>
              <div style={{ fontSize: "clamp(40px,5vw,60px)", fontWeight: 900, color: s.color, letterSpacing: "-2px", lineHeight: 1, marginBottom: 10, fontVariantNumeric: "tabular-nums" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, lineHeight: 1.5, marginBottom: 4, whiteSpace: "pre-line" }}>{s.label}</div>
              <div style={{ fontSize: 12, color: C.slateLight }}>{s.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────────────────────────────────── */}
      <section id="steps" className="steps-section" style={{ padding: "96px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="steps-header" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 16 }}>
              COMMENT ÇA MARCHE
            </div>
            <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 12 }}>
              Trois étapes.<br />
              <span style={{ color: C.slateLight }}>Zéro prise de tête.</span>
            </h2>
            <p style={{ fontSize: 16, color: C.slate, maxWidth: 440, margin: "0 auto" }}>
              Pas besoin de savoir ce que c'est un ATS. CVAdapt s'en charge.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative" }}>
            {/* Connecteurs */}
            <div style={{ position: "absolute", top: 44, left: "calc(33.3% - 12px)", width: "calc(33.3% + 24px)", height: 2, background: `linear-gradient(90deg, ${C.blue}, ${C.border})`, zIndex: 0 }} />
            <div style={{ position: "absolute", top: 44, left: "calc(66.6% - 12px)", width: "calc(33.4% + 12px)", height: 2, background: `linear-gradient(90deg, ${C.blue}, ${C.border})`, zIndex: 0 }} />

            {STEPS.map((step, i) => (
              <div key={i} className="step-card" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, position: "relative", zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: C.blue, marginBottom: 8 }}>ÉTAPE {step.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10, color: C.navy }}>{step.label}</h3>
                <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: C.blueLight, color: C.blue, borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", border: `1px solid rgba(37,99,235,0.2)` }}>
              Essayer gratuitement →
            </a>
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ────────────────────────────────────────────────────── */}
      <section className="compare-section" style={{ padding: "96px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="compare-header" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 16 }}>
              RÉSULTATS CONCRETS
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px" }}>
              Avant CVAdapt.{" "}
              <span style={{ color: C.slateLight }}>Après CVAdapt.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* AVANT */}
            <div className="compare-before" style={{ padding: 32, background: "#FEF2F2", border: `1px solid #FECACA`, borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 18 }}>❌</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#991B1B" }}>CV générique</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                  <svg width="80" height="80" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#FECACA" strokeWidth="12" />
                    <circle className="ring-before" cx="64" cy="64" r="54" fill="none" stroke={C.red} strokeWidth="12"
                      strokeDasharray={circ} strokeDashoffset={circ} strokeLinecap="round" transform="rotate(-90 64 64)" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: C.red }}>34</span>
                    <span style={{ fontSize: 9, color: C.slateLight }}>/100</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: C.navy, marginBottom: 4 }}>Score ATS faible</p>
                  <p style={{ fontSize: 13, color: C.slate }}>Filtré automatiquement</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Mots-clés manquants", "Structure basique", "Ignoré par l'ATS"].map(t => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.slate }}>
                    <span style={{ color: C.red, fontWeight: 700, fontSize: 12 }}>✗</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {/* APRÈS */}
            <div className="compare-after" style={{ padding: 32, background: C.greenLight, border: `1px solid #A7F3D0`, borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#065F46" }}>CV CVAdapt</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                  <svg width="80" height="80" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#A7F3D0" strokeWidth="12" />
                    <circle className="ring-after" cx="64" cy="64" r="54" fill="none" stroke={C.green} strokeWidth="12"
                      strokeDasharray={circ} strokeDashoffset={circ} strokeLinecap="round" transform="rotate(-90 64 64)" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: C.green }}>91</span>
                    <span style={{ fontSize: 9, color: C.slateLight }}>/100</span>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: C.navy, marginBottom: 4 }}>Score ATS excellent</p>
                  <p style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>Entretien en 5 jours</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Mots-clés de l'offre intégrés", "Structure optimisée ATS", "Lu par un humain"].map(t => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.navy, fontWeight: 500 }}>
                    <span style={{ color: C.green, fontWeight: 700, fontSize: 12 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ──────────────────────────────────────────────────────── */}
      <section className="testimonials-section" style={{ padding: "96px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="testimonials-header" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 14 }}>
              {[...Array(5)].map((_,i) => <span key={i} style={{ color: C.amber, fontSize: 20 }}>★</span>)}
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>
              Ils ont décroché leur poste.
            </h2>
            <p style={{ fontSize: 15, color: C.slateLight }}>4 200 candidats · Note moyenne 4,9/5</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} className="testimonial-card" style={{ padding: 24, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 18, display: "flex", flexDirection: "column", gap: 14, boxShadow: C.shadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: tm.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                      {tm.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{tm.name}</p>
                      <p style={{ fontSize: 11, color: C.slateLight }}>{tm.role}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {[...Array(5)].map((_,j) => <span key={j} style={{ color: C.amber, fontSize: 10 }}>★</span>)}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.65, flex: 1 }}>"{tm.text}"</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: C.greenLight, border: `1px solid #A7F3D0`, borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#065F46", alignSelf: "flex-start" }}>
                  ✓ {tm.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ───────────────────────────────────────────────────────────── */}
      <section className="pricing-section" style={{ padding: "96px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="pricing-header" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: C.blueLight, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 16 }}>
              TARIFS
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>Simple et transparent.</h2>
            <p style={{ fontSize: 15, color: C.slateLight }}>Commence gratuitement. Passe au plan supérieur quand tu veux.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "center" }}>
            {/* FREE */}
            <div className="price-card" style={{ padding: 30, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 22 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slateLight, marginBottom: 16 }}>GRATUIT</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: C.navy }}>0€</span>
                <span style={{ fontSize: 13, color: C.slateLight }}> / toujours</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[["3 CV gratuits", true], ["Score ATS", true], ["Analyse offre", true], ["Lettre de motivation", false], ["CV illimités", false]].map(([f, ok], i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: ok ? C.navy : C.slateLight }}>
                    <span style={{ color: ok ? C.green : C.border, fontWeight: 700 }}>{ok ? "✓" : "✗"}</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/generate" style={{ display: "block", textAlign: "center", padding: "12px", background: "#F8FAFC", border: `1px solid ${C.border}`, color: C.navy, borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                Commencer
              </a>
            </div>

            {/* ÉTUDIANT */}
            <div className="price-card" style={{ padding: 30, background: C.blue, borderRadius: 22, position: "relative", marginTop: -12, marginBottom: -12, boxShadow: "0 20px 48px rgba(37,99,235,0.3)" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: C.amber, color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
                LE PLUS POPULAIRE
              </div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>ÉTUDIANT</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>4,99€</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}> / mois</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {["15 CV / mois", "Score ATS", "Lettre de motivation", "Analyse ATS détaillée", "Support prioritaire"].map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
                    <span style={{ color: "#93C5FD", fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: "12px", background: "#fff", color: C.blue, borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Choisir Étudiant
              </a>
              <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 10 }}>Satisfait ou remboursé 7 jours</p>
            </div>

            {/* PRO */}
            <div className="price-card" style={{ padding: 30, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 22 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slateLight, marginBottom: 16 }}>PRO</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: C.navy }}>9,99€</span>
                <span style={{ fontSize: 13, color: C.slateLight }}> / mois</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {["CV illimités", "Score ATS", "Lettre de motivation", "Analyse ATS détaillée", "Support prioritaire"].map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: C.navy }}>
                    <span style={{ color: C.blue, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: "12px", border: `2px solid ${C.navy}`, color: C.navy, borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Choisir Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 40px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 900, letterSpacing: "-1px", textAlign: "center", marginBottom: 48 }}>Questions fréquentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: openFaq === i ? C.bgAlt : C.bg, border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                  <span style={{ fontWeight: 600, color: C.navy, fontSize: 15 }}>{item.q}</span>
                  <span style={{ color: C.slateLight, fontSize: 20, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", background: C.bgAlt }}>
                    <p style={{ color: C.slate, fontSize: 14, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 40px", background: C.blueLight, position: "relative", overflow: "hidden" }}>
        {/* Glow décoratif très subtil */}
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="final-cta" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 16px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 28, boxShadow: C.shadow }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
            4 200+ candidats ont déjà optimisé leur CV
          </div>

          {/* Titre */}
          <h2 style={{ fontSize: "clamp(34px,5vw,62px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, color: C.navy, marginBottom: 18 }}>
            Ton prochain entretien<br />
            <span style={{ color: C.blue }}>commence ici.</span>
          </h2>

          <p style={{ fontSize: 17, color: C.slate, lineHeight: 1.7, marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
            Gratuit pour commencer. Sans carte bancaire. Résultat en 30 secondes.
          </p>

          {/* CTA + social proof */}
          <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", background: C.blue, color: "#fff", borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,0.35), 0 1px 4px rgba(37,99,235,0.2)", letterSpacing: "-0.2px", marginBottom: 16 }}>
            Générer mon CV — Gratuit 🚀
          </a>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 56, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {[C.blue,"#7C3AED","#0891B2",C.green,C.amber].map((c,i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `2px solid ${C.blueLight}`, marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff" }}>
                  {["R","E","A","T","J"][i]}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 1 }}>
              {[...Array(5)].map((_,i) => <span key={i} style={{ color: C.amber, fontSize: 12 }}>★</span>)}
            </div>
            <span style={{ fontSize: 13, color: C.slateLight }}>4,9/5 · Sans CB · 3 CV gratuits</span>
          </div>

          {/* Newsletter — card dans le thème */}
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 24px rgba(37,99,235,0.06)" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
              Conseils CV chaque semaine
            </p>
            <p style={{ fontSize: 13, color: C.slateLight, marginBottom: 20 }}>
              Rejoins 4 200 candidats déjà abonnés. Sans spam.
            </p>
            {emailStatus === "success" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: C.green, fontWeight: 700, fontSize: 15 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✓</span>
                Inscription confirmée !
              </div>
            ) : (
              <form onSubmit={onNewsletter} style={{ display: "flex", gap: 8, maxWidth: 420, margin: "0 auto" }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ton@email.fr" required
                  style={{ flex: 1, padding: "12px 16px", background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 10, color: C.navy, fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
                <button type="submit" disabled={emailStatus === "loading"}
                  style={{ padding: "12px 20px", background: C.navy, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", opacity: emailStatus === "loading" ? 0.7 : 1, fontFamily: "inherit" }}>
                  {emailStatus === "loading" ? "..." : "S'abonner →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ padding: "32px 40px", borderTop: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={30} />
            <span style={{ fontWeight: 800, fontSize: 15, color: C.navy }}>CVAdapt</span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Blog","/blog"],["Tarifs","/tarifs"],["Générer","/generate"],["Analyser","/analyse"],["Mentions légales","/mentions-legales"],["CGU","/cgu"]].map(([label, href]) => (
              <a key={href} href={href} style={{ fontSize: 13, color: C.slateLight, textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.slateLight }}>© 2026 CVAdapt</p>
        </div>
      </footer>
    </div>
  );
}
