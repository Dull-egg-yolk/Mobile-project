import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    component: () => import('../views/tabbar'),
    // 子路由
    children: [
      {
        path: '/qa',
        component: () => import('../views/qa')
      },

      {
        path: '/video',
        component: () => import('../views/video')
      },
      {
        path: '/home',
        component: () => import('../views/home')
      },
      {
        path: '/my',
        component: () => import('../views/my')
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
