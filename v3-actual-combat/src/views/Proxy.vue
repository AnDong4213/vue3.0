<template>
  <div>
    <div>Proxy--{{map.get("count").value}}</div>
    <h1 ref="root1"
        @click="testrender ='呵呵呵'">root--{{testrender}}</h1>
    <proxy-child :testrender='testrender'>
      <div class="slot-test">
        <p>kkk </p>
      </div>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <template #footer>
        <p>Here's some footer info</p>
      </template>
    </proxy-child>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import ProxyChild from "./ProxyChild.vue";

export default defineComponent({
  name: "Proxy",
  props: {},
  setup() {
    const handleProxy = () => {
      console.log("Proxy");
    };
    const root1 = ref();
    const testrender = ref("哈哈");

    onMounted(() => {
      handleProxy();
      console.log("root1", root1.value.innerHTML);
    });

    // Ref 展开仅发生在被响应式 Object 嵌套的时候。当从 Array 或原生集合类型如 Map 访问 ref 时，不会进行展开
    const books = reactive([ref("Vue 3 Guide")]);
    console.log(books[0].value);

    const map = reactive(new Map([["count", ref(100)]])); // 这里需要 .value
    // console.log(map.get("count").value); // 这样写编译不通过  Object is possibly 'undefined'.

    /* const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });
    return () => h("div", [readersNumber.value, book.title]); */

    return {
      map,
      root1,
      testrender
    };
  },
  components: {
    ProxyChild
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
