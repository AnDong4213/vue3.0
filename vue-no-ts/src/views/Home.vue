<template>
  <div class="home">
    <img src="../assets/logo.png" alt="" />
    <HelloWorld msg="Vue" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped lang='less'>
.home {
  color: red;
}
</style>
