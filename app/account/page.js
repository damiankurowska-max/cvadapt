"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cvadapt_history") || "[]");
      setHistory(saved);
    } catch {}
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Tu dois être connecté.</p>
      </div>
    );
  }

  const isPro    = user.unsafeMetadata?.isPro   || false;
  const plan     = user.unsafeMetadata?.plan     || "free";
  const cvCount  = parseInt(user.unsafeMetadata?.cvCount || 0);
  const cvLeft   = Math.max(0, 3 - cvCount);

  const displayName = user.fullName || user.primaryEmailAddress?.emailAddress?.split("@")[0] || "Utilisateur";
  const email       = user.primaryEmailAddress?.emailAddress || "";
  const initials    = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });

  const planLabel = isPro
    ? plan === "pro" ? "Plan Pro" : "Plan Étudiant"
    : "Plan Gratuit";
  const planSub = isPro
    ? plan === "pro" ? "CV illimités · Support prioritaire" : "15 CV/mois · Score ATS complet"
    : `${cvLeft} CV gratuit${cvLeft > 1 ? "s" : ""} restant${cvLeft > 1 ? "s" : ""}`;

  const ACTIONS = [
    { href: "/generate", icon: <IconBolt />, label: "Générer un CV", sub: "Optimisé pour chaque offre" },
    { href: "/analyse",  icon: <IconTarget />, label: "Analyser mon CV", sub: "Score ATS en 30 secondes" },
    { href: "/dashboard", icon: <IconChart />, label: "Mon dashboard", sub: "Historique & statistiques" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200/60 px-5 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-bold text-blue-600 text-base">CVAdapt</span>
        </Link>
        <Link href="/generate" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Retour
        </Link>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-3">

        {/* ── Carte profil ── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200/60">
          {/* Bandeau gradient */}
          <div className="h-24 relative" style={{ background: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)" }}>
            {/* Motif subtil */}
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 30% 60%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>

          <div className="px-6 pb-6">
            {/* Avatar flottant */}
            <div className="flex items-end justify-between" style={{ marginTop: "-28px" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-white shadow-lg flex items-center justify-center text-white text-lg font-black">
                {initials || "?"}
              </div>
              {!isPro ? (
                <Link href="/tarifs"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Passer Pro
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {planLabel}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">{displayName}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{email}</p>
              <p className="text-xs text-gray-300 mt-1">Membre depuis {memberSince}</p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: cvCount, label: "CV générés", color: "text-blue-600" },
            { value: history.length, label: "Sauvegardés", color: "text-purple-600" },
            { value: isPro ? "Pro" : "Free", label: "Abonnement", color: isPro ? "text-emerald-600" : "text-gray-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4 text-center">
              <p className={`text-2xl font-black ${s.color} leading-none mb-1`}>{s.value}</p>
              <p className="text-[11px] text-gray-400 font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Abonnement ── */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isPro ? "bg-emerald-50" : "bg-gray-50"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isPro ? "#10b981" : "#9ca3af"} strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{planLabel}</p>
                <p className="text-xs text-gray-400">{planSub}</p>
              </div>
            </div>
            {!isPro && (
              <Link href="/tarifs" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                Voir →
              </Link>
            )}
          </div>

          {/* Barre de progression des CV */}
          {!isPro && (
            <div className="px-5 pb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>CV utilisés</span>
                <span className={cvCount >= 3 ? "text-red-500 font-bold" : ""}>{cvCount} / 3</span>
              </div>
              <div className="bg-gray-100 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full transition-all ${cvCount >= 3 ? "bg-red-400" : "bg-blue-500"}`}
                  style={{ width: `${Math.min((cvCount / 3) * 100, 100)}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* ── Actions rapides ── */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-50">
          {ACTIONS.map((a, i) => (
            <Link key={a.href} href={a.href}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/80 transition-colors group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors">
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{a.label}</p>
                <p className="text-xs text-gray-400">{a.sub}</p>
              </div>
              <svg width="14" height="14" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* ── Compte (infos) ── */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="px-5 pt-4 pb-1">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Informations</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "Nom", value: displayName },
              { label: "Email", value: email },
              { label: "Membre depuis", value: memberSince },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-gray-400">{row.label}</span>
                <span className="text-sm font-medium text-gray-900 truncate max-w-[55%] text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Déconnexion ── */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">
          <SignOutButton redirectUrl="/">
            <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50/60 transition-colors rounded-3xl text-sm font-semibold">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <svg width="15" height="15" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Se déconnecter
            </button>
          </SignOutButton>
        </div>

        <p className="text-center text-xs text-gray-300 pb-4">CVAdapt · contact@cvadapt.eu</p>
      </div>
    </div>
  );
}

// ── Icônes SVG inline ──
function IconBolt() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
