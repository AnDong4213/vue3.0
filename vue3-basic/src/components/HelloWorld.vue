<template>
  <div class="hello"
       ref="root">
    <h1 @click="$emit('enlargeText', 2)">{{ msg }}-{{randomNum}}</h1>
    <self-test class="qw"
               date-picker='yy'
               v-model.trim="randomNum" />
  </div>
</template>

<script lang="ts">
// 并未实现任何的逻辑，就是把传入的object直接返回，传入的对象获得相应的类型，完全服务typescript
import { defineComponent, ref, onMounted } from "vue";
import SelfTest from "@/components/SelfTest.vue";

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {};
  },
  props: {
    msg: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    console.log(props.msg);
    console.log(context);
    const randomNum = ref("91");
    const root2 = ref(null);
    onMounted(() => {
      // DOM元素将在初始渲染后分配给ref
      console.log(root2.value); // <div>这是根元素</div>
    });

    return { randomNum, root2 };
  },
  emits: ["enlargeText"],
  components: {
    SelfTest
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
