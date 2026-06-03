import Logo from "@/app/components/Logo";

export const metadata = {
  title: "CVAdapt pour les établissements — BTS, Lycées, Universités",
  description: "Offrez à vos étudiants un accès illimité au générateur de CV IA. Tarifs établissements à partir de 800€/an. Dashboard admin, statistiques, lien d'invitation.",
};

const PLANS = [
  {
    name: "Essentiel",
    price: "800",
    quota: "150 CV/mois",
    desc: "Idéal pour une classe ou une section",
    color: "#6b7280",
    features: [
      "150 CV générés/mois",
      "Lien d'invitation unique",
      "Dashboard admin",
      "Score ATS inclus",
      "Support email",
    ],
    cta: "Demander un devis",
    highlight: false,
  },
  {
    name: "Starter",
    price: "990",
    quota: "300 CV/mois",
    desc: "Pour un BTS ou une filière complète",
    color: "#1d4ed8",
    features: [
      "300 CV générés/mois",
      "Lien d'invitation unique",
      "Dashboard admin + stats",
      "Score ATS + recommandations",
      "Lettre de motivation incluse",
      "Support prioritaire",
    ],
    cta: "Demander un devis",
    highlight: true,
  },
  {
    name: "Pro",
    price: "1 990",
    quota: "1 000 CV/mois",
    desc: "Pour un lycée ou un département",
    color: "#7c3aed",
    features: [
      "1 000 CV générés/mois",
      "Plusieurs promotions",
      "Dashboard admin avancé",
      "Statistiques détaillées",
      "Score ATS + recommandations",
      "Lettre de motivation incluse",
      "Support dédié",
    ],
    cta: "Demander un devis",
    highlight: false,
  },
  {
    name: "Campus",
    price: "3 990",
    quota: "Illimité",
    desc: "Pour une université ou un grand campus",
    color: "#059669",
    features: [
      "CV illimités",
      "Toutes les filières",
      "Dashboard multi-admin",
      "Rapports d'insertion mensuel",
      "Score ATS + recommandations",
      "Lettre de motivation incluse",
      "Account manager dédié",
      "Facturation annuelle",
    ],
    cta: "Nous contacter",
    highlight: false,
  },
];

function PlanCard({ plan }) {
  return (
    <div style={{
      background: plan.highlight ? "#1e3a8a" : "#fff",
      border: `1px solid ${plan.highlight ? "transparent" : "#e0ecff"}`,
      borderRadius: 20,
      padding: "36px 28px",
      flex: 1,
      minWidth: 240,
      maxWidth: 300,
      position: "relative",
      boxShadow: plan.highlight ? "0 8px 40px rgba(29,78,216,0.25)" : "none",
    }}>
      {plan.highlight && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "#2563eb", color: "#fff", fontSize: 11, fontWeight: 800,
          padding: "4px 14px", borderRadius: 980, letterSpacing: "0.08em",
          whiteSpace: "nowrap", textTransform: "uppercase",
        }}>
          Le plus choisi
        </div>
      )}

      <div style={{ fontSize: 12, fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.6)" : plan.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        {plan.name}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: plan.highlight ? "#fff" : "#1e3a8a", lineHeight: 1 }}>{plan.price}€</span>
        <span style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.6)" : "#9ca3af", marginBottom: 6 }}>/an HT</span>
      </div>

      <div style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.5)" : "#9ca3af", marginBottom: 6 }}>
        {plan.quota}
      </div>

      <p style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.7)" : "#6b7280", marginBottom: 24, lineHeight: 1.5 }}>
        {plan.desc}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.85)" : "#374151" }}>
            <span style={{ color: plan.highlight ? "#60a5fa" : plan.color, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={`mailto:contact@cvadapt.eu?subject=Demande devis CVAdapt ${plan.name}&body=Bonjour, je souhaite un devis pour le plan ${plan.name} (${plan.price}€/an) pour notre établissement.`}
        style={{
          display: "block", textAlign: "center",
          background: plan.highlight ? "#fff" : plan.color,
          color: plan.highlight ? "#1e3a8a" : "#fff",
          fontWeight: 700, fontSize: 14,
          padding: "13px 20px", borderRadius: 12,
          textDecoration: "none",
          transition: "opacity 0.15s",
        }}
      >
        {plan.cta} →
      </a>
    </div>
  );
}

export default function TarifsEtablissements() {
  return (
    <main style={{ minHeight: "100vh", background: "#f0f7ff", fontFamily: "var(--font-outfit, system-ui, sans-serif)" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e0ecff", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={26} />
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1d4ed8" }}>CVAdapt</span>
          </a>
          <a href="mailto:contact@cvadapt.eu" style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600 }}>
            contact@cvadapt.eu
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", background: "#dbeafe", color: "#1d4ed8", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 980, letterSpacing: "0.06em", marginBottom: 20 }}>
            ÉTABLISSEMENTS
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#1e3a8a", letterSpacing: "-0.5px", marginBottom: 16, lineHeight: 1.15 }}>
            Offrez CVAdapt à vos étudiants
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 600, margin: "0 auto 12px", lineHeight: 1.6 }}>
            Un lien d'invitation, un dashboard admin, des stats d'insertion. Vos étudiants génèrent des CV optimisés ATS dès le premier jour.
          </p>
          <p style={{ fontSize: 14, color: "#9ca3af" }}>
            BTS · Lycées professionnels · IUT · Universités · Écoles de commerce
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          {PLANS.map(plan => <PlanCard key={plan.name} plan={plan} />)}
        </div>

        {/* How it works */}
        <div style={{ background: "#fff", border: "1px solid #e0ecff", borderRadius: 20, padding: "40px 48px", marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e3a8a", marginBottom: 32, textAlign: "center" }}>
            Déploiement en 24h
          </h2>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { n: "1", t: "Vous signez", d: "Devis par email, paiement sécurisé. Activation immédiate." },
              { n: "2", t: "Lien d'invitation", d: "Un lien unique à partager sur votre intranet, ENT ou groupe WhatsApp." },
              { n: "3", t: "Vos étudiants s'inscrivent", d: "Compte gratuit en 30 secondes. Rattachement automatique à votre établissement." },
              { n: "4", t: "Vous suivez les stats", d: "Dashboard admin : membres inscrits, CV générés, score ATS moyen." },
            ].map(s => (
              <div key={s.n} style={{ flex: 1, minWidth: 180, maxWidth: 220, textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dbeafe", color: "#1d4ed8", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  {s.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1e3a8a", marginBottom: 6 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#1e3a8a", borderRadius: 20, padding: "40px 48px", textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Une question ? Un devis ?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
            Réponse sous 24h. Pas de contrat long terme, résiliation possible chaque année.
          </p>
          <a
            href="mailto:contact@cvadapt.eu?subject=Demande renseignements CVAdapt Établissement"
            style={{ display: "inline-block", background: "#fff", color: "#1e3a8a", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 12, textDecoration: "none" }}
          >
            Écrire à contact@cvadapt.eu →
          </a>
        </div>

      </div>
    </main>
  );
}
