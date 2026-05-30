"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./components/Logo";

function getDynamicStats() {
  const base = new Date("2025-01-01");
  const now = new Date();
  const days = Math.floor((now - base) / (1000 * 60 * 60 * 24));
  const users = 12847 + Math.round(days * 7.3);
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const dailyCVs = 190 + (seed % 157);
  return { users, dailyCVs };
}

const FAQ_ITEMS = [
  { q: "C'est vraiment gratuit pour commencer ?", a: "Oui. Tu génères 3 CV complets gratuitement, sans carte bancaire. Le plan Étudiant à 4,99€/mois débloque 15 CV par mois avec score ATS et lettre de motivation." },
  { q: "Ça marche sans expérience professionnelle ?", a: "Oui, c'est fait pour ça. CVAdapt met en avant tes projets universitaires, stages, associations et compétences dans le format que les recruteurs attendent." },
  { q: "CVAdapt fonctionne pour les stages et alternances ?", a: "Oui — c'est même son point fort. Il analyse l'offre de stage ou d'alternance et adapte ton CV aux mots-clés exacts de chaque entreprise." },
  { q: "Mes données sont-elles en sécurité ?", a: "Oui. Ton contenu est utilisé uniquement pour générer le CV, puis supprimé. Paiement sécurisé via Stripe. Aucune donnée vendue." },
  { q: "En combien de temps j'obtiens mon CV ?", a: "Moins de 30 secondes. Tu colles l'offre, tu entres tes infos, et tu reçois ton CV optimisé avec score ATS et mots-clés intégrés." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const TESTIMONIALS = [
  { initials: "RS", color: "#2563eb", name: "Romain S.", role: "Alternant finance · Paris", result: "Alternance en 5 jours", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé en 5 jours." },
  { initials: "ET", color: "#7c3aed", name: "Emma T.", role: "Étudiante master · Toulouse", result: "Stage trouvé en 2 semaines", text: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement." },
  { initials: "AP", color: "#0891b2", name: "Antoine P.", role: "Data Analyst · Paris", result: "Score ATS : 34 → 91", text: "Mon score est passé de 34 à 91 en un clic. Les mots-clés manquants ajoutés automatiquement." },
  { initials: "TV", color: "#059669", name: "Théo V.", role: "Étudiant · Paris", result: "3 offres d'alternance", text: "Mon profil était générique. CVAdapt l'a transformé en 30 secondes. 3 propositions reçues." },
  { initials: "AG", color: "#dc2626", name: "Anaïs G.", role: "Chargée marketing · Lyon", result: "Taux de réponse ×3", text: "Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes. Résultat immédiat." },
  { initials: "JF", color: "#d97706", name: "Julien F.", role: "Comptable · Marseille", result: "CDI signé en 3 semaines", text: "J'envoyais des dizaines de CV sans réponse. Avec CVAdapt les recruteurs ont commencé à me rappeler." },
];

export default function Home() {
  const cvCardRef = useRef(null);
  const heroRef = useRef(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [stats, setStats] = useState({ users: 12847, dailyCVs: 247 });

  useEffect(() => {
    setStats(getDynamicStats());
  }, []);

  // 3D CV scroll rotation + header state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeaderScrolled(scrollY > 60);
      if (cvCardRef.current && heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const progress = Math.min(Math.max(scrollY / (heroH * 0.55), 0), 1);
        const e = 1 - Math.pow(1 - progress, 3);
        const rotY = 22 * (1 - e);
        const rotX = 8 * (1 - e);
        const scale = 0.93 + 0.07 * e;
        const transZ = -30 * (1 - e);
        cvCardRef.current.style.transform =
          `perspective(1400px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale}) translateZ(${transZ}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal (IntersectionObserver)
  useEffect(() => {
    const els = document.querySelectorAll(".cv-reveal, .cv-reveal-left, .cv-reveal-right, .cv-reveal-scale");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cv-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    const animate = (el, to) => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1600, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          animate(el, parseInt(el.dataset.cntTo));
          observer.unobserve(el);
        });
      },
      { threshold: 0.7 }
    );
    ["cnt-score", "cnt-pct"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  async function handleNewsletter(e) {
    e.preventDefault();
    setEmailStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setEmailStatus(res.ok ? "success" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        :root {
          --ease-expo: cubic-bezier(0.16,1,0.3,1);
          --ease-spring: cubic-bezier(0.32,0.72,0,1);
        }
        /* Scroll reveal */
        .cv-reveal { opacity:0; transform:translateY(40px); transition:opacity .7s var(--ease-expo), transform .7s var(--ease-expo); }
        .cv-reveal-left { opacity:0; transform:translateX(-48px); transition:opacity .7s var(--ease-expo), transform .7s var(--ease-expo); }
        .cv-reveal-right { opacity:0; transform:translateX(48px); transition:opacity .7s var(--ease-expo), transform .7s var(--ease-expo); }
        .cv-reveal-scale { opacity:0; transform:scale(0.86); transition:opacity .6s var(--ease-expo), transform .6s var(--ease-expo); }
        .cv-reveal.cv-visible, .cv-reveal-left.cv-visible, .cv-reveal-right.cv-visible, .cv-reveal-scale.cv-visible {
          opacity:1; transform:none;
        }
        .stagger-1 { transition-delay:.05s !important; }
        .stagger-2 { transition-delay:.13s !important; }
        .stagger-3 { transition-delay:.21s !important; }
        .stagger-4 { transition-delay:.29s !important; }
        .stagger-5 { transition-delay:.37s !important; }
        .stagger-6 { transition-delay:.45s !important; }

        /* Hero animations */
        @keyframes cv-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        @keyframes cv-floatBadge { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
        @keyframes cv-pulseOrb { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes cv-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes cv-blink { 0%,100%{opacity:.45} 50%{opacity:1} }

        /* Gradient text */
        .cv-gradient-text {
          background: linear-gradient(135deg,#60a5fa 0%,#a78bfa 50%,#f472b6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cv-shimmer-text {
          background: linear-gradient(90deg,#fff 30%,#93c5fd 50%,#fff 70%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: cv-shimmer 4s linear infinite;
        }

        /* CV 3D card */
        #cv-card-3d {
          background:#fff; border-radius:16px;
          box-shadow: 0 60px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 rgba(255,255,255,.8);
          padding:24px; position:relative;
          transform: perspective(1400px) rotateY(22deg) rotateX(8deg) scale(0.93);
          transition: transform .1s linear;
          will-change: transform;
        }
        .cv-ats-badge {
          position:absolute; top:-20px; right:-20px;
          width:76px; height:76px; border-radius:50%;
          background: linear-gradient(135deg,#16a34a,#22c55e);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          box-shadow:0 8px 28px rgba(34,197,94,.55); border:3px solid #fff; z-index:10;
          animation: cv-floatBadge 3s ease-in-out infinite;
        }

        /* Flip card */
        .cv-flip-stage { perspective:900px; cursor:pointer; }
        .cv-flip-wrap { width:100%; height:100%; transform-style:preserve-3d; transition:transform 1s var(--ease-spring); position:relative; }
        .cv-flip-stage:hover .cv-flip-wrap { transform:rotateY(180deg); }
        .cv-face { position:absolute; inset:0; border-radius:18px; padding:22px; backface-visibility:hidden; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,.12); }
        .cv-face-back { background:linear-gradient(160deg,#1e3a8a,#2563eb,#7c3aed); transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }
        .cv-hover-hint { animation: cv-blink 2s ease-in-out infinite; }

        /* Hover effects */
        .cv-step-card { transition:transform .3s var(--ease-spring), box-shadow .3s, border-color .3s; }
        .cv-step-card:hover { transform:translateY(-8px); box-shadow:0 24px 48px rgba(0,0,0,.07); border-color:#bfdbfe; }
        .cv-testi-card { transition:transform .3s var(--ease-spring), box-shadow .3s, border-color .3s; }
        .cv-testi-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,.06); border-color:#bfdbfe; }
        .cv-price-card { transition:transform .3s var(--ease-spring); }
        .cv-price-card:hover { transform:translateY(-4px); }
        .cv-ba-card { transition:transform .3s var(--ease-spring), background .3s; }
        .cv-ba-card:hover { transform:translateY(-4px); }

        /* Orbs */
        .cv-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .cv-orb-1 { width:600px; height:600px; background:rgba(99,102,241,.18); top:-100px; right:-100px; animation:cv-pulseOrb 6s ease-in-out infinite; }
        .cv-orb-2 { width:400px; height:400px; background:rgba(37,99,235,.15); bottom:-50px; left:-50px; animation:cv-pulseOrb 8s 2s ease-in-out infinite; }

        /* Nav transition */
        .cv-header { transition: background .3s, border-color .3s; }

        /* Hero CTA button */
        .cv-btn-hero:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(37,99,235,.5) !important; }
        .cv-btn-cta:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 20px 60px rgba(0,0,0,.32) !important; }

        /* Hero entrance animations */
        .cv-hero-badge { animation: cv-fadeUp .6s var(--ease-expo) both; }
        .cv-hero-h1 { animation: cv-fadeUp .6s .08s var(--ease-expo) both; }
        .cv-hero-sub { animation: cv-fadeUp .6s .16s var(--ease-expo) both; }
        .cv-hero-ctas { animation: cv-fadeUp .6s .24s var(--ease-expo) both; }
        .cv-hero-trust { animation: cv-fadeUp .6s .32s var(--ease-expo) both; }
        .cv-hero-card { animation: cv-fadeUp .7s .15s var(--ease-expo) both; }

        /* Grid lines */
        .cv-hero-grid {
          position:absolute; inset:0;
          background-image: linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
          background-size: 48px 48px;
        }
        /* Steps connector */
        .cv-steps-connector {
          position:absolute; top:38px; left:calc(33.33% - 8px); right:calc(33.33% - 8px);
          height:2px; background:linear-gradient(90deg,#dbeafe,#2563eb,#dbeafe); z-index:0;
        }

        /* FAQ */
        .cv-faq-a { max-height:0; overflow:hidden; transition:max-height .45s var(--ease-expo); }
        .cv-faq-open .cv-faq-a { max-height:200px; }
        .cv-faq-icon { transition:transform .35s var(--ease-spring), background .2s; }
        .cv-faq-open .cv-faq-icon { transform:rotate(45deg); background:#dbeafe; }

        /* CV lines for mockup */
        .cvl { height:5px; border-radius:3px; background:#f1f5f9; margin-bottom:5px; }
        .cvl-d { background:#e2e8f0; }
        .cvl-m { width:75%; }
        .cvl-s { width:55%; }
        .cvl-xs { width:38%; }
      `}</style>

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header
        className="cv-header"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "14px 0",
          background: headerScrolled ? "rgba(255,255,255,.94)" : "rgba(255,255,255,0)",
          backdropFilter: "blur(20px)",
          borderBottom: headerScrolled ? "1px solid rgba(37,99,235,.1)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Logo size={32} />
            <span style={{ fontSize: 18, fontWeight: 800, color: headerScrolled ? "#1d4ed8" : "#fff", transition: "color .3s" }}>CVAdapt</span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[["#comment-ca-marche", "Comment ça marche"], ["/tarifs", "Tarifs"], ["/blog", "Blog"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "8px 14px", borderRadius: 8,
                color: headerScrolled ? "#64748b" : "rgba(255,255,255,.75)",
                transition: "color .2s",
              }}>{label}</a>
            ))}
            <a href="/generate" style={{
              fontSize: 13, fontWeight: 700, textDecoration: "none", padding: "9px 20px", borderRadius: 999,
              background: headerScrolled ? "#2563eb" : "rgba(255,255,255,.15)",
              color: "#fff",
              border: headerScrolled ? "none" : "1px solid rgba(255,255,255,.25)",
              boxShadow: headerScrolled ? "0 4px 14px rgba(37,99,235,.3)" : "none",
              transition: "all .2s",
            }}>Commencer gratuitement →</a>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — CV tourne en 3D en scrollant
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh", paddingTop: 90, paddingBottom: 80,
          background: "linear-gradient(160deg,#060d1f 0%,#0f2460 45%,#1d4ed8 100%)",
          display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
        }}
      >
        <div className="cv-orb cv-orb-1" />
        <div className="cv-orb cv-orb-2" />
        <div className="cv-hero-grid" />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 60, alignItems: "center" }}>

            {/* LEFT — texte */}
            <div>
              <div className="cv-hero-badge" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)",
                color: "#93c5fd", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 999,
                marginBottom: 24, backdropFilter: "blur(8px)",
              }}>
                🎓 <span>Gratuit pour les étudiants · Sans carte bancaire</span>
              </div>

              <h1
                className="cv-hero-h1"
                style={{ fontSize: "clamp(40px,4.5vw,66px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, letterSpacing: "-2.5px", marginBottom: 22 }}
              >
                Ton profil est bon.<br />
                Ton CV<br />
                <span className="cv-gradient-text">te trahit.</span>
              </h1>

              <p className="cv-hero-sub" style={{ fontSize: 17, color: "rgba(255,255,255,.62)", lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                75% des CV sont rejetés par un algorithme avant d&apos;atteindre un humain. CVAdapt injecte les bons mots-clés et corrige ça en 30 secondes.
              </p>

              <div className="cv-hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
                <a href="/generate" className="cv-btn-hero" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#2563eb", color: "#fff", fontWeight: 800, fontSize: 16,
                  padding: "15px 34px", borderRadius: 999, textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(37,99,235,.45)", transition: "all .25s cubic-bezier(0.32,0.72,0,1)",
                }}>
                  🚀 Générer mon CV — C&apos;est gratuit
                </a>
                <a href="#comment-ca-marche" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "2px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.85)",
                  fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 999,
                  textDecoration: "none", transition: "all .2s",
                }}>Comment ça marche</a>
              </div>

              <div className="cv-hero-trust" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex" }}>
                  {[["#2563eb","R"],["#7c3aed","E"],["#0891b2","A"],["#059669","T"],["#dc2626","J"]].map(([bg, l], i) => (
                    <span key={i} style={{
                      width: 32, height: 32, borderRadius: "50%", background: bg,
                      border: "2.5px solid rgba(255,255,255,.15)", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 11,
                      fontWeight: 800, color: "#fff", marginLeft: i === 0 ? 0 : -10,
                    }}>{l}</span>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>
                  <strong style={{ color: "rgba(255,255,255,.85)" }}>13 400+ étudiants</strong> · ⭐ 4,9/5
                </span>
              </div>
            </div>

            {/* RIGHT — CV 3D */}
            <div className="cv-hero-card" style={{ perspective: 1400 }}>
              <div ref={cvCardRef} id="cv-card-3d">
                {/* Badge ATS flottant */}
                <div className="cv-ats-badge">
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>91</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,.85)", fontWeight: 700, letterSpacing: ".05em" }}>ATS</span>
                </div>

                {/* Header CV */}
                <div style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: 10, padding: "14px 16px", marginBottom: 14, color: "#fff" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-.3px" }}>Sophie Dubois</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginTop: 2 }}>Chargée de Marketing Digital · Alternance</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
                    {["📍 Paris", "sophie@email.fr", "LinkedIn"].map(c => <span key={c} style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>{c}</span>)}
                  </div>
                </div>

                {/* Compétences */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 6, paddingBottom: 4, borderBottom: "1.5px solid #e2e8f0" }}>Compétences clés</div>
                  <div>
                    {[["#dbeafe","#1e40af","SEO/SEA"],["#dbeafe","#1e40af","Google Analytics"],["#dcfce7","#166534","Marketing digital"],["#fef3c7","#92400e","✨ CRM Salesforce"],["#dcfce7","#166534","A/B Testing"],["#fef3c7","#92400e","✨ Growth Hacking"],["#dbeafe","#1e40af","HubSpot"]].map(([bg, color, label]) => (
                      <span key={label} style={{ display: "inline-block", background: bg, color, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, margin: "2px 2px 2px 0" }}>{label}</span>
                    ))}
                  </div>
                </div>

                {/* Expérience */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 6, paddingBottom: 4, borderBottom: "1.5px solid #e2e8f0" }}>Expérience</div>
                  <div className="cvl cvl-d" style={{ width: "90%" }} /><div className="cvl cvl-m" /><div className="cvl" style={{ width: "85%" }} /><div className="cvl cvl-s" />
                </div>

                {/* Formation */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 6, paddingBottom: 4, borderBottom: "1.5px solid #e2e8f0" }}>Formation</div>
                  <div className="cvl cvl-d cvl-m" /><div className="cvl cvl-s" /><div className="cvl cvl-xs" />
                </div>

                {/* Mini score bars */}
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Mots-clés","94%","#22c55e"],["Structure","88%","#3b82f6"],["Lisibilité","91%","#8b5cf6"]].map(([label, pct, color]) => (
                    <div key={label} style={{ flex: 1 }}>
                      <div style={{ fontSize: 8, color: "#94a3b8", marginBottom: 3 }}>{label}</div>
                      <div style={{ background: "#f1f5f9", borderRadius: 3, height: 4, overflow: "hidden" }}>
                        <div style={{ width: pct, height: "100%", background: color, borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <section style={{ padding: "24px 0", background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".1em", whiteSpace: "nowrap" }}>Ils ont décroché des postes chez</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            {["Capgemini","Société Générale","L'Oréal","BNP Paribas","Decathlon","Orange","Thales"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", fontStyle: "italic" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMENT ÇA MARCHE
      ══════════════════════════════════════════ */}
      <section id="comment-ca-marche" style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }} className="cv-reveal">
            <span style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>Simple</span>
          </div>
          <h2 className="cv-reveal" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#0f172a", textAlign: "center", letterSpacing: "-1.5px", marginBottom: 14 }}>3 étapes. 30 secondes.</h2>
          <p className="cv-reveal" style={{ textAlign: "center", color: "#64748b", fontSize: 16, marginBottom: 60 }}>De l&apos;offre d&apos;emploi au CV optimisé ATS — sans effort</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative" }}>
            <div className="cv-steps-connector" />
            {[
              { n:"1", emoji:"📋", title:"Colle l'offre", desc:"Copie n'importe quelle offre depuis LinkedIn, Indeed, APEC ou directement depuis le site de l'entreprise." },
              { n:"2", emoji:"✍️", title:"Entre tes infos", desc:"Ton expérience, tes compétences, ta formation. Tu peux aussi coller ton ancien CV — CVAdapt s'en occupe." },
              { n:"3", emoji:"🚀", title:"Reçois ton CV", desc:"Score ATS, mots-clés intégrés automatiquement, lettre de motivation incluse. PDF prêt à envoyer." },
            ].map((step, i) => (
              <div key={step.n} className={`cv-step-card cv-reveal stagger-${i + 1}`} style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", border: "1.5px solid #e2e8f0", position: "relative", zIndex: 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#2563eb,#818cf8)", color: "#fff", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 6px 18px rgba(37,99,235,.3)" }}>{step.n}</div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{step.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-.3px" }}>{step.title}</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="cv-reveal" style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,.3)" }}>
              Essayer gratuitement 🎓
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FLIP CARD — La transformation en 30s
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", background: "#fff", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%,#eff6ff,transparent)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            {/* Texte */}
            <div>
              <div style={{ marginBottom: 14 }}>
                <span className="cv-reveal-left" style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>Magie IA</span>
              </div>
              <h2 className="cv-reveal-left" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-1.5px", marginBottom: 14, lineHeight: 1.1 }}>La transformation<br />en 30 secondes</h2>
              <p className="cv-reveal-left" style={{ color: "#64748b", fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>Survole la carte pour voir ton CV passer de générique à optimisé ATS.</p>
              {[
                ["✨","Mots-clés intégrés automatiquement","CVAdapt analyse l'offre et injecte les termes exacts que l'ATS cherche."],
                ["📊","Score ATS en temps réel","Vois ton score monter de 34 à 91 en un clic."],
                ["⚡","30 secondes chrono","Pas de template à remplir, pas de mise en forme. Juste le résultat."],
              ].map(([icon, title, desc]) => (
                <div key={title} className="cv-reveal-left" style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                  <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                    <strong style={{ color: "#0f172a", display: "block", marginBottom: 2 }}>{title}</strong>{desc}
                  </div>
                </div>
              ))}
              <div className="cv-reveal-left" style={{ marginTop: 28 }}>
                <a href="/analyse" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,.3)" }}>
                  Analyser mon CV gratuitement →
                </a>
              </div>
            </div>

            {/* Flip card */}
            <div className="cv-reveal-right" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="cv-flip-stage" style={{ width: 300, height: 400 }}>
                <div className="cv-flip-wrap">
                  {/* Avant */}
                  <div className="cv-face" style={{ background: "#fff" }}>
                    <div style={{ background: "#fef2f2", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>❌</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#b91c1c" }}>CV générique</div>
                        <div style={{ fontSize: 10, color: "#ef4444", fontWeight: 600 }}>Score ATS : 34/100 · Filtré</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 8, letterSpacing: ".05em" }}>JEAN MARTIN — Étudiant</div>
                    <div className="cvl cvl-d" style={{ width: "90%" }} /><div className="cvl cvl-m" /><div className="cvl" style={{ width: "85%" }} /><div className="cvl cvl-xs" style={{ marginBottom: 14 }} />
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#d1d5db", textTransform: "uppercase", marginBottom: 6 }}>Compétences</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                      {["Microsoft Office","Travail en équipe","Dynamique","Rigoureux"].map(k => (
                        <span key={k} style={{ background: "#f3f4f6", color: "#9ca3af", fontSize: 9, padding: "3px 8px", borderRadius: 4 }}>{k}</span>
                      ))}
                    </div>
                    <div className="cvl" style={{ width: "85%" }} /><div className="cvl cvl-m" /><div className="cvl cvl-s" /><div className="cvl cvl-xs" />
                    <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 11, color: "#d1d5db", fontWeight: 600 }}>👆 Survole pour transformer</div>
                  </div>

                  {/* Après */}
                  <div className="cv-face cv-face-back">
                    <div style={{ fontSize: 20, marginBottom: 4 }}>🎯</div>
                    <div style={{ fontSize: 88, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-4px" }}>91</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,.65)", fontWeight: 600 }}>Score ATS</div>
                    <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 22px", borderRadius: 999 }}>+57 points en 30 secondes</div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                      {["✓ 12 mots-clés intégrés automatiquement","✓ Structure optimisée pour l'ATS","✓ Lettre de motivation incluse","✓ PDF prêt à envoyer"].map(item => (
                        <div key={item} style={{ background: "rgba(255,255,255,.08)", borderRadius: 10, padding: "9px 14px", fontSize: 12, color: "rgba(255,255,255,.9)" }}>{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="cv-hover-hint" style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 16 }}>👆 Survole la carte</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AVANT / APRÈS — dark section
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 80% 50%,rgba(37,99,235,.18),transparent)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

            {/* Texte */}
            <div>
              <span className="cv-reveal-left" style={{ display: "inline-block", background: "rgba(37,99,235,.2)", color: "#93c5fd", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999, marginBottom: 14 }}>Résultats concrets</span>
              <h2 className="cv-reveal-left" style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", marginBottom: 14, lineHeight: 1.1 }}>De 34 à 91<br />en un clic</h2>
              <p className="cv-reveal-left" style={{ color: "rgba(255,255,255,.5)", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
                Les algorithmes ATS rejettent 75% des CV avant qu&apos;un humain les lise. CVAdapt corrige ça automatiquement.
              </p>
              <div className="cv-reveal-left" style={{ display: "flex", gap: 40, marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
                    <span id="cnt-score" data-cnt-to="91">0</span><span style={{ fontSize: 22, color: "#60a5fa" }}>pts</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4, fontWeight: 500 }}>Score ATS moyen</div>
                </div>
                <div>
                  <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
                    <span id="cnt-pct" data-cnt-to="3">0</span><span style={{ fontSize: 22, color: "#60a5fa" }}>×</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4, fontWeight: 500 }}>Plus de rappels</div>
                </div>
              </div>
              <div className="cv-reveal-left">
                <a href="/generate" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(37,99,235,.3)" }}>
                  Optimiser mon CV →
                </a>
              </div>
            </div>

            {/* Cards */}
            <div className="cv-reveal-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "❌  CV générique — avant CVAdapt", accent: null, bars: [["Mots-clés","28%","#ef4444",28],["Structure","45%","#f97316",45],["Lisibilité","38%","#eab308",38]], score: 34, scoreColor: "#ef4444", ring: 85 },
                { label: "✅  CV optimisé — après CVAdapt", accent: "+57 pts", bars: [["Mots-clés","94%","#22c55e",94],["Structure","88%","#3b82f6",88],["Lisibilité","91%","#8b5cf6",91]], score: 91, scoreColor: "#22c55e", ring: 228 },
              ].map((card, i) => (
                <div key={i} className="cv-ba-card" style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${i === 1 ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.07)"}`, borderRadius: 20, padding: 22 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    {card.label}
                    {card.accent && <span style={{ background: "#22c55e", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 99, marginLeft: "auto" }}>{card.accent}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <svg width="72" height="72" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="12"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke={card.scoreColor} strokeWidth="12"
                          strokeDasharray={`${card.ring} 251`} strokeLinecap="round" transform="rotate(-90 50 50)"/>
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 17, fontWeight: 900, color: card.scoreColor, lineHeight: 1 }}>{card.score}</span>
                        <span style={{ fontSize: 9, color: "#64748b" }}>/100</span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {card.bars.map(([label, pct, color, w]) => (
                        <div key={label} style={{ marginBottom: 7 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 3 }}>
                            <span>{label}</span><span style={{ fontWeight: 700, color: "rgba(255,255,255,.8)" }}>{pct}</span>
                          </div>
                          <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 4, height: 5, overflow: "hidden" }}>
                            <div style={{ width: `${w}%`, height: "100%", background: color, borderRadius: 4 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TÉMOIGNAGES
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="cv-reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>Témoignages</span>
          </div>
          <h2 className="cv-reveal" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#0f172a", textAlign: "center", letterSpacing: "-1.5px", marginBottom: 14 }}>
            {stats.users.toLocaleString("fr-FR")} étudiants ont décroché leurs entretiens
          </h2>
          <p className="cv-reveal" style={{ textAlign: "center", color: "#64748b", fontSize: 16, marginBottom: 60 }}>Stages, alternances, premiers emplois</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`cv-testi-card cv-reveal stagger-${i + 1}`} style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{t.role}</div>
                    </div>
                  </div>
                  <span style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 1 }}>★★★★★</span>
                </div>
                <div style={{ display: "inline-block", background: "#dcfce7", color: "#166534", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, marginBottom: 10 }}>✓ {t.result}</div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TARIFS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="cv-reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>Tarifs</span>
          </div>
          <h2 className="cv-reveal" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#0f172a", textAlign: "center", letterSpacing: "-1.5px", marginBottom: 14 }}>Prix pensés pour les étudiants</h2>
          <p className="cv-reveal" style={{ textAlign: "center", color: "#64748b", fontSize: 16, marginBottom: 60 }}>Sans engagement · Annule quand tu veux</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "center" }}>
            {/* FREE */}
            <div className="cv-price-card cv-reveal stagger-1" style={{ background: "#f8fafc", borderRadius: 24, padding: 32, border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Gratuit</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#0f172a", letterSpacing: "-2.5px", marginBottom: 4 }}>0€</div>
              <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 28 }}>pour toujours</div>
              <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {[["3 CV à vie",true],["4 templates",true],["Téléchargement PDF",true],["Score ATS complet",false],["Lettre de motivation",false]].map(([f, ok]) => (
                  <li key={String(f)} style={{ fontSize: 14, color: ok ? "#475569" : "#cbd5e1", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, color: ok ? "#2563eb" : "#e2e8f0", fontSize: 12 }}>{ok ? "✓" : "✗"}</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/generate" style={{ display: "block", textAlign: "center", padding: 14, borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: "none", border: "2px solid #e2e8f0", color: "#0f172a", transition: "all .2s" }}>Commencer</a>
            </div>

            {/* ÉTUDIANT */}
            <div className="cv-price-card cv-reveal stagger-2" style={{ background: "linear-gradient(160deg,#1e40af 0%,#2563eb 60%,#4f46e5 100%)", borderRadius: 24, padding: "48px 32px", margin: "-20px 0", border: "none", boxShadow: "0 28px 70px rgba(37,99,235,.38)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Étudiant</span>
                <span style={{ background: "#fbbf24", color: "#78350f", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>⭐ Populaire</span>
              </div>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", letterSpacing: "-2.5px", marginBottom: 4 }}>4,99€</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 28 }}>/mois</div>
              <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {["15 CV par mois","Score ATS complet","4 templates","Lettre de motivation","Mots-clés automatiques","Support prioritaire"].map(f => (
                  <li key={f} style={{ fontSize: 14, color: "rgba(255,255,255,.85)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, color: "#86efac", fontSize: 12 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: 14, borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: "none", background: "#fff", color: "#1d4ed8", transition: "all .2s" }}>Choisir Étudiant →</a>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textAlign: "center", marginTop: 14 }}>Satisfait ou remboursé sous 7 jours</div>
            </div>

            {/* PRO */}
            <div className="cv-price-card cv-reveal stagger-3" style={{ background: "#f8fafc", borderRadius: 24, padding: 32, border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Pro</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#0f172a", letterSpacing: "-2.5px", marginBottom: 4 }}>14,99€</div>
              <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 28 }}>/mois</div>
              <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {["CV illimités","Score ATS complet","4 templates","Lettre de motivation","Conseils personnalisés","Support prioritaire"].map(f => (
                  <li key={f} style={{ fontSize: 14, color: "#475569", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, color: "#2563eb", fontSize: 12 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" style={{ display: "block", textAlign: "center", padding: 14, borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: "none", background: "#0f172a", color: "#fff", transition: "all .2s" }}>Choisir Pro →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="cv-reveal" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#0f172a", textAlign: "center", letterSpacing: "-1.5px", marginBottom: 48 }}>Questions fréquentes</h2>
          <div className="cv-reveal" style={{ maxWidth: 680, margin: "0 auto", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 20, overflow: "hidden" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={openFaq === i ? "cv-faq-open" : ""}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-outfit, Outfit, system-ui, sans-serif)", fontSize: 15, fontWeight: 600, color: "#0f172a", textAlign: "left", gap: 16, borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}
                >
                  {item.q}
                  <span className="cv-faq-icon" style={{ width: 26, height: 26, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, lineHeight: 1 }}>+</span>
                </button>
                <div className="cv-faq-a">
                  <p style={{ padding: "0 24px 20px", fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL + NEWSLETTER
      ══════════════════════════════════════════ */}
      <section style={{ padding: "120px 0", background: "linear-gradient(140deg,#060d1f 0%,#0f2460 40%,#1d4ed8 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,.15)", top: -150, right: -100, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(37,99,235,.15)", bottom: -120, left: -80, filter: "blur(80px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="cv-reveal" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", marginBottom: 16, lineHeight: 1.1 }}>
            <span className="cv-shimmer-text">3 CV gratuits.</span><br />
            Aucune carte. 30 secondes.
          </h2>
          <p className="cv-reveal" style={{ fontSize: 17, color: "rgba(255,255,255,.5)", marginBottom: 40 }}>
            {stats.users.toLocaleString("fr-FR")} étudiants l&apos;ont utilisé pour décrocher leurs entretiens.
          </p>
          <div className="cv-reveal">
            <a href="/analyse" className="cv-btn-cta" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#fff", color: "#1d4ed8", fontWeight: 800, fontSize: 18,
              padding: "18px 44px", borderRadius: 999, textDecoration: "none",
              boxShadow: "0 12px 44px rgba(0,0,0,.25)", transition: "all .3s cubic-bezier(0.32,0.72,0,1)",
            }}>🎯 Analyser mon CV gratuitement →</a>
          </div>
          <div className="cv-reveal" style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,.3)" }}>
            ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Résultat en 30 secondes &nbsp;·&nbsp; ✓ 3 CV gratuits
          </div>

          {/* Newsletter */}
          <div className="cv-reveal" style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 40, marginTop: 60 }}>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, marginBottom: 16 }}>Reçois des conseils emploi chaque semaine</p>
            {emailStatus === "success" ? (
              <p style={{ color: "#86efac", fontSize: 14, fontWeight: 600 }}>✓ Merci, tu es inscrit !</p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex", gap: 8, maxWidth: 360, margin: "0 auto" }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ton@email.fr" required
                  style={{ flex: 1, padding: "11px 16px", borderRadius: 12, border: "none", background: "rgba(255,255,255,.1)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                <button type="submit" disabled={emailStatus === "loading"}
                  style={{ background: "#fbbf24", color: "#78350f", fontWeight: 700, padding: "11px 20px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "inherit", whiteSpace: "nowrap" }}>
                  {emailStatus === "loading" ? "..." : "S'inscrire"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ padding: "40px 0", background: "#060d1f", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Logo size={26} />
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>CVAdapt</span>
          </a>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["/blog","Blog"],["/tarifs","Tarifs"],["/generate","Générer un CV"],["/analyse","Analyser mon CV"],["/mentions-legales","Mentions légales"],["/cgu","CGU"]].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: 13, color: "#334155", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#1e293b" }}>© 2025 CVAdapt 🇫🇷</p>
        </div>
      </footer>
    </>
  );
}
