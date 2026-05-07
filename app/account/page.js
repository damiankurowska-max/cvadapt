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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Tu dois être connecté.</p>
      </div>
    );
  }

  const isPro   = user.unsafeMetadata?.isPro   || false;
  const plan    = user.unsafeMetadata?.plan     || "free";
  const cvCount = parseInt(user.unsafeMetadata?.cvCount || 0);

  // Initiales pour l'avatar
  const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "");
  const displayName = user.fullName || user.primaryEmailAddress?.emailAddress?.split("@")[0] || "Utilisateur";
  const email = user.primaryEmailAddress?.emailAddress || "";

  const planLabel = isPro
    ? plan === "pro" ? "Pro — Illimité" : "Étudiant — 15 CV/mois"
    : "Gratuit — 3 CV";
  const planColor = isPro ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-bold text-blue-600 text-base">CVAdapt</span>
        </Link>
        <Link href="/generate" className="text-sm text-gray-500 hover:text-gray-900 font-medium">
          ← Retour
        </Link>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">

        {/* Card profil principal */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Bandeau bleu en haut */}
          <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-500" />

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 border-4 border-white shadow-md flex items-center justify-center text-white text-2xl font-black uppercase">
                {initials || displayName[0].toUpperCase()}
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${planColor}`}>
                {planLabel}
              </span>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-0.5">{displayName}</h1>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "CV générés", value: cvCount, icon: "📄" },
            { label: "CV sauvegardés", value: history.length, icon: "💾" },
            { label: "Plan actuel", value: isPro ? "Pro" : "Free", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Infos du compte */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Mon compte</p>
            <div className="space-y-3">
              <Row label="Nom" value={displayName} />
              <Row label="Email" value={email} />
              <Row label="Membre depuis" value={new Date(user.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })} />
            </div>
          </div>

          {/* Abonnement */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Abonnement</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{planLabel}</p>
                {!isPro && (
                  <p className="text-xs text-gray-400 mt-0.5">{3 - cvCount} CV gratuit(s) restant(s)</p>
                )}
              </div>
              {!isPro && (
                <Link href="/tarifs"
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                  Passer Pro →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <ActionLink href="/generate" emoji="⚡" label="Générer un CV" />
          <ActionLink href="/analyse" emoji="🎯" label="Analyser mon CV" />
          <ActionLink href="/dashboard" emoji="📊" label="Mon dashboard" />
          <ActionLink href="/tarifs" emoji="💎" label="Voir les abonnements" />
        </div>

        {/* Déconnexion */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <SignOutButton redirectUrl="/">
            <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 transition-colors rounded-2xl text-sm font-semibold">
              <span className="text-lg">🚪</span>
              Se déconnecter
            </button>
          </SignOutButton>
        </div>

      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function ActionLink({ href, emoji, label }) {
  return (
    <Link href={href}
      className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 first:rounded-t-2xl last:rounded-b-2xl">
      <span className="text-lg w-6 text-center">{emoji}</span>
      <span className="flex-1">{label}</span>
      <span className="text-gray-300 text-lg">›</span>
    </Link>
  );
}
