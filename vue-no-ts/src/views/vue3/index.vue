<template>
  <div>VUE3</div>
  <child user="安东" />
</template>

<script>
import Child from './child.vue'

export default {
  name: 'vue3',
  components: {
    Child
  }
}
</script>
