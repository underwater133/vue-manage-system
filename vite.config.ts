import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve:{
    alias:{
      '@':path.join(__dirname, 'src')
    }
  },
  
  // server:{
  //   proxy:{ //代理
  //     '^/api/.*':{ //匹配以api开头的路径
  //       target: 'http://120.24.64.5:8088/mall-admin',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '') //去掉路径中的api
  //     }
  //   }
  // }
})
