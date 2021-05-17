<template>
  <v-chart class="chart"
           v-if="isJson"
           :option="areaOption" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { ref, defineComponent, onMounted } from "vue";
import axios from "axios";
import * as echarts from "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent
]);

const areaOption = {
  title: {
    text: "China人口估计 ",
    left: "right"
  },
  tooltip: {
    trigger: "item",
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function(params: any) {
      let value: any = (params.value + "").split(".");
      value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
      return params.seriesName + "<br/>" + params.name + ": " + value;
    }
  },
  visualMap: {
    type: "piecewise",
    min: 500000,
    max: 18000000,
    calculable: true,
    inverse: false,
    itemWidth: 30,
    text: ["高", "低"],
    inRange: {
      color: [
        "#e6f7ff",
        "#bae7ff",
        "#91d5ff",
        "#69c0ff",
        "#40a9ff",
        "#1890ff",
        "#096dd9",
        "#0050b3"
      ]
    },
    left: 40
  },
  series: [
    {
      name: "CHN-Pop-Estimates",
      type: "map",
      roam: false,
      zoom: 1.5,
      map: "CHN",
      label: {
        show: true,
        position: ["50%", "50%"]
      },
      emphasis: {
        label: {
          show: true
        },
        itemStyle: {
          areaColor: "#FE3379"
        }
      },
      top: 200
    }
  ],
  dataset: {
    source: [
      {
        name: "山东",
        value: 4822023
      },
      {
        name: "台湾",
        value: 731449
      },
      {
        name: "福建",
        value: 6553255
      },
      {
        name: "河南",
        value: 2949131
      },
      {
        name: "河北",
        value: 38041430
      },
      {
        name: "重庆",
        value: 5187582
      },
      {
        name: "湖北",
        value: 3590347
      },
      {
        name: "湖南",
        value: 917092
      },
      {
        name: "江西",
        value: 632323
      },
      {
        name: "海南",
        value: 19317568
      },
      {
        name: "黑龙江",
        value: 9919945
      },
      {
        name: "天津",
        value: 1392313
      },
      {
        name: "陕西",
        value: 1595728
      },
      {
        name: "贵州",
        value: 12875255
      },
      {
        name: "新疆",
        value: 6537334
      },
      {
        name: "澳门",
        value: 3074186
      },
      {
        name: "江苏",
        value: 2885905
      },
      {
        name: "安徽",
        value: 4380415
      },
      {
        name: "西藏",
        value: 4601893
      },
      {
        name: "吉林",
        value: 1329192
      },
      {
        name: "上海",
        value: 5884563
      },
      {
        name: "甘肃",
        value: 6646144
      },
      {
        name: "宁夏",
        value: 9883360
      },
      {
        name: "山西",
        value: 5379139
      },
      {
        name: "香港",
        value: 2984926
      },
      {
        name: "四川",
        value: 6021988
      },
      {
        name: "广西",
        value: 1005141
      },
      {
        name: "浙江",
        value: 1855525
      },
      {
        name: "云南",
        value: 2758931
      },
      {
        name: "内蒙古",
        value: 1320718
      },
      {
        name: "辽宁",
        value: 8864590
      },
      {
        name: "广东",
        value: 2085538
      },
      {
        name: "青海",
        value: 19570261
      },
      {
        name: "北京",
        value: 9752073
      }
    ]
  }
};

export default defineComponent({
  name: "Echarts",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  setup: () => {
    const isJson = ref(null);
    onMounted(async () => {
      const chinaJson = (await axios.get(`/china.json`)).data;

      console.log(chinaJson);
      isJson.value = chinaJson;
      echarts.registerMap("CHN", chinaJson);
    });

    return { areaOption, isJson };
  }
});
</script>

<style scoped>
.chart {
  height: 60vh;
}
</style>