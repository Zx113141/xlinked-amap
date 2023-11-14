const geoJSON = await (await fetch("../../config/default.geojson")).json();

const geo = new window.AMap.GeoJSON({
  geoJSON: geoJSON,
  // 还可以自定义getMarker和getPolyline
  getPolygon: function (geojson, lnglats) {
    // 计算面积
    let area = window.AMap.GeometryUtil.ringArea(lnglats[0]);

    return new window.AMap.Polygon({
      path: lnglats,
      fillOpacity: 0.1, // 面积越大透明度越高
      strokeColor: "blue",
      fillColor: "blue",
    });
  },
});
window.map.add(geo);
let loca = new window.Loca.Container({
  map: window.map,
});

let ambLight = new window.Loca.AmbientLight({
  intensity: 0.6,
  color: "#fff",
});
loca.addLight(ambLight);

let dirLight = new window.Loca.DirectionalLight({
  intensity: 0.6,
  color: "#fff",
  target: [0, 0, 0],
  position: [0, 1, 0],
});
loca.addLight(dirLight);

let pointLight = new window.Loca.PointLight({
  color: "rgb(100,100,100)",
  position: [120.24289, 30.341335, 20000],
  intensity: 3,
  distance: 50000,
});
loca.addLight(pointLight);

let geo2 = new window.Loca.GeoJSONSource({
  url: "../../config/default.geojson",
});

let colors = [
  "#00C6DA",
  "#9FE084",
  "#9FE084",
  "#5ACA70",
  "#00AF53",
  "#00873A",
  "#006B31",
  "#004835",
  "#003829",
];
let height = [10, 20, 40, 60, 80, 100, 120, 140, 160];
height = height.map((h) => h * 2);
let pl = new window.Loca.PolygonLayer({
  zIndex: 120,
  cullface: "none",
  shininess: 1,
  hasBottom: false,
  blockHide: false,
  hasSide: true,
  hasTop: false,
  depth: false,
});

pl.setSource(geo2);
pl.setStyle({
  topColor: function () {
    return "rgba(255,255,255,0)";
  },
  sideTopColor: function () {
    return "rgba(0,255,255,0)";
  },
  sideBottomColor: function (index, feature) {
    let v = feature.properties.health * 100;
    return v < 40
      ? colors[8]
      : v < 50
      ? colors[7]
      : v < 55
      ? colors[6]
      : v < 60
      ? colors[5]
      : v < 65
      ? colors[4]
      : v < 70
      ? colors[3]
      : v < 75
      ? colors[2]
      : v < 80
      ? colors[1]
      : v < 100
      ? colors[0]
      : "green";
  },
  height: function (index, feature) {
    let v = feature.properties.health * 80;
    return v * v;
  },
  altitude: 0,
});
loca.add(pl);

// 图例xrfx
let lengend = new window.Loca.Legend({
  loca: loca,
  title: {
    label: "健康度",
    fontColor: "#eee",
  },
  style: {
    backgroundColor: "rgba(255,255,255,0.1)",
    left: "20px",
    bottom: "40px",
  },
  dataMap: [
    { label: 100, color: colors[8] },
    { label: 80, color: colors[7] },
    { label: 75, color: colors[6] },
    { label: 70, color: colors[5] },
    { label: 65, color: colors[4] },
    { label: 60, color: colors[3] },
    { label: 55, color: colors[2] },
    { label: 50, color: colors[1] },
    { label: 40, color: colors[0] },
  ],
});

let dat = new window.Loca.Dat();
dat.addLightInstance(ambLight, "环境光");
dat.addLightInstance(dirLight, "平行光");
dat.addLightInstance(pointLight, "点光");
dat.addLayer(pl);
