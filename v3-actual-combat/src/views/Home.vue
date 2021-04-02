<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg"
               alt="callout"
               class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#"
               class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <uploader action="/upload"
              :beforeUpload="beforeUpload"
              @file-uploaded="onFileUploaded">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url"
             width="500" />
      </template>
    </uploader>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ColumnList from "@/components/ColumnList.vue";
import Uploader from "@/components/Uploader.vue";
import { GlobalDataProps, ResponseType, ImageProps } from "@/store";
import createMessage from "@/components/createMessage";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    const beforeUpload = (file: File) => {
      const isJPG = file.type === "image/jpeg";
      const isExceedFileSize = file.size / 1024 <= 1024;
      if (!isJPG) {
        createMessage("上传图片只能是 JPG 格式!", "error");
        return false;
      }
      if (!isExceedFileSize) {
        createMessage("上传图片大小不能大于1M", "error");
        return false;
      }
      return true;
    };

    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id}`, "success");
    };

    onMounted(() => {
      store.dispatch("fetchColumns");
    });

    return {
      list,
      beforeUpload,
      onFileUploaded
    };
  },
  components: {
    ColumnList,
    Uploader
  }
});
</script>