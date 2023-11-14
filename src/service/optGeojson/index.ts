// import { clickDialog } from "../dialogService";
import DescriptionInfo from "@/components/toolbar/desc.vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import { dayjs } from "element-plus";
// 保存映射
export const emitStruct = async (mapId, struct, type, info) => {
    const { desc, user, option } = info
    const className: string = struct.className;
    const getType = className.split(".")[1];

    const opts = struct.getOptions();

    let ob = {}
    try {
        switch (type) {
            case "INSERT":
                ob = addStruct(getType, {
                    opts,
                    option
                }, {
                    type,
                    id: opts.extData.id,
                    ...desc,
                    mapId,
                    creator: user.name,
                    createTime: dayjs().format('YYYY-MM-DD'),

                })
                await window.db.addData({
                    ...ob
                });
                break;
            case "PUT":

                // await window.db.update(putStruct(getType, opts))
                break;
            case "DELETE":
                await window.db.remove(deleteStruct(id))
                break;
            default:
                break;
        }
        ElMessage({
            type: 'success',
            message: `添加成功`,
        })
    } catch (err) {
        console.log(err);
        ElMessage({
            type: 'info',
            message: '添加失败',
        })
    }


};
export const assembleJson = (getType, mergeOpts, obj) => {
    const { option, opts } = mergeOpts
    const geoJson = {
        type: "Feature",
        geometry: {
            type: getType,
            coordinates: opts.path,
        },
        properties: {
            // ...opts,
            option: {
                ...option
            },
            ...opts.extData,

        },
    };
    const data_table = {
        ...obj,
        geo: geoJson
    }
    return data_table
}


export const addStruct = (getType, opts, obj) => {

    return assembleJson(getType, opts, obj)
}

export const putStruct = (getType, opts) => {
    return assembleJson(getType, opts)
}
export const deleteStruct = (id) => {
    return id
}


export const useToolSelect = (activeTool, option, user) => {
    let editor: any = null
    let mapId = ref('')
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
        handleTool(activeTool.value, mapId.value)
    }
    const draw = async (e) => {
        const struct = e.obj;
        const desc = await addInfor()
        // console.log(desc);
        struct.on("rightclick", removeEvent);
        struct.on("click", edit);
        console.log(user);
        emitStruct(mapId.value, struct, "INSERT", { desc, user, option: option.value }).then();
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

    const handleTool = (type, routeId) => {
        if (activeTool.value) {
            window.mouseTool.close();
        }
        mapId.value = routeId
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
                resolve(desc.value)
            })
            .catch(() => {
                resolve(desc.value)
            })
    })

}