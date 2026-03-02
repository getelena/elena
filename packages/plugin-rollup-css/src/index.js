/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ███   ██████  ████████    ██████
 *  ░██████    ███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena Rollup CSS Plugin
 * https://elenajs.com
 */

import { basename } from "path";
import { readFileSync, readdirSync } from "fs";
import { transform } from "lightningcss";

/**
 * Minifies a CSS string using Lightning CSS.
 *
 * @param {string} css
 * @param {string} [filename]
 * @returns {string}
 */
function minifyCss(css, filename = "style.css") {
  const { code } = transform({
    filename,
    code: Buffer.from(css),
    minify: true,
  });
  return code.toString();
}

/**
 * Rollup plugin that copies and minifies individual CSS files from `srcDir`
 * into the output directory.
 *
 * @param {string} srcDir - Source directory to scan for `.css` files (e.g. `"src"`).
 * @returns {import("rollup").Plugin}
 */
export function cssPlugin(srcDir) {
  return {
    name: "css",
    generateBundle() {
      const cssFiles = readdirSync(srcDir, { recursive: true })
        .filter(f => f.endsWith(".css"))
        .map(f => `${srcDir}/${f}`);

      for (const file of cssFiles) {
        const source = minifyCss(readFileSync(file, "utf8"), basename(file));
        this.emitFile({ type: "asset", fileName: basename(file), source });
      }
    },
  };
}

/**
 * Rollup plugin that concatenates and minifies all CSS files from `srcDir` into
 * a single bundle asset emitted to the output directory.
 *
 * @param {string} srcDir - Source directory to scan for `.css` files (e.g. `"src"`).
 * @param {string} fileName - Output filename relative to the output dir (e.g. `"bundle.css"`).
 * @returns {import("rollup").Plugin}
 */
export function cssBundlePlugin(srcDir, fileName) {
  return {
    name: "css-bundle",
    generateBundle() {
      const cssFiles = readdirSync(srcDir, { recursive: true })
        .filter(f => f.endsWith(".css"))
        .map(f => `${srcDir}/${f}`);

      const source = minifyCss(cssFiles.map(f => readFileSync(f, "utf8")).join("\n"), fileName);

      this.emitFile({ type: "asset", fileName, source });
    },
  };
}
