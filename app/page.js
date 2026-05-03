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
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">CVAdapt</h1>
        <div className="flex items-center gap-4">
          <a href="/tarifs" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tarifs</a>
          <a
            href="/generate"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Essayer gratuitement
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-6">
          Gratuit pour commencer — sans carte bancaire
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ton CV adapté à chaque offre d'emploi en 30 secondes
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Colle une offre d'emploi, entre tes infos — CVAdapt génère
          automatiquement un CV optimisé avec les bons mots-clés.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/generate"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
          >
            Générer mon CV maintenant →
          </a>
          <a
            href="/tarifs"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50"
          >
            Voir les tarifs
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-4">3 CV gratuits, aucune carte requise</p>
      </section>

      {/* Problème */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Le problème que tout le monde a
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">😩</div>
              <h4 className="font-semibold mb-2 text-gray-900">Modifier son CV à chaque fois</h4>
              <p className="text-gray-600 text-sm">Perdre des heures à adapter son CV pour chaque offre d'emploi.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🤔</div>
              <h4 className="font-semibold mb-2 text-gray-900">Ne pas savoir quoi mettre</h4>
              <p className="text-gray-600 text-sm">Difficile de savoir quels mots-clés utiliser pour chaque poste.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">❌</div>
              <h4 className="font-semibold mb-2 text-gray-900">CV ignoré par les RH</h4>
              <p className="text-gray-600 text-sm">Un CV générique passe à la poubelle avant même d'être lu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comment ça marche
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-semibold mb-2 text-gray-900">Colle l'offre d'emploi</h4>
              <p className="text-gray-600 text-sm">Copie-colle n'importe quelle offre depuis LinkedIn, Indeed, etc.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
              <h4 className="font-semibold mb-2 text-gray-900">Entre tes infos</h4>
              <p className="text-gray-600 text-sm">Ton expérience, tes compétences, ta formation.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <h4 className="font-semibold mb-2 text-gray-900">Télécharge ton CV</h4>
              <p className="text-gray-600 text-sm">Reçois un CV parfaitement adapté en PDF, prêt à envoyer.</p>
            </div>
          </div>
          <div className="mt-10">
            <a
              href="/generate"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
            >
              Essayer maintenant — c'est gratuit
            </a>
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section id="attente" className="bg-blue-600 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Reste informé des nouveautés
          </h3>
          <p className="text-blue-50 mb-8">
            Reçois les nouvelles fonctionnalités et conseils pour ta recherche d'emploi.
          </p>
          {status === "success" ? (
            <p className="text-white text-lg font-semibold">
              Merci ! On te contacte bientôt.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="ton@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white border-2 border-white placeholder-gray-400 outline-none focus:border-blue-200"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "S'inscrire"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-200 text-sm mt-2">Une erreur est survenue, réessaie.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-8">
        <div className="flex justify-center gap-6 mb-3">
          <a href="/tarifs" className="hover:text-gray-600">Tarifs</a>
          <a href="/generate" className="hover:text-gray-600">Générer un CV</a>
        </div>
        © 2025 CVAdapt — Fait en France
      </footer>
    </main>
  );
}
