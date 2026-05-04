import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "../../components/Logo";
import { articles } from "../data";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.titre} — CVAdapt`,
    description: article.description,
    alternates: { canonical: `https://cvadapt.eu/blog/${article.slug}` },
    openGraph: {
      title: article.titre,
      description: article.description,
      url: `https://cvadapt.eu/blog/${article.slug}`,
      siteName: "CVAdapt",
      locale: "fr_FR",
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const autres = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: "CVAdapt" },
    publisher: { "@type": "Organization", name: "CVAdapt", url: "https://cvadapt.eu" },
    url: `https://cvadapt.eu/blog/${article.slug}`,
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 font-medium">← Blog</Link>
          <Link href="/generate" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            Générer mon CV →
          </Link>
        </nav>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600">{article.categorie}</span>
        </div>

        {/* En-tête article */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3 block">{article.categorie}</span>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{article.titre}</h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-6">{article.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
            <span>📅 Publié le {article.date}</span>
            <span>⏱ {article.tempsLecture} de lecture</span>
          </div>
        </div>

        {/* Contenu */}
        <div
          className="text-gray-700 leading-relaxed"
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
          }}
          dangerouslySetInnerHTML={{ __html: article.contenu
            .replace(/<h2>/g, '<h2 style="font-size:24px;font-weight:700;color:#111827;margin:40px 0 16px;">')
            .replace(/<h3>/g, '<h3 style="font-size:18px;font-weight:600;color:#374151;margin:28px 0 12px;">')
            .replace(/<ul>/g, '<ul style="list-style:disc;padding-left:24px;margin:16px 0;space-y:8px;">')
            .replace(/<ol>/g, '<ol style="list-style:decimal;padding-left:24px;margin:16px 0;">')
            .replace(/<li>/g, '<li style="margin-bottom:8px;">')
            .replace(/<p>/g, '<p style="margin-bottom:16px;">')
            .replace(/<blockquote/g, '<blockquote style="border-left:3px solid #2563eb;padding-left:20px;margin:24px 0;color:#374151;font-style:italic;"')
          }}
        />

        {/* CTA dans l'article */}
        <div className="my-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Génère ton CV adapté maintenant</h3>
          <p className="text-blue-100 mb-5 text-sm">Colle une offre d'emploi, entre tes infos — CVAdapt crée ton CV en 30 secondes.</p>
          <Link href="/generate" className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Essayer gratuitement →
          </Link>
        </div>
      </article>

      {/* Articles liés */}
      {autres.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">À lire aussi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {autres.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 block">{a.categorie}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{a.titre}</h3>
                  <p className="text-gray-500 text-sm">{a.description.substring(0, 100)}...</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
        </div>
        © 2025 CVAdapt
      </footer>
    </main>
  );
}
