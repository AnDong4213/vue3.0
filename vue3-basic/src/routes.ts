import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Echarts from "@/views/Echarts.vue";
import Echarts2 from "@/views/Echarts2.vue";
import Echarts3 from "@/views/Echarts3.vue";

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
    },
    {
      path: "/echart2",
      name: "echart2",
      component: Echarts2,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: "/echart3",
      name: "echart3",
      component: Echarts3,
      meta: {
        requiredLogin: true
      }
    }
  ]
});

export default router;
