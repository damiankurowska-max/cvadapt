import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "Tester Score ATS CV Gratuit — Analyse ATS en ligne | CVAdapt",
  description: "Analyse le score ATS de ton CV gratuitement en 30 secondes. Découvre les mots-clés manquants et optimise ton CV pour passer les filtres automatiques des recruteurs.",
  keywords: "score ats gratuit, tester ats cv, analyse ats cv, cv ats gratuit, optimiser cv ats",
  alternates: { canonical: "https://cvadapt.eu/score-ats-gratuit" },
};

export default function ScoreAts() {
  return (
    <main className="min-h-screen" style={{ background: "#f0f7ff", fontFamily: "var(--font-outfit,'Outfit',system-ui,sans-serif)" }}>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur" style={{ borderColor: "#e0ecff" }}>
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold text-blue-700">CVAdapt</span>
          </Link>
          <Link href="/analyse" className="text-white px-5 py-2 text-sm font-bold rounded-full"
            style={{ background: "#1d4ed8" }}>Analyser mon CV →</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6"
          style={{ background: "#dbeafe", color: "#1d4ed8" }}>🎯 Analyse ATS · 100% gratuit</div>
        <h1 className="font-extrabold leading-tight mb-5"
          style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1e3a8a" }}>
          Tester le score ATS<br />de ton CV <span style={{ color: "#3b82f6" }}>gratuitement</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: "#4b5563" }}>
          75% des CV sont rejetés par les logiciels ATS avant d'atteindre un recruteur humain.
          Découvre en 30 secondes si ton CV passe les filtres — et comment l'améliorer.
        </p>
        <Link href="/analyse" className="inline-block text-white font-bold px-8 py-4 text-lg rounded-full mb-4"
          style={{ background: "#1d4ed8", boxShadow: "0 6px 24px rgba(29,78,216,0.35)" }}>
          Analyser mon score ATS — Gratuit →
        </Link>
        <p className="text-sm" style={{ color: "#93c5fd" }}>✓ Sans inscription · ✓ Résultat immédiat · ✓ Mots-clés manquants détectés</p>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4" style={{ color: "#1e3a8a" }}>
            C'est quoi un score ATS ?
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            ATS = Applicant Tracking System. C'est le logiciel que 98% des grandes entreprises utilisent 
            pour trier les CV avant que les RH ne les lisent.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { stat:"75%", label:"des CV filtrés automatiquement", color:"#dc2626", bg:"#fef2f2" },
              { stat:"6 sec", label:"pour lire un CV qui passe le filtre", color:"#d97706", bg:"#fffbeb" },
              { stat:"3×", label:"plus de réponses avec un CV optimisé", color:"#16a34a", bg:"#f0fdf4" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-6 text-center" style={{ background: s.bg }}>
                <p className="text-4xl font-black mb-2" style={{ color: s.color }}>{s.stat}</p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "#1e3a8a" }}>
            Ce que l'analyse ATS CVAdapt te donne
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon:"📊", t:"Score sur 100", d:"Un pourcentage exact de correspondance entre ton CV et l'offre d'emploi." },
              { icon:"🔑", t:"Mots-clés manquants", d:"La liste des termes que le recruteur cherche et qui ne sont pas dans ton CV." },
              { icon:"💪", t:"Points forts identifiés", d:"Ce qui fonctionne déjà dans ton CV et qu'il faut garder." },
              { icon:"🚀", t:"CV optimisé généré", d:"En un clic, CVAdapt génère un CV corrigé avec tous les mots-clés intégrés." },
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

      <section className="py-16 px-5 text-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Analyse ton CV ATS maintenant.<br />Gratuit. Sans inscription.</h2>
        <Link href="/analyse" className="inline-block font-bold px-8 py-4 rounded-full text-blue-700 bg-white">
          Tester mon score ATS →
        </Link>
      </section>

      <footer className="py-8 px-5 text-center text-sm text-gray-400 border-t bg-white">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/cv-alternance" className="hover:text-gray-600">CV Alternance</Link>
          <Link href="/cv-stage" className="hover:text-gray-600">CV Stage</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
        </div>
        © 2025 CVAdapt — Fait en France 🇫🇷
      </footer>
    </main>
  );
}
