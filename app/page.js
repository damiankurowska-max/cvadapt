"use client";
import { useState } from "react";
import Link from "next/link";

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

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-xl font-bold text-blue-600 tracking-tight">CVAdapt</span>
        <nav className="flex items-center gap-6">
          <a href="/tarifs" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Tarifs</a>
          <a
            href="/generate"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Commencer gratuitement
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Gratuit pour commencer — sans carte bancaire
        </div>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Ton CV adapté à chaque<br />
          <span className="text-blue-600">offre d'emploi</span> en 30 secondes
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Colle une offre d'emploi, entre tes infos — CVAdapt génère
          automatiquement un CV avec les bons mots-clés pour décrocher plus d'entretiens.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <a
            href="/generate"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Générer mon CV maintenant →
          </a>
          <a
            href="/tarifs"
            className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors"
          >
            Voir les tarifs
          </a>
        </div>
        <p className="text-sm text-gray-500">3 CV gratuits · Aucune carte requise · Résultat en 30 secondes</p>
      </section>

      {/* Problème */}
      <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
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
              <div key={item.title} className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Comment ça marche</h2>
            <p className="text-gray-600">Simple, rapide, efficace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Colle l'offre d'emploi", desc: "Copie-colle n'importe quelle offre depuis LinkedIn, Indeed, etc." },
              { num: "2", title: "Entre tes infos", desc: "Ton expérience, tes compétences, ta formation." },
              { num: "3", title: "Télécharge ton CV", desc: "Reçois un CV parfaitement adapté en PDF, prêt à envoyer." },
            ].map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gray-200"></div>
                )}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
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
          <span className="text-blue-600 font-bold">CVAdapt</span>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <a href="/generate" className="hover:text-gray-900 transition-colors">Générer un CV</a>
          </div>
          <p className="text-sm text-gray-400">© 2025 CVAdapt — Fait en France</p>
        </div>
      </footer>

    </main>
  );
}
