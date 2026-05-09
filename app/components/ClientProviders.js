"use client";
import ExitIntentPopup from "./ExitIntentPopup";

export default function ClientProviders({ children }) {
  return (
    <>
      <ExitIntentPopup />
      {children}
    </>
  );
}
