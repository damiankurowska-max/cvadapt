// app/cv-[metier]/page.tsx
// Next.js 16 — App Router dynamic SEO page for CVAdapt
// À placer dans: app/cv-[metier]/page.tsx
//
// Comment ça marche :
// 1. Next.js génère statiquement 1 page par entrée de metiers.json (SSG via generateStaticParams)
// 2. Chaque page est optimisée SEO : metadata, schema.org, internal linking
// 3. Sitemap auto-généré (voir app/sitemap.ts)

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import metiers from "@/data/metiers.json";

type Metier = {
  slug: string;
  metier: string;
  metierAccroche: string;
  titleSeo: string;
  metaDescription: string;
  h1: string;
  intro: string;
  atsKeywords: string[];
  formatConseils: string[];
  competencesCles: string[];
  experiencesValorisables: string[];
  salaireDebutant: string;
  salaireSenior: string;
  evolutionCarriere: string[];
  erreursCV: string[];
  phrasesExemples: string[];
  faq: { q: string; a: string }[];
  metiersConnexes: string[];
};

const allMetiers = metiers as Metier[];

// Génère statiquement 1 page par métier au build
export async function generateStaticParams() {
  return allMetiers.map((m) => ({ metier: m.slug }));
}

// SEO metadata par page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}): Promise<Metadata> {
  const { metier } = await params;
  const m = allMetiers.find((x) => x.slug === metier);
  if (!m) return {};
  return {
    title: m.titleSeo,
    description: m.metaDescription,
    alternates: { canonical: `https://cvadapt.eu/cv-${m.slug}` },
    openGraph: {
      title: m.titleSeo,
      description: m.metaDescription,
      url: `https://cvadapt.eu/cv-${m.slug}`,
      type: "article",
      locale: "fr_FR",
    },
    twitter: { card: "summary_large_image", title: m.titleSeo, description: m.metaDescription },
  };
}

export default async function MetierPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const m = allMetiers.find((x) => x.slug === metier);
  if (!m) return notFound();

  // Schema.org structured data (FAQPage + Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: m.h1,
        description: m.metaDescription,
        author: { "@type": "Organization", name: "CVAdapt" },
        publisher: { "@type": "Organization", name: "CVAdapt", logo: { "@type": "ImageObject", url: "https://cvadapt.eu/logo.png" } },
        datePublished: "2026-05-20",
        inLanguage: "fr-FR",
      },
      {
        "@type": "FAQPage",
        mainEntity: m.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* H1 */}
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">{m.h1}</h1>
        <p className="text-lg text-slate-600 mb-8">{m.intro}</p>

        {/* CTA primaire */}
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 mb-10">
          <p className="text-sm font-medium text-emerald-900 mb-2">⚡ Génère ton CV de {m.metierAccroche} en 2 minutes</p>
          <p className="text-slate-700 mb-4">
            CVAdapt analyse l'offre d'emploi et adapte automatiquement ton CV avec les bons mots-clés ATS pour le poste de {m.metier}.
          </p>
          <Link href="/?utm_source=seo&utm_campaign=metier&utm_term=cv-{m.slug}" className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-700">
            Créer mon CV gratuitement →
          </Link>
        </div>

        {/* Mots-clés ATS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Mots-clés ATS à intégrer dans un CV de {m.metier}</h2>
          <p className="text-slate-700 mb-3">
            Les logiciels ATS (Applicant Tracking Systems) utilisés par 75% des recruteurs en France filtrent les CV par mots-clés.
            Voici les termes critiques à inclure pour un poste de {m.metier} :
          </p>
          <div className="flex flex-wrap gap-2">
            {m.atsKeywords.map((kw) => (
              <span key={kw} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800 border border-slate-200">{kw}</span>
            ))}
          </div>
        </section>

        {/* Format & structure */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Format conseillé pour un CV de {m.metier}</h2>
          <ul className="space-y-2">
            {m.formatConseils.map((c, i) => (
              <li key={i} className="flex gap-3"><span className="text-emerald-600 font-bold">✓</span><span className="text-slate-700">{c}</span></li>
            ))}
          </ul>
        </section>

        {/* Compétences */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Compétences clés à valoriser</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {m.competencesCles.map((c) => (
              <li key={c} className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700 text-sm">{c}</li>
            ))}
          </ul>
        </section>

        {/* Expériences */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Expériences à mettre en avant</h2>
          <ul className="space-y-2">
            {m.experiencesValorisables.map((e, i) => (
              <li key={i} className="text-slate-700">• {e}</li>
            ))}
          </ul>
        </section>

        {/* Phrases exemples */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemples de phrases à utiliser dans ton CV</h2>
          <div className="space-y-3">
            {m.phrasesExemples.map((p, i) => (
              <blockquote key={i} className="border-l-4 border-emerald-500 pl-4 italic text-slate-700">{p}</blockquote>
            ))}
          </div>
        </section>

        {/* Salaire */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Salaire moyen d'un {m.metier} en France</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Débutant (0-2 ans)</p><p className="text-2xl font-bold text-slate-900">{m.salaireDebutant}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Senior (5+ ans)</p><p className="text-2xl font-bold text-slate-900">{m.salaireSenior}</p></div>
          </div>
        </section>

        {/* Évolutions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Évolutions de carrière possibles</h2>
          <ul className="space-y-1">
            {m.evolutionCarriere.map((e, i) => (
              <li key={i} className="text-slate-700">→ {e}</li>
            ))}
          </ul>
        </section>

        {/* Erreurs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Erreurs à éviter dans un CV de {m.metier}</h2>
          <ul className="space-y-2">
            {m.erreursCV.map((e, i) => (
              <li key={i} className="flex gap-3"><span className="text-rose-600 font-bold">✗</span><span className="text-slate-700">{e}</span></li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions fréquentes</h2>
          <div className="space-y-4">
            {m.faq.map((f, i) => (
              <details key={i} className="rounded-lg border border-slate-200 p-4">
                <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Métiers connexes — internal linking */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Métiers similaires</h2>
          <div className="flex flex-wrap gap-2">
            {m.metiersConnexes.map((slug) => {
              const connexe = allMetiers.find((x) => x.slug === slug);
              if (!connexe) return null;
              return (
                <Link key={slug} href={`/cv-${slug}`} className="rounded-full bg-emerald-50 text-emerald-800 px-4 py-1.5 text-sm border border-emerald-200 hover:bg-emerald-100">
                  CV {connexe.metier}
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA final */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white text-center">
          <p className="text-2xl font-bold mb-2">Crée ton CV de {m.metier} maintenant</p>
          <p className="text-emerald-100 mb-4">Optimisé ATS · Personnalisé par l'IA · Téléchargeable en PDF</p>
          <Link href="/?utm_source=seo&utm_campaign=metier&utm_term=cv-{m.slug}-final" className="inline-block rounded-lg bg-white text-emerald-700 px-6 py-3 font-bold hover:bg-emerald-50">
            Commencer gratuitement →
          </Link>
        </div>
      </article>
    </>
  );
}
