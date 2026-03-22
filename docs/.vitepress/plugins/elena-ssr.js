import { ssr, register } from "../../../packages/ssr/src/index.js";
import { Button, Spinner } from "../../../packages/components/src/index.js";

register(Button, Spinner);

const DEMO_RE = /<div class="elena-demo">([\s\S]*?)<\/div>/g;

export function elenaSSRPlugin() {
  return {
    name: "elena-ssr",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md") || !code.includes("elena-demo") || code.includes("ssr: false")) {
        return;
      }

      return code.replace(DEMO_RE, (_, content) => {
        try {
          return `<div class="elena-demo">${ssr(content)}</div>`;
        } catch (e) {
          console.warn("░█ [ELENA]: SSR pre-render failed:", e.message);
          return `<div class="elena-demo">${content}</div>`;
        }
      });
    },
  };
}
