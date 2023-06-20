module.exports = {
  ...require("eslint-preset-sehatq"),
  settings: {
    "import/resolver": {
      typescript: {
        project: ".",
      },
    },
  },
};
