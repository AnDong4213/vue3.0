<template>
  <div>
    kk
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  props: {},
  setup() {
    const arr = [1, 2, 3, 40, 5, 1, 2, 3, 4];

    const getMax = function(array: number[]) {
      let max = undefined;
      for (let i = 0; i < array.length; ++i) {
        max = max === undefined ? array[i] : max >= array[i] ? max : array[i];
      }
      return max;
    };
    console.log(getMax(arr));

    //  a = i ++ //将i的值赋给a ， 即a = i,之后再执行i = i + 1;
    // a = ++ i //将i+1 的值赋给a，即a = i + 1 ,之后再执行i = i + 1;
    let a = 1;
    // const b = a++; // 2, 1
    const b = ++a; // 2, 1
    console.log(a, b); // 2, 2

    // 【总结】：
    // 1：后置++ 是将自身的值赋给变量，之后自身再加1；
    // 2：前置++ 是将自身+1 后的值赋给变量，同时自身加1

    return {};
  }
});
</script>

<style scoped>
</style>