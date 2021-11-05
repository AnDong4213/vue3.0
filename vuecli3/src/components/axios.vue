<template>
  <div class="hello">
    <p>
      Ask a yes/no question:
      <input v-model="question">
    </p>
    <p>{{ answer }}</p>
    <el-image :src="image"></el-image>
    {{image}}
  </div>
</template>

<script>
import _ from "lodash";
import axios from "ts-axios-andong";

export default {
  name: "Axios",
  props: {},
  data() {
    return {
      question: "",
      answer: "I cannot give you an answer until you ask a question!",
      image: ""
    };
  },
  computed: {
    // 计算属性的 getter
  },
  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function() {
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        return;
      }
      this.answer = "Thinking...";
      var vm = this;

      const instance = axios.create();
      instance.interceptors.request.use(config => {
        config.params = {
          _t: +new Date()
        };
        return config;
      });
      instance
        .get("https://yesno.wtf/api")
        .then(function(response) {
          vm.answer = _.capitalize(response.data.answer);
          vm.image = response.data.image;
          window.console.log(response);
        })
        .catch(function(error) {
          vm.answer = "Error! Could not reach the API. " + error;
        });
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function() {
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
