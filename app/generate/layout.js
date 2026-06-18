export const metadata = {
  title: "Générer mon CV — Adapté à l'Offre en 30 Secondes | Postulera",
  description: "Colle une offre d'emploi, entre ton profil : Postulera génère ton CV optimisé ATS en 30 secondes. Mots-clés inclus. 3 CV gratuits sans carte bancaire.",
  alternates: { canonical: "https://postulera.com/generate" },
  openGraph: {
    title: "Générer mon CV — Adapté à l'Offre en 30 Secondes | Postulera",
    description: "Colle une offre d'emploi, entre ton profil : Postulera génère ton CV optimisé ATS en 30 secondes. Mots-clés inclus. 3 CV gratuits sans carte bancaire.",
    url: "https://postulera.com/generate",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://postulera.com" },
    { "@type": "ListItem", position: 2, name: "Générer mon CV", item: "https://postulera.com/generate" },
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
