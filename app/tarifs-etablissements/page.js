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
    target: "1 classe · 1 section",
    color: "#4f46e5",
    bg: "#f5f3ff",
    borderColor: "#c7d2fe",
    features: ["150 CV optimisés/mois", "Lien d'invitation unique", "Dashboard admin", "Score ATS inclus", "Support email"],
    highlight: false,
  },
  {
    name: "Starter",
    price: "990",
    quota: "300 CV/mois",
    target: "BTS · Filière complète",
    color: "#1d4ed8",
    bg: "#1e3a8a",
    borderColor: "transparent",
    features: ["300 CV optimisés/mois", "Lien d'invitation unique", "Dashboard admin + stats", "Score ATS + recommandations", "Lettre de motivation incluse", "Support prioritaire"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "1 990",
    quota: "1 000 CV/mois",
    target: "Lycée · Département",
    color: "#7c3aed",
    bg: "#faf5ff",
    borderColor: "#ddd6fe",
    features: ["1 000 CV optimisés/mois", "Plusieurs promotions", "Dashboard avancé", "Statistiques détaillées", "Score ATS + recommandations", "Lettre de motivation incluse", "Support dédié"],
    highlight: false,
  },
  {
    name: "Campus",
    price: "3 990",
    quota: "Illimité",
    target: "Université · Grand campus",
    color: "#059669",
    bg: "#f0fdf4",
    borderColor: "#a7f3d0",
    features: ["CV illimités", "Toutes les filières", "Dashboard multi-admin", "Rapports insertion mensuels", "Score ATS + recommandations", "Lettre de motivation incluse", "Account manager dédié"],
    highlight: false,
  },
];

const STEPS = [
  { n: "1", t: "Devis en 24h", d: "Envoyez un email — on répond avec un devis PDF." },
  { n: "2", t: "Activation immédiate", d: "Après signature, votre lien d'invitation est actif le jour même." },
  { n: "3", t: "Partagez le lien", d: "ENT, WhatsApp, email — les étudiants rejoignent en 30 secondes." },
  { n: "4", t: "Suivez les stats", d: "CV générés, score ATS moyen, étudiants inscrits." },
];

