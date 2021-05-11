<template>
  <v-chart class="chart"
           :option="option" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
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
// import insight from "@/components/echarts/assets/echarts-theme-insight";

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

const series = Array(4)
  .fill({})
  .map(() => ({ type: "bar", seriesLayoutBy: "column" }));

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
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017", "2018"],
          ["Matcha Latte", 43.3, 85.8, 93.7, 20],
          ["Milk Tea", 83.1, 73.4, 55.1, 30],
          ["Cheese Cocoa", 86.4, 65.2, 82.5, 40],
          ["Walnut Brownie", 72.4, 53.9, 39.1, 50],
          ["Walnut", 32.4, 13.9, 55, 60]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: series
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