<template>
  <div>Child</div>
  <div class="test">
    <h3>{{ user }}--{{ user2 }}---</h3>
    <h3>{{ counter }}--{{ twiceTheCounter }}</h3>
  </div>
  <div>
    <p>reactive</p>
    <p>{{ state.count }}--{{ haha }}</p>
  </div>

  <div class="child2">
    <child-son />
  </div>
</template>

<script>
// 通过一个新的 ref 函数使任何响应式变量在任何地方起作用
import { onMounted, ref, watch, toRefs, computed, reactive, toRef } from 'vue'
import ChildSon from './child-son.vue'

export default {
  name: 'child',
  props: {
    user: {
      type: String,
      required: true
    },
    title: {
      type: String
    }
  },
  setup(props, context) {
    console.log(props)
    console.log(context)
    // 因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
    // 使用 `toRefs` 创建对 `props` 中的 `user` property 的响应式引用
    const { user } = toRefs(props)

    // 如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它：
    const title = toRef(props, 'title')
    console.log(title.value)

    // 将值封装在一个对象中，是为了保持 JavaScript 中不同数据类型的行为统一，因为在 JavaScript 中，Number 或 String 等基本类型是通过值而非引用传递的。
    const counter = ref(10)
    const twiceTheCounter = computed(() => {
      return counter.value * 2
    })
    counter.value++

    // 要为 JavaScript 对象创建响应式状态，可以使用 reactive 方法：
    const haha = ref(0) // 当 ref 作为响应式对象的 property 被访问或更改时，为使其行为类似于普通 property，它会自动解包内部值：
    const state = reactive({
      count: 10,
      age: 25,
      haha
    })
    state.count++
    // console.log(state.count) // 11
    // console.log(state.haha) // 0
    state.haha = 1
    // console.log(haha.value) // 1  haha的值也改变了

    const user2 = computed(() => {
      return user.value + '2'
    })

    onMounted(() => {
      console.log(90)
    })

    watch(user, (newValue, oldValue) => {
      console.log(newValue, oldValue)
      counter.value++
    })

    const book = reactive({
      author: 'Vue Team',
      year: '2022',
      title: 'Vue 3 Guide',
      description: 'You are reading this book right now ;)',
      price: 'free'
    })
    const { author } = toRefs(book) // 需要将我们的响应式对象转换为一组 ref。这些 ref 将保留与源对象的响应式关联
    console.log(author.value)

    return {
      user2,
      counter,
      twiceTheCounter,
      state,
      haha
    }
  },
  components: {
    ChildSon
  }
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
