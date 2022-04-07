<template>
  <div>
    <music-list :songs="songs"
                :pic="pic"
                :title="title"
                :loading="loading" />
  </div>
</template>

<script>
import MusicList from '@/components/music-list'

export default {
  name: 'album',
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
