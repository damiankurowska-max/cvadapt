"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import { GlowCard } from "../components/ui/spotlight-card";
import { TestimonialsColumn } from "../components/ui/testimonials-columns";

const allTestimonials = [
  { name: "Thomas R.", role: "Commercial B2B → Chef de projet · Paris", image: "https://randomuser.me/api/portraits/men/32.jpg", result: "Entretien décroché en 4 jours", text: "J'étais en reconversion et CVAdapt a parfaitement reformulé mon profil. Entretien 4 jours après." },
  { name: "Sophie M.", role: "Chargée de communication · Lyon", image: "https://randomuser.me/api/portraits/women/44.jpg", result: "3 entretiens en 1 semaine", text: "Avant je galérais à adapter mon CV, maintenant ça prend 30 secondes. Résultat immédiat." },
  { name: "Karim B.", role: "Développeur web · Bordeaux", image: "https://randomuser.me/api/portraits/men/52.jpg", result: "Rappelé par 2 entreprises", text: "Le CV avait exactement les mots-clés de l'offre. 2 rappels la semaine suivante." },
  { name: "Laura D.", role: "Assistante RH · Lille", image: "https://randomuser.me/api/portraits/women/68.jpg", result: "Recommande à ses candidats", text: "En tant que RH je sais ce que les recruteurs cherchent. CVAdapt coche toutes les cases." },
  { name: "Anaïs G.", role: "Responsable marketing · Paris", image: "https://randomuser.me/api/portraits/women/26.jpg", result: "Taux de réponse x3", text: "Mon taux de réponse a triplé depuis que j'utilise CVAdapt pour chaque candidature." },
  { name: "Marc L.", role: "Technicien · Nantes", image: "https://randomuser.me/api/portraits/men/77.jpg", result: "Premier emploi trouvé", text: "Simple à utiliser même sans être à l'aise avec l'informatique. Mon CV est maintenant pro." },
  { name: "Emma T.", role: "Étudiante master · Toulouse", image: "https://randomuser.me/api/portraits/women/90.jpg", result: "Stage déniché en 2 semaines", text: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement." },
  { name: "Julien F.", role: "Comptable · Marseille", image: "https://randomuser.me/api/portraits/men/61.jpg", result: "CDI signé en 3 semaines", text: "J'envoyais des dizaines de CV sans réponse. Avec CVAdapt les recruteurs ont commencé à me rappeler." },
  { name: "Céline V.", role: "Infirmière → Admin RH · Rennes", image: "https://randomuser.me/api/portraits/women/55.jpg", result: "Reconversion réussie", text: "CVAdapt a parfaitement reformulé mon parcours pour le nouveau secteur que je visais." },
  { name: "Antoine P.", role: "Data Analyst · Paris", image: "https://randomuser.me/api/portraits/men/23.jpg", result: "Score ATS 34→89", text: "Mon score est passé de 34 à 89 en un clic. Les mots-clés manquants ont été ajoutés automatiquement." },
  { name: "Marie-Claire B.", role: "Directrice commerciale · Strasbourg", image: "https://randomuser.me/api/portraits/women/33.jpg", result: "4 entretiens en 2 semaines", text: "Même en cadre confirmé le score ATS fait une vraie différence. 4 entretiens en 2 semaines." },
  { name: "Youssef K.", role: "Ingénieur DevOps · Lyon", image: "https://randomuser.me/api/portraits/men/41.jpg", result: "Offre reçue +20% salaire", text: "CVAdapt a détecté que je n'utilisais pas les bons termes tech. Optimisé en 30s, offre reçue." },
  { name: "Lucie H.", role: "UX Designer · Nantes", image: "https://randomuser.me/api/portraits/women/62.jpg", result: "Portfolio mieux valorisé", text: "CVAdapt m'a aidé à reformuler mes projets portfolio en langage recruteur. Beaucoup plus d'appels." },
  { name: "Romain S.", role: "Alternant finance · Paris", image: "https://randomuser.me/api/portraits/men/88.jpg", result: "Alternance décrochée J+5", text: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, rappelé en 5 jours." },
  { name: "Nathalie D.", role: "Prof → Formatrice RH · Bordeaux", image: "https://randomuser.me/api/portraits/women/71.jpg", result: "Reconversion réussie en 1 mois", text: "Passer de l'éducation aux RH semblait compliqué. CVAdapt a traduit mon profil parfaitement." },
  { name: "Alexis M.", role: "Backend Dev · Toulouse", image: "https://randomuser.me/api/portraits/men/15.jpg", result: "FAANG interview obtenu", text: "Les offres tech sont précises sur les technos. CVAdapt a détecté ce qui manquait dans mon profil." },
  { name: "Fatima Z.", role: "Chargée de projet · Casablanca → Paris", image: "https://randomuser.me/api/portraits/women/48.jpg", result: "Premier CDI en France", text: "Arrivée en France, je ne savais pas adapter mon CV au marché français. CVAdapt m'a sauvé la mise." },
  { name: "Pierre-Yves L.", role: "Manager retail · Montpellier", image: "https://randomuser.me/api/portraits/men/67.jpg", result: "+60% de rappels", text: "En 5 ans de carrière c'est le meilleur outil que j'ai utilisé pour ma recherche d'emploi." },
  { name: "Clara N.", role: "Juriste → Legal Ops · Paris", image: "https://randomuser.me/api/portraits/women/19.jpg", result: "Entretien cabinet top 10", text: "CVAdapt a reformulé mes compétences juridiques en termes business. Entretien dans un top 10 cabinet." },
  { name: "Mehdi T.", role: "Chef de chantier → Conducteur de travaux", image: "https://randomuser.me/api/portraits/men/56.jpg", result: "Promotion décrochée", text: "Même pour une promotion interne CVAdapt m'a aidé à mieux valoriser mes réalisations concrètes." },
  { name: "Isabelle R.", role: "Assistante de direction · Nice", image: "https://randomuser.me/api/portraits/women/82.jpg", result: "Job trouvé après 50 ans", text: "À 52 ans je pensais que c'était trop tard. CVAdapt a mis en avant mon expérience au lieu de la cacher." },
  { name: "Théo V.", role: "Étudiant en alternance · Paris", image: "https://randomuser.me/api/portraits/men/29.jpg", result: "3 offres d'alternance", text: "Mon profil était générique. CVAdapt l'a transformé en 30 secondes. 3 propositions d'alternance." },
  { name: "Amira S.", role: "Pharmacienne → MedTech · Paris", image: "https://randomuser.me/api/portraits/women/37.jpg", result: "Pivot réussi vers la tech", text: "Mon profil scientifique semblait incompatible avec la tech. CVAdapt a fait le lien parfaitement." },
  { name: "Guillaume P.", role: "Product Manager · Lyon", image: "https://randomuser.me/api/portraits/men/73.jpg", result: "Score 41→94 en 1 clic", text: "J'ai vu mon score ATS passer de 41 à 94. Les mots-clés produit n'étaient juste pas au bon endroit." },
  { name: "Pauline M.", role: "Community Manager · Bordeaux", image: "https://randomuser.me/api/portraits/women/58.jpg", result: "Agence parisienne contactée", text: "Une agence parisienne m'a contactée après avoir revu mon CV avec CVAdapt. Je n'y croyais plus." },
  { name: "Nicolas B.", role: "Commercial sédentaire · Lille", image: "https://randomuser.me/api/portraits/men/44.jpg", result: "CDD converti en CDI", text: "Mon CDD se terminait dans 2 mois. CVAdapt m'a permis de trouver mieux avant la fin." },
  { name: "Léa F.", role: "Graphiste → Art Director · Paris", image: "https://randomuser.me/api/portraits/women/92.jpg", result: "Salaire +35%", text: "En ciblant mieux les offres avec un CV adapté j'ai décroché un poste avec 35% de salaire en plus." },
  { name: "Samuel O.", role: "Développeur mobile · Montpellier", image: "https://randomuser.me/api/portraits/men/81.jpg", result: "Remote job à l'étranger", text: "CVAdapt m'a aidé à adapter mon CV pour des offres internationales en remote. Objectif atteint." },
  { name: "Virginie C.", role: "Coordinatrice logistique · Rouen", image: "https://randomuser.me/api/portraits/women/75.jpg", result: "Rappelée par Amazon", text: "Je postulais chez Amazon depuis des mois sans réponse. CVAdapt a identifié exactement ce qui manquait." },
  { name: "Bastien L.", role: "Ingénieur mécanique → Consultant", image: "https://randomuser.me/api/portraits/men/35.jpg", result: "Cabinet de conseil signé", text: "Passer de l'industrie au conseil demandait un repositionnement total. CVAdapt l'a fait en 1 minute." },
];

const col1 = allTestimonials.slice(0, 10);
const col2 = allTestimonials.slice(10, 20);
const col3 = allTestimonials.slice(20, 30);

const faqItems = [
  {
    q: "CVAdapt fonctionne-t-il pour les stages et alternances ?",
    a: "Oui, c'est même pour ça qu'il est conçu. CVAdapt analyse l'offre de stage ou d'alternance, détecte les mots-clés attendus et adapte ton CV en conséquence. Même sans expérience pro, il met en avant tes projets, ta formation et tes compétences.",
  },
  {
    q: "Je n'ai pas d'expérience professionnelle — ça va quand même fonctionner ?",
    a: "Absolument. CVAdapt est optimisé pour les profils étudiants. Il valorise tes projets universitaires, stages, associations, compétences techniques et soft skills dans le format que les recruteurs attendent.",
  },
  {
    q: "Mon CV est-il en sécurité ?",
    a: "Oui. Tes données ne sont jamais partagées, vendues ou stockées de façon permanente. CVAdapt utilise ton contenu uniquement pour générer le CV, puis les données sont supprimées. Paiement sécurisé via Stripe.",
  },
  {
    q: "C'est vraiment gratuit ? Quelle est la limite ?",
    a: "Tu peux générer 3 CV complets gratuitement, sans carte bancaire. Pour 15 CV par mois avec score ATS complet et lettre de motivation, le plan Étudiant est à 4,99€/mois.",
  },
  {
    q: "En combien de temps j'obtiens mon CV optimisé ?",
    a: "Moins de 30 secondes. Tu colles l'offre, tu renseignes ton profil, et tu reçois immédiatement le score ATS, les mots-clés manquants et ton CV prêt à envoyer.",
  },
  {
    q: "Quelle est la différence entre le plan Étudiant et Pro ?",
    a: "Le plan Étudiant (4,99€/mois) couvre 15 CV par mois avec toutes les fonctionnalités essentielles. Le plan Pro (9,99€/mois) offre des CV illimités, des templates premium exclusifs et un support prioritaire — idéal si tu postules activement.",
  },
  {
    q: "CVAdapt fonctionne pour tous les secteurs ?",
    a: "Oui. Tech, marketing, finance, RH, commerce, santé... CVAdapt analyse l'offre spécifique que tu colles et adapte ton CV au vocabulaire exact de ce secteur.",
  },
  {
    q: "Y a-t-il une remise étudiant ?",
    a: "Le plan Étudiant est déjà au tarif étudiant (4,99€/mois). Une remise supplémentaire de 50% est disponible sur justificatif scolaire — contacte-nous à contact@cvadapt.eu.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [openFaq, setOpenFaq] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. HEADER ── */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-blue-600 tracking-tight">CVAdapt</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/blog" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</a>
          <Link href="/analyse" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Analyser mon CV</Link>
          <a href="/tarifs" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Tarifs</a>
          <a
            href="/generate"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Commencer gratuitement
          </a>
        </nav>
      </header>

      {/* ── 2. HERO ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Colonne gauche */}
          <div
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              🎓 Spécialement conçu pour les étudiants
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Ton stage. Ton alternance.<br />
              <span className="text-blue-600">Ton premier emploi.</span><br />
              Commence ici.
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
              75% des CV étudiants sont rejetés avant d&apos;être lus. CVAdapt analyse ton CV, détecte ce qui manque et génère une version qui passe les filtres ATS en 30 secondes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <a
                href="/analyse"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm text-center"
              >
                Analyser mon CV gratuitement →
              </a>
              <a
                href="#comment-ca-marche"
                className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Voir comment ça marche
              </a>
            </div>
            <p className="text-sm text-gray-500">⭐ 4,9/5 · 12 847 étudiants et diplômés · Gratuit pour commencer</p>
          </div>

          {/* Colonne droite — mockup score ATS */}
          <div
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}>
              {/* Browser bar */}
              <div style={{
                background: "#f3f4f6",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid #e5e7eb",
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
                <div style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  color: "#9ca3af",
                  marginLeft: "8px",
                  border: "1px solid #e5e7eb",
                }}>
                  cvadapt.eu — Score ATS
                </div>
              </div>

              {/* Widget body */}
              <div style={{ padding: "24px" }}>
                {/* Score circle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <div style={{ position: "relative", width: 100, height: 100 }}>
                    <svg viewBox="0 0 100 100" width="100" height="100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="#f97316" strokeWidth="10"
                        strokeDasharray={`${(78 / 100) * 264} 264`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "22px", fontWeight: 800, color: "#f97316" }}>78</span>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>/100</span>
                    </div>
                  </div>
                </div>

                {/* Métriques */}
                {[
                  { label: "Mots-clés", pct: 45, color: "#ef4444" },
                  { label: "Structure", pct: 82, color: "#3b82f6" },
                  { label: "Lisibilité", pct: 91, color: "#22c55e" },
                ].map(({ label, pct, color }) => (
                  <div key={label} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                      <span style={{ color: "#374151", fontWeight: 600 }}>{label}</span>
                      <span style={{ color, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: "99px", height: "6px" }}>
                      <div style={{ width: `${pct}%`, height: "6px", borderRadius: "99px", background: color }}></div>
                    </div>
                  </div>
                ))}

                {/* Badges mots-clés manquants */}
                <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", marginBottom: "8px" }}>Mots-clés manquants :</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Docker", "AWS", "Agile"].map((kw) => (
                      <span key={kw} style={{
                        background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca",
                        fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "99px",
                      }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{
                  background: "#2563eb", color: "#fff",
                  fontWeight: 700, fontSize: "13px",
                  borderRadius: "8px", padding: "11px",
                  textAlign: "center", cursor: "pointer",
                }}>
                  Optimiser mon CV →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LOGOS DE CONFIANCE ── */}
      <section className="py-10 px-4 sm:px-6 bg-gray-50 border-y border-gray-100">
        <div
          className="max-w-5xl mx-auto"
        >
          <p className="text-center text-sm font-medium text-gray-400 mb-8">Ils ont décroché des stages et alternances chez</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {["Capgemini", "Société Générale", "L'Oréal", "BNP Paribas", "Decathlon", "Renault", "Thales", "Orange"].map((brand) => (
              <span key={brand} style={{ fontSize: "15px", fontWeight: 700, fontStyle: "italic", color: "#4b5563", letterSpacing: "-0.02em" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROBLÈME ── */}
      <section style={{ background: "#111827" }} className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <span className="inline-block bg-red-900/40 text-red-400 border border-red-800 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Le problème
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Tu postes. Tu attends. Silence.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Ce n&apos;est pas ton profil le problème. C&apos;est que ton CV ne passe même pas le premier filtre automatique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { emoji: "😤", title: "Même CV pour toutes les offres", desc: "Tu envoies le même CV à 30 offres. L'ATS de chaque entreprise le filtre immédiatement faute de mots-clés adaptés." },
              { emoji: "🤖", title: "Rejeté par un algorithme", desc: "Les grandes entreprises utilisent des logiciels qui trient automatiquement 75% des CV. Le tien ne passe peut-être jamais devant un humain." },
              { emoji: "📭", title: "0 réponse malgré un bon profil", desc: "Tu as les qualifications. Mais sans les bons mots-clés au bon endroit, ton CV est invisible pour les recruteurs." },
            ].map((item, index) => (
              <div
                key={item.title}
                style={{ background: "#1f2937", border: "1px solid #374151" }}
                className="p-7 rounded-2xl"
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background: "#0d1117" }} className="rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {[
              { num: "75%", label: "CV rejetés par les ATS" },
              { num: "6 sec", label: "temps moyen de lecture d'un CV humain" },
              { num: "3h", label: "perdues à adapter un CV manuellement" },
            ].map((s, index) => (
              <div
                key={s.num}
                className="text-center py-10 px-6"
              >
                <p className="text-4xl font-extrabold text-white mb-2">{s.num}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SOLUTION ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              La solution
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              En 30 secondes, ton CV passe les filtres. Et les recruteurs le lisent.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Colle l&apos;offre de stage ou d&apos;alternance. CVAdapt analyse les mots-clés manquants, optimise chaque section et génère un CV adapté instantanément.
            </p>
          </div>

          <div
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Sans CVAdapt */}
              <div className="bg-red-50 p-8 border-b md:border-b-0 md:border-r border-red-100">
                <h3 className="font-bold text-red-700 text-lg mb-5">❌ Sans CVAdapt</h3>
                <ul className="space-y-3">
                  {[
                    "CV générique",
                    "Mots-clés manquants",
                    "Filtré par ATS",
                    "2-3h de travail",
                    "5-10% de réponses",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="text-red-500 font-bold">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avec CVAdapt */}
              <div className="bg-green-50 p-8">
                <h3 className="font-bold text-green-700 text-lg mb-5">✅ Avec CVAdapt</h3>
                <ul className="space-y-3">
                  {[
                    "CV adapté à l'offre",
                    "Mots-clés intégrés auto",
                    "Score ATS optimisé",
                    "30 secondes",
                    "+68% de réponses",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <span className="text-green-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMMENT ÇA MARCHE ── */}
      <section
        id="comment-ca-marche"
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">3 étapes. 30 secondes. Plus d'entretiens.</h2>
            <p className="text-white/50">Simple, rapide, efficace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlowCard glowColor="blue" customSize className="w-full h-auto aspect-auto p-6 flex flex-col gap-4">
              <div className="text-5xl font-black text-white/10 leading-none select-none">1</div>
              <div className="text-4xl">📋</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Colle l'offre</h3>
                <p className="text-white/60 text-sm leading-relaxed">Copie-colle n'importe quelle offre depuis LinkedIn, Indeed, etc.</p>
              </div>
              <div className="mt-auto bg-white/10 rounded-xl p-4 space-y-2">
                <div className="h-2 bg-white/20 rounded-full w-[90%]"></div>
                <div className="h-2 bg-white/20 rounded-full w-[75%]"></div>
                <div className="h-2 bg-white/20 rounded-full w-[60%]"></div>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="w-full h-auto aspect-auto p-6 flex flex-col gap-4">
              <div className="text-5xl font-black text-white/10 leading-none select-none">2</div>
              <div className="text-4xl">✍️</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Entre tes infos</h3>
                <p className="text-white/60 text-sm leading-relaxed">Ton expérience, tes compétences, ta formation.</p>
              </div>
              <div className="mt-auto bg-white/10 rounded-xl p-4 space-y-2">
                {["Nom complet", "Titre du poste", "Expérience"].map((l) => (
                  <div key={l}>
                    <div className="text-white/40 text-[10px] font-semibold mb-1">{l}</div>
                    <div className="h-6 bg-white/20 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" customSize className="w-full h-auto aspect-auto p-6 flex flex-col gap-4">
              <div className="text-5xl font-black text-white/10 leading-none select-none">3</div>
              <div className="text-4xl">🚀</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Reçois ton CV + Score ATS</h3>
                <p className="text-white/60 text-sm leading-relaxed">Un CV PDF adapté à l'offre, prêt à envoyer en 30 secondes.</p>
              </div>
              <div className="mt-auto bg-white/10 rounded-xl overflow-hidden">
                <div className="bg-blue-600/60 px-4 py-3">
                  <div className="h-2.5 bg-white/60 rounded-full w-[55%] mb-2"></div>
                  <div className="h-2 bg-white/30 rounded-full w-[70%]"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-white/20 rounded-full w-[90%]"></div>
                  <div className="h-2 bg-white/20 rounded-full w-[75%]"></div>
                  <div className="h-2 bg-white/20 rounded-full w-[55%]"></div>
                </div>
              </div>
            </GlowCard>
          </div>

          <div className="text-center mt-12">
            <a
              href="/generate"
              className="inline-block bg-white text-blue-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Essayer maintenant — c'est gratuit
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. AVANT / APRÈS SCORE ATS ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Résultat concret
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Avant / Après CVAdapt</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AVANT */}
            <div className="rounded-2xl border-2 border-red-300 overflow-hidden">
              <div style={{ background: "#7f1d1d" }} className="px-6 py-4 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <p className="font-bold text-white">CV générique</p>
              </div>
              <div className="p-6">
                {/* Score circle */}
                <div className="flex justify-center mb-5">
                  <div style={{ position: "relative", width: 90, height: 90 }}>
                    <svg viewBox="0 0 100 100" width="90" height="90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#fee2e2" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="#ef4444" strokeWidth="10"
                        strokeDasharray={`${(34 / 100) * 264} 264`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#ef4444" }}>34</span>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>/100</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["Pas de mots-clés", "Structure basique", "Lisibilité faible"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-red-500 font-bold">✗</span> {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Docker manquant", "AWS manquant", "Agile manquant"].map((kw) => (
                    <span key={kw} style={{
                      background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca",
                      fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "99px",
                    }}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* APRÈS */}
            <div className="rounded-2xl border-2 border-green-300 overflow-hidden">
              <div style={{ background: "#14532d" }} className="px-6 py-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <p className="font-bold text-white">CV optimisé par CVAdapt</p>
              </div>
              <div className="p-6">
                {/* Score circle */}
                <div className="flex justify-center mb-5">
                  <div style={{ position: "relative", width: 90, height: 90 }}>
                    <svg viewBox="0 0 100 100" width="90" height="90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#dcfce7" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="#22c55e" strokeWidth="10"
                        strokeDasharray={`${(91 / 100) * 264} 264`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e" }}>91</span>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>/100</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {["Mots-clés intégrés", "Structure optimisée", "Lisibilité excellente"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <span className="text-green-600 font-bold">✓</span> {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Docker ✓", "AWS ✓", "Agile ✓"].map((kw) => (
                    <span key={kw} style={{
                      background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0",
                      fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "99px",
                    }}>{kw}</span>
                  ))}
                </div>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px" }} className="px-4 py-2">
                  <p className="text-green-700 text-sm font-semibold">🎯 Entretien décroché 3 jours après</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FONCTIONNALITÉS ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Tout ce dont tu as besoin pour décrocher le poste</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🔍", title: "Détection des mots-clés", desc: "Analyse chaque mot-clé de l'offre et identifie les manquants dans ton CV" },
              { emoji: "⚡", title: "Optimisation automatique", desc: "Réécriture intelligente de tes expériences pour matcher l'offre" },
              { emoji: "🎯", title: "Score ATS en temps réel", desc: "Un score /100 clair qui mesure ta compatibilité avec l'offre" },
              { emoji: "💡", title: "Suggestions concrètes", desc: "Actions précises et applicables pour améliorer ton score immédiatement" },
              { emoji: "🔄", title: "Adapté à chaque offre", desc: "Un CV unique pour chaque candidature, en 30 secondes" },
              { emoji: "✉️", title: "Lettre de motivation", desc: "Générée automatiquement, adaptée à l'offre, prête à envoyer" },
            ].map((f, index) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. POUR QUI ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Que tu cherches un stage, une alternance ou ton premier CDI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🎓",
                title: "Stage de fin d'études",
                desc: "Pas d'expérience pro ? CVAdapt met en avant tes projets, ta formation et tes compétences dans le bon format pour chaque offre.",
              },
              {
                emoji: "🔄",
                title: "Alternance / Apprentissage",
                desc: "Les offres d'alternance sont très compétitives. CVAdapt te donne l'avantage en adaptant ton CV aux mots-clés exacts de chaque entreprise.",
              },
              {
                emoji: "🚀",
                title: "Premier emploi (0-2 ans)",
                desc: "La transition études→emploi est critique. CVAdapt reformule ton parcours étudiant en langage professionnel que les recruteurs comprennent.",
              },
              {
                emoji: "📈",
                title: "Reconversion / Reprise d'études",
                desc: "Tu reviens sur le marché après une pause ou un changement de cap ? CVAdapt valorise ta trajectoire comme un atout.",
              },
            ].map((p, index) => (
              <div
                key={p.title}
                className="rounded-2xl border border-gray-200 p-7 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <a href="/generate" className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                  Voir un exemple →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. TÉMOIGNAGES ANIMÉS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <div className="text-left border-l border-yellow-200 pl-4">
                <p className="font-bold text-gray-900 text-sm">4,9 / 5 — Basé sur 127+ avis vérifiés ✓</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">12 847 étudiants ont décroché leurs entretiens</h2>
            <p className="text-gray-500">Stages, alternances, premiers CDI — des résultats concrets</p>
          </div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[680px] overflow-hidden">
            <TestimonialsColumn testimonials={col1} duration={25} />
            <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={30} />
            <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={22} />
          </div>
        </div>
      </section>

      {/* ── 11. STATS COMPTEURS ── */}
      <section style={{ background: "#0f172a" }} className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "12 847", label: "CV optimisés" },
              { num: "4,9★", label: "Note moyenne" },
              { num: "+68%", label: "Taux de réponse moyen" },
              { num: "30s", label: "Pour générer un CV optimisé" },
            ].map((s, index) => (
              <div
                key={s.num}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-white mb-2">{s.num}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Questions fréquentes</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {faqItems.map((item, i) => (
              <div
                key={i}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 md:px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{item.q}</span>
                  <span className="text-gray-400 text-xl font-light flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-6 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. PRICING ── */}
      <section className="py-24 px-4 sm:px-6" style={{ background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div
          >
            <div className="text-center mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tarifs</span>
            </div>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Des tarifs pensés pour les étudiants</h2>
              <p className="text-gray-500">Sans engagement · Annule quand tu veux · 🎓 Prix étudiant dès 4,99€</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Gratuit */}
            <div
              className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Gratuit</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">0€</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">pour toujours</p>
              <ul className="space-y-3 mb-10 flex-1">
                {[
                  { t: "3 CV au total", ok: true },
                  { t: "4 templates visuels", ok: true },
                  { t: "Téléchargement PDF", ok: true },
                  { t: "CV illimités", ok: false },
                  { t: "Lettre de motivation", ok: false },
                ].map((f) => (
                  <li key={f.t} className={`flex items-center gap-3 text-sm ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${f.ok ? "bg-gray-100 text-gray-500" : "bg-gray-50 text-gray-200"}`}>
                      {f.ok ? "✓" : "✗"}
                    </span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <a href="/generate" className="block text-center bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">
                Commencer gratuitement
              </a>
            </div>

            {/* Essentiel */}
            <div
              className="rounded-2xl flex flex-col relative overflow-hidden shadow-2xl md:-mt-4 md:-mb-4"
              style={{ background: "linear-gradient(145deg, #1e3a5f 0%, #2563eb 100%)" }}
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">⭐ POPULAIRE</div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-4xl mb-4">⚡</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Étudiant</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">4,99€</span>
                </div>
                <p className="text-blue-200 text-sm mb-8">par mois</p>
                <ul className="space-y-3 mb-10 flex-1">
                  {["15 CV par mois", "Score ATS complet + recommandations", "4 templates professionnels", "Lettre de motivation incluse", "Mots-clés détectés automatiquement", "Support prioritaire"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white">
                      <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs flex-shrink-0 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/tarifs" className="block text-center bg-white text-blue-700 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Choisir Étudiant →
                </a>
              </div>
            </div>

            {/* Pro */}
            <div
              className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Pro</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-gray-900">9,99€</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">par mois</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["CV illimités", "4 templates visuels", "Lettre de motivation incluse", "Téléchargement PDF", "CV optimisés par IA", "Conseils Pro", "Support prioritaire"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs flex-shrink-0 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/tarifs" className="block text-center border-2 border-gray-900 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm">
                Choisir Pro →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. CTA FINAL ── */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #7c3aed 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4">Ton prochain entretien commence maintenant.</h2>
          <p className="text-blue-100 text-lg mb-10">Analyse ton CV gratuitement. Vois exactement ce qui manque. Corrige-le en 30 secondes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="/analyse"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-center"
            >
              🎯 Analyser mon CV gratuitement →
            </a>
            <a
              href="/tarifs"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-center"
            >
              Voir les tarifs
            </a>
          </div>
          <p className="text-blue-200 text-sm">✓ 3 CV gratuits · ✓ Aucune carte requise · ✓ Résultat en 30 secondes</p>
        </div>
      </section>

      {/* ── 16. NEWSLETTER ── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #7c3aed 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="text-5xl mb-6">📬</div>
          <h2 className="text-3xl font-bold text-white mb-3">Reçois des conseils emploi gratuits</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Chaque semaine : astuces CV, erreurs à éviter, conseils entretien — directement dans ta boîte mail.
          </p>
          {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4">
              <p className="text-green-400 font-semibold">✓ Merci ! On te contacte bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="ton@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 rounded-xl text-gray-900 bg-white border-0 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-yellow-400 text-yellow-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg"
              >
                {status === "loading" ? "..." : "Je m'inscris →"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-300 text-sm mt-3">Une erreur est survenue, réessaie.</p>
          )}
          <p className="text-blue-200 text-sm mt-6">🔒 Zéro spam · Désinscription en 1 clic</p>
        </div>
      </section>

      {/* ── 15. FOOTER ── */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-blue-600 font-bold">CVAdapt</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/blog" className="hover:text-gray-900 transition-colors">Blog</a>
            <a href="/tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <a href="/generate" className="hover:text-gray-900 transition-colors">Générer un CV</a>
            <a href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</a>
            <a href="/cgu" className="hover:text-gray-900 transition-colors">CGU</a>
          </div>
          <p className="text-sm text-gray-400">© 2025 CVAdapt — Fait en France 🇫🇷</p>
        </div>
      </footer>
    </main>
  );
}
