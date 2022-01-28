<template>
  <div>singer--{{ arr.length }}</div>
  <div v-html="ele"></div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'singer',
  data() {
    return {
      arr: [],
      ele: '<p style="color: red;">内嵌HTML标签</p>'
    }
  },
  created() {
    this.arr = _.chunk(['a', 'b', 'c', 'd', 'e', 'f'], 2)
  },
  methods: {},
  components: {}
}
</script>
