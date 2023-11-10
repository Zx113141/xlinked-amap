<template>
  <div class="map-area">
    <div class="map" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElLoading } from "element-plus";

import { initPluginService, initPluginEditor } from "@/service/pluginService";
// const snap = inject("snap", "");
const route = useRoute();

onMounted(async () => {
  // await initMap();
});

const initAMap = async () => {
  const loadingInstance = ElLoading.service({
    target: "#map",
  });
  await AMapLoader.load({
    key: "f31603ec0edd29e60f2721d9422ed9f6",
    version: "2.0",
    Loca: {
      version: "2.0.0",
    },
    plugins: [
      "AMap.RectangleEditor",
      "AMap.PolygonEditor",
      "AMap.PolylineEditor",
      "AMap.CircleEditor",
    ],
  });
  initMap();
  // initPluginEditor(window.map);
  loadingInstance.close();
};
const initMap = () => {
  window.map = new window.AMap.Map("map", {
    center: [106.648225, 26.612017],
    zoom: 14,
    viewMode: "3D",
    mapStyle: "amap://styles/dark",
  });
  initPluginService(window.map, (mouseTool) => {
    window.mouseTool = mouseTool;
  });
};

const destroy = () => {
  window.map && window.map.destroy();
};

const getSnapshotId = (id) => {
  if (id) {
    initAMap();
  } else {
    destroy();
  }
};

watch(
  () => route.query.id,
  (id) => {
    getSnapshotId(id);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.map-area {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border-radius: var(--el-border-radius-base);
  #map {
    // width: 300px;
    height: 100%;
  }
}
</style>
