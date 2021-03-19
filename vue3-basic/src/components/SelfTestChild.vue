<template>
  <section>
    <h2>provide-inject-{{user}}</h2>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inject: ["user"]
});
</script>