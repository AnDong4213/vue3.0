<template>
  <div class="dropdown"
       ref="dropdownRef">
    <a href="#"
       class="btn btn-outline-light my-2 dropdown-toggle"
       @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu"
        :style="{display: 'block'}"
        v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onUnmounted } from "vue";
import useClickOutside from "@/hooks/useClickOutside";
import mitt from "mitt";

export const emitter = mitt();

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ["item-clicked"],
  setup(props, context) {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dropDownItemClicked = (e: any) => {
      if (e.props.closeAfterClick) {
        isOpen.value = false;
      }
      context.emit("item-clicked", e);
    };
    emitter.on("dropdown-item-clicked", dropDownItemClicked);
    onUnmounted(() => {
      emitter.off("dropdown-item-clicked", dropDownItemClicked);
    });

    const isClickOutside = useClickOutside(dropdownRef);
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
