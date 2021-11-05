<template>
  <button @click="sendMsg()">-</button>
</template>

<script>
import { EventBus } from "./event-bus.js";

export default {
  created() {
    window.console.log(this.$route);
  },
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", {
        message: "来自A页面的消息",
        word: "送你一朵小红花"
      });
      EventBus.$emit("andong", "牛小玉ლ(′◉❥◉｀ლ)");
    }
  },
  destroyed() {
    EventBus.$off("aMsg");
    EventBus.$off("andong");
  }
};
</script>