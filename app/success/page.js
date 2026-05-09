"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

export default function Success() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Petit délai pour l'animation d'entrée
    setTimeout(() => setShow(true), 100);
  }, []);

  const UNLOCKED = [
    { icon: "⚡", label: "CV illimités", sub: "Génère un CV pour chaque offre" },
    { icon: "🎯", label: "Score ATS complet", sub: "Détection des mots-clés manquants" },
    { icon: "✉️", label: "Lettre de motivation", sub: "Adaptée automatiquement à l'offre" },
    { icon: "📊", label: "Dashboard personnel", sub: "Historique de tous tes CV" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Logo size={26} />
          <span className="font-bold text-blue-600 text-base">CVAdapt</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-4"
          style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>

          {/* Card principale */}
          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">
            {/* Bandeau succès */}
            <div style={{ background: "linear-gradient(135deg, #065f46, #059669)" }} className="px-8 py-8 text-center">
              {/* Cercle check animé */}
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-4"
                style={{ animation: show ? "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" : "none" }}>
                <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-white mb-1">Paiement confirmé !</h1>
              <p className="text-green-200 text-sm">Ton accès Pro est maintenant actif</p>
            </div>

            {/* Corps */}
            <div className="px-6 py-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ce qui est débloqué</p>
              <div className="space-y-3">
                {UNLOCKED.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3"
                    style={{ animation: show ? `fadeUp 0.4s ease ${0.3 + i * 0.08}s both` : "none" }}>
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-lg shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.sub}</p>
                    </div>
                    <svg className="ml-auto shrink-0" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <Link href="/generate"
                className="block w-full bg-blue-600 text-white font-bold text-base py-4 rounded-2xl hover:bg-blue-700 transition-colors text-center shadow-sm"
                style={{ animation: show ? "fadeUp 0.4s ease 0.7s both" : "none" }}>
                Générer mon premier CV Pro →
              </Link>
            </div>
          </div>

          {/* Parrainage */}
          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden p-6"
            style={{ animation: show ? "fadeUp 0.4s ease 0.9s both" : "none" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-sm font-bold text-gray-900">Invite un ami, aide-le à décrocher son poste</p>
                <p className="text-xs text-gray-400">Partage CVAdapt — gratuit pour commencer</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-500 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                https://cvadapt.eu
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "CVAdapt — CV ATS en 30 sec", text: "J'utilise CVAdapt pour adapter mon CV à chaque offre en 30 secondes. C'est gratuit pour commencer !", url: "https://cvadapt.eu" });
                  } else {
                    navigator.clipboard.writeText("https://cvadapt.eu");
                    alert("Lien copié !");
                  }
                }}
                className="bg-blue-600 text-white text-xs font-bold px-4 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Partager
              </button>
            </div>
          </div>

          {/* Actions secondaires */}
          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-50">
            {[
              { href: "/analyse", icon: "🎯", label: "Analyser mon CV existant" },
              { href: "/dashboard", icon: "📊", label: "Voir mon dashboard" },
              { href: "/account", icon: "👤", label: "Mon profil" },
            ].map((a) => (
              <Link key={a.href} href={a.href}
                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <span className="text-lg w-6 text-center">{a.icon}</span>
                <span className="flex-1">{a.label}</span>
                <svg width="14" height="14" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 pb-2">
            Une confirmation a été envoyée par email · <a href="mailto:contact@cvadapt.eu" className="text-blue-500 hover:underline">contact@cvadapt.eu</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
