/* eslint-disable @typescript-eslint/no-var-requires */
const ENV = require("@sehatq/constants").ENV;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["@sehatq/components"]);

const moduleExports = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    async rewrites() {
      const oldSehatqDomain =
        process.env.NODE_ENV === "production"
          ? ENV.LOCAL_OLD_SEHATQ_DOMAIN
          : ENV.OLD_SEHATQ_DOMAIN;
      return {
        beforeFiles: [
          {
            source: "/old/_next/:path*",
            destination: `${oldSehatqDomain}/_next/:path*`,
          },
          {
            source: "/public/assets/:path*",
            destination: `${ENV.LOCAL_PHP_SEHATQ_DOMAIN}/public/assets/:path*`,
          },
          {
            source: "/public/content/:path*",
            destination: `${ENV.LOCAL_PHP_SEHATQ_DOMAIN}/public/content/:path*`,
          },
          {
            source: "/sitemap/:path*",
            destination: `${ENV.LOCAL_PHP_SEHATQ_DOMAIN}/sitemap/:path*`,
          },
          {
            source: "/sitemap.xml",
            destination: `${ENV.LOCAL_PHP_SEHATQ_DOMAIN}/sitemap.xml`,
          },
          {
            source: "/.well-known/apple-app-site-association",
            destination: `${ENV.LOCAL_PHP_SEHATQ_DOMAIN}/.well-known/apple-app-site-association`,
          },
        ],
        fallback: [
          {
            source: "/:path*",
            destination: `${oldSehatqDomain}/:path*`,
          },
        ],
      };
    },
    images: {
      deviceSizes: [320, 360, 400, 460, 540, 640, 750, 828, 1080],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 300],
    },
    transpileModules: [
      "@sehatq/components",
      "@sehatq/constants",
      "@sehatq/utils",
    ],
    experimental:
      ENV.ENVIRONMENT === "PRODUCTION" || ENV.ENVIRONMENT === "DEV"
        ? {
            incrementalCacheHandlerPath: "isr-cache",
          }
        : {
            isrFlushToDisk: false,
            isrMemoryCacheSize: 0,
          },
  })
);

module.exports = moduleExports;
