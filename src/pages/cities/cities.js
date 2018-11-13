import axios from 'axios'
import BMap from 'BMap'
// import { open } from 'fs'
// import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'

require('echarts/lib/chart/map')
require('echarts/dist/extension/bmap.js')

export default {
  data () {
    return {
      option: {
        // backgroundColor: '#5b4c86', // 填充背景时会覆盖地图
        title: {
          text: '全国试验基地温度监控',
          subtext: 'data from DaoCloud.io',
          sublink: 'https://www.daocloud.io',
          left: 'center'
        },

        // tooltip
        tooltip: {
          trigger: 'item',
          // formatter: '{a}<br/>{b}:{c}<br/>' // 单项显示
          formatter: (params) => {
            let res = params.seriesName + '<br/>' + params.data.name + ':' + params.data.value[2]
            return res
          }
        },

        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        },
        //  series
        series: [{
          name: '温度:',
          type: 'scatter',
          roam: true, // 放大缩小
          coordinateSystem: 'bmap',
          data: [],
          geoCoord: {},
          symbolSize: (val) => {
            return val[2]
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'purple'
            }
          }
        },
        {
          name: 'Top 5',
          // 气泡类型
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: [],
          symbolSize: (val) => {
            return val[2]
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'purple',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }]
      },
      // test data
      testData: {
        '闫家洞村委会': [110.797, 35.7042, '140882101214', 5.44],
        '辉川村委会': [114.948, 39.8782, '130726203215', 10.95]
      }
    }
  },
  mounted () {
    this.drawWeather()
  },
  created () {
    this.testSpliceData(this.testData)
    this.testDeleteData(this.testData)
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
      let myChart = vm.$echarts.init(document.getElementById('cities-demo'))
      myChart.setOption(vm.option)
      let a = myChart.getModel().getComponent('bmap').getBMap()
      a.addControl(new BMap.MapTypeControl()) // 右上角的按钮选择 ‘卫星’ ‘地标’
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
        // 异步数据更新后再setOption才能刷新数据 否则地图不会响应数据
        myChart.setOption(vm.option, 2000)
        console.log(vm.option.series[1].data)
      }).catch(error => {
        myChart.hideLoading()
        console.log('请求出错！', error)
      })
    }
  }
}
