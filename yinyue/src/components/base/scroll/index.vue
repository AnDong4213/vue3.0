<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null)
    // console.log(props)   // Proxy {click: true, probeType: 0}
    const scroll = useScroll(rootRef, props, emit)

    return {
      rootRef,
      scroll
    }
  }
}
</script>
