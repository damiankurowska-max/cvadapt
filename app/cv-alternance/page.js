import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV Alternance 2025",
    title: "Ton CV d'alternance adapté à chaque offre en 30 sec",
    subtitle: "75% des CV d'alternance sont rejetés par les filtres ATS avant d'être lus. CVAdapt analyse l'offre et adapte ton CV avec les bons mots-clés — même sans expérience pro.",
    stats: [
      { value: "75%", label: "des CV rejetés automatiquement" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "3×", label: "plus de rappels" },
    ],
  },
  steps: [
    { title: "Colle l'offre d'alternance", desc: "Copie l'offre depuis LinkedIn, Indeed, APEC ou directement le site de l'entreprise." },
    { title: "Entre ton profil étudiant", desc: "Ta formation, tes compétences, tes projets universitaires et stages." },
    { title: "Reçois ton CV optimisé", desc: "CVAdapt intègre les mots-clés de l'offre et génère un CV ATS prêt à envoyer." },
  ],
  examples: {
    title: "Ils ont décroché leur alternance avec CVAdapt",
    subtitle: "Des profils comme le tien, sans expérience pro au départ.",
    items: [
      { emoji: "💻", name: "Théo V.", role: "BTS SIO → Alternance dev web · Paris", text: "Mon CV était générique. CVAdapt a mis en avant mes projets GitHub et mes compétences techniques exactes. 3 propositions en 2 semaines.", result: "3 offres d'alternance" },
      { emoji: "📊", name: "Emma T.", role: "Master Marketing → Alternance digital", text: "Je galérais à reformuler mon profil étudiant. CVAdapt a adapté chaque candidature automatiquement. Stage décroché en 10 jours.", result: "Stage décroché en 10 jours" },
      { emoji: "🏦", name: "Romain S.", role: "Licence Finance → Alternance banque", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé en 5 jours par une grande banque parisienne.", result: "Alternance signée J+5" },
      { emoji: "🎨", name: "Lucie H.", role: "BUT MMI → Alternance UX Design", text: "CVAdapt a reformulé mes projets de formation en langage recruteur. Le responsable RH m'a dit que mon CV était 'exactement ce qu'ils cherchaient'.", result: "Entretien décroché J+3" },
    ],
  },
  faq: [
    { q: "Comment faire un CV d'alternance sans expérience ?", a: "Mets en avant ta formation, tes projets universitaires, tes stages et associations. CVAdapt adapte ton profil étudiant au vocabulaire exact de l'entreprise — même sans expérience pro, ton CV devient compétitif." },
    { q: "Quels mots-clés mettre dans un CV d'alternance ?", a: "Ça dépend de l'offre. CVAdapt analyse chaque offre et détecte exactement quels termes ajouter (compétences techniques, logiciels, certifications) pour passer les filtres ATS automatiques." },
    { q: "CVAdapt fonctionne pour toutes les filières d'alternance ?", a: "Oui — informatique, marketing, comptabilité, RH, commerce, ingénierie... CVAdapt s'adapte au vocabulaire spécifique de chaque secteur." },
    { q: "Combien ça coûte ?", a: "3 CV complets sont gratuits, sans carte bancaire. Le plan Étudiant est à 4,99€/mois pour 15 CV par mois avec score ATS complet et lettre de motivation incluse." },
    { q: "Est-ce que CVAdapt génère aussi la lettre de motivation pour l'alternance ?", a: "Oui. En plus du CV adapté, CVAdapt génère une lettre de motivation personnalisée à l'offre et à l'entreprise, prête à envoyer." },
  ],
  cta: {
    primary: "Créer mon CV d'alternance",
    finalTitle: "Prêt à décrocher ton alternance ?",
    finalSub: "3 CV gratuits. Résultat en 30 secondes. Sans carte bancaire.",
  },
};

export default function CvAlternancePage() {
  return <SectorLanding config={config} />;
}
