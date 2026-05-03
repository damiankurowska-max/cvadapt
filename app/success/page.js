import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-12 text-center max-w-md shadow-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h1>
        <p className="text-gray-700 mb-8">Bienvenue sur CVAdapt. Tu peux maintenant générer tes CV.</p>
        <Link href="/generate" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700">
          Générer mon premier CV →
        </Link>
      </div>
    </main>
  );
}
