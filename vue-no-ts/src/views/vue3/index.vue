<template>
  <h2 class="user" @click="changeUser">change user</h2>
  <h2 class="user" @click="updateLocation">change Location</h2>
  <child :user="user" />
</template>

<script>
// 在 setup() 中使用 provide 时，我们首先从 vue 显式导入 provide 方法。
import { ref, reactive, provide, readonly } from 'vue'
import Child from './child.vue'

export default {
  name: 'vue3',
  data() {
    return {
      user: '安东',
      arrList: [1, 2, 3]
    }
  },
  methods: {
    changeUser() {
      this.user = '小玉'
    },
    updateLocation() {
      this.location = 'South Pole'
    }
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'East Pole'
    }

    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)

    return {
      location
    }
  },
  // 要访问组件实例 property，我们需要将 provide 转换为返回对象的函数：
  /* provide: {
    user2: 'John Doe'
  }, */
  /* provide() {
    return {
      todoLength: computed(() => this.arrList.length)
    }
  }, */
  components: {
    Child
  }
}
</script>

<style lang="scss" scoped>
.user {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
