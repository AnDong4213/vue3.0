<template>
  <v-chart class="chart"
           :option="option" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { ref, defineComponent, onMounted } from "vue";
import { useFetchHttp } from "@/utils/http";

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

const series = Array(3)
  .fill({})
  .map(() => ({ type: "bar" }));
const option1 = {
  legend: {},
  tooltip: {},
  dataset: {
    // 用 dimensions 指定了维度的顺序。直角坐标系中，
    // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
    // 如果不指定 dimensions，也可以通过指定 series.encode
    // 完成映射，参见后文。
    dimensions: ["product", "2015", "2016", "2017"],
    source: [
      { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
      { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
      { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
      { product: "Walnut Brow", "2015": 72.4, "2016": 53.9, "2017": 39.1 }
    ]
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: series
};

const option2 = {
  title: {
    left: "left",
    text: "观看直播大数据量"
  },
  legend: {
    show: true,
    data: [{ name: "进场观众" }, { name: "在线观看" }]
  },
  dataset: {
    source: []
  },
  tooltip: {
    trigger: "axis",
    position: function(pt: any) {
      return [pt[0], "10%"];
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none"
      },
      restore: {},
      saveAsImage: {}
    }
  },
  grid: {
    show: true,
    // backgroundColor: "",
    tooltip: {
      show: true
    }
  },
  // xAxis: { type: "category" },
  // yAxis: {},
  xAxis: {
    type: "category",
    boundaryGap: false
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "10%"]
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      type: "line",
      name: "进场观众",
      smooth: true,
      symbol: "none",
      areaStyle: {
        color: "#fe2270",
        opacity: 0.2
      },
      color: "#fe2270",
      emphasis: {
        scale: false
      },
      lineStyle: {
        width: 1
      },
      encode: {
        x: "minute_format",
        y: "current_user_count",
        tooltip: ["amount"]
      }
    },
    {
      type: "line",
      name: "在线观看",
      smooth: true,
      symbol: "none",
      areaStyle: {
        color: "#41B883",
        opacity: 0.4
      },
      color: "#41B883",
      emphasis: {
        scale: false
      },
      lineStyle: {
        width: 1
      },
      encode: {
        x: "minute_format",
        y: "total_user_during",
        tooltip: ["score"]
      }
    }
  ]
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
    const option = ref({});
    onMounted(() => {
      useFetchHttp("../data.json").then(res => {
        const liveData = res.liveData;
        liveData.forEach((item: any) => {
          item.minute_format = item.minute_format.substring(
            item.minute_format.length - 4
          );
        });
        option2.dataset.source = liveData;
        option.value = option2;
        // console.log(option.value);
      });
    });

    return { option };
  }
});
</script>

<style scoped>
.chart {
  height: 60vh;
}
</style>