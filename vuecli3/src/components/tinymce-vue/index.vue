<template>
  <div id="app">
    <editor api-key="no-api-key"
            :init="{
         height: 500,
         menubar: true,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }" />
  </div>
</template>

 <script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "tinymceVue",
  components: {
    editor: Editor
  }
};
</script>