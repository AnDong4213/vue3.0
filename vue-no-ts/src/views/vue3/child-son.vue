<template>
  <div ref="childson">ChildSon</div>
  <div @click="updateUserLocation">
    {{ userLocation }}---{{ userGeolocation }}
  </div>
  <div
    v-for="(item, i) in list"
    :key="i"
    :ref="
      (el) => {
        if (el) divs[i] = el
      }
    "
  >
    {{ item }}
  </div>
</template>

<script>
// 通过一个新的 ref 函数使任何响应式变量在任何地方起作用
import { inject, onMounted, ref, reactive, onBeforeUpdate } from 'vue'

export default {
  name: 'child',
  props: {},
  setup(props, context) {
    console.log(props)
    console.log(context)

    const childson = ref(null)

    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')

    const list = reactive([1, 2, 3])
    const divs = ref([])

    onMounted(() => {
      console.log('ChildSon')
      console.log(childson.value)
      console.log(divs.value)
    })
    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      divs.value = []
    })

    return {
      userLocation,
      userGeolocation,
      updateUserLocation,
      childson,
      list,
      divs
    }
  },
  methods: {}
  /* inject: ['todoLength'],
  created() {
    console.log(this.todoLength.value)
  }, */
}
</script>

<style lang="scss" scoped>
.test {
  display: flex;
}
</style>