function Check({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.12" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ plan }) {
  const isDark = plan.highlight;
  const textPrimary = isDark ? "#fff" : "#1e3a8a";
  const textSecondary = isDark ? "rgba(255,255,255,0.65)" : "#6b7280";
  const textFeature = isDark ? "rgba(255,255,255,0.9)" : "#374151";
  const checkColor = isDark ? "#93c5fd" : plan.color;

  return (
    <div style={{
      background: isDark ? plan.bg : "#fff",
      border: `1px solid ${plan.borderColor}`,
      borderRadius: 18,
      padding: "32px 26px 28px",
      flex: 1,
      minWidth: 220,
      maxWidth: 272,
      position: "relative",
      boxShadow: isDark ? "0 12px 48px rgba(29,78,216,0.28)" : "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
    }}>
      {isDark && (
        <div style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(90deg, #3b82f6, #6366f1)",
          color: "#fff", fontSize: 10, fontWeight: 800,
          padding: "4px 16px", borderRadius: 980, letterSpacing: "0.1em",
          whiteSpace: "nowrap", textTransform: "uppercase",
        }}>
          Le plus choisi
        </div>
      )}

      {/* Plan name */}
      <div style={{ fontSize: 11, fontWeight: 800, color: isDark ? "rgba(255,255,255,0.5)" : plan.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
        {plan.name}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 44, fontWeight: 800, color: textPrimary, lineHeight: 1, letterSpacing: "-1px" }}>{plan.price}€</span>
        <span style={{ fontSize: 13, color: textSecondary, marginLeft: 4 }}>/an HT</span>
      </div>

      {/* Quota + target */}
      <div style={{ fontSize: 13, fontWeight: 600, color: isDark ? "#93c5fd" : plan.color, marginBottom: 4 }}>{plan.quota}</div>
      <div style={{ fontSize: 12, color: textSecondary, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#f1f5f9"}` }}>
        {plan.target}
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto", display: "flex", flexDirection: "column", gap: 11 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: textFeature, lineHeight: 1.4 }}>
            <Check color={checkColor} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`mailto:contact@cvadapt.eu?subject=Devis CVAdapt ${plan.name} — ${plan.price}€/an&body=Bonjour,%0A%0AJe souhaite un devis pour le plan ${plan.name} (${plan.price}€/an HT).%0A%0AÉtablissement :%0ANombre d'étudiants :%0AContact :%0A%0AMerci`}
        style={{
          display: "block", textAlign: "center", marginTop: 28,
          background: isDark ? "#fff" : plan.color,
          color: isDark ? "#1e3a8a" : "#fff",
          fontWeight: 700, fontSize: 14,
          padding: "13px 20px", borderRadius: 10,
          textDecoration: "none",
        }}
      >
        Demander un devis →
      </a>
    </div>
  );
}

export default function TarifsEtablissements() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "var(--font-outfit, system-ui, sans-serif)" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8f0fe", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={28} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#1d4ed8" }}>CVAdapt</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="/tarifs" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Tarifs étudiants</a>
            <a href="mailto:contact@cvadapt.eu?subject=Demande renseignements établissement"
              style={{ background: "#1d4ed8", color: "#fff", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>
              Nous contacter
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 980, letterSpacing: "0.06em", marginBottom: 24 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          POUR LES ÉTABLISSEMENTS
        </div>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.1, textWrap: "balance" }}>
          75% des CV de vos étudiants<br />sont rejetés avant d'être lus
        </h1>
        <p style={{ fontSize: 17, color: "#475569", maxWidth: 580, margin: "0 auto 20px", lineHeight: 1.65 }}>
          Les filtres ATS éliminent automatiquement les CV mal optimisés. CVAdapt corrige ça en 30 secondes — et vos étudiants décrochent plus d'entretiens.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
          {["BTS", "Lycées Pro", "IUT", "Universités", "Écoles de commerce"].map(t => (
            <span key={t} style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#475569", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 980 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Plans grid */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px 72px" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
          {PLANS.map(plan => <PlanCard key={plan.name} plan={plan} />)}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
          Tous les prix sont HT · Facturation annuelle · Résiliation libre à chaque renouvellement
        </p>
      </section>

      {/* How it works */}
      <section style={{ background: "#fff", borderTop: "1px solid #e8f0fe", borderBottom: "1px solid #e8f0fe", padding: "56px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8, textAlign: "center" }}>
            De la signature à l'activation en 24h
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 48 }}>Pas de tunnel d'onboarding complexe. Juste un lien et un dashboard.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#eff6ff", color: "#1d4ed8", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  {s.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.55 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { stat: "75%", label: "des CV éliminés par les filtres ATS avant d'atteindre un recruteur" },
            { stat: "30s", label: "pour générer un CV adapté à une offre, score ATS inclus" },
            { stat: "+40%", label: "de taux d'entretien obtenu par les étudiants utilisant CVAdapt" },
            { stat: "4,8/5", label: "satisfaction des étudiants utilisateurs (312 avis)" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ background: "#fff", border: "1px solid #e8f0fe", borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#1d4ed8", letterSpacing: "-0.03em", marginBottom: 6 }}>{stat}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ maxWidth: 700, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)", borderRadius: 20, padding: "44px 48px", textAlign: "center" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
            Un devis en moins de 24h
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", marginBottom: 28, lineHeight: 1.6 }}>
            Dites-nous le nom de votre établissement et le nombre d'étudiants. On s'occupe du reste.
          </p>
          <a
            href="mailto:contact@cvadapt.eu?subject=Demande devis CVAdapt Établissement&body=Bonjour,%0A%0AJe souhaite un devis pour CVAdapt pour notre établissement.%0A%0AÉtablissement :%0AType (BTS / lycée / IUT / université) :%0ANombre d'étudiants :%0ABudget indicatif :%0AContact :%0A%0AMerci"
            style={{ display: "inline-block", background: "#fff", color: "#1e3a8a", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}
          >
            contact@cvadapt.eu →
          </a>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 16 }}>
            Réponse garantie sous 24h · Aucun engagement avant signature
          </p>
        </div>
      </section>

    </main>
  );
}
