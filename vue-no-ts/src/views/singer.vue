<template>
  <div>singer--{{ arr.length }}</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'singer',
  data() {
    return {
      arr: []
    }
  },
  created() {
    this.arr = _.chunk(['a', 'b', 'c', 'd', 'e', 'f'], 2)
  },
  methods: {},
  components: {}
}
</script>
