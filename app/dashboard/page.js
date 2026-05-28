"use client";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import Logo from "../components/Logo";

const PLAN_LABELS = {
  free: { label: "Gratuit", color: "bg-gray-100 text-gray-600", limit: "3 CV au total" },
  essentiel: { label: "Étudiant", color: "bg-blue-100 text-blue-700", limit: "15 CV / mois" },
  pro: { label: "Pro", color: "bg-purple-100 text-purple-700", limit: "CV illimités" },
};

const TEMPLATE_COLORS = {
  moderne: "bg-blue-500",
  classique: "bg-gray-700",
  creatif: "bg-purple-600",
  minimaliste: "bg-green-600",
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [previewEntry, setPreviewEntry] = useState(null);
  const [activeTab, setActiveTab] = useState("cv");

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in?redirect_url=/dashboard");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cvadapt_history") || "[]");
      setHistory(saved);
    } catch {}
  }, []);

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const plan = user.unsafeMetadata?.plan || "free";
  const isPro = user.unsafeMetadata?.isPro || false;
  const cvCount = parseInt(user.unsafeMetadata?.cvCount || 0);
  const planInfo = PLAN_LABELS[plan] || PLAN_LABELS.free;

  // Stats calculées depuis l'historique
  const totalCVs = history.length;
  const withLM = history.filter((h) => h.lm).length;
  const avgScore = history.length > 0 && history.some((h) => h.atsScore)
    ? Math.round(history.filter((h) => h.atsScore).reduce((acc, h) => acc + h.atsScore, 0) / history.filter((h) => h.atsScore).length)
    : null;
  const bestScore = history.length > 0 && history.some((h) => h.atsScore)
    ? Math.max(...history.filter((h) => h.atsScore).map((h) => h.atsScore))
    : null;

  function deleteEntry(id) {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    try { localStorage.setItem("cvadapt_history", JSON.stringify(updated)); } catch {}
    if (previewEntry?.id === id) setPreviewEntry(null);
  }

  function handlePrint(content, title = "CV") {
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; background: white; }
      @media print { body { margin: 0; } @page { margin: 15mm; } }
    </style></head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-bold text-blue-600">CVAdapt</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/generate" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Générer un CV
            </Link>
            <Link href="/analyse" className="text-sm text-gray-600 hover:text-gray-900 font-medium hidden sm:inline">
              Analyser
            </Link>
            <UserButton afterSignOutUrl="/" userProfileUrl="/account" userProfileMode="navigation" />
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour {user.firstName || user.emailAddresses[0]?.emailAddress?.split("@")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">Voici ton espace CVAdapt — tous tes CV en un coup d'œil.</p>
        </div>

        {/* Cards stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* Plan */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Ton plan</p>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${planInfo.color}`}>
                {planInfo.label}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{planInfo.limit}</p>
            {!isPro && (
              <Link href="/tarifs" className="text-xs text-blue-600 font-semibold mt-2 inline-block hover:underline">
                Passer Pro →
              </Link>
            )}
          </div>

          {/* CV générés */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">CV générés</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalCVs}</p>
            <p className="text-xs text-gray-400 mt-1">
              {!isPro ? `${Math.max(0, 3 - cvCount)} restant(s) gratuits` : ""}
            </p>
          </div>

          {/* Score ATS moyen */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Score ATS moyen</p>
            {avgScore !== null ? (
              <p className={`text-3xl font-extrabold ${avgScore >= 70 ? "text-green-600" : avgScore >= 40 ? "text-yellow-500" : "text-red-500"}`}>
                {avgScore}<span className="text-lg font-semibold text-gray-400">/100</span>
              </p>
            ) : (
              <p className="text-2xl font-bold text-gray-300">—</p>
            )}
          </div>

          {/* Lettres de motivation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Lettres de motiv.</p>
            <p className="text-3xl font-extrabold text-gray-900">{withLM}</p>
            <p className="text-xs text-gray-400 mt-1">générées</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/generate"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>+</span> Nouveau CV
          </Link>
          <Link
            href="/analyse"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            🎯 Analyser mon CV
          </Link>
          {!isPro && (
            <Link
              href="/tarifs"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              ⚡ Passer Premium
            </Link>
          )}
        </div>

        {/* Historique */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Historique des CV</h2>
            <span className="text-xs text-gray-400">{totalCVs} CV sauvegardé{totalCVs > 1 ? "s" : ""}</span>
          </div>

          {history.length === 0 ? (
            <div className="py-14 text-center px-6">
              {/* Score mock */}
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12"
                      strokeDasharray="0 251" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-extrabold text-gray-300">?</span>
                  </div>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-800 mb-1">Quel est ton score ATS ?</p>
              <p className="text-gray-400 text-sm mb-2 max-w-xs mx-auto">
                75% des CV sont rejetés avant d&apos;être lus. Génère ton premier CV optimisé en 30 secondes.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Sans carte bancaire
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Résultat en 30s
                </div>
              </div>
              <Link
                href="/generate"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
              >
                🚀 Générer mon premier CV
              </Link>
              <p className="text-xs text-gray-300 mt-4">
                Rejoins {new Intl.NumberFormat("fr-FR").format(12847 + Math.round((Date.now() - new Date("2025-01-01")) / 86400000 * 7.3))} étudiants qui l&apos;ont déjà fait
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {history.map((entry) => (
                <div key={entry.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Template color dot */}
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${TEMPLATE_COLORS[entry.template] || "bg-gray-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900 text-sm truncate">{entry.nom || "Sans nom"}</p>
                          {entry.atsScore && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${entry.atsScore >= 70 ? "bg-green-100 text-green-700" : entry.atsScore >= 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              ATS {entry.atsScore}/100
                            </span>
                          )}
                          {entry.lm && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                              + LM
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{entry.apercu}</p>
                        <p className="text-xs text-gray-300 mt-0.5">{entry.date} · Template {entry.template}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => { setPreviewEntry(entry); setActiveTab("cv"); }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => handlePrint(entry.cv, `CV - ${entry.nom}`)}
                        className="text-xs text-gray-500 hover:text-gray-800 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Imprimer
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Supprimer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upsell si free */}
        {!isPro && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">⭐ LE PLUS POPULAIRE</span>
                </div>
                <p className="font-bold text-lg">Débloquer 15 CV par mois</p>
                <p className="text-blue-100 text-sm mt-1">
                  Plan Étudiant · 4,99€/mois · Score ATS + Lettre de motivation incluse
                </p>
              </div>
              <Link
                href="/tarifs"
                className="flex-shrink-0 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap shadow-lg"
              >
                Passer Étudiant →
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/20">
              {["15 CV / mois", "Score ATS complet", "Lettre de motivation", "Annulation gratuite"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="text-white font-bold">✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de prévisualisation */}
      {previewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <p className="font-bold text-gray-900">{previewEntry.nom}</p>
                <span className="text-xs text-gray-400">{previewEntry.date}</span>
              </div>
              <div className="flex items-center gap-2">
                {previewEntry.lm && (
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
                    <button
                      onClick={() => setActiveTab("cv")}
                      className={`px-4 py-1.5 font-medium transition-colors ${activeTab === "cv" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      CV
                    </button>
                    <button
                      onClick={() => setActiveTab("lm")}
                      className={`px-4 py-1.5 font-medium transition-colors ${activeTab === "lm" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      Lettre
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handlePrint(activeTab === "cv" ? previewEntry.cv : previewEntry.lm, activeTab === "cv" ? `CV - ${previewEntry.nom}` : `LM - ${previewEntry.nom}`)}
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Imprimer
                </button>
                <button
                  onClick={() => setPreviewEntry(null)}
                  className="text-gray-400 hover:text-gray-700 text-xl font-light px-2"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Modal body */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div
                className="bg-white rounded-xl shadow-sm mx-auto"
                style={{ maxWidth: 800 }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeTab === "cv" ? previewEntry.cv : previewEntry.lm) }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
