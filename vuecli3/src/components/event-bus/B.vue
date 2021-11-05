<template>
  <div>
    <p>{{msg}}</p>
    <h1>{{aa}}</h1>
  </div>
</template>

<script>
import { EventBus } from "./event-bus.js";

export default {
  data() {
    return {
      msg: "",
      aa: ""
    };
  },
  mounted() {
    EventBus.$on("aMsg", msg => {
      // A发送来的消息
      const { message, word } = msg;
      this.msg = word + "-" + message;
    });

    EventBus.$on("andong", msg => {
      // A发送来的消息
      window.console.log(msg);
      this.aa = msg;
    });
  }
};
</script>