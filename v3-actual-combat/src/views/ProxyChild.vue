<template>
  <div>
    <div>ProxyChild{{copy.count}}</div>
    <div v-for="(item, i) in list"
         :key="i"
         :ref="el => { if (el) divs[i] = el }">
      {{ item }}
    </div>
    <slot name="header"></slot>
    <slot name="footer">
      UUU
    </slot>
    <slot></slot>
    <div>
      {{testrender}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, ref, onMounted } from "vue";

export default defineComponent({
  name: "ProxyChild",
  props: {
    testrender: {
      type: String
    }
  },
  setup() {
    console.log(777777);
    const original = reactive({ count: 0 });
    const copy = readonly(original);
    original.count++;
    // copy.count++;  // 报错
    console.log("ProxyChild");

    const list = reactive([1, 2, 3]);
    const divs = ref([]);

    onMounted(() => {
      console.log(0);
      console.log("divs", divs.value[0]);
    });

    return { copy, list, divs };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
