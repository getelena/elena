<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { examples } from "./playground-examples.js";
import { findExample, getHashId, setHash } from "./playground-utils.js";
import PlaygroundSidebar from "./PlaygroundSidebar.vue";
import PlaygroundEditor from "./PlaygroundEditor.vue";
import PlaygroundPreview from "./PlaygroundPreview.vue";

const emit = defineEmits(["preview-ready"]);

const sidebarOpen = ref(false);
const activeTab = ref("js");

// Initialize synchronously so PlaygroundPreview can set srcdoc on first render
const hashId = getHashId();
const defaultId = examples[0]?.items[0]?.id || "hello-world";
const initialExample = findExample(examples, hashId || defaultId) || examples[0]?.items[0];

const editor = reactive({
  js: initialExample?.js || "",
  css: initialExample?.css || "",
  html: initialExample?.html || "",
});

const currentId = ref(initialExample?.id || "");

function selectExample(id) {
  const example = findExample(examples, id);
  if (!example) { return; }

  currentId.value = example.id;
  editor.js = example.js;
  editor.css = example.css;
  editor.html = example.html;
  activeTab.value = "js";
  setHash(example.id);
  sidebarOpen.value = false;
}

function onHashChange() {
  const id = getHashId();
  if (id && id !== currentId.value) {
    selectExample(id);
  }
}

onMounted(() => {
  if (!hashId) {
    setHash(currentId.value);
  }
  window.addEventListener("hashchange", onHashChange);
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
    <PlaygroundEditor
      :js="editor.js"
      :css="editor.css"
      :html="editor.html"
      :active-tab="activeTab"
      @update:js="editor.js = $event"
      @update:css="editor.css = $event"
      @update:html="editor.html = $event"
      @update:active-tab="activeTab = $event"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />
    <PlaygroundPreview
      :js="editor.js"
      :css="editor.css"
      :html="editor.html"
      @preview-ready="emit('preview-ready')"
    />
  </div>
</template>
