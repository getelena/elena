<!--
  Fork of VitePress v1.6.4 VPDocAsideOutline.vue and outline.ts composable.

  The default component reads headers from the DOM (document.querySelectorAll),
  which produces an empty outline during SSR. This version reads from
  useData().page.value.headers instead, so the outline is in the initial HTML.
-->
<script setup>
import { onContentUpdated, useData } from "vitepress";
import { computed, ref, shallowRef, onMounted } from "vue";
import VPDocOutlineItem from "vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue";

const { frontmatter, theme, page } = useData();

const container = ref();
const marker = ref();
const headers = shallowRef([]);

function getLevelRange(outline) {
  if (outline === false) {
    return null;
  }
  const level = (typeof outline === "object" && !Array.isArray(outline) ? outline.level : outline) || 2;
  if (typeof level === "number") {
    return [level, level];
  }
  if (level === "deep") {
    return [2, 6];
  }
  return level;
}

function buildTree(items, min, max) {
  const result = [];
  const stack = [];
  for (const item of items) {
    const node = { ...item, children: [] };
    while (stack.length && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    if (node.level > max || node.level < min) {
      continue;
    }
    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(node);
    } else {
      result.push(node);
    }
    stack.push(node);
  }
  return result;
}

function getHeadersFromPageData() {
  const outline = frontmatter.value.outline ?? theme.value.outline;
  const range = getLevelRange(outline);
  if (!range) {
    return [];
  }
  const [min, max] = range;
  const pageHeaders = (page.value.headers || []).map(h => ({
    level: h.level,
    title: h.title,
    link: "#" + h.slug,
  }));
  return buildTree(pageHeaders, min, max);
}

headers.value = getHeadersFromPageData();

onContentUpdated(() => {
  headers.value = getHeadersFromPageData();
});

const outlineTitle = computed(() => {
  const outline = theme.value.outline;
  return (typeof outline === "object" && !Array.isArray(outline) && outline.label) ||
    theme.value.outlineTitle ||
    "On this page";
});

function throttleAndDebounce(fn, delay) {
  let timeout;
  let called = false;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => { called = false; }, delay);
    } else {
      timeout = setTimeout(fn, delay);
    }
  };
}

let prevActiveLink = null;

function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

function setActiveLink() {
  const links = container.value?.querySelectorAll("a.outline-link");
  if (!links?.length) {
    return;
  }
  const scrollY = window.scrollY;
  const innerHeight = window.innerHeight;
  const offsetHeight = document.body.offsetHeight;
  const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

  const anchors = [];
  for (const link of links) {
    const id = link.hash?.slice(1);
    if (!id) {
      continue;
    }
    const heading = document.getElementById(decodeURIComponent(id));
    if (!heading) {
      continue;
    }
    const top = getAbsoluteTop(heading);
    if (!Number.isNaN(top)) {
      anchors.push({ link, top });
    }
  }
  anchors.sort((a, b) => a.top - b.top);

  if (!anchors.length) {
    activateLink(null);
    return;
  }
  if (scrollY < 1) {
    activateLink(null);
    return;
  }
  if (isBottom) {
    activateLink(anchors[anchors.length - 1].link);
    return;
  }

  let activeLink = null;
  for (const { link, top } of anchors) {
    if (top > scrollY + 74) {
      break;
    }
    activeLink = link;
  }
  activateLink(activeLink);
}

function activateLink(link) {
  if (prevActiveLink) {
    prevActiveLink.classList.remove("active");
  }
  if (link) {
    link.classList.add("active");
    if (marker.value) {
      marker.value.style.top = link.offsetTop + 39 + "px";
      marker.value.style.opacity = "1";
    }
  } else {
    if (marker.value) {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
  prevActiveLink = link;
}

onMounted(() => {
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  requestAnimationFrame(setActiveLink);
  window.addEventListener("scroll", onScroll);
});
</script>

<template>
  <nav
    aria-labelledby="doc-outline-aria-label"
    class="VPDocAsideOutline"
    :class="{ 'has-outline': headers.length > 0 }"
    ref="container"
  >
    <div class="content">
      <div class="outline-marker" ref="marker" />

      <div aria-level="2" class="outline-title" id="doc-outline-aria-label" role="heading">
        {{ outlineTitle }}
      </div>

      <VPDocOutlineItem :headers="headers" :root="true" />
    </div>
  </nav>
</template>

<style scoped>
.VPDocAsideOutline {
  display: none;
}

.VPDocAsideOutline.has-outline {
  display: block;
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
