import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Captures 10% des transactions en prod (pour ne pas exploser le quota free)
  tracesSampleRate: 0.1,

  // Pas de replay en prod (quota)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Désactivé en dev local
  enabled: process.env.NODE_ENV === "production",
});
