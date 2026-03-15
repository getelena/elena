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
 * Elena Bundler Rollup Config
 * https://elenajs.com
 */

import { existsSync, readdirSync } from "fs";
import { rollup, watch } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import minifyHtmlLiterals from "rollup-plugin-minify-html-literals-v3";
import summary from "rollup-plugin-summary";
import {
  cssPlugin,
  cssBundlePlugin,
  cssModuleScriptPlugin,
  cssStaticStylesPlugin,
} from "@elenajs/plugin-rollup-css";
import { color } from "./common/color.js";
import babel from "@rollup/plugin-babel";

const TREESHAKE = {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
};

/**
 * Suppresses noisy Rollup warnings.
 *
 * @param {import("rollup").RollupWarning} warning
 * @param {function} warn
 */
function onwarn(warning, warn) {
  if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
    return;
  }
  warn(warning);
}

/**
 * Builds the plugin list for a single Rollup build target.
 *
 * @param {{ src: string; outdir: string; hasSummary: boolean; includeCssBundle: boolean; extraPlugins?: import("rollup").Plugin[]; hasTs?: boolean; target?: string | string[] | false }} opts
 * @returns {import("rollup").Plugin[]}
 */
function buildPlugins({
  src,
  outdir,
  hasSummary,
  includeCssBundle,
  extraPlugins = [],
  hasTs = false,
  target = false,
  terserOpts = { ecma: 2020, module: true },
}) {
  const plugins = [cssModuleScriptPlugin(), resolve({ extensions: [".js", ".ts", ".css"] })];

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

  if (target) {
    plugins.push(
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { targets: target, bugfixes: true, modules: false }]],
        extensions: [".js", ".ts"],
      })
    );
  }

  plugins.push(
    cssStaticStylesPlugin(),
    minifyHtmlLiterals({
      options: {
        // Minify tagged html/svg templates and any untagged template containing HTML
        shouldMinify: template => {
          const tag = template.tag && template.tag.toLowerCase();
          return (
            (tag && (tag.includes("html") || tag.includes("svg"))) ||
            template.parts.some(({ text }) => /<[a-z]/i.test(text))
          );
        },
      },
    }),
    terser(terserOpts),
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
 * Returns the Rollup config array for the given Elena config. Useful for
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
  const target = options.target ?? false;
  const terserOpts = options.terser ?? { ecma: 2020, module: true };

  if (!existsSync(src)) {
    throw new Error(
      `░█ [ELENA]: Input directory "${src}" does not exist. Check your "input" config option.`
    );
  }

  const entries = readdirSync(src, { recursive: true })
    .filter(
      f =>
        (f.endsWith(".js") || f.endsWith(".ts")) &&
        !f.endsWith(".test.js") &&
        !f.endsWith(".test.ts")
    )
    .map(f => `${src}/${f}`);

  const hasTs = entries.some(f => f.endsWith(".ts"));

  if (bundle === "src/index.js" && !existsSync(bundle) && existsSync("src/index.ts")) {
    bundle = "src/index.ts";
  }

  if (bundle && !existsSync(bundle)) {
    throw new Error(
      `░█ [ELENA]: Bundle entry "${bundle}" does not exist. Check your "bundle" config option.`
    );
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
        target,
        terserOpts,
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
        target,
        terserOpts,
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
 * Runs Rollup build targets programmatically using the Rollup Node.js API.
 * Reuses `createRollupConfig` to avoid duplicating config resolution logic.
 *
 * @param {import("./utils/load-config.js").ElenaConfig} config
 * @returns {Promise<void>}
 */
export async function runRollupBuild(config) {
  const configs = createRollupConfig(config);

  console.log(color(`░█ [ELENA]: Building Progressive Web Components...`));
  console.log(` `);

  let cache;

  for (const { output, ...inputOpts } of configs) {
    if (Array.isArray(inputOpts.input)) {
      for (const entry of inputOpts.input) {
        console.log(color(`░█ [ELENA]: Generating and minifying ${entry}...`));
      }
    } else {
      console.log(color(`░█ [ELENA]: Generating and minifying JS bundle...`));
      console.log(` `);
    }

    const build = await rollup({ ...inputOpts, cache });
    cache = build.cache;
    await build.write(output);
    await build.close();
  }
}

/**
 * Starts a Rollup watch session using the Rollup Node.js watch API.
 * Rebuilds on file changes and optionally re-runs a callback after each build.
 *
 * @param {import("./common/load-config.js").ElenaConfig} config
 * @param {{ onRebuild?: (config: import("./common/load-config.js").ElenaConfig) => Promise<void> }} [opts]
 * @returns {import("rollup").RollupWatcher}
 */
export function watchRollupBuild(config, opts = {}) {
  const configs = createRollupConfig(config);

  console.log(color(`░█ [ELENA]: Watching for changes...`));
  console.log(` `);

  const watchConfigs = configs.map(({ output, ...inputOpts }) => ({
    ...inputOpts,
    output,
    watch: { clearScreen: false },
  }));

  const watcher = watch(watchConfigs);

  watcher.on("event", async event => {
    if (event.code === "BUNDLE_START") {
      console.log(color(`░█ [ELENA]: Rebuilding...`));
    }
    if (event.code === "BUNDLE_END") {
      console.log(color(`░█ [ELENA]: Build completed in ${event.duration}ms.`));
      await event.result.close();
      if (opts.onRebuild) {
        try {
          await opts.onRebuild(config);
        } catch (err) {
          console.error(err);
        }
      }
    }
    if (event.code === "ERROR") {
      console.error(color(`░█ [ELENA]: Build error:`));
      console.error(event.error);
      if (event.result) {
        await event.result.close();
      }
    }
    if (event.code === "END") {
      console.log(color(`░█ [ELENA]: Waiting for changes...`));
    }
  });

  return watcher;
}
