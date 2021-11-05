import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ECharts from "vue-echarts";
Vue.component("v-chart", ECharts);

import ElementUI from "element-ui";
// import './assets/element-variables.scss'
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
