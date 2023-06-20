module.exports = {
  plugins: ["sonarjs"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:sonarjs/recommended",
    "next",
  ],
  settings: {
    next: {
      rootDir: ["./apps/*/", "./packages/*/"],
    },
  },
  rules: {
    "import/named": "off",
    "no-redeclare": "off",
    "react/react-in-jsx-scope": "error",
    "import/prefer-default-export": "off",
    "import/no-cycle": ["error", { maxDepth: 2 }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
    "@typescript-eslint/no-redeclare": "error",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-array-index-key": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
  },
};
