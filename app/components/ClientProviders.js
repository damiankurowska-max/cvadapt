"use client";
import dynamic from "next/dynamic";
import { LanguageProvider } from "./LanguageContext";

const ExitIntentPopup = dynamic(() => import("./ExitIntentPopup"), { ssr: false });

export default function ClientProviders({ children }) {
  return (
    <LanguageProvider>
      <ExitIntentPopup />
      {children}
    </LanguageProvider>
  );
}
