"use client";
import { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   CVScroll3D
   A realistic A4 CV sheet that spins into view as the user scrolls.
   The document starts at a steep 3D angle (like a card on a table viewed
   from the side), then rotates face-on, simulating a physical paper flip.
   ───────────────────────────────────────────────────────────────────────── */

export function CVScroll3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 40%"],
  });

  /* Raw transforms */
  const rotYRaw  = useTransform(scrollYProgress, [0, 1], [-72, 0]);
  const rotXRaw  = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.58, 1]);
  const yRaw     = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opRaw    = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  /* Shadow tracks the tilt angle — long & blue when tilted, soft when flat */
  const shY  = useTransform(scrollYProgress, [0, 1], [8, 50]);
  const shBl = useTransform(scrollYProgress, [0, 1], [12, 90]);

  /* Spring physics for physical feel */
  const sp = { stiffness: 55, damping: 16, mass: 1.1 };
  const rotY  = useSpring(rotYRaw,  sp);
  const rotX  = useSpring(rotXRaw,  sp);
  const scale = useSpring(scaleRaw, sp);
  const y     = useSpring(yRaw,     sp);

  const boxShadow = useTransform(
    [shY, shBl],
    ([sy, sb]: number[]) =>
      `0 ${sy}px ${sb}px -12px rgba(29,78,216,0.22), 0 ${Math.round(sy * 0.5)}px ${Math.round(sb * 0.45)}px -8px rgba(0,0,0,0.14)`,
  );

  return (
    /* Tall container gives the scroll room to play */
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "190vh" }}
    >
      {/* Sticky so the document stays on screen while scroll drives the rotation */}
      <div
        className="sticky flex items-center justify-center w-full overflow-visible"
        style={{ top: "12vh", paddingBottom: "8vh" }}
      >
        {/* Deep perspective wrapper */}
        <div style={{ perspective: "2600px", perspectiveOrigin: "50% 45%" }}>
          <motion.div
            style={{
              rotateY: rotY,
              rotateX: rotX,
              scale,
              y,
              opacity: opRaw,
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              boxShadow,
            }}
            className="relative bg-white overflow-hidden"
          >
            <CVPage />

            {/* Paper edge — gives it physical depth */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-px"
              style={{ background: "rgba(0,0,0,0.06)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "rgba(0,0,0,0.06)" }}
            />
            {/* Top-edge highlight */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.9) 20%,rgba(255,255,255,0.9) 80%,transparent)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── The actual CV document ────────────────────────────────────────────── */
function CVPage() {
  return (
    <div
      className="relative select-none"
      style={{
        width: 480,
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: 11,
        color: "#1e293b",
        background: "#fff",
      }}
    >
      {/* Blue header band */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
          padding: "28px 28px 22px",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 4,
              }}
            >
              Alexandre Martin
            </p>
            <p style={{ fontSize: 12, color: "#93c5fd", fontWeight: 600 }}>
              Développeur Web Full Stack
            </p>
          </div>
          {/* ATS score badge */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 10,
              padding: "6px 10px",
              textAlign: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <p style={{ color: "#86efac", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>91</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 8, fontWeight: 600, letterSpacing: "0.08em", marginTop: 1 }}>
              SCORE ATS
            </p>
          </div>
        </div>

        {/* Contact row */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
          }}
        >
          {[
            { icon: "✉", text: "alexandre@email.com" },
            { icon: "📱", text: "06 12 34 56 78" },
            { icon: "📍", text: "Paris, France" },
            { icon: "🔗", text: "linkedin.com/in/alexandre" },
          ].map((c) => (
            <span key={c.text} style={{ color: "rgba(255,255,255,0.75)", fontSize: 9, display: "flex", alignItems: "center", gap: 4 }}>
              <span>{c.icon}</span>
              {c.text}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 28px 24px", display: "grid", gridTemplateColumns: "1fr 148px", gap: "0 20px" }}>

        {/* Left column — main content */}
        <div>
          {/* Section: Expérience */}
          <Section title="EXPÉRIENCE">
            <Job
              title="Développeur Frontend"
              company="TechStartup Paris"
              period="Mars – Août 2024"
              bullets={[
                "Développement de composants React / TypeScript",
                "Optimisation LCP : −40% temps de chargement",
                "Intégration API REST + gestion Redux Toolkit",
              ]}
            />
            <Job
              title="Alternance Développeur Web"
              company="Agence Digitale Lyon"
              period="Sept 2023 – Mars 2024"
              bullets={[
                "Refonte e-commerce Next.js + Stripe : +30% conversion",
                "Mise en place pipeline CI/CD GitHub Actions",
                "Responsive design mobile-first (Figma → code)",
              ]}
            />
          </Section>

          {/* Section: Formation */}
          <Section title="FORMATION">
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: 10.5, color: "#0f172a" }}>Master Informatique</p>
                <p style={{ fontSize: 9, color: "#64748b" }}>2022 – 2024</p>
              </div>
              <p style={{ color: "#3b82f6", fontSize: 9.5, fontWeight: 600 }}>École Polytechnique de Paris</p>
              <p style={{ color: "#64748b", fontSize: 9, marginTop: 2 }}>Spécialisation Web & Cloud Computing</p>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: 700, fontSize: 10.5, color: "#0f172a" }}>BUT Informatique</p>
                <p style={{ fontSize: 9, color: "#64748b" }}>2019 – 2022</p>
              </div>
              <p style={{ color: "#3b82f6", fontSize: 9.5, fontWeight: 600 }}>IUT Paris Descartes — Mention Très Bien</p>
            </div>
          </Section>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Skills */}
          <Section title="COMPÉTENCES">
            {[
              { name: "React / Next.js", pct: 92 },
              { name: "TypeScript", pct: 88 },
              { name: "Node.js", pct: 80 },
              { name: "PostgreSQL", pct: 75 },
              { name: "Docker / CI/CD", pct: 70 },
            ].map((s) => (
              <div key={s.name} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: "#334155" }}>{s.name}</span>
                  <span style={{ fontSize: 8, color: "#3b82f6", fontWeight: 700 }}>{s.pct}%</span>
                </div>
                <div style={{ height: 3, background: "#e0ecff", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: "linear-gradient(90deg,#3b82f6,#1d4ed8)", borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </Section>

          {/* Languages */}
          <Section title="LANGUES">
            {[
              { lang: "Français", level: "Natif" },
              { lang: "Anglais",  level: "C1" },
              { lang: "Espagnol", level: "B2" },
            ].map((l) => (
              <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 9, fontWeight: 600, color: "#334155" }}>{l.lang}</span>
                <span
                  style={{
                    fontSize: 8, fontWeight: 700, color: "#1d4ed8",
                    background: "#eff6ff", padding: "1px 6px", borderRadius: 99,
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {l.level}
                </span>
              </div>
            ))}
          </Section>

          {/* CVAdapt stamp */}
          <div
            style={{
              marginTop: 16,
              background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
              border: "1px solid #bfdbfe",
              borderRadius: 8,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 8, fontWeight: 800, color: "#1d4ed8", letterSpacing: "0.05em" }}>
              ✓ OPTIMISÉ PAR CVADAPT
            </p>
            <p style={{ fontSize: 7, color: "#60a5fa", marginTop: 2 }}>
              Mots-clés ATS intégrés · Score 91/100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 8,
          fontWeight: 800,
          color: "#1d4ed8",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottom: "1.5px solid #bfdbfe",
          paddingBottom: 4,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Job({
  title,
  company,
  period,
  bullets,
}: {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <p style={{ fontWeight: 700, fontSize: 10.5, color: "#0f172a" }}>{title}</p>
        <p style={{ fontSize: 8.5, color: "#64748b", flexShrink: 0 }}>{period}</p>
      </div>
      <p style={{ color: "#3b82f6", fontSize: 9.5, fontWeight: 600, marginBottom: 4 }}>{company}</p>
      <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
        {bullets.map((b) => (
          <li
            key={b}
            style={{ fontSize: 9, color: "#475569", lineHeight: 1.55, marginBottom: 2, paddingLeft: 10, position: "relative" }}
          >
            <span style={{ position: "absolute", left: 0, color: "#3b82f6", fontWeight: 700 }}>›</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
