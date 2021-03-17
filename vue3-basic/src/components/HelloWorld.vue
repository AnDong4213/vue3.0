<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
// 并未实现任何的逻辑，就是把传入的object直接返回，传入的对象获得相应的类型，完全服务typescript
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    console.log(props.msg);
    console.log(context);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
