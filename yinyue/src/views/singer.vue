<template>
  <div class="singer"
       v-loading="!singers.length">
    <index-list :data='singers'
                @select="selectSinger" />
    <!-- <router-view :singer="selectedSinger"></router-view> -->
    <router-view v-slot="{Component}">
      <transition appear
                  name="slide">
        <component :is="Component"
                   :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list'

export default {
  name: 'singer',
  data() {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created() {
    const res = await getSingerList()
    this.singers = res.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  },
  components: {
    IndexList
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
