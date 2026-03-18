<script setup>
import { shallowRef, ref, onMounted, onUnmounted } from "vue";
import PlaygroundLoading from "./PlaygroundLoading.vue";
import PlaygroundSidebar from "./PlaygroundSidebar.vue";
import { examples } from "./playground-examples.js";
import { findExample, getHashId, setHash } from "./playground-utils.js";

const Loaded = shallowRef(null);
const previewReady = ref(false);
const sidebarOpen = ref(false);
const currentId = ref("");

function selectExample(id) {
  const example = findExample(examples, id);
  if (!example) {
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

onMounted(async () => {
  const hashId = getHashId();
  const defaultId = examples[0]?.items[0]?.id || "primitive-component";
  const initial = findExample(examples, hashId || defaultId) || examples[0]?.items[0];
  currentId.value = initial?.id || "";
  if (!hashId) {
    setHash(currentId.value);
  }
  window.addEventListener("hashchange", onHashChange);

  const mod = await import("./Playground.vue");
  Loaded.value = mod.default;
});

onUnmounted(() => {
  window.removeEventListener("hashchange", onHashChange);
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
    <div class="pg-main">
      <component
        :is="Loaded || PlaygroundLoading"
        :current-id="currentId"
        @preview-ready="previewReady = true"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />
      <Transition name="pg-unload">
        <PlaygroundLoading v-if="Loaded && !previewReady" class="pg-loading-overlay" />
      </Transition>
    </div>
  </div>
</template>
