import { pathToFileURL } from "url";
import { resolve } from "path";
import { existsSync } from "fs";

/**
 * @typedef {object} ElenaOutputConfig
 * @property {string} [dir]        Output directory for individual modules, CSS, and CEM artifacts.
 * @property {string} [format]     Rollup output format (default: `"esm"`).
 * @property {boolean} [sourcemap] Whether to emit sourcemaps (default: `true`).
 */

/**
 * @typedef {object} ElenaAnalyzeConfig
 * @property {import("@custom-elements-manifest/analyzer").Plugin[]} [plugins]
 *   Additional CEM analyzer plugins appended after Elena's built-in set.
 */

/**
 * @typedef {object} ElenaConfig
 * @property {string}             [input]   Source directory scanned for .js and .css files.
 * @property {ElenaOutputConfig}  [output]  Rollup output options.
 * @property {string|false}       [bundle]  Entry for the single-file bundle; `false` to disable.
 * @property {import("rollup").Plugin[]} [plugins] Additional Rollup plugins appended after built-ins.
 * @property {ElenaAnalyzeConfig} [analyze] CEM analysis options.
 * @property {string | string[] | false} [target] Browserslist target(s) for transpilation via
 *   `@babel/preset-env`. When set, enables syntax transforms (e.g. class fields, optional
 *   chaining) to widen browser support. Set to `false` (default) to skip transpilation.
 *   Example: `["chrome 71", "firefox 69", "safari 12.1"]`
 */

/** @type {Required<ElenaConfig>} */
const DEFAULTS = {
  input: "src",
  output: { dir: "dist", format: "esm", sourcemap: true },
  bundle: "src/index.js",
  plugins: [],
  analyze: { plugins: [] },
  target: false,
};

/**
 * Loads the Elena config from `elena.config.mjs` or `elena.config.js` in `cwd`,
 * falling back to defaults if no config file is found.
 *
 * @param {string} [cwd]
 * @returns {Promise<Required<ElenaConfig>>}
 */
export async function loadConfig(cwd = process.cwd()) {
  for (const name of ["elena.config.mjs", "elena.config.js"]) {
    const configPath = resolve(cwd, name);
    if (!existsSync(configPath)) {
      continue;
    }
    const mod = await import(pathToFileURL(configPath).href);
    const user = mod.default ?? {};
    return {
      ...DEFAULTS,
      ...user,
      output: { ...DEFAULTS.output, ...user.output },
      analyze: { ...DEFAULTS.analyze, ...user.analyze },
    };
  }
  return { ...DEFAULTS };
}
