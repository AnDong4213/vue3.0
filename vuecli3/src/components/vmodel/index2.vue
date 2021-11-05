<template>
  <div class="parent">
    <p>我是父亲, 对儿子说： {{sthGiveChild}}</p>
    <Child :test="test"
           v-model="sthGiveChild"></Child>
  </div>
</template>
<script>
import Child from "./Child2.vue"; // 或者Child

export default {
  data() {
    return {
      sthGiveChild: "给你100块",
      test: 20
    };
  },
  components: {
    Child
  },
  watch: {
    sthGiveChild: function(newVal) {
      window.console.log(newVal + "--");
    }
  }
};
</script>