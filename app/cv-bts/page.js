import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV BTS Gratuit — Optimisé ATS en 30 secondes | Postulera",
  description: "Génère un CV BTS parfait pour ton stage ou premier emploi. Postulera adapte ton CV aux mots-clés ATS de chaque offre en 30 secondes. Gratuit, sans CB.",
  keywords: "cv bts gratuit, modèle cv bts, cv bts sans expérience, cv bts mco, cv bts commerce, cv bts informatique",
  alternates: { canonical: "https://postulera.com/cv-bts" },
};

const ERREURS = [
  { titre: "Absence d'expérience professionnelle", solution: "Postulera valorise stages, projets BTS, missions en entreprise et compétences acquises" },
  { titre: "Intitulé du BTS mal formulé", solution: "Postulera adapte la dénomination exacte selon ce que cherche l'entreprise ciblée" },
  { titre: "Compétences spécifiques au BTS absentes", solution: "Selon ton BTS (MCO, SIO, NRC...), Postulera intègre les mots-clés attendus par les ATS" },
  { titre: "CV identique pour toutes les offres", solution: "Postulera génère un CV unique par offre — chaque candidature est optimisée séparément" },
];

const TEMOIGNAGES = [
  { nom: "Lucie M.", poste: "BTS MCO · Bordeaux", resultat: "Stage chez Décathlon décroché", texte: "Sans expérience pro, je ne savais pas quoi mettre. Postulera a mis en avant mes projets BTS et mes stages d'observation." },
  { nom: "Kevin B.", poste: "BTS SIO · Lille", resultat: "Alternance signée en 10 jours", texte: "Je postulais sans réponse depuis 3 semaines. Après Postulera, j'ai eu deux rappels la même semaine." },
  { nom: "Inès T.", poste: "BTS Communication · Paris", resultat: "CDI obtenu à la sortie du BTS", texte: "Postulera a transformé mes cours et projets en compétences professionnelles lisibles par les recruteurs." },
];

export default function CvBts() {
  return (
    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit,'Outfit',system-ui,sans-serif)" }}>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur" style={{ borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold text-blue-700">Postulera</span>
          </Link>
          <Link href="/generate" className="text-white px-5 py-2 text-sm font-bold rounded-full" style={{ background: "#1d4ed8" }}>Créer mon CV →</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
          🎓 Spécial BTS · Gratuit pour commencer
        </div>
        <h1 className="font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV BTS optimisé<br />en <span style={{ color: "#3b82f6" }}>30 secondes</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          Même sans grande expérience, ton profil BTS a de la valeur — encore faut-il que les ATS le détectent.
          Postulera adapte ton CV aux mots-clés exacts de chaque offre de stage ou d'emploi.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Générer mon CV BTS — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 3 CV gratuits · ✓ Résultat en 30s</p>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: "#1e3a8a" }}>
            Pourquoi les CV BTS sont si souvent ignorés
          </h2>
          <p className="text-center text-gray-500 mb-10">Les 4 erreurs qui font échouer 90% des candidatures après un BTS</p>
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
            3 étapes pour un CV BTS parfait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { n:"1", e:"📋", t:"Colle l'offre", d:"Copie l'offre depuis Indeed, LinkedIn, Pôle Emploi ou l'Étudiant." },
              { n:"2", e:"✍️", t:"Ton profil BTS", d:"Formation, stages, projets, compétences. Même sans expérience pro." },
              { n:"3", e:"🚀", t:"CV prêt", d:"Postulera génère un CV avec les mots-clés exacts de l'offre. Score ATS inclus." },
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
              Créer mon CV BTS gratuitement →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Ils ont décroché leur stage ou emploi après BTS avec Postulera
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
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ton CV BTS en 30 secondes.<br />Gratuit. Sans CB.</h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700" style={{ background: "#ffffff" }}>
          Générer mon CV BTS →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-etudiant" className="hover:text-gray-600">CV Étudiant</Link>
          <Link href="/cv-alternance" className="hover:text-gray-600">CV Alternance</Link>
          <Link href="/cv-stage" className="hover:text-gray-600">CV Stage</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 Postulera — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
