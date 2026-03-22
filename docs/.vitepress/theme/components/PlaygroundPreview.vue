<script setup>
import { ref, watch } from "vue";
import { generateSrcdoc, debounce, buildCodePenData } from "./playground-utils.js";

const props = defineProps({
  title: { type: String, default: "Elena Component" },
  js: { type: String, default: "" },
  css: { type: String, default: "" },
  html: { type: String, default: "" },
});

const emit = defineEmits(["preview-ready"]);

const iframe = ref(null);
const srcdoc = ref(generateSrcdoc(props.js, props.css, props.html));
const ready = ref(false);
let firstLoad = true;

function onIframeLoad() {
  ready.value = true;
  if (firstLoad) {
    firstLoad = false;
    emit("preview-ready");
  }
}

function updatePreview() {
  ready.value = false;
  srcdoc.value = generateSrcdoc(props.js, props.css, props.html);
}

function editInCodePen() {
  const data = buildCodePenData(props.title, props.js, props.css, props.html);
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://codepen.io/pen/define";
  form.target = "_blank";
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "data";
  input.value = data;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

const debouncedUpdate = debounce(updatePreview, 300);

watch([() => props.js, () => props.css, () => props.html], (newVals, oldVals) => {
  // If all three changed at once, it's likely an example switch: update immediately
  const allChanged =
    oldVals && newVals[0] !== oldVals[0] && newVals[1] !== oldVals[1] && newVals[2] !== oldVals[2];
  if (allChanged) {
    updatePreview();
  } else {
    debouncedUpdate();
  }
});
</script>

<template>
  <div class="pg-preview">
    <div class="pg-preview-header">
      <span class="pg-preview-title">Preview</span>
      <div class="pg-preview-actions">
        <button class="pg-preview-action" @click="editInCodePen" title="Edit in CodePen">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <polyline points="22 8.5 12 15.5 2 8.5" />
            <polyline points="2 15.5 12 8.5 22 15.5" />
            <line x1="12" y1="2" x2="12" y2="8.5" />
          </svg>
        </button>
        <button class="pg-preview-action" @click="updatePreview" title="Reload preview">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.65 2.35A7.96 7.96 0 0 0 8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
    <iframe
      ref="iframe"
      class="pg-preview-iframe"
      :class="{ 'pg-preview-ready': ready }"
      :srcdoc="srcdoc"
      sandbox="allow-scripts allow-same-origin"
      title="Component preview"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>
