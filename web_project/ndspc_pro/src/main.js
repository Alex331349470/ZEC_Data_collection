import { createApp, h, provide } from "vue"
import ElementPlus from 'element-plus'
import { baidu } from './utils/system/statistics'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import { getAuthRoutes } from './router/permission'
import i18n from './locale'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"
if (import.meta.env.MODE !== 'development') { // 非开发环境调用百度统计
  baidu()
}
const link = createHttpLink({ uri: "http://localhost:3000/graphql" })
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ link, cache })

/** 权限路由处理主方法 */
getAuthRoutes().then(() => {
  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
    render() {
      return h(App);
    },
  })
  app.use(ElementPlus, { size: store.state.app.elementSize })
  app.use(store)
  app.use(router)
  app.use(i18n)
  // app.config.performance = true
  app.mount('#app')
})

