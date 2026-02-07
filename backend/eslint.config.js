import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs}"],
    plugins: { js, eslintConfigImport, eslintPluginPrettier },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  eslintConfigPrettier,
]);
