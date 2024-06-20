/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript/recommended",
    "prettier",
  ],
  rules: {
    "linebreak-style": [0, "error", "window"],
  },
};
