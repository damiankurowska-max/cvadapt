import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "CV Développeur · Dev Web · Fullstack",
    title: "Ton CV développeur adapté à chaque offre tech en 30 sec",
    subtitle: "Les offres dev sont ultra-précises sur les technos. CVAdapt analyse l'offre et intègre exactement le bon stack, les bons frameworks et les bons mots-clés ATS — React, Node, Python, AWS...",
    stats: [
      { value: "85%", label: "des offres dev utilisent des ATS" },
      { value: "30 sec", label: "pour adapter ton CV" },
      { value: "Score 94", label: "ATS moyen après CVAdapt" },
    ],
  },
  steps: [
    { title: "Colle l'offre dev", desc: "LinkedIn, Welcome to the Jungle, Indeed, Stack Overflow Jobs... CVAdapt détecte le stack et les technos attendus." },
    { title: "Entre ton profil technique", desc: "Tes langages, frameworks, projets GitHub, expériences et contributions open source." },
    { title: "Reçois ton CV tech optimisé", desc: "Les bonnes technos au bon endroit, formulées comme le recruteur les cherche." },
  ],
  examples: {
    title: "Des devs qui ont booké des entretiens avec CVAdapt",
    subtitle: "Frontend, backend, fullstack, DevOps.",
    items: [
      { emoji: "⚛️", name: "Karim B.", role: "Dev React · Bordeaux", text: "Le CV avait exactement les mots-clés de l'offre React/TypeScript. 2 rappels la semaine suivante par des startups tech.", result: "2 entretiens en 1 semaine" },
      { emoji: "🐍", name: "Antoine P.", role: "Data Engineer · Paris", text: "Mon score ATS est passé de 34 à 89 en un clic. Les termes Python, Spark, Airflow n'étaient juste pas au bon endroit.", result: "Score ATS 34→89" },
      { emoji: "☁️", name: "Youssef K.", role: "DevOps · Lyon", text: "CVAdapt a détecté que je n'utilisais pas les bons termes AWS/Terraform. Optimisé en 30 secondes, offre reçue avec +20% de salaire.", result: "Offre +20% salaire" },
      { emoji: "📱", name: "Samuel O.", role: "Dev mobile · Montpellier", text: "CVAdapt m'a aidé à adapter mon CV pour des offres React Native internationales en remote. Objectif atteint.", result: "Remote job obtenu" },
    ],
  },
  faq: [
    { q: "Pourquoi mon CV dev est rejeté malgré mes compétences ?", a: "Souvent parce que les mots-clés ne correspondent pas exactement à ceux de l'offre. Un recruteur cherche 'React' mais ton CV dit 'ReactJS' ou 'React.js'. CVAdapt harmonise automatiquement." },
    { q: "CVAdapt gère les stacks techniques complexes ?", a: "Oui. Frontend, backend, fullstack, DevOps, Data, Mobile, Cloud... CVAdapt reconnaît les technos et les place là où les ATS les cherchent." },
    { q: "Est-ce que CVAdapt peut mettre en avant mes projets GitHub ?", a: "Oui. Tu peux mentionner tes projets et CVAdapt les reformule en mettant en avant les technos, l'impact et les métriques que les recruteurs tech apprécient." },
    { q: "Ça fonctionne pour les offres en remote et à l'international ?", a: "Oui. CVAdapt adapte le CV pour des offres en français et peut s'adapter au registre tech international si l'offre est en anglais." },
    { q: "C'est gratuit ?", a: "3 CV complets sont gratuits sans carte bancaire. Plan Pro à 9,99€/mois pour des CV illimités et templates premium." },
  ],
  cta: {
    primary: "Optimiser mon CV dev",
    finalTitle: "Ton prochain entretien tech commence ici",
    finalSub: "CV adapté à l'offre, stack technique optimisé, score ATS maximal.",
  },
};

export default function CvDeveloppeurPage() {
  return <SectorLanding config={config} />;
}
