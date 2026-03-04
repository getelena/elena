/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena ESLint config
 * https://elenajs.com
 */
module.exports = [
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-require-imports": "off",
      "comma-dangle": ["error", "only-multiline"],
      curly: ["error", "all"],
      "no-console": "off",
      "no-undef": "off",
      "no-var": "off",
      "prefer-rest-params": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
    },
  },
  {
    ignores: [
      "node_modules/*",
      "**/node_modules/*",
      "**/dist/*",
      "dist/*",
      "**/dist/**/*",
      "test/**/*",
      "coverage/*",
      "**/coverage/*",
    ],
  },
];
