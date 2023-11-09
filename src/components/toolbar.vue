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
    </div>

    <div class="tool-info flex" v-if="activeTool.value">
      <div class="info">当前正在绘制{{ activeTool.name }}</div>
      <div class="exit-draw" @click.stop="clearTool">退出绘制</div>
    </div>

    <!-- <div class="tool-info flex" v-if="activeTool.value">
      <div class="info">当前正在绘制{{ activeTool.name }}</div>
      <div class="exit-draw" @click.stop="clearTool">退出绘制</div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { toolbar } from "@/config/toolbar";

const emit = defineEmits(["toolbar"]);
const expand = ref(false);
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
      strokeColor: "red",
      strokeOpacity: 0.5,
      strokeWeight: 6,
      fillColor: "blue",
      fillOpacity: 0.5,
      // strokeStyle还支持 solid
      strokeStyle: "solid",
      // strokeDasharray: [30,10],
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
  editor.close();
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
  struct.on("rightclick", edit);
  // console.log("覆盖物对象绘制完成", e.obj.getOptions());
};

const destroyListener = () => {
  window.mouseTool.close();
  window.mouseTool.off("draw", draw);
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
    width: 180px;
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
    .exit-draw {
      color: rgb(238, 64, 64);
      border-left: 1px dashed #aaa;
      padding-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
