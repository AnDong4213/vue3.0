<template>
  <div @click="haha">
    recommend
  </div>
</template>

<script>
import { getRecommend, m } from '@/service/recommend'

export default {
  name: 'recommend',
  async created() {
    const result = await getRecommend()
    console.log(result)
    console.log(m)
  },
  methods: {
    haha() {
      console.log(m)
    }
  },
  components: {}
}
</script>
