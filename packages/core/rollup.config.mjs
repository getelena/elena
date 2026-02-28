import { readdirSync } from "fs";
import terser from "@rollup/plugin-terser";
import summary from "rollup-plugin-summary";
import pkg from "./package.json" with { type: "json" };

// ░ Applies the Elena brand color (#f19c77) to a string using ANSI true color escape codes.
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
 * All outputs use ESM format with sourcemaps. The `summary` plugin is opt-in
 * so it can be shown once per logical build rather than for every entry chunk.
 *
 * @param {object} options
 * @param {import("rollup").InputOption} options.input - Entry point(s) to bundle.
 * @param {import("rollup").OutputOptions} [options.output] - Output options merged over the ESM defaults.
 * @param {boolean} [options.hasSummary=false] - Whether to print a size summary after the build.
 * @returns {import("rollup").RollupOptions}
 */
function createConfig({ input, output, hasSummary = false }) {
  const plugins = [
    terser({
      ecma: 2020,
      module: true,
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
  createConfig({
    input: "src/elena.js",
    output: { file: "dist/bundle.js" },
    hasSummary: true,
  }),
];
