import { propNames } from "@chakra-ui/react";
import type { StorybookConfig } from "@storybook/react/types";
import type { PropItem } from "react-docgen-typescript";

const excludedPropNames = propNames.concat([
  "as",
  "apply",
  "sx",
  "__css",
  "css",
]);

const config: StorybookConfig = {
  stories: [
    {
      directory: "..",
      titlePrefix: "Sehatq",
    },
  ],
  logLevel: "debug",
  staticDirs: ["../../public"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["src/features/**/*.tsx"],
        },
      },
    },
  ],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: PropItem, component: { name: string }) => {
        const isStyledSystemProp = excludedPropNames.includes(prop.name);
        const isChakraUIProp =
          prop.parent?.fileName.includes("chakra-ui") ?? false;
        const isHook = component.name.startsWith("use");
        const isLocalProp =
          prop.declarations && prop.declarations.length > 0
            ? prop.declarations.some((declaration) => {
                return !declaration.fileName.includes("node_modules");
              })
            : true;

        return (
          isLocalProp || (isChakraUIProp && !isHook && !isStyledSystemProp)
        );
      },
    },
  },
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
  },
  features: {
    postcss: false,
    emotionAlias: false,
    storyStoreV7: !global.navigator?.userAgent?.match?.("jsdom"),
    buildStoriesJson: true,
    babelModeV7: true,
    warnOnLegacyHierarchySeparator: false,
  },
  framework: "@storybook/react",
};
module.exports = config;
