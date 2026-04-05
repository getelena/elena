<script setup>
import { version } from "../../../../packages/core/package.json";
</script>

<template>
  <Badge type="info" :text="version" />
</template>
