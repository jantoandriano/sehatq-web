/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["@sehatq/components"]);

module.exports = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    transpileModules: [
      "@sehatq/components",
      "@sehatq/constants",
      "@sehatq/utils",
    ],
  })
);
