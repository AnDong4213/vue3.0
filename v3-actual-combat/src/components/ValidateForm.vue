<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area"
         @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit"
                class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt, { Emitter } from "mitt";

export const emitter: Emitter = mitt();
type ValidateFunc = () => boolean;

export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result);
      context.emit("form-submit", result);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });

    return {
      submitForm
    };
  }
});
</script>