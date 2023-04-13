<template>
  <teleport to="#modal2">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">删除文章</h5>
          <button type="button"
                  class="close"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>确定要删除这篇文章吗？</p>
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary">取消22</button>
          <button type="button"
                  class="btn btn-primary">确定33</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import useDOMCreate from "../hooks/useDOMCreate2";

export default defineComponent({
  name: "modal2",
  props: {
    content: String,
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["modal-on-close", "modal-on-confirm"],
  setup() {
    // useDOMCreate("modal2");
    return {};
  }
});
</script>
