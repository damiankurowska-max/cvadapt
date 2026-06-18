"use client";
import { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";

export function CVScroll3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 42%"],
  });

  const rotYRaw  = useTransform(scrollYProgress, [0, 1], [-78, 0]);
  const rotXRaw  = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const yRaw     = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opRaw    = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const shY      = useTransform(scrollYProgress, [0, 1], [6,  55]);
  const shBl     = useTransform(scrollYProgress, [0, 1], [10, 100]);

  const sp = { stiffness: 52, damping: 17, mass: 1.1 };
  const rotY  = useSpring(rotYRaw,  sp);
  const rotX  = useSpring(rotXRaw,  sp);
  const scale = useSpring(scaleRaw, sp);
  const y     = useSpring(yRaw,     sp);

  const boxShadow = useTransform(
    [shY, shBl],
    ([sy, sb]: number[]) =>
      `0 ${sy}px ${sb}px -10px rgba(15,37,96,0.25), 0 ${Math.round(sy * 0.4)}px ${Math.round(sb * 0.4)}px -8px rgba(0,0,0,0.12)`,
  );

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "200vh" }}>
      <div
        className="sticky flex items-center justify-center w-full"
        style={{ top: "10vh" }}
      >
        <div style={{ perspective: "2800px", perspectiveOrigin: "50% 44%" }}>
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
          >
            <CVDocument />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Professional two-column French CV
   Left sidebar: dark navy   |   Right: white content
   ───────────────────────────────────────────────────────────────────── */
