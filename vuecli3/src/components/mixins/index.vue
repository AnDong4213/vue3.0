<template>
  <div class="parent">
    <div id="box">{{name}}：{{age}}，{{sex}}，{{print()}}，{{say}} </div>
  </div>
</template>
<script>
import { mix } from "./mix";

export default {
  mixins: [mix],
  data() {
    return {
      age: 10
    };
  },
  methods: {
    /* print: function() {
      return "这里是new Vue";
    } */
  },
  created() {
    window.console.log(this.age);
  },
  mounted() {
    this.age += 2;
    window.console.log(this.age); //13
    this.sex = "male";
  },
  computed: {
    say: function() {
      return "我在new Vue里面";
    }
  },
  components: {}
};
</script>
