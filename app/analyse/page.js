"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

export default function Analyse() {
  const [form, setForm] = useState({ offre: "", nom: "", experience: "", competences: "", formation: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Erreur lors de l'analyse");
      } else {
        setResult(data);
      }
    } catch {
      setError("Une erreur est survenue, réessaie.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header minimal */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-lg font-bold text-blue-600">CVAdapt</span>
        </Link>
        <Link href="/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Générer mon CV →
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!result ? (
          /* === PHASE 1 : FORMULAIRE === */
          <>
            {/* En-tête */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-blue-100">
                🎯 Analyse ATS gratuite
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Ton CV passe-t-il les filtres ATS ?
              </h1>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Colle ton offre d&apos;emploi et ton profil — reçois ton score de compatibilité en 30 secondes.
              </p>
            </div>

            {/* Étapes */}
            <div className="flex items-center justify-center gap-4 mb-10 text-sm">
              {[
                { n: "1", label: "Colle l'offre" },
                { n: "2", label: "Entre ton profil" },
                { n: "3", label: "Reçois ton score" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{step.n}</div>
                  <span className="text-gray-600 font-medium">{step.label}</span>
                  {i < 2 && <span className="text-gray-300 ml-2">→</span>}
                </div>
              ))}
            </div>

            {/* Formulaire en 2 colonnes */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Colonne gauche — Offre */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    L&apos;offre d&apos;emploi
                  </h2>
                  <p className="text-gray-400 text-xs mb-4">Copie-colle l&apos;offre depuis LinkedIn, Indeed, etc.</p>
                  <textarea
                    name="offre"
                    value={form.offre}
                    onChange={handleChange}
                    required
                    rows={12}
                    placeholder="Développeur React H/F&#10;&#10;Nous recherchons un développeur React expérimenté...&#10;&#10;Compétences requises :&#10;- React, TypeScript&#10;- Node.js&#10;- Docker, AWS"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-300"
                  />
                </div>

                {/* Colonne droite — Profil */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Ton profil
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Expérience professionnelle</label>
                    <textarea
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="2 ans chez Accenture en tant que développeur React, 1 an chez une startup SaaS..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Compétences</label>
                    <input
                      type="text"
                      name="competences"
                      value={form.competences}
                      onChange={handleChange}
                      required
                      placeholder="React, JavaScript, Node.js, SQL, Git..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Formation</label>
                    <input
                      type="text"
                      name="formation"
                      value={form.formation}
                      onChange={handleChange}
                      required
                      placeholder="Licence Informatique, École d'ingénieur..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 text-lg transition-colors shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Analyse ATS en cours...
                  </span>
                ) : "🎯 Analyser mon CV gratuitement →"}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                ✓ Gratuit · ✓ Sans inscription · ✓ Résultat en 30 secondes
              </p>
            </form>
          </>
        ) : (
          /* === PHASE 2 : RÉSULTATS === */
          <>
            {/* En-tête résultats */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-green-100">
                ✅ Analyse terminée
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ton score ATS</h1>
              <p className="text-gray-500">Voici comment ton profil correspond à cette offre d&apos;emploi</p>
            </div>

            {/* Score principal */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Cercle SVG */}
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke={result.score >= 75 ? "#22c55e" : result.score >= 50 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-gray-900">{result.score}</span>
                    <span className="text-sm text-gray-400">/100</span>
                  </div>
                </div>

                {/* Infos score */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3 ${
                    result.score >= 75 ? "bg-green-100 text-green-700" :
                    result.score >= 50 ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {result.niveau}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {result.score >= 75 ? "Excellent ! Ton CV est bien adapté à cette offre." :
                     result.score >= 50 ? "Bon début, mais tu peux encore améliorer ton score." :
                     "Ton CV nécessite des optimisations importantes pour cette offre."}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {result.score >= 75
                      ? "Tu as de bonnes chances de passer les filtres ATS. Génère ton CV optimisé pour maximiser tes chances."
                      : "CVAdapt peut optimiser ton CV pour intégrer les mots-clés manquants et améliorer ton score."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("cvadapt_analyse_data", JSON.stringify({
                            offre: form.offre,
                            nom: form.nom,
                            experience: form.experience,
                            competences: form.competences,
                            formation: form.formation,
                          }));
                        } catch {}
                        window.location.href = "/generate";
                      }}
                      className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-center"
                    >
                      Générer mon CV optimisé →
                    </button>
                    <button
                      onClick={() => { setResult(null); setError(""); }}
                      className="border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      ← Nouvelle analyse
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille résultats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Mots-clés trouvés */}
              <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                  Mots-clés présents
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{result.keywords_found?.length}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords_found?.map((kw, i) => (
                    <span key={i} className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-xl border border-green-100">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mots-clés manquants */}
              <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-sm">✗</span>
                  Mots-clés manquants
                  <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">{result.keywords_missing?.length}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords_missing?.map((kw, i) => (
                    <span key={i} className="bg-red-50 text-red-700 text-sm font-semibold px-3 py-1.5 rounded-xl border border-red-100">
                      ✗ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Points forts */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                💪 Points forts de ton profil
              </h3>
              <div className="space-y-2">
                {result.strengths?.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-blue-50 rounded-xl px-4 py-3">
                    <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">→</span>
                    <span className="text-blue-800 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 mb-8">
              <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                🎯 Recommandations pour améliorer ton score
              </h3>
              <div className="space-y-3">
                {result.recommendations?.map((r, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-amber-50 pb-3 last:border-0 last:pb-0">
                    <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA final */}
            <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-xl font-bold mb-2">Génère maintenant ton CV optimisé</h3>
              <p className="text-blue-100 mb-6 text-sm">CVAdapt intègre automatiquement les mots-clés manquants et optimise ton CV pour décrocher l&apos;entretien.</p>
              <button
                onClick={() => {
                  try {
                    localStorage.setItem("cvadapt_analyse_data", JSON.stringify({
                      offre: form.offre,
                      nom: form.nom,
                      experience: form.experience,
                      competences: form.competences,
                      formation: form.formation,
                    }));
                  } catch {}
                  window.location.href = "/generate";
                }}
                className="inline-block bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Générer mon CV optimisé →
              </button>
              <p className="text-blue-200 text-xs mt-4">✓ 3 CV gratuits · ✓ Sans carte bancaire · ✓ Résultat en 30 secondes</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
