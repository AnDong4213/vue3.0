<template>
  <div class="child">
    <h1 style="color: yellow;"
        @click="changePar($event)">Child1</h1>
  </div>
</template>
<script>
// 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
export default {
  props: {},
  methods: {
    changePar(e) {
      window.console.log(e.target.tagName.toLowerCase());
      this.$emit("on-change", "kk变为YYY");
    }
  }
};
</script>
<style>
h1 {
  cursor: pointer;
}
</style>