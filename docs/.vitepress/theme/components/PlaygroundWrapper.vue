<script setup>
import { shallowRef, ref, onMounted, onUnmounted, computed } from "vue";
import PlaygroundLoading from "./PlaygroundLoading.vue";
import PlaygroundSidebar from "./PlaygroundSidebar.vue";
import { examples } from "./playground-examples.js";
import { findExample, getHashId, setHash } from "./playground-utils.js";

const Loaded = shallowRef(null);
const loadError = ref(false);
const previewReady = ref(false);
const sidebarOpen = ref(false);
const currentId = ref("");
const mainRef = ref(null);
const editorWidth = ref(null);
const isDragging = ref(false);
const editorDirty = ref(false);

const mainStyle = computed(() => {
  if (editorWidth.value == null) {
    return {};
  }
  return { gridTemplateColumns: `${editorWidth.value}px 0px 1fr` };
});

function onResizeStart(e) {
  e.preventDefault();
  isDragging.value = true;
  document.addEventListener("pointermove", onResizeMove);
  document.addEventListener("pointerup", onResizeEnd);
}

function onResizeMove(e) {
  if (!mainRef.value) {
    return;
  }
  const rect = mainRef.value.getBoundingClientRect();
  const min = 200;
  const max = rect.width - 200;
  editorWidth.value = Math.min(max, Math.max(min, e.clientX - rect.left));
}

function onResizeEnd() {
  isDragging.value = false;
  document.removeEventListener("pointermove", onResizeMove);
  document.removeEventListener("pointerup", onResizeEnd);
}

function selectExample(id) {
  const example = findExample(examples, id);
  if (!example) {
    return;
  }
  if (editorDirty.value && !confirm("You have unsaved changes. Leave this example?")) {
    return;
  }
  currentId.value = example.id;
  setHash(example.id);
  sidebarOpen.value = false;
}

function onHashChange() {
  const id = getHashId();
  if (id && id !== currentId.value) {
    selectExample(id);
  }
}

function onWindowResize() {
  editorWidth.value = null;
}

async function loadPlayground() {
  loadError.value = false;
  try {
    const mod = await import("./Playground.vue");
    Loaded.value = mod.default;
  } catch {
    // Retry once on failure (e.g. network hiccup, stale cache)
    try {
      const mod = await import("./Playground.vue");
      Loaded.value = mod.default;
    } catch {
      loadError.value = true;
    }
  }
}

onMounted(async () => {
  window.addEventListener("resize", onWindowResize);
  const hashId = getHashId();
  const defaultId = examples[0]?.items[0]?.id || "primitive-component";
  const initial = findExample(examples, hashId || defaultId) || examples[0]?.items[0];
  currentId.value = initial?.id || "";
  if (!hashId) {
    setHash(currentId.value);
  }
  window.addEventListener("hashchange", onHashChange);

  await loadPlayground();
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
  window.removeEventListener("hashchange", onHashChange);
  document.removeEventListener("pointermove", onResizeMove);
  document.removeEventListener("pointerup", onResizeEnd);
});
</script>

<template>
  <div class="pg-layout">
    <PlaygroundSidebar
      :examples="examples"
      :current-id="currentId"
      :open="sidebarOpen"
      @select="selectExample"
      @toggle="sidebarOpen = !sidebarOpen"
    />
    <div ref="mainRef" class="pg-main" :class="{ 'pg-resizing': isDragging }" :style="mainStyle">
      <component
        :is="Loaded || PlaygroundLoading"
        :current-id="currentId"
        @preview-ready="previewReady = true"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @update:dirty="editorDirty = $event"
      />
      <div v-if="previewReady" class="pg-resize-handle" @pointerdown="onResizeStart"></div>
      <Transition name="pg-unload">
        <PlaygroundLoading v-if="Loaded && !previewReady" class="pg-loading-overlay" />
      </Transition>
      <div v-if="loadError" class="pg-load-error">
        <p>Failed to load the playground.</p>
        <button @click="loadPlayground">Try again</button>
      </div>
    </div>
  </div>
</template>
