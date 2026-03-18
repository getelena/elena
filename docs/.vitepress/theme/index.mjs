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
  },
};
