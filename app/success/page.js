import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 text-center max-w-lg w-full shadow-xl border border-blue-100">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Bienvenue dans CVAdapt Pro !
        </h1>
        <p className="text-gray-500 text-base mb-6">
          Ton abonnement est actif. Tu peux maintenant générer des CV illimités.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <span className="text-green-800 font-medium text-sm">Paiement confirmé</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <span className="text-green-800 font-medium text-sm">Accès Pro activé sur ton compte</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✅</span>
            <span className="text-green-800 font-medium text-sm">Génération de CV débloquée</span>
          </div>
        </div>

        <Link
          href="/generate"
          className="inline-block w-full bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-md"
        >
          Générer mon CV maintenant →
        </Link>

        <p className="text-gray-400 text-xs mt-4">
          Tu recevras une confirmation par email. Si tu as des questions, contacte notre support.
        </p>
      </div>
    </main>
  );
}
