<template>
  <div class="shapshot">
    <div class="map-instance">
      <div class="add">
        <el-button
          @click="addSnapShot"
          type="primary"
          style="width: 100%"
          :icon="Plus"
        ></el-button>
      </div>
      <div
        @click="() => handleChangeActive(item)"
        v-for="item in snapshotItems"
        :class="['map-snapshot', activeMap === item.id ? 'active' : '']"
      >
        {{ item.id }}
        <div class="opts" @click.stop="() => deleteSnapShot(item)">
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
const router = useRouter();
// const emit = defineEmits(["snapshot"]);
const snapshotItems = ref<
  {
    id: string;
    name: string;
  }[]
>([]);
const activeMap = ref("");

const getMapSnapShot = (id) => {
  router.push({
    name: "edit",
    query: {
      id,
    },
  });
};
const handleChangeActive = (item) => {
  activeMap.value = item.id;
};

const deleteSnapShot = (item) => {
  snapshotItems.value = snapshotItems.value.filter(
    (snap) => snap.id !== item.id
  );
  if (item.id === activeMap.value) {
    activeMap.value = snapshotItems.value[0].id;
  }
};

const addSnapShot = () => {
  const shapshot = {
    id: getHashCode("snap-shot" + new Date().getTime(), true),
    name: "333",
  };
  snapshotItems.value.push(shapshot);
  if (snapshotItems.value.length === 1) {
    activeMap.value = shapshot.id;
  }
};

const getHashCode = (str, caseSensitive) => {
  if (!caseSensitive) {
    str = str.toLowerCase();
  }
  // 1315423911=b'1001110011001111100011010100111'
  var hash = 1315423911,
    i,
    ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= (hash << 5) + ch + (hash >> 2);
  }
  const strHash = String(hash & 0x7fffffff);
  let hashChar = "";
  for (let i = 0; i < strHash.length; i++) {
    hashChar += strHash.charCodeAt(i).toString(16);
  }
  return hashChar;
};

watch(
  () => activeMap,
  (id) => {
    getMapSnapShot(id.value);
  },
  {
    deep: true,
    immediate: true,
  }
);
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
    row-gap: 8px;

    .add {
      width: 100%;
    }
    .map-snapshot {
      background-color: aqua;
      width: 160px;
      height: 100px;
      // margin-bottom: 10px;
      border-radius: var(--el-border-radius-base);
      position: relative;
      .opts {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
    .map-snapshot:hover .opts {
      display: block;
    }
    .map-snapshot:hover {
      border: 1px solid var(--el-color-primary);
    }
    .active {
      border: 1px solid var(--el-color-primary);
    }
  }
}
</style>
