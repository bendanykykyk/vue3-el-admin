import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element plus（按需引入之类的，看后2）
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// 引入基础css,以及自己定义的基础样式
import 'normalize.css'
import './assets/css/index.less'

// plus icon 引入
import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(store)

// 处理刷新页面时，vuex数据失效（重载一些菜单，token之类的
store.dispatch('login/loadLocalLogin')

app.use(router)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}

app.mount('#app')
