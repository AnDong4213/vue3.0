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
        text: "折线图堆叠(交叉)",
        backgroundColor: "#1890ff",
        textStyle: {
          color: "#fff"
        }
      },
      legend: {
        /* itemStyle: {
          borderColor: "#41B883"
        },
        lineStyle: {
          borderColor: "#41B883"
        }, */
        // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        data: [
          {
            name: "邮件营销"
            // icon: "path://M30.9,53.2C16.8,53.2,5"
          },
          {
            name: "联盟广告",
            itemStyle: {
              // color: "#00f"
            }
          },
          {
            name: "视频广告"
          },
          {
            name: "直接访问"
          },
          {
            name: "搜索引擎2"
          }
        ]
        // backgroundColor: "#41B883"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
        /* show: true,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            fontStyle: "italic"
          }
        } */
        // backgroundColor: "#1890ff"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        name: "X轴",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#1890ff"
          }
        }
      },
      yAxis: {
        type: "category",
        name: "Y轴",
        data: [100, 200, 300, 400, 500, 600, 700],
        axisLine: {
          show: true,
          lineStyle: {
            color: "#1890ff"
          }
        }
      },
      tooltip: {
        trigger: "axis"
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          smooth: true,
          stack: "总量",
          data: [120, 42, 101, 40, 90, 230, 210],
          min: 100
        },
        {
          name: "联盟广告",
          type: "line",
          smooth: true,
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          smooth: true,
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          smooth: true,
          stack: "总量",
          data: [320, 72, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎2",
          type: "line",
          smooth: true,
          stack: "总量",
          data: [82, 93, 90, 93, 129, 40, 100]
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped>
.chart {
  height: 90vh;
}
</style>