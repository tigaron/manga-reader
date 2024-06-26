/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions &
 *       import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>",
    "<TYPES>^[./]",
    "",
    "@/env.mjs",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/components/(.*)$",
    "",
    "^[.][.]/",
    "^[.]/",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "4.4.0",
};

export default config;
