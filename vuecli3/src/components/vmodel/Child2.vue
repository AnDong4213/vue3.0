<template>
  <div class="child">
    <h2>{{test}}</h2>
    <p>我是儿子，父亲对我说： {{value}}</p>
    <a href="javascript:;"
       rel="external nofollow"
       @click="returnBackFn">回应3</a>
  </div>
</template>
<script>
// 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
export default {
  props: {
    value: String,
    test: {
      type: Number
    }
  },
  /* methods: {
    returnBackFn() {
      this.$emit("input", "还你200块uu");
    }
  }, */

  model: {
    prop: "value",
    event: "returnBack"
  },
  methods: {
    returnBackFn() {
      this.$emit("returnBack", "还你200块");
    }
  }
};
</script>