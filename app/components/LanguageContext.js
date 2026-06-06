"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("fr");

  useEffect(() => {
    const saved = localStorage.getItem("cvadapt_lang");
    if (saved === "en" || saved === "fr") setLangState(saved);

    function onStorage(e) {
      if (e.key === "cvadapt_lang" && (e.newValue === "en" || e.newValue === "fr")) {
        setLangState(e.newValue);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function setLang(l) {
    setLangState(l);
    localStorage.setItem("cvadapt_lang", l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
