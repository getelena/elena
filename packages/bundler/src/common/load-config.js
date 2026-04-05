import { pathToFileURL } from "url";
import { resolve } from "path";
import { existsSync } from "fs";
import { color } from "./color.js";
import { validateConfig } from "./validate-config.js";

/**
 * @typedef {object} ElenaOutputConfig
 * @property {string} [dir]        Output directory for individual modules, CSS, and CEM artifacts.
 * @property {string} [format]     Rollup output format (default: `"esm"`).
 * @property {boolean} [sourcemap] Whether to emit sourcemaps (default: `true`).
 * @property {string} [filename]   Output filename for the bundle (default: `"bundle.js"`).
 *   The CSS bundle filename is derived by replacing the `.js` extension with `.css`.
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
 * @property {ElenaAnalyzeConfig|false} [analyze] CEM analysis options; `false` to skip analysis.
 * @property {string | string[] | false} [target] Browserslist target(s) for transpilation via
 *   `@babel/preset-env`. When set, enables syntax transforms (e.g. class fields, optional
 *   chaining) to widen browser support. Set to `false` (default) to skip transpilation.
 *   Example: `["chrome 71", "firefox 69", "safari 12.1"]`
 * @property {object} [terser] Custom Terser minifier options, merged with the defaults
 *   `{ ecma: 2020, module: true }`.
 * @property {string|false} [banner] Banner comment prepended to every output file. Use a
 *   `@license` JSDoc tag so minifiers preserve it. Set to `false` (default) to omit.
 */

/** @type {Required<ElenaConfig>} */
const DEFAULTS = {
  input: "src",
  output: { dir: "dist", format: "esm", sourcemap: true },
  bundle: "src/index.js",
  plugins: [],
  analyze: { plugins: [] },
  target: false,
  terser: { ecma: 2020, module: true },
  banner: false,
};

/**
 * Merges user config with defaults.
 *
 * @param {ElenaConfig} user
 * @returns {Required<ElenaConfig>}
 */
function mergeConfig(user) {
  return {
    ...DEFAULTS,
    ...user,
    output: { ...DEFAULTS.output, ...user.output },
    analyze: user.analyze === false ? false : { ...DEFAULTS.analyze, ...user.analyze },
    terser: { ...DEFAULTS.terser, ...user.terser },
  };
}

/**
 * Loads and imports a config file, returning the merged config.
 *
 * @param {string} configPath
 * @returns {Promise<Required<ElenaConfig>>}
 */
async function importConfig(configPath) {
  const mod = await import(pathToFileURL(configPath).href);
  const user = mod.default ?? {};
  validateConfig(user);
  return mergeConfig(user);
}

/**
 * Loads the Elena config from the specified path, or from
 * `elena.config.mjs` / `elena.config.js` in `cwd`,
 * falling back to defaults if no config file is found.
 *
 * @param {string} [cwd]
 * @param {string} [explicitPath]
 * @returns {Promise<Required<ElenaConfig>>}
 */
export async function loadConfig(cwd = process.cwd(), explicitPath) {
  if (explicitPath) {
    const configPath = resolve(cwd, explicitPath);
    if (!existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }
    return importConfig(configPath);
  }

  for (const name of ["elena.config.mjs", "elena.config.js"]) {
    const configPath = resolve(cwd, name);
    if (!existsSync(configPath)) {
      continue;
    }
    return importConfig(configPath);
  }

  const wrongExtensions = [".ts", ".json", ".yaml", ".yml", ".cjs"];
  for (const ext of wrongExtensions) {
    const wrongPath = resolve(cwd, `elena.config${ext}`);
    if (existsSync(wrongPath)) {
      console.warn(
        color(`░█ [ELENA]: Found "elena.config${ext}" but only .mjs and .js are supported.`)
      );
      break;
    }
  }

  console.log(color(`░█ [ELENA]: No config file found, using defaults.`));
  return { ...DEFAULTS };
}
