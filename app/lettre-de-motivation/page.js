import SectorLanding from "../components/SectorLanding";

const config = {
  hero: {
    badge: "Lettre de motivation IA · 2025",
    title: "Ta lettre de motivation personnalisée en 30 secondes",
    subtitle: "Fini les lettres génériques copiées-collées. CVAdapt génère une lettre de motivation adaptée à l'offre exacte, à l'entreprise et à ton profil — en 30 secondes.",
    stats: [
      { value: "30 sec", label: "pour générer ta lettre" },
      { value: "100%", label: "personnalisée à l'offre" },
      { value: "Gratuit", label: "pour commencer" },
    ],
  },
  steps: [
    { title: "Colle l'offre d'emploi", desc: "L'IA analyse le ton de l'entreprise, le vocabulaire attendu et les critères du poste." },
    { title: "Entre ton profil en 2 min", desc: "Tes expériences clés, ta motivation et ce que tu apportes à ce poste spécifique." },
    { title: "Reçois ta lettre prête à envoyer", desc: "Structurée, personnalisée, avec les bons mots-clés. Modifiable avant envoi." },
  ],
  examples: {
    title: "Des lettres qui ont convaincu des recruteurs",
    subtitle: "Personnalisées, pas génériques.",
    items: [
      { emoji: "💼", name: "Sophie M.", role: "Chargée de communication · Lyon", text: "J'envoyais toujours la même lettre légèrement modifiée. CVAdapt a généré une vraie lettre personnalisée à chaque entreprise. 3 entretiens la semaine suivante.", result: "3 entretiens en 1 semaine" },
      { emoji: "🏦", name: "Julien F.", role: "Comptable · Marseille", text: "Ma lettre générique ne fonctionnait plus. CVAdapt a réécrit la lettre en intégrant les valeurs de l'entreprise. Rappelé 3 jours après.", result: "CDI signé" },
      { emoji: "🎓", name: "Emma T.", role: "Étudiante master · Toulouse", text: "CVAdapt a généré une lettre qui parlait exactement des projets de l'entreprise que j'avais ciblée. Le recruteur m'a dit que c'était rare.", result: "Stage décroché" },
      { emoji: "🔄", name: "Nathalie D.", role: "Reconversion · Bordeaux", text: "En reconversion, reformuler mon expérience pour un autre secteur était difficile. CVAdapt l'a fait automatiquement dans la lettre.", result: "Reconversion réussie" },
    ],
  },
  faq: [
    { q: "Est-ce que la lettre est vraiment personnalisée ou générique ?", a: "Vraiment personnalisée. CVAdapt analyse l'offre spécifique, le secteur de l'entreprise et ton profil pour générer une lettre unique — pas un template avec des trous à remplir." },
    { q: "Puis-je modifier la lettre après génération ?", a: "Oui. La lettre générée est entièrement modifiable. CVAdapt te donne une base solide que tu peux affiner selon ta personnalité." },
    { q: "La lettre fonctionne pour tous les secteurs ?", a: "Oui — tech, marketing, finance, RH, santé, ingénierie... CVAdapt adapte le ton et le vocabulaire au secteur ciblé." },
    { q: "CVAdapt génère le CV en même temps que la lettre ?", a: "Oui. En une seule génération, tu obtiens le CV adapté à l'offre ET la lettre de motivation personnalisée. Les deux sont cohérents." },
    { q: "C'est gratuit ?", a: "3 générations (CV + lettre) sont gratuites sans carte bancaire. Plan Étudiant à 4,99€/mois pour 15 générations par mois." },
  ],
  cta: {
    primary: "Générer ma lettre de motivation",
    finalTitle: "Ta lettre de motivation prête en 30 secondes",
    finalSub: "Personnalisée à l'offre, au secteur, à l'entreprise. Gratuit pour commencer.",
  },
};

export default function LettreMotivationPage() {
  return <SectorLanding config={config} />;
}
