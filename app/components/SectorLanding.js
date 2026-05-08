"use client";
import Link from "next/link";
import Logo from "./Logo";

export default function SectorLanding({ config }) {
  const { hero, steps, examples, faq, cta } = config;

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-blue-600 tracking-tight">CVAdapt</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/analyse" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 font-medium">Analyser mon CV</Link>
          <Link href="/tarifs" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 font-medium">Tarifs</Link>
          <Link href="/generate" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            Essayer gratuitement
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          {hero.title}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/generate" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition-colors">
            {cta.primary}
          </Link>
          <Link href="/analyse" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors">
            Tester mon CV ATS gratuit
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">3 CV gratuits · Sans carte bancaire</p>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-3 gap-6 text-center">
          {hero.stats.map((s, i) => (
            <div key={i}>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Simple</p>
          <h2 className="text-3xl font-bold text-gray-900">3 étapes. 30 secondes.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">{i + 1}</div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXEMPLES */}
      <section className="bg-blue-50 py-14 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{examples.title}</h2>
            <p className="text-gray-500 mt-2 text-sm">{examples.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {examples.items.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.emoji}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Questions fréquentes</h2>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {faq.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900 text-sm list-none">
                {item.q}
                <span className="text-gray-400 text-xl font-light ml-4 group-open:hidden">+</span>
                <span className="text-gray-400 text-xl font-light ml-4 hidden group-open:inline">−</span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-blue-600 py-16 px-5 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-3">{cta.finalTitle}</h2>
        <p className="text-blue-100 mb-8 text-base">{cta.finalSub}</p>
        <Link href="/generate" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors inline-block">
          {cta.primary}
        </Link>
        <p className="text-blue-200 text-xs mt-4">3 CV gratuits · Sans carte bancaire · Annulation à tout moment</p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-6 px-5 text-center text-xs text-gray-400">
        <div className="flex justify-center gap-6 mb-2">
          <Link href="/" className="hover:text-gray-600">Accueil</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <Link href="/tarifs" className="hover:text-gray-600">Tarifs</Link>
          <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
        </div>
        <p>© {new Date().getFullYear()} CVAdapt — Tous droits réservés</p>
      </footer>
    </main>
  );
}
