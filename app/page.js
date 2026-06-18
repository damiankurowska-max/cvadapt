import { LandingWrapper } from "@/app/components/LandingWrapper";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment optimiser son CV avec l'IA en 30 secondes",
  description: "Optimise ton CV pour les filtres ATS de chaque offre d'emploi en 3 étapes simples avec Postulera.",
  totalTime: "PT30S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Colle l'offre d'emploi",
      text: "Copie-colle l'offre d'emploi dans Postulera. L'IA identifie les mots-clés ATS exacts attendus par le recruteur.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "L'IA analyse et optimise",
      text: "Postulera compare ton CV à l'offre, intègre les mots-clés manquants et réécrit les sections clés pour maximiser ton score ATS.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Télécharge ton CV optimisé",
      text: "Ton CV optimisé est prêt en 30 secondes. Score ATS 85+ garanti. Télécharge-le et postule immédiatement.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Postulera est-il vraiment gratuit ?", acceptedAnswer: { "@type": "Answer", text: "Oui, 3 CV complets sont générés gratuitement, sans carte bancaire requise." } },
    { "@type": "Question", name: "Comment fonctionne l'optimisation ATS ?", acceptedAnswer: { "@type": "Answer", text: "L'IA analyse l'offre d'emploi, extrait les mots-clés ATS exacts et réécrit votre CV pour maximiser votre score de correspondance." } },
    { "@type": "Question", name: "En combien de temps est généré mon CV ?", acceptedAnswer: { "@type": "Answer", text: "Le CV optimisé est généré en moins de 30 secondes." } },
    { "@type": "Question", name: "Puis-je annuler mon abonnement ?", acceptedAnswer: { "@type": "Answer", text: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client." } },
    { "@type": "Question", name: "Postulera fonctionne-t-il pour tous les secteurs ?", acceptedAnswer: { "@type": "Answer", text: "Oui, Postulera analyse le vocabulaire spécifique de chaque offre et adapte le CV en conséquence, quel que soit le secteur." } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LandingWrapper />
    </>
  );
}
