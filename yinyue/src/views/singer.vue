<template>
  <div class="singer"
       v-loading="!singers.length">
    <index-list :data='singers' />
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list'

export default {
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  async created() {
    const res = await getSingerList()
    console.log(res)
    this.singers = res.singers
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
