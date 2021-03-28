import { createApp } from "vue";
import router from "./routes";
import store from "./store";
import axios from "axios";

import App from "./App.vue";

axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
  // console.log("config", config);
  config.params = { ...config.params, icode: "F2BF08A0B5157C38" };
  return config;
});

// axios.get("/columns").then(res => console.log(res));

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