function CVDocument() {
  const SIDEBAR = "#0f1f4a";
  const ACCENT  = "#3b82f6";
  const W = 520;

  return (
    <div
      style={{
        width: W,
        display: "flex",
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        background: "#fff",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
      <div
        style={{
          width: 158,
          background: SIDEBAR,
          flexShrink: 0,
          padding: "28px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>SL</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: 11.5, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              Sarah<br />Leclerc
            </p>
          </div>
        </div>

        {/* Contact */}
        <SideSection title="CONTACT" accent={ACCENT}>
          {[
            { icon: "✉", text: "sarah.leclerc\n@gmail.com" },
            { icon: "☎", text: "06 78 23 45 67" },
            { icon: "⌖", text: "Paris 8e, France" },
            { icon: "in", text: "linkedin.com/in\n/sarah-leclerc" },
          ].map((c) => (
            <div key={c.icon} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 7 }}>
              <span style={{ color: ACCENT, fontSize: 9, marginTop: 1, flexShrink: 0, width: 10, textAlign: "center", fontWeight: 700 }}>{c.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 8.5, lineHeight: 1.5, whiteSpace: "pre-line" }}>{c.text}</span>
            </div>
          ))}
        </SideSection>

        {/* Compétences */}
        <SideSection title="COMPÉTENCES" accent={ACCENT}>
          {[
            { name: "Gestion de projet",  lvl: 5 },
            { name: "Agile / Scrum",       lvl: 5 },
            { name: "Salesforce CRM",      lvl: 4 },
            { name: "Power BI",            lvl: 4 },
            { name: "JIRA / Confluence",   lvl: 4 },
            { name: "Excel / VBA",         lvl: 3 },
          ].map((s) => (
            <div key={s.name} style={{ marginBottom: 7 }}>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 8.5, fontWeight: 600 }}>{s.name}</span>
              <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
                {[1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 18, height: 3, borderRadius: 99,
                      background: i <= s.lvl ? ACCENT : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </SideSection>

        {/* Langues */}
        <SideSection title="LANGUES" accent={ACCENT}>
          {[
            { lang: "Français", level: "Natif" },
            { lang: "Anglais",  level: "C2" },
            { lang: "Espagnol", level: "B2" },
          ].map((l) => (
            <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 8.5, fontWeight: 600 }}>{l.lang}</span>
              <span
                style={{
                  fontSize: 7.5, fontWeight: 700, color: ACCENT,
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(59,130,246,0.35)",
                  padding: "1px 6px", borderRadius: 99,
                }}
              >
                {l.level}
              </span>
            </div>
          ))}
        </SideSection>

        {/* ATS badge at bottom */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 8,
              padding: "7px 10px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#86efac", fontSize: 9.5, fontWeight: 800, letterSpacing: "0.04em" }}>Score ATS</p>
            <p style={{ color: "#4ade80", fontSize: 22, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em" }}>91<span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/100</span></p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 7.5, marginTop: 1 }}>Optimisé • Postulera</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN CONTENT ────────────────────────────────────── */}
      <div style={{ flex: 1, padding: "26px 22px 20px 20px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Name + title header */}
        <div style={{ borderBottom: "2px solid #e0ecff", paddingBottom: 14 }}>
          <p style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Sarah Leclerc
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginTop: 3, letterSpacing: "0.01em" }}>
            Chef de Projet Digital Senior
          </p>
          <p style={{ fontSize: 8.5, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>
            5 ans d'expérience en pilotage de projets digitaux complexes. Spécialisée dans la transformation numérique des organisations et la coordination d'équipes pluridisciplinaires.
          </p>
        </div>

        {/* Expérience */}
        <MainSection title="EXPÉRIENCE PROFESSIONNELLE" accent="#3b82f6">
          <Job
            title="Chef de Projet Digital"
            company="BNP Paribas"
            period="2021 – Aujourd'hui"
            location="Paris"
            bullets={[
              "Pilotage de 3 projets e-banking simultanés — budget total 2,4M€",
              "Coordination d'équipes pluridisciplinaires de 12 personnes (dev, UX, métier)",
              "Réduction de 35% du time-to-market sur les nouvelles fonctionnalités",
              "Mise en œuvre de la méthodologie SAFe Agile à l'échelle",
            ]}
          />
          <Job
            title="Consultante Junior"
            company="Capgemini Consulting"
            period="2019 – 2021"
            location="Paris · Lyon"
            bullets={[
              "Audit et transformation digitale de 8 clients CAC 40 (retail, finance, industrie)",
              "Déploiement d'une solution CRM Salesforce pour 5 000 utilisateurs",
              "Animation de 40+ ateliers de cadrage et conduite du changement",
            ]}
          />
        </MainSection>

        {/* Formation */}
        <MainSection title="FORMATION" accent="#3b82f6">
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#0f172a" }}>Master Management de Projet Digital</p>
              <p style={{ fontSize: 8.5, color: "#94a3b8", flexShrink: 0 }}>2017 – 2019</p>
            </div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#3b82f6", marginTop: 1 }}>Sciences Po Paris</p>
            <p style={{ fontSize: 8, color: "#94a3b8", marginTop: 1 }}>Mention Très Bien · Major de promotion</p>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#0f172a" }}>Licence Économie-Gestion</p>
              <p style={{ fontSize: 8.5, color: "#94a3b8", flexShrink: 0 }}>2014 – 2017</p>
            </div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#3b82f6", marginTop: 1 }}>Université Paris-Dauphine</p>
            <p style={{ fontSize: 8, color: "#94a3b8", marginTop: 1 }}>Spécialisation Finance d'entreprise</p>
          </div>
        </MainSection>

        {/* Certifications */}
        <MainSection title="CERTIFICATIONS" accent="#3b82f6">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {["PMP® Project Management", "Salesforce Administrator", "Google Analytics 4", "SAFe® 5 Agilist"].map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 8, fontWeight: 600,
                  color: "#1d4ed8",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  padding: "3px 8px",
                  borderRadius: 99,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </MainSection>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────── */
function SideSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}>
        <div style={{ width: 14, height: 1.5, background: accent, borderRadius: 99 }} />
        <p style={{ color: accent, fontSize: 7.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <p style={{ color: "#0f172a", fontSize: 8, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{title}</p>
        <div style={{ flex: 1, height: 1, background: "#e0ecff" }} />
      </div>
      {children}
    </div>
  );
}

function Job({
  title, company, period, location, bullets,
}: {
  title: string; company: string; period: string; location: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 10.5, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{title}</p>
          <p style={{ fontSize: 9.5, fontWeight: 700, color: "#3b82f6", marginTop: 1 }}>{company}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 8.5, color: "#64748b", fontWeight: 600 }}>{period}</p>
          <p style={{ fontSize: 8, color: "#94a3b8" }}>{location}</p>
        </div>
      </div>
      <ul style={{ marginTop: 5, paddingLeft: 0, listStyle: "none" }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: 8.5, color: "#475569", lineHeight: 1.65, marginBottom: 2, paddingLeft: 11, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: "0.1em", color: "#3b82f6", fontWeight: 900, fontSize: 10 }}>·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
