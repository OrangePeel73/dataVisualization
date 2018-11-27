import TopHeader from '@/components/header/TopHeader.vue'
import BottomFooter from '@/components/footer/BottomFooter.vue'
import WorldMap from '@/components/WorldMap/WorldMap.vue'
// import axios from 'axios'
// import BMap from 'BMap'

require('echarts/lib/chart/map')
require('echarts/dist/extension/bmap.js')

export default {
  components: {
    TopHeader,
    BottomFooter,
    WorldMap
  },
  data () {
    return {
      id: {
        id: 'world',
        id_id: 'world-demo'
      },
      option: {
        title: {
          text: '全国试验基地温度监控',
          subtext: 'data from DaoCloud.io',
          sublink: 'https://www.daocloud.io',
          left: 'center',
          color: '#fff'
        },

        // tooltip
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let res = params.seriesName + '<br/>' + params.data.name + ':' + params.data.value[2]
            return res
          }
        },

        bmap: {
          // center: [104.114129, 37.550339],
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#1E4A66'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#36546B'
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
                'color': '#004981'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'geometry',
              'stylers': {
                'color': '#004981'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#005b96',
                'lightness': 1
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
                'color': '#004981'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#00508b'
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
                'color': '#056197',
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
                'color': '#004981',
                'visibility': 'off'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#004981',
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary', // 边界
              'elementType': 'all',
              'stylers': {
                'color': '#064066'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#1a5787'
              }
            }, {
              'featureType': 'label',
              'elementType': 'all',
              'stylers': {
                'color': '#fff'
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
              show: false,
              textStyle: {
                color: '#fafafa'
              }
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
              show: true,
              textStyle: {
                color: '#fafafa',
                fonySize: 16
              }
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
        }
        ]
      }
    }
  },
  created () {
    // this.drawWeather()
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
      return res
    },

    // geoCoordMap: 去掉id 截取值数组 取出经纬度 ：{'北京': [经度，纬度]}
    testDeleteData (data) {
      for (let item in data) {
        data[item] = data[item].splice(0, 2)
      }
      return data
    }
  }
}
