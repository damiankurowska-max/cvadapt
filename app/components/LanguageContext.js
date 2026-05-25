"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("fr");

  useEffect(() => {
    const saved = localStorage.getItem("cvadapt_lang");
    if (saved === "en" || saved === "fr") setLangState(saved);
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
