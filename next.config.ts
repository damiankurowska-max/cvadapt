import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  serverExternalPackages: ["stripe"],

  // Compression gzip automatique
  compress: true,

  // Optimisation images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers cache pour les assets statiques
  async headers() {
    return [
      {
        source: "/(.*\\.(?:js|css|woff2|woff|ttf|ico|png|svg|jpg|jpeg|webp|avif))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Organisation + projet Sentry (à remplir après création du compte)
  org: process.env.SENTRY_ORG || "cvadapt",
  project: process.env.SENTRY_PROJECT || "cvadapt-web",

  // Upload des source maps pour voir les vraies erreurs (pas le code minifié)
  silent: true,
  widenClientFileUpload: true,

  // Pas de tunnel — on utilise le DSN direct
  tunnelRoute: undefined,

  // Désactive les logs Sentry en dev
  disableLogger: true,
});
