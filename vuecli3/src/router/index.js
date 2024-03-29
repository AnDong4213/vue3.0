import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import HelloWorld from "@/components/HelloWorld.vue";
import Axios from "@/components/axios.vue";
import ECharts from "@/components/echarts/ECharts";
import vModel from "@/components/vmodel/index.vue";
import Test from "@/components/test";
import Mixins from "@/components/mixins";
import Other from "@/components/other";
import EventBus from "@/components/event-bus";
import Tree from "@/components/tree";
import Tree2 from "@/components/tree/tree2";
import Docs from "@/components/docs";
import Docs2 from "@/components/docs2";
import introJs from "@/components/intro-js";
import tinymceVue from "@/components/tinymce-vue";
import uploadSlice from "@/components/upload-slice";
import vuePdf from "@/components/vuepdf";

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HelloWorld
    },
    {
      path: "/axios",
      name: "Axios",
      component: Axios
    },
    {
      path: "/echarts",
      name: "ECharts",
      component: ECharts
    },
    {
      path: "/model",
      name: "vModel",
      component: vModel
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/mixins",
      name: "Mixins",
      component: Mixins
    },
    {
      path: "/other",
      name: "Other",
      component: Other
    },
    {
      path: "/eventbus",
      name: "EventBus",
      component: EventBus
    },
    {
      path: "/tree",
      name: "Tree",
      component: Tree
    },
    {
      path: "/tree2",
      name: "Tree2",
      component: Tree2
    },
    {
      path: "/docs",
      name: "Docs",
      component: Docs
    },
    {
      path: "/docs2",
      name: "Docs2",
      component: Docs2
    },
    {
      path: "/introjs",
      name: "introJs",
      component: introJs
    },
    {
      path: "/tinymcevue",
      name: "tinymceVue",
      component: tinymceVue
    },
    {
      path: "/uploadSlice",
      name: "uploadSlice",
      component: uploadSlice
    },
    {
      path: "/vuepdf",
      name: "vuePdf",
      component: vuePdf
    }
  ]
});

export default router;
