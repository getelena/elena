import { watch, nextTick, onMounted } from "vue";
import { inBrowser } from "vitepress";

const COLLAPSED_HEIGHT = 500;
const ATTR = "data-folded";

function initCodeblockFold(route) {
  if (!inBrowser) {
    return;
  }

  onMounted(() => {
    watch(
      () => route.path,
      () => nextTick(() => processCodeblocks()),
      { immediate: true }
    );
  });
}

function processCodeblocks() {
  document.querySelectorAll(`div[class*="language-"]`).forEach(block => {
    if (block.querySelector(".codeblock-fold-btn")) {
      return;
    }

    const pre = block.querySelector("pre");
    if (!pre || pre.scrollHeight <= COLLAPSED_HEIGHT) {
      return;
    }

    block.setAttribute(ATTR, "");

    const btn = document.createElement("button");
    btn.className = "codeblock-fold-btn";
    btn.type = "button";
    btn.textContent = "Show more";
    btn.addEventListener("click", () => {
      const folded = block.hasAttribute(ATTR);
      if (folded) {
        block.removeAttribute(ATTR);
        btn.textContent = "Show less";
      } else {
        block.setAttribute(ATTR, "");
        btn.textContent = "Show more";
        block.scrollIntoView({ block: "nearest" });
      }
    });

    block.appendChild(btn);
  });
}

export { initCodeblockFold };
