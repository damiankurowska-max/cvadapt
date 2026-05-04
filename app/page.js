"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./components/Logo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CVAdapt",
        "url": "https://cvadapt.eu",
        "description": "Générateur de CV adapté à chaque offre d'emploi grâce à l'intelligence artificielle. Créez un CV optimisé en 30 secondes.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "3 CV gratuits sans carte bancaire"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "127"
        }
      }) }} />

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-blue-600 tracking-tight">CVAdapt</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</a>
          <a href="/tarifs" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Tarifs</a>
          <a
            href="/generate"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Commencer gratuitement
          </a>
        </nav>
      </header>

      {/* Hero — 2 colonnes */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
              Ton CV adapté à chaque{" "}
              <span className="text-blue-600">offre d'emploi</span>{" "}
              en 30 secondes
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Colle une offre, entre tes infos — CVAdapt génère automatiquement
              un CV avec les bons mots-clés pour décrocher plus d'entretiens.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="/generate"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm text-center"
              >
                Générer mon CV maintenant →
              </a>
              <a
                href="/tarifs"
                className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Voir les tarifs
              </a>
            </div>
            <p className="text-sm text-gray-500">3 CV gratuits · Résultat en 30 secondes · Sans engagement</p>
          </div>

          {/* Colonne droite — mockup navigateur */}
          <div className="flex justify-center lg:justify-end">
            <div style={{
              width: "100%",
              maxWidth: "460px",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#fff"
            }}>
              {/* Barre navigateur */}
              <div style={{
                background: "#f3f4f6",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid #e5e7eb"
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
                <div style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  color: "#9ca3af",
                  marginLeft: "8px",
                  border: "1px solid #e5e7eb"
                }}>cvadapt.eu/generate</div>
              </div>
              {/* Corps de l'app simulée */}
              <div style={{ padding: "20px", background: "#f9fafb" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e40af", marginBottom: "14px" }}>✨ Générer un CV adapté</p>
                {/* Champ offre d'emploi */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Offre d'emploi</div>
                  <div style={{
                    background: "#eff6ff",
                    border: "1.5px solid #3b82f6",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#374151",
                    lineHeight: 1.5
                  }}>
                    <div style={{ background: "#dbeafe", height: 8, borderRadius: 4, marginBottom: 5, width: "90%" }}></div>
                    <div style={{ background: "#dbeafe", height: 8, borderRadius: 4, marginBottom: 5, width: "75%" }}></div>
                    <div style={{ background: "#dbeafe", height: 8, borderRadius: 4, width: "55%" }}></div>
                  </div>
                </div>
                {/* Champ nom */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Ton nom</div>
                  <div style={{
                    background: "#fff",
                    border: "1.5px solid #3b82f6",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#1d4ed8"
                  }}>Sophie Martin</div>
                </div>
                {/* Champ expérience */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Ton expérience</div>
                  <div style={{
                    background: "#eff6ff",
                    border: "1.5px solid #3b82f6",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#374151",
                    lineHeight: 1.5
                  }}>
                    <div style={{ background: "#dbeafe", height: 8, borderRadius: 4, marginBottom: 5, width: "80%" }}></div>
                    <div style={{ background: "#dbeafe", height: 8, borderRadius: 4, width: "60%" }}></div>
                  </div>
                </div>
                {/* Bouton */}
                <div style={{
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}>Générer mon CV →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Démo en image */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Vois CVAdapt en action</h2>
            <p className="text-gray-500">En 30 secondes, de l'offre au CV professionnel.</p>
          </div>

          {/* Grand mockup navigateur */}
          <div style={{
            maxWidth: "820px",
            margin: "0 auto",
            borderRadius: "14px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 4px 24px rgba(0,0,0,0.07)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            background: "#fff"
          }}>
            {/* Barre navigateur */}
            <div style={{
              background: "#f3f4f6",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
              <div style={{
                flex: 1,
                background: "#fff",
                borderRadius: "8px",
                padding: "5px 14px",
                fontSize: "12px",
                color: "#9ca3af",
                marginLeft: "10px",
                border: "1px solid #e5e7eb",
                maxWidth: "260px"
              }}>🔒 cvadapt.eu/generate</div>
            </div>

            {/* Corps — 2 colonnes */}
            <div style={{ display: "flex", minHeight: "320px", background: "#f9fafb" }}>
              {/* Gauche — formulaire */}
              <div style={{
                flex: 1,
                padding: "24px",
                borderRight: "1px solid #e5e7eb",
                background: "#fff"
              }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e40af", marginBottom: "16px" }}>📋 Informations</p>

                {/* Nom */}
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Nom complet</div>
                  <div style={{ background: "#eff6ff", border: "1.5px solid #3b82f6", borderRadius: "6px", padding: "7px 10px", fontSize: "12px", color: "#1d4ed8" }}>Sophie Martin</div>
                </div>

                {/* Offre */}
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Offre d'emploi</div>
                  <div style={{ background: "#eff6ff", border: "1.5px solid #3b82f6", borderRadius: "6px", padding: "7px 10px", fontSize: "11px", color: "#374151", lineHeight: 1.5 }}>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, marginBottom: 4, width: "95%" }}></div>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, marginBottom: 4, width: "80%" }}></div>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, marginBottom: 4, width: "70%" }}></div>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, width: "50%" }}></div>
                  </div>
                </div>

                {/* Expérience */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600 }}>Expérience</div>
                  <div style={{ background: "#eff6ff", border: "1.5px solid #3b82f6", borderRadius: "6px", padding: "7px 10px", fontSize: "11px", color: "#374151", lineHeight: 1.5 }}>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, marginBottom: 4, width: "85%" }}></div>
                    <div style={{ background: "#dbeafe", height: 7, borderRadius: 3, width: "60%" }}></div>
                  </div>
                </div>

                {/* Bouton */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    background: "#2563eb",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "13px",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    display: "inline-block",
                    cursor: "pointer"
                  }}>Générer →</div>
                </div>
              </div>

              {/* Droite — aperçu CV */}
              <div style={{ flex: 1, padding: "20px", background: "#f9fafb" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "12px" }}>📄 Aperçu du CV</p>
                <div style={{
                  background: "#fff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb"
                }}>
                  {/* En-tête CV */}
                  <div style={{ background: "#1e40af", padding: "16px 18px" }}>
                    <div style={{ background: "rgba(255,255,255,0.9)", height: 10, borderRadius: 5, marginBottom: 6, width: "55%" }}></div>
                    <div style={{ background: "rgba(255,255,255,0.6)", height: 7, borderRadius: 4, width: "70%" }}></div>
                  </div>
                  {/* Corps CV */}
                  <div style={{ padding: "14px 18px" }}>
                    {/* Section Profil */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#1e40af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Profil</div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, marginBottom: 4, width: "95%" }}></div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, marginBottom: 4, width: "85%" }}></div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, width: "60%" }}></div>
                    </div>
                    {/* Section Expériences */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#1e40af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Expériences</div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, marginBottom: 4, width: "70%" }}></div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, marginBottom: 4, width: "90%" }}></div>
                      <div style={{ background: "#f1f5f9", height: 7, borderRadius: 3, width: "50%" }}></div>
                    </div>
                    {/* Section Compétences */}
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#1e40af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Compétences</div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {["React", "Agile", "SEO"].map(skill => (
                          <span key={skill} style={{ background: "#dbeafe", color: "#1e40af", fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problème */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Le problème que tout le monde a</h2>
            <p className="text-gray-600 max-w-xl mx-auto">La recherche d'emploi prend trop de temps à cause du CV.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "😩", title: "Modifier son CV à chaque fois", desc: "Perdre des heures à adapter son CV pour chaque offre d'emploi." },
              { emoji: "🤔", title: "Ne pas savoir quoi mettre", desc: "Difficile de savoir quels mots-clés utiliser pour chaque poste." },
              { emoji: "📭", title: "CV ignoré par les RH", desc: "Un CV générique passe à la poubelle avant même d'être lu." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 p-7 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche — cartes visuelles */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Comment ça marche</h2>
            <p className="text-gray-600">Simple, rapide, efficace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Carte 1 — Colle l'offre */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", position: "relative" }}>
              {/* Grand numéro en fond */}
              <div style={{ position: "absolute", top: -10, right: 10, fontSize: "120px", fontWeight: 900, color: "#f3f4f6", lineHeight: 1, userSelect: "none", zIndex: 0 }}>1</div>
              {/* Illustration */}
              <div style={{ padding: "24px 24px 16px", position: "relative", zIndex: 1 }}>
                <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px", border: "1px solid #e5e7eb" }}>
                  <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, marginBottom: 8, width: "90%" }}></div>
                  <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, marginBottom: 8, width: "75%" }}></div>
                  <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, marginBottom: 8, width: "85%" }}></div>
                  <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, marginBottom: 8, width: "60%" }}></div>
                  <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, width: "70%" }}></div>
                </div>
              </div>
              <div style={{ padding: "0 24px 24px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: 30, height: 30, background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>1</div>
                  <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "16px", margin: 0 }}>Colle l'offre</h3>
                </div>
                <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>Copie-colle n'importe quelle offre depuis LinkedIn, Indeed, etc.</p>
              </div>
            </div>

            {/* Carte 2 — Entre tes infos */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", position: "relative" }}>
              <div style={{ position: "absolute", top: -10, right: 10, fontSize: "120px", fontWeight: 900, color: "#f3f4f6", lineHeight: 1, userSelect: "none", zIndex: 0 }}>2</div>
              <div style={{ padding: "24px 24px 16px", position: "relative", zIndex: 1 }}>
                <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px", border: "1px solid #e5e7eb" }}>
                  {["Nom complet", "Titre du poste", "Expérience"].map((label) => (
                    <div key={label} style={{ marginBottom: "8px" }}>
                      <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600, marginBottom: "3px" }}>{label}</div>
                      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "6px", height: "22px" }}></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "0 24px 24px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: 30, height: 30, background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>2</div>
                  <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "16px", margin: 0 }}>Entre tes infos</h3>
                </div>
                <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>Ton expérience, tes compétences, ta formation.</p>
              </div>
            </div>

            {/* Carte 3 — Reçois ton CV */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", position: "relative" }}>
              <div style={{ position: "absolute", top: -10, right: 10, fontSize: "120px", fontWeight: 900, color: "#f3f4f6", lineHeight: 1, userSelect: "none", zIndex: 0 }}>3</div>
              <div style={{ padding: "24px 24px 16px", position: "relative", zIndex: 1 }}>
                <div style={{ background: "#f9fafb", borderRadius: "10px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                  <div style={{ background: "#1e40af", padding: "12px 14px" }}>
                    <div style={{ background: "rgba(255,255,255,0.85)", height: 9, borderRadius: 4, marginBottom: 5, width: "55%" }}></div>
                    <div style={{ background: "rgba(255,255,255,0.5)", height: 7, borderRadius: 4, width: "70%" }}></div>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ background: "#e5e7eb", height: 7, borderRadius: 3, marginBottom: 5, width: "90%" }}></div>
                    <div style={{ background: "#e5e7eb", height: 7, borderRadius: 3, marginBottom: 5, width: "75%" }}></div>
                    <div style={{ background: "#e5e7eb", height: 7, borderRadius: 3, width: "55%" }}></div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 24px 24px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: 30, height: 30, background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>3</div>
                  <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "16px", margin: 0 }}>Reçois ton CV</h3>
                </div>
                <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>Reçois un CV en PDF parfaitement adapté à l'offre, prêt à envoyer.</p>
              </div>
            </div>

          </div>
          <div className="text-center mt-12">
            <a
              href="/generate"
              className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Essayer maintenant — c'est gratuit
            </a>
          </div>
        </div>
      </section>

      {/* Barre de confiance */}
      <section className="py-10 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Technologie & sécurité</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { icon: "🤖", label: "Intelligence Artificielle", desc: "Technologie de pointe" },
              { icon: "🔒", label: "Paiement Stripe", desc: "100% sécurisé" },
              { icon: "🛡️", label: "Authentification Clerk", desc: "Données protégées" },
              { icon: "⚡", label: "Résultat en 30s", desc: "Garanti" },
              { icon: "🇫🇷", label: "Fait en France", desc: "Pour le marché FR" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <span className="text-xl">{b.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm leading-tight">{b.label}</p>
                  <p className="text-gray-400 text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avant / Après */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Résultat concret</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">Avant / Après CVAdapt</h2>
            <p className="text-gray-500">La différence entre un CV générique et un CV adapté</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avant */}
            <div className="rounded-2xl border-2 border-red-200 overflow-hidden">
              <div className="bg-red-50 px-6 py-4 flex items-center gap-3 border-b border-red-100">
                <span className="text-2xl">😰</span>
                <div>
                  <p className="font-bold text-red-700">Sans CVAdapt</p>
                  <p className="text-red-500 text-xs">CV générique envoyé partout</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  "Même CV pour toutes les offres",
                  "Mots-clés manquants → filtré par l'ATS",
                  "2-3h pour adapter chaque candidature",
                  "Taux de réponse : 5-10%",
                  "Recruteur lit et passe au suivant",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-red-50 rounded-lg px-4 py-2.5">
                    <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Après */}
            <div className="rounded-2xl border-2 border-green-300 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 flex items-center gap-3 border-b border-green-100">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-bold text-green-700">Avec CVAdapt</p>
                  <p className="text-green-500 text-xs">CV adapté à chaque offre en 30s</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  "CV unique et adapté à chaque offre",
                  "Mots-clés de l'offre intégrés automatiquement",
                  "30 secondes pour générer le CV parfait",
                  "Taux de réponse : +68% en moyenne",
                  "CV qui retient l'attention du recruteur",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-2.5">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Illustration */}
            <div className="flex justify-center">
              <div style={{
                position: "relative",
                width: "280px",
                height: "280px",
              }}>
                {/* Cercle fond */}
                <div style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <span style={{ fontSize: "100px" }}>😤</span>
                  {/* Bulle de pensée */}
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "-10px",
                    background: "#fff",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#ef4444",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    whiteSpace: "nowrap"
                  }}>3h de boulot... 😩</div>
                  {/* Bulle résultat */}
                  <div style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "-20px",
                    background: "#2563eb",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                    whiteSpace: "nowrap"
                  }}>→ 0 réponse 📭</div>
                </div>
              </div>
            </div>

            {/* Texte */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 block">Notre histoire</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Né d'une <span className="text-blue-600">vraie frustration</span>
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  En 2024, j'ai passé des semaines à chercher un emploi. Chaque offre demandait un CV différent, chaque adaptation prenait 2 à 3 heures. Et au final ? Peu de réponses.
                </p>
                <p>
                  J'ai compris que le problème n'était pas mon profil — c'était mon CV. Générique, sans les bons mots-clés, invisible pour les logiciels de tri automatique des RH.
                </p>
                <p className="font-semibold text-gray-800">
                  Alors j'ai créé CVAdapt : un outil qui fait ce travail d'adaptation en 30 secondes, pour que tu te concentres sur ce qui compte vraiment — décrocher l'entretien.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">DK</div>
                <div>
                  <p className="font-bold text-gray-900">Damian K.</p>
                  <p className="text-gray-500 text-sm">Fondateur de CVAdapt · Paris 🇫🇷</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 px-6" style={{background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)"}}>
        <div className="max-w-5xl mx-auto">
          {/* Note globale */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-4 mb-8">
              <div>
                <p className="text-4xl font-extrabold text-gray-900">4,9</p>
                <div className="flex gap-0.5 justify-center">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                </div>
              </div>
              <div className="text-left border-l border-yellow-200 pl-4">
                <p className="font-bold text-gray-900">Excellent</p>
                <p className="text-sm text-gray-500">Basé sur 127+ avis</p>
                <p className="text-xs text-green-600 font-semibold mt-1">✓ Avis vérifiés</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ce qu'ils disent de CVAdapt</h2>
            <p className="text-gray-500">Des candidats qui ont décroché des entretiens grâce à CVAdapt</p>
          </div>

          {/* Témoignage principal */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-6 right-8 text-8xl text-white opacity-5 font-serif">&ldquo;</div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>
            </div>
            <p className="text-white text-lg leading-relaxed mb-6 font-medium">
              &ldquo;J'étais en reconversion et je ne savais pas comment valoriser mon profil. En 30 secondes, CVAdapt a généré un CV parfaitement adapté à l'offre, avec mes compétences mises en avant exactement comme il fallait. J'ai eu mon entretien 4 jours après.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">TR</div>
              <div>
                <p className="font-bold text-white">Thomas R.</p>
                <p className="text-gray-400 text-sm">Commercial B2B → Chef de projet · Paris</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-green-400 font-bold text-sm">✓ Entretien décroché</p>
                <p className="text-gray-500 text-xs">4 jours après</p>
              </div>
            </div>
          </div>

          {/* Grille témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Sophie M.", role: "Chargée de communication · Lyon", avatar: "SM", gradient: "from-pink-400 to-rose-500", result: "3 entretiens en 1 semaine", text: "Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes. Incroyable !" },
              { name: "Karim B.", role: "Développeur web · Bordeaux", avatar: "KB", gradient: "from-blue-400 to-indigo-500", result: "Rappelé par 2 entreprises", text: "Le CV avait exactement les mots-clés de l'offre. Rappelé par 2 boîtes la semaine suivante." },
              { name: "Laura D.", role: "Assistante RH · Lille", avatar: "LD", gradient: "from-purple-400 to-violet-500", result: "Recommande à ses candidats", text: "En tant que RH, je sais ce que les recruteurs cherchent. CVAdapt coche toutes les cases." },
              { name: "Anaïs G.", role: "Responsable marketing · Paris", avatar: "AG", gradient: "from-orange-400 to-amber-500", result: "Taux de réponse x3", text: "Depuis CVAdapt, chaque CV est vraiment adapté. Mon taux de réponse a explosé." },
              { name: "Marc L.", role: "Technicien · Nantes", avatar: "ML", gradient: "from-teal-400 to-cyan-500", result: "Premier emploi trouvé", text: "Même sans être à l'aise avec l'ordi, c'est très simple. Mon CV est maintenant professionnel." },
              { name: "Emma T.", role: "Étudiante master · Toulouse", avatar: "ET", gradient: "from-green-400 to-emerald-500", result: "Stage déniché en 2 semaines", text: "Sans expérience pro, j'avais peur. CVAdapt a mis en avant mes projets universitaires parfaitement." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs truncate">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 bg-green-50 rounded-lg px-3 py-1.5">
                  <p className="text-green-700 text-xs font-semibold">🎯 {t.result}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { num: "+68%", label: "taux de réponse moyen", icon: "📈" },
              { num: "30s", label: "pour générer un CV", icon: "⚡" },
              { num: "4,9★", label: "note sur 127 avis", icon: "⭐" },
            ].map(s => (
              <div key={s.num} className="bg-gray-900 rounded-2xl p-6 text-center text-white">
                <p className="text-3xl mb-1">{s.icon}</p>
                <p className="text-3xl font-extrabold mb-1">{s.num}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-24 px-6" style={{background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tarifs</span>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Choisis ton plan</h2>
            <p className="text-gray-500">Sans engagement · Annule quand tu veux · 🔒 Paiement sécurisé Stripe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Gratuit */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Gratuit</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">0€</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">pour toujours</p>
              <ul className="space-y-3 mb-10 flex-1">
                {[
                  {t: "3 CV au total", ok: true},
                  {t: "4 templates visuels", ok: true},
                  {t: "Téléchargement PDF", ok: true},
                  {t: "CV illimités", ok: false},
                  {t: "Lettre de motivation", ok: false},
                ].map(f => (
                  <li key={f.t} className={`flex items-center gap-3 text-sm ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${f.ok ? "bg-gray-100 text-gray-500" : "bg-gray-50 text-gray-200"}`}>{f.ok ? "✓" : "✗"}</span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <a href="/generate" className="block text-center bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                Commencer gratuitement
              </a>
            </div>

            {/* Essentiel */}
            <div className="rounded-2xl flex flex-col relative overflow-hidden shadow-2xl md:-mt-4 md:-mb-4" style={{background: "linear-gradient(145deg, #1e3a5f 0%, #2563eb 100%)"}}>
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">⭐ POPULAIRE</div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-4xl mb-4">⚡</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Essentiel</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">7,99€</span>
                </div>
                <p className="text-blue-200 text-sm mb-8">par mois</p>
                <ul className="space-y-3 mb-10 flex-1">
                  {["10 CV par mois", "4 templates visuels", "Lettre de motivation incluse", "Téléchargement PDF", "CV optimisés par IA", "Conseils personnalisés"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white">
                      <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs flex-shrink-0 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/tarifs" className="block text-center bg-white text-blue-700 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Choisir Essentiel →
                </a>
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">14,99€</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">par mois</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["CV illimités", "4 templates visuels", "Lettre de motivation incluse", "Téléchargement PDF", "CV optimisés par IA", "Conseils Pro", "Support prioritaire"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs flex-shrink-0 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center border-2 border-gray-900 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm">
                Choisir Pro →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-24 px-6 relative overflow-hidden" style={{background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #7c3aed 100%)"}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="text-5xl mb-6">📬</div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Reçois des conseils emploi gratuits
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Chaque semaine : astuces CV, erreurs à éviter, conseils entretien — directement dans ta boîte mail.
          </p>
          {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4">
              <p className="text-green-400 font-semibold">✓ Merci ! On te contacte bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="ton@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 rounded-xl text-gray-900 bg-white border-0 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-yellow-400 text-yellow-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg"
              >
                {status === "loading" ? "..." : "Je m'inscris →"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-300 text-sm mt-3">Une erreur est survenue, réessaie.</p>
          )}
          <p className="text-blue-200 text-sm mt-6">🔒 Zéro spam · Désinscription en 1 clic</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-blue-600 font-bold">CVAdapt</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/blog" className="hover:text-gray-900 transition-colors">Blog</a>
            <a href="/tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <a href="/generate" className="hover:text-gray-900 transition-colors">Générer un CV</a>
            <a href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</a>
            <a href="/cgu" className="hover:text-gray-900 transition-colors">CGU</a>
          </div>
          <p className="text-sm text-gray-400">© 2025 CVAdapt — Fait en France 🇫🇷</p>
        </div>
      </footer>

    </main>
  );
}
