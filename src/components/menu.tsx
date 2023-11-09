import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
import { MenuDataItem } from '../utils/typings';

const makeTreeDom = (data: MenuDataItem[]): JSX.Element[] => {
  return data.map((item: MenuDataItem) => {
    if (item.path !== '/app/home') {
      return (
        <ElMenuItem index={item.path}>
          {/* {getIcon(item.meta?.icon as string)} */}
          <span>{item.meta?.title}</span>
        </ElMenuItem>
      );
    } else {
      return <div></div>
    }
  });
};
export default defineComponent({
  name: 'BaseMenu',
  props: {
    menuWidth: {
      type: Number,
      default: 208,
    },
    menuData: {
      default: () => [],
    },
  },
  setup(props) {
    return () => {
      return (
        <ElMenu
          router={true}
          ellipsis={false}

          background-color="#e9ecee"
          mode='horizontal'
          style={{
            height: '30px',
            border: 'none',
            fontSize: '12px'
          }}
        >
          <el-menu-item index="/app">
            <img
              style="width: 100px"
              src="https://element-plus.org/images/element-plus-logo.svg"
              alt="Element logo"
            />
          </el-menu-item>
          <div style={{ flexGrow: 0.4 }}>

          </div>
          {makeTreeDom(props.menuData)}
        </ElMenu>

      );
    };
  },
});
