"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import dynamic from "next/dynamic";
import { t } from "@/lib/i18n";

const CountdownBanner = dynamic(() => import("./components/CountdownBanner"), { ssr: false });
const CinematicHero = dynamic(
  () => import("@/components/ui/cinematic-landing-hero").then((m) => ({ default: m.CinematicHero })),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "100vh", background: "#f0f7ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1rem" }}>
        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 700, color: "#0f172a", letterSpacing: "-2px", marginBottom: "8px", lineHeight: 1.1 }}>
          Adapte ton CV,
        </h1>
        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 800, color: "#1d4ed8", letterSpacing: "-3px", lineHeight: 1.1 }}>
          décroche l&apos;entretien.
        </h1>
      </div>
    ),
  }
);
const SimpleHeader = dynamic(
  () => import("@/components/ui/simple-header").then((m) => ({ default: m.SimpleHeader })),
  { ssr: false }
);

function getDynamicStats() {
  return { users: 4200, dailyCVs: 87 };
}

const TESTIMONIALS = [
  { name: "Romain S.", role: "Alternant finance · Paris", result: "Alternance décrochée en 5 jours", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé en 5 jours.", date: "il y a 12 jours" },
  { name: "Emma T.", role: "Étudiante master · Toulouse", result: "Stage trouvé en 2 semaines", text: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement.", date: "il y a 3 semaines" },
  { name: "Antoine P.", role: "Data Analyst · Paris", result: "Score ATS : 34 → 89", text: "Mon score est passé de 34 à 89 en un clic. Les mots-clés manquants ont été ajoutés automatiquement.", date: "il y a 8 jours" },
  { name: "Théo V.", role: "Étudiant en alternance · Paris", result: "3 offres d'alternance reçues", text: "Mon profil était générique. CVAdapt l'a transformé en 30 secondes. 3 propositions reçues.", date: "il y a 5 jours" },
  { name: "Anaïs G.", role: "Chargée marketing · Lyon", result: "Taux de réponse ×3", text: "Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes. Résultat immédiat.", date: "il y a 2 semaines" },
  { name: "Julien F.", role: "Comptable · Marseille", result: "CDI signé en 3 semaines", text: "J'envoyais des dizaines de CV sans réponse. Avec CVAdapt les recruteurs ont commencé à me rappeler.", date: "il y a 1 mois" },
];

export default function Home() {
  const [lang, setLang] = useState("fr");
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [stats] = useState(getDynamicStats);
  // CinematicHero: desktop only — pinned GSAP scroll is unusable on mobile
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => { setIsDesktop(window.innerWidth >= 768); }, []);

  // Sync language with SimpleHeader toggle via localStorage + StorageEvent
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cvadapt_lang");
      if (saved === "en" || saved === "fr") setLang(saved);
    } catch {}
    function onStorage(e) {
      if (e.key === "cvadapt_lang" && (e.newValue === "en" || e.newValue === "fr")) {
        setLang(e.newValue);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const faqItems = [
    { q: t(lang, "homeFAQ1Q"), a: t(lang, "homeFAQ1A") },
    { q: t(lang, "homeFAQ2Q"), a: t(lang, "homeFAQ2A") },
    { q: t(lang, "homeFAQ3Q"), a: t(lang, "homeFAQ3A") },
    { q: t(lang, "homeFAQ4Q"), a: t(lang, "homeFAQ4A") },
    { q: t(lang, "homeFAQ5Q"), a: t(lang, "homeFAQ5A") },
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

  async function handleNewsletter(e) {
    e.preventDefault();
    setEmailStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, lang }),
    });
    setEmailStatus(res.ok ? "success" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <>
      {isDesktop && <CinematicHero />}

    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit, 'Outfit', system-ui, sans-serif)", overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CountdownBanner />
      <SimpleHeader lang={lang} />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-5 pt-10 sm:pt-16 pb-12 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-6"
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>
          <span>🎓</span>
          {stats.dailyCVs} {t(lang, "homeHeroBadge")}
        </div>

        <h1 className="font-extrabold leading-[1.1] mb-6"
          style={{ fontSize: "clamp(36px, 6vw, 60px)", color: "#1e3a8a", letterSpacing: "-1.5px" }}>
          {t(lang, "homeH1Part1")}<br />
          <span className="px-3 py-1 inline-block mt-2"
            style={{ color: "#3b82f6", background: "#dbeafe", borderRadius: "14px" }}>
            {t(lang, "homeH1Part2")}
          </span>
        </h1>

        <p className="max-w-xl mx-auto mb-8 leading-relaxed" style={{ fontSize: "18px", color: "#4b5563" }}>
          <strong style={{ color: "#1e3a8a" }}>{t(lang, "homeSubBold")}</strong>{t(lang, "homeSubRest")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3 px-2 sm:px-0">
          <a href="/generate"
            className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5"
            style={{ background: "#1d4ed8", borderRadius: "999px", boxShadow: "0 6px 24px rgba(29,78,216,0.35)", fontSize: "17px" }}
            onClick={() => { try { window.clarity?.("event", "hero_cta_generate"); } catch {} }}>
            {t(lang, "homePrimaryCTA")}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-5 text-sm" style={{ color: "#93c5fd" }}>
          <span>✓ {t(lang, "homePerkNoCB")}</span>
          <span>✓ {t(lang, "homePerk30s")}</span>
          <span>✓ {t(lang, "homePerk3")}</span>
        </div>

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
            <span className="font-bold" style={{ color: "#1e3a8a" }}>{stats.users.toLocaleString("fr-FR")}</span> {t(lang, "homeUsersRating")}
          </p>
        </div>
      </section>

      {/* ─── LOGOS ───────────────────────────────────────────────── */}
      <section className="py-6 sm:py-8 px-4 sm:px-5 border-y" style={{ background: "#ffffff", borderColor: "#e0ecff" }}>
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">
          {t(lang, "homeCompaniesLabel")}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-3xl mx-auto">
          {["Capgemini", "Société Générale", "L'Oréal", "BNP Paribas", "Decathlon", "Orange", "Thales", "Renault"].map((b) => (
            <span key={b} className="text-sm font-bold italic text-gray-400">{b}</span>
          ))}
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ───────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#3b82f6", letterSpacing: "2px" }}>
              {t(lang, "homeHowLabel")}
            </p>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1e3a8a" }}>
              {t(lang, "homeHowTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "1", emoji: "📋", titleKey: "homeStep1Title", descKey: "homeStep1Desc" },
              { n: "2", emoji: "✍️", titleKey: "homeStep2Title", descKey: "homeStep2Desc" },
              { n: "3", emoji: "🚀", titleKey: "homeStep3Title", descKey: "homeStep3Desc" },
            ].map((step) => (
              <div key={step.n} className="relative rounded-2xl p-6" style={{ background: "#ffffff", border: "2px solid #dbeafe" }}>
                <div className="absolute top-4 right-5 font-black leading-none select-none" style={{ fontSize: "60px", color: "#eff6ff" }}>{step.n}</div>
                <div className="text-3xl mb-4">{step.emoji}</div>
                <h3 className="font-bold mb-1.5" style={{ color: "#1e3a8a" }}>{t(lang, step.titleKey)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{t(lang, step.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/generate" className="inline-block text-white px-8 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "#1d4ed8", borderRadius: "999px", boxShadow: "0 4px 16px rgba(29,78,216,0.3)" }}>
              {t(lang, "homeTryFreeBtn")}
            </a>
          </div>
        </div>
      </section>

      {/* ─── AVANT / APRÈS ───────────────────────────────────────── */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{t(lang, "homeResultsLabel")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t(lang, "homeBeforeAfterTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border-2 border-red-100 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 border-b border-red-100 flex items-center gap-2">
                <span className="text-lg">❌</span>
                <span className="font-bold text-red-700 text-sm">{t(lang, "homeGenericCVLabel")}</span>
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
                    <p className="text-sm font-bold text-gray-900">{t(lang, "homeATSScoreWeak")}</p>
                    <p className="text-xs text-gray-400">{t(lang, "homeFilteredAuto")}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[t(lang, "homeMissingKW"), t(lang, "homeBasicStr"), t(lang, "homeIgnoredATS")].map((txt) => (
                    <li key={txt} className="flex items-center gap-2"><span className="text-red-400 font-bold text-xs">✗</span>{txt}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-green-200 overflow-hidden">
              <div className="bg-green-50 px-5 py-3 border-b border-green-100 flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span className="font-bold text-green-700 text-sm">{t(lang, "homeOptimizedCVLabel")}</span>
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
                    <p className="text-sm font-bold text-gray-900">{t(lang, "homeATSExcellent")}</p>
                    <p className="text-xs text-green-600 font-semibold">{t(lang, "homeInterviewDays")}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[t(lang, "homeAllKW"), t(lang, "homeOptimizedStr"), t(lang, "homeReadByHuman")].map((txt) => (
                    <li key={txt} className="flex items-center gap-2 font-medium"><span className="text-green-500 font-bold text-xs">✓</span>{txt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{t(lang, "homeTestimonialsTitle")}</h2>
            <p className="text-gray-400 text-sm">{t(lang, "homeTestimonialsSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((tm, idx) => {
              const colors = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#dc2626", "#d97706"];
              const color = colors[idx % colors.length];
              const initials = tm.name.split(" ").map(w => w[0]).join("").slice(0, 2);
              return (
                <div key={tm.name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: color }}>{initials}</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{tm.name}</p>
                        <p className="text-xs text-gray-400">{tm.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">{tm.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">&ldquo;{tm.text}&rdquo;</p>
                  <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block">✓ {tm.result}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TARIFS ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{t(lang, "homePricingLabel")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{t(lang, "homePricingTitle")}</h2>
            <p className="text-gray-400 text-sm">{t(lang, "homePricingSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t(lang, "homePlanFree")}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">0€</span>
                <span className="text-gray-400 text-sm mb-1">{t(lang, "homePlanFreeForever")}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                {[
                  { key: "homeFreeF1", ok: true }, { key: "homeFreeF2", ok: true },
                  { key: "homeFreeF3", ok: true }, { key: "homeFreeF4", ok: false },
                  { key: "homeFreeF5", ok: false },
                ].map((f) => (
                  <li key={f.key} className={`flex items-center gap-2 ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                    <span className={`text-xs font-bold ${f.ok ? "text-gray-500" : "text-gray-200"}`}>{f.ok ? "✓" : "✗"}</span>
                    {t(lang, f.key)}
                  </li>
                ))}
              </ul>
              <a href="/generate" onClick={() => { try { window.clarity?.("event", "pricing_cta_free"); } catch {} }}
                className="block text-center bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                {t(lang, "homeStartBtn")}
              </a>
            </div>

            <div className="rounded-2xl p-6 flex flex-col sm:-mt-4 sm:-mb-4 shadow-xl"
              style={{ background: "linear-gradient(145deg, #1e40af, #2563eb)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">{t(lang, "homePlanStudent")}</p>
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">{t(lang, "homePlanPopular")}</span>
              </div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">4,99€</span>
                <span className="text-blue-200 text-sm mb-1">{t(lang, "homePerMonth")}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm text-white">
                {["homeStudentF1","homeStudentF2","homeStudentF3","homeStudentF4","homeStudentF5","homeStudentF6"].map((key) => (
                  <li key={key} className="flex items-center gap-2"><span className="text-blue-300 text-xs font-bold">✓</span>{t(lang, key)}</li>
                ))}
              </ul>
              <a href="/tarifs" onClick={() => { try { window.clarity?.("event", "pricing_cta_etudiant"); } catch {} }}
                className="block text-center bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                {t(lang, "homeChooseStudentBtn")}
              </a>
              <p className="text-blue-200/70 text-xs text-center mt-3">{t(lang, "homeSatisfied7")}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t(lang, "homePlanPro")}</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">9,99€</span>
                <span className="text-gray-400 text-sm mb-1">{t(lang, "homePerMonth")}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1 text-sm text-gray-700">
                {["homeProF1","homeProF2","homeProF3","homeProF4","homeProF5","homeProF6"].map((key) => (
                  <li key={key} className="flex items-center gap-2"><span className="text-blue-500 text-xs font-bold">✓</span>{t(lang, key)}</li>
                ))}
              </ul>
              <a href="/tarifs" onClick={() => { try { window.clarity?.("event", "pricing_cta_pro"); } catch {} }}
                className="block text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm">
                {t(lang, "homeChooseProBtn")}
              </a>
              <p className="text-gray-400 text-xs text-center mt-3">{t(lang, "homeSatisfied7")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">{t(lang, "homeFAQTitle")}</h2>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
            {faqItems.map((item, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white transition-colors gap-4">
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

      {/* ─── CTA FINAL ───────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-5" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t(lang, "homeFinalTitle1")}<br />{t(lang, "homeFinalTitle2")}
          </h2>
          <p className="text-blue-200 mb-8">
            {stats.users.toLocaleString("fr-FR")} {t(lang, "homeFinalUsedBy")}
          </p>
          <a href="/generate"
            className="inline-block font-bold px-8 py-4 mb-10 text-base transition-all hover:-translate-y-0.5"
            style={{ background: "#ffffff", color: "#1d4ed8", borderRadius: "999px", boxShadow: "0 6px 24px rgba(0,0,0,0.15)" }}>
            {t(lang, "homeFinalCTABtn")}
          </a>

          <div className="border-t border-white/10 pt-8">
            <p className="text-white/70 text-sm mb-4">{t(lang, "homeNewsletterTitle")}</p>
            {emailStatus === "success" ? (
              <p className="text-green-300 text-sm font-semibold">{t(lang, "homeNewsletterSuccess")}</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(lang, "homeNewsletterPlaceholder")} required
                  className="w-full px-4 py-3 sm:py-2.5 rounded-xl text-gray-900 bg-white text-sm outline-none focus:ring-2 focus:ring-white/50" />
                <button type="submit" disabled={emailStatus === "loading"}
                  className="w-full sm:w-auto bg-yellow-400 text-yellow-900 font-bold px-5 py-3 sm:py-2.5 rounded-xl hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap disabled:opacity-50">
                  {emailStatus === "loading" ? "..." : t(lang, "homeNewsletterBtn")}
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
            <a href="/tarifs" className="hover:text-gray-700 transition-colors">{t(lang, "navPricing")}</a>
            <a href="/generate" className="hover:text-gray-700 transition-colors">{t(lang, "homeFooterGenerate")}</a>
            <a href="/analyse" className="hover:text-gray-700 transition-colors">{t(lang, "homeFooterAnalyze")}</a>
            <a href="/mentions-legales" className="hover:text-gray-700 transition-colors">{t(lang, "homeFooterLegal")}</a>
            <a href="/cgu" className="hover:text-gray-700 transition-colors">CGU</a>
          </div>
          <p className="text-xs text-gray-400">{t(lang, "homeFooterCopyright")}</p>
        </div>
      </footer>
    </main>
    </>
  );
}
