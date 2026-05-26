import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV Sans Expérience Professionnelle — Modèle Étudiant | CVAdapt",
  description: "Crée un CV convaincant même sans expérience professionnelle. CVAdapt valorise ta formation, tes projets et tes compétences pour décrocher ton premier stage ou alternance.",
  keywords: "cv sans expérience, cv premier emploi, cv étudiant sans expérience, cv sans expérience professionnelle, modèle cv débutant",
  alternates: { canonical: "https://cvadapt.eu/cv-sans-experience" },
};

export default function CvSansExperience() {
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
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>🎓 Même sans expérience · Gratuit</div>
        <h1 className="font-extrabold leading-tight mb-5"
          style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV sans expérience<br /><span style={{ color: "#3b82f6" }}>qui décroche des entretiens</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          Pas d'expérience ? Pas de problème. CVAdapt valorise ta formation, tes projets universitaires 
          et tes compétences exactement comme les recruteurs les cherchent.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Créer mon CV — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 3 CV gratuits · ✓ 30 secondes</p>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4" style={{ color: "#1e3a8a" }}>
            Ce que CVAdapt met en avant à ta place
          </h2>
          <p className="text-center text-gray-500 mb-10">Quand tu n'as pas d'expérience, ces éléments font la différence</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon:"🎓", t:"Projets universitaires", d:"Tes travaux de groupe, projets de fin d'études, mémoires — valorisés comme de vraies expériences." },
              { icon:"🏆", t:"Activités extra-scolaires", d:"Sport en compétition, associations, BDE, bénévolat — des signaux forts pour les recruteurs." },
              { icon:"💻", t:"Compétences techniques", d:"Logiciels, langages, outils maîtrisés — présentés dans le vocabulaire exact de l'offre." },
              { icon:"🌍", t:"Langues et mobilité", d:"Échanges universitaires, certifications linguistiques — des atouts différenciants bien mis en valeur." },
              { icon:"📈", t:"Réalisations chiffrées", d:"CVAdapt transforme tes activités en résultats mesurables (x membres gérés, x projet livré...)." },
              { icon:"🎯", t:"Profil adapté à l'offre", d:"Le titre et le résumé de ton CV correspondent exactement à ce que cherche le recruteur." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-5 flex gap-4" style={{ border: "2px solid #e0ecff", background: "#f8faff" }}>
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "#1e3a8a" }}>{f.t}</h3>
                  <p className="text-sm text-gray-500">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
            <p className="text-4xl mb-4">💬</p>
            <p className="text-lg italic text-gray-700 mb-4 leading-relaxed">
              &ldquo;Sans expérience professionnelle, je ne savais pas quoi mettre dans mon CV. 
              CVAdapt a mis en avant mes projets universitaires exactement comme les recruteurs les cherchent. 
              J'ai eu 4 entretiens en 2 semaines.&rdquo;
            </p>
            <p className="font-bold text-gray-900">Emma T.</p>
            <p className="text-sm text-gray-400">Master Marketing · Toulouse · Stage décroché chez L'Oréal</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-5 text-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ton CV en 30 secondes.<br />Même sans expérience. Gratuit.
        </h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700 bg-white">
          Créer mon CV maintenant →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-alternance" className="hover:text-gray-600">CV Alternance</Link>
          <Link href="/cv-stage" className="hover:text-gray-600">CV Stage</Link>
          <Link href="/score-ats-gratuit" className="hover:text-gray-600">Score ATS Gratuit</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
