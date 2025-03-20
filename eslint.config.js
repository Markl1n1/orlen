module.exports = [
    {
      ignores: ["node_modules", "dist"], // Ignore unnecessary files
    },
    {
      plugins: {
        html: require("eslint-plugin-html"),
      },
      languageOptions: {
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-undef": "error",
      },
    },
  ];
  