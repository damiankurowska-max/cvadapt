import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://222bd7ca4ce2d897dd446b2da02ffbc0@o4511372361203712.ingest.de.sentry.io/4511372363825232",

  // 100% des erreurs serveur capturées
  tracesSampleRate: 0.1,

  enabled: process.env.NODE_ENV === "production",
});
