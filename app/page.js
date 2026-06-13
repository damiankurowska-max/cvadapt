import { LandingWrapper } from "@/app/components/LandingWrapper";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "CVAdapt est-il vraiment gratuit ?", acceptedAnswer: { "@type": "Answer", text: "Oui, 3 CV complets sont générés gratuitement, sans carte bancaire requise." } },
    { "@type": "Question", name: "Comment fonctionne l'optimisation ATS ?", acceptedAnswer: { "@type": "Answer", text: "L'IA analyse l'offre d'emploi, extrait les mots-clés ATS exacts et réécrit votre CV pour maximiser votre score de correspondance." } },
    { "@type": "Question", name: "En combien de temps est généré mon CV ?", acceptedAnswer: { "@type": "Answer", text: "Le CV optimisé est généré en moins de 30 secondes." } },
    { "@type": "Question", name: "Puis-je annuler mon abonnement ?", acceptedAnswer: { "@type": "Answer", text: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client." } },
    { "@type": "Question", name: "CVAdapt fonctionne-t-il pour tous les secteurs ?", acceptedAnswer: { "@type": "Answer", text: "Oui, CVAdapt analyse le vocabulaire spécifique de chaque offre et adapte le CV en conséquence, quel que soit le secteur." } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LandingWrapper />
    </>
  );
}
