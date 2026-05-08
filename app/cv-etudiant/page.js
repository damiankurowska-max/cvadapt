import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV Étudiant 2025",
    title: "Le CV étudiant qui passe les filtres ATS en 30 sec",
    subtitle: "En tant qu'étudiant, ton CV est jugé en 7 secondes. CVAdapt l'adapte à chaque offre de stage ou d'alternance avec les mots-clés exacts attendus — et génère la lettre de motivation.",
    stats: [
      { value: "7 sec", label: "pour convaincre un recruteur" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "+3×", label: "de chances d'être rappelé" },
    ],
  },
  steps: [
    { title: "Colle l'offre de stage ou d'alternance", desc: "Peu importe la plateforme — LinkedIn, Indeed, JobTeaser, site de l'entreprise." },
    { title: "Entre ta formation et tes projets", desc: "Tes cours, projets académiques, stages, associations et compétences." },
    { title: "Reçois ton CV + lettre de motivation", desc: "Tout est adapté à l'offre spécifique, avec le bon vocabulaire et les bons mots-clés." },
  ],
  examples: {
    title: "Des étudiants comme toi ont décroché leur poste",
    subtitle: "Stages, alternances, premiers emplois.",
    items: [
      { emoji: "🎓", name: "Théo V.", role: "Alternant finance · Paris", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé par une grande banque en 5 jours.", result: "Alternance décrochée J+5" },
      { emoji: "💻", name: "Alexis M.", role: "Étudiant en informatique · Lyon", text: "Les offres tech sont très précises sur les technos. CVAdapt a détecté exactement ce qui manquait dans mon profil.", result: "Stage dev obtenu" },
      { emoji: "📱", name: "Emma T.", role: "Master Marketing digital · Toulouse", text: "CVAdapt a reformulé mes projets universitaires en langage recruteur. Mon stage a été décroché en 2 semaines.", result: "Stage décroché J+14" },
      { emoji: "🏢", name: "Romain S.", role: "BUT GEA · Bordeaux", text: "3 semaines de candidatures sans réponse, puis CVAdapt. Entretien la semaine suivante, alternance signée.", result: "Alternance signée" },
    ],
  },
  faq: [
    { q: "Comment faire un CV étudiant qui se démarque ?", a: "Adapte-le à chaque offre. CVAdapt analyse l'offre et intègre les mots-clés exacts attendus — tes projets et formations sont reformulés pour matcher exactement le poste." },
    { q: "Que mettre dans un CV étudiant sans expérience pro ?", a: "Projets académiques, TP, projets personnels, associations, bénévolat, compétences techniques, langues. CVAdapt les valorise avec le bon vocabulaire professionnel." },
    { q: "CVAdapt fonctionne pour les stages et alternances ?", a: "Oui, c'est même pour ça qu'il est conçu. CVAdapt détecte les mots-clés attendus pour chaque type de poste et adapte ton profil étudiant en conséquence." },
    { q: "Est-ce que la lettre de motivation est incluse ?", a: "Oui. CVAdapt génère automatiquement une lettre de motivation personnalisée à l'offre et à l'entreprise, en plus du CV adapté." },
    { q: "C'est gratuit pour les étudiants ?", a: "3 CV complets sont gratuits sans carte bancaire. Le plan Étudiant est à 4,99€/mois — avec 50% de remise supplémentaire sur justificatif scolaire." },
  ],
  cta: {
    primary: "Créer mon CV étudiant",
    finalTitle: "Prêt à décrocher ton stage ou alternance ?",
    finalSub: "3 CV gratuits. Sans carte bancaire. Résultat en 30 secondes.",
  },
};

export default function CvEtudiantPage() {
  return <SectorLanding config={config} />;
}
