<template>
  <div>singer--{{ arr.length }}</div>
  <div v-html="ele"></div>
  <!-- <anchored-heading :level="1">
    <a name="hello-world" href="#hello-world"> Hello world! </a>
  </anchored-heading> -->
  <anchored-heading :level="2">Hello world!</anchored-heading>

  <blog-post>
    <template #header>
      <h1>About Me2</h1>
    </template>
    <template #default>
      <p>Here's some page content, which will be included in $slots.default.</p>
      <p>
        跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容
        (v-slot:) 替换为字符 #
      </p>
    </template>
    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
</template>

<script>
import _ from 'lodash'
import AnchoredHeading from '@/components/anchored-heading'
import BlogPost from '@/components/blog-post'

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
    // 组件实例正在侦听的数据对象。组件实例代理了对其 data 对象 property 的访问。
    console.log(this.$data.ele)
    console.log(this.ele)
  },
  methods: {},
  components: {
    AnchoredHeading,
    BlogPost
  }
}
</script>
