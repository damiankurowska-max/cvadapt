"use client";
import { useLang } from "./LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#f3f4f6",
        borderRadius: "999px",
        padding: "2px",
        gap: "2px",
        border: "1px solid #e5e7eb",
      }}
    >
      <button
        onClick={() => setLang("fr")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 12px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
          transition: "all 0.15s",
          background: lang === "fr" ? "#ffffff" : "transparent",
          color: lang === "fr" ? "#111827" : "#9ca3af",
          boxShadow: lang === "fr" ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
        }}
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLang("en")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 12px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
          transition: "all 0.15s",
          background: lang === "en" ? "#ffffff" : "transparent",
          color: lang === "en" ? "#111827" : "#9ca3af",
          boxShadow: lang === "en" ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
