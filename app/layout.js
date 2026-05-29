import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import ClientProviders from "./components/ClientProviders";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

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
    images: [{ url: "https://cvadapt.eu/opengraph-image", width: 1200, height: 630, alt: "CVAdapt — Génère un CV ATS en 30 secondes" }],
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cvadapt.eu/#organization",
  name: "CVAdapt",
  url: "https://cvadapt.eu",
  logo: "https://cvadapt.eu/logo.svg",
  description: "Générateur de CV adapté aux offres d'emploi françaises grâce à l'IA. Score ATS, mots-clés, lettre de motivation en 30 secondes.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@cvadapt.eu",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cvadapt.eu/#website",
  url: "https://cvadapt.eu",
  name: "CVAdapt",
  publisher: { "@id": "https://cvadapt.eu/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://cvadapt.eu/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CVAdapt",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://cvadapt.eu",
  description: "Générateur de CV ATS adapté aux offres d'emploi françaises. Score ATS, mots-clés manquants et lettre de motivation en 30 secondes.",
  offers: [
    {
      "@type": "Offer",
      name: "Gratuit",
      price: "0",
      priceCurrency: "EUR",
      description: "3 CV complets gratuits sans carte bancaire",
    },
    {
      "@type": "Offer",
      name: "Étudiant",
      price: "4.99",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "4.99",
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
      description: "15 CV par mois avec score ATS complet et lettre de motivation",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "9.99",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "9.99",
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
      description: "CV illimités, templates premium, support prioritaire",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#ffffff",
          colorText: "#111827",
          colorTextSecondary: "#6b7280",
          colorInputBackground: "#f9fafb",
          colorInputText: "#111827",
          borderRadius: "0.75rem",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "15px",
        },
        elements: {
          card: "shadow-xl border border-gray-100 rounded-2xl",
          headerTitle: "text-gray-900 font-bold text-xl",
          headerSubtitle: "text-gray-500",
          socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 font-medium",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 font-semibold",
          footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
          identityPreviewText: "text-gray-900",
          identityPreviewEditButton: "text-blue-600",
          avatarBox: "rounded-xl",
          badge: "bg-blue-100 text-blue-700",
          navbarButton__active: "text-blue-600",
        },
      }}
    >
      <html lang="fr" className={outfit.variable}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
          />
          {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`,
              }}
            />
          )}
        </head>
        <body style={{ fontFamily: "var(--font-outfit, 'Outfit', system-ui, sans-serif)" }}><ClientProviders>{children}</ClientProviders></body>
      </html>
    </ClerkProvider>
  );
}
