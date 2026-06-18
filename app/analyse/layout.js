export const metadata = {
  title: "Test ATS Gratuit — Ton CV passe-t-il les filtres ? | Postulera",
  description: "Analyse ton CV en 30 secondes : score ATS, mots-clés manquants, points forts et recommandations personnalisées. 100% gratuit, sans inscription.",
  alternates: { canonical: "https://postulera.com/analyse" },
  openGraph: {
    title: "Test ATS Gratuit — Ton CV passe-t-il les filtres ? | Postulera",
    description: "Analyse ton CV en 30 secondes : score ATS, mots-clés manquants, points forts et recommandations personnalisées. 100% gratuit, sans inscription.",
    url: "https://postulera.com/analyse",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://postulera.com" },
    { "@type": "ListItem", position: 2, name: "Analyser mon CV", item: "https://postulera.com/analyse" },
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
