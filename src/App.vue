<template>
  <el-config-provider v-bind="{ ...defaultConfig }">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
const defaultConfig = {
  size: "small",
  message: {
    max: 3,
  },
};
</script>

<style scoped lang="scss"></style>
