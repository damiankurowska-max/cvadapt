import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 100% des erreurs serveur capturées
  tracesSampleRate: 0.1,

  enabled: process.env.NODE_ENV === "production",
});
