import elenaSource from "../../../../packages/core/dist/bundle.js?raw";

// Strip the sourcemap comment so the browser doesn't try to fetch it from a null base URL.
const _cleanSource = elenaSource.replace(/\/\/# sourceMappingURL=.*$/m, "").trim();
const _elenaUrl =
  typeof Blob !== "undefined"
    ? URL.createObjectURL(new Blob([_cleanSource], { type: "text/javascript" }))
    : `data:text/javascript;charset=utf-8,${encodeURIComponent(_cleanSource)}`;
const _importMap = JSON.stringify({ imports: { "@elenajs/core": _elenaUrl } });

/**
 * Generate the full srcdoc HTML string for the preview iframe.
 */
export function generateSrcdoc(js, css, htmlContent) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="importmap">${_importMap}</script>
<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 1rem;
  color: #1a1a1a;
}
${css}
</style>
</head>
<body>
${htmlContent}
<script>
window.addEventListener("error", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    e.message + "\\n" + (e.filename ? "at " + e.filename + ":" + e.lineno : "") +
    "</pre>";
});
window.addEventListener("unhandledrejection", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    (e.reason?.message || String(e.reason)) +
    "</pre>";
});
</script>
<script type="module">
${js}
</script>
</body>
</html>`;
}

/**
 * Find an example by its ID from the categories array.
 */
export function findExample(categories, id) {
  for (const category of categories) {
    const found = category.items.find(item => item.id === id);
    if (found) {
      return found;
    }
  }
  return null;
}

/**
 * Read the example ID from the URL hash.
 */
export function getHashId() {
  if (typeof window === "undefined") {
    return null;
  }
  const hash = window.location.hash.slice(1);
  return hash || null;
}

/**
 * Set the URL hash without triggering a scroll.
 */
export function setHash(id) {
  if (typeof window === "undefined") {
    return;
  }
  history.replaceState(null, "", "#" + id);
}

/**
 * Create a debounced version of a function.
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Rewrite bare `@elenajs/core` imports to the unpkg CDN URL.
 */
function rewriteImports(js) {
  const cdnUrl = "https://unpkg.com/@elenajs/core";
  return js
    .replace(/from\s+["']@elenajs\/core["']/g, `from "${cdnUrl}"`)
    .replace(/import\s*\(\s*["']@elenajs\/core["']\s*\)/g, `import("${cdnUrl}")`);
}

/**
 * Download the current playground state as a standalone HTML file.
 */
export function downloadProject(title, js, css, html) {
  const rewrittenJs = rewriteImports(js);
  const cssBlock = css ? `<style>\n${css}\n</style>\n` : "";
  const file = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title || "Elena Component"}</title>
${cssBlock}</head>
<body>
${html}
<script type="module">
${rewrittenJs}
</script>
</body>
</html>`;

  const slug = (title || "component")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const blob = new Blob([file], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `elena-${slug}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Save editor state for an example to localStorage.
 */
export function saveState(id, { js, css, html }) {
  try {
    localStorage.setItem(`elena-pg:${id}`, JSON.stringify({ js, css, html }));
  } catch {
    // Ignore quota or access errors (e.g. private browsing)
  }
}

/**
 * Load saved editor state for an example from localStorage.
 * Returns null if nothing is saved or the data is invalid.
 */
export function loadState(id) {
  try {
    const raw = localStorage.getItem(`elena-pg:${id}`);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.js === "string" && typeof parsed.html === "string") {
      return { js: parsed.js, css: parsed.css || "", html: parsed.html };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Remove saved editor state for an example from localStorage.
 */
export function clearState(id) {
  try {
    localStorage.removeItem(`elena-pg:${id}`);
  } catch {
    // Ignore access errors
  }
}

/**
 * Load the autosave preference from localStorage. Defaults to true.
 */
export function loadAutosave() {
  try {
    return localStorage.getItem("elena-pg:autosave") !== "false";
  } catch {
    return true;
  }
}

/**
 * Save the autosave preference to localStorage.
 */
export function saveAutosave(enabled) {
  try {
    localStorage.setItem("elena-pg:autosave", String(enabled));
  } catch {
    // Ignore access errors
  }
}

/**
 * Build the JSON data string for CodePen's prefill API.
 *
 * Rewrites bare `@elenajs/core` imports to the unpkg CDN URL so the code
 * works standalone in CodePen. JS goes in its own panel with module mode.
 */
export function buildCodePenData(title, js, css, html) {
  const rewrittenJs = rewriteImports(js);

  return JSON.stringify({
    title: `Elena | ${title || "Component"}`,
    html: html || "",
    css: css || "",
    js: rewrittenJs || "",
    js_module: true,
    editors: "111",
  });
}
