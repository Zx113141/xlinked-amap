<template>
  <div class="map-area">
    <div class="map" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElLoading } from "element-plus";
import { draw } from "@/service/coverService";
import { initPluginService, initGeoJson } from "@/service/pluginService";
// const snap = inject("snap", "");
const route = useRoute();

onMounted(async () => {
  // await initMap();
});

const initAMap = async (id) => {
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
      "AMap.GeoJSON",
    ],
  });
  await initMap(id);

  // initPluginEditor(window.map);
  loadingInstance.close();
};
const initMap = async (id) => {
  window.map = new window.AMap.Map("map", {
    center: [106.648225, 26.612017],
    zoom: 14,
    viewMode: "3D",
    mapStyle: "amap://styles/dark",
  });
  initPluginService(window.map, (mouseTool) => {
    window.mouseTool = mouseTool;
  });
  initGeoJson();
  await draw(id);
};

const destroy = () => {
  window.map.destroy && window.map.destroy();
};

const getSnapshotId = (id) => {
  if (id) {
    initAMap(id);
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
