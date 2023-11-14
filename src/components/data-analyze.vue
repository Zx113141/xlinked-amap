<template>
  <div class="data-analyze">
    <el-drawer
      @close="() => (drawer = false)"
      v-model="drawer"
      :with-header="false"
      direction="rtl"
      close-on-click-modal
      show-close
      destroy-on-close
      size="60%"
    >
      <!-- <data-table
        :mapId="mapId"
        :type="type"
        :table-data="tableData"
      ></data-table> -->
    </el-drawer>
    <el-button @click="() => handleBtnClick()">开始配置</el-button>
  </div>
</template>

<script lang="ts" setup>
const drawer = ref(false);
const mapId = ref("");
// const type = ref();
const route = useRoute();

const handleBtnClick = async () => {
  //   type.value = btn;
  drawer.value = true;
  //   const data = await window.db.getDataByKey();

  //   tableData.value = data.map((item) => {
  //     delete item["geo"];
  //     return {
  //       ...item,
  //     };
  //   });
  //
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
