<template>
  <div class="shield-feature">
    <div class="shield-title">
      <el-button type="primary" @click="addRow" style="margin-right: 15px"
        >添加列</el-button
      >
    </div>
    <el-table
      ref="shield"
      :data="tableData"
      style="width: 100%"
      table-layout="fixed"
      height="400"
    >
      <el-table-column type="index" label="序号" />
      <el-table-column property="creator" label="创建人" />
      <el-table-column property="createTime" label="创建时间" />
      <el-table-column property="updateTime" label="更新时间" />
      <el-table-column
        v-for="column in columns"
        :label="column.name"
        :property="column.shield"
      >
        <template #default="scope">
          <el-input
            :disabled="!scope.row.disabled"
            v-model="scope.row[column.shield]"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column property="oprate" label="操作" width="150">
        <template #default="scope">
          <el-button
            v-if="!scope.row.disabled"
            @click="() => (scope.row.disabled = true)"
            >编辑</el-button
          >
          <div v-else>
            <el-button type="info" @click="() => (scope.row.disabled = false)"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="() => (scope.row.disabled = false)"
              >保存</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      @close="() => (drawer = false)"
      v-model="drawer"
      :with-header="false"
      direction="rtl"
      close-on-click-modal
      show-close
      destroy-on-close
      append-to-body
      size="30%"
    >
      <el-table
        ref="shield"
        :data="columns"
        style="width: 100%"
        table-layout="fixed"
      >
        <el-table-column property="name" label="字段名" />
        <el-table-column property="shield" label="字段值" />
        <el-table-column property="oprate" label="操作">
          <template #default="scope">
            <el-button type="success" @click="() => update(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="() => deleteShield(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-alert
        title="当前配置字段值尽量保证唯一性，否则会以后添加的为准"
        type="warning"
        show-icon
      />
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="字段名">
          <el-input v-model="form.name" placeholder="请输入字段描述" />
        </el-form-item>
        <el-form-item label="字段值">
          <el-input v-model="form.shield" placeholder="请输入字段" />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="margin-right: 15px"
            @click="handleSave"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  featureData: any;
  columns: any;
}>();
const tableData = ref([]);
const columns = ref(props.columns);
const drawer = ref(false);
const form = ref({});

const addRow = () => {
  drawer.value = true;
};
const handleSave = () => {
  columns.value.push({
    ...form.value,
  });
};
const deleteShield = (row) => {
  columns.value = columns.value.filter((col) => row.shield !== col.shield);
};

const update = (row) => {};
watch(
  () => props.featureData.features,
  (feature) => {
    if (feature) {
      tableData.value = feature.map((fea) => {
        return {
          ...fea.properties,
        };
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.shield-feature {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;
  .shield-title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
:deep(.el-steps--simple) {
  padding: 0px 10px 10px 10px !important;
  background-color: transparent !important;
}
</style>
