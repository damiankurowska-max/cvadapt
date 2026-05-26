import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "CV Stage Étudiant Gratuit — Modèle CV Stage 2025 | CVAdapt",
  description: "Crée un CV parfait pour ton stage en moins de 30 secondes. CVAdapt adapte ton CV aux mots-clés de l'offre. Modèle CV stage étudiant gratuit, sans CB.",
  keywords: "cv stage étudiant, modèle cv stage, cv stage gratuit, cv pour stage, cv stage sans expérience",
  alternates: { canonical: "https://cvadapt.eu/cv-stage" },
};

export default function CvStage() {
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
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>📄 Modèle CV stage · Gratuit</div>
        <h1 className="font-extrabold leading-tight mb-5"
          style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          CV Stage étudiant<br />prêt en <span style={{ color: "#3b82f6" }}>30 secondes</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          Chaque offre de stage attend des mots-clés précis. CVAdapt analyse l'offre et génère un CV 
          adapté automatiquement — même sans expérience professionnelle.
        </p>
        <Link href="/generate" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Créer mon CV stage — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans carte bancaire · ✓ 3 CV gratuits · ✓ Téléchargement PDF</p>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Ce qui différencie un CV de stage qui obtient des réponses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon:"🎯", titre:"Mots-clés de l'offre intégrés", desc:"CVAdapt extrait les termes clés de chaque offre et les intègre naturellement dans ton CV." },
              { icon:"📊", titre:"Score ATS inclus", desc:"Tu sais exactement si ton CV va passer les filtres automatiques avant de l'envoyer." },
              { icon:"✉️", titre:"Lettre de motivation incluse", desc:"Générée en même temps que le CV, adaptée à l'entreprise et au poste visé." },
              { icon:"⚡", titre:"4 templates professionnels", desc:"Moderne, Classique, Créatif, Minimaliste — tous compatibles avec les logiciels RH." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl p-6 flex gap-4" style={{ border: "2px solid #e0ecff", background: "#f8faff" }}>
                <span className="text-3xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "#1e3a8a" }}>{f.titre}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5" style={{ background: "#f0f7ff" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#1e3a8a" }}>
            Questions fréquentes — CV de stage
          </h2>
          <div className="space-y-4">
            {[
              { q:"Comment faire un CV stage sans expérience ?", r:"CVAdapt met en avant ta formation, tes projets universitaires, tes activités extra-scolaires et tes compétences — exactement ce que les recruteurs cherchent pour un premier stage." },
              { q:"Quel format de CV pour un stage ?", r:"Le format PDF est obligatoire. CVAdapt génère un CV PDF optimisé ATS en 30 secondes, avec une mise en page lisible par tous les logiciels de tri automatique." },
              { q:"Comment adapter son CV à chaque offre de stage ?", r:"Il suffit de coller le texte de l'offre dans CVAdapt. L'IA analyse les mots-clés du poste et génère un CV personnalisé en quelques secondes." },
              { q:"CVAdapt est-il vraiment gratuit ?", r:"Oui. Tu génères 3 CV complets gratuitement, sans carte bancaire. Le plan Étudiant à 4,99€/mois débloque 15 CV par mois avec score ATS et lettre de motivation." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 text-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ton CV de stage en 30 secondes.<br />Gratuit. Sans CB.</h2>
        <Link href="/generate" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700 bg-white">
          Créer mon CV stage →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-alternance" className="hover:text-gray-600">CV Alternance</Link>
          <Link href="/score-ats-gratuit" className="hover:text-gray-600">Score ATS</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
