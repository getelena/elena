import DefaultTheme from "vitepress/theme-without-fonts";
import { useRoute } from "vitepress";
import { initCodeblockFold } from "./codeblock-fold.mjs";
import PlaygroundWrapper from "./components/PlaygroundWrapper.vue";
import "./custom.css";
import "./styles/playground.css";
import "../../public/components/bundle.css";

export default {
  extends: DefaultTheme,
  setup() {
    initCodeblockFold(useRoute());
  },
  enhanceApp({ app }) {
    app.component("Playground", PlaygroundWrapper);

    // Prefetch the Playground chunk when the user hovers over the nav link
    if (typeof window !== "undefined") {
      let prefetched = false;
      document.addEventListener(
        "pointerenter",
        e => {
          if (prefetched) {
            return;
          }
          const link = e.target.closest('a[href*="/playground"]');
          if (link) {
            prefetched = true;
            import("./components/Playground.vue");
          }
        },
        true
      );
    }
  },
};
