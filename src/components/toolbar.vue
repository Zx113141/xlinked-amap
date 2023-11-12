<template>
  <div class="tool-bar">
    <div class="icon flex">
      <div class="tools flex" v-show="!expand">
        <div
          v-for="tool in toolbar"
          class="tool flex"
          @click.stop="() => handleTool(tool)"
          :style="`background-color:${
            activeTool.value === tool.value ? '#409EFC' : ''
          }`"
        >
          <el-icon>
            <img :src="tool.icon" alt="" width="15" height="15" />
          </el-icon>
        </div>
      </div>
      <div class="tool flex" @click.stop="collapse">
        <el-icon>
          <ArrowLeft v-if="expand" />
          <ArrowRight v-else="expand" />
        </el-icon>
      </div>
      <div class="tool flex" @click.stop="fullScreen">
        <el-icon>
          <el-icon><FullScreen /></el-icon>
        </el-icon>
      </div>
    </div>

    <div class="tool-info flex" v-if="activeTool.value">
      <div class="info">
        <div>当前正在绘制{{ activeTool.name }}</div>
      </div>
      <div class="flex">
        <div @click.stop="() => (dialog = true)" class="edit-style">
          修改样式
        </div>
        <div class="exit-draw" @click.stop="clearTool">退出绘制</div>
      </div>
    </div>

    <el-dialog
      v-model="dialog"
      @close="() => (dialog = false)"
      :title="`${activeTool.name}的样式选择`"
      destroy-on-close
    >
      <options
        :activeTool="activeTool"
        v-model:opts="option"
        @close="() => (dialog = false)"
      ></options>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { toolbar } from "@/config/toolbar";
import options from "./toolbar/options.vue";
const PARENT_PROVIDE = "parentProvide";

const parent = inject(PARENT_PROVIDE);
const expand = ref(false);
const isFull = ref(false);
const dialog = ref(false);
const structMap = new Map();
const option = ref({
  strokeColor: "#FE34AA",
  strokeOpacity: 0.5,
  strokeWeight: 3,
  fillColor: "#3477FE",
  fillOpacity: 0.5,
  strokeStyle: "solid",
});

const activeTool = ref({
  name: "",
  value: "",
  type: "",
  editor: "",
});
let editor: any = null;

const collapse = () => {
  expand.value = !expand.value;
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
        id: new Date().getTime(),
      },
    });
  }
  window.mouseTool.on("draw", draw);
};

const clearTool = () => {
  activeTool.value = {
    name: "",
    value: "",
    type: "",
    editor: "",
  };
  editor && editor.close();
  destroyListener();
};
const edit = (ev) => {
  const Construct = window.AMap[activeTool.value.editor];
  if (Construct) {
    editor = new Construct(window.map, ev.target);
    editor.open();
  }
};
const draw = (e) => {
  const struct = e.obj;
  console.log(struct);
  emitStruct(struct);

  struct.on("rightclick", edit);
};

const destroyListener = () => {
  window.mouseTool.close();
  window.mouseTool.off("draw", draw);
};

const fullScreen = () => {
  const el: any = parent ? parent.value.$el : null;
  if (isFull.value) {
    el.exitFullScreen && el.exitFullScreen();
  } else {
    el.requestFullscreen && el.requestFullscreen();
  }
  isFull.value = !isFull.value;
};

const emitStruct = (struct) => {
  let arr: any = [];
  if (structMap.has(struct.className)) {
    arr = structMap.get(struct.className);
  }
  arr.push(struct);
  structMap.set(struct.className, arr);
  console.log(struct);
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool-bar {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: aliceblue;
  z-index: 999;
  border-radius: var(--el-border-radius-base);
  .icon {
    height: 100%;

    .tools {
      transition: all 0.5 ease-in-out;
    }
    .tool {
      width: 30px;
      height: 30px;
      border-radius: var(--el-border-radius-base);
    }
    .tool:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
  .tool-info {
    width: 240px;
    position: absolute;
    right: 0px;
    top: 50px;
    background-color: aliceblue;
    font-size: 12px;
    height: 30px;
    // z-index: 999;
    border-radius: var(--el-border-radius-base);
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    padding: 0px 10px;
    flex-wrap: nowrap;
    .edit-style {
      color: #aaa;
      cursor: pointer;
      padding-right: 10px;
    }
    .exit-draw {
      color: rgb(238, 64, 64);
      border-left: 1px dashed #aaa;
      padding-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
