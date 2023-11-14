<template>
  <el-aside style="width: auto">
    <slot name="snapshot"></slot>
  </el-aside>
  <el-container>
    <el-main
      ref="editor"
      style="padding: 0; margin: 10px 10px 0 0; position: relative"
    >
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
const editor = ref(null);
const PARENT_PROVIDE = "parentProvide";
// 提供父组件 ref 引用
provide(PARENT_PROVIDE, editor);
</script>

<style lang="scss" scoped></style>
