"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────────────────
   10 CVs arranged in a 3D ring that spins continuously.
   Each card is a real professional CV card with different people/colors.
   ───────────────────────────────────────────────────────────────────── */

const CVS = [
  {
    initials: "SL", name: "Sarah Leclerc",    title: "Chef de Projet Digital",
    company: "BNP Paribas", accent: "#3b82f6", sidebar: "#0f1f4a",
    score: 91, skills: ["Agile/Scrum","Salesforce","Power BI"],
    exp: "5 ans · Gestion de projets e-banking (budget 2,4M€)",
  },
  {
    initials: "TD", name: "Thomas Dubois",    title: "Développeur Full Stack",
    company: "Capgemini", accent: "#10b981", sidebar: "#052e16",
    score: 88, skills: ["React","Node.js","PostgreSQL"],
    exp: "3 ans · Architecture microservices, CI/CD, AWS",
  },
  {
    initials: "AC", name: "Amélie Chen",      title: "Data Analyst Senior",
    company: "L'Oréal", accent: "#8b5cf6", sidebar: "#2e1065",
    score: 94, skills: ["Python","Tableau","SQL"],
    exp: "4 ans · Modélisation prédictive, segmentation clients",
  },
  {
    initials: "LB", name: "Lucas Bernard",    title: "Responsable Marketing",
    company: "Decathlon", accent: "#f59e0b", sidebar: "#451a03",
    score: 86, skills: ["SEO/SEA","HubSpot","Analytics"],
    exp: "6 ans · +180% trafic organique, 3 lancements produits",
  },
  {
    initials: "EP", name: "Emma Petit",       title: "Designer UX/UI",
    company: "LVMH", accent: "#ec4899", sidebar: "#500724",
    score: 92, skills: ["Figma","Prototypage","User Research"],
    exp: "4 ans · Refonte complète de 2 applications B2C",
  },
  {
    initials: "HM", name: "Hugo Martin",      title: "Analyste Financier",
    company: "KPMG", accent: "#06b6d4", sidebar: "#083344",
    score: 89, skills: ["Excel/VBA","Bloomberg","IFRS"],
    exp: "5 ans · Audits CAC 40, modélisation LBO",
  },
  {
    initials: "CD", name: "Chloé Dupont",     title: "Cheffe de Produit",
    company: "Renault", accent: "#ef4444", sidebar: "#450a0a",
    score: 87, skills: ["Roadmap","Jira","A/B testing"],
    exp: "3 ans · 4 features lancées, NPS +28 points",
  },
  {
    initials: "AR", name: "Antoine Roux",     title: "Ingénieur DevOps",
    company: "Thales", accent: "#14b8a6", sidebar: "#042f2e",
    score: 93, skills: ["Kubernetes","Terraform","GitOps"],
    exp: "6 ans · Infrastructure critique, 99,99% uptime",
  },
  {
    initials: "MV", name: "Manon Vidal",      title: "Juriste d'Entreprise",
    company: "Société Générale", accent: "#a78bfa", sidebar: "#1e1b4b",
    score: 85, skills: ["Droit des sociétés","M&A","RGPD"],
    exp: "4 ans · 12 acquisitions accompagnées (>500M€)",
  },
  {
    initials: "NF", name: "Nicolas Faure",    title: "Ingénieur Mécanique",
    company: "Airbus", accent: "#f97316", sidebar: "#431407",
    score: 90, skills: ["CATIA V5","Ansys","Lean 6σ"],
    exp: "7 ans · Bureau d'études structures aéronautiques",
  },
];

const N         = CVS.length;
const ANGLE     = 360 / N;        // 36° between each card
const RADIUS    = 680;            // px — ring radius
const CARD_W    = 280;
const CARD_H    = 370;
const SPIN_SPEED = 18;            // seconds per full rotation

export function CVCarousel3D() {
  const ringRef = useRef<HTMLDivElement>(null);

  /* Continuous GSAP rotation — infinite, pauses on hover */
  useEffect(() => {
    if (!ringRef.current) return;
    const tween = gsap.to(ringRef.current, {
      rotationY: -360,
      duration: SPIN_SPEED,
      ease: "none",
      repeat: -1,
    });
    const ring = ringRef.current;
    const pause  = () => tween.timeScale(0.15);
    const resume = () => tween.timeScale(1);
    ring.addEventListener("mouseenter", pause);
    ring.addEventListener("mouseleave", resume);
    return () => {
      tween.kill();
      ring.removeEventListener("mouseenter", pause);
      ring.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #060d1c 0%, #0c1a3a 60%, #060d1c 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 55%, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Label */}
      <div className="relative z-10 text-center mb-16 px-4">
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: "rgba(147,197,253,0.6)" }}
        >
          Exemples générés par CVAdapt
        </p>
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: "#fff", letterSpacing: "-0.03em" }}
        >
          Des CV qui passent les filtres ATS.
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Passe ta souris pour ralentir · Génère le tien en 30 secondes
        </p>
      </div>

      {/* 3D ring */}
      <div
        className="relative"
        style={{
          perspective: "2200px",
          perspectiveOrigin: "50% 50%",
          height: CARD_H + 120,
          width: "100%",
        }}
      >
        <div
          ref={ringRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CVS.map((cv, i) => {
            const angleY = i * ANGLE;
            return (
              <div
                key={cv.initials}
                className="absolute"
                style={{
                  transform: `rotateY(${angleY}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                  width: CARD_W,
                  height: CARD_H,
                }}
              >
                <CVCard cv={cv} />
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-16">
        <a
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-full transition-all hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
            boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 8px 32px rgba(29,78,216,0.45)",
          }}
        >
          Générer mon CV — Gratuit 🚀
        </a>
      </div>
    </section>
  );
}

/* ── Individual CV card ───────────────────────────────────────────── */
function CVCard({ cv }: { cv: (typeof CVS)[number] }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        borderRadius: 14,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        background: "#fff",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Colored header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${cv.sidebar} 0%, ${cv.accent}cc 100%)`,
          padding: "18px 16px 14px",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "2px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{cv.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {cv.name}
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 9.5, fontWeight: 600, marginTop: 1, lineHeight: 1.3 }}>
              {cv.title}
            </p>
          </div>
          {/* ATS badge */}
          <div
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "4px 8px",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <p style={{ color: "#4ade80", fontSize: 14, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>
              {cv.score}
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 7, fontWeight: 700, letterSpacing: "0.06em", marginTop: 1 }}>
              ATS
            </p>
          </div>
        </div>

        {/* Company */}
        <div
          className="mt-3 flex items-center gap-1.5"
          style={{ background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 8px", width: "fit-content" }}
        >
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>🏢 {cv.company}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 14px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Experience line */}
        <div>
          <p style={{ fontSize: 7.5, fontWeight: 800, color: cv.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Expérience
          </p>
          <p style={{ fontSize: 9, color: "#374151", lineHeight: 1.55 }}>{cv.exp}</p>
        </div>

        {/* Skills */}
        <div>
          <p style={{ fontSize: 7.5, fontWeight: 800, color: cv.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            Compétences clés
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {cv.skills.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 8.5, fontWeight: 600, color: cv.accent,
                  background: `${cv.accent}15`,
                  border: `1px solid ${cv.accent}35`,
                  padding: "3px 8px", borderRadius: 99,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bars */}
        <div style={{ marginTop: "auto" }}>
          {[
            { label: "Mots-clés ATS",   pct: cv.score },
            { label: "Mise en forme",    pct: Math.min(cv.score + 4, 99) },
            { label: "Score global",     pct: Math.max(cv.score - 2, 80) },
          ].map(({ label, pct }) => (
            <div key={label} style={{ marginBottom: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 8, color: "#6b7280", fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: cv.accent }}>{pct}%</span>
              </div>
              <div style={{ height: 3, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: cv.accent, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>

        {/* CVAdapt stamp */}
        <div
          style={{
            borderTop: `1px solid ${cv.accent}20`,
            paddingTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 7.5, color: "#9ca3af" }}>Généré en 28 sec</span>
          <span style={{ fontSize: 7.5, fontWeight: 800, color: cv.accent }}>✓ CVAdapt</span>
        </div>
      </div>
    </div>
  );
}
