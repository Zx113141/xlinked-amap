import circle from '/@/assets/tool-bar/circle.svg';
import marker from '/@/assets/tool-bar/map-marker.svg';
import polygon from '/@/assets/tool-bar/Polygon.svg';
import text from '/@/assets/tool-bar/text.svg';
import line from '/@/assets/tool-bar/line.svg';
import rectangle from '/@/assets/tool-bar/rectangle.svg';


export const toolbar = [
    {
        icon: marker,
        value: 'marker',
        name: '点',
        type: 'MouseTool'
    },
    {
        icon: text,
        value: 'text',
        name: '文字点',
        type: 'Text'
    },
    {
        icon: line,
        value: 'polyline',
        name: '线',
        type: 'MouseTool',
        editor: 'PolylineEditor'
    },
    {
        icon: circle,
        value: 'circle',
        name: '圆形',
        type: 'MouseTool',
        editor: 'CircleEditor'
    },
    {
        icon: rectangle,
        value: 'rectangle',
        name: '矩形',
        type: 'MouseTool',
        editor: 'RectangleEditor'
    },
    {
        icon: polygon,
        value: 'polygon',
        name: '多边形',
        type: 'MouseTool',
        editor: 'PolygonEditor'
    },


]