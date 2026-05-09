import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV RH · Recrutement · HRBP",
    title: "Ton CV RH adapté à chaque offre en 30 sec",
    subtitle: "Recrutement, GPEC, formation, paie, HRBP, relations sociales... CVAdapt intègre les logiciels SIRH (Workday, SuccessFactors, SILAE) et les termes exacts attendus par les recruteurs.",
    stats: [
      { value: "80%", label: "des offres RH passent par un ATS" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "3×", label: "plus de rappels" },
    ],
  },
  steps: [
    { title: "Colle l'offre RH", desc: "CVAdapt analyse les missions, SIRH et compétences attendus dans l'offre." },
    { title: "Entre ton expérience RH", desc: "Tes missions, les SIRH maîtrisés, tes réalisations chiffrées (recrutements, formations...)." },
    { title: "Reçois ton CV adapté", desc: "Vocabulaire RH exact, bons outils, bonnes compétences — prêt à passer les filtres ATS." },
  ],
  examples: {
    title: "Des profils RH qui ont décroché leur poste avec CVAdapt",
    subtitle: "Chargé RH, recruteur, HRBP, responsable formation.",
    items: [
      { emoji: "👥", name: "Laura D.", role: "Chargée RH · Lille", text: "En tant que RH je sais ce que les recruteurs cherchent. CVAdapt coche toutes les cases — mêmes mots-clés, même structure.", result: "Poste décroché en 1 semaine" },
      { emoji: "🔍", name: "Céline V.", role: "Recruteuse → HRBP · Rennes", text: "CVAdapt a traduit mon profil de recruteur vers HRBP parfaitement. Les missions et les compétences correspondaient exactement.", result: "Évolution HRBP réussie" },
      { emoji: "📋", name: "Nathalie D.", role: "Responsable formation · Bordeaux", text: "Mon CV mentionnait les mêmes compétences mais pas avec les bons termes. CVAdapt a tout aligné. Rappelée en 4 jours.", result: "CDI responsable formation" },
      { emoji: "💼", name: "Isabelle R.", role: "DRH · Grande enseigne · Nice", text: "Même à un niveau DRH, CVAdapt permet d'aligner précisément son profil sur chaque offre. Très efficace.", result: "Poste DRH signé" },
    ],
  },
  faq: [
    { q: "CVAdapt reconnaît les SIRH ?", a: "Oui — Workday, SuccessFactors, SAP HR, SILAE, Lucca, Cegid, ADP, Talentsoft... CVAdapt détecte ceux mentionnés dans l'offre et les intègre si tu les maîtrises." },
    { q: "Ça marche pour tous les métiers RH ?", a: "Oui — recrutement, formation, paie, relations sociales, GPEC, HRBP, DRH... CVAdapt adapte le vocabulaire au sous-domaine RH de l'offre." },
    { q: "CVAdapt est utile même quand on connaît bien les RH ?", a: "Oui. Même les professionnels RH savent qu'un CV doit être adapté à chaque offre. CVAdapt automatise cette adaptation et évite les erreurs d'alignement lexical." },
    { q: "La lettre de motivation est incluse ?", a: "Oui. CVAdapt génère une lettre personnalisée à l'entreprise et à l'offre en même temps que le CV." },
    { q: "C'est gratuit ?", a: "3 CV complets sont gratuits sans carte bancaire. Plan Étudiant à 4,99€/mois pour 15 CV/mois avec lettre de motivation." },
  ],
  cta: { primary: "Créer mon CV RH", finalTitle: "Ton prochain poste RH commence ici", finalSub: "CV adapté, SIRH intégrés, lettre incluse. Gratuit pour commencer." },
};

export default function CvRhPage() {
  return <SectorLanding config={config} />;
}
