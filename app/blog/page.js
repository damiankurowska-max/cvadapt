import Link from "next/link";
import Logo from "../components/Logo";
import { articles } from "./data";
import NewsletterForm from "./NewsletterForm";

export const metadata = {
  title: "Blog CVAdapt — Guides CV, ATS et Recherche d'emploi",
  description: "Les meilleurs guides pour décrocher des entretiens : optimisation ATS, mots-clés CV, reconversion, lettre de motivation. Conseils concrets, résultats mesurables.",
  alternates: { canonical: "https://cvadapt.eu/blog" },
};

export default function Blog() {
  const categories = ["Tous", "Conseils CV", "ATS & Mots-clés", "Reconversion", "Lettre de motivation", "Premier emploi"];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/analyse" className="text-sm text-gray-600 hover:text-gray-900 font-medium hidden sm:inline">Analyser mon CV</Link>
          <Link href="/tarifs" className="text-sm text-gray-600 hover:text-gray-900 font-medium hidden sm:inline">Tarifs</Link>
          <Link href="/generate" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            Générer mon CV →
          </Link>
        </nav>
      </header>

      {/* Hero blog premium */}
      <section className="border-b border-gray-100" style={{background: "linear-gradient(135deg, #f8faff 0%, #eff6ff 50%, #f8faff 100%)"}}>
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            📚 Ressources gratuites
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Décroche 3× plus d'entretiens.<br />
            <span className="text-blue-600">Les guides qui fonctionnent vraiment.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stratégies ATS, mots-clés, reconversion — des guides concrets basés sur l'analyse de milliers de CV pour t'aider à décrocher le poste que tu vises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/analyse" className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              🎯 Analyser mon CV gratuitement →
            </Link>
            <Link href="/generate" className="border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Générer un CV optimisé
            </Link>
          </div>
          {/* Stats credibility */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[
              { icon: "📄", val: "12 847", label: "CV optimisés" },
              { icon: "⭐", val: "4,9/5", label: "Note moyenne" },
              { icon: "📚", val: `${articles.length} guides`, label: "publiés" },
              { icon: "✓", val: "Gratuit", label: "sans inscription" },
            ].map((s) => (
              <div key={s.val} className="flex items-center gap-1.5">
                <span>{s.icon}</span>
                <span className="font-bold text-gray-700">{s.val}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet inline */}
      <section className="border-b border-gray-100 bg-gray-900 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-white font-bold text-lg mb-1">🎯 Ton CV passe-t-il les filtres ATS ?</p>
            <p className="text-gray-400 text-sm">Analyse gratuite · Score /100 · Mots-clés manquants détectés · 30 secondes</p>
          </div>
          <Link href="/analyse" className="flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">
            Analyser gratuitement →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* Article featured (premier) */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">— Guide phare</p>
          <Link href={`/blog/${articles[0].slug}`} className="group block">
            <div className={`bg-gradient-to-br ${articles[0].couleur} rounded-2xl p-10 text-white hover:opacity-95 transition-all`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="text-7xl flex-shrink-0">{articles[0].illustration}</div>
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 block">{articles[0].categorie}</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3 group-hover:underline leading-tight">{articles[0].titre}</h2>
                  <p className="text-white/80 mb-6 max-w-2xl leading-relaxed">{articles[0].description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                    <span>📅 {articles[0].date}</span>
                    <span>⏱ {articles[0].tempsLecture}</span>
                    <span className="text-white font-bold bg-white/10 px-4 py-1.5 rounded-full group-hover:bg-white/20 transition-colors">Lire le guide →</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grille articles */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">— Tous les guides</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {articles.slice(1).map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all overflow-hidden">
              {/* Illustration */}
              <div className={`bg-gradient-to-br ${article.couleur} p-8 flex items-center justify-center`}>
                <span className="text-6xl">{article.illustration}</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">{article.categorie}</span>
                <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{article.titre}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-gray-400 text-xs">⏱ {article.tempsLecture}</span>
                  <span className="text-blue-600 text-sm font-bold group-hover:underline">Lire →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA intermédiaire — Analyse ATS */}
        <div className="rounded-2xl overflow-hidden mb-16" style={{background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)"}}>
          <div className="p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Mockup score mini */}
            <div className="flex-shrink-0 bg-white/10 rounded-2xl p-6 text-center min-w-[120px]">
              <div className="text-4xl font-extrabold text-white mb-1">87</div>
              <div className="text-blue-200 text-xs font-bold">/100 ATS</div>
              <div className="flex gap-0.5 justify-center mt-2">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                Lis les guides. Puis teste ton CV.
              </h3>
              <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                La théorie c'est bien. Mais un score ATS concret sur ton vrai CV, c'est mieux. Analyse gratuite, résultat en 30 secondes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/analyse" className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-center">
                  🎯 Analyser mon CV →
                </Link>
                <Link href="/generate" className="border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-center">
                  Générer un CV optimisé
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section "Pourquoi lire ce blog" — valeur */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">— Notre promesse</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Pas du contenu générique. Des résultats concrets.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Chaque guide est basé sur l'analyse de milliers de CV et d'offres d'emploi réelles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Actionnable", desc: "Chaque guide se termine par des actions concrètes à appliquer dans les 5 prochaines minutes sur ton CV." },
              { icon: "📊", title: "Basé sur les données", desc: "Nos conseils proviennent de l'analyse de milliers de candidatures réelles et de retours de recruteurs." },
              { icon: "⚡", title: "Rapide à lire", desc: "Des guides de 4-6 minutes, sans blabla. Tu lis, tu appliques, tu envoies ton CV le jour même." },
            ].map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Newsletter */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Un conseil CV chaque semaine.</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">Astuces CV, erreurs ATS à éviter, conseils entretien — directement dans ta boîte mail. Gratuit.</p>
          <NewsletterForm />
          <p className="text-gray-400 text-xs mt-4">🔒 Zéro spam · Désinscription en 1 clic</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-6 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/analyse" className="hover:text-gray-600">Analyser mon CV</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
          <Link href="/generate" className="hover:text-gray-600">Générer un CV</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-gray-600">CGU</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
