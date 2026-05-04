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
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Gratuit — sans carte bancaire
            </div>

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

      {/* Témoignages */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Témoignages</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ils ont décroché des entretiens</h2>
            <p className="text-gray-500">Des candidats comme toi qui ont utilisé CVAdapt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sophie M.",
                role: "Chargée de communication",
                avatar: "SM",
                color: "bg-pink-100 text-pink-600",
                stars: 5,
                text: "J'ai eu 3 entretiens en une semaine après avoir utilisé CVAdapt. Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes !"
              },
              {
                name: "Karim B.",
                role: "Développeur web junior",
                avatar: "KB",
                color: "bg-blue-100 text-blue-600",
                stars: 5,
                text: "Le CV généré était vraiment professionnel, avec exactement les mots-clés de l'offre. J'ai été rappelé par 2 entreprises la semaine suivante."
              },
              {
                name: "Laura D.",
                role: "Assistante RH",
                avatar: "LD",
                color: "bg-purple-100 text-purple-600",
                stars: 5,
                text: "Simple, rapide et efficace. En tant que RH je sais ce que les recruteurs cherchent, et les CV de CVAdapt cochent toutes les cases."
              },
              {
                name: "Thomas R.",
                role: "Commercial B2B",
                avatar: "TR",
                color: "bg-green-100 text-green-600",
                stars: 5,
                text: "En reconversion, j'avais du mal à valoriser mon profil. CVAdapt a su mettre en avant mes compétences transférables. Super outil !"
              },
              {
                name: "Anaïs G.",
                role: "Responsable marketing",
                avatar: "AG",
                color: "bg-orange-100 text-orange-600",
                stars: 5,
                text: "J'utilisais des templates génériques avant. Depuis CVAdapt, chaque CV est vraiment adapté à l'offre. Le taux de réponse a explosé."
              },
              {
                name: "Marc L.",
                role: "Technicien maintenance",
                avatar: "ML",
                color: "bg-cyan-100 text-cyan-600",
                stars: 5,
                text: "Même sans être à l'aise avec l'ordinateur, c'est très simple à utiliser. Mon CV est maintenant présentable et professionnel."
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 bg-blue-600 rounded-2xl p-8 text-center text-white">
            <div>
              <p className="text-3xl font-extrabold mb-1">+68%</p>
              <p className="text-blue-200 text-sm">de taux de réponse moyen</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold mb-1">30s</p>
              <p className="text-blue-200 text-sm">pour générer un CV</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold mb-1">4,9★</p>
              <p className="text-blue-200 text-sm">note moyenne utilisateurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tarifs</span>
          </div>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple et transparent</h2>
            <p className="text-gray-500">Sans engagement · Annule quand tu veux · Paiement sécurisé</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Gratuit */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Gratuit</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-extrabold text-gray-900">0€</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">Pour découvrir CVAdapt</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["3 CV au total", "Téléchargement PDF"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-4 h-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs flex-shrink-0">✗</span>
                  CV illimités
                </li>
              </ul>
              <a href="/generate" className="block text-center bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                Commencer gratuitement
              </a>
            </div>

            {/* Essentiel — mis en avant */}
            <div className="rounded-2xl p-8 flex flex-col relative bg-gray-900 shadow-xl ring-1 ring-gray-800 md:-mt-4 md:-mb-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                LE PLUS POPULAIRE
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Essentiel</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white">4,99€</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">par mois</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["10 CV par mois", "Téléchargement PDF", "CV optimisés par IA"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm">
                Choisir Essentiel →
              </a>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Pro</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-extrabold text-gray-900">9,99€</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">par mois</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["CV illimités", "Téléchargement PDF", "CV optimisés par IA", "Support prioritaire"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm">
                Choisir Pro →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Reste informé des nouveautés
          </h2>
          <p className="text-gray-400 mb-8">
            Reçois les nouvelles fonctionnalités et conseils pour ta recherche d'emploi.
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
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white border border-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "S'inscrire"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-3">Une erreur est survenue, réessaie.</p>
          )}
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
