import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'

import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

import '@/assets/scss/index.scss'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

function render() {
  createApp(App)
    .use(store)
    .use(router)
    .use(lazyPlugin, {
      loading: require('@/assets/images/default.png')
    })
    .directive('loading', loadingDirective)
    .directive('no-result', noResultDirective)
    .mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('yinyue-- app bootstrap')
}

export async function mount(props) {
  console.log('yinyue- mount')
  render()
}

export async function unmount(ctx) {
  console.log('yinyue- unmount')
}
