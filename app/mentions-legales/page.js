import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "Mentions légales — CVAdapt",
  description: "Mentions légales et politique de confidentialité de CVAdapt.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-xl font-bold text-blue-600">CVAdapt</span>
        </Link>
        <Link href="/generate" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
          Retour →
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
        <p className="text-gray-500 text-sm mb-12">Dernière mise à jour : mai 2025</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
            <p>Le site CVAdapt (cvadapt.eu) est édité par :</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Nom :</strong> Damian Kurowska</li>
              <li><strong>Statut :</strong> Entrepreneur individuel</li>
              <li><strong>Email :</strong> contact@cvadapt.eu</li>
              <li><strong>Site web :</strong> https://cvadapt.eu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li><a href="https://vercel.com" className="text-blue-600 hover:underline">vercel.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur le site CVAdapt (textes, images, logo, interface) est protégé par le droit d'auteur.
              Toute reproduction, distribution ou modification sans autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Collecte de données personnelles</h2>
            <p className="mb-3">CVAdapt collecte et traite les données suivantes :</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Adresse email (lors de la création de compte via Clerk)</li>
              <li>Données saisies dans le formulaire (nom, expérience, compétences) — utilisées uniquement pour la génération du CV</li>
              <li>Données de paiement traitées par Stripe (non stockées sur nos serveurs)</li>
            </ul>
            <p className="mt-3 text-sm">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              Pour exercer ce droit : <a href="mailto:contact@cvadapt.eu" className="text-blue-600 hover:underline">contact@cvadapt.eu</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookies</h2>
            <p className="text-sm">
              Le site utilise des cookies techniques nécessaires au fonctionnement de l'authentification (Clerk).
              Aucun cookie publicitaire n'est déposé. En utilisant le site, vous acceptez l'utilisation de ces cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Paiements</h2>
            <p className="text-sm">
              Les paiements sont traités par <strong>Stripe</strong> (Stripe Inc., 510 Townsend St, San Francisco, CA).
              CVAdapt ne stocke jamais vos informations bancaires. Les abonnements sont résiliables à tout moment depuis votre espace client Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Limitation de responsabilité</h2>
            <p className="text-sm">
              CVAdapt est un outil d'aide à la rédaction basé sur l'intelligence artificielle.
              Les CV générés sont fournis à titre indicatif. CVAdapt ne garantit pas l'obtention d'entretiens ou d'emplois.
              L'utilisateur reste responsable du contenu final de son CV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Droit applicable</h2>
            <p className="text-sm">
              Les présentes mentions légales sont soumises au droit français.
              Tout litige relatif à l'utilisation du site sera soumis aux tribunaux compétents de France.
            </p>
          </section>

        </div>
      </div>

      <footer className="border-t border-gray-100 py-6 px-6 text-center text-sm text-gray-400">
        © 2025 CVAdapt — <Link href="/" className="hover:text-gray-600">Retour à l'accueil</Link>
      </footer>
    </main>
  );
}
