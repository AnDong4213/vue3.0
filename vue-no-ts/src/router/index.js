import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () =>
  import('@/views/recommend' /* webpackChunkName: "recommend" */)

const Singer = () => import('@/views/singer' /* webpackChunkName: "singer" */)

const TopList = () =>
  import('@/views/top-list' /* webpackChunkName: "top-list" */)

const Search = () => import('@/views/search' /* webpackChunkName: "search" */)

const UserCenter = () =>
  import('@/views/user-center' /* webpackChunkName: "user-center" */)

const Vue3 = () =>
  import('@/views/vue3' /* webpackChunkName: "vue3" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/top-list',
    component: TopList
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: UserCenter
  },
  {
    path: '/vue3',
    component: Vue3
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
