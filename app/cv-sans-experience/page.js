import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "Premier emploi · Stage · Alternance",
    title: "CV sans expérience : valorise ce que tu as déjà",
    subtitle: "Tout le monde a un premier CV. CVAdapt transforme tes projets, ta formation et tes compétences en un CV professionnel qui passe les filtres ATS et convainc les recruteurs.",
    stats: [
      { value: "91%", label: "des compétences sous-valorisées" },
      { value: "30 sec", label: "pour créer ton CV" },
      { value: "Gratuit", label: "3 CV sans carte bancaire" },
    ],
  },
  steps: [
    { title: "Colle l'offre qui t'intéresse", desc: "CVAdapt analyse le vocabulaire exact attendu par le recruteur pour ce poste." },
    { title: "Entre ce que tu as", desc: "Formation, projets, associations, bénévolat, compétences — même sans CDI ni stage long." },
    { title: "Reçois un CV pro adapté", desc: "CVAdapt reformule et restructure ton profil avec les mots-clés de l'offre. Score ATS inclus." },
  ],
  examples: {
    title: "Ils ont trouvé sans expérience grâce à CVAdapt",
    subtitle: "Des profils de débutants qui ont convaincu des recruteurs.",
    items: [
      { emoji: "🎓", name: "Emma T.", role: "Étudiante master · Toulouse", text: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement reformulés. Mon stage a été décroché en 2 semaines.", result: "Stage décroché J+14" },
      { emoji: "💡", name: "Marc L.", role: "Technicien · Nantes", text: "Simple à utiliser même sans être à l'aise avec l'informatique. Mon premier CV est maintenant pro et structuré.", result: "Premier emploi trouvé" },
      { emoji: "🌍", name: "Fatima Z.", role: "Chargée de projet · Arrivée en France", text: "Arrivée en France, je ne savais pas comment adapter mon profil au marché français. CVAdapt m'a sauvé la mise.", result: "Premier CDI en France" },
      { emoji: "👩‍💼", name: "Isabelle R.", role: "Assistante de direction · Nice", text: "À 52 ans après une pause carrière, CVAdapt a mis en avant mon expérience bénévole et mes compétences. Job trouvé en 3 semaines.", result: "CDI signé à 52 ans" },
    ],
  },
  faq: [
    { q: "Comment faire un bon CV quand on n'a aucune expérience ?", a: "Mets en avant tes projets personnels, cours, certifications, bénévolat, associations. CVAdapt les reformule avec le vocabulaire professionnel attendu et les adapte à chaque offre." },
    { q: "Qu'est-ce qu'on peut mettre sur un CV vide ?", a: "Formation, projets académiques, compétences techniques, langues, activités parascolaires, bénévolat, permis. CVAdapt sait valoriser tout ça de façon convaincante." },
    { q: "Est-ce qu'un CV sans expérience peut passer les filtres ATS ?", a: "Oui, si les bons mots-clés sont présents. CVAdapt analyse l'offre et intègre exactement les termes recherchés par les algorithmes ATS, même avec un profil débutant." },
    { q: "CVAdapt est-il adapté aux profils en reconversion ?", a: "Absolument. CVAdapt est particulièrement efficace pour reformuler un profil d'un secteur vers un autre, en traduisant tes compétences dans le langage du nouveau domaine." },
    { q: "C'est gratuit ?", a: "Oui, 3 CV complets sont gratuits sans carte bancaire. Plan Étudiant à 4,99€/mois pour 15 CV/mois avec lettre de motivation incluse." },
  ],
  cta: {
    primary: "Créer mon CV gratuitement",
    finalTitle: "Ton profil vaut plus que tu ne le crois",
    finalSub: "CVAdapt le prouve. 3 CV gratuits, résultat en 30 secondes.",
  },
};

export default function CvSansExperiencePage() {
  return <SectorLanding config={config} />;
}
