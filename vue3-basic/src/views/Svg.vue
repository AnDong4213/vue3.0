<template>
  <div>
    <h2>svg</h2>
    <svg-icon style="height: 80px;width: 80px;" icon-name="chic" />
  </div>
</template>

<script lang="ts">
import SvgIcon from '@/components/svg-icon.vue'

export default {
  name: "svg",
  props: {},
  components: {
    SvgIcon
  }

};
</script>

<style scoped>

</style>