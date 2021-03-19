<template>
  <section>
    <p style="color: pink;">我是(全局)SearchInput组件哦{{age}}</p>
    <p>我是全局属性-{{foo}}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const age = ref(9);

    return {
      age
    };
  }
});
</script>