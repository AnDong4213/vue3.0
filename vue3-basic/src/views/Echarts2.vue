<template>
  <v-chart class="chart"
           :option="option" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart } from "echarts/charts";
import {
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
// import insight from "@/components/echarts/assets/echarts-theme-insight";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
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

let base = +new Date(1988, 9, 3);
let base2 = +new Date(1988, 9, 3);

const initDate = new Date(1988, 9, 3);
const oneDay = 24 * 3600 * 1000;
const one = [
  initDate.getFullYear(),
  initDate.getMonth() + 1,
  initDate.getDate()
].join("/");

const data = [[one, Math.round(Math.random() * 300)]];
const data2 = [[one, Math.round(Math.random() * 300)]];

for (let i = 1; i < 2000; i++) {
  const now = new Date((base += oneDay));
  data.push([
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]))
  ]);
}
for (let i = 1; i < 2000; i++) {
  const now = new Date((base2 += oneDay));
  data2.push([
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    Math.abs(Math.round((Math.random() - 0.5) * 200 + data[i - 1][1]))
  ]);
}

// console.log("data", data);
// console.log("data", data2);

export default defineComponent({
  name: "Echarts",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  setup: () => {
    const option = ref({
      title: {
        left: "left",
        text: "观看直播大数据量"
      },
      legend: {
        data: [{ name: "进场观众" }, { name: "在线观看" }]
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
      xAxis: {
        type: "time",
        boundaryGap: false
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"]
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          name: "进场观众",
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {},
          data: data
        },
        {
          name: "在线观看",
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {},
          data: data2
        }
      ]
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