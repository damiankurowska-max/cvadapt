import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV Comptable · Finance · Gestion",
    title: "Ton CV comptable adapté à chaque offre en 30 sec",
    subtitle: "Comptabilité générale, contrôle de gestion, audit, trésorerie... CVAdapt intègre les logiciels (SAP, Sage, Cegid) et les normes (IFRS, PCG) que les recruteurs finance exigent.",
    stats: [
      { value: "90%", label: "des cabinets utilisent des ATS" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "Score 91", label: "ATS moyen après CVAdapt" },
    ],
  },
  steps: [
    { title: "Colle l'offre finance/compta", desc: "Cabinet, entreprise, BIG 4... CVAdapt détecte les logiciels et normes attendus." },
    { title: "Entre ton profil", desc: "Tes missions, logiciels maîtrisés, clôtures, reportings et diplômes comptables." },
    { title: "Reçois ton CV optimisé", desc: "Les bons termes techniques au bon endroit pour passer les filtres et convaincre le DRH." },
  ],
  examples: {
    title: "Des profils comptables et finance qui ont décroché leur poste",
    subtitle: "Cabinet, grands groupes, PME.",
    items: [
      { emoji: "📒", name: "Julien F.", role: "Comptable général · Marseille", text: "CVAdapt a ajouté SAP et les normes IFRS que l'offre demandait. CDI signé en 3 semaines.", result: "CDI signé" },
      { emoji: "📈", name: "Marie-Claire B.", role: "Contrôleur de gestion · Paris", text: "Le recruteur a dit que mon CV était parfaitement aligné sur le poste. CVAdapt a fait la différence.", result: "4 entretiens en 2 semaines" },
      { emoji: "🔎", name: "Antoine P.", role: "Auditeur junior · Lyon", text: "Mon score ATS est passé de 41 à 94. Les termes d'audit manquaient — CVAdapt les a ajoutés automatiquement.", result: "Score ATS 41→94" },
      { emoji: "💼", name: "Clara N.", role: "DAF · PME tech · Paris", text: "Même en profil senior, CVAdapt aligne le vocabulaire exactement sur chaque offre. Gain de temps énorme.", result: "Poste DAF décroché" },
    ],
  },
  faq: [
    { q: "CVAdapt reconnaît les logiciels comptables ?", a: "Oui — SAP, Sage (50/100/1000), Cegid, Quadratus, Divalto, Excel avancé, Power BI... CVAdapt détecte ceux mentionnés dans l'offre et les intègre si tu les maîtrises." },
    { q: "Ça marche pour les cabinets d'expertise comptable et les BIG 4 ?", a: "Oui. CVAdapt adapte le ton et le niveau de technicité selon l'offre — cabinet local, BIG 4, direction financière de grand groupe ou PME." },
    { q: "CVAdapt gère les normes comptables (IFRS, PCG, US GAAP) ?", a: "Oui. Si l'offre mentionne des normes spécifiques, CVAdapt les intègre dans ton CV là où les ATS les cherchent." },
    { q: "La lettre de motivation est-elle incluse ?", a: "Oui. Une lettre professionnelle personnalisée à l'entreprise et à l'offre est générée en même temps que le CV." },
    { q: "C'est gratuit ?", a: "3 CV complets sont gratuits sans carte bancaire. Plan Étudiant à 4,99€/mois pour 15 CV/mois avec lettre de motivation." },
  ],
  cta: { primary: "Créer mon CV comptable", finalTitle: "Ton prochain poste finance commence ici", finalSub: "CV adapté, logiciels et normes intégrés, lettre incluse. Gratuit pour commencer." },
};

export default function CvComptablePage() {
  return <SectorLanding config={config} />;
}
