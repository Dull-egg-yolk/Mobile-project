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
        path: '/',
        component: () => import('../views/home')
      },
      {
        path: '/my',
        component: () => import('../views/my')
      }

    ]
  },
  // 用户页面
  {
    path: '/user/:userId',
    component: () => import('../views/user')
  }

]

const router = new VueRouter({
  routes
})

export default router
