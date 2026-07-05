export const metadata = {
  title: "CV Sans Expérience — Modèle Gratuit qui Passe les ATS | CVAdapt",
  description: "Tu n'as pas d'expérience pro ? CVAdapt valorise tes projets, formations et compétences pour créer un CV qui convainc les recruteurs. Gratuit, 30 secondes.",
  keywords: "CV sans expérience, modèle CV débutant, CV premier emploi, CV étudiant sans expérience, CV stage sans expérience",
  alternates: { canonical: "https://cvadapt.eu/cv-sans-experience" },
  openGraph: {
    title: "CV Sans Expérience — Modèle Gratuit qui Passe les ATS | CVAdapt",
    description: "Tu n'as pas d'expérience pro ? CVAdapt valorise tes projets, formations et compétences pour créer un CV qui convainc les recruteurs.",
    url: "https://cvadapt.eu/cv-sans-experience",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cvadapt.eu" },
      { "@type": "ListItem", position: 2, name: "CV Sans Expérience", item: "https://cvadapt.eu/cv-sans-experience" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Comment faire un CV quand on n'a pas d'expérience ?", acceptedAnswer: { "@type": "Answer", text: "Mets en avant tes projets personnels, formations, associations, bénévolat et compétences techniques. CVAdapt réorganise et reformule ton profil pour le rendre attractif même sans emploi précédent." } },
    ],
  },
];

export default function CvSansExperienceLayout({ children }) {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {children}
    </>
  );
}
