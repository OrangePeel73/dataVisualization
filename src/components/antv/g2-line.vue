<template>
  <div :id="id">

  </div>
</template>

<script>

import G2 from '@antv/g2'

export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    chartData: { type: Array, default: () => [] },
    id: String
  },

  watch: {
    // 监听AchartData ，当发生变化时，触发这个回调函数绘制图表
    chartData (val, oldVal) {
      console.log('new: %s,old: %s', val, oldVal)
      this.drawChart(val)
    }
  },
  mounted () {
    this.drawChart()
  },
  created () {
    // this.drawChart()
    console.log(this.id)
    console.log(this.chartData)
  },

  methods: {
    drawChart () {
      this.chart && this.chart.destory()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        width: 800,
        height: 600
      })
      this.chart.source(this.chartData)
      this.chart.scale('value', { tickInterval: 2 })
      this.chart.scale('year', { range: [0, 1] })
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      // this.chart.line().position('year * value')
      this.chart.interval().position('year * value')
      this.chart.render()
    }
  }
}

</script>
