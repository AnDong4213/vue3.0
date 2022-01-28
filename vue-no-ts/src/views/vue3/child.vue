<template>
  <div>Child</div>
  <div class="test">
    <h3>{{ user }}--{{ user2 }}---</h3>
    <h3>{{ counter }}</h3>
  </div>
</template>

<script>
// 通过一个新的 ref 函数使任何响应式变量在任何地方起作用
import { onMounted, ref } from 'vue'

export default {
  name: 'child',
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props)

    const counter = ref(10)
    console.log(counter.value)

    onMounted(() => {
      console.log(90)
    })

    return {
      user2: props.user + '2',
      counter
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.test {
  display: flex;
}
</style>
