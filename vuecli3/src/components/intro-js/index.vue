<template>
  <div class="introJs-container">
    <div class="container-narrow">
      <div class="masthead">
        <ul class="nav nav-pills pull-right"
            data-step="5"
            data-intro="下载并使用它吧！">
          <li><a href="https://github.com/usablica/intro.js/tags"
               target="_blank"><i class='icon-black icon-download-alt'></i> 下载</a></li>
          <li><a href="https://github.com/usablica/intro.js"
               target="_blank">Github</a></li>
        </ul>
        <h3 class="muted">Intro.js</h3>
      </div>
      <el-quarter-picker v-model="value"
                         placeholder="选择季度" />
      <hr>
      <div class="jumbotron">
        <h1 data-step="1"
            data-intro="Hello! :) 这个项目叫做 Intro.js.">Intro.js</h1>
        <p class="lead"
           data-step="4"
           data-intro="试试吧，它是免费的、开源的。">为您的网站和项目提供一步一步的、更好的介绍</p>
        <a class="btn btn-large btn-success"
           @click="showIntro">点击我</a>
      </div>
      <hr>
      <div class="row-fluid marketing">
        <div class="span6"
             data-step="2"
             data-intro="是不是很有趣呢？"
             data-title='乐乐'
             data-position="right">
          <h4>使用简单</h4>
          <p>引入 js 和 css，然后在代码中加入步骤和介绍。</p>
          <h4>快速小巧</h4>
          <p><strong>7 KB</strong> 的 JavaScript 和 <strong>3 KB</strong> CSS，就是全部。</p>
          <h4>免费开源</h4>
          <p>免费和开源（包括商业用途），MIT许可证下。</p>
        </div>
        <div class="span6"
             data-step="3"
             data-intro="更多的功能，更多的乐趣。"
             data-position="left">
          <h4>键盘加鼠标导航</h4>
          <p>鼠标或键盘 <code>←</code>, <code>→</code>, <code>ENTER</code> 导航，<code>ESC</code> 键退出。</p>
          <h4>浏览器兼容</h4>
          <p>目前兼容 Firefox、Chrome 和 IE8，后续版本将会提供更好的兼容。</p>
        </div>
      </div>
      <hr>
      <div class="footer">
        <p>&copy; <a href="https://www.dowebok.com/"
             target="_blank"
             title="做好网站">dowebok.com</a> 2013-2020</p>
      </div>
    </div>
  </div>
</template>

<script>
import ElQuarterPicker from "./../../custom-components/el-quarter-picker";
import introJs from "intro.js";
import "bootstrap/dist/css/bootstrap.css";
import "./demo.css";
import "intro.js/introjs.css";
import "intro.js/themes/introjs-flattener.css";
import "./custom.scss";

export default {
  name: "introJs",
  data() {
    return {
      introJs: null,
      value: ""
    };
  },
  components: { ElQuarterPicker },
  created() {
    console.log(new introJs());
  },
  mounted() {
    this.introJs = new introJs();
    // this.introJs.goToStepNumber(2).start();
  },
  methods: {
    showIntro() {
      this.introJs
        // .onbeforeexit(() => confirm("Are you sure?"))
        .onchange(targetElement => {
          console.log(targetElement);
        })
        .setOptions({
          nextLabel: "下一步 &rarr;",
          prevLabel: "&larr; 上一步",
          skipLabel: "退出",
          tooltipClass: "custom-tooltip-style",
          showBullets: false
        })
        .start();
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
</style>

