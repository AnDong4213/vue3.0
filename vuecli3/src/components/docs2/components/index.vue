<template>
  <div class="tinymce-container">
    <textarea id="tinymceId"
              class="tinymce-textarea" />
    </div>
</template>

<script>
import loadJs from "./loadScript";

// const tinymceCDN =
//   "https://cdn.tiny.cloud/1/no-origin/tinymce/5.10.0-121/tinymce.min.js";
// const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce@5.10.0/tinymce.js";
const tinymceCDN = "http://localhost:8080/tinymce/tinymce.js";

export default {
  name: "Tinymce2",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      loadJs(tinymceCDN, err => {
        if (err) {
          this.$message.error(err.message);
          return;
        } else {
          this.initTinymce();
        }
      });
    },
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        selector: "#tinymceId",
        language: "zh_CN",
        plugins:
          "export pagebreak lists advlist anchor autolink link autoresize autosave charmap advcode codesample directionality emoticons fullscreen help hr image importword media wordcount powerpaste table advtable template",
        toolbar:
          "importword export code undo redo restoredraft | cut copy powerpaste | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs kityformula-editor template help",
        // menubar: "insert",
        export_cors_hosts: [],
        image_caption: true,
        images_upload_credentials: true,
        tinydrive_token_provider: "URL_TO_YOUR_TOKEN_PROVIDER",
        height: 350, //编辑器高度
        min_height: 400,
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        image_advtab: true,
        image_uploadtab: true,
        // image_description: false,
        link_list: [
          { title: "预置链接1", value: "http://www.tinymce.com" },
          { title: "预置链接2", value: "http://tinymce.ax-z.cn" }
        ],
        image_list: [
          {
            title: "预置图片1",
            value: "https://www.tiny.cloud/images/glyph-tinymce@2x.png"
          },
          {
            title: "预置图片2",
            value: "https://www.baidu.com/img/bd_logo1.png"
          }
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" }
        ],
        //importcss_append: true,
        //自定义文件选择器的回调内容
        file_picker_callback: function(callback, value, meta) {
          if (meta.filetype === "file") {
            callback("https://www.baidu.com/img/bd_logo1.png", {
              text: "My text"
            });
          }
          if (meta.filetype === "image") {
            callback("https://www.baidu.com/img/bd_logo1.png", {
              alt: "My alt text"
            });
          }
          if (meta.filetype === "media") {
            callback("movie.mp4", {
              source2: "alt.ogg",
              poster: "https://www.baidu.com/img/bd_logo1.png"
            });
          }
        },
        //为内容模板插件提供预置模板
        templates: [
          { title: "模板1", description: "介绍文字1", content: "模板内容" },
          {
            title: "模板2",
            description: "介绍文字2",
            content:
              '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>'
          }
        ],
        //content_security_policy: "script-src *;",
        extended_valid_elements: "script[src]",
        //
        template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
        autosave_ask_before_unload: false,
        toolbar_mode: "wrap",
        // automatic_uploads: false,
        // images_upload_url: "",
        // images_upload_base_path: "/demo",
        images_upload_handler(blobInfo, succFun, failFun) {
          var xhr, formData;
          var file = blobInfo.blob(); //转化为易于理解的file对象
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open("POST", "/api/other/form");
          xhr.onload = function() {
            var json;
            if (xhr.status != 200) {
              failFun("HTTP Error: " + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location != "string") {
              failFun("Invalid JSON: " + xhr.responseText);
              return;
            }
            succFun(json.location);
          };
          formData = new FormData();
          formData.append("file", file, file.name);

          xhr.send(formData);
        },
        branding: false
        // statusbar: false
        //icons:'ax-color',
      });
    }
  },
  watch: {
    value(val) {}
  }
};
</script>

<style lang="scss" scoped>
</style>
