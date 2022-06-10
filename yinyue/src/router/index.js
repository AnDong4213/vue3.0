// 将我们的组件映射到路由上
// <router-link></router-link> Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码
// <router-view></router-view> 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局
// :id 路径参数

import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () =>
  import('@/views/recommend' /* webpackChunkName: "recommend" */)
const Album = () => import('@/views/album' /* webpackChunkName: "album" */)

const Singer = () => import('@/views/singer' /* webpackChunkName: "singer" */)
const SingerDetail = () =>
  import('@/views/singer-detail' /* webpackChunkName: "singer-detail" */)

const TopList = () =>
  import('@/views/top-list' /* webpackChunkName: "top-list" */)
const TopDetail = () =>
  import('@/views/top-detail' /* webpackChunkName: "top-detail" */)

const Search = () => import('@/views/search' /* webpackChunkName: "search" */)
const Wx = () => import('@/views/wx' /* webpackChunkName: "wx" */)

const UserCenter = () =>
  import('@/views/user-center' /* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    meta: {
      role: 'admin'
    },
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ],
    beforeEnter: (to, from, next) => {
      // reject the navigation
      next()
    }
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    // component: UserCenter
    components: {
      user: UserCenter
    }
  },
  {
    path: '/wx',
    component: Wx
  }
]
console.log('process.env.BASE_URL', process.env.BASE_URL)
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
