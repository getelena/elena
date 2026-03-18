<script setup>
import { shallowRef, onMounted } from "vue";
import PlaygroundLoading from "./PlaygroundLoading.vue";

const Loaded = shallowRef(null);

onMounted(async () => {
  const mod = await import("./Playground.vue");
  Loaded.value = mod.default;
});
</script>

<template>
  <component :is="Loaded || PlaygroundLoading" />
</template>
