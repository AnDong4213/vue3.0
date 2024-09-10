<template>
  <div ref="scrollRef">使用鼠标滚轮来进行缩放</div>
</template>

<script lang="ts" setup>
import { VueElement, h, reactive, ref, onMounted } from "vue";

import { Button, Menu, MenuItem, LayoutSider } from "ant-design-vue";
const scrollRef = ref(null);
let scale = 1;

const zoom = (event) => {
  console.log(event);
  event.preventDefault();

  scale += event.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(0.125, scale), 4);

  // Apply scale transform
  scrollRef.value.style.transform = `scale(${scale})`;
};

onMounted(() => {
  console.log(scrollRef.value);

  scrollRef.value.onwheel = zoom;
});
</script>

<style scoped>
div {
  width: 205px;
  height: 205px;
  background: #cdf;
  padding: 5px;
}
</style>
