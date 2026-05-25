"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./components/Logo";

function getDynamicStats() {
  const base = new Date("2025-01-01");
  const now = new Date();
  const days = Math.floor((now - base) / (1000 * 60 * 60 * 24));
  const users = 12847 + Math.round(days * 7.3);
  // Nombre de CV du jour — déterministe par date (stable au refresh)
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const dailyCVs = 190 + (seed % 157);
  return { users, dailyCVs };
}

const faqItems = [
  {
    q: "C'est vraiment gratuit pour commencer ?",
    a: "Oui. Tu génères 3 CV complets gratuitement, sans carte bancaire. Le plan Étudiant à 4,99€/mois débloque 15 CV par mois avec score ATS et lettre de motivation.",
  },
  {
    q: "Ça marche sans expérience professionnelle ?",
    a: "Oui, c'est fait pour ça. CVAdapt met en avant tes projets universitaires, stages, associations et compétences dans le format que les recruteurs attendent.",
  },
  {
    q: "CVAdapt fonctionne pour les stages et alternances ?",
    a: "Oui — c'est même son point fort. Il analyse l'offre de stage ou d'alternance et adapte ton CV aux mots-clés exacts de chaque entreprise.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui. Ton contenu est utilisé uniquement pour générer le CV, puis supprimé. Paiement sécurisé via Stripe. Aucune donnée vendue.",
  },
  {
    q: "En combien de temps j'obtiens mon CV ?",
    a: "Moins de 30 secondes. Tu colles l'offre, tu entres tes infos, et tu reçois ton CV optimisé avec score ATS et mots-clés intégrés.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const TESTIMONIALS = [
  { name: "Romain S.", role: "Alternant finance · Paris", result: "Alternance décrochée en 5 jours", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé en 5 jours." },
  { name: "Emma T.", role: "Étudiante master · Toulouse", result: "Stage trouvé en 2 semaines", text: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement." },
  { name: "Antoine P.", role: "Data Analyst · Paris", result: "Score ATS : 34 → 89", text: "Mon score est passé de 34 à 89 en un clic. Les mots-clés manquants ont été ajoutés automatiquement." },
  { name: "Théo V.", role: "Étudiant en alternance · Paris", result: "3 offres d'alternance reçues", text: "Mon profil était générique. CVAdapt l'a transformé en 30 secondes. 3 propositions." },
  { name: "Anaïs G.", role: "Chargée marketing · Lyon", result: "Taux de réponse ×3", text: "Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes. Résultat immédiat." },
  { name: "Julien F.", role: "Comptable · Marseille", result: "CDI signé en 3 semaines", text: "J'envoyais des dizaines de CV sans réponse. Avec CVAdapt les recruteurs ont commencé à me rappeler." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [stats, setStats] = useState({ users: 12847, dailyCVs: 247 });

  useEffect(() => {
    setStats(getDynamicStats());
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
    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit, 'Outfit', system-ui, sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ─── HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold" style={{ color: "#1d4ed8" }}>CVAdapt</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-5">
            <a href="/tarifs" className="hidden sm:inline text-sm font-semibold" style={{ color: "#6b7280" }}>Tarifs</a>
            <a href="/blog" className="hidden sm:inline text-sm font-semibold" style={{ color: "#6b7280" }}>Blog</a>
            <a href="/generate" className="text-white px-5 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#1d4ed8", borderRadius: "999px", boxShadow: "0 4px 14px rgba(29,78,216,0.3)" }}>
              Commencer gratuitement
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-6"
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>
          <span>🎓</span>
          {stats.dailyCVs} CV optimisés aujourd&apos;hui · Gratuit pour commencer
        </div>

        <h1 className="font-extrabold leading-[1.1] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 62px)", color: "#1e3a8a", letterSpacing: "-1.5px" }}>
          Ton CV adapté à chaque offre en<br />
          <span className="px-3 py-1 inline-block mt-2"
            style={{ color: "#3b82f6", background: "#dbeafe", borderRadius: "14px" }}>
            30 secondes 🚀
          </span>
        </h1>

        <p className="max-w-xl mx-auto mb-8 leading-relaxed" style={{ fontSize: "18px", color: "#4b5563" }}>
          75% des CV sont filtrés par un algorithme avant d&apos;être lus.
          CVAdapt intègre les mots-clés de l&apos;offre et génère un CV optimisé — gratuitement.
        </p>

        {/* CTA principal + secondaire */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3">
          <a href="/analyse"
            className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5"
            style={{ background: "#1d4ed8", borderRadius: "999px", boxShadow: "0 6px 24px rgba(29,78,216,0.35)", fontSize: "17px" }}>
            Générer mon CV — C&apos;est gratuit 🚀
          </a>
          <a href="#comment-ca-marche"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-colors hover:bg-blue-50"
            style={{ border: "2px solid #bfdbfe", color: "#1d4ed8", borderRadius: "999px" }}>
            Comment ça marche
          </a>
        </div>
        <p className="text-sm mb-5" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire &nbsp;·&nbsp; ✓ 30 secondes &nbsp;·&nbsp; ✓ 3 CV gratuits</p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex -space-x-2">
            {["#1d4ed8","#7c3aed","#0891b2","#059669","#dc2626"].map((c,i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white text-white text-xs font-bold flex items-center justify-center"
                style={{ background: c }}>
                {["R","E","A","T","J"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: "#4b5563" }}>
            <span className="font-bold" style={{ color: "#1e3a8a" }}>{stats.users.toLocaleString("fr-FR")} étudiants</span> · ⭐ 4,9/5 · Sans CB
          </p>
        </div>

        {/* Mockup Score ATS */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-left">
            {/* Browser bar */}
            <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-1.5 border-b border-gray-100">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
              <span className="ml-3 text-xs text-gray-400 bg-white border border-gray-200 rounded px-3 py-0.5">cvadapt.eu — Score ATS</span>
            </div>
            <div className="p-5">
              {/* Score */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 shrink-0">
                  <svg viewBox="0 0 100 100" width="64" height="64">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12"
                      strokeDasharray={`${(91 / 100) * 251} 251`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-sm font-extrabold text-green-600 leading-none">91</span>
                    <span className="text-[8px] text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Score ATS : Excellent</p>
                  <p className="text-xs text-gray-400 mt-0.5">Optimisé pour cette offre</p>
                  <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">+57 points ↑</span>
                </div>
              </div>
              {/* Barres */}
              {[
                { label: "Mots-clés", pct: 94, color: "#22c55e" },
                { label: "Structure", pct: 88, color: "#3b82f6" },
                { label: "Lisibilité", pct: 91, color: "#8b5cf6" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{label}</span>
                    <span className="font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div style={{ width: `${pct}%`, background: color }} className="h-1.5 rounded-full" />
                  </div>
                </div>
              ))}
              <div className="mt-4 bg-blue-600 text-white text-xs font-bold text-center py-2.5 rounded-xl cursor-pointer">
                Télécharger mon CV PDF →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGOS ───────────────────────────────────────────────── */}
      <section className="py-8 px-5 border-y" style={{ background: "#ffffff", borderColor: "#e0ecff" }}>
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">Ils ont décroché des postes chez</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-3xl mx-auto">
          {["Capgemini", "Société Générale", "L'Oréal", "BNP Paribas", "Decathlon", "Orange", "Thales", "Renault"].map((b) => (
            <span key={b} className="text-sm font-bold italic text-gray-400">{b}</span>
          ))}
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ───────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-20 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#3b82f6", letterSpacing: "2px" }}>Simple</p>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1e3a8a" }}>3 étapes. 30 secondes.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "1", emoji: "📋", title: "Colle l'offre", desc: "Copie n'importe quelle offre depuis LinkedIn, Indeed, APEC…" },
              { n: "2", emoji: "✍️", title: "Entre tes infos", desc: "Ton expérience, tes compétences, ta formation en quelques lignes." },
              { n: "3", emoji: "🚀", title: "Reçois ton CV", desc: "Score ATS, mots-clés intégrés, CV PDF prêt à envoyer." },
            ].map((step) => (
              <div key={step.n} className="relative rounded-2xl p-6" style={{ background: "#ffffff", border: "2px solid #dbeafe" }}>
                <div className="absolute top-4 right-5 font-black leading-none select-none" style={{ fontSize: "60px", color: "#eff6ff" }}>{step.n}</div>
                <div className="text-3xl mb-4">{step.emoji}</div>
                <h3 className="font-bold mb-1.5" style={{ color: "#1e3a8a" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/generate" className="inline-block text-white px-8 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "#1d4ed8", borderRadius: "999px", boxShadow: "0 4px 16px rgba(29,78,216,0.3)" }}>
              Essayer gratuitement 🎓
            </a>
          </div>
        </div>
      </section>

      {/* ─── DEMO VIDEO ──────────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Démo</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Vois comment ça marche en 60 secondes</h2>
            <p className="text-gray-400 text-sm mt-3">De l'offre d'emploi au CV optimisé — sans effort</p>
          </div>

          {/* Cadre téléphone — vidéo portrait autoplay */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: 280 }}>
              {/* Coque téléphone */}
              <div className="relative bg-gray-900 rounded-[3rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden"
                style={{ width: 280, height: 607 }}>
                {/* Encoche */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-gray-900 rounded-b-2xl z-10" />
                {/* Vidéo */}
                <video
                  className="w-full h-full object-cover"
                  src="/demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              </div>
              {/* Bouton latéral déco */}
              <div className="absolute -right-2 top-24 w-1 h-10 bg-gray-700 rounded-full" />
              <div className="absolute -left-2 top-20 w-1 h-8 bg-gray-700 rounded-full" />
              <div className="absolute -left-2 top-32 w-1 h-8 bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRANDES ÉCOLES ──────────────────────────────────────── */}
      <section className="py-16 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-10" style={{ color: "#3b82f6", letterSpacing: "2px" }}>
            Utilisé par des étudiants de
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "HEC Paris", abbr: "HEC" },
              { name: "Sciences Po", abbr: "ScPo" },
              { name: "Polytechnique", abbr: "X" },
              { name: "ESSEC", abbr: "ESSEC" },
              { name: "ESCP", abbr: "ESCP" },
              { name: "CentraleSupélec", abbr: "CS" },
              { name: "EDHEC", abbr: "EDHEC" },
              { name: "EM Lyon", abbr: "EM" },
              { name: "Dauphine", abbr: "PSL" },
              { name: "INSA", abbr: "INSA" },
              { name: "Sorbonne", abbr: "SU" },
              { name: "Grenoble EM", abbr: "GEM" },
            ].map((school) => (
              <div key={school.name}
                className="flex flex-col items-center justify-center py-4 px-3 rounded-2xl transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", border: "2px solid #dbeafe" }}
                title={school.name}>
                <span className="font-extrabold text-base" style={{ color: "#1e3a8a" }}>{school.abbr}</span>
                <span className="text-xs mt-1 font-medium" style={{ color: "#93c5fd" }}>{school.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AVANT / APRÈS ───────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Résultat concret</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Avant / Après CVAdapt</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AVANT */}
            <div className="bg-white rounded-2xl border-2 border-red-100 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 border-b border-red-100 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-bold text-red-700 text-sm">CV générique</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg viewBox="0 0 100 100" width="56" height="56">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#fee2e2" strokeWidth="12" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12"
                        strokeDasharray={`${(34 / 100) * 251} 251`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-sm font-extrabold text-red-500 leading-none">34</span>
                      <span className="text-[8px] text-gray-400">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Score ATS : Faible</p>
                    <p className="text-xs text-gray-400">Filtré automatiquement</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-500">
                  {["Mots-clés manquants", "Structure basique", "Ignoré par l'ATS"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="text-red-400 font-bold text-xs">✗</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* APRÈS */}
            <div className="bg-white rounded-2xl border-2 border-green-200 overflow-hidden">
              <div className="bg-green-50 px-5 py-3 border-b border-green-100 flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span className="font-bold text-green-700 text-sm">CV optimisé par CVAdapt</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg viewBox="0 0 100 100" width="56" height="56">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#dcfce7" strokeWidth="12" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12"
                        strokeDasharray={`${(91 / 100) * 251} 251`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-sm font-extrabold text-green-600 leading-none">91</span>
                      <span className="text-[8px] text-gray-400">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Score ATS : Excellent</p>
                    <p className="text-xs text-green-600 font-semibold">🎯 Entretien décroché en 3 jours</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Tous les mots-clés intégrés", "Structure optimisée", "Lu par un humain"].map((t) => (
                    <li key={t} className="flex items-center gap-2 font-medium">
                      <span className="text-green-500 font-bold text-xs">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─────────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stats.users.toLocaleString("fr-FR")} étudiants ont décroché leurs entretiens</h2>
            <p className="text-gray-400 text-sm">Stages, alternances, premiers emplois</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => {
              const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
              const colors = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#dc2626", "#d97706"];
              const color = colors[TESTIMONIALS.indexOf(t) % colors.length];
              return (
                <div key={t.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: color }}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ✓ {t.result}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TARIFS ──────────────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Tarifs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Prix pensés pour les étudiants</h2>
            <p className="text-gray-400 text-sm">Sans engagement · Annule quand tu veux</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Gratuit */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Gratuit</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">0€</span>
                <span className="text-gray-400 text-sm mb-1">pour toujours</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                {[
                  { t: "3 CV à vie (non renouvelables)", ok: true },
                  { t: "4 templates", ok: true },
                  { t: "Téléchargement PDF", ok: true },
                  { t: "Score ATS complet", ok: false },
                  { t: "Lettre de motivation", ok: false },
                ].map((f) => (
                  <li key={f.t} className={`flex items-center gap-2 ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                    <span className={`text-xs font-bold ${f.ok ? "text-gray-500" : "text-gray-200"}`}>{f.ok ? "✓" : "✗"}</span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <a href="/generate" className="block text-center bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                Commencer
              </a>
            </div>

            {/* Étudiant — populaire */}
            <div className="rounded-2xl p-6 flex flex-col sm:-mt-4 sm:-mb-4 shadow-xl"
              style={{ background: "linear-gradient(145deg, #1e40af, #2563eb)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Étudiant</p>
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">⭐ Populaire</span>
              </div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">4,99€</span>
                <span className="text-blue-200 text-sm mb-1">/mois</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm text-white">
                {["15 CV par mois", "Score ATS complet", "4 templates", "Lettre de motivation", "Mots-clés automatiques", "Support prioritaire"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-blue-300 text-xs font-bold">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                Choisir Étudiant →
              </a>
              <p className="text-blue-200/70 text-xs text-center mt-3">Satisfait ou remboursé sous 7 jours</p>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Pro</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-lg font-semibold text-gray-400 line-through mb-0.5">29,99€</span>
                <span className="text-4xl font-extrabold text-gray-900">14,99€</span>
                <span className="text-gray-400 text-sm mb-1">/mois</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm text-gray-700">
                {["CV illimités", "Score ATS complet", "4 templates", "Lettre de motivation", "Conseils personnalisés", "Support prioritaire"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-blue-500 text-xs font-bold">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm">
                Choisir Pro →
              </a>
              <p className="text-gray-400 text-xs text-center mt-3">Satisfait ou remboursé sous 7 jours</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Questions fréquentes</h2>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
            {faqItems.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white transition-colors gap-4"
                >
                  <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                  <span className="text-gray-400 text-xl font-light shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 bg-white">
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL + NEWSLETTER ──────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            3 CV gratuits. Aucune carte.<br />Résultat en 30 secondes.
          </h2>
          <p className="text-blue-200 mb-8">{stats.users.toLocaleString("fr-FR")} étudiants l&apos;ont utilisé pour décrocher leurs entretiens.</p>
          <a href="/analyse"
            className="inline-block font-bold px-8 py-4 mb-10 text-base transition-all hover:-translate-y-0.5"
            style={{ background: "#ffffff", color: "#1d4ed8", borderRadius: "999px", boxShadow: "0 6px 24px rgba(0,0,0,0.15)" }}>
            🎯 Analyser mon CV gratuitement →
          </a>

          {/* Newsletter compact */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/70 text-sm mb-4">Reçois des conseils emploi chaque semaine</p>
            {emailStatus === "success" ? (
              <p className="text-green-300 text-sm font-semibold">✓ Merci, tu es inscrit !</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.fr" required
                  className="flex-1 px-4 py-2.5 rounded-xl text-gray-900 bg-white text-sm outline-none focus:ring-2 focus:ring-white/50 min-w-0" />
                <button type="submit" disabled={emailStatus === "loading"}
                  className="bg-yellow-400 text-yellow-900 font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap disabled:opacity-50">
                  {emailStatus === "loading" ? "..." : "S'inscrire"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="py-8 px-5 border-t" style={{ background: "#ffffff", borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="text-blue-600 font-bold text-sm">CVAdapt</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <a href="/blog" className="hover:text-gray-700 transition-colors">Blog</a>
            <a href="/tarifs" className="hover:text-gray-700 transition-colors">Tarifs</a>
            <a href="/generate" className="hover:text-gray-700 transition-colors">Générer un CV</a>
            <a href="/analyse" className="hover:text-gray-700 transition-colors">Analyser mon CV</a>
            <a href="/mentions-legales" className="hover:text-gray-700 transition-colors">Mentions légales</a>
            <a href="/cgu" className="hover:text-gray-700 transition-colors">CGU</a>
          </div>
          <p className="text-xs text-gray-400">© 2025 CVAdapt 🇫🇷</p>
        </div>
      </footer>
    </main>
  );
}
