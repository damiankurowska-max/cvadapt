"use client";
import { useEffect, useState } from "react";

function getOrSetExpiry() {
  const key = "cvadapt_offer_expiry";
  const stored = localStorage.getItem(key);
  if (stored) {
    const expiry = parseInt(stored);
    if (expiry > Date.now()) return expiry;
  }
  // Nouveau timer : 23h59m depuis maintenant
  const newExpiry = Date.now() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000;
  localStorage.setItem(key, newExpiry.toString());
  return newExpiry;
}

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const expiry = getOrSetExpiry();

    function update() {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        // Renouveler
        localStorage.removeItem("cvadapt_offer_expiry");
        setTimeLeft({ h: "00", m: "00", s: "00" });
        return;
      }
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setTimeLeft({ h, m, s });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2.5 px-4">
      <p className="text-sm font-bold">
        🔥 Offre étudiante -50% — Expire dans{" "}
        <span className="font-mono bg-white/20 rounded px-1.5 py-0.5 mx-1">
          {timeLeft.h}:{timeLeft.m}:{timeLeft.s}
        </span>
        {" "}·{" "}
        <a href="/tarifs" className="underline underline-offset-2 hover:no-underline">
          En profiter →
        </a>
      </p>
    </div>
  );
}
