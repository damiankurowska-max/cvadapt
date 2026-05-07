export const metadata = {
  title: "Générer mon CV — Adapté à l'Offre en 30 Secondes | CVAdapt",
  description: "Colle une offre d'emploi, entre ton profil : CVAdapt génère ton CV optimisé ATS en 30 secondes. Mots-clés inclus. 3 CV gratuits sans carte bancaire.",
  alternates: { canonical: "https://cvadapt.eu/generate" },
  openGraph: {
    title: "Générer mon CV — Adapté à l'Offre en 30 Secondes | CVAdapt",
    description: "Colle une offre d'emploi, entre ton profil : CVAdapt génère ton CV optimisé ATS en 30 secondes. Mots-clés inclus. 3 CV gratuits sans carte bancaire.",
    url: "https://cvadapt.eu/generate",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cvadapt.eu" },
    { "@type": "ListItem", position: 2, name: "Générer mon CV", item: "https://cvadapt.eu/generate" },
  ],
};

export default function GenerateLayout({ children }) {
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
