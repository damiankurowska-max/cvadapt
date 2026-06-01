"use client";

export default function GenerateError({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Une erreur s&apos;est produite
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {error?.message || "La génération a rencontré un problème. Réessaie dans quelques secondes."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
