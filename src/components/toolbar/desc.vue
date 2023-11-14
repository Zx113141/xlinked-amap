<template>
  <el-form
    ref="form"
    :model="optionsForm"
    label-width="100px"
    class="demo-ruleForm"
    :rules="rules"
  >
    <el-form-item label="名称" prop="name">
      <el-input
        v-model.number="optionsForm.name"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input
        v-model.number="optionsForm.desc"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
const props = defineProps<{
  desc: any;
}>();
const form = ref<FormInstance>();
const emit = defineEmits(["update:desc"]);
const optionsForm = ref(props.desc);

const rules = {
  name: { required: true, message: "面名称不能为空" },
};
</script>

<style lang="scss" scoped>
.demo-map {
  height: 300px;
}
</style>
