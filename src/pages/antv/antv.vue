<template>
  <div id="antv-container1">
    <div :id="'antv-container'"></div>
    <g2-line :chartData="serverData" :id="'c1'"></g2-line>
  </div>
</template>

<script>

import G2 from '@antv/g2'
import G2Line from '@/components/antv/g2-line.vue'

export default {
  components: {
    G2Line
  },
  data () {
    return {
      serverData: [{
        year: '2010',
        value: 3
      }, {
        year: '2011',
        value: 4
      }, {
        year: '2012',
        value: 5
      }, {
        year: '2013',
        value: 6
      }, {
        year: '2014',
        value: 4
      }]
    }
  },
  mounted () {
    this.drawChart()
  },
  created () {
    console.log(this.serverData)
    this.drawChart()
  },
  methods: {
    drawChart () {
      // this.chart && this.chart.destory()
      this.chart = new G2.Chart({
        container: 'antv-container',
        forceFit: true,
        width: 400,
        height: 300
      })
      this.chart.source(this.serverData)
      this.chart.scale('value', { tickInterval: 2 }) // y轴以 2 递增
      // this.chart.scale('value', { min: 0 })  // y 轴从0 开始 且为连续值 以 1 递增
      this.chart.scale('year', { range: [0, 1] })
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.chart.line().position('year*value')
      this.chart.point().position('year*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })
      this.chart.render()
    }
  }
  // 从服务器获取数据并赋值给this.serverData

}
</script>
