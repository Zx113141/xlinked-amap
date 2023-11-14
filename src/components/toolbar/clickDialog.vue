<template></template>

<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
  position: {
    x: number;
    y: number;
  };
  title: string;
}>();

const emit = defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.click-dialog {
  position: absolute;
  background-color: azure;
  border-radius: var(--el-border-radius-round);
  .click-title {
    padding: 10px;
  }
  .click-body {
    padding: 10px;
  }
}
</style>
