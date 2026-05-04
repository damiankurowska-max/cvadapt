import Link from "next/link";
import Logo from "../components/Logo";

export const metadata = {
  title: "Conditions Générales d'Utilisation — CVAdapt",
  description: "Conditions générales d'utilisation du service CVAdapt.",
};

export default function CGU() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-500 text-sm mb-12">Dernière mise à jour : mai 2025</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-sm">
              Les présentes Conditions Générales d'Utilisation régissent l'accès et l'utilisation du service CVAdapt (cvadapt.eu),
              un générateur de CV et de lettres de motivation basé sur l'intelligence artificielle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Accès au service</h2>
            <p className="text-sm mb-3">CVAdapt est accessible :</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Gratuitement</strong> : 3 CV générés au total (sans abonnement)</li>
              <li><strong>Plan Essentiel (4,99€/mois)</strong> : 10 CV par mois</li>
              <li><strong>Plan Pro (9,99€/mois)</strong> : CV illimités</li>
            </ul>
            <p className="mt-3 text-sm">
              L'inscription est requise pour accéder au service. L'utilisateur s'engage à fournir des informations exactes lors de la création de son compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Abonnements et paiements</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Les abonnements sont mensuels et reconductibles automatiquement.</li>
              <li>Le paiement est prélevé en début de chaque période via Stripe.</li>
              <li>L'annulation peut être effectuée à tout moment ; l'accès reste actif jusqu'à la fin de la période payée.</li>
              <li>Aucun remboursement n'est accordé pour les périodes entamées, sauf obligation légale.</li>
              <li>CVAdapt se réserve le droit de modifier les tarifs avec un préavis de 30 jours.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Utilisation du service</h2>
            <p className="text-sm mb-3">L'utilisateur s'engage à :</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Utiliser le service uniquement pour des besoins personnels et légaux</li>
              <li>Ne pas tenter de contourner les limites du service</li>
              <li>Ne pas utiliser le service à des fins frauduleuses ou pour créer de faux documents</li>
              <li>Ne pas partager son compte avec d'autres personnes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Propriété des contenus générés</h2>
            <p className="text-sm">
              Les CV et lettres de motivation générés appartiennent à l'utilisateur.
              CVAdapt ne conserve pas les contenus des CV après leur génération.
              L'utilisateur est seul responsable de l'utilisation des documents produits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
            <p className="text-sm">
              CVAdapt ne garantit pas les résultats de la recherche d'emploi suite à l'utilisation du service.
              Le service est fourni "tel quel", sans garantie d'exactitude ou d'adéquation à un poste précis.
              CVAdapt ne pourra être tenu responsable des dommages indirects résultant de l'utilisation du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Résiliation</h2>
            <p className="text-sm">
              CVAdapt se réserve le droit de suspendre ou de résilier tout compte en cas de violation des présentes CGU,
              sans préavis ni remboursement. L'utilisateur peut également demander la suppression de son compte à tout moment
              en écrivant à <a href="mailto:contact@cvadapt.eu" className="text-blue-600 hover:underline">contact@cvadapt.eu</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Modifications des CGU</h2>
            <p className="text-sm">
              CVAdapt peut modifier ces CGU à tout moment. Les utilisateurs seront notifiés par email en cas de modification substantielle.
              La poursuite de l'utilisation du service vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Droit applicable</h2>
            <p className="text-sm">
              Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents de France.
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
