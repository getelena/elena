import { existsSync, readdirSync } from "fs";
import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import minifyHtmlLiterals from "rollup-plugin-minify-html-literals-v3";
import summary from "rollup-plugin-summary";
import { cssPlugin, cssBundlePlugin } from "@elenajs/plugin-rollup-css";
import { color } from "./utils/color.js";

const TREESHAKE = {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
};

function onwarn(warning, warn) {
  if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
    return;
  }
  warn(warning);
}

/**
 * Builds the plugin list for a single Rollup build target.
 *
 * @param {{ src: string; outdir: string; hasSummary: boolean; includeCssBundle: boolean; extraPlugins?: import("rollup").Plugin[]; hasTs?: boolean }} opts
 * @returns {import("rollup").Plugin[]}
 */
function buildPlugins({
  src,
  outdir,
  hasSummary,
  includeCssBundle,
  extraPlugins = [],
  hasTs = false,
}) {
  const plugins = [resolve({ extensions: [".js", ".ts", ".css"] })];

  if (hasTs) {
    plugins.push(
      typescript({
        sourceMap: true,
        compilerOptions: {
          declaration: false,
          declarationMap: false,
        },
        include: ["**/*.ts"],
      })
    );
  }

  plugins.push(
    minifyHtmlLiterals({
      options: {
        // Elena components use this.template`...` rather than html`...`
        shouldMinify: template => template.parts.some(({ text }) => /<[a-z]/i.test(text)),
      },
    }),
    terser({
      ecma: 2020,
      module: true,
    }),
    cssPlugin(src)
  );

  if (includeCssBundle) {
    plugins.push(cssBundlePlugin(src, "bundle.css"));
  }

  // User-provided plugins are appended after built-ins, before summary.
  plugins.push(...extraPlugins);

  if (hasSummary) {
    plugins.push(summary({ showBrotliSize: true, showGzippedSize: true }));
  }

  return plugins;
}

/**
 * Returns the Rollup config array for the given Elena config. Useful for advanced
 * users who want to call `rollup -c` with a thin wrapper config file.
 *
 * @param {import("./utils/load-config.js").ElenaConfig} [options]
 * @returns {import("rollup").RollupOptions[]}
 */
export function createRollupConfig(options = {}) {
  const src = options.input ?? "src";
  const outdir = options.output?.dir ?? "dist";
  const format = options.output?.format ?? "esm";
  const sourcemap = options.output?.sourcemap ?? true;
  let bundle = options.bundle !== undefined ? options.bundle : "src/index.js";
  const extraPlugins = options.plugins ?? [];

  const entries = readdirSync(src, { recursive: true })
    .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
    .map(f => `${src}/${f}`);

  const hasTs = entries.some(f => f.endsWith(".ts"));

  if (bundle === "src/index.js" && !existsSync(bundle) && existsSync("src/index.ts")) {
    bundle = "src/index.ts";
  }

  const configs = [
    {
      input: entries,
      plugins: buildPlugins({
        src,
        outdir,
        hasSummary: false,
        includeCssBundle: true,
        extraPlugins,
        hasTs,
      }),
      output: {
        format,
        sourcemap,
        dir: outdir,
        ...(hasTs && { entryFileNames: "[name].js" }),
      },
      preserveEntrySignatures: "strict",
      treeshake: TREESHAKE,
      onwarn,
    },
  ];

  if (bundle) {
    configs.push({
      input: bundle,
      plugins: buildPlugins({
        src,
        outdir,
        hasSummary: true,
        includeCssBundle: false,
        extraPlugins,
        hasTs,
      }),
      output: { format, sourcemap, file: `${outdir}/bundle.js` },
      preserveEntrySignatures: "strict",
      treeshake: TREESHAKE,
      onwarn,
    });
  }

  return configs;
}

/**
 * Runs both Rollup build targets programmatically using the Rollup Node.js API.
 *
 * Note: the `output` key inside `RollupOptions` is ignored by the `rollup()` API.
 * Output options must be passed separately to `build.write()`.
 *
 * @param {import("./utils/load-config.js").ElenaConfig} config
 * @returns {Promise<void>}
 */
export async function runRollupBuild(config) {
  const src = config.input ?? "src";
  const outdir = config.output?.dir ?? "dist";
  const format = config.output?.format ?? "esm";
  const sourcemap = config.output?.sourcemap ?? true;
  let bundle = config.bundle !== undefined ? config.bundle : "src/index.js";
  const extraPlugins = config.plugins ?? [];

  const entries = readdirSync(src, { recursive: true })
    .filter(f => f.endsWith(".js") || f.endsWith(".ts"))
    .map(f => `${src}/${f}`);

  const hasTs = entries.some(f => f.endsWith(".ts"));

  if (bundle === "src/index.js" && !existsSync(bundle) && existsSync("src/index.ts")) {
    bundle = "src/index.ts";
  }

  // Build 1: individual modules + CSS bundle
  console.log(color(`░█ [ELENA]: Building Progressive Web Components...`));
  console.log(` `);
  for (const entry of entries) {
    console.log(color(`░█ [ELENA]: Generating and minifying ${entry}...`));
  }

  const build1 = await rollup({
    input: entries,
    plugins: buildPlugins({
      src,
      outdir,
      hasSummary: false,
      includeCssBundle: true,
      extraPlugins,
      hasTs,
    }),
    preserveEntrySignatures: "strict",
    treeshake: TREESHAKE,
    onwarn,
  });
  await build1.write({
    format,
    sourcemap,
    dir: outdir,
    ...(hasTs && { entryFileNames: "[name].js" }),
  });
  await build1.close();

  // Build 2: single-file JS bundle (optional)
  if (bundle) {
    console.log(color(`░█ [ELENA]: Generating and minifying JS bundle...`));
    console.log(` `);

    const build2 = await rollup({
      input: bundle,
      plugins: buildPlugins({
        src,
        outdir,
        hasSummary: true,
        includeCssBundle: false,
        extraPlugins,
        hasTs,
      }),
      preserveEntrySignatures: "strict",
      treeshake: TREESHAKE,
      onwarn,
    });
    await build2.write({ format, sourcemap, file: `${outdir}/bundle.js` });
    await build2.close();
  }
}
