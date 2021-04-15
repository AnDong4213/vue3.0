<template>
  <section>
    <h2>provide-inject-{{user.value}}</h2>
    <em>{{haha}}</em>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inject: ["user", "haha"]
});
</script>