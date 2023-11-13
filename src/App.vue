<template>
  <el-config-provider v-bind="{ ...defaultConfig }">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import IndexDBCache from "./database";
const defaultConfig = {
  size: "small",
  message: {
    max: 3,
  },
};

onMounted(async () => {
  const db = new IndexDBCache();
  await db.initDB();
  window.db = db;
});
</script>

<style scoped lang="scss"></style>
