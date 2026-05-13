"use client";
import ExitIntentPopup from "./ExitIntentPopup";
import CountdownBanner from "./CountdownBanner";

export default function ClientProviders({ children }) {
  return (
    <>
      <CountdownBanner />
      <ExitIntentPopup />
      {children}
    </>
  );
}
