import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV Ingénieur Gratuit — Optimisé ATS en 30 secondes | CVAdapt",
  description: "Génère un CV ingénieur adapté à chaque offre. CVAdapt intègre les compétences techniques et mots-clés ATS exacts en 30 secondes. Gratuit, sans CB.",
  keywords: "cv ingénieur gratuit, modèle cv ingénieur, cv ingénieur débutant, cv ingénieur étude, cv ingénieur méthodes",
  alternates: { canonical: "https://cvadapt.eu/cv-ingenieur" },
};

const ERREURS = [
  { titre: "Compétences techniques mal listées", solution: "CVAdapt structure tes stacks par niveau de maîtrise selon ce que l'offre demande" },
  { titre: "Projets non valorisés", solution: "CVAdapt met en avant tes réalisations techniques avec des métriques concrètes" },
  { titre: "Logiciels et certifications absents", solution: "AutoCAD, SolidWorks, MATLAB, certifications — CVAdapt les intègre selon l'offre" },
  { titre: "Domaine d'ingénierie trop vague", solution: "CVAdapt cible le vocabulaire exact : génie civil, mécanique, électronique, industriel..." },
];

const TEMOIGNAGES = [
  { nom: "Alexandre P.", poste: "Ingénieur mécanique · Toulouse", resultat: "CDI Airbus en 2 semaines", texte: "Mon CV listait mes compétences mais sans les bons mots-clés. CVAdapt a tout aligné avec l'offre Airbus en 30 secondes." },
  { nom: "Camille D.", poste: "Ingénieure méthodes · Lyon", resultat: "3 entretiens la première semaine", texte: "Je ne savais pas comment valoriser mes projets de formation. CVAdapt les a transformés en atouts concrets." },
  { nom: "Thomas H.", poste: "Ingénieur R&D · Grenoble", resultat: "Recruté chez STMicroelectronics", texte: "Score ATS 91/100. Le recruteur m'a dit que mon CV était un des mieux structurés qu'il avait reçus." },
];

export default function CvIngenieur() {
  return (
    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit,'Outfit',system-ui,sans-serif)" }}>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur" style={{ borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold text-blue-700">CVAdapt</span>
          </Link>
          <Link href="/generate" className="text-white px-5 py-2 text-sm font-bold rounded-full" style={{ background: "#1d4ed8" }}>Créer mon CV →</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
          ⚙️ CV Ingénieur · Gratuit pour commencer
        </div>
        <h1 className="font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV Ingénieur optimisé<br />en <span style={{ color: "#3b82f6" }}>30 secondes</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          Les offres d'ingénieur reçoivent 200+ candidatures — les ATS filtrent 75% des CV avant tout recruteur humain.
          CVAdapt adapte tes compétences techniques aux mots-clés exacts de chaque offre.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Générer mon CV ingénieur — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 1 CV gratuit · ✓ Résultat en 30s</p>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: "#1e3a8a" }}>
            Pourquoi les candidatures ingénieur restent sans réponse
          </h2>
          <p className="text-center text-gray-500 mb-10">Les 4 erreurs qui bloquent 90% des CV d'ingénieur</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ERREURS.map((e, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ border: "2px solid #e0ecff", background: "#f8faff" }}>
                <p className="flex items-start gap-2 font-semibold text-gray-900 mb-2"><span className="text-red-500">✗</span>{e.titre}</p>
                <p className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-600 font-bold">✓</span>{e.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            3 étapes pour un CV ingénieur parfait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { n:"1", e:"📋", t:"Colle l'offre", d:"Copie l'offre depuis LinkedIn, APEC, Cadremploi ou le site de l'entreprise." },
              { n:"2", e:"⚙️", t:"Tes compétences", d:"Stack technique, logiciels, certifications, projets. CVAdapt structure tout." },
              { n:"3", e:"🚀", t:"CV prêt", d:"CVAdapt génère un CV avec les mots-clés techniques exacts de l'offre. Score ATS inclus." },
            ].map(s => (
              <div key={s.n} className="relative rounded-2xl p-6 bg-white" style={{ border: "2px solid #dbeafe" }}>
                <div className="absolute top-4 right-5 font-black text-6xl select-none" style={{ color: "#eff6ff" }}>{s.n}</div>
                <div className="text-3xl mb-4">{s.e}</div>
                <h3 className="font-bold mb-2" style={{ color: "#1e3a8a" }}>{s.t}</h3>
                <p className="text-sm text-gray-500">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/generate" className="inline-block text-white font-bold px-8 py-3.5 rounded-full" style={{ background: "#1d4ed8" }}>
              Créer mon CV ingénieur gratuitement →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Ils ont décroché leur poste ingénieur avec CVAdapt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="rounded-2xl p-5 bg-gray-50 border border-gray-100">
                <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">✓ {t.resultat}</div>
                <p className="text-gray-600 text-sm mb-4 italic">&ldquo;{t.texte}&rdquo;</p>
                <p className="text-sm font-bold text-gray-900">{t.nom}</p>
                <p className="text-xs text-gray-400">{t.poste}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 text-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ton CV ingénieur en 30 secondes.<br />Gratuit. Sans CB.</h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700" style={{ background: "#ffffff" }}>
          Générer mon CV ingénieur →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-developpeur" className="hover:text-gray-600">CV Développeur</Link>
          <Link href="/cv-chef-de-projet" className="hover:text-gray-600">CV Chef de projet</Link>
          <Link href="/score-ats-gratuit" className="hover:text-gray-600">Score ATS</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
