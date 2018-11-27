<template>
  <div :id="id.id" class="wrap">
    <div class="demo">
      <div :id="id.id_id" class="demo-container"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BMap from 'BMap'

require('echarts/lib/chart/map')
require('echarts/dist/extension/bmap.js')

export default {
  props: {
    id: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) }
  },
  data () {
    return {
    }
  },

  mounted () {
    this.drawWeather()
  },

  created () {
  },

  methods: {
    // 1 mydata :截取数组，用于series.data[ {name: '', value:[val1, val2, val3]},{。。。}]
    testSpliceData (data) {
      let res = []
      for (let item in data) {
        let a = []
        a.push(data[item][0])
        a.push(data[item][1])
        a.push(data[item][3])
        let geoCoord = a
        if (geoCoord) {
          res.push({
            name: item,
            value: geoCoord
          })
        }
      }
      // console.log('geocoord:' + Array.prototype.isPrototypeOf(res)) // true array
      return res
    },

    // geoCoordMap: 去掉id 截取值数组 取出经纬度 ：{'北京': [经度，纬度]}
    testDeleteData (data) {
      for (let item in data) {
        data[item] = data[item].splice(0, 2)
      }
      return data
    },

    // 1 draw map
    drawWeather () {
      let vm = this
      console.log('option', vm.option)
      let myChart = vm.$echarts.init(document.getElementById(this.id.id_id))
      myChart.setOption(vm.option)
      myChart.showLoading()

      // 全国各地省级下钻到县的API
      axios.get('/bigdata/demo').then(res => {
        myChart.hideLoading()
        let resData = this.testSpliceData(res.data)
        vm.option.series[0].data = resData
        vm.option.series[0].data = resData
        vm.option.series[1].data = this.testSpliceData(res.data).sort((a, b) => {
          return b.value[2] - a.value[2] // top 5
        }).slice(0, 5)
        myChart.setOption(vm.option, 1000) // 异步数据更新后再setOption才能刷新数据 否则地图不会响应数据
        // console.log(vm.option.series[1].data)
        let a = myChart.getModel().getComponent('bmap').getBMap()
        a.addControl(new BMap.MapTypeControl()) // 右上角的按钮选择 ‘卫星’ ‘地标’
        myChart.setOption(vm.option)
        myChart.hideLoading()
      }).catch(error => {
        myChart.hideLoading()
        console.log('请求出错！', error)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  .demo {
    height: 100%;
    .demo-container {
      height: 100%;
    }
  };
}
</style>
