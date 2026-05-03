"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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
        <a
          href="#attente"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Commencer gratuitement
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ton CV adapté à chaque offre d'emploi en 30 secondes
        </h2>
        <p className="text-xl text-gray-500 mb-10">
          Colle une offre d'emploi, entre tes infos — CVAdapt génère
          automatiquement un CV optimisé et prêt à envoyer.
        </p>
        <a
          href="#attente"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
        >
          Essayer maintenant — c'est gratuit
        </a>
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
              <h4 className="font-semibold mb-2">Modifier son CV à chaque fois</h4>
              <p className="text-gray-500 text-sm">Perdre des heures à adapter son CV pour chaque offre d'emploi.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🤔</div>
              <h4 className="font-semibold mb-2">Ne pas savoir quoi mettre</h4>
              <p className="text-gray-500 text-sm">Difficile de savoir quels mots-clés utiliser pour chaque poste.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">❌</div>
              <h4 className="font-semibold mb-2">CV ignoré par les RH</h4>
              <p className="text-gray-500 text-sm">Un CV générique passe à la poubelle avant même d'être lu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comment ça marche
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-semibold mb-2">Colle l'offre d'emploi</h4>
              <p className="text-gray-500 text-sm">Copie-colle n'importe quelle offre depuis LinkedIn, Indeed, etc.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
              <h4 className="font-semibold mb-2">Entre tes infos</h4>
              <p className="text-gray-500 text-sm">Ton expérience, tes compétences, ta formation.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <h4 className="font-semibold mb-2">Télécharge ton CV</h4>
              <p className="text-gray-500 text-sm">Reçois un CV parfaitement adapté en PDF, prêt à envoyer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'attente */}
      <section id="attente" className="bg-blue-600 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Rejoins la liste d'attente
          </h3>
          <p className="text-blue-100 mb-8">
            Sois parmi les premiers à essayer CVAdapt. Lancement bientôt.
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
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Je m'inscris"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-200 text-sm mt-2">Une erreur est survenue, réessaie.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-8">
        © 2025 CVAdapt — Fait en France
      </footer>
    </main>
  );
}
