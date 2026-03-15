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
 * Elena Bundler CEM Analyze
 * https://elenajs.com
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { globby } from "globby";
import { customElementJsxPlugin as elenaJsxPlugin } from "custom-element-jsx-integration";
import { elenaDefinePlugin } from "@elenajs/plugin-cem-define";
import { elenaTagPlugin } from "@elenajs/plugin-cem-tag";
import { elenaTypeScriptPlugin } from "@elenajs/plugin-cem-typescript";
import { color } from "./common/color.js";

/**
 * Returns the CEM config object for the given Elena config. Useful for advanced
 * users who still call the CEM CLI with a thin `elena.config.js` wrapper.
 *
 * @param {import("./common/load-config.js").ElenaConfig} [options]
 * @returns {object} CEM config object
 */
export function createCemConfig(options = {}) {
  const src = options.input ?? "src";
  const outdir = options.output?.dir ?? "dist";
  const extraPlugins = options.analyze?.plugins ?? [];

  return {
    outdir,
    watch: false,
    dev: false,
    globs: [`${src}/**/*.js`, `${src}/**/*.ts`],
    exclude: ["**/*.test.js", "**/*.test.ts", "node_modules"],
    plugins: [
      elenaDefinePlugin(),
      elenaTagPlugin("status"),
      elenaTagPlugin("displayName"),
      elenaJsxPlugin({ outdir, fileName: "custom-elements.d.ts" }),
      elenaTypeScriptPlugin({ outdir }),
      ...extraPlugins,
    ],
  };
}

/**
 * Runs the CEM analyzer programmatically using `create()` from
 * `@custom-elements-manifest/analyzer`, writes the manifest to disk.
 *
 * @param {import("./common/load-config.js").ElenaConfig} config
 * @param {string} [cwd]
 * @returns {Promise<void>}
 */
export async function runCemAnalyze(config, cwd = process.cwd()) {
  if (config.analyze === false) {
    return;
  }

  const src = config.input ?? "src";
  const outdir = config.output?.dir ?? "dist";
  const extraPlugins = config.analyze?.plugins ?? [];

  const srcPath = resolve(cwd, src);
  if (!existsSync(srcPath)) {
    throw new Error(
      `░█ [ELENA]: Input directory "${src}" does not exist. Check your "input" config option.`
    );
  }

  console.log(` `);
  console.log(color(`░█ [ELENA]: Analyzing the build output...`));
  console.log(color(`░█ [ELENA]: Generating Custom Elements Manifest...`));
  console.log(color(`░█ [ELENA]: Generating TypeScript types...`));
  console.log(` `);

  const globs = await globby(
    [`${src}/**/*.js`, `${src}/**/*.ts`, "!**/*.test.js", "!**/*.test.ts", "!node_modules"],
    { cwd }
  );

  const modules = globs.map(glob => {
    const fullPath = resolve(cwd, glob);
    const source = readFileSync(fullPath).toString();
    const scriptKind = glob.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.JS;
    return ts.createSourceFile(glob, source, ts.ScriptTarget.ES2015, true, scriptKind);
  });

  const plugins = [
    elenaDefinePlugin(),
    elenaTagPlugin("status"),
    elenaTagPlugin("displayName"),
    elenaJsxPlugin({ outdir, fileName: "custom-elements.d.ts" }),
    elenaTypeScriptPlugin({ outdir: join(cwd, outdir) }),
    ...extraPlugins,
  ];

  const manifest = create({ modules, plugins, context: { dev: false } });

  const outPath = join(cwd, outdir);
  if (!existsSync(outPath)) {
    mkdirSync(outPath, { recursive: true });
  }

  writeFileSync(join(outPath, "custom-elements.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}
