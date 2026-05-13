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
    <div className="w-full bg-gray-950 text-white py-2 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 flex-wrap text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          <span className="font-semibold text-white">−50% étudiant</span>
        </span>
        <span className="text-gray-500 hidden sm:inline">·</span>
        <span className="text-gray-400">Expire dans</span>
        <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded tabular-nums tracking-wider">
          {timeLeft.h}:{timeLeft.m}:{timeLeft.s}
        </span>
        <span className="text-gray-500 hidden sm:inline">·</span>
        <a href="/tarifs" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
          En profiter →
        </a>
      </div>
    </div>
  );
}
