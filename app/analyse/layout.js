export const metadata = {
  title: "Test ATS Gratuit — Ton CV passe-t-il les filtres ? | CVAdapt",
  description: "Analyse ton CV en 30 secondes : score ATS, mots-clés manquants, points forts et recommandations personnalisées. 100% gratuit, sans inscription.",
  alternates: { canonical: "https://cvadapt.eu/analyse" },
  openGraph: {
    title: "Test ATS Gratuit — Ton CV passe-t-il les filtres ? | CVAdapt",
    description: "Analyse ton CV en 30 secondes : score ATS, mots-clés manquants, points forts et recommandations personnalisées. 100% gratuit, sans inscription.",
    url: "https://cvadapt.eu/analyse",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cvadapt.eu" },
    { "@type": "ListItem", position: 2, name: "Analyser mon CV", item: "https://cvadapt.eu/analyse" },
  ],
};

export default function AnalyseLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
