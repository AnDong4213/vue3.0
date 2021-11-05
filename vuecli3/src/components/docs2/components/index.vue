<template>
  <div class="tinymce-container">
    <textarea id="tinymceId"
              class="tinymce-textarea" />
    </div>
</template>

<script>
import loadJs from "./loadScript";

const tinymceCDN =
  "https://cdn.tiny.cloud/1/no-origin/tinymce/5.10.0-121/tinymce.min.js";
// const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce@5.10.0/tinymce.js";
// const tinymceCDN = "http://localhost:8080/tinymce.js";

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
        // inline: true,
        // skin:'oxide-dark',
        language: "zh_CN",
        /* plugins:
          "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template advcode codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs importword kityformula-editor", */
        plugins: ["code", "image"],
        toolbar:
          "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                     styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                     table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs importword kityformula-editor",
        height: 350, //编辑器高度
        min_height: 400,
        /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
                        '/static/reset.css',
                        '/static/ax.css',
                        '/static/css.css',
                    ],*/
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
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
        }
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
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
