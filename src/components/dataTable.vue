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
      <el-table-column property="name" label="名称" />
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
      <shield-feature :id="id" @upData="upData"></shield-feature>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useMapDataSource, type SourceId } from "@/store/data-source";
import shieldFeature from "./shieldFeature/shieldFeature.vue";
interface PolygonData {
  id: number;
  name: string;
  creator: string;
  createTime: string;
  updateTime: string;
  desc: string;
}
const props = defineProps<{
  mapId: string;
  type: {
    label: string;
    value: SourceId;
  };
  tableData: PolygonData[];
}>();

const store = useMapDataSource();
const multipleSelection = ref<PolygonData[]>([]);
const drawer = ref(false);
const id = ref("");
const tableData = ref(props.tableData);

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
  id.value = row.id;
  drawer.value = true;
};
const upData = (e) => {
  console.log(e);
};

const loadData = async () => {
  // console.log(featureData.value, columns.value);
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
