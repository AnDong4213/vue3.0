<template>
  <div class="singer-detail">
    <music-list :songs="songs"
                :pic="pic"
                :title="title"
                :loading="loading" />
  </div>
</template>

<script>
/* import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list'
import storage from 'good-storage' */
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constant'
import createDetailComponent from '@/assets/js/create-detail-component'

export default createDetailComponent(
  'singer-detail',
  SINGER_KEY,
  getSingerDetail
)

/* export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  data() {
    return {
      songs: [],
      loading: true
    }
  },
  async created() {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push({
        path
      })
      return
    }
    const result = await getSingerDetail(this.computedSinger)
    const songs = await processSongs(result?.songs || [])
    this.songs = songs
    this.loading = false
  },
  computed: {
    computedSinger() {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          ret = cachedSinger
        }
      }
      return ret
    },
    pic() {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title() {
      const singer = this.computedSinger
      return singer && singer.name
    }
  },
  components: {
    MusicList
  }
} */
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
