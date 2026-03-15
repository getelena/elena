import { readdirSync } from "fs";
import terser from "@rollup/plugin-terser";
import summary from "rollup-plugin-summary";
import pkg from "./package.json" with { type: "json" };

const color = str => `\x1b[38;2;241;156;119m${str}\x1b[0m`;

console.log(
  color(`
 ██████████ ████
░░███░░░░░█░░███
 ░███  █ ░  ░███   ██████  ████████    ██████
 ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 ░███░░█    ░███ ░███████  ░███ ░███   ███████
 ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 ██████████ █████░░██████  ████ █████░░████████
░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░

░█ [ELENA]: Compiling Elena, version ${pkg.version}`)
);

console.log(color(`░█ [ELENA]: Found the following JavaScript modules:`));

/**
 * Creates a Elena Rollup config for a single build target.
 *
 * @param {object} options
 * @param {import("rollup").InputOption} options.input - Entry point(s) to bundle.
 * @param {import("rollup").OutputOptions} [options.output] - Output options merged over the ESM defaults.
 * @param {boolean} [options.hasSummary=false] - Whether to print a size summary after the build.
 * @returns {import("rollup").RollupOptions}
 */
function createConfig({ input, output, hasSummary = false, mangleProperties = false }) {
  const plugins = [
    terser({
      ecma: 2020,
      module: true,
      ...(mangleProperties && {
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
      }),
    }),
    {
      name: "log",
      options(options) {
        console.log(` `);
        if (Array.isArray(options.input)) {
          for (const module of input) {
            console.log(color(`░█ [ELENA]: Generating and minifying ${module}...`));
          }
        } else {
          console.log(color(`░█ [ELENA]: Generating and minifying single file bundle...`));
        }
        console.log(` `);
      },
    },
  ];

  if (hasSummary) {
    plugins.push(summary({ showBrotliSize: true, showGzippedSize: true }));
  }

  return {
    input,
    plugins,
    output: {
      format: "esm",
      sourcemap: true,
      ...output,
    },
    preserveEntrySignatures: "strict",
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
    },
    onwarn(warning, warn) {
      if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
        return;
      }
      warn(warning);
    },
  };
}

// All JS source files, discovered recursively from src/.
const entries = readdirSync("src", { recursive: true })
  .filter(f => f.endsWith(".js"))
  .map(f => `src/${f}`);

export default [
  // Individual modules: preserves the public package entry points.
  createConfig({
    input: [...entries],
    output: { dir: "dist" },
    hasSummary: true,
  }),
  // Single-file bundle for consumers who prefer one import.
  // Property mangling is safe here because Terser sees all code at once.
  createConfig({
    input: "src/elena.js",
    output: { file: "dist/bundle.js" },
    hasSummary: true,
    mangleProperties: true,
  }),
];
