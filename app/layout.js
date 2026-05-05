import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

export const metadata = {
  title: "CVAdapt — Génère un CV ATS en 30 sec · Gratuit pour les Étudiants",
  description: "75% des CV sont rejetés avant d'être lus. CVAdapt adapte ton CV à chaque offre en 30 secondes : score ATS, mots-clés, lettre de motivation incluse. Essaie gratuitement.",
  keywords: "CV adapté offre emploi, générateur CV ATS, CV étudiant alternance, optimiser CV IA, score ATS gratuit, CV en 30 secondes",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "CVAdapt — Génère un CV ATS en 30 sec · Gratuit pour les Étudiants",
    description: "75% des CV sont rejetés avant d'être lus. Adapte ton CV à chaque offre en 30 secondes : score ATS, mots-clés, lettre de motivation incluse.",
    url: "https://cvadapt.eu",
    siteName: "CVAdapt",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://cvadapt.eu/logo.svg", width: 512, height: 512, alt: "CVAdapt logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVAdapt — Génère un CV ATS en 30 sec · Gratuit pour les Étudiants",
    description: "75% des CV sont rejetés avant d'être lus. Adapte ton CV à chaque offre en 30 secondes : score ATS, mots-clés, lettre de motivation incluse.",
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
