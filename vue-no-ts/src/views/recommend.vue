<template>
  <div>
    <h2>recommend</h2>
    <img src="/2.png" alt="" />
    <img src="@/assets/images/3.png" alt="" />
    <!-- <img src="@/assets/images/4.png" alt="" /> -->
    <p>{{ arr.length }}</p>
    <div @click="jumpSubpage">jumpSubpage</div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'recommend',
  data() {
    return {
      arr: []
    }
  },
  created() {
    this.arr = _.chunk(['a', 'b', 'c', 'd'], 2)
  },
  methods: {
    jumpSubpage() {
      window.open(`${window.location.origin}/subpage`)
    }
  },
  components: {}
}
</script>
