"use client";
import { useEffect, useState } from "react";

function getOrSetExpiry() {
  const key = "cvadapt_offer_expiry";
  const stored = localStorage.getItem(key);
  if (stored) {
    const expiry = parseInt(stored);
    if (expiry > Date.now()) return expiry;
  }
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
    <div
      className="w-full py-2 px-4"
      style={{
        background: "linear-gradient(90deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)",
        borderBottom: "1px solid rgba(29, 78, 216, 0.12)",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 flex-wrap text-xs">
        {/* Badge promo */}
        <span
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: "rgba(29,78,216,0.10)",
            color: "#1d4ed8",
            border: "1px solid rgba(29,78,216,0.18)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
            style={{ background: "#22c55e" }}
          />
          −50% étudiant
        </span>

        <span style={{ color: "#93c5fd" }} className="hidden sm:inline">·</span>

        <span style={{ color: "#6b7280" }}>Expire dans</span>

        {/* Compteur */}
        <span
          className="font-mono font-bold tabular-nums tracking-wider px-2.5 py-0.5 rounded-lg"
          style={{
            background: "rgba(29,78,216,0.08)",
            border: "1px solid rgba(29,78,216,0.15)",
            color: "#1d4ed8",
          }}
        >
          {timeLeft.h}:{timeLeft.m}:{timeLeft.s}
        </span>

        <span style={{ color: "#93c5fd" }} className="hidden sm:inline">·</span>

        <a
          href="/tarifs"
          className="font-semibold transition-colors hover:underline"
          style={{ color: "#1d4ed8" }}
        >
          En profiter →
        </a>
      </div>
    </div>
  );
}
