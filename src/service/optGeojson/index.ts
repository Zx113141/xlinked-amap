// import { clickDialog } from "../dialogService";
import DescriptionInfo from "@/components/toolbar/desc.vue";
import { ElMessageBox, ElMessage } from 'element-plus'
// 保存映射
export const emitStruct = async (id, struct, type, desc) => {
    const className: string = struct.className;
    const getType = className.split(".")[1];
    const arr = await window.db.getDataByKey(id) as any[]
    const opts = struct.getOptions();
    let data_table
    switch (type) {
        case "INSERT":
            arr.push(addStruct(getType, opts, desc))
            data_table = {
                type,
                id,

                geo: arr
            }
            await window.db.addData(data_table);
            break;
        case "PUT":
            data_table = {
                type,
                id,

                geo: arr
            }
            await window.db.update(putStruct(getType, opts, desc))
            break;
        case "DELETE":
            await window.db.remove(deleteStruct(id))
            break;
        default:
            break;
    }

};
export const assembleJson = (getType, opts, desc) => {
    const geoJson = {
        type: "Feature",
        geometry: {
            type: getType,
            coordinates: opts.path,
        },
        properties: {
            ...opts.extData,
            ...desc
        },
    };
    return geoJson
}


export const addStruct = (getType, opts, desc) => {

    return assembleJson(getType, opts, desc)
}

export const putStruct = (getType, opts, desc) => {
    return assembleJson(getType, opts, desc)
}
export const deleteStruct = (id) => {
    return id
}


export const useToolSelect = (activeTool, routeId, option) => {
    let editor: any = null

    // clickDialog(null, (close) => {
    //     // close()
    // }, DescriptionInfo)
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
    const draw = async (e) => {
        const struct = e.obj;
        const desc = await addInfor()
        // console.log(desc);
        struct.on("rightclick", removeEvent);
        struct.on("click", edit);
        emitStruct(routeId, struct, "INSERT", desc).then();
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
                    type,
                },
            });
        }

        window.mouseTool.on("draw", draw);
    };
    return [clearTool, handleTool,]
}

const addInfor = () => {
    const desc = ref({
        name: '',
        desc: ''
    })
    return new Promise((resolve, reject) => {
        ElMessageBox({
            title: '基础信息配置',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            message: () => h(DescriptionInfo, {
                desc: desc.value,
                'onUpdate:desc': (val) => {
                    desc.value = {
                        ...val
                    }
                },
            })
        })
            .then(({ value }) => {
                ElMessage({
                    type: 'success',
                    message: `添加成功`,
                })
                resolve(desc.value)
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '添加失败',
                })
                resolve(desc.value)
            })
    })

}