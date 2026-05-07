"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./components/Logo";

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
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ─── HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-bold text-blue-600">CVAdapt</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-5">
            <a href="/tarifs" className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900 font-medium">Tarifs</a>
            <a href="/blog" className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900 font-medium">Blog</a>
            <a href="/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Commencer gratuitement
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          🎓 Conçu pour les étudiants &amp; alternants
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
          Ton CV passe les filtres<br />
          <span className="text-blue-600">en 30 secondes.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          75% des CV sont rejetés par un algorithme avant d&apos;être lus.
          CVAdapt détecte ce qui manque et génère un CV optimisé pour chaque offre — gratuitement.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="/analyse" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Analyser mon CV gratuitement →
          </a>
          <a href="#comment-ca-marche" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors">
            Comment ça marche
          </a>
        </div>

        <p className="text-sm text-gray-400">⭐ 4,9/5 · 12 847 étudiants · Gratuit pour commencer</p>

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
      <section className="py-8 px-5 bg-gray-50 border-y border-gray-100">
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">Ils ont décroché des postes chez</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-3xl mx-auto">
          {["Capgemini", "Société Générale", "L'Oréal", "BNP Paribas", "Decathlon", "Orange", "Thales", "Renault"].map((b) => (
            <span key={b} className="text-sm font-bold italic text-gray-400">{b}</span>
          ))}
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ───────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Simple</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">3 étapes. 30 secondes.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "1", emoji: "📋", title: "Colle l'offre", desc: "Copie n'importe quelle offre depuis LinkedIn, Indeed, APEC…" },
              { n: "2", emoji: "✍️", title: "Entre tes infos", desc: "Ton expérience, tes compétences, ta formation en quelques lignes." },
              { n: "3", emoji: "🚀", title: "Reçois ton CV", desc: "Score ATS, mots-clés intégrés, CV PDF prêt à envoyer." },
            ].map((step) => (
              <div key={step.n} className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-6xl font-black text-gray-100 absolute top-4 right-5 leading-none select-none">{step.n}</div>
                <div className="text-3xl mb-4">{step.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1.5">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/generate" className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
              Essayer gratuitement →
            </a>
          </div>
        </div>
      </section>

      {/* ─── AVANT / APRÈS ───────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gray-50">
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
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">12 847 étudiants ont décroché leurs entretiens</h2>
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
      <section className="py-20 px-5 bg-gray-50">
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
                  { t: "3 CV complets", ok: true },
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
              <div className="flex items-end gap-1 mb-6">
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
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Pro</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">9,99€</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
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
      <section className="py-20 px-5" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ton prochain entretien commence maintenant.
          </h2>
          <p className="text-blue-200 mb-8">3 CV gratuits · Aucune carte · Résultat en 30 secondes</p>
          <a href="/analyse"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg mb-10 text-base">
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
      <footer className="border-t border-gray-100 py-8 px-5">
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
