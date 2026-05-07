import Link from "next/link";
import Logo from "../components/Logo";
import { articles } from "./data";
import NewsletterForm from "./NewsletterForm";

export const metadata = {
  title: "Blog CVAdapt — Décroche 3× Plus d'Entretiens avec ces Guides",
  description: "Guides CV concrets pour étudiants et jeunes diplômés : passer les filtres ATS, rédiger une lettre percutante, décrocher stage et alternance. Lus par +12 000 étudiants.",
  alternates: { canonical: "https://cvadapt.eu/blog" },
  openGraph: {
    title: "Blog CVAdapt — Décroche 3× Plus d'Entretiens avec ces Guides",
    description: "Guides CV concrets pour étudiants et jeunes diplômés : passer les filtres ATS, rédiger une lettre percutante, décrocher stage et alternance. Lus par +12 000 étudiants.",
    url: "https://cvadapt.eu/blog",
  },
};

// Couleur d'accent par catégorie (sobre, professionnelle)
const CATEGORY_STYLE = {
  "Conseils CV":         { dot: "bg-blue-500",   pill: "bg-blue-50 text-blue-700" },
  "CV ATS":              { dot: "bg-violet-500",  pill: "bg-violet-50 text-violet-700" },
  "ATS & Mots-clés":    { dot: "bg-violet-500",  pill: "bg-violet-50 text-violet-700" },
  "Reconversion":        { dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700" },
  "Lettre de motivation":{ dot: "bg-orange-500",  pill: "bg-orange-50 text-orange-700" },
  "Débutants":           { dot: "bg-teal-500",    pill: "bg-teal-50 text-teal-700" },
  "Premier emploi":      { dot: "bg-teal-500",    pill: "bg-teal-50 text-teal-700" },
};

function getCategoryStyle(cat) {
  return CATEGORY_STYLE[cat] || { dot: "bg-gray-400", pill: "bg-gray-100 text-gray-600" };
}

export default function Blog() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="min-h-screen bg-white">

      {/* ── HEADER ── */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-xl font-bold text-blue-600">CVAdapt</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/analyse" className="text-sm text-gray-500 hover:text-gray-900 font-medium hidden sm:inline transition-colors">Analyser mon CV</Link>
            <Link href="/tarifs"  className="text-sm text-gray-500 hover:text-gray-900 font-medium hidden sm:inline transition-colors">Tarifs</Link>
            <Link href="/generate" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Générer mon CV →
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Ressources gratuites</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Guides CV pour décrocher<br className="hidden md:block" /> plus d'entretiens.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Stratégies ATS, mots-clés, reconversion — des guides concrets basés sur l'analyse de milliers de CV réels.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span><strong className="text-gray-700">{articles.length}</strong> guides publiés</span>
              <span className="w-px h-4 bg-gray-200" />
              <span><strong className="text-gray-700">12 847</strong> CV optimisés</span>
              <span className="w-px h-4 bg-gray-200" />
              <span><strong className="text-gray-700">Gratuit</strong> · sans inscription</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Article featured */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Guide phare</p>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <article className="rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Bande colorée à gauche */}
                <div className={`w-full md:w-1.5 h-1.5 md:h-auto ${getCategoryStyle(featured.categorie).dot} flex-shrink-0`} />
                <div className="p-8 md:p-10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${getCategoryStyle(featured.categorie).pill}`}>
                      {featured.categorie}
                    </span>
                    <span className="text-xs text-gray-400">{featured.tempsLecture} de lecture</span>
                    <span className="text-xs text-gray-400">{featured.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {featured.titre}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{featured.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                    Lire le guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>

        {/* Grille articles */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Tous les guides</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {rest.map((article) => {
            const style = getCategoryStyle(article.categorie);
            return (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <article className="h-full rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Accent top bar */}
                  <div className={`h-1 w-full ${style.dot}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${style.pill}`}>
                        {article.categorie}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors flex-1">
                      {article.titre}
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-xs text-gray-400">{article.tempsLecture} de lecture</span>
                      <span className="text-xs font-semibold text-blue-600 group-hover:underline flex items-center gap-1">
                        Lire
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA analyse ATS — sobre */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Passe à l'action</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Ton CV passe-t-il les filtres ATS ?</h3>
            <p className="text-gray-500 text-sm">Analyse gratuite · Score /100 · Mots-clés manquants · Résultat en 30 sec</p>
          </div>
          <Link href="/analyse" className="flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm whitespace-nowrap shadow-sm">
            Analyser mon CV gratuitement →
          </Link>
        </div>

        {/* Promesse */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8 text-center">Notre promesse</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Actionnable", desc: "Chaque guide se termine par des actions concrètes à appliquer immédiatement sur ton CV.", accent: "bg-blue-500" },
              { label: "Basé sur les données", desc: "Nos conseils viennent de l'analyse de milliers de candidatures réelles et de retours recruteurs.", accent: "bg-violet-500" },
              { label: "Rapide à lire", desc: "4 à 6 minutes par guide, sans blabla. Tu lis, tu appliques, tu envoies ton CV le jour même.", accent: "bg-emerald-500" },
            ].map((v) => (
              <div key={v.label} className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className={`w-8 h-1 rounded-full ${v.accent} mb-4`} />
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{v.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl bg-gray-900 p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Newsletter</p>
          <h3 className="text-2xl font-extrabold text-white mb-2">Un conseil CV chaque semaine.</h3>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Astuces CV, erreurs ATS à éviter, conseils entretien — directement dans ta boîte mail. Gratuit.
          </p>
          <NewsletterForm dark />
          <p className="text-gray-500 text-xs mt-4">Zéro spam · Désinscription en 1 clic</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400 mt-8">
        <div className="flex flex-wrap justify-center gap-6 mb-3">
          <Link href="/"               className="hover:text-gray-600 transition-colors">Accueil</Link>
          <Link href="/analyse"        className="hover:text-gray-600 transition-colors">Analyser mon CV</Link>
          <Link href="/tarifs"         className="hover:text-gray-600 transition-colors">Tarifs</Link>
          <Link href="/generate"       className="hover:text-gray-600 transition-colors">Générer un CV</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600 transition-colors">Mentions légales</Link>
          <Link href="/cgu"            className="hover:text-gray-600 transition-colors">CGU</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
