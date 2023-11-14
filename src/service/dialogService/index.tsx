// import ClickDialog from "@/components/toolbar/clickDialog.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'


const ClickDialog = {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    emits: ['click'],
    render(ctx) {
        const { $props, $attrs, $emit } = ctx
        const desc = ref({
            name: '',
            desc: ''
        })
        console.log(ctx);
        console.log($emit('click'));
        const Comp = $attrs.slots.default
        return (
            <div class="click-dialog" style="`left: 50px;top:50px`">
                <div class="click-title">{$props.title}</div>
                <div class="click-body">
                    <div  >
                        <Comp desc={desc}></Comp>
                    </div>
                </div>
                <ElButton size="small"
                    style="margin-left: 15px"
                    type="primary"
                    onClick={() => $attrs.onClick()}
                >关闭</ElButton>
            </div >
        )
    }
}


export const clickDialog = (e: MouseEvent, onClick: (close) => void, slots?: any) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(ClickDialog, {
        title: 'ddd',
        onClick() {
            onClick(() => {
                console.log(this);
                // app.unmount()
                // div.remove()
                // return 
            })
        },
        slots: {
            default: slots
        }
    },)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.use(ElementPlus)
    app.mount(div)
    // const comp = {
    //     props: ['visible', 'position'],
    //     emits: ['update:desc'],
    //     setup(props, { emit }) {
    //         const close = () => {
    //             emit('update:visible')
    //         }
    //         const visible = ref(props.visible)
    //         const desc = ref({
    //             name:'',
    //             desc:''
    //         })
    //         return () => (
    //             <ClickDialog position={props.position} v-model:visible={visible}>

    //                 <DescriptionInfo onClose={() => visible.value = false} desc={desc} onUpdate:desc={(value) => emit('update:desc', value)}></DescriptionInfo>
    //             </ClickDialog>
    //         )
    //     }
    // }

    // h(comp)
}

// const position = ref({
//     x: 30,
//     y: 30,
// });
// let descVisible = ref(true);
// const desc = ref({
//     name: '',
//     desc: ''
// })
// const comp = {
//     setup() {
//         return () => h(ElConfigProvider, {
//             size: "small",
//             message: {
//                 max: 3,
//             },
//         }, {
//             default: () => h(clickDialog, {
//                 position: position.value,
//                 visible: descVisible.value,
//                 title: 'oooo',
//                 // emits: ['update:visible'],
//                 'onUpdate:visible': () => emits('update:visible', false)
//             }, {
//                 default: () => h(descriptionInfo, {
//                     desc: desc.value,
//                     onClick: () => {

//                     }
//                 })
//             })
//         })
//     }
// }


// const app = createApp(comp);

// app.mount("#click");
// cb && cb()