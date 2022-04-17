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
    ]
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
    component: Search
  },
  {
    path: '/user',
    component: UserCenter
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
