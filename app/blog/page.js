import Link from "next/link";
import Logo from "../components/Logo";
import { articles } from "./data";

export const metadata = {
  title: "Blog CVAdapt — Conseils CV, Lettre de motivation, Recherche d'emploi",
  description: "Conseils pratiques pour réussir ta recherche d'emploi : comment faire un CV, passer les filtres ATS, rédiger une lettre de motivation, et décrocher des entretiens.",
  alternates: { canonical: "https://cvadapt.eu/blog" },
};

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/tarifs" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Tarifs</Link>
          <Link href="/generate" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            Générer mon CV →
          </Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Blog</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Conseils pour ta recherche d'emploi</h1>
          <p className="text-gray-500 max-w-xl mx-auto">CV, lettres de motivation, reconversion — tout ce qu'il faut savoir pour décrocher le poste que tu vises.</p>
        </div>

        {/* Article principal */}
        <Link href={`/blog/${articles[0].slug}`} className="group block mb-10">
          <div className={`bg-gradient-to-br ${articles[0].couleur} rounded-2xl p-10 text-white hover:opacity-95 transition-all`}>
            <div className="flex items-start gap-6">
              <div className="text-7xl flex-shrink-0">{articles[0].illustration}</div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 block">{articles[0].categorie}</span>
                <h2 className="text-2xl font-bold mb-3 group-hover:underline">{articles[0].titre}</h2>
                <p className="text-white/80 mb-6 max-w-2xl">{articles[0].description}</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span>📅 {articles[0].date}</span>
                  <span>⏱ {articles[0].tempsLecture}</span>
                  <span className="text-white font-semibold">Lire l'article →</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Grille des autres articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(1).map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden">
              {/* Illustration header */}
              <div className={`bg-gradient-to-br ${article.couleur} p-8 flex items-center justify-center`}>
                <span className="text-6xl">{article.illustration}</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 block">{article.categorie}</span>
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{article.titre}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span>⏱ {article.tempsLecture}</span>
                  </div>
                  <span className="text-blue-600 text-sm font-semibold group-hover:underline">Lire →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-10 text-center text-white">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-2">Prêt à créer ton CV ?</h3>
          <p className="text-gray-400 mb-6">Génère un CV adapté à chaque offre d'emploi en 30 secondes grâce à l'IA.</p>
          <Link href="/generate" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
            Essayer gratuitement — 3 CV offerts →
          </Link>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-gray-600">CGU</Link>
        </div>
        © 2025 CVAdapt
      </footer>
    </main>
  );
}
