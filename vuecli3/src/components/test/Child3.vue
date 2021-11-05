<template>
  <div class="child">
    <h1 style="color: orange;"
        @click="changePar">Child3</h1>
    <em>--{{test}}--{{fatherNum}}</em>
  </div>
</template>
<script>
// 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
export default {
  data() {
    return {
      test: "an"
    };
  },
  props: {
    fatherNum: {
      type: String
    }
  },
  created() {
    window.console.log(this.test);
    // this.test = "dong";
    setTimeout(() => {
      this.test = "dong";
    }, 100);
  },
  mounted() {
    window.console.log(this.test);
  },
  methods: {
    changePar() {
      this.$emit("update:fatherNum", "100");
      this.$emit("update:age-name", "200");
    }
  }
};
</script>
<style>
h1 {
  cursor: pointer;
}
</style>
