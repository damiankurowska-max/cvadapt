export const metadata = {
  title: "Tarifs CVAdapt — Dès 4,99€/mois · Remise Étudiants -50%",
  description: "Plan Étudiant à 4,99€/mois : 15 CV adaptés + lettre de motivation + score ATS complet. Sans engagement, annulable en 1 clic. Remise -50% sur justificatif étudiant.",
  alternates: { canonical: "https://cvadapt.eu/tarifs" },
  openGraph: {
    title: "Tarifs CVAdapt — Dès 4,99€/mois · Remise Étudiants -50%",
    description: "Plan Étudiant à 4,99€/mois : 15 CV adaptés + lettre de motivation + score ATS complet. Sans engagement, annulable en 1 clic. Remise -50% sur justificatif étudiant.",
    url: "https://cvadapt.eu/tarifs",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cvadapt.eu" },
      { "@type": "ListItem", position: 2, name: "Tarifs", item: "https://cvadapt.eu/tarifs" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Plans tarifaires CVAdapt",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "CVAdapt Gratuit",
          description: "3 CV complets gratuits sans carte bancaire",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://cvadapt.eu/generate",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "CVAdapt Étudiant",
          description: "15 CV par mois avec score ATS complet et lettre de motivation",
          offers: {
            "@type": "Offer",
            price: "4.99",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://cvadapt.eu/tarifs",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "4.99",
              priceCurrency: "EUR",
              billingDuration: "P1M",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "CVAdapt Pro",
          description: "CV illimités, templates premium, support prioritaire",
          offers: {
            "@type": "Offer",
            price: "9.99",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://cvadapt.eu/tarifs",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "9.99",
              priceCurrency: "EUR",
              billingDuration: "P1M",
            },
          },
        },
      },
    ],
  },
];

export default function TarifsLayout({ children }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
