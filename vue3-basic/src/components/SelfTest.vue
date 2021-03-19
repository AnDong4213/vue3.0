<template>
  <section>
    <h2 @click="$emit('update:modelValue', '    uu 99')">change</h2>
    <p style="color: red;">{{modelValue}}</p>
    <self-test-child />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
// import SelfTestChild from "@/components/SelfTestChild.vue";
const SelfTestChild = defineAsyncComponent(() =>
  import("@/components/SelfTestChild.vue")
);

export default defineComponent({
  props: {
    modelValue: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup() {
    const name = ref("");

    return {
      name
    };
  },
  components: {
    SelfTestChild
  }
});
</script>