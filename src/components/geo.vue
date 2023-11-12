<template>
  <div class="data-source">
    <el-drawer
      @close="() => (drawer = false)"
      v-model="drawer"
      :with-header="false"
      direction="btt"
      close-on-click-modal
      show-close
      destroy-on-close
      size="38%"
    >
      <data-table
        :mapId="mapId"
        :type="type"
        :table-data="tableData"
      ></data-table>
    </el-drawer>
    <el-button
      v-if="mapId"
      v-for="btn in geo_button"
      @click="() => handleBtnClick(btn)"
      >{{ btn.label }}</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import dataTable from "./dataTable.vue";
import { geo_button } from "@/config/geo-button";
import { useMapDataSource } from "@/store/data-source";

const store = useMapDataSource();

const drawer = ref(false);
const mapId = ref("");
const type = ref();
const route = useRoute();
const tableData = ref([]);

const handleBtnClick = (btn) => {
  type.value = btn;
  const data = store.geoJson.get(btn.value) || [];
  tableData.value = data.map((item) => {
    return {
      ...item.other,
    };
  });
  console.log(data, store.geoJson);
  // console.log(store.geoJson);
  drawer.value = true;
};

watch(
  () => route.query.id,
  (id) => {
    mapId.value = id as string;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
