"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import DOMPurify from "isomorphic-dompurify";
import Logo from "../components/Logo";
import UpgradeModal from "../components/UpgradeModal";
import PostGenerationUpsell from "../components/PostGenerationUpsell";
import ReferralPopup from "../components/ReferralPopup";

const TEMPLATES = [
  { id: "moderne",     name: "Sobre",      desc: "Ardoise & épuré",  accent: "#1e293b", bg: "#f8fafc", sidebar: false },
  { id: "classique",   name: "Coupure",    desc: "Éditorial & ambre", accent: "#92400e", bg: "#fef3c7", sidebar: false },
  { id: "creatif",     name: "Atelier",    desc: "Sidebar sombre & or", accent: "#0f172a", bg: "#fafafa", sidebar: true  },
  { id: "minimaliste", name: "Trait",      desc: "Minimaliste & teal", accent: "#0f766e", bg: "#f0fdfa", sidebar: false },
];

/* ── Input style objects (used via onFocus/onBlur) ─────────────── */
const inputStyle = {
  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
  padding: "12px 14px", outline: "none", fontSize: 14, color: "#0f172a",
  background: "#fafafa", fontFamily: "inherit", boxSizing: "border-box",
  transition: "border-color 0.15s, box-shadow 0.15s",
};
const inputFocusStyle = {
  borderColor: "#2563eb", background: "#fff", boxShadow: "0 0 0 3px rgba(37,99,235,0.1)",
};

/* ── FieldGroup: label + hint + children ───────────────────────── */
function FieldGroup({ label, hint, children }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 7 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{label}</p>
        {hint && <p style={{ fontSize: 11, color: "#9ca3af" }}>{hint}</p>}
      </div>
      {children}
    </div>
  );
}

/* ── TemplateMiniPreview: realistic CV thumbnail ───────────────── */
function TemplateMiniPreview({ t, compact }) {
  if (!t) return null;
  const h = compact ? "100%" : 130;

  if (t.id === "creatif") {
    return (
      <div style={{ display: "flex", height: h, background: "#fff" }}>
        <div style={{ width: "36%", background: t.accent, padding: "7px 5px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.28)", margin: "0 auto 4px" }} />
          {[55, 75, 60, 45, 65, 50].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: w + "%", background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: "7px 7px" }}>
          <div style={{ height: 5, width: "70%", background: "#111827", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: "50%", background: t.accent, borderRadius: 2, marginBottom: 7 }} />
          {[90, 80, 70, 85, 60, 75, 55, 80].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: w + "%", background: i % 3 === 0 ? "#d1d5db" : "#e9ecef", borderRadius: 2, marginBottom: 2.5 }} />
          ))}
        </div>
      </div>
    );
  }
  if (t.id === "classique") {
    return (
      <div style={{ background: "#fff", padding: "9px 9px", height: h }}>
        <div style={{ height: 5.5, width: "58%", background: "#111827", borderRadius: 2, marginBottom: 3 }} />
        <div style={{ height: 3, width: "38%", background: "#6b7280", borderRadius: 2, marginBottom: 5 }} />
        <div style={{ height: 1, background: "#111827", marginBottom: 5 }} />
        {[95, 85, 75, 60, 90, 70, 55, 80].map((w, i) => (
          <div key={i} style={{ height: 2.5, width: w + "%", background: i % 4 === 0 ? "#374151" : "#d1d5db", borderRadius: 2, marginBottom: 2.5 }} />
        ))}
      </div>
    );
  }
  if (t.id === "moderne") {
    return (
      <div style={{ background: "#fff", height: h, overflow: "hidden" }}>
        <div style={{ height: compact ? 20 : 28, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", padding: "5px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ height: compact ? 4 : 5, width: "55%", background: "rgba(255,255,255,0.9)", borderRadius: 2, marginBottom: 2 }} />
          <div style={{ height: compact ? 2.5 : 3, width: "35%", background: "rgba(255,255,255,0.5)", borderRadius: 2 }} />
        </div>
        <div style={{ padding: "6px 8px" }}>
          {[90, 80, 70, 85, 60, 75, 55, 65].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: w + "%", background: i % 4 === 0 ? "#bfdbfe" : "#e9ecef", borderRadius: 2, marginBottom: 2.5 }} />
          ))}
        </div>
      </div>
    );
  }
  // minimaliste
  return (
    <div style={{ background: "#fff", padding: "9px 9px", height: h }}>
      <div style={{ height: 5, width: "48%", background: "#111827", borderRadius: 2, marginBottom: 2 }} />
      <div style={{ height: 2.5, width: "28%", background: t.accent, borderRadius: 2, marginBottom: 7 }} />
      <div style={{ height: 1, background: t.accent + "40", marginBottom: 6 }} />
      {[90, 80, 65, 85, 55, 75, 60, 80].map((w, i) => (
        <div key={i} style={{ height: 2.5, width: w + "%", background: i % 4 === 0 ? t.accent + "55" : "#e9ecef", borderRadius: 2, marginBottom: 2.5 }} />
      ))}
    </div>
  );
}

