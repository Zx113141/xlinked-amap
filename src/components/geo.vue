<template>
  <div>
    <el-drawer
      @close="() => (drawer = false)"
      v-model="drawer"
      :with-header="false"
      direction="btt"
      close-on-click-modal
      show-close
      size="38%"
    >
      <data-table></data-table>
    </el-drawer>
    <el-button @click="() => (drawer = true)">平面数据</el-button>
  </div>
</template>

<script lang="ts" setup>
import dataTable from "./dataTable.vue";
const drawer = ref(false);
</script>

<style lang="scss" scoped></style>
