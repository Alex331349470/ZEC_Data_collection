import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'message.menu.dashboard.name', icon: 'sfont system-home' },
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
        meta: { title: 'message.menu.dashboard.index', icon: 'sfont system-home', hideClose: true }
      }
    ]
  },
  {
    path: '/quality',
    component: Layout,
    redirect: '/incoming',
    meta: { title: 'message.menu.quality.name', icon: 'sfont system-home' },
    children: [
      {
        path: 'incoming',
        component: createNameComponent(() => import('@/views/main/quality/incoming.vue')),
        meta: { title: 'message.menu.quality.iconming'}
      },
      {
        path: 'process',
        component: createNameComponent(() => import('@/views/main/quality/process.vue')),
        meta: { title: 'message.menu.quality.process'}
      },
      {
        path: 'product',
        component: createNameComponent(() => import('@/views/main/quality/product.vue')),
        meta: { title: 'message.menu.quality.product'}
      }
    ]
  },
  {
    path: '/spc',
    component: Layout,
    redirect: '/analysis',
    meta: { title: 'message.menu.spc.name', icon: 'sfont system-home' },
    children: [
      {
        path: 'analysis/index',
        component: createNameComponent(() => import('@/views/main/spc/analysis/index.vue')),
        meta: { title: 'message.menu.spc.analysis'}
      },
      {
        path: 'control/index',
        component: createNameComponent(() => import('@/views/main/spc/control/index.vue')),
        meta: { title: 'message.menu.spc.control'}
      },
      {
        path: 'signboard',
        redirect: '/signboard/abnormal',
        meta: { title: 'message.menu.spc.signboard.name' },
        children: [
          {
            path: 'monitor',
            component: createNameComponent(() => import('@/views/main/spc/signboard/monitor.vue')),
            meta: { title: 'message.menu.spc.signboard.monitor'}
          },
          {
            path: 'abnormal',
            component: createNameComponent(() => import('@/views/main/spc/signboard/abnormal.vue')),
            meta: { title: 'message.menu.spc.signboard.abnormal'}
          },
          {
            path: 'integral',
            component: createNameComponent(() => import('@/views/main/spc/signboard/integral.vue')),
            meta: { title: 'message.menu.spc.signboard.integral'}
          }
        ]
      }
    ]
  }
]

export default route