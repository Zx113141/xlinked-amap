export const initPluginService = (map, callback) => {
    window.AMap.plugin("AMap.MouseTool", function (e) {
        //异步加载插件
        const mouseTool = new window.AMap.MouseTool(map);
        // map.addControl(toolbar);
        callback(mouseTool)
    });
}

export const initPluginEditor = (map,) => {
    window.AMap.plugin(['AMap.RectangleEditor', 'AMap.PolygonEditor', 'AMap.PolylineEditor', 'AMap.CircleEditor',]
        , function (e) {
            //异步加载插件
            const rectangle = new window.AMap.RectangleEditor(map);
            const polygon = new window.AMap.PolygonEditor(map);
            const polyline = new window.AMap.PolylineEditor(map);
            const circle = new window.AMap.CircleEditor(map);
            // map.addControl(toolbar);
            // callback([rectangle, polygon, polyline, circle])
        }
    );
}

export const initGeoJson = () => {
    window.AMap.plugin(['AMap.GeoJSON',]
        , function (e) {
            //异步加载插件
        }
    );
}