<template>
  <div class="validate-input-container pb-3">
    <input class="form-control"
           v-if="tag !== 'textarea'"
           :class="{ 'is-invalid': inputRef.error }"
           @blur="validateInput"
           v-model="inputVal"
           v-bind="$attrs" />
    <textarea v-else
              class="form-control"
              :class="{ 'is-invalid': inputRef.error }"
              @blur="validateInput"
              v-model="inputVal"
              v-bind="$attrs">
    </textarea>

    <span>Fallthrough attribute: {{ $attrs }}</span>
    <span v-if="inputRef.error"
          class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from "vue";
import { emitter } from "./ValidateForm.vue";
export interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default defineComponent({
  name: "ValidateInput",
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input"
    }
  },
  // 如果你不希望组件的根元素继承 attribute，可以在组件的选项中设置 inheritAttrs: false。禁用 attribute 继承的常见场景是需要将 attribute 应用于根节点之外的其他元素。
  inheritAttrs: false,
  setup(props, context) {
    console.log(context.attrs)
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: ""
    });

    const inputVal = computed({
      get: () => props.modelValue || "",
      set: val => {
        // console.log("val", val);
        context.emit("update:modelValue", val);
      }
    });

    /* watch(
      () => props.modelValue,
      newVal => {
        console.log("watch trigger");
        inputRef.val = newVal || "";
      }
    );
    const updateValue = (e: KeyboardEvent) => {
      console.log("update trigger");
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    }; */

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message;
          const { value } = inputVal;
          switch (rule.type) {
            case "required":
              // passed = inputRef.val.trim() !== "";
              passed = value.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(value);
              break;
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      inputVal
      // updateValue
    };
  },
  emits: ["update:modelValue"]
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
