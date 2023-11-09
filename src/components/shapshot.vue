<template>
  <div class="shapshot">
    <div class="map-instance">
      <div
        @click="() => handleChangeActive(item)"
        v-for="item in nums"
        :class="['map-snapshot', activeMap === item ? 'active' : '']"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["snapshot"]);
const nums = 5;
const activeMap = ref(1);

const handleChangeActive = (id) => {
  activeMap.value = id;
  emit("snapshot", activeMap);
};

// console.log(activeMap);
</script>

<style lang="scss" scoped>
.shapshot {
  background-color: aliceblue;
  margin: 10px 10px;
  border-radius: var(--el-border-radius-base);
  height: 100%;
  .map-instance {
    padding: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    .map-snapshot {
      background-color: aqua;
      width: 160px;
      height: 100px;
      margin-bottom: 10px;
      border-radius: var(--el-border-radius-base);
    }
    .active {
      border: 1px solid var(--el-color-primary);
    }
  }
}
</style>
