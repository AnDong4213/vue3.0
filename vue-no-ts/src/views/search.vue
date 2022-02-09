<template>
  <div>search</div>
</template>

<script>
// import axios from 'axios'
import { funcAsync } from '@/utils/util.js'

export default {
  name: 'search',
  created() {
    funcAsync().then((v) => console.log(v))
    Promise.resolve(99).then((v) => console.log(v))
    console.log(90)
  },
  components: {}
}
</script>
