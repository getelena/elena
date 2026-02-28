import { readFileSync, statSync } from "fs";
import { resolve } from "path";

/**
 * Creates a CEM loader that reads and caches custom-elements.json.
 * Re-reads only when the file's mtime changes.
 *
 * @param {string} projectRoot - Root directory of the component project
 * @param {string} [cemPath] - Override path to custom-elements.json
 * @returns {function(): object | null} Loader function
 */
export function createCemLoader(projectRoot, cemPath) {
  const filePath = cemPath || resolve(projectRoot, "dist", "custom-elements.json");
  let cached = null;
  let cachedMtime = 0;

  return function loadCem() {
    try {
      const stat = statSync(filePath);
      const mtime = stat.mtimeMs;

      if (cached && mtime === cachedMtime) {
        return cached;
      }

      const raw = readFileSync(filePath, "utf8");
      cached = JSON.parse(raw);
      cachedMtime = mtime;
      return cached;
    } catch {
      return null;
    }
  };
}
