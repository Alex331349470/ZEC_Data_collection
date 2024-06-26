import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/quality',
    meta: { title: 'message.menu.quality.name', icon: 'sfont system-home' },
    hideMenu: true,
    children: [
      {
        path: 'incoming',
        component: createNameComponent(() => import('@/views/main/quality/incoming.vue')),
        meta: { title: 'message.menu.quality.iconming'}
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
  },
  // {
  //   path: '/capacity',
  //   component: Layout,
  //   redirect: '/manage',
  //   meta: { title: 'message.menu.capacity.name', icon: 'sfont system-home' },
  //   children: [
  //     {
  //       path: 'manage',
  //       component: createNameComponent(() => import('@/views/main/capacity/manage.vue')),
  //       meta: { title: 'message.menu.capacity.manage'}
  //     },
  //     {
  //       path: 'design',
  //       component: createNameComponent(() => import('@/views/main/capacity/design.vue')),
  //       meta: { title: 'message.menu.capacity.design'}
  //     },
  //     {
  //       path: 'authentication',
  //       component: createNameComponent(() => import('@/views/main/capacity/authentication.vue')),
  //       meta: { title: 'message.menu.capacity.authentication'}
  //     },
  //     {
  //       path: 'demand',
  //       component: createNameComponent(() => import('@/views/main/capacity/demand.vue')),
  //       meta: { title: 'message.menu.capacity.demand'}
  //     }
  //   ]
  // },
]

export default route