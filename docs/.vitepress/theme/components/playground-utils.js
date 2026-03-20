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
