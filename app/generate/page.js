"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import Logo from "../components/Logo";

const TEMPLATES = [
  { id: "moderne", name: "Moderne", desc: "Gradient bleu", color: "bg-blue-600" },
  { id: "classique", name: "Classique", desc: "Noir & blanc", color: "bg-gray-800" },
  { id: "creatif", name: "Créatif", desc: "Sidebar violette", color: "bg-purple-600" },
  { id: "minimaliste", name: "Minimaliste", desc: "Épuré & vert", color: "bg-green-600" },
];

export default function Generate() {
  const { user } = useUser();
  const [form, setForm] = useState({ nom: "", offre: "", experience: "", competences: "", formation: "" });
  const [template, setTemplate] = useState("moderne");
  const [withLM, setWithLM] = useState(false);
  const [cv, setCv] = useState("");
  const [lm, setLm] = useState("");
  const [activeTab, setActiveTab] = useState("cv");
  const [loading, setLoading] = useState(false);
  const [loadingLM, setLoadingLM] = useState(false);
  const [error, setError] = useState("");
  const [cvCount, setCvCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const CV_LIMIT = 3;

  useEffect(() => {
    if (user) {
      const count = parseInt(user.unsafeMetadata?.cvCount || 0);
      setCvCount(count);
    }
    try {
      const saved = JSON.parse(localStorage.getItem("cvadapt_history") || "[]");
      setHistory(saved);
    } catch {}
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cvCount >= CV_LIMIT) {
      setError("Tu as atteint la limite de 3 CV gratuits. Passe à un abonnement pour continuer.");
      return;
    }
    setLoading(true);
    setError("");
    setCv("");
    setLm("");

    try {
      // Génération du CV
      const cvRes = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, template }),
      });
      const cvData = await cvRes.json();

      if (!cvRes.ok) {
        setError(cvData.error || "Erreur lors de la génération du CV");
        setLoading(false);
        return;
      }

      setCv(cvData.cv);
      setActiveTab("cv");

      // Mise à jour du compteur
      const newCount = cvCount + 1;
      setCvCount(newCount);
      if (user) await user.update({ unsafeMetadata: { cvCount: newCount } });

      // Génération de la LM en parallèle
      let lmContent = "";
      if (withLM) {
        setLoadingLM(true);
        const lmRes = await fetch("/api/generate-lm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const lmData = await lmRes.json();
        if (lmRes.ok) {
          lmContent = lmData.lm;
          setLm(lmData.lm);
        }
        setLoadingLM(false);
      }

      // Sauvegarde dans l'historique
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString("fr-FR"),
        nom: form.nom,
        apercu: form.offre.substring(0, 60) + "...",
        template,
        cv: cvData.cv,
        lm: lmContent,
      };
      const newHistory = [newEntry, ...history].slice(0, 10);
      setHistory(newHistory);
      try { localStorage.setItem("cvadapt_history", JSON.stringify(newHistory)); } catch {}

    } catch {
      setError("Une erreur est survenue, réessaie.");
    }
    setLoading(false);
  }

  function handlePrint(content, title) {
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; background: white; }
      @media print { body { margin: 0; } @page { margin: 15mm; } }
    </style></head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }

  function loadFromHistory(entry) {
    setCv(entry.cv);
    setLm(entry.lm || "");
    setActiveTab("cv");
    setShowHistory(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            📋 Historique
            {history.length > 0 && (
              <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full font-bold">{history.length}</span>
            )}
          </button>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            <span className="text-sm text-gray-600">CV gratuits :</span>
            <span className={`text-sm font-bold ${cvCount >= CV_LIMIT ? "text-red-500" : "text-blue-600"}`}>
              {CV_LIMIT - cvCount} / {CV_LIMIT}
            </span>
          </div>
          {cvCount >= CV_LIMIT && (
            <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
              Passer Pro
            </Link>
          )}
          <UserButton />
        </div>
      </header>

      {/* Historique */}
      {showHistory && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Tes CV générés</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">Aucun CV dans l'historique pour l'instant.</p>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${TEMPLATES.find(t => t.id === entry.template)?.color || "bg-blue-600"}`}></div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{entry.nom}</p>
                        <p className="text-gray-400 text-xs">{entry.date} · {entry.apercu}</p>
                      </div>
                    </div>
                    <button onClick={() => loadFromHistory(entry)}
                      className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                      Revoir →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        {!cv ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Génère ton CV adapté</h1>
            <p className="text-gray-600 mb-8">Remplis le formulaire et reçois un CV optimisé en 30 secondes.</p>

            {cvCount >= CV_LIMIT && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                <p className="text-amber-800 text-sm font-medium">Tu as utilisé tes 3 CV gratuits.</p>
                <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Voir les abonnements →
                </Link>
              </div>
            )}

            {/* Sélecteur de template */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Choisis un template</label>
              <div className="grid grid-cols-4 gap-3">
                {TEMPLATES.map((t) => (
                  <button key={t.id} type="button" onClick={() => setTemplate(t.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      template === t.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}>
                    <div className={`w-8 h-8 rounded-full ${t.color} mx-auto mb-2`}></div>
                    <p className={`text-xs font-bold ${template === t.id ? "text-blue-600" : "text-gray-700"}`}>{t.name}</p>
                    <p className={`text-xs mt-0.5 ${template === t.id ? "text-blue-400" : "text-gray-400"}`}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ton nom complet</label>
                <input type="text" name="nom" value={form.nom} onChange={handleChange} required
                  placeholder="Ex: Jean Dupont"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colle l'offre d'emploi ici</label>
                <textarea name="offre" value={form.offre} onChange={handleChange} required rows={6}
                  placeholder="Copie-colle l'offre d'emploi depuis LinkedIn, Indeed, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ton expérience professionnelle</label>
                <textarea name="experience" value={form.experience} onChange={handleChange} required rows={4}
                  placeholder="Ex: 2 ans chez Carrefour comme vendeur, 1 an chez McDonald's..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tes compétences</label>
                <input type="text" name="competences" value={form.competences} onChange={handleChange} required
                  placeholder="Ex: Excel, gestion d'équipe, service client, permis B..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ta formation</label>
                <input type="text" name="formation" value={form.formation} onChange={handleChange} required
                  placeholder="Ex: Bac Pro Commerce, BTS Marketing..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>

              {/* Option lettre de motivation */}
              <label className="flex items-center gap-3 bg-purple-50 border border-purple-100 rounded-xl px-4 py-4 cursor-pointer hover:bg-purple-100 transition-colors">
                <input type="checkbox" checked={withLM} onChange={(e) => setWithLM(e.target.checked)}
                  className="w-4 h-4 accent-purple-600" />
                <div>
                  <p className="text-sm font-semibold text-purple-800">✉️ Générer aussi une lettre de motivation</p>
                  <p className="text-xs text-purple-500 mt-0.5">Adaptée à l'offre, prête à envoyer</p>
                </div>
              </label>

              {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

              <button type="submit" disabled={loading || cvCount >= CV_LIMIT}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 text-lg transition-colors">
                {loading
                  ? (withLM ? "Génération CV + lettre... ⏳" : "Génération en cours... ⏳")
                  : (withLM ? "Générer CV + lettre de motivation →" : "Générer mon CV →")}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Barre succès */}
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-800 font-semibold">
                    {lm || loadingLM ? "CV + Lettre de motivation générés !" : "Ton CV est prêt !"}
                  </p>
                  <p className="text-green-600 text-sm">Adapté à l'offre · Optimisé pour les recruteurs</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setCv(""); setLm(""); }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  ← Nouveau
                </button>
                <button
                  onClick={() => handlePrint(
                    activeTab === "cv" ? cv : lm,
                    activeTab === "cv" ? `CV - ${form.nom}` : `Lettre de motivation - ${form.nom}`
                  )}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm">
                  📄 Télécharger PDF
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-xl w-fit">
              <button onClick={() => setActiveTab("cv")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "cv" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                📄 CV
              </button>
              {(lm || loadingLM) && (
                <button onClick={() => setActiveTab("lm")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "lm" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  ✉️ Lettre de motivation {loadingLM && "⏳"}
                </button>
              )}
            </div>

            {/* Aperçu */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">
                  {activeTab === "cv" ? "Aperçu du CV" : "Aperçu de la lettre de motivation"}
                </span>
              </div>
              {activeTab === "lm" && loadingLM ? (
                <div className="p-16 text-center text-gray-400">
                  <div className="text-4xl mb-4">✉️</div>
                  <p className="font-medium">Génération de la lettre en cours...</p>
                </div>
              ) : (
                <div className="p-10" dangerouslySetInnerHTML={{ __html: activeTab === "cv" ? cv : lm }} />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
