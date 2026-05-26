import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV Alternance Gratuit — Optimisé ATS en 30 secondes | CVAdapt",
  description: "Génère un CV parfait pour décrocher ton alternance. CVAdapt adapte ton CV aux mots-clés de chaque offre en 30 secondes. Gratuit, sans CB.",
  keywords: "cv alternance gratuit, modèle cv alternance, cv pour alternance, cv alternance étudiant",
  alternates: { canonical: "https://cvadapt.eu/cv-alternance" },
};

const ERREURS = [
  { titre: "CV générique envoyé partout", solution: "CVAdapt adapte chaque CV à l'offre exacte" },
  { titre: "Mots-clés manquants", solution: "Les ATS cherchent des termes précis — CVAdapt les intègre automatiquement" },
  { titre: "Mise en page illisible par les ATS", solution: "Nos templates sont 100% compatibles avec les logiciels de tri" },
  { titre: "Profil mal valorisé sans expérience", solution: "CVAdapt met en avant projets, formations et soft skills" },
];

const TEMOIGNAGES = [
  { nom: "Théo V.", ecole: "Master Gestion · Paris", resultat: "3 alternances proposées en 2 semaines", texte: "Mon profil était générique. CVAdapt l'a transformé en 30 secondes." },
  { nom: "Emma T.", ecole: "Master Marketing · Toulouse", resultat: "Alternance signée chez L'Oréal", texte: "Sans expérience pro, CVAdapt a mis en avant mes projets universitaires parfaitement." },
  { nom: "Romain S.", ecole: "Licence Finance · Paris", resultat: "Rappelé en 5 jours", texte: "J'avais postulé sans réponse pendant 3 semaines. Après CVAdapt, tout a changé." },
];

export default function CvAlternance() {
  return (
    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit,'Outfit',system-ui,sans-serif)" }}>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur" style={{ borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold text-blue-700">CVAdapt</span>
          </Link>
          <Link href="/generate" className="text-white px-5 py-2 text-sm font-bold rounded-full"
            style={{ background: "#1d4ed8" }}>Créer mon CV →</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6"
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>🎓 Spécial alternance · Gratuit pour commencer</div>
        <h1 className="font-extrabold leading-tight mb-5"
          style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV Alternance optimisé<br />en <span style={{ color: "#3b82f6" }}>30 secondes</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          75% des CV pour l'alternance sont rejetés par les algorithmes avant d'être lus.
          CVAdapt intègre les mots-clés exacts de chaque offre pour que ton CV passe les filtres ATS.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Générer mon CV alternance — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 3 CV gratuits · ✓ Résultat en 30s</p>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: "#1e3a8a" }}>
            Pourquoi décrocher une alternance est si difficile en 2026
          </h2>
          <p className="text-center text-gray-500 mb-10">Les 4 erreurs qui font échouer 90% des candidatures</p>
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
            3 étapes pour un CV d'alternance parfait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { n:"1", e:"📋", t:"Colle l'offre", d:"Copie l'offre depuis LinkedIn, Indeed, APEC ou l'Étudiant." },
              { n:"2", e:"✍️", t:"Tes infos", d:"Formation, compétences, projets. Même sans expérience pro." },
              { n:"3", e:"🚀", t:"CV prêt", d:"CVAdapt génère un CV avec les mots-clés exacts. Score ATS inclus." },
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
            <Link href="/generate" className="inline-block text-white font-bold px-8 py-3.5 rounded-full"
              style={{ background: "#1d4ed8" }}>Créer mon CV alternance gratuitement →</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Ils ont décroché leur alternance avec CVAdapt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="rounded-2xl p-5 bg-gray-50 border border-gray-100">
                <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">✓ {t.resultat}</div>
                <p className="text-gray-600 text-sm mb-4 italic">&ldquo;{t.texte}&rdquo;</p>
                <p className="text-sm font-bold text-gray-900">{t.nom}</p>
                <p className="text-xs text-gray-400">{t.ecole}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 text-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ton CV d'alternance en 30 secondes.<br />Gratuit. Sans CB.</h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700"
          style={{ background: "#ffffff" }}>Générer mon CV alternance →</Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-stage" className="hover:text-gray-600">CV Stage</Link>
          <Link href="/score-ats-gratuit" className="hover:text-gray-600">Score ATS</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
