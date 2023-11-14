export const draw = async (id) => {
    const covers = await window.db.getDataByKey() as any[]
    const geoJson = {
        type: 'FeatureCollection',
        features: []
    }
    covers.forEach((cover: any) => {
        // if (cover.mapId === id) {

        // }
        geoJson.features.push(cover.geo)
    })
    const geo = new window.AMap.GeoJSON({
        geoJSON: geoJson,
        // 还可以自定义getMarker和getPolyline
        getPolygon: function (geojson, lnglats) {
            // 计算面积
            // var area = window.AMap.GeometryUtil.ringArea(lnglats[0])
            console.log(geojson);
            return new window.AMap.Polygon({
                path: lnglats,
                ...geojson.properties?.option
            });
        }
    });
    window.map.add(geo);
    console.log(geo);
}