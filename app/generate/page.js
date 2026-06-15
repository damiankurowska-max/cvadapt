"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import DOMPurify from "isomorphic-dompurify";
import Logo from "../components/Logo";
import UpgradeModal from "../components/UpgradeModal";
import PostGenerationUpsell from "../components/PostGenerationUpsell";
import ReferralPopup from "../components/ReferralPopup";
import { t as tr } from "@/lib/i18n";

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
function TemplateMiniPreview({ tmpl, compact }) {
  if (!tmpl) return null;
  const h = compact ? "100%" : 130;

  if (tmpl.id === "creatif") {
    return (
      <div style={{ display: "flex", height: h, background: "#fff" }}>
        <div style={{ width: "36%", background: tmpl.accent, padding: "7px 5px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.28)", margin: "0 auto 4px" }} />
          {[55, 75, 60, 45, 65, 50].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: w + "%", background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: "7px 7px" }}>
          <div style={{ height: 5, width: "70%", background: "#111827", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, width: "50%", background: tmpl.accent, borderRadius: 2, marginBottom: 7 }} />
          {[90, 80, 70, 85, 60, 75, 55, 80].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: w + "%", background: i % 3 === 0 ? "#d1d5db" : "#e9ecef", borderRadius: 2, marginBottom: 2.5 }} />
          ))}
        </div>
      </div>
    );
  }
  if (tmpl.id === "classique") {
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
  if (tmpl.id === "moderne") {
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
      <div style={{ height: 2.5, width: "28%", background: tmpl.accent, borderRadius: 2, marginBottom: 7 }} />
      <div style={{ height: 1, background: tmpl.accent + "40", marginBottom: 6 }} />
      {[90, 80, 65, 85, 55, 75, 60, 80].map((w, i) => (
        <div key={i} style={{ height: 2.5, width: w + "%", background: i % 4 === 0 ? tmpl.accent + "55" : "#e9ecef", borderRadius: 2, marginBottom: 2.5 }} />
      ))}
    </div>
  );
}

export default function Generate() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [lang, setLang] = useState("fr");
  const [detectedLang, setDetectedLang] = useState(null); // auto-detected from job posting
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

  // Init language from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cvadapt_lang");
      if (saved === "en" || saved === "fr") setLang(saved);
    } catch {}
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem("cvadapt_lang", lang); } catch {}
  }, [lang]);

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

  function detectLang(text) {
    if (!text || text.length < 60) return null;
    const lower = text.toLowerCase();
    const en = ["the ", " and ", " of ", " in ", " to ", " for ", " you ", " we ", " are ", " is ", "requirements", "experience", "skills", "team", "position", "role", "candidate", "salary", "apply", "workplace"].filter(w => lower.includes(w)).length;
    const fr = [" le ", " la ", " les ", " et ", " de ", " du ", " un ", " une ", " des ", " pour ", " dans ", " nous ", " vous ", " est ", "expérience", "compétences", "poste", "entreprise", "équipe", "candidat", "rémunération", "rejoindre"].filter(w => lower.includes(w)).length;
    if (en === 0 && fr === 0) return null;
    return en > fr ? "en" : "fr";
  }

  function handleChange(e) {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "offre") {
      setDetectedLang(detectLang(e.target.value));
    }
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert(lang === "en" ? "Photo must be under 3 MB." : "La photo doit faire moins de 3 Mo."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoaded && !isSignedIn) {
      router.push("/sign-up?redirect_url=/generate");
      return;
    }

    if (!isPro) {
      if (cvCount >= CV_LIMIT) {
        setError(tr(lang, "limit3"));
        try { window.clarity?.("event", "limit_hit_free"); } catch {}
        return;
      }
    } else if (plan === "essentiel") {
      if (cvMonthCount >= 15) {
        setError(tr(lang, "limit15"));
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
        body: JSON.stringify({ ...form, template, lang: detectedLang || lang }),
      });
      const cvData = await cvRes.json();

      if (!cvRes.ok) {
        setError(cvData.error || tr(lang, "errorGeneric"));
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
        body: JSON.stringify({ ...form, lang }),
      }).then(r => r.json()).then(data => {
        setAtsData(data.error ? { error: true, message: data.error } : data);
        setLoadingATS(false);
      }).catch(() => {
        setAtsData({ error: true, message: tr(lang, "atsNotAvailable") });
        setLoadingATS(false);
      });

      if (!isPro) {
        const newCount = cvCount + 1;
        setCvCount(newCount);
        if (user) await user.update({ unsafeMetadata: { ...user.unsafeMetadata, cvCount: newCount } });

        try {
          if (newCount === 1 && !localStorage.getItem("cvadapt_upsell_shown")) {
            setShowPostGenUpsell(true);
            localStorage.setItem("cvadapt_upsell_shown", "1");
            window.clarity?.("event", "upsell_pack_shown");
          }
        } catch {}

        try {
          if (newCount === 2 && !localStorage.getItem("cvadapt_referral_shown")) {
            setTimeout(() => setShowReferralPopup(true), 1500);
            localStorage.setItem("cvadapt_referral_shown", "1");
            window.clarity?.("event", "referral_popup_shown");
          }
        } catch {}

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
          body: JSON.stringify({ ...form, lang }),
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
        date: new Date().toLocaleDateString(lang === "en" ? "en-US" : "fr-FR"),
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
      setError(tr(lang, "errorGeneric"));
    }
    setLoading(false);
  }

  function injectPhoto(html) {
    if (!html) return html;
    html = html.replace(/<span id="cv-photo-slot"[^>]*><\/span>/g, photo
      ? `<img src="${photo}" style="width:76px;height:76px;border-radius:50%;object-fit:cover;display:block;" alt="">`
      : "");

    if (!photo) return html;

    if (typeof window === "undefined") return html;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString("<div>" + html + "</div>", "text/html");
      const root = doc.body.querySelector("div");
      if (!root) return html;

      if (root.querySelector("img[alt='']")) return root.innerHTML;

      const img = doc.createElement("img");
      img.src = photo;
      img.alt = "";

      const sidebar = [...root.querySelectorAll("div")].find(d =>
        (d.getAttribute("style") || "").includes("0f172a"));
      if (sidebar) {
        img.setAttribute("style", "width:76px;height:76px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 22px;border:2px solid #1e293b;");
        sidebar.insertBefore(img, sidebar.firstChild);
        return root.innerHTML;
      }

      const leftCol = [...root.querySelectorAll("div")].find(d =>
        (d.getAttribute("style") || "").includes("f8fafc"));
      if (leftCol) {
        img.setAttribute("style", "width:76px;height:76px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 18px;");
        leftCol.insertBefore(img, leftCol.firstChild);
        return root.innerHTML;
      }

      img.setAttribute("style", "width:82px;height:98px;object-fit:cover;float:right;margin:4px 0 16px 24px;");
      root.insertBefore(img, root.firstChild);
      return root.innerHTML;
    } catch {
      return html;
    }
  }

  function handlePrint(content, title) {
    const win = window.open("", "_blank");
    if (!win) {
      alert(lang === "en"
        ? "Pop-ups are blocked. Please allow pop-ups for this site."
        : "Impossible d'ouvrir le PDF. Autorise les pop-ups pour ce site dans ton navigateur.");
      return;
    }
    const watermark = !isPro ? `
      <div style="margin-top:24px;padding:10px 0 6px;text-align:center;border-top:1px solid #e5e7eb;">
        <span style="font-size:9px;color:#9ca3af;font-family:Arial,sans-serif;letter-spacing:0.2px;">
          ${lang === "en" ? "Generated with" : "Généré avec"} <strong style="color:#2563eb;">CVAdapt.eu</strong> —
          <a href="https://cvadapt.eu/tarifs" style="color:#2563eb;text-decoration:none;">${lang === "en" ? "Remove this · Student plan €4.99/mo" : "Supprimer cette mention → Plan Étudiant 4,99€/mois"}</a>
        </span>
      </div>` : '';
    const printContent = title.startsWith("CV") || title.startsWith("Resume") ? injectPhoto(content) : content;
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

  const selectedTemplate = TEMPLATES.find(tmpl => tmpl.id === template);
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
          {/* Toggle FR / EN */}
          <button
            type="button"
            onClick={() => setLang(l => l === "fr" ? "en" : "fr")}
            title={lang === "fr" ? "Switch to English" : "Passer en français"}
            style={{
              display: "flex", alignItems: "center", gap: "3px",
              padding: "3px 8px",
              fontSize: "0.65rem",
              fontWeight: 700,
              background: "rgba(29,78,216,0.06)",
              border: "1px solid rgba(29,78,216,0.15)",
              borderRadius: "999px",
              cursor: "pointer",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <span style={{ opacity: lang === "fr" ? 1 : 0.35 }}>🇫🇷</span>
            <span style={{ color: "#d1d5db", fontSize: "0.6rem" }}>|</span>
            <span style={{ opacity: lang === "en" ? 1 : 0.35 }}>🇺🇸</span>
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            title={tr(lang, "history")}
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
              {plan === "essentiel" && <span className="text-xs text-green-600 hidden sm:inline">· {15 - cvMonthCount} {tr(lang, "remaining")}</span>}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${cvCount >= CV_LIMIT ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"}`}>
                <span>{CV_LIMIT - cvCount}/{CV_LIMIT}</span>
                <span className="hidden sm:inline text-gray-400 font-normal">{tr(lang, "free")}</span>
              </div>
              {cvCount >= CV_LIMIT && (
                <Link href="/tarifs" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 whitespace-nowrap">
                  {tr(lang, "upgradePro")}
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
              <h3 className="font-semibold text-gray-900">{tr(lang, "historyTitle")}</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">{tr(lang, "historyEmpty")}</p>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: TEMPLATES.find(tmpl => tmpl.id === entry.template)?.accent || "#2563eb" }}></div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{entry.nom}</p>
                        <p className="text-gray-400 text-xs">{entry.date} · {entry.apercu}</p>
                      </div>
                    </div>
                    <button onClick={() => loadFromHistory(entry)}
                      className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                      {tr(lang, "historyReview")}
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
                <p style={{ color: "#92400e", fontSize: 14, fontWeight: 500 }}>{tr(lang, "limit3")}</p>
                <Link href="/tarifs" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  {tr(lang, "viewPlans")}
                </Link>
              </div>
            )}
            {isPro && plan === "essentiel" && cvMonthCount >= 15 && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ color: "#92400e", fontSize: 14, fontWeight: 500 }}>{tr(lang, "limit15")}</p>
                <Link href="/tarifs" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  {tr(lang, "upgradeToPro")}
                </Link>
              </div>
            )}

            {/* Barre de progression */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                {[
                  { n: 1, label: tr(lang, "step1") },
                  { n: 2, label: tr(lang, "step2") },
                  { n: 3, label: tr(lang, "step3") },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: wizardStep > s.n ? "#2563eb" : wizardStep === s.n ? "#2563eb" : "#e5e7eb",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: wizardStep > s.n ? 12 : 11, fontWeight: 800,
                      color: wizardStep >= s.n ? "#fff" : "#9ca3af",
                      transition: "background 0.3s",
                    }}>
                      {wizardStep > s.n ? "✓" : s.n}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: wizardStep >= s.n ? 700 : 500, color: wizardStep >= s.n ? "#0f172a" : "#9ca3af" }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 3, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: wizardStep === 1 ? "0%" : wizardStep === 2 ? "50%" : "100%",
                  background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                  borderRadius: 4, transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Step 1 — L'offre */}
            {wizardStep === 1 && (
              <div>
                {/* ATS insight card */}
                <div style={{ background: "linear-gradient(135deg, #eff6ff, #eef2ff)", border: "1px solid #bfdbfe", borderRadius: 14, padding: "16px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
                    🔍
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#1e40af", marginBottom: 2 }}>
                      {lang === "en" ? "75% of CVs filtered before being read" : "75% des CV filtrés avant d'être lus"}
                    </p>
                    <p style={{ fontSize: 13, color: "#3b82f6", lineHeight: 1.5 }}>
                      {lang === "en" ? "CVAdapt detects the exact keywords this ATS filter is looking for." : "CVAdapt détecte les mots-clés exacts que le filtre ATS recherche dans cette offre."}
                    </p>
                  </div>
                </div>

                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", padding: "28px 28px 24px" }}>
                  <h1 style={{ fontSize: 21, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>{tr(lang, "step1Title")}</h1>
                  <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>{tr(lang, "step1Subtitle")}</p>

                  {detectedLang && (
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: detectedLang === "en" ? "#dbeafe" : "#dcfce7", color: detectedLang === "en" ? "#1d4ed8" : "#15803d" }}>
                        {detectedLang === "en" ? "🇺🇸 English detected → CV in English" : "🇫🇷 Français détecté → CV en français"}
                      </span>
                    </div>
                  )}

                  <textarea
                    name="offre"
                    value={form.offre}
                    onChange={handleChange}
                    rows={11}
                    placeholder={tr(lang, "jobOfferPlaceholder")}
                    style={{
                      width: "100%", border: "1.5px solid " + (form.offre.length > 0 ? "#bfdbfe" : "#e5e7eb"),
                      borderRadius: 12, padding: "14px 16px", outline: "none",
                      fontSize: 14, color: "#0f172a", background: "#fafafa",
                      resize: "none", lineHeight: 1.6, fontFamily: "inherit",
                      boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = form.offre.length > 0 ? "#bfdbfe" : "#e5e7eb"; e.target.style.background = "#fafafa"; e.target.style.boxShadow = "none"; }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, marginBottom: 24 }}>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>
                      {lang === "en" ? "More complete = better CV" : "Plus l'annonce est complète, meilleur sera le résultat"}
                    </p>
                    <p style={{ fontSize: 11, color: form.offre.length > 0 ? "#2563eb" : "#9ca3af" }}>{form.offre.length} {lang === "en" ? "chars" : "car."}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    disabled={!isStep1Valid}
                    style={{
                      width: "100%", padding: "15px", borderRadius: 12, border: "none",
                      cursor: isStep1Valid ? "pointer" : "not-allowed",
                      background: isStep1Valid ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#e5e7eb",
                      color: isStep1Valid ? "#fff" : "#9ca3af",
                      fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em",
                      boxShadow: isStep1Valid ? "0 4px 24px rgba(29,78,216,0.38)" : "none",
                      transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    {tr(lang, "continueBtn")}
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Profil */}
            {wizardStep === 2 && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", padding: "28px 28px 24px" }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>{tr(lang, "step2Title")}</h1>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>{tr(lang, "step2Subtitle")}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
                  {/* Photo upload */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 7 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{tr(lang, "photo")}</p>
                      <p style={{ fontSize: 11, color: "#9ca3af" }}>{tr(lang, "photoHint")}</p>
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
                          {photo ? tr(lang, "changePhoto") : tr(lang, "addPhoto")}
                        </button>
                        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>JPG, PNG · max 3 Mo</p>
                        {photo && (
                          <button type="button" onClick={() => setPhoto(null)}
                            style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 3 }}>
                            {tr(lang, "deletePhoto")}
                          </button>
                        )}
                      </div>
                      <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePhotoChange} />
                    </div>
                  </div>

                  <FieldGroup label={tr(lang, "fullName")} hint={lang === "en" ? "Displayed in resume header" : "Affiché en en-tête du CV"}>
                    <input
                      type="text" name="nom" value={form.nom} onChange={handleChange}
                      placeholder={tr(lang, "fullNamePlaceholder")}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <FieldGroup label={tr(lang, "email")} hint={tr(lang, "emailHint")}>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder={tr(lang, "emailPlaceholder")}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </FieldGroup>
                    <FieldGroup label={tr(lang, "phone")} hint={tr(lang, "phoneHint")}>
                      <input
                        type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                        placeholder={tr(lang, "phonePlaceholder")}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </FieldGroup>
                  </div>
                  <FieldGroup label={tr(lang, "experience")} hint={tr(lang, "experienceHint")}>
                    <textarea
                      name="experience" value={form.experience} onChange={handleChange}
                      rows={4} placeholder={tr(lang, "experiencePlaceholder")}
                      style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <FieldGroup label={tr(lang, "skills")} hint={tr(lang, "skillsHint")}>
                    <input
                      type="text" name="competences" value={form.competences} onChange={handleChange}
                      placeholder={tr(lang, "skillsPlaceholder")}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </FieldGroup>
                  <FieldGroup label={tr(lang, "education")} hint={tr(lang, "educationHint")}>
                    <input
                      type="text" name="formation" value={form.formation} onChange={handleChange}
                      placeholder={tr(lang, "educationPlaceholder")}
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
                    {tr(lang, "back")}
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
                    {tr(lang, "continueBtn")}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Design & générer */}
            {wizardStep === 3 && (
              <form onSubmit={handleSubmit}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", padding: "28px 28px 24px" }}>
                  <h1 style={{ fontSize: 21, fontWeight: 800, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>{tr(lang, "step3Title")}</h1>
                  <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>{tr(lang, "step3Subtitle")}</p>

                  {/* Galerie de templates */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                    {TEMPLATES.map((tmpl) => {
                      const sel = template === tmpl.id;
                      return (
                        <button key={tmpl.id} type="button" onClick={() => setTemplate(tmpl.id)}
                          style={{
                            position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer",
                            border: sel ? `2.5px solid ${tmpl.accent}` : "2px solid #e5e7eb",
                            boxShadow: sel ? `0 0 0 3px ${tmpl.accent}22, 0 4px 16px rgba(0,0,0,0.08)` : "0 1px 4px rgba(0,0,0,0.04)",
                            background: "#fff", padding: 0, textAlign: "left",
                            transition: "border-color 0.15s, box-shadow 0.15s",
                          }}>
                          <div style={{ height: 160, overflow: "hidden" }}>
                            <TemplateMiniPreview tmpl={tmpl} compact />
                          </div>
                          <div style={{ padding: "10px 12px 11px", background: sel ? tmpl.accent + "0d" : "#fafafa", borderTop: "1px solid " + (sel ? tmpl.accent + "30" : "#f0f0f0") }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: sel ? tmpl.accent : "#374151" }}>{tmpl.name}</p>
                            <p style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 1 }}>{tmpl.desc}</p>
                          </div>
                          {sel && (
                            <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: tmpl.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                              <svg width="12" height="12" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Récapitulatif compact */}
                  {(form.nom || offrePreview) && (
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      {form.nom && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{form.nom}</p>
                        </div>
                      )}
                      {offrePreview && (
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginTop: 1, flexShrink: 0 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                          <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{offrePreview}{form.offre.length > 200 ? "…" : ""}</p>
                        </div>
                      )}
                    </div>
                  )}

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
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#5b21b6" }}>{tr(lang, "coverLetterLabel")}</p>
                      <p style={{ fontSize: 12, color: "#7c3aed", marginTop: 2 }}>{tr(lang, "coverLetterSubtitle")}</p>
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
                      {tr(lang, "back")}
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
                          {withLM ? tr(lang, "generateWithLMBtn") : tr(lang, "generatingBtn")}
                        </>
                      ) : (
                        <>
                          {withLM ? tr(lang, "generateBtnWithLM") : tr(lang, "generateBtn")}
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
                    {lm || loadingLM ? tr(lang, "cvAndLMReady") : tr(lang, "cvReady")}
                  </p>
                  <p className="text-green-600 text-sm">{tr(lang, "adaptedToOffer")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setCv(""); setLm(""); setAtsData(null); setWizardStep(1); }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  {tr(lang, "newCV")}
                </button>
                <button
                  onClick={() => handlePrint(
                    activeTab === "cv" ? cv : lm,
                    activeTab === "cv"
                      ? `${lang === "en" ? "Resume" : "CV"} - ${form.nom}`
                      : `${lang === "en" ? "Cover letter" : "Lettre de motivation"} - ${form.nom}`
                  )}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm">
                  📄 {tr(lang, "downloadPDF")}
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
                      <p className="text-sm font-semibold text-purple-900">{tr(lang, "addCoverLetterTitle")}</p>
                      <p className="text-xs text-purple-500 truncate">{tr(lang, "addCoverLetterSubtitle")}</p>
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
                          body: JSON.stringify({ ...form, lang }),
                        });
                        const lmData = await lmRes.json();
                        if (lmRes.ok) {
                          setLm(lmData.lm);
                        } else {
                          setError(lmData.error || tr(lang, "errorGeneric"));
                          setActiveTab("cv");
                        }
                      } catch {
                        setError(tr(lang, "errorGeneric"));
                        setActiveTab("cv");
                      }
                      setLoadingLM(false);
                    }}
                    className="bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap shrink-0">
                    {tr(lang, "generateLM")} →
                  </button>
                </div>
              )}

              {/* 2. Upsell plan — dernier CV gratuit */}
              {!isPro && cvCount === CV_LIMIT - 1 && (
                <div className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">⚠️</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-amber-900">
                        {lang === "en" ? "Only 1 free resume left" : "Plus qu'un CV gratuit restant"}
                      </p>
                      <p className="text-xs text-amber-600">
                        {lang === "en" ? "Upgrade to Student for unlimited resumes at €4.99/mo" : "Passe à Étudiant pour des CV illimités à 4,99€/mois"}
                      </p>
                    </div>
                  </div>
                  <a href="/tarifs"
                    className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap shrink-0">
                    {lang === "en" ? "See plans →" : "Voir l'offre →"}
                  </a>
                </div>
              )}

              {/* 3. Upsell plan — limite atteinte */}
              {!isPro && cvCount >= CV_LIMIT && (
                <div className="flex items-center justify-between gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">🚀</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-blue-900">{tr(lang, "limit3")}</p>
                      <p className="text-xs text-blue-600">
                        {lang === "en" ? "Continue with the Student plan at €4.99/mo" : "Continue avec le plan Étudiant à 4,99€/mois"}
                      </p>
                    </div>
                  </div>
                  <a href="/tarifs"
                    className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0">
                    {tr(lang, "upgradePro")} →
                  </a>
                </div>
              )}

              {/* 4. Partage */}
              <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">🎁</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {lang === "en" ? "Know someone job hunting?" : "Un ami cherche un emploi ?"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {lang === "en" ? "Share CVAdapt — free to start" : "Partage CVAdapt — c'est gratuit pour commencer"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "CVAdapt",
                        text: lang === "en"
                          ? "Generate an ATS-optimized resume in 30 seconds — free!"
                          : "Génère un CV optimisé ATS en 30 secondes — gratuit !",
                        url: "https://cvadapt.eu",
                      });
                    } else {
                      navigator.clipboard.writeText("https://cvadapt.eu");
                      alert(lang === "en" ? "Link copied!" : "Lien copié !");
                    }
                  }}
                  className="border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0">
                  {lang === "en" ? "Share" : "Partager"}
                </button>
              </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-xl w-fit max-w-full overflow-x-auto">
              <button onClick={() => setActiveTab("cv")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "cv" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {tr(lang, "tabCV")}
              </button>
              {(lm || loadingLM) && (
                <button onClick={() => setActiveTab("lm")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "lm" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {loadingLM ? tr(lang, "tabLMLoading") : tr(lang, "tabLM")}
                </button>
              )}
              <button onClick={() => setActiveTab("ats")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "ats" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {tr(lang, "tabATS")} {loadingATS && "⏳"} {atsData && !loadingATS && <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${atsData.score >= 75 ? "bg-green-100 text-green-700" : atsData.score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{atsData.score}/100</span>}
              </button>
            </div>

            {/* Aperçu */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">
                  {activeTab === "cv" ? tr(lang, "previewCV") : activeTab === "lm" ? tr(lang, "previewLM") : tr(lang, "previewATS")}
                </span>
              </div>
              {activeTab === "ats" ? (
                loadingATS ? (
                  <div className="p-16 text-center text-gray-400">
                    <div className="text-4xl mb-4 animate-spin">⚙️</div>
                    <p className="font-medium">{tr(lang, "atsAnalyzing")}</p>
                    <p className="text-sm mt-2">{tr(lang, "atsComparison")}</p>
                  </div>
                ) : atsData ? (
                  <div className="p-4 sm:p-8">
                    {/* Score principal */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 mb-8 p-4 sm:p-6 bg-gray-50 rounded-2xl text-center sm:text-left">
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
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{tr(lang, "atsCompatibility")}</h3>
                        <p className="text-gray-500 text-sm">{tr(lang, "atsBasedOn")}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                          {tr(lang, "atsKeywordsFound")} ({atsData.keywords_found?.length})
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
                          {tr(lang, "atsMissing")} ({atsData.keywords_missing?.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {atsData.keywords_missing?.map((kw, i) => (
                            <span key={i} className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">{kw}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                      <h4 className="font-bold text-blue-800 mb-3">💪 {tr(lang, "atsStrengths")}</h4>
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
                      <h4 className="font-bold text-amber-800 mb-3">🎯 {tr(lang, "atsRecommendations")}</h4>
                      <ul className="space-y-2">
                        {atsData.recommendations?.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                            <span className="font-bold flex-shrink-0 text-amber-500">{i + 1}.</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bannière retry — score < 60 */}
                    {atsData.score < 60 && atsData.keywords_missing?.length > 0 && (
                      <div style={{ marginTop: 20, background: "linear-gradient(135deg,#eff6ff,#eef2ff)", border: "2px solid #bfdbfe", borderRadius: 16, padding: "20px 20px 18px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                          <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
                          <div>
                            <p style={{ fontWeight: 800, color: "#1e3a8a", fontSize: 15, marginBottom: 4 }}>
                              {lang === "en" ? "Your score can easily reach 85+" : "Ton score peut monter à 85+ facilement"}
                            </p>
                            <p style={{ color: "#3b82f6", fontSize: 13 }}>
                              {lang === "en"
                                ? "Add these missing keywords to your profile and regenerate your CV:"
                                : "Ajoute ces mots-clés manquants à ton profil et regénère ton CV :"}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                          {atsData.keywords_missing?.slice(0, 5).map((kw, i) => (
                            <span key={i} style={{ background: "#fff", border: "2px solid #93c5fd", color: "#1d4ed8", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>
                              + {kw}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => { setCv(""); setLm(""); setAtsData(null); setWizardStep(2); }}
                          style={{ width: "100%", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(29,78,216,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12 2v3.5H8.5M3 13v-3.5H6.5M12 5.5A6 6 0 0 0 3 9.5M3 9.5a6 6 0 0 0 9 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {lang === "en" ? "Update my profile → Regenerate" : "Améliorer mon profil → Regénérer"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-16 text-center text-gray-400">
                    <p>{tr(lang, "atsNotAvailable")}</p>
                  </div>
                )
              ) : (
                activeTab === "lm" && loadingLM ? (
                  <div className="p-16 text-center text-gray-400">
                    <div className="text-4xl mb-4">✉️</div>
                    <p className="font-medium">{tr(lang, "generatingLM")}</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                    <div className="p-5 sm:p-10" dangerouslySetInnerHTML={{ __html: (() => {
                      const raw = activeTab === "cv" ? cv : lm;
                      const sanitized = DOMPurify.sanitize(raw);
                      if (activeTab !== "cv") return sanitized;
                      return injectPhoto(sanitized);
                    })() }} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
