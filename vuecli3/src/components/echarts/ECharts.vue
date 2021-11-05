<template>
  <div class="map">
    <v-chart theme="customTheme" :options="polar5"/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'

//按需加载
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/line'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/gauge'

import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import echartTheme from './echartTheme'

export default {
  name: 'Echarts',
  components: {
    'v-chart': ECharts
  },
  created() {
    echarts.registerTheme('customTheme', echartTheme)
    setInterval(() => {
      this.polar5.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
    }, 2000)
  },
  data() {
    let data = []
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      message: 'echarts',
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },
      polar2: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      polar3: {
        title: {
          text: '用户骑行订单'
        },
        legend:{
          data:['OFO','摩拜','小蓝']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'OFO',
            type: 'bar',
            data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
          }, {
            name: '摩拜',
            type: 'bar',
            data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
          }, {
            name: '小蓝',
            type: 'bar',
            data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
          }
        ]
      },
      polar4: {
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
              {value:235, name:'视频广告'},
              {value:274, name:'联盟广告'},
              {value:310, name:'邮件营销'},
              {value:335, name:'直接访问'},
              {value:400, name:'搜索引擎'}
            ]
          }
        ]
      },
      polar5: {
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            // radius: '50%',
            startAngle: 180,
            endAngle: 0,
            // clockwise: true,
            pointer: {
              width: 10
            },
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                width: 6
              }
            },
            detail: {formatter:'{value}%'},
            data: [{value: 40, name: '完成率'}]
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    height: 500px;
    width: 100%;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
