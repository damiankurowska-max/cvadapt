import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV Marketing · Communication · Digital",
    title: "Ton CV marketing adapté à chaque offre en 30 sec",
    subtitle: "Community manager, chef de projet digital, chargé de communication... CVAdapt intègre exactement les outils, KPIs et mots-clés que les recruteurs marketing cherchent.",
    stats: [
      { value: "85%", label: "des offres marketing utilisent des ATS" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "3×", label: "plus de rappels" },
    ],
  },
  steps: [
    { title: "Colle l'offre marketing", desc: "LinkedIn, Welcome to the Jungle, Cadremploi... CVAdapt détecte les outils et KPIs attendus." },
    { title: "Entre ton expérience", desc: "Tes campagnes, outils (Meta Ads, Google Ads, HubSpot...), résultats chiffrés et compétences." },
    { title: "Reçois ton CV optimisé", desc: "Les bons termes marketing au bon endroit pour passer les filtres ATS et convaincre le recruteur." },
  ],
  examples: {
    title: "Des profils marketing qui ont décroché leur poste",
    subtitle: "Digital, brand, communication, SEO.",
    items: [
      { emoji: "📱", name: "Pauline M.", role: "Community Manager · Bordeaux", text: "CVAdapt a ajouté exactement les bons KPIs et outils de l'offre. Une agence parisienne m'a contactée directement.", result: "CDI agence parisienne" },
      { emoji: "📊", name: "Anaïs G.", role: "Responsable marketing · Paris", text: "Mon taux de réponse a triplé depuis que j'utilise CVAdapt pour chaque candidature. Les recruteurs notent la précision.", result: "Taux de réponse ×3" },
      { emoji: "🔍", name: "Lucie H.", role: "Chargée SEO/Content · Lyon", text: "CVAdapt a reformulé mes missions avec les bons termes SEO/SEM de l'offre. Entretien décroché en 3 jours.", result: "Entretien J+3" },
      { emoji: "🎯", name: "Clara N.", role: "Brand Manager · Paris", text: "Les recruteurs en marketing sont très exigeants sur le vocabulaire. CVAdapt aligne parfaitement mon CV à chaque offre.", result: "Poste brand manager" },
    ],
  },
  faq: [
    { q: "Quels outils marketing CVAdapt reconnaît-il ?", a: "Meta Ads, Google Ads, HubSpot, Salesforce, Mailchimp, SEMrush, GA4, Canva, Adobe Suite, Hootsuite... CVAdapt reconnaît les principaux outils du secteur et les intègre si l'offre les mentionne." },
    { q: "CVAdapt aide à mettre en avant ses résultats chiffrés ?", a: "Oui. Si tu mentionnes tes KPIs (taux d'engagement, ROI, croissance du CA...), CVAdapt les reformule de façon impactante avec le vocabulaire attendu par les recruteurs marketing." },
    { q: "Ça marche pour le marketing digital ET la communication traditionnelle ?", a: "Oui pour les deux. CVAdapt adapte le ton et les mots-clés selon l'offre spécifique — digital, print, RP, événementiel, brand content..." },
    { q: "Est-ce que la lettre de motivation marketing est incluse ?", a: "Oui. CVAdapt génère une lettre personnalisée à l'entreprise et à l'offre, dans le bon registre (startup, grand groupe, agence...)." },
    { q: "C'est gratuit ?", a: "3 CV complets sont gratuits sans carte bancaire. Plan Étudiant à 4,99€/mois pour 15 CV/mois avec lettre de motivation." },
  ],
  cta: { primary: "Créer mon CV marketing", finalTitle: "Ton prochain poste marketing commence ici", finalSub: "CV adapté, mots-clés exacts, lettre incluse. Gratuit pour commencer." },
};

export default function CvMarketingPage() {
  return <SectorLanding config={config} />;
}
