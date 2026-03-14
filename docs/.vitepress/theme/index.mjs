import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import { initCodeblockFold } from "./codeblock-fold.mjs";
import "./custom.css";
import "../../public/components/bundle.css";

export default {
  extends: DefaultTheme,
  setup() {
    initCodeblockFold(useRoute());
  },
};
