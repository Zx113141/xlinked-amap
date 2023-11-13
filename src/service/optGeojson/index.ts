

// 保存映射
export const emitStruct = async (id, struct, type) => {
    const className: string = struct.className;
    const getType = className.split(".")[1];
    const arr = await window.db.getDataByKey(id) as any[]
    const opts = struct.getOptions();
    switch (type) {
        case "INSERT":
            arr.push(addStruct(id, type, getType, opts))
            await window.db.addData(arr);
            break;
        case "PUT":
            await window.db.update(putStruct(id, type, getType, opts))
            break;
        case "DELETE":
            await window.db.remove(deleteStruct(id))
            break;
        default:
            break;
    }

};
export const assembleJson = (id, type, getType, opts) => {
    const geoJson = {
        type: "Feature",
        geometry: {
            type: getType,
            coordinates: opts.path,
        },
        properties: {
            ...opts.extData,
        },
    };
    const data_table = {
        type,
        id,
        geo: geoJson
    }
    return data_table
}


export const addStruct = (id, type, getType, opts) => {

    return assembleJson(id, type, getType, opts)
}

export const putStruct = (id, type, getType, opts) => {
    return assembleJson(id, type, getType, opts)
}
export const deleteStruct = (id) => {
    return id
}


export const useToolSelect = (activeTool, routeId, option) => {
    let editor: any = null
    const destroyEditor = () => {
        editor && editor.close();
    };
    const destroyListener = () => {
        window.mouseTool.close();
        window.mouseTool.off("draw", draw);
    };
    const removeEvent = () => {
        destroyEditor();
        handleTool(activeTool.value)
    }
    const draw = (e) => {
        const struct = e.obj;
        struct.on("rightclick", removeEvent);
        struct.on("click", edit);
        emitStruct(routeId, struct, "INSERT").then();
    };
    const edit = (ev) => {
        activeTool.value = ev.target.getExtData().type;
        destroyListener();
        destroyEditor();
        const Construct = window.AMap[activeTool.value.editor];
        if (Construct) {
            editor = new Construct(window.map, ev.target);
            editor.open();
        }
    };

    const clearTool = () => {
        activeTool.value = {
            name: "",
            value: "",
            type: "",
            editor: "",
        };
        destroyEditor()
        destroyListener();
    };

    const handleTool = (type) => {
        if (activeTool.value) {
            window.mouseTool.close();
        }
        activeTool.value = type;
        if (type.type === "MouseTool") {
            window.mouseTool[type.value]({
                ...option.value,
                extData: {
                    id: new Date().getTime() + "",
                    name: new Date().getTime() + "",
                    type
                },
            });
        }
        window.mouseTool.on("draw", draw);
    };
    return [clearTool, handleTool]
}