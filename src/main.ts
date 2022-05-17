import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from '@/store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'

// 统一注册Icon图标


 const app = createApp(App)
 app
.use(router)
.use(store)
.use(ElementPlus, {
  locale: zhCn,
})
.mount('#app')




for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}