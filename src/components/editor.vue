<template>
  <el-aside style="width: auto">
    <slot name="snapshot"></slot>
  </el-aside>
  <el-container>
    <el-main style="padding: 0; margin: 10px 10px 0 0; position: relative">
      <slot name="toolbar"></slot>
      <map-area></map-area>
    </el-main>
    <el-footer>
      <footer-vue></footer-vue>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import footerVue from "../layouts/footer.vue";

import mapArea from "./map-area.vue";
</script>

<style lang="scss" scoped></style>
