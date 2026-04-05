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

const DEFINE_CALL_RE = /^\s*\w+\.define\(\);\s*$/gm;
const SIDE_EFFECT_IMPORT_RE = /^\s*import\s+["'][^"']+["']\s*;\s*$/gm;

/**
 * Rollup plugin that strips `.define()` calls and side-effect-only
 * component imports from the output. Used with `registration: "scoped"`.
 *
 * @returns {import("rollup").Plugin}
 */
function stripRegistrationPlugin() {
  return {
    name: "elena-strip-registration",
    transform(code, id) {
      if (!id.endsWith(".js") && !id.endsWith(".ts")) {
        return null;
      }
      const stripped = code.replace(DEFINE_CALL_RE, "").replace(SIDE_EFFECT_IMPORT_RE, "");
      if (stripped === code) {
        return null;
      }
      return { code: stripped, map: null };
    },
  };
}

/**
 * Rollup plugin that emits a `register.js` module exporting a
 * `defineAll(registry?)` helper and re-exporting all component classes.
 * Used with `registration: "scoped"`.
 *
 * @param {string} src - Source directory (e.g. `"src"`).
 * @returns {import("rollup").Plugin}
 */
function emitRegisterPlugin(src) {
  return {
    name: "elena-emit-register",
    generateBundle(_, bundle) {
      // Collect component modules from the emitted chunks.
      const components = [];
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== "chunk") {
          continue;
        }
        // Check the original module source for static tagName.
        for (const moduleId of Object.keys(chunk.modules)) {
          const info = this.getModuleInfo(moduleId);
          if (!info || !info.code) {
            continue;
          }
          if (/static\s+tagName\s*=/.test(info.code)) {
            const match = info.code.match(/(?:export\s+default\s+)?class\s+(\w+)/);
            if (match) {
              components.push({ className: match[1], importPath: `./${fileName}` });
            }
          }
        }
      }

      if (components.length === 0) {
        return;
      }

      const imports = components
        .map(c => `import { default as ${c.className} } from "${c.importPath}";`)
        .join("\n");
      const definealls = components.map(c => `  ${c.className}.define(registry);`).join("\n");
      const exports = components.map(c => c.className).join(", ");

      const source = [
        imports,
        "",
        `export function defineAll(registry) {`,
        definealls,
        `}`,
        "",
        `export { ${exports} };`,
        "",
      ].join("\n");

      this.emitFile({
        type: "asset",
        fileName: "register.js",
        source,
      });
    },
  };
}

/**
 * Suppress noisy Rollup warnings.
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
 * Build the plugin list for a single Rollup build target.
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

  plugins.push(cssStaticStylesPlugin(), terser(terserOpts), cssPlugin(src));

  if (includeCssBundle) {
    plugins.push(cssBundlePlugin(src, "bundle.css"));
  }

  plugins.push(...extraPlugins);

  if (hasSummary) {
    plugins.push(summary({ showBrotliSize: true, showGzippedSize: true }));
  }

  return plugins;
}

/**
 * Return the Rollup config array for the given Elena config.
 *
 * @param {import("./common/load-config.js").ElenaConfig} [options]
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
  const banner = options.banner || undefined;
  const scoped = options.registration === "scoped";

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

  const scopedPlugins = scoped ? [stripRegistrationPlugin(), emitRegisterPlugin(src)] : [];

  const configs = [
    {
      input: entries,
      plugins: [
        ...scopedPlugins,
        ...buildPlugins({
          src,
          outdir,
          hasSummary: false,
          includeCssBundle: true,
          extraPlugins,
          hasTs,
          target,
          terserOpts,
        }),
      ],
      output: {
        ...(banner && {
          banner: chunk => (chunk.fileName === "index.js" ? banner : ""),
        }),
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
    const bundleScoped = scoped ? [stripRegistrationPlugin()] : [];
    configs.push({
      input: bundle,
      plugins: [
        ...bundleScoped,
        ...buildPlugins({
          src,
          outdir,
          hasSummary: true,
          includeCssBundle: false,
          extraPlugins,
          hasTs,
          target,
          terserOpts,
        }),
      ],
      output: { banner, format, sourcemap, file: `${outdir}/bundle.js` },
      preserveEntrySignatures: "strict",
      treeshake: TREESHAKE,
      onwarn,
    });
  }

  return configs;
}

/**
 * Run Rollup build targets programmatically using the Rollup Node.js API.
 * Reuse `createRollupConfig` to avoid duplicating config resolution logic.
 *
 * @param {import("./common/load-config.js").ElenaConfig} config
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
 * Start a Rollup watch session using the Rollup Node.js watch API.
 * Rebuild on changes and optionally re-run a callback after build.
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
