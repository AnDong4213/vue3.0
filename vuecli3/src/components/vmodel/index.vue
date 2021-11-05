<template>
<div class="parent">
  <p>我是父亲, 对儿子说： {{sthGiveChild}}</p>
  <Child @returnBack="turnBack" :age="age" :give="sthGiveChild"></Child>
</div>
</template>
<script>
import Child from './Child.vue';
export default {
  data() {
    return {
      sthGiveChild: '给你100块',
      age: 1
    };
  },
  components: {
    Child
  },
  methods: {
    turnBack(val) {
      this.sthGiveChild = val;
    }
  }
}
</script>