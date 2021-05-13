<template>
  <div>
    <h1>哇哦，页面不存在哦</h1>
    <p>2s后跳转...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "",
  props: {},
  setup() {
    const router = useRouter();

    setTimeout(() => {
      router.push("/");
    }, 2000);
    return {};
  }
});
</script>

<style scoped>
div {
  text-align: center;
}
</style>