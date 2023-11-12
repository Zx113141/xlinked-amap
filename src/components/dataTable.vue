<template>
  <div class="data-table">
    <div class="data-title">
      <div class="title">几何{{ type.label }}📐</div>
      <el-button type="primary" style="width: 100px">上传数据</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      table-layout="fixed"
      height="210"
    >
      <el-table-column type="selection" />
      <el-table-column type="index" label="序号" />
      <el-table-column property="desc" label="描述" />
      <el-table-column property="creator" label="创建人" />
      <el-table-column property="createTime" label="创建时间" />
      <el-table-column property="updateTime" label="更新时间" />
      <el-table-column property="oprate" label="操作" width="300">
        <template #default="scope">
          <el-button type="success" @click="() => update(scope.row)"
            >更新</el-button
          >
          <el-button type="info" @click="() => download(scope.row)"
            >下载</el-button
          >
          <el-button type="primary" @click="() => config(scope.row)"
            >配置JSON字段</el-button
          >
          <el-button type="danger" @click="() => deleteData(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="loadData">加载选中数据</el-button>
    <el-drawer
      @close="() => (drawer = false)"
      v-model="drawer"
      :with-header="false"
      direction="btt"
      close-on-click-modal
      show-close
      destroy-on-close
      size="50%"
    >
      <shield-feature
        :featureData="featureData"
        :columns="columns"
      ></shield-feature>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useMapDataSource, type SourceId } from "@/store/data-source";
import shieldFeature from "./shieldFeature/shieldFeature.vue";

const props = defineProps<{
  mapId: string;
  type: {
    label: string;
    value: SourceId;
  };
}>();
interface PolygonData {
  id: number;
  name: string;
  creator: string;
  createTime: string;
  updateTime: string;
  desc: string;
}
const store = useMapDataSource();
const multipleSelection = ref<PolygonData[]>([]);
const drawer = ref(false);
const featureData = ref();
const columns = ref([
  {
    name: "健康度",
    shield: "health",
  },
  {
    name: "名称",
    shield: "name",
  },
  {
    name: "值",
    shield: "value",
  },
  {
    name: "zylsd",
    shield: "zylsd",
  },
]);
const tableData = ref([
  {
    id: 1,
    name: "实例数据",
    creator: "xx",
    createTime: "2023-11-10",
    updateTime: "2023-11-10",
    desc: "示例数据主要用于测试",
  },
]);
const handleSelectionChange = (val: PolygonData[]) => {
  multipleSelection.value = val;
};

const update = (row) => {
  console.log(row);
};

const download = (row) => {
  console.log(row);
};

const deleteData = (row) => {
  console.log(row);
};

const config = async (row) => {
  featureData.value = await (
    await fetch("../../config/default.geojson")
  ).json();
  drawer.value = true;

  // const properties =  geoJson.features.map((feature) => {
  //   return {

  //   }
  // })
  // console.log(geoStr.value);
};

const loadData = async () => {
  store.updateDataSourceByMapId(props.mapId, {
    id: props.type.value,
    dataIds: multipleSelection.value.map((select) => select.id),
  });
};
</script>

<style lang="scss" scoped>
.data-table {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;
  .data-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
