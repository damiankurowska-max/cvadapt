"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import Logo from "../components/Logo";

export default function Generate() {
  const { user } = useUser();
  const [form, setForm] = useState({
    nom: "",
    offre: "",
    experience: "",
    competences: "",
    formation: "",
  });
  const [cv, setCv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cvCount, setCvCount] = useState(0);
  const CV_LIMIT = 3;

  useEffect(() => {
    if (user) {
      const count = parseInt(user.unsafeMetadata?.cvCount || 0);
      setCvCount(count);
    }
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cvCount >= CV_LIMIT) {
      setError("Tu as atteint la limite de 3 CV gratuits. Passe à un abonnement pour continuer.");
      return;
    }
    setLoading(true);
    setError("");
    setCv("");

    const res = await fetch("/api/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setCv(data.cv);
      const newCount = cvCount + 1;
      setCvCount(newCount);
      await user.update({ unsafeMetadata: { cvCount: newCount } });
    } else {
      setError(data.error || "Une erreur est survenue");
    }
    setLoading(false);
  }

  function handlePrint() {
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Mon CV</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto}</style></head><body>${cv}</body></html>`);
    win.document.close();
    win.print();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Compteur de CV */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            <span className="text-sm text-gray-600">CV gratuits :</span>
            <span className={`text-sm font-bold ${cvCount >= CV_LIMIT ? "text-red-500" : "text-blue-600"}`}>
              {CV_LIMIT - cvCount} / {CV_LIMIT}
            </span>
          </div>
          {cvCount >= CV_LIMIT && (
            <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
              Passer Pro
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {!cv ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Génère ton CV adapté</h1>
            <p className="text-gray-600 mb-8">Remplis le formulaire et reçois un CV optimisé en 30 secondes.</p>

            {cvCount >= CV_LIMIT && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                <p className="text-amber-800 text-sm font-medium">Tu as utilisé tes 3 CV gratuits.</p>
                <Link href="/tarifs" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Voir les abonnements →
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ton nom complet</label>
                <input type="text" name="nom" value={form.nom} onChange={handleChange} required placeholder="Ex: Jean Dupont"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colle l'offre d'emploi ici</label>
                <textarea name="offre" value={form.offre} onChange={handleChange} required rows={6}
                  placeholder="Copie-colle l'offre d'emploi depuis LinkedIn, Indeed, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ton expérience professionnelle</label>
                <textarea name="experience" value={form.experience} onChange={handleChange} required rows={4}
                  placeholder="Ex: 2 ans chez Carrefour comme vendeur, 1 an chez McDonald's..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tes compétences</label>
                <input type="text" name="competences" value={form.competences} onChange={handleChange} required
                  placeholder="Ex: Excel, gestion d'équipe, service client, permis B..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ta formation</label>
                <input type="text" name="formation" value={form.formation} onChange={handleChange} required
                  placeholder="Ex: Bac Pro Commerce, BTS Marketing..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

              <button type="submit" disabled={loading || cvCount >= CV_LIMIT}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 text-lg transition-colors">
                {loading ? "Génération en cours... ⏳" : "Générer mon CV →"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Ton CV est prêt !</h1>
              <div className="flex gap-3">
                <button onClick={() => setCv("")}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Recommencer
                </button>
                <button onClick={handlePrint}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                  Télécharger en PDF
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              dangerouslySetInnerHTML={{ __html: cv }} />
          </>
        )}
      </div>
    </main>
  );
}
