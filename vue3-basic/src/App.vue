<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <button @click="increase">+1</button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  setup() {
    // count就是一个响应式的对象，可以监测到改变
    const count = ref(0);
    const double = computed(() => {
      return count.value * 2;
    });
    const increase = () => {
      count.value++;
    };

    return {
      count,
      increase,
      double
    };
  },
  components: {}
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
