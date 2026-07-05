export const metadata = {
  title: "CV Alternance 2025 — Modèle Gratuit Adapté à l'Offre | CVAdapt",
  description: "Crée ton CV d'alternance en 30 secondes : adapté à chaque offre, optimisé ATS, avec les bons mots-clés. Gratuit. Sans expérience pro ? Pas de problème.",
  keywords: "CV alternance, modèle CV alternance, CV alternance étudiant, CV alternance sans expérience, CV alternance ATS",
  alternates: { canonical: "https://cvadapt.eu/cv-alternance" },
  openGraph: {
    title: "CV Alternance 2025 — Modèle Gratuit Adapté à l'Offre | CVAdapt",
    description: "Crée ton CV d'alternance en 30 secondes : adapté à chaque offre, optimisé ATS, avec les bons mots-clés. Gratuit.",
    url: "https://cvadapt.eu/cv-alternance",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cvadapt.eu" },
      { "@type": "ListItem", position: 2, name: "CV Alternance", item: "https://cvadapt.eu/cv-alternance" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Comment faire un CV pour une alternance sans expérience ?", acceptedAnswer: { "@type": "Answer", text: "Mets en avant ta formation, tes projets universitaires, tes stages courts et tes compétences techniques. CVAdapt adapte automatiquement ton profil au vocabulaire attendu par l'entreprise." } },
      { "@type": "Question", name: "Quels mots-clés mettre dans un CV d'alternance ?", acceptedAnswer: { "@type": "Answer", text: "Les mots-clés varient selon l'offre. CVAdapt analyse l'offre d'alternance et détecte exactement quels termes ajouter à ton CV pour passer les filtres ATS." } },
    ],
  },
];

export default function CvAlternanceLayout({ children }) {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {children}
    </>
  );
}
