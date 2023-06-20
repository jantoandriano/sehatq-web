// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslint = require("eslint-preset-sehatq");
module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: false,
        minKeys: 2,
        natural: false,
      },
    ],
  },
};
