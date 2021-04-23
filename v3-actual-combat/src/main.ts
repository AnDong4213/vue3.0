import { createApp } from "vue";
import router from "./routes";
import store from "./store";
import axios from "axios";

import App from "./App.vue";
export const CODE = "9732453E138AA502";

axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false, message: "" });
  config.params = { ...config.params, icode: CODE };

  if (config.data instanceof FormData) {
    config.data.append("icode", CODE);
  } else {
    config.data = { ...config.data, icode: CODE };
  }
  return config;
});
axios.interceptors.response.use(
  config => {
    store.commit("setLoading", false);
    return config;
  },
  e => {
    // console.log(e.response);
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(new Error(error));
  }
);

/* async function hello() {
  return "Hello";
}
// console.log(hello()); Promise {<fulfilled>: "Hello"}
hello().then(res => console.log(res)); */
/* async function hello2() {
  const greeting = await Promise.resolve("Hello2");
  return greeting;
}
hello2().then(res => console.log(res)); */
// console.log(hello2()); // Promise{<pending>}

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
