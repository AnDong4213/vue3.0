<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content"
               :height="300" />
    </div>
    <div class="editor-content"
         v-html="content" />
  </div>
</template>

<script>
import Tinymce from "./Tinymce";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><ul>
      </ul>`
    };
  },
  watch: {
    content(newVal) {
      // console.log(newVal);
    }
  }
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

