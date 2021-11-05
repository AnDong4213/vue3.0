<template>
  <div class="child">
    <h1 style="color: pink;"
        @click="changePar">Child2</h1>
  </div>
</template>
<script>
// 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
export default {
  props: {},
  methods: {
    changePar() {
      this.$emit("haha", {
        type: "QQQTTT"
      });
    }
  }
};
</script>
<style>
h1 {
  cursor: pointer;
}
</style>
