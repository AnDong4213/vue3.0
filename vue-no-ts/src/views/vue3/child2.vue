<template>
  <div>Child2</div>
  <div ref="root">适用flush: 'post'</div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  name: 'child2',
  props: {},
  setup(props, context) {
    console.log(props)
    console.log(context)

    const root = ref(null)
    // watch() 和 watchEffect() 在 DOM 挂载或更新之前运行副作用，所以当侦听器运行时，模板引用还未被更新。
    // 使用模板引用的侦听器应该用 flush: 'post' 选项来定义，这将在 DOM 更新后运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素。
    watchEffect(
      () => {
        console.log(root.value) // (flush: 'post')运行在setup里的onMounted生命周期之后
      },
      {
        flush: 'post'
      }
    )

    return {
      root
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.test {
  display: flex;
}
.child2 {
  margin: 20px 0px;
}
</style>
