<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model='query' />
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input'
import { ref, watch } from 'vue'

export default {
  name: 'search',
  setup() {
    const query = ref('')
    watch(query, newVal => {
      console.log(newVal)
    })

    return {
      query
    }
  },
  components: { SearchInput }
}
</script>
