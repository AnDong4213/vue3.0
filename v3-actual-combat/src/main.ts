import { createApp } from "vue";
import router from "./routes";
import store from "./store";
import axios from "axios";

import App from "./App.vue";

axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
  // console.log("config", config);
  store.commit("setLoading", true);
  config.params = { ...config.params, icode: "F2BF08A0B5157C38" };
  return config;
});
axios.interceptors.response.use(config => {
  store.commit("setLoading", false);
  return config;
});

/* async function hello() {
  return "Hello";
}
// console.log(hello()); Promise {<fulfilled>: "Hello"}
hello().then(res => console.log(res)); */
async function hello2() {
  const greeting = await Promise.resolve("Hello2");
  return greeting;
}
console.log(hello2()); // Promise{<pending>}
hello2().then(res => console.log(res));

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