export default function Generate() {
  const { user } = useUser();
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", offre: "", experience: "", competences: "", formation: "" });
  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);
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
  const [showPostGenUpsell, setShowPostGenUpsell] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
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

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert("La photo doit faire moins de 3 Mo."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isPro) {
      if (cvCount >= CV_LIMIT) {
        setError("Tu as atteint la limite de 3 CV gratuits. Passe à un abonnement pour continuer.");
        try { window.clarity?.("event", "limit_hit_free"); } catch {}
        return;
      }
    } else if (plan === "essentiel") {
      if (cvMonthCount >= 15) {
        setError("Tu as atteint la limite de 15 CV ce mois-ci. Passe au plan Pro pour des CV illimités.");
        try { window.clarity?.("event", "limit_hit_essentiel"); } catch {}
        return;
      }
    }

    try { window.clarity?.("event", "cv_generation_started"); } catch {}
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
      try { window.clarity?.("event", "cv_generation_success"); } catch {}

      setLoadingATS(true);
      setAtsData(null);
      fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(r => r.json()).then(data => {
        setAtsData(data.error ? { error: true, message: data.error } : data);
        setLoadingATS(false);
      }).catch(() => {
        setAtsData({ error: true, message: "Analyse ATS indisponible" });
        setLoadingATS(false);
      });

      if (!isPro) {
        const newCount = cvCount + 1;
        setCvCount(newCount);
        if (user) await user.update({ unsafeMetadata: { ...user.unsafeMetadata, cvCount: newCount } });

        // 1er CV généré → modal upsell "Pack candidature"
        try {
          if (newCount === 1 && !localStorage.getItem("cvadapt_upsell_shown")) {
            setShowPostGenUpsell(true);
            localStorage.setItem("cvadapt_upsell_shown", "1");
            window.clarity?.("event", "upsell_pack_shown");
          }
        } catch {}

        // 2ème CV généré → popup parrainage (gagne 2 CV en partageant)
        try {
          if (newCount === 2 && !localStorage.getItem("cvadapt_referral_shown")) {
            setTimeout(() => setShowReferralPopup(true), 1500);
            localStorage.setItem("cvadapt_referral_shown", "1");
            window.clarity?.("event", "referral_popup_shown");
          }
        } catch {}

        // Dernier CV gratuit utilisé → email de relance + modal
        if (newCount >= CV_LIMIT) {
          setShowUpgradeModal(true);
          try { window.clarity?.("event", "upgrade_modal_shown_limit"); } catch {}
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

  function injectPhoto(html) {
    if (!photo) return html.replace(/<span id="cv-photo-slot"[^>]*><\/span>/g, "");
    return html.replace(
      /<span id="cv-photo-slot"([^>]*)><\/span>/,
      `<img src="${photo}" style="width:76px;height:76px;border-radius:50%;object-fit:cover;display:block;" alt="" />`
    );
  }

  function handlePrint(content, title) {
    const win = window.open("", "_blank");
    if (!win) {
      alert("Impossible d'ouvrir le PDF. Autorise les pop-ups pour ce site dans ton navigateur.");
      return;
    }
    const watermark = !isPro ? `
      <div style="margin-top:24px;padding:10px 0 6px;text-align:center;border-top:1px solid #e5e7eb;">
        <span style="font-size:9px;color:#9ca3af;font-family:Arial,sans-serif;letter-spacing:0.2px;">
          Généré avec <strong style="color:#2563eb;">CVAdapt.eu</strong> —
          <a href="https://cvadapt.eu/tarifs" style="color:#2563eb;text-decoration:none;">Supprimer cette mention → Plan Étudiant 4,99€/mois</a>
        </span>
      </div>` : '';
    const printContent = title.startsWith("CV") ? injectPhoto(content) : content;
    win.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { background: white; }
      body { display: flex; justify-content: center; padding: 0; }
      @media screen { body { background: #e5e7eb; padding: 20px 0; } }
      @media print {
        html, body { background: white; padding: 0; display: block; }
        body > div { box-shadow: none !important; margin: 0 !important; }
        @page { margin: 0; size: A4; }
      }
    </style></head><body>${printContent}${watermark}</body></html>`);
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
  const isGenerateDisabled = loading || (!isPro && cvCount >= CV_LIMIT) || (isPro && plan === "essentiel" && cvMonthCount >= 15);

  const selectedTemplate = TEMPLATES.find(t => t.id === template);
  const offrePreview = form.offre.split("\n").slice(0, 4).join("\n").substring(0, 200);

  return (
    <main className="min-h-screen" style={{ background: "#f7f9fc" }}>
      {/* Modal upgrade limite 3 CV */}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}

      {/* Modal upsell post-génération (1er CV) */}
      <PostGenerationUpsell
        show={showPostGenUpsell}
        isPro={isPro}
        onClose={() => setShowPostGenUpsell(false)}
      />

      {/* Popup parrainage (2ème CV) */}
      <ReferralPopup
        show={showReferralPopup}
        onClose={() => setShowReferralPopup(false)}
        userId={user?.id}
      />

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
              {plan === "essentiel" && <span className="text-xs text-green-600 hidden sm:inline">· {15 - cvMonthCount} restants</span>}
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
                      <div className="w-2 h-2 rounded-full" style={{ background: TEMPLATES.find(t => t.id === entry.template)?.accent || "#2563eb" }}></div>
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

      <div className="max-w-xl mx-auto px-4 py-10">
        {!cv ? (
          <>
            {/* Banners upsell — toujours visibles en haut */}
            {!isPro && cvCount >= CV_LIMIT && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ color: "#92400e", fontSize: 14, fontWeight: 500 }}>Tu as utilisé tes 3 CV gratuits.</p>
                <Link href="/tarifs" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Voir les abonnements →
                </Link>
              </div>
            )}
            {isPro && plan === "essentiel" && cvMonthCount >= 15 && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ color: "#92400e", fontSize: 14, fontWeight: 500 }}>Tu as atteint les 15 CV de ce mois (plan Étudiant).</p>
                <Link href="/tarifs" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Passer au plan Pro →
                </Link>
              </div>
            )}

            {/* Indicateur d'étapes */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: 32, gap: 0 }}>
              {[
                { n: 1, label: "L'offre" },
                { n: 2, label: "Ton profil" },
                { n: 3, label: "Génération" },
              ].map((s, idx) => (
                <div key={s.n} style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: wizardStep >= s.n ? "#2563eb" : "#f3f4f6",
                      border: "2px solid " + (wizardStep >= s.n ? "#2563eb" : "#e5e7eb"),
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: wizardStep >= s.n ? "#fff" : "#9ca3af",
                      fontSize: wizardStep > s.n ? 16 : 13, fontWeight: 700,
                      transition: "all 0.25s",
                      flexShrink: 0,
                    }}>
                      {wizardStep > s.n ? "✓" : s.n}
                    </div>
                    <p style={{ fontSize: 11, color: wizardStep >= s.n ? "#2563eb" : "#9ca3af", marginTop: 5, fontWeight: 600, whiteSpace: "nowrap" }}>{s.label}</p>
                  </div>
                  {idx < 2 && (
                    <div style={{ height: 2, width: 56, background: wizardStep > idx + 1 ? "#2563eb" : "#e5e7eb", marginTop: 17, flexShrink: 0, transition: "background 0.3s", margin: "17px 6px 0" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1 — L'offre */}
            {wizardStep === 1 && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 12px rgba(0,0,0,0.06)", padding: "28px 28px 24px" }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>Quelle offre cibles-tu ?</h1>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Sélectionne un design de CV, puis colle l'offre d'emploi.</p>

                {/* Sélecteur de template */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Design du CV</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {TEMPLATES.map((t) => {
                      const sel = template === t.id;
                      return (
                        <button key={t.id} type="button" onClick={() => setTemplate(t.id)}
                          style={{
                            position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer",
                            border: sel ? `2px solid ${t.accent}` : "2px solid #e5e7eb",
                            boxShadow: sel ? `0 0 0 3px ${t.accent}22` : "none",
                            background: "#fff", padding: 0, textAlign: "left",
                            transition: "border-color 0.15s, box-shadow 0.15s",
                          }}>
                          {/* CV miniature */}
                          <TemplateMiniPreview t={t} />
                          {/* Nom */}
                          <div style={{ padding: "8px 10px 9px", background: sel ? t.accent + "0f" : "#fff", borderTop: "1px solid " + (sel ? t.accent + "33" : "#f3f4f6") }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: sel ? t.accent : "#374151" }}>{t.name}</p>
                            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{t.desc}</p>
                          </div>
                          {/* Checkmark overlay */}
                          {sel && (
                            <div style={{ position: "absolute", top: 7, right: 7, width: 20, height: 20, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Textarea offre */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Offre d'emploi</p>
                    <p style={{ fontSize: 11, color: form.offre.length > 0 ? "#2563eb" : "#9ca3af" }}>{form.offre.length} car.</p>
                  </div>
                  <textarea
                    name="offre"
                    value={form.offre}
                    onChange={handleChange}
                    rows={9}
                    placeholder="Colle ici le texte complet de l'offre (LinkedIn, Indeed, APEC…). Plus tu en mets, meilleur sera ton CV."
                    style={{
                      width: "100%", border: "1.5px solid " + (form.offre.length > 0 ? "#bfdbfe" : "#e5e7eb"),
                      borderRadius: 10, padding: "12px 14px", outline: "none",
                      fontSize: 14, color: "#0f172a", background: "#fafafa",
                      resize: "none", lineHeight: 1.6, fontFamily: "inherit",
                      transition: "border-color 0.15s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = form.offre.length > 0 ? "#bfdbfe" : "#e5e7eb"; e.target.style.background = "#fafafa"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  disabled={!isStep1Valid}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: isStep1Valid ? "pointer" : "not-allowed",
                    background: isStep1Valid ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#e5e7eb",
                    color: isStep1Valid ? "#fff" : "#9ca3af",
                    fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
                    boxShadow: isStep1Valid ? "0 4px 20px rgba(29,78,216,0.35)" : "none",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  Continuer
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}

            {/* Step 2 — Ton profil */}
            {wizardStep === 2 && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 12px rgba(0,0,0,0.06)", padding: "28px 28px 24px" }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>Ton profil</h1>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Ces informations seront intégrées et adaptées à l'offre.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
                  {/* Photo upload */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 7 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Photo</p>
                      <p style={{ fontSize: 11, color: "#9ca3af" }}>Optionnel · courant en France</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        onClick={() => photoInputRef.current?.click()}
                        style={{
                          width: 68, height: 68, borderRadius: "50%", cursor: "pointer", flexShrink: 0,
                          border: photo ? "2px solid #2563eb" : "2px dashed #d1d5db",
                          background: photo ? "transparent" : "#f9fafb",
                          overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "border-color 0.15s",
                        }}
                      >
                        {photo ? (
                          <img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                        ) : (
                          <svg width="22" height="22" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <button type="button" onClick={() => photoInputRef.current?.click()}
                          style={{ fontSize: 13, color: "#2563eb", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, display: "block" }}>
                          {photo ? "Changer la photo" : "Ajouter une photo"}
                        </button>
                        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>JPG, PNG · max 3 Mo</p>
                        {photo && (
                          <button type="button" onClick={() => setPhoto(null)}
                            style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 3 }}>
                            Supprimer
                          </button>
                        )}
                      </div>
                      <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePhotoChange} />
                    </div>
                  </div>

                  <FieldGroup label="Nom complet" hint="Affiché en en-tête du CV">
                    <input
                      type="text" name="nom" value={form.nom} onChange={handleChange}
                      placeholder="Ex : Jean Dupont"
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <FieldGroup label="Email" hint="Coordonnées CV">
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="jean@email.com"
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </FieldGroup>
                    <FieldGroup label="Téléphone" hint="Optionnel">
                      <input
                        type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Expérience professionnelle" hint="Postes occupés, entreprises, durées">
                    <textarea
                      name="experience" value={form.experience} onChange={handleChange}
                      rows={4} placeholder="Ex : 2 ans chez Carrefour comme responsable rayon, 1 an chez McDonald's en équipier…"
                      style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <FieldGroup label="Compétences" hint="Séparées par des virgules">
                    <input
                      type="text" name="competences" value={form.competences} onChange={handleChange}
                      placeholder="Ex : Excel, gestion d'équipe, service client, permis B…"
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <FieldGroup label="Formation" hint="Diplômes et établissements">
                    <input
                      type="text" name="formation" value={form.formation} onChange={handleChange}
                      placeholder="Ex : BTS MUC – Lycée Jean Moulin, Lyon"
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" onClick={() => setWizardStep(1)}
                    style={{ padding: "13px 18px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Retour
                  </button>
                  <button type="button" onClick={() => setWizardStep(3)} disabled={!isStep2Valid}
                    style={{
                      flex: 1, padding: "13px", borderRadius: 10, border: "none", cursor: isStep2Valid ? "pointer" : "not-allowed",
                      background: isStep2Valid ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#e5e7eb",
                      color: isStep2Valid ? "#fff" : "#9ca3af",
                      fontSize: 15, fontWeight: 700,
                      boxShadow: isStep2Valid ? "0 4px 20px rgba(29,78,216,0.35)" : "none",
                      transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                    Continuer
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Finaliser */}
            {wizardStep === 3 && (
              <form onSubmit={handleSubmit}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 12px rgba(0,0,0,0.06)", padding: "28px 28px 24px" }}>
                  <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>Presque prêt !</h1>
                  <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Vérifie le récapitulatif, puis génère ton CV.</p>

                  {/* Récapitulatif */}
                  <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "18px 18px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                    {/* Template choisi */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 56, borderRadius: 7, flexShrink: 0, overflow: "hidden", border: "2px solid " + (selectedTemplate?.accent || "#e5e7eb") }}>
                        <TemplateMiniPreview t={selectedTemplate} compact />
                      </div>
                      <div>
                        <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>Design sélectionné</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{selectedTemplate?.name}</p>
                        <p style={{ fontSize: 12, color: "#6b7280" }}>{selectedTemplate?.desc}</p>
                      </div>
                    </div>

                    {/* Aperçu offre */}
                    {offrePreview && (
                      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
                        <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 6 }}>Offre cible</p>
                        <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{offrePreview}{form.offre.length > 200 ? "…" : ""}</p>
                      </div>
                    )}

                    {/* Nom */}
                    {form.nom && (
                      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
                        <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 4 }}>Candidat</p>
                        <p style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{form.nom}</p>
                      </div>
                    )}
                  </div>

                  {/* Checkbox lettre de motivation */}
                  <label style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "#faf5ff", border: "1.5px solid #e9d5ff",
                    borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    marginBottom: 20, transition: "background 0.15s",
                  }}>
                    <input
                      type="checkbox"
                      checked={withLM}
                      onChange={(e) => setWithLM(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: "#7c3aed", flexShrink: 0 }}
                    />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#5b21b6" }}>Générer aussi une lettre de motivation</p>
                      <p style={{ fontSize: 12, color: "#7c3aed", marginTop: 2 }}>Adaptée à l'offre, personnalisée, prête à envoyer</p>
                    </div>
                  </label>

                  {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                      <p style={{ fontSize: 13, color: "#dc2626" }}>{error}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      style={{ padding: "13px 18px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={isGenerateDisabled}
                      style={{
                        flex: 1, padding: "14px 20px", borderRadius: 10, border: "none",
                        cursor: isGenerateDisabled ? "not-allowed" : "pointer",
                        background: isGenerateDisabled ? "#e5e7eb" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: isGenerateDisabled ? "#9ca3af" : "#fff",
                        fontSize: 15, fontWeight: 700,
                        boxShadow: isGenerateDisabled ? "none" : "0 4px 20px rgba(29,78,216,0.4)",
                        transition: "all 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                    >
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                          {withLM ? "Génération CV + lettre…" : "Génération en cours…"}
                        </>
                      ) : (
                        <>
                          {withLM ? "Générer CV + lettre de motivation" : "Générer mon CV"}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </>
                      )}
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
                      try {
                        const lmRes = await fetch("/api/generate-lm", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(form),
                        });
                        const lmData = await lmRes.json();
                        if (lmRes.ok) {
                          setLm(lmData.lm);
                        } else {
                          setError(lmData.error || "Erreur lors de la génération de la lettre de motivation.");
                          setActiveTab("cv");
                        }
                      } catch {
                        setError("Connexion impossible, réessaie.");
                        setActiveTab("cv");
                      }
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
                  <div className="p-10" dangerouslySetInnerHTML={{ __html: (() => {
                    const raw = activeTab === "cv" ? cv : lm;
                    const sanitized = DOMPurify.sanitize(raw);
                    if (activeTab !== "cv") return sanitized;
                    return injectPhoto(sanitized);
                  })() }} />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
