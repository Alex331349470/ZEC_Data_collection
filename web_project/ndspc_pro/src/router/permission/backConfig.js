/*
 * @Date: 2023-03-10 19:34:30
 * @Description: 
 */
import { createNameComponent } from '../createNode';

/** 首页 */
const dashboard = {
  dashboard: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
}
/** pages */
const pages = {
  inconming: createNameComponent(() => import('@/views/quality/inconming.vue')),
  process: createNameComponent(() => import('@/views/quality/process.vue')),
  product: createNameComponent(() => import('@/views/quality/product.vue'))
}
/** 导出所有路由，供后端配置使用 */
const allRoutes = {
  dashboard,
  pages
}
console.log(allRoutes)

export default allRoutes