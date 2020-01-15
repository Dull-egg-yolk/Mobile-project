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
  },
  // 用户页面
  {
    path: '/user/:userId',
    component: () => import('../views/user')
  },
  // 搜索页面
  {
    path: '/search',
    component: () => import('../views/search')
  },
  // 文章详情页面
  {
    path: '/article/:articleId',
    component: () => import('@/views/article')
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
    // props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
