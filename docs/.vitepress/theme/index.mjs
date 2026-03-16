import DefaultTheme from "vitepress/theme";
import { defineAsyncComponent } from "vue";
import { useRoute } from "vitepress";
import { initCodeblockFold } from "./codeblock-fold.mjs";
import "./custom.css";
import "./styles/playground.css";
import "../../public/components/bundle.css";

export default {
  extends: DefaultTheme,
  setup() {
    initCodeblockFold(useRoute());
  },
  enhanceApp({ app }) {
    app.component(
      "Playground",
      defineAsyncComponent(() => import("./components/Playground.vue"))
    );
  },
};
