<template>
  <div class="child">
    <p>我是儿子，父亲对我说： {{haha}}--</p>
    <a href="javascript:;"
       @click="returnBackFn">回应{{age}}</a>
  </div>
</template>
<script>
// 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
export default {
  props: {
    haha: String,
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function(a) {
        // 会将该 prop 的值作为唯一的参数代入
        window.console.log(a);
        return a >= 0;
      }
    }
  },
  model: {
    prop: "haha",
    event: "returnBack"
  },
  methods: {
    returnBackFn() {
      this.$emit("returnBack", "还你200块");
    }
  }
};
</script>