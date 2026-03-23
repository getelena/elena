<script setup>
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import { examples } from "./playground-examples.js";
import {
  findExample,
  debounce,
  loadState,
  saveState,
  clearState,
} from "./playground-utils.js";
import PlaygroundEditor from "./PlaygroundEditor.vue";
import PlaygroundPreview from "./PlaygroundPreview.vue";

const props = defineProps({
  currentId: { type: String, default: "" },
});

const emit = defineEmits(["preview-ready", "toggle-sidebar"]);

const activeTab = ref("html");

function getExample(id) {
  return findExample(examples, id) || examples[0]?.items[0];
}

function getOriginalState(id) {
  const example = getExample(id);
  return {
    js: example?.js || "",
    css: example?.css || "",
    html: example?.html || "",
  };
}

function getEditorState(id, useAutosave) {
  return (useAutosave && loadState(id)) || getOriginalState(id);
}

const title = ref(getExample(props.currentId)?.title || "Elena Component");
const editor = reactive(getEditorState(props.currentId, true));
const original = reactive(getOriginalState(props.currentId));

const isDirty = computed(
  () => editor.js !== original.js || editor.css !== original.css || editor.html !== original.html
);

function resetExample() {
  editor.js = original.js;
  editor.css = original.css;
  editor.html = original.html;
  clearSaveTimers();
  saveStatus.value = null;
  hasSaved.value = false;
  clearState(props.currentId);
}
const saveStatus = ref(null);
const hasSaved = ref(!!loadState(props.currentId));
let saveTimers = [];
let skipNextSave = false;

function clearSaveTimers() {
  saveTimers.forEach(t => clearTimeout(t));
  saveTimers = [];
}

const debouncedSave = debounce((id, state) => {
  clearSaveTimers();
  saveStatus.value = "saving";
  saveTimers.push(
    setTimeout(() => {
      saveState(id, state);
      saveStatus.value = null;
      hasSaved.value = true;
    }, 1000)
  );
}, 500);

// Auto-save to localStorage when editor changes
watch(
  () => ({ js: editor.js, css: editor.css, html: editor.html }),
  state => {
    if (skipNextSave) {
      skipNextSave = false;
      return;
    }
    if (isDirty.value) {
      debouncedSave(props.currentId, state);
    } else {
      clearSaveTimers();
      saveStatus.value = null;
      clearState(props.currentId);
    }
  }
);

watch(
  () => props.currentId,
  id => {
    const example = findExample(examples, id);
    if (!example) {
      return;
    }
    title.value = example.title || "Elena Component";
    clearSaveTimers();
    saveStatus.value = null;
    hasSaved.value = !!loadState(id);
    original.js = example.js || "";
    original.css = example.css || "";
    original.html = example.html || "";
    const saved = loadState(id);
    skipNextSave = true;
    editor.js = saved?.js ?? original.js;
    editor.css = saved?.css ?? original.css;
    editor.html = saved?.html ?? original.html;
    activeTab.value = "html";
  }
);

onUnmounted(clearSaveTimers);
</script>

<template>
  <PlaygroundEditor
    :js="editor.js"
    :css="editor.css"
    :html="editor.html"
    :active-tab="activeTab"
    :dirty="isDirty"
    :has-saved="hasSaved"
    :save-status="saveStatus"
    @update:js="editor.js = $event"
    @update:css="editor.css = $event"
    @update:html="editor.html = $event"
    @update:active-tab="activeTab = $event"
    @toggle-sidebar="emit('toggle-sidebar')"
    @reset="resetExample"
  />
  <PlaygroundPreview
    :title="title"
    :js="editor.js"
    :css="editor.css"
    :html="editor.html"
    @preview-ready="emit('preview-ready')"
  />
</template>
