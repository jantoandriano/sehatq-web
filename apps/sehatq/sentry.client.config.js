import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://70256e588a4146569103b67d343e18fb@o291300.ingest.sentry.io/6639832",
  tracesSampleRate: 0.25,
  allowUrls: [/https?:\/\/((cdn|www)\.)?sehatq\.com/],
});
