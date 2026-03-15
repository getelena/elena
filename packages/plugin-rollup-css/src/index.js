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
 * Elena Rollup CSS Plugin
 * https://elenajs.com
 */

import { basename, resolve, dirname } from "path";
import { readFileSync, readdirSync } from "fs";
import { transform } from "lightningcss";

/**
 * Minifies a CSS string using Lightning CSS.
 *
 * @param {string} css
 * @param {string} [filename]
 * @returns {string}
 */
export function minifyCss(css, filename = "style.css") {
  const { code } = transform({
    filename,
    code: Buffer.from(css),
    minify: true,
  });
  return code.toString();
}

/**
 * Rollup plugin that handles CSS Module Script imports (`with { type: "css" }`).
 * Loads the CSS file content, minifies it, and returns a JS module that
 * constructs and exports a CSSStyleSheet for Shadow DOM adoption. This prevents
 * Rollup from attempting to parse CSS files as JavaScript.
 *
 * @returns {import("rollup").Plugin}
 */
export function cssModuleScriptPlugin() {
  const PREFIX = "\0css-module:";

  return {
    name: "css-module-script",
    resolveId(source, importer, options) {
      if (!source.endsWith(".css") || options?.attributes?.type !== "css") {
        return null;
      }
      return { id: PREFIX + resolve(dirname(importer), source) };
    },
    load(id) {
      if (!id.startsWith(PREFIX)) {
        return null;
      }
      const filePath = id.slice(PREFIX.length);
      const css = minifyCss(readFileSync(filePath, "utf8"), basename(filePath));
      return `const sheet = new CSSStyleSheet();\nsheet.replaceSync(${JSON.stringify(css)});\nexport default sheet;`;
    },
  };
}

/**
 * Rollup plugin that minifies CSS strings assigned to `static styles` class fields.
 *
 * @returns {import("rollup").Plugin}
 */
export function cssStaticStylesPlugin() {
  return {
    name: "css-static-styles",
    transform(code, id) {
      if (!id.endsWith(".js") && !id.endsWith(".ts")) {
        return null;
      }
      if (!code.includes("static styles")) {
        return null;
      }
      const newCode = code.replace(/static\s+styles\s*=\s*`([\s\S]*?)`/g, (_match, css) => {
        return `static styles = \`${minifyCss(css)}\``;
      });
      return newCode !== code ? { code: newCode } : null;
    },
  };
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
        this.addWatchFile(resolve(file));
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
      const shadowDomCssFiles = new Set();
      for (const id of this.getModuleIds()) {
        if (id.startsWith("\0css-module:")) {
          shadowDomCssFiles.add(id.slice("\0css-module:".length));
        }
      }

      const cssFiles = readdirSync(srcDir, { recursive: true })
        .filter(f => f.endsWith(".css"))
        .map(f => resolve(`${srcDir}/${f}`))
        .filter(f => !shadowDomCssFiles.has(f));

      const source = minifyCss(cssFiles.map(f => readFileSync(f, "utf8")).join("\n"), fileName);

      this.emitFile({ type: "asset", fileName, source });
    },
  };
}
