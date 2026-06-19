import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "./components/ClientProviders";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "Optimiser son CV avec l'IA — Score ATS en 30 sec | Postulera",
  description: "Optimise ton CV pour chaque offre d'emploi en 30 secondes. Postulera analyse les mots-clés ATS, réécrit ton CV et booste ton taux de réponse ×3. Gratuit sans CB.",
  keywords: "optimiser son CV, optimisation CV ATS, CV adapté offre emploi, générateur CV IA, score ATS gratuit, CV étudiant alternance, améliorer CV en ligne",
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
    title: "Optimiser son CV avec l'IA — Score ATS en 30 sec | Postulera",
    description: "Optimise ton CV pour chaque offre d'emploi en 30 secondes. Score ATS, mots-clés ciblés, lettre de motivation incluse. Gratuit sans CB.",
    url: "https://postulera.com",
    siteName: "Postulera",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://postulera.com/opengraph-image", width: 1200, height: 630, alt: "Postulera — Génère un CV ATS en 30 secondes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimiser son CV avec l'IA — Score ATS en 30 sec | Postulera",
    description: "Optimise ton CV pour chaque offre d'emploi en 30 secondes. Score ATS, mots-clés ciblés, lettre de motivation incluse. Gratuit sans CB.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://postulera.com",
    languages: {
      "fr": "https://postulera.com",
      "en": "https://postulera.com",
      "x-default": "https://postulera.com",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://postulera.com/#organization",
  name: "Postulera",
  url: "https://postulera.com",
  logo: "https://postulera.com/logo.svg",
  description: "Générateur de CV adapté aux offres d'emploi françaises grâce à l'IA. Score ATS, mots-clés, lettre de motivation en 30 secondes.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@postulera.com",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://postulera.com/#website",
  url: "https://postulera.com",
  name: "Postulera",
  publisher: { "@id": "https://postulera.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://postulera.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Postulera",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://postulera.com",
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
    <ClerkProvider proxyUrl="https://postulera.com/__clerk">
      <html lang="fr" className={outfit.variable}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://www.clarity.ms" />
          <link rel="dns-prefetch" href="https://www.clarity.ms" />
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wyv1c6965i");`
            }}
          />
          <script
            suppressHydrationWarning
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            suppressHydrationWarning
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            suppressHydrationWarning
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
          />
        </head>
        <body
          suppressHydrationWarning
          style={{ fontFamily: "var(--font-outfit, 'Outfit', system-ui, sans-serif)" }}
        >
          <ClientProviders>{children}</ClientProviders>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
