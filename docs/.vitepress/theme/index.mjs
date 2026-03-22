import { defineAsyncComponent } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import { useRoute } from "vitepress";
import { initCodeblockFold } from "./codeblock-fold.mjs";
import "./custom.css";
import "./styles/playground.css";
import "../../public/components/bundle.css";

const PlaygroundWrapper = defineAsyncComponent(() => import("./components/PlaygroundWrapper.vue"));

export default {
  extends: DefaultTheme,
  setup() {
    initCodeblockFold(useRoute());
  },
  enhanceApp({ app }) {
    app.component("Playground", PlaygroundWrapper);
  },
};
