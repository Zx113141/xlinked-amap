<template>
  <el-form
    ref="form"
    :model="optionsForm"
    label-width="100px"
    class="demo-ruleForm"
    :rules="rules"
  >
    <el-form-item label="线段边界颜色" prop="strokeColor">
      <el-color-picker v-model="optionsForm.strokeColor" color-format="hex" />
    </el-form-item>
    <el-form-item label="线段边界透明度" prop="strokeOpacity">
      <el-input
        v-model.number="optionsForm.strokeOpacity"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="线段宽度" prop="strokeWeight">
      <el-input
        v-model.number="optionsForm.strokeWeight"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="填充颜色" prop="fillColor">
      <el-color-picker v-model="optionsForm.fillColor" color-format="hex" />
    </el-form-item>
    <el-form-item label="填充透明度" prop="fillOpacity">
      <el-input
        v-model.number="optionsForm.fillOpacity"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="线段样式" prop="strokeStyle">
      <el-select v-model="optionsForm.strokeStyle">
        <el-option
          v-for="item in strokeStyleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        style="margin-left: 15px"
        type="primary"
        @click="() => emit('close')"
        >关闭</el-button
      >
    </el-form-item>

    <div class="demo-map" id="demo-map"></div>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
const props = defineProps<{
  opts: any;
  activeTool: any;
}>();
const form = ref<FormInstance>();
const emit = defineEmits(["update:opts", "close"]);
const optionsForm = ref(props.opts);

// const submitForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.validate((valid) => {
//     if (valid) {
//       emit("close");
//     } else {
//       return false;
//     }
//   });
// };

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const rules = {
  strokeOpacity: { type: "number", message: "线段边界透明度必须是一个数字" },
  strokeWeight: { type: "number", message: "线段宽度必须是一个数字" },
  fillOpacity: { type: "number", message: "填充透明度必须是一个数字" },
};

const strokeStyleOptions = [
  {
    label: "solid",
    value: "solid",
  },
  {
    label: "dashed",
    value: "dashed",
  },
];
onMounted(() => {
  const map = new window.AMap.Map("demo-map", {
    center: [106.648225, 26.612017],
    zoom: 14,
    viewMode: "2D",
    // mapStyle: "amap://styles/dark",
  });
  const mouseTool = new window.AMap.MouseTool(map);
  mouseTool[props.activeTool.value](optionsForm.value);
});
</script>

<style lang="scss" scoped>
.demo-map {
  height: 300px;
}
</style>
