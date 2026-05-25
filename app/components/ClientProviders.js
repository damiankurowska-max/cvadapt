"use client";
import ExitIntentPopup from "./ExitIntentPopup";
import { LanguageProvider } from "./LanguageContext";

export default function ClientProviders({ children }) {
  return (
    <LanguageProvider>
      <ExitIntentPopup />
      {children}
    </LanguageProvider>
  );
}
