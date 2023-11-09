<template>
  <el-container style="height: 100%; background-color: #e9ecee">
    <el-header style="padding: 0; height: auto">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="tab in tabs_tool"
          :label="tab.label"
          :name="tab.value"
        >
          {{ tab.label }}
          <component :is="tabs_component[tab.value]" props="1"></component>
        </el-tab-pane>
      </el-tabs>
    </el-header>

    <el-container>
      <editor>
        <template #snapshot>
          <snapshot @snapshot="(shotId) => (snap = shotId.value)"> </snapshot>
        </template>
        <template #toolbar>
          <toolbar> </toolbar>
        </template>
      </editor>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import snapshot from "../components/shapshot.vue";
import toolbar from "../components/toolbar.vue";
import { tabs_tool } from "@/config/tabs";
import editor from "@/components/editor.vue";

const activeName = ref("geo");
const snap = ref("");

provide("snap", snap);

const tabs_component = {};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  // height: 30px;
  margin: 0 10px;
  // width: 90%;
  border: 1px solid var(--el-card-border-color);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
