import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

export const metadata = {
  title: "CVAdapt - Ton CV adapté à chaque offre d'emploi",
  description: "Colle une offre d'emploi, entre tes infos — CVAdapt génère un CV optimisé et prêt à envoyer en 30 secondes. Gratuit pour commencer.",
  keywords: "CV, générateur CV, CV adapté, offre emploi, CV IA, recherche emploi France",
  openGraph: {
    title: "CVAdapt - Ton CV adapté à chaque offre d'emploi",
    description: "Génère un CV optimisé pour chaque offre d'emploi en 30 secondes grâce à l'IA.",
    url: "https://cvadapt.eu",
    siteName: "CVAdapt",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://cvadapt.eu/logo.svg", width: 512, height: 512, alt: "CVAdapt logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVAdapt - Ton CV adapté à chaque offre d'emploi",
    description: "Génère un CV optimisé pour chaque offre d'emploi en 30 secondes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://cvadapt.eu",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
