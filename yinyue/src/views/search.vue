<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model='query' />
    </div>
    <scroll ref="scrollRef"
            class="search-content"
            v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item"
                v-for="item in hotKeys"
                :key="item.id"
                @click="addQuery(item.key)">
              <span>{{item.key}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history">

        </div>
      </div>
    </scroll>
    <div class="search-result"
         v-show="query">
      <suggest :query="query"
               @select-song="selectSong"
               @select-singer="selectSinger"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear
                  name="slide">
        <component :is="Component"
                   :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import Scroll from '@/components/wrap-scroll'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { getHotKeys } from '@/service/search'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'search',
  setup() {
    const query = ref('')
    const hotKeys = ref([])
    const selectedSinger = ref(null)
    const store = useStore()
    const router = useRouter()
    // console.log(useRoute().query)

    getHotKeys().then(result => {
      hotKeys.value = result.hotKeys
    })
    function addQuery(s) {
      query.value = s
    }

    function selectSong(song) {
      // console.log(song)
      store.dispatch('addSong', song)
    }
    function selectSinger(singer) {
      // console.log(singer)
      selectSinger.value = singer
      cacheSinger(singer)

      router.push({
        path: `/search/${singer.mid}`
      })
    }

    function cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }

    return {
      query,
      hotKeys,
      selectedSinger,
      addQuery,
      selectSong,
      selectSinger
    }
  },
  components: { SearchInput, Scroll, Suggest }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
