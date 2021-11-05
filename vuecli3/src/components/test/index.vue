<template>
  <div class="parent">
    <p v-if="isShow">哈哈</p>
    <p style="color: red;">{{ name }}</p>
    <p style="color: blue;">{{ child2 }}</p>
    <child @on-change="
        name = $event;
        isShow = true;
      " />
    <child2 @haha="onChange('index', $event)" />
    <div>
      {{ test3 }}
      {{ test33 }}
      <child3 :father-num.sync="test3"
              :ageName.sync="test33" />
    </div>
    <div @click="changeTest3">改变test3</div>
    <el-button type="primary">看看</el-button>
  </div>
</template>
<script>
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
import Child3 from "./Child3.vue";
import Other from "../other/index.vue";

export default {
  data() {
    return {
      name: "kk",
      child2: "child2",
      isShow: false,
      test3: "sync333",
      test33: "sync333-3"
    };
  },
  created() {
    window.console.log(Other);
  },
  methods: {
    onChange(type, e) {
      window.console.log(type);
      window.console.log(e);
      this.child2 = e;
    },
    changeTest3() {
      this.test3 = "假假按揭";
    }
  },
  watch: {
    test3(newVal, oldVal) {
      window.console.log(newVal);
      window.console.log(oldVal);
    }
  },
  components: {
    Child,
    Child2,
    Child3
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
