import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV Communication Gratuit — Optimisé ATS en 30 secondes | CVAdapt",
  description: "Génère un CV communication adapté à chaque offre. CVAdapt intègre les mots-clés ATS en 30 secondes. Chargé de communication, community manager, attaché de presse.",
  keywords: "cv communication gratuit, modèle cv communication, cv chargé de communication, cv community manager, cv attaché de presse",
  alternates: { canonical: "https://cvadapt.eu/cv-communication" },
};

const ERREURS = [
  { titre: "Portfolio et réseaux absents du CV", solution: "CVAdapt intègre tes liens portfolio, réseaux gérés et métriques d'engagement" },
  { titre: "Outils digitaux non mentionnés", solution: "Canva, Adobe, Hootsuite, Mailchimp, WordPress — CVAdapt les ajoute selon l'offre" },
  { titre: "Résultats de campagnes non chiffrés", solution: "CVAdapt structure tes résultats : reach, taux d'engagement, croissance followers" },
  { titre: "Spécialité non ciblée", solution: "CVAdapt adapte le CV selon ta spécialité : digital, interne, institutionnelle, événementiel" },
];

const TEMOIGNAGES = [
  { nom: "Chloé R.", poste: "Chargée de communication · Paris", resultat: "CDI chez LVMH en 3 semaines", texte: "Mon CV ne mettait pas en avant mes métriques Instagram. CVAdapt les a intégrées avec les bons mots-clés en 30 secondes." },
  { nom: "Baptiste F.", poste: "Community Manager · Lyon", resultat: "3 entretiens la première semaine", texte: "J'avais un bon portfolio mais un mauvais CV. CVAdapt a fait le lien entre mes réalisations et ce que cherchaient les ATS." },
  { nom: "Léa M.", poste: "Attachée de presse · Bordeaux", resultat: "Recrutée en agence RP", texte: "CVAdapt a reformulé mes expériences avec le vocabulaire exact du secteur RP. Rappelée en 48h." },
];

export default function CvCommunication() {
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
          📣 CV Communication · Gratuit pour commencer
        </div>
        <h1 className="font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV Communication optimisé<br />en <span style={{ color: "#3b82f6" }}>30 secondes</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          Les postes en communication reçoivent des centaines de candidatures — 75% sont filtrées par les ATS avant lecture.
          CVAdapt adapte ton CV aux mots-clés exacts : digital, RP, événementiel, brand content.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Générer mon CV communication — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 1 CV gratuit · ✓ Résultat en 30s</p>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: "#1e3a8a" }}>
            Pourquoi les profils communication ne reçoivent pas de réponse
          </h2>
          <p className="text-center text-gray-500 mb-10">Les 4 erreurs qui bloquent 90% des CV communication</p>
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
            3 étapes pour un CV communication parfait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { n:"1", e:"📋", t:"Colle l'offre", d:"Copie l'offre depuis LinkedIn, Indeed, l'Étudiant ou Choosemycompany." },
              { n:"2", e:"📣", t:"Tes réalisations", d:"Campagnes, métriques, outils, portfolio. CVAdapt chiffre tes résultats." },
              { n:"3", e:"🚀", t:"CV prêt", d:"CVAdapt génère un CV avec les mots-clés communication exacts. Score ATS inclus." },
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
              Créer mon CV communication gratuitement →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Ils ont décroché leur poste en communication avec CVAdapt
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
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ton CV communication en 30 secondes.<br />Gratuit. Sans CB.</h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700" style={{ background: "#ffffff" }}>
          Générer mon CV communication →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-marketing" className="hover:text-gray-600">CV Marketing</Link>
          <Link href="/cv-commercial" className="hover:text-gray-600">CV Commercial</Link>
          <Link href="/score-ats-gratuit" className="hover:text-gray-600">Score ATS</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
