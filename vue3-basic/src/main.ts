import { createApp } from "vue";
import App from "./App.vue";
import SearchInputComponent from "@/components/SearchInput.vue";

// createApp(App).mount('#app')

const app = createApp(App);
app.config.globalProperties.foo = "bar";

app.component("SearchInput", SearchInputComponent);

// app.use(MyPlugin)
app.mount("#app");

// setTimeout(() => app.unmount(), 5000);
