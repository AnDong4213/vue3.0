import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Echarts from "@/views/Echarts.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/echart",
      name: "echart",
      component: Echarts,
      meta: {
        requiredLogin: true
      }
    }
  ]
});

export default router;
