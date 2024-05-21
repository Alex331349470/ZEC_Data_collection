/*
 * @Date: 2023-03-10 19:34:30
 * @Description: 
 */
import { createNameComponent } from '../createNode';

/** 首页 */
const dashboard = {
  dashboard: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
}
/** 导出所有路由，供后端配置使用 */
const allRoutes = {
  dashboard
  
}
console.log(allRoutes)

export default allRoutes