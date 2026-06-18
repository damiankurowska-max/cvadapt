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

const CV_LANGUAGES = [
  { code: "fr", flag: "🇫🇷", label: "Français",           labelEn: "French",      short: "FR"    },
  { code: "en", flag: "🇬🇧", label: "Anglais",            labelEn: "English",     short: "EN"    },
  { code: "de", flag: "🇩🇪", label: "Allemand",           labelEn: "German",      short: "DE"    },
  { code: "es", flag: "🇪🇸", label: "Espagnol",           labelEn: "Spanish",     short: "ES"    },
  { code: "it", flag: "🇮🇹", label: "Italien",            labelEn: "Italian",     short: "IT"    },
  { code: "pt", flag: "🇵🇹", label: "Portugais",          labelEn: "Portuguese",  short: "PT"    },
  { code: "ar", flag: "🇲🇦", label: "Arabe",              labelEn: "Arabic",      short: "AR"    },
  { code: "ru", flag: "🇷🇺", label: "Russe",              labelEn: "Russian",     short: "RU"    },
  { code: "zh", flag: "🇨🇳", label: "Chinois",            labelEn: "Chinese",     short: "ZH"    },
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
function TemplateMiniPreview({ tmpl }) {
  if (!tmpl) return null;
  const bar = (w, bg) => ({ height: 2.5, width: w + "%", background: bg, borderRadius: 2, marginBottom: 2.5 });
  const secLabel = (color) => ({ fontSize: 4.5, fontWeight: 900, color, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 3, marginTop: 5 });

  if (tmpl.id === "creatif") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff", overflow: "hidden" }}>
        <div style={{ width: "36%", background: "#0f172a", padding: "10px 6px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.25)", margin: "0 auto 7px", border: "1.5px solid rgba(255,255,255,0.4)" }} />
          <div style={{ height: 3, width: "85%", background: "rgba(255,255,255,0.9)", borderRadius: 2, marginBottom: 1.5 }} />
          <div style={{ height: 2, width: "55%", background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 7 }} />
          <div style={secLabel("rgba(255,255,255,0.55)")}>Compétences</div>
          {[75, 90, 60, 80, 70].map((w, i) => (
            <div key={i} style={bar(w, "rgba(255,255,255,0.22)")} />
          ))}
          <div style={secLabel("rgba(255,255,255,0.55)")}>Contact</div>
          {[85, 65].map((w, i) => <div key={i} style={bar(w, "rgba(255,255,255,0.18)")} />)}
        </div>
        <div style={{ flex: 1, padding: "10px 8px", overflow: "hidden" }}>
          <div style={{ fontSize: 6.5, fontWeight: 900, color: "#111827", marginBottom: 1.5, whiteSpace: "nowrap" }}>Jean Dupont</div>
          <div style={{ height: 2, width: "55%", background: "#D97706", borderRadius: 2, marginBottom: 6 }} />
          <div style={secLabel("#374151")}>Expérience</div>
          {[90, 80, 70, 85, 60, 80].map((w, i) => (
            <div key={i} style={bar(w, i % 4 === 0 ? "#d1d5db" : "#eee")} />
          ))}
          <div style={secLabel("#374151")}>Formation</div>
          {[80, 65, 50].map((w, i) => <div key={i} style={bar(w, "#eee")} />)}
        </div>
      </div>
    );
  }

  if (tmpl.id === "classique") {
    return (
      <div style={{ background: "#fff", padding: "10px 10px", height: "100%", overflow: "hidden" }}>
        <div style={{ fontSize: 8, fontWeight: 900, color: "#111827", letterSpacing: 0.3, marginBottom: 1 }}>Jean Dupont</div>
        <div style={{ fontSize: 5, color: "#6b7280", marginBottom: 4 }}>Développeur · Paris</div>
        <div style={{ height: 1, background: "#111827", marginBottom: 5 }} />
        <div style={secLabel("#92400e")}>Expérience professionnelle</div>
        {[95, 85, 70, 90, 60].map((w, i) => (
          <div key={i} style={bar(w, i % 3 === 0 ? "#374151" : "#d1d5db")} />
        ))}
        <div style={{ height: 0.5, background: "#d1d5db", margin: "5px 0" }} />
        <div style={secLabel("#92400e")}>Formation</div>
        {[80, 65, 50].map((w, i) => <div key={i} style={bar(w, "#d1d5db")} />)}
        <div style={{ height: 0.5, background: "#d1d5db", margin: "5px 0" }} />
        <div style={secLabel("#92400e")}>Compétences</div>
        {[90, 75, 60].map((w, i) => <div key={i} style={bar(w, "#d1d5db")} />)}
      </div>
    );
  }

  if (tmpl.id === "moderne") {
    return (
      <div style={{ background: "#fff", height: "100%", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", padding: "8px 9px 7px" }}>
          <div style={{ fontSize: 7, fontWeight: 900, color: "#fff", marginBottom: 1.5, whiteSpace: "nowrap" }}>Jean Dupont</div>
          <div style={{ fontSize: 4.5, color: "rgba(255,255,255,0.7)", marginBottom: 3 }}>Développeur Full-Stack</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[45, 55, 50].map((w, i) => <div key={i} style={{ height: 1.5, width: w + "%", background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />)}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "60% 40%", padding: "7px 9px" }}>
          <div style={{ paddingRight: 7 }}>
            <div style={secLabel("#1d4ed8")}>Expérience</div>
            {[90, 80, 70, 85, 65, 80].map((w, i) => (
              <div key={i} style={bar(w, i % 4 === 0 ? "#bfdbfe" : "#eee")} />
            ))}
            <div style={secLabel("#1d4ed8")}>Formation</div>
            {[80, 65].map((w, i) => <div key={i} style={bar(w, "#eee")} />)}
          </div>
          <div style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: 7 }}>
            <div style={secLabel("#1d4ed8")}>Compétences</div>
            {[85, 70, 90, 60, 80, 75].map((w, i) => (
              <div key={i} style={bar(w, "#bfdbfe")} />
            ))}
            <div style={secLabel("#1d4ed8")}>Contact</div>
            {[80, 70, 60].map((w, i) => <div key={i} style={bar(w, "#eee")} />)}
          </div>
        </div>
      </div>
    );
  }

  // minimaliste (Trait)
  return (
    <div style={{ background: "#fff", padding: "10px 10px", height: "100%", overflow: "hidden" }}>
      <div style={{ fontSize: 7.5, fontWeight: 900, color: "#111827", letterSpacing: -0.3, marginBottom: 1 }}>Jean Dupont</div>
      <div style={{ fontSize: 5, color: "#0f766e", marginBottom: 3 }}>Développeur Web</div>
      <div style={{ height: 1.5, background: "#0f766e", marginBottom: 6 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
        <div>
          <div style={secLabel("#0f766e")}>Expérience</div>
          {[90, 80, 70, 85, 65, 80].map((w, i) => (
            <div key={i} style={bar(w, i % 4 === 0 ? "#99f6e4" : "#eee")} />
          ))}
        </div>
        <div>
          <div style={secLabel("#0f766e")}>Compétences</div>
          {[85, 70, 90, 60, 80, 75].map((w, i) => (
            <div key={i} style={bar(w, "#eee")} />
          ))}
          <div style={secLabel("#0f766e")}>Formation</div>
          {[80, 65].map((w, i) => <div key={i} style={bar(w, "#eee")} />)}
        </div>
      </div>
    </div>
  );
}

const VALID_CV_LANG_CODES = ["fr","en","de","es","it","pt","ar","ru","zh"];

export default function Generate() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [lang, setLang] = useState("fr");
  const [cvLang, setCvLang] = useState("fr");
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", adresse: "", offre: "", experience: "", competences: "", formation: "", langues: "", linkedin: "" });
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
  const [showLangPicker, setShowLangPicker] = useState(false);
  const langPickerRef = useRef(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [boostedCV, setBoostedCV] = useState("");
  const [boostLoading, setBoostLoading] = useState(false);
  const [showBoostInput, setShowBoostInput] = useState(false);
  const [boostExtra, setBoostExtra] = useState("");
  const CV_LIMIT = 3;

  const isPro = user?.unsafeMetadata?.isPro || false;
  const plan = user?.unsafeMetadata?.plan || "free";

  // Init CV language from URL param, then sync UI lang
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("cvlang");
      if (p && VALID_CV_LANG_CODES.includes(p)) {
        setCvLang(p);
        setLang(p);
        return;
      }
    } catch {}
    // No URL param — fallback to saved UI lang preference
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

  useEffect(() => {
    if (!showLangPicker) return;
    function handleClickOut(e) {
      if (langPickerRef.current && !langPickerRef.current.contains(e.target)) {
        setShowLangPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, [showLangPicker]);

  function detectLang(text) {
    if (!text || text.length < 60) return null;
    // Non-Latin scripts detected by Unicode ranges
    if (/[؀-ۿ]/.test(text)) return "ar";
    if (/[Ѐ-ӿ]/.test(text)) return "ru";
    if (/[一-鿿]/.test(text)) return "zh";
    const lower = text.toLowerCase();
    const scores = {
      en: ["the ", " and ", " for ", "requirements", "experience", "skills", "position", "company", "apply", "candidate"].filter(w => lower.includes(w)).length,
      fr: [" le ", " la ", " les ", " et ", " de ", " du ", "expérience", "compétences", "poste", "entreprise", "candidat"].filter(w => lower.includes(w)).length,
      de: [" und ", " der ", " die ", " das ", " für ", "berufserfahrung", "kenntnisse", "stelle", "unternehmen", "bewerb"].filter(w => lower.includes(w)).length,
      es: [" el ", " la ", " los ", " y ", " para ", "experiencia", "competencias", "empresa", "puesto", "candidato"].filter(w => lower.includes(w)).length,
      it: [" il ", " le ", " gli ", " e ", " per ", "esperienza", "competenze", "azienda", "posizione", "candidato"].filter(w => lower.includes(w)).length,
      pt: [" o ", " a ", " os ", " as ", " para ", "experiência", "competências", "empresa", "vaga", "candidato"].filter(w => lower.includes(w)).length,
      vi: ["việc", "kinh nghiệm", "công ty", "ứng viên", "kỹ năng", "tuyển dụng"].filter(w => lower.includes(w)).length,
    };
    let best = null, bestScore = 0;
    for (const [code, score] of Object.entries(scores)) {
      if (score > bestScore) { bestScore = score; best = code; }
    }
    return bestScore >= 2 ? best : null;
  }

  function handleChange(e) {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "offre") {
      const detected = detectLang(e.target.value);
      if (detected) setCvLang(detected);
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
        setShowUpgradeModal(true);
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
        body: JSON.stringify({ ...form, template, lang, cvLang }),
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

  async function handleBoost() {
    if (!isPro) {
      setShowUpgradeModal(true);
      return;
    }
    setBoostLoading(true);
    try {
      const res = await fetch("/api/improve-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cv,
          missingKeywords: atsData?.keywords_missing || [],
          extraInfo: boostExtra,
          lang,
        }),
      });
      const data = await res.json();
      if (res.ok && data.cv) {
        setBoostedCV(data.cv);
        setActiveTab("boost");
        setShowBoostInput(false);
      } else {
        setError(data.error || tr(lang, "errorGeneric"));
      }
    } catch {
      setError(tr(lang, "errorGeneric"));
    }
    setBoostLoading(false);
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

  function extractJobTitle(offre) {
    if (!offre) return null;
    const lines = offre.split("\n").map(l => l.trim()).filter(l => l.length > 5 && l.length < 100 && !/^[,.\s\-_*•]+$/.test(l));
    return lines[0]?.substring(0, 80) || null;
  }
  const jobTitle = extractJobTitle(form.offre);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(145deg,#eef2ff 0%,#fafbff 55%,#f5f0ff 100%)" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.55} }
        .step-card { animation: fadeUp 0.38s cubic-bezier(.22,.8,.4,1) both; }
        .gen-field { width:100%;border:2px solid #e8eaf6;border-radius:14px;padding:13px 16px;outline:none;font-size:15px;color:#1e1b4b;background:#fafbff;font-family:inherit;box-sizing:border-box;transition:border-color 0.18s,box-shadow 0.18s; }
        .gen-field:focus { border-color:#6366f1;background:#fff;box-shadow:0 0 0 4px rgba(99,102,241,0.10); }
        .gen-field::placeholder { color:#a5b4fc; }
      `}</style>

      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      <PostGenerationUpsell show={showPostGenUpsell} isPro={isPro} onClose={() => setShowPostGenUpsell(false)} />
      <ReferralPopup show={showReferralPopup} onClose={() => setShowReferralPopup(false)} userId={user?.id} />

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

      <div className={cv ? "gen-split" : ""} style={!cv ? { maxWidth: 580, margin: "0 auto", padding: "32px 16px 80px" } : {}}>
        <div className={cv ? "gen-form-col" : ""}>
          <>
            {/* Banners limite */}
            {!isPro && cvCount >= CV_LIMIT && (
              <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ color: "#9a3412", fontSize: 14, fontWeight: 600 }}>{tr(lang, "limit3")}</p>
                <Link href="/tarifs" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>{tr(lang, "viewPlans")}</Link>
              </div>
            )}
            {isPro && plan === "essentiel" && cvMonthCount >= 15 && (
              <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ color: "#9a3412", fontSize: 14, fontWeight: 600 }}>{tr(lang, "limit15")}</p>
                <Link href="/tarifs" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>{tr(lang, "upgradeToPro")}</Link>
              </div>
            )}

            {/* ── PROGRESS CALI ── */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {[
                  { n: 1, label: tr(lang, "step1") },
                  { n: 2, label: tr(lang, "step2") },
                  { n: 3, label: tr(lang, "step3") },
                ].map((s, i) => {
                  const done = wizardStep > s.n;
                  const active = wizardStep === s.n;
                  return (
                    <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                          background: done ? "linear-gradient(135deg,#6366f1,#4f46e5)" : active ? "linear-gradient(135deg,#818cf8,#6366f1)" : "rgba(99,102,241,0.08)",
                          border: active ? "none" : done ? "none" : "2px solid rgba(99,102,241,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: done ? 14 : 13, fontWeight: 800,
                          color: done || active ? "#fff" : "#a5b4fc",
                          boxShadow: active ? "0 0 0 6px rgba(99,102,241,0.15), 0 4px 16px rgba(99,102,241,0.3)" : "none",
                          transition: "all 0.3s",
                        }}>
                          {done ? "✓" : s.n}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "#4f46e5" : done ? "#6366f1" : "#94a3b8", whiteSpace: "nowrap" }}>{s.label}</span>
                      </div>
                      {i < 2 && (
                        <div style={{ flex: 1, height: 2, background: "rgba(99,102,241,0.12)", borderRadius: 2, margin: "0 8px", marginBottom: 18, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: done ? "100%" : "0%", background: "linear-gradient(90deg,#6366f1,#818cf8)", transition: "width 0.4s ease", borderRadius: 2 }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 1 ── */}
            {wizardStep === 1 && (
              <div className="step-card">
                {/* Headline impact */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 14 }}>
                    ⚡ {lang === "en" ? "30s to a perfect CV" : "30 secondes pour un CV parfait"}
                  </div>
                  <h1 style={{ fontSize: "clamp(24px,5vw,32px)", fontWeight: 900, color: "#1e1b4b", letterSpacing: "-0.03em", marginBottom: 8, lineHeight: 1.15 }}>
                    {tr(lang, "step1Title")}
                  </h1>
                  <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>{tr(lang, "step1Subtitle")}</p>
                </div>

                {/* ATS card */}
                <div style={{ background: "linear-gradient(135deg,#eef2ff,#f0fdf4)", border: "1.5px solid rgba(99,102,241,0.18)", borderRadius: 18, padding: "18px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22, boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}>🔍</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#312e81", marginBottom: 3 }}>
                      {lang === "en" ? "75% of CVs filtered before being read" : "75% des CV filtrés avant d'être lus"}
                    </p>
                    <p style={{ fontSize: 13, color: "#6366f1", lineHeight: 1.5 }}>
                      {lang === "en" ? "CVAdapt detects the exact keywords the ATS is looking for." : "CVAdapt détecte les mots-clés exacts que le filtre ATS recherche."}
                    </p>
                  </div>
                </div>

                {/* Card textarea */}
                <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid rgba(99,102,241,0.12)", boxShadow: "0 8px 40px rgba(99,102,241,0.08)", padding: "24px" }}>
                  {(() => {
                    const l = CV_LANGUAGES.find(x => x.code === cvLang) || CV_LANGUAGES[0];
                    const showBadge = cvLang !== "fr" || form.offre.length > 80;
                    if (!showBadge) return null;
                    return (
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, background: "#ede9fe", color: "#5b21b6", display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 16 }}>{l.flag}</span>
                          {lang === "en" ? `CV in ${l.labelEn}` : `CV en ${l.label}`}
                          <span style={{ fontWeight: 400, opacity: 0.65 }}>· {lang === "en" ? "change in step 2" : "modifiable étape 2"}</span>
                        </span>
                      </div>
                    );
                  })()}
                  <textarea
                    name="offre" value={form.offre} onChange={handleChange}
                    rows={10}
                    placeholder={tr(lang, "jobOfferPlaceholder")}
                    className="gen-field"
                    style={{ resize: "none", lineHeight: 1.65, display: "block" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 20 }}>
                    <p style={{ fontSize: 12, color: "#94a3b8" }}>{lang === "en" ? "More complete = better result" : "Plus l'annonce est complète, meilleur le résultat"}</p>
                    <span style={{ fontSize: 12, fontWeight: 700, color: form.offre.length > 100 ? "#6366f1" : "#cbd5e1", background: form.offre.length > 100 ? "rgba(99,102,241,0.08)" : "transparent", padding: "2px 8px", borderRadius: 999 }}>
                      {form.offre.length} {lang === "en" ? "chars" : "car."}
                    </span>
                  </div>
                  <button type="button" onClick={() => setWizardStep(2)} disabled={!isStep1Valid}
                    style={{
                      width: "100%", padding: "16px", borderRadius: 14, border: "none",
                      cursor: isStep1Valid ? "pointer" : "not-allowed",
                      background: isStep1Valid ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "#e2e8f0",
                      color: isStep1Valid ? "#fff" : "#94a3b8",
                      fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em",
                      boxShadow: isStep1Valid ? "0 6px 28px rgba(99,102,241,0.38)" : "none",
                      transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}>
                    {tr(lang, "continueBtn")}
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {wizardStep === 2 && (
              <div className="step-card" style={{ background: "#fff", borderRadius: 20, border: "1.5px solid rgba(99,102,241,0.12)", boxShadow: "0 8px 40px rgba(99,102,241,0.08)", padding: "28px 24px" }}>
                <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, color: "#1e1b4b", marginBottom: 6, letterSpacing: "-0.03em" }}>{tr(lang, "step2Title")}</h1>
                <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>{tr(lang, "step2Subtitle")}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Photo */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(99,102,241,0.04)", border: "1.5px dashed rgba(99,102,241,0.2)", borderRadius: 14, padding: "14px 16px" }}>
                    <div onClick={() => photoInputRef.current?.click()}
                      style={{ width: 64, height: 64, borderRadius: "50%", cursor: "pointer", flexShrink: 0, border: photo ? "2.5px solid #6366f1" : "2px dashed #c7d2fe", background: photo ? "transparent" : "#f0f0ff", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                      {photo
                        ? <img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                        : <svg width="22" height="22" fill="none" stroke="#a5b4fc" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5", marginBottom: 2 }}>{tr(lang, "photo")} <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 11 }}>· {tr(lang, "photoHint")}</span></p>
                      <button type="button" onClick={() => photoInputRef.current?.click()}
                        style={{ fontSize: 13, color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                        {photo ? tr(lang, "changePhoto") : tr(lang, "addPhoto")}
                      </button>
                      {photo && <button type="button" onClick={() => setPhoto(null)} style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "0 0 0 8px" }}>{tr(lang, "deletePhoto")}</button>}
                      <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>JPG, PNG · max 3 Mo</p>
                    </div>
                    <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePhotoChange} />
                  </div>

                  {/* Nom complet */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
                      {tr(lang, "fullName")} <span style={{ color: "#ef4444" }}>*</span>
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{lang === "en" ? "Resume header" : "En-tête du CV"}</span>
                    </label>
                    <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder={tr(lang, "fullNamePlaceholder")} className="gen-field" />
                  </div>

                  {/* Email + Téléphone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>{tr(lang, "email")}</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={tr(lang, "emailPlaceholder")} className="gen-field" style={{ fontSize: 13 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>{tr(lang, "phone")}</label>
                      <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder={tr(lang, "phonePlaceholder")} className="gen-field" style={{ fontSize: 13 }} />
                    </div>
                  </div>

                  {/* Expérience */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 5 }}>
                      {tr(lang, "experience")} <span style={{ color: "#ef4444" }}>*</span>
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{tr(lang, "experienceHint")}</span>
                    </label>
                    <textarea name="experience" value={form.experience} onChange={handleChange} rows={4} placeholder={tr(lang, "experiencePlaceholder")} className="gen-field" style={{ resize: "none", lineHeight: 1.6, display: "block" }} />
                  </div>

                  {/* Compétences */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 5 }}>
                      {tr(lang, "skills")} <span style={{ color: "#ef4444" }}>*</span>
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{tr(lang, "skillsHint")}</span>
                    </label>
                    <input type="text" name="competences" value={form.competences} onChange={handleChange} placeholder={tr(lang, "skillsPlaceholder")} className="gen-field" />
                  </div>

                  {/* Formation */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 5 }}>
                      {tr(lang, "education")} <span style={{ color: "#ef4444" }}>*</span>
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{tr(lang, "educationHint")}</span>
                    </label>
                    <input type="text" name="formation" value={form.formation} onChange={handleChange} placeholder={tr(lang, "educationPlaceholder")} className="gen-field" />
                  </div>

                  {/* Langue du CV — compact popover */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>
                      {lang === "en" ? "CV Language" : "Langue du CV"}
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{lang === "en" ? "Auto-detected · editable" : "Détectée auto · modifiable"}</span>
                    </label>
                    <div style={{ position: "relative", display: "inline-block" }} ref={langPickerRef}>
                      <button type="button" onClick={() => setShowLangPicker(v => !v)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "9px 16px", border: "1.5px solid #e2e8f0",
                          borderRadius: 999, background: "#fafafa", cursor: "pointer",
                          fontSize: 14, fontWeight: 600, color: "#1e293b",
                          transition: "border-color 0.15s",
                        }}>
                        <span style={{ fontSize: 22, lineHeight: 1 }}>{CV_LANGUAGES.find(l => l.code === cvLang)?.flag}</span>
                        <span>{lang === "en" ? CV_LANGUAGES.find(l => l.code === cvLang)?.labelEn : CV_LANGUAGES.find(l => l.code === cvLang)?.label}</span>
                        <span style={{ fontSize: 10, color: "#94a3b8" }}>▾</span>
                      </button>
                      {showLangPicker && (
                        <div style={{
                          position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50,
                          background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14,
                          padding: 10, display: "grid", gridTemplateColumns: "repeat(5, 52px)",
                          gap: 6, boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                        }}>
                          {CV_LANGUAGES.map(l => (
                            <button key={l.code} type="button"
                              onClick={() => { setCvLang(l.code); setLang(l.code); setShowLangPicker(false); }}
                              style={{
                                width: 52, height: 52, borderRadius: 10, cursor: "pointer",
                                border: cvLang === l.code ? "2px solid #6366f1" : "1.5px solid #e2e8f0",
                                background: cvLang === l.code ? "rgba(99,102,241,0.08)" : "#fafafa",
                                display: "flex", flexDirection: "column", alignItems: "center",
                                justifyContent: "center", gap: 3,
                                fontSize: 11, fontWeight: 700,
                                color: cvLang === l.code ? "#4f46e5" : "#64748b",
                              }}>
                              <span style={{ fontSize: 22, lineHeight: 1 }}>{l.flag}</span>
                              <span>{l.short}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
                      {lang === "en" ? "City / Address" : "Ville / Adresse"}
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{lang === "en" ? "Appears in the CV header" : "Apparaît dans l'en-tête du CV"}</span>
                    </label>
                    <input type="text" name="adresse" value={form.adresse} onChange={handleChange} placeholder={lang === "en" ? "Paris, France" : "Paris 75008"} className="gen-field" style={{ fontSize: 13 }} />
                  </div>

                  {/* Langues */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
                      {lang === "en" ? "Languages" : "Langues"}
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{lang === "en" ? "Included in the CV" : "Incluses dans le CV"}</span>
                    </label>
                    <input type="text" name="langues" value={form.langues} onChange={handleChange} placeholder={lang === "en" ? "English (native), French (B2)" : "Français (natif), Anglais (B2), Espagnol (A2)"} className="gen-field" style={{ fontSize: 13 }} />
                  </div>

                  {/* LinkedIn / Portfolio */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
                      LinkedIn / Portfolio
                      <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 6, fontSize: 11 }}>{lang === "en" ? "Optional" : "Optionnel"}</span>
                    </label>
                    <input type="text" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder={lang === "en" ? "linkedin.com/in/your-profile" : "linkedin.com/in/ton-profil"} className="gen-field" style={{ fontSize: 13 }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <button type="button" onClick={() => setWizardStep(1)}
                    style={{ padding: "13px 18px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {tr(lang, "back")}
                  </button>
                  <button type="button" onClick={() => setWizardStep(3)} disabled={!isStep2Valid}
                    style={{
                      flex: 1, padding: "14px", borderRadius: 12, border: "none", cursor: isStep2Valid ? "pointer" : "not-allowed",
                      background: isStep2Valid ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "#e2e8f0",
                      color: isStep2Valid ? "#fff" : "#94a3b8",
                      fontSize: 15, fontWeight: 800,
                      boxShadow: isStep2Valid ? "0 6px 28px rgba(99,102,241,0.35)" : "none",
                      transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                    {tr(lang, "continueBtn")}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {wizardStep === 3 && (
              <form onSubmit={handleSubmit} className="step-card">
                <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid rgba(99,102,241,0.12)", boxShadow: "0 8px 40px rgba(99,102,241,0.08)", padding: "28px 24px" }}>
                  <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, color: "#1e1b4b", marginBottom: 6, letterSpacing: "-0.03em" }}>{tr(lang, "step3Title")}</h1>
                  <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>{tr(lang, "step3Subtitle")}</p>

                  {/* Galerie templates */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
                    {TEMPLATES.map((tmpl) => {
                      const sel = template === tmpl.id;
                      return (
                        <button key={tmpl.id} type="button" onClick={() => setTemplate(tmpl.id)}
                          style={{
                            position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
                            border: sel ? `2.5px solid ${tmpl.accent}` : "2px solid #e8eaf6",
                            boxShadow: sel ? `0 0 0 4px ${tmpl.accent}18, 0 6px 20px rgba(0,0,0,0.10)` : "0 2px 8px rgba(0,0,0,0.04)",
                            background: "#fff", padding: 0, textAlign: "left",
                            transition: "all 0.2s",
                          }}>
                          <div style={{ height: 160, overflow: "hidden" }}>
                            <TemplateMiniPreview tmpl={tmpl} compact />
                          </div>
                          <div style={{ padding: "10px 12px 12px", background: sel ? tmpl.accent + "0a" : "#fafbff", borderTop: "1.5px solid " + (sel ? tmpl.accent + "25" : "#eeefff") }}>
                            <p style={{ fontSize: 12, fontWeight: 800, color: sel ? tmpl.accent : "#1e1b4b" }}>{tmpl.name}</p>
                            <p style={{ fontSize: 10.5, color: "#94a3b8", marginTop: 2 }}>{tmpl.desc}</p>
                          </div>
                          {sel && (
                            <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderRadius: "50%", background: tmpl.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                              <svg width="12" height="12" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Récap */}
                  {(form.nom || jobTitle) && (
                    <div style={{ background: "rgba(99,102,241,0.04)", border: "1.5px solid rgba(99,102,241,0.12)", borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
                      <p style={{ fontSize: 10, fontWeight: 800, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 10 }}>Récapitulatif</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {form.nom && (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>👤</span>
                            <div>
                              <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 1 }}>Candidat</p>
                              <p style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>{form.nom}</p>
                            </div>
                          </div>
                        )}
                        {jobTitle && (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>💼</span>
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 1 }}>Poste ciblé</p>
                              <p style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{jobTitle}</p>
                            </div>
                          </div>
                        )}
                        {selectedTemplate && (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>🎨</span>
                            <div>
                              <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 1 }}>Template</p>
                              <p style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>{selectedTemplate.name} <span style={{ fontWeight: 400, color: "#94a3b8" }}>— {selectedTemplate.desc}</span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* LM toggle */}
                  <label style={{ display: "flex", alignItems: "center", gap: 14, background: "linear-gradient(135deg,#faf5ff,#f5f0ff)", border: "1.5px solid #ddd6fe", borderRadius: 14, padding: "14px 16px", cursor: "pointer", marginBottom: 20 }}>
                    <input type="checkbox" checked={withLM} onChange={(e) => setWithLM(e.target.checked)} style={{ width: 17, height: 17, accentColor: "#7c3aed", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6" }}>{tr(lang, "coverLetterLabel")}</p>
                      <p style={{ fontSize: 12, color: "#7c3aed", marginTop: 2 }}>{tr(lang, "coverLetterSubtitle")}</p>
                    </div>
                  </label>

                  {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
                      <p style={{ fontSize: 13, color: "#dc2626" }}>{error}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" onClick={() => setWizardStep(2)}
                      style={{ padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {tr(lang, "back")}
                    </button>
                    <button type="submit" disabled={isGenerateDisabled}
                      style={{
                        flex: 1, padding: "15px 20px", borderRadius: 12, border: "none",
                        cursor: isGenerateDisabled ? "not-allowed" : "pointer",
                        background: isGenerateDisabled ? "#e2e8f0" : "linear-gradient(135deg,#6366f1,#4f46e5)",
                        color: isGenerateDisabled ? "#94a3b8" : "#fff",
                        fontSize: 15, fontWeight: 800,
                        boxShadow: isGenerateDisabled ? "none" : "0 6px 28px rgba(99,102,241,0.4)",
                        transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}>
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                          {withLM ? tr(lang, "generateWithLMBtn") : tr(lang, "generatingBtn")}
                        </>
                      ) : (
                        <>
                          {withLM ? tr(lang, "generateBtnWithLM") : tr(lang, "generateBtn")}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        </div>
        {cv && (
          <div className="gen-result-col">
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
                <button onClick={() => { setCv(""); setLm(""); setAtsData(null); setBoostedCV(""); setBoostExtra(""); setShowBoostInput(false); setWizardStep(1); }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  {tr(lang, "newCV")}
                </button>
                <button
                  onClick={() => handlePrint(
                    activeTab === "cv" ? cv : activeTab === "boost" ? boostedCV : lm,
                    activeTab === "cv"
                      ? `${lang === "en" ? "Resume" : "CV"} - ${form.nom}`
                      : activeTab === "boost"
                      ? `${lang === "en" ? "Boosted Resume" : "CV Boosté"} - ${form.nom}`
                      : `${lang === "en" ? "Cover letter" : "Lettre de motivation"} - ${form.nom}`
                  )}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm">
                  📄 {tr(lang, "downloadPDF")}
                </button>
              </div>
            </div>

            {/* Banners post-génération */}
            <div className="flex flex-col gap-3 mb-6">

              {/* 0. Boost ATS — score < 80 */}
              {atsData && !atsData.error && atsData.score < 80 && !boostedCV && !loadingATS && (
                <div style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", border: "2px solid #c4b5fd", borderRadius: 16, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    {/* Score mini */}
                    <div style={{ flexShrink: 0, position: "relative", width: 50, height: 50 }}>
                      <svg viewBox="0 0 44 44" style={{ width: 50, height: 50, transform: "rotate(-90deg)" }}>
                        <circle cx="22" cy="22" r="18" fill="none" stroke="#e9d5ff" strokeWidth="4"/>
                        <circle cx="22" cy="22" r="18" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 18}`}
                          strokeDashoffset={`${2 * Math.PI * 18 * (1 - atsData.score / 100)}`}
                        />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#5b21b6" }}>{atsData.score}</span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 900, color: "#3b0764", marginBottom: 5 }}>
                        {lang === "en" ? "Your CV can reach 85+ automatically" : "Ton CV peut atteindre 85+ automatiquement"}
                      </p>
                      {atsData.keywords_missing?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {atsData.keywords_missing.slice(0, 5).map((kw, i) => (
                            <span key={i} style={{ background: "#ddd6fe", color: "#5b21b6", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>+ {kw}</span>
                          ))}
                          {atsData.keywords_missing.length > 5 && (
                            <span style={{ fontSize: 11, color: "#7c3aed", alignSelf: "center" }}>+{atsData.keywords_missing.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {showBoostInput && isPro && (
                    <textarea
                      value={boostExtra}
                      onChange={e => setBoostExtra(e.target.value)}
                      rows={2}
                      placeholder={lang === "en" ? "Any extra experience or skills to add? (optional)" : "Expériences ou compétences à ajouter ? (optionnel)"}
                      style={{ width: "100%", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#3b0764", background: "#faf5ff", outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 10 }}
                    />
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleBoost} disabled={boostLoading}
                      style={{
                        flex: 1, padding: "11px 16px", borderRadius: 10, border: "none",
                        background: boostLoading ? "#e9d5ff" : "linear-gradient(135deg,#7c3aed,#6d28d9)",
                        color: boostLoading ? "#7c3aed" : "#fff",
                        fontSize: 14, fontWeight: 800, cursor: boostLoading ? "wait" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        boxShadow: boostLoading ? "none" : "0 4px 16px rgba(109,40,217,0.3)",
                        transition: "all 0.2s",
                      }}>
                      {boostLoading ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                          {lang === "en" ? "Optimising…" : "Optimisation en cours…"}
                        </>
                      ) : (
                        <>
                          ✨ {lang === "en" ? "Boost my CV automatically" : "Booster mon CV automatiquement"}
                          {!isPro && <span style={{ fontSize: 10, background: "rgba(255,255,255,0.2)", padding: "2px 7px", borderRadius: 999 }}>{lang === "en" ? "Student plan" : "Plan Étudiant"}</span>}
                        </>
                      )}
                    </button>
                    {isPro && !showBoostInput && (
                      <button onClick={() => setShowBoostInput(true)}
                        style={{ padding: "11px 14px", borderRadius: 10, border: "1.5px solid #c4b5fd", background: "#faf5ff", color: "#7c3aed", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                        + infos
                      </button>
                    )}
                  </div>
                </div>
              )}

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
              {boostedCV && (
                <button onClick={() => setActiveTab("boost")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "boost" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  ✨ {lang === "en" ? "Boosted" : "Boosté"}
                  <span style={{ background: "#7c3aed", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>85+</span>
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
                  {activeTab === "cv" ? tr(lang, "previewCV") : activeTab === "lm" ? tr(lang, "previewLM") : activeTab === "boost" ? (lang === "en" ? "Boosted CV ✨" : "CV Boosté ✨") : tr(lang, "previewATS")}
                </span>
              </div>
              {activeTab === "boost" ? (
                <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                  <div style={{ background: "linear-gradient(90deg,#f5f3ff,#ede9fe)", borderBottom: "1px solid #e9d5ff", padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#6d28d9" }}>✨ {lang === "en" ? "Boosted CV — ATS optimised" : "CV Boosté — Score ATS optimisé"}</span>
                    <span style={{ marginLeft: "auto", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 999 }}>85+</span>
                  </div>
                  <div className="p-5 sm:p-10" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injectPhoto(boostedCV)) }} />
                </div>
              ) : activeTab === "ats" ? (
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
