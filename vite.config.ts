import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';



function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
  }), vueJsx()],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      { find: /^~/, replacement: resolve(__dirname, '') },
      {
        find: /\@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },

  // plugins


  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        charset: false,
        javascriptEnabled: true,
        // additionalData: '@import "./src/assets/default/style.scss";',
      }
    }
  }
})
