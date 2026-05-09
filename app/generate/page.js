"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import Logo from "../components/Logo";
import UpgradeModal from "../components/UpgradeModal";

const TEMPLATES = [
  { id: "moderne",     name: "Moderne",     desc: "Gradient bleu",    accent: "#2563eb", bg: "#eff6ff", sidebar: false },
  { id: "classique",   name: "Classique",   desc: "Noir & blanc",     accent: "#111827", bg: "#f9fafb", sidebar: false },
  { id: "creatif",     name: "Créatif",     desc: "Sidebar violette", accent: "#7c3aed", bg: "#faf5ff", sidebar: true  },
  { id: "minimaliste", name: "Minimaliste", desc: "Épuré & vert",     accent: "#16a34a", bg: "#f0fdf4", sidebar: false },
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
  const [atsData, setAtsData] = useState(null);
  const [loadingATS, setLoadingATS] = useState(false);
  const [error, setError] = useState("");
  const [cvCount, setCvCount] = useState(0);
  const [cvMonthCount, setCvMonthCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const CV_LIMIT = 3;

  const isPro = user?.unsafeMetadata?.isPro || false;
  const plan = user?.unsafeMetadata?.plan || "free";

  useEffect(() => {
    if (user) {
      const count = parseInt(user.unsafeMetadata?.cvCount || 0);
      setCvCount(count);

      if (isPro && plan === "essentiel") {
        const currentMonthKey = new Date().toISOString().slice(0, 7);
        const storedKey = user.unsafeMetadata?.cvMonthKey;
        const storedMonthCount = parseInt(user.unsafeMetadata?.cvMonthCount || 0);
        if (storedKey === currentMonthKey) {
          setCvMonthCount(storedMonthCount);
        } else {
          setCvMonthCount(0);
        }
      }
    }
    try {
      const saved = JSON.parse(localStorage.getItem("cvadapt_history") || "[]");
      setHistory(saved);
    } catch {}
  }, [user, isPro, plan]);

  // Pré-remplissage depuis localStorage (ex: page analyse)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cvadapt_analyse_data") || "null");
      if (saved) {
        setForm(f => ({ ...f, ...saved }));
        setWizardStep(2);
        localStorage.removeItem("cvadapt_analyse_data");
      }
    } catch {}
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isPro) {
      if (cvCount >= CV_LIMIT) {
        setError("Tu as atteint la limite de 3 CV gratuits. Passe à un abonnement pour continuer.");
        return;
      }
    } else if (plan === "essentiel") {
      if (cvMonthCount >= 10) {
        setError("Tu as atteint la limite de 10 CV ce mois-ci. Passe au plan Pro pour des CV illimités.");
        return;
      }
    }

    setLoading(true);
    setError("");
    setCv("");
    setLm("");

    try {
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

      setLoadingATS(true);
      setAtsData(null);
      fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(r => r.json()).then(data => {
        if (!data.error) setAtsData(data);
        setLoadingATS(false);
      }).catch(() => setLoadingATS(false));

      if (!isPro) {
        const newCount = cvCount + 1;
        setCvCount(newCount);
        if (user) await user.update({ unsafeMetadata: { ...user.unsafeMetadata, cvCount: newCount } });

        // Dernier CV gratuit utilisé → email de relance + modal
        if (newCount >= CV_LIMIT) {
          setShowUpgradeModal(true);
          const userEmail = user?.primaryEmailAddress?.emailAddress;
          const prenom = user?.firstName || "";
          if (userEmail) {
            fetch("/api/send-upgrade-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: userEmail, prenom }),
            }).catch(() => {});
          }
        }
      } else if (plan === "essentiel") {
        const currentMonthKey = new Date().toISOString().slice(0, 7);
        const newMonthCount = cvMonthCount + 1;
        setCvMonthCount(newMonthCount);
        if (user) {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              cvMonthCount: newMonthCount,
              cvMonthKey: currentMonthKey,
            },
          });
        }
      }

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

      const currentAts = atsData?.score ?? null;
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString("fr-FR"),
        nom: form.nom,
        apercu: form.offre.substring(0, 60) + "...",
        template,
        cv: cvData.cv,
        lm: lmContent,
        atsScore: currentAts,
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

  const isStep1Valid = form.offre.trim().length > 0;
  const isStep2Valid = form.nom.trim().length > 0 && form.experience.trim().length > 0 && form.competences.trim().length > 0 && form.formation.trim().length > 0;
  const isGenerateDisabled = loading || (!isPro && cvCount >= CV_LIMIT) || (isPro && plan === "essentiel" && cvMonthCount >= 10);

  const selectedTemplate = TEMPLATES.find(t => t.id === template);
  const offrePreview = form.offre.split("\n").slice(0, 4).join("\n").substring(0, 200);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Modal upgrade */}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size={28} />
          <span className="text-lg font-bold text-blue-600">CVAdapt</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            title="Historique"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3M3.05 11A9 9 0 1 0 4 6.3" strokeLinecap="round"/>
              <path d="M3 3v4h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{history.length}</span>
            )}
          </button>

          {isPro ? (
            <div className="flex items-center gap-1 bg-green-100 px-2.5 py-1 rounded-lg">
              <span className="text-xs font-bold text-green-700">PRO</span>
              {plan === "essentiel" && <span className="text-xs text-green-600 hidden sm:inline">· {10 - cvMonthCount} restants</span>}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${cvCount >= CV_LIMIT ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"}`}>
                <span>{CV_LIMIT - cvCount}/{CV_LIMIT}</span>
                <span className="hidden sm:inline text-gray-400 font-normal">gratuits</span>
              </div>
              {cvCount >= CV_LIMIT && (
                <Link href="/tarifs" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 whitespace-nowrap">
                  Passer Pro
                </Link>
              )}
            </div>
          )}

          <UserButton userProfileUrl="/account" userProfileMode="navigation" />
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

      <div className="max-w-lg mx-auto px-4 py-8">
        {!cv ? (
          <>
            {/* Banners upsell — toujours visibles en haut */}
            {!isPro && cvCount >= CV_LIMIT && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
                <p className="text-amber-800 text-sm font-medium">Tu as utilisé tes 3 CV gratuits.</p>
                <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Voir les abonnements →
                </Link>
              </div>
            )}
            {isPro && plan === "essentiel" && cvMonthCount >= 10 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
                <p className="text-amber-800 text-sm font-medium">Tu as atteint les 10 CV de ce mois (plan Essentiel).</p>
                <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Passer au plan Pro →
                </Link>
              </div>
            )}

            {/* Barre de progression */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Étape {wizardStep} sur 3</span>
                <span className="text-xs text-gray-400">{wizardStep === 1 ? "L'offre" : wizardStep === 2 ? "Ton profil" : "Finaliser"}</span>
              </div>
              <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1 — L'offre */}
            {wizardStep === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Quelle offre cibles-tu ?</h1>
                <p className="text-sm text-gray-500 mb-5">Choisis un template et colle l'offre d'emploi.</p>

                {/* Sélecteur de template */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Choisis un template</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TEMPLATES.map((t) => (
                      <button key={t.id} type="button" onClick={() => setTemplate(t.id)}
                        className={`rounded-xl border-2 text-center transition-all cursor-pointer overflow-hidden ${
                          template === t.id ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                        }`}>
                        <div style={{ background: t.bg, padding: "8px 6px", display: "flex", gap: 4, height: 72 }}>
                          {t.sidebar && (
                            <div style={{ width: 18, background: t.accent, borderRadius: 3, flexShrink: 0 }} />
                          )}
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                            <div style={{ height: 8, background: t.accent, borderRadius: 2, width: "70%" }} />
                            <div style={{ height: 4, background: t.accent + "60", borderRadius: 2, width: "50%" }} />
                            <div style={{ height: 2, background: "#e5e7eb", borderRadius: 1, marginTop: 2 }} />
                            <div style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: "90%" }} />
                            <div style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: "75%" }} />
                            <div style={{ height: 2, background: "#e5e7eb", borderRadius: 1, marginTop: 2 }} />
                            <div style={{ height: 2, background: "#e5e7eb", borderRadius: 1, width: "80%" }} />
                          </div>
                        </div>
                        <div className={`px-1 py-1.5 ${template === t.id ? "bg-blue-50" : "bg-white"}`}>
                          <p className={`text-xs font-bold leading-tight ${template === t.id ? "text-blue-600" : "text-gray-700"}`}>{t.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea offre */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Colle l'offre d'emploi ici</label>
                  <textarea
                    name="offre"
                    value={form.offre}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Copie-colle l'offre d'emploi depuis LinkedIn, Indeed, etc."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  disabled={!isStep1Valid}
                  className="bg-blue-600 text-white w-full py-3.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            )}

            {/* Step 2 — Ton profil */}
            {wizardStep === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Parle-nous de toi</h1>
                <p className="text-sm text-gray-500 mb-5">Ces infos serviront à personnaliser ton CV.</p>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ton nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Ex : Jean Dupont"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ton expérience professionnelle</label>
                    <textarea
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Ex : 2 ans chez Carrefour comme vendeur, 1 an chez McDonald's..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tes compétences</label>
                    <input
                      type="text"
                      name="competences"
                      value={form.competences}
                      onChange={handleChange}
                      placeholder="Ex : Excel, gestion d'équipe, service client, permis B..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ta formation</label>
                    <input
                      type="text"
                      name="formation"
                      value={form.formation}
                      onChange={handleChange}
                      placeholder="Ex : Bac Pro Commerce, BTS Marketing..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="text-gray-500 text-sm hover:text-gray-700 transition-colors py-3.5 px-2"
                  >
                    ← Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Continuer →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Finaliser */}
            {wizardStep === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Presque prêt !</h1>
                  <p className="text-sm text-gray-500 mb-5">Vérifie le récapitulatif et génère ton CV.</p>

                  {/* Récapitulatif */}
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-5 space-y-3">
                    {/* Template choisi */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-10 rounded flex-shrink-0 overflow-hidden border border-gray-200"
                        style={{ background: selectedTemplate?.bg }}
                      >
                        <div style={{ padding: "3px 2px", display: "flex", gap: 2, height: "100%" }}>
                          {selectedTemplate?.sidebar && (
                            <div style={{ width: 5, background: selectedTemplate?.accent, borderRadius: 1 }} />
                          )}
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, paddingTop: 1 }}>
                            <div style={{ height: 3, background: selectedTemplate?.accent, borderRadius: 1, width: "70%" }} />
                            <div style={{ height: 1.5, background: selectedTemplate?.accent + "60", borderRadius: 1, width: "50%" }} />
                            <div style={{ height: 1, background: "#e5e7eb", borderRadius: 1, marginTop: 1 }} />
                            <div style={{ height: 1, background: "#e5e7eb", borderRadius: 1, width: "90%" }} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Template</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedTemplate?.name} — {selectedTemplate?.desc}</p>
                      </div>
                    </div>

                    {/* Aperçu offre */}
                    {offrePreview && (
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Offre</p>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-4 whitespace-pre-line">{offrePreview}{form.offre.length > 200 ? "…" : ""}</p>
                      </div>
                    )}
                  </div>

                  {/* Checkbox lettre de motivation */}
                  <label className="flex items-center gap-3 bg-purple-50 border border-purple-100 rounded-xl px-4 py-4 cursor-pointer hover:bg-purple-100 transition-colors mb-5">
                    <input
                      type="checkbox"
                      checked={withLM}
                      onChange={(e) => setWithLM(e.target.checked)}
                      className="w-4 h-4 accent-purple-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-purple-800">✉️ Générer aussi une lettre de motivation</p>
                      <p className="text-xs text-purple-500 mt-0.5">Adaptée à l'offre, prête à envoyer</p>
                    </div>
                  </label>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">{error}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="text-gray-500 text-sm hover:text-gray-700 transition-colors py-3.5 px-2"
                    >
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      disabled={isGenerateDisabled}
                      className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
                    >
                      {loading
                        ? (withLM ? "Génération CV + lettre... ⏳" : "Génération en cours... ⏳")
                        : (withLM ? "Générer CV + LM →" : "Générer mon CV →")}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Barre succès */}
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-4 flex items-center justify-between flex-wrap gap-3">
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
                <button onClick={() => { setCv(""); setLm(""); setAtsData(null); setWizardStep(1); }}
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

            {/* Banners post-génération */}
            <div className="flex flex-col gap-3 mb-6">

              {/* 1. LM non générée → upsell lettre */}
              {!lm && !loadingLM && !withLM && (
                <div className="flex items-center justify-between gap-4 bg-purple-50 border border-purple-100 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">✉️</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-purple-900">Ajoute une lettre de motivation</p>
                      <p className="text-xs text-purple-500 truncate">Adaptée à cette offre · Prête en 20 secondes</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      setWithLM(true);
                      setLoadingLM(true);
                      setActiveTab("lm");
                      const lmRes = await fetch("/api/generate-lm", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form),
                      });
                      const lmData = await lmRes.json();
                      if (lmRes.ok) setLm(lmData.lm);
                      setLoadingLM(false);
                    }}
                    className="bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap shrink-0">
                    Générer →
                  </button>
                </div>
              )}

              {/* 2. Upsell plan — dernier CV gratuit */}
              {!isPro && cvCount === CV_LIMIT - 1 && (
                <div className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">⚠️</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-amber-900">Plus qu'un CV gratuit restant</p>
                      <p className="text-xs text-amber-600">Passe à Étudiant pour des CV illimités à 4,99€/mois</p>
                    </div>
                  </div>
                  <a href="/tarifs"
                    className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap shrink-0">
                    Voir l'offre →
                  </a>
                </div>
              )}

              {/* 3. Upsell plan — limite atteinte */}
              {!isPro && cvCount >= CV_LIMIT && (
                <div className="flex items-center justify-between gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">🚀</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-blue-900">Tu as utilisé tes 3 CV gratuits</p>
                      <p className="text-xs text-blue-600">Continue avec le plan Étudiant à 4,99€/mois</p>
                    </div>
                  </div>
                  <a href="/tarifs"
                    className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0">
                    Passer Pro →
                  </a>
                </div>
              )}

              {/* 4. Partage */}
              <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">🎁</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800">Un ami cherche un emploi ?</p>
                    <p className="text-xs text-gray-400">Partage CVAdapt — c'est gratuit pour commencer</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "CVAdapt", text: "Génère un CV optimisé ATS en 30 secondes — gratuit !", url: "https://cvadapt.eu" });
                    } else {
                      navigator.clipboard.writeText("https://cvadapt.eu");
                      alert("Lien copié !");
                    }
                  }}
                  className="border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0">
                  Partager
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
              <button onClick={() => setActiveTab("ats")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "ats" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                🎯 Score ATS {loadingATS && "⏳"} {atsData && !loadingATS && <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${atsData.score >= 75 ? "bg-green-100 text-green-700" : atsData.score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{atsData.score}/100</span>}
              </button>
            </div>

            {/* Aperçu */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">
                  {activeTab === "cv" ? "Aperçu du CV" : activeTab === "lm" ? "Aperçu de la lettre de motivation" : "Analyse de compatibilité ATS"}
                </span>
              </div>
              {activeTab === "ats" ? (
                loadingATS ? (
                  <div className="p-16 text-center text-gray-400">
                    <div className="text-4xl mb-4 animate-spin">⚙️</div>
                    <p className="font-medium">Analyse ATS en cours...</p>
                    <p className="text-sm mt-2">Comparaison avec l'offre d'emploi</p>
                  </div>
                ) : atsData ? (
                  <div className="p-8">
                    {/* Score principal */}
                    <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-2xl">
                      <div className="flex-shrink-0 relative w-28 h-28">
                        <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                          <circle cx="50" cy="50" r="40" fill="none"
                            stroke={atsData.score >= 75 ? "#22c55e" : atsData.score >= 50 ? "#f59e0b" : "#ef4444"}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - atsData.score / 100)}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-extrabold text-gray-900">{atsData.score}</span>
                          <span className="text-xs text-gray-500">/100</span>
                        </div>
                      </div>
                      <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${atsData.score >= 75 ? "bg-green-100 text-green-700" : atsData.score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {atsData.niveau}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Score de compatibilité ATS</h3>
                        <p className="text-gray-500 text-sm">Basé sur les mots-clés, l'expérience et les compétences</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                          Mots-clés présents ({atsData.keywords_found?.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {atsData.keywords_found?.map((kw, i) => (
                            <span key={i} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">{kw}</span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                        <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center text-white text-xs">✗</span>
                          Mots-clés manquants ({atsData.keywords_missing?.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {atsData.keywords_missing?.map((kw, i) => (
                            <span key={i} className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">{kw}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                      <h4 className="font-bold text-blue-800 mb-3">💪 Points forts de ton profil</h4>
                      <ul className="space-y-2">
                        {atsData.strengths?.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                            <span className="mt-0.5 flex-shrink-0 text-blue-400">→</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                      <h4 className="font-bold text-amber-800 mb-3">🎯 Recommandations pour améliorer ton score</h4>
                      <ul className="space-y-2">
                        {atsData.recommendations?.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                            <span className="font-bold flex-shrink-0 text-amber-500">{i + 1}.</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center text-gray-400">
                    <p>Analyse ATS non disponible</p>
                  </div>
                )
              ) : (
                activeTab === "lm" && loadingLM ? (
                  <div className="p-16 text-center text-gray-400">
                    <div className="text-4xl mb-4">✉️</div>
                    <p className="font-medium">Génération de la lettre en cours...</p>
                  </div>
                ) : (
                  <div className="p-10" dangerouslySetInnerHTML={{ __html: activeTab === "cv" ? cv : lm }} />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
