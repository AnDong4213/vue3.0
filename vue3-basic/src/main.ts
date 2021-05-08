import { createApp } from "vue";
import App from "./App.vue";
import SearchInputComponent from "@/components/SearchInput.vue";
import router from "./routes";

// createApp(App).mount('#app')

const app = createApp(App);
app.config.globalProperties.foo = "bar3";

app.component("SearchInput", SearchInputComponent);

// app.use(MyPlugin)
app.use(router).mount("#app");

// setTimeout(() => app.unmount(), 5000);
