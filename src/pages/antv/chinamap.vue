<template>
  <div id="chinamap">
    <div style="position: relative">
      <div id="china" style="width: 50%;height:400px;position: absolute;left: 0;top: 0;"></div>
      <div id="province" style="width: 50%;height:400px;position: absolute;right: 0;top: 0;"></div>
    </div>
  </div>
</template>

<script>
import { DataSet } from '@antv/data-set'
import G2 from '@antv/g2'
import VueAMap from 'vue-amap'
// import axios from 'axios'
// import axios from 'axios'

export default {
  data  () {
    return {
      chart: null
    }
  },
  mounted () {
    // 放在mounted中才会显示
    this.g2Chart()
  },
  created () {
    // this.g2Chart(this.stackedData)
  },
  methods: {
    g2Chart () {
      // 调用高德 api 绘制底图以及获取 geo 数据
      var map = new VueAMap.Map('china', {
        zoom: 4
      })
      var colors = ['#3366cc', '#dc3912', '#ff9900', '#109618',
        '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e',
        '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc',
        '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac']
      // 当前聚焦的区域
      var currentAreaNode = void 0

      AMapUI.loadUI(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer) {
        // 创建一个实例
        var districtExplorer = window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: map
        })

        // feature被点击
        districtExplorer.on('featureClick', function (e, feature) {
          var props = feature.properties
          // 如果存在子节点
          if (props.childrenNum > 0) {
            // 切换聚焦区域
            switch2AreaNode(props.adcode)
          }
        })

        // 外部区域被点击
        districtExplorer.on('outsideClick', function (e) {
          districtExplorer.locatePosition(e.originalEvent.lnglat, function(error, routeFeatures) {
            if (routeFeatures && routeFeatures.length > 1) {
              // 切换到省级区域
              switch2AreaNode(routeFeatures[1].properties.adcode);
            } else {
              // 切换到全国
              switch2AreaNode(100000);
            }
          }, {
            evelLimit: 2
          })
        })
        // 绘制某个区域的边界
        function renderAreaPolygons (areaNode) {
          var node = _.cloneDeep(areaNode)
          districtExplorer.clearFeaturePolygons()
          districtExplorer.renderSubFeatures(node, function (feature, i) {
            var fillColor = colors[i % colors.length]
            var strokeColor = colors[colors.length - 1 - i % colors.length]

            return {
              cursor: 'default',
              bubble: true,
              strokeColor: strokeColor, // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 1, // 线宽
              fillColor: fillColor, // 填充色
              fillOpacity: 0.35 // 填充透明度
            }
          })

          // 绘制父区域
          districtExplorer.renderParentFeature(node, {
            cursor: 'default',
            bubble: true,
            strokeColor: 'black', // 线颜色
            strokeOpacity: 1, // 线透明度
            strokeWeight: 1, // 线宽
            fillColor: null, // 填充色
            fillOpacity: 0.35 // 填充透明度
          })
        }

        // 切换区域后刷新显示内容
        function refreshAreaNode (areaNode) {
          districtExplorer.setHoverFeature(null)
          renderAreaPolygons(areaNode)
        }

        // 切换区域
        function switch2AreaNode (adcode, callback) {
          if (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) {
            return
          }

          loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
              if (callback) {
                callback(error)
              }
              return
            }
            currentAreaNode = window.currentAreaNode = areaNode
            refreshAreaNode(areaNode)
            if (callback) {
              callback(null, areaNode)
            }
          })
        }

        // 加载区域
        function loadAreaNode (adcode, callback) {
          districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
              if (callback) {
                callback(error)
              }
              return
            }
            renderG2Map(areaNode) // 使用 G2 绘制地图

            if (callback) {
              callback(null, areaNode)
            }
          })
        }

        // 浙江
        switch2AreaNode(330000)
      })

      // 开始使用 G2 绘制地图
      var provinceChart = void 0

      function renderG2Map (areaNode) {
        var adcode = areaNode.getAdcode()
        var geoJSON = areaNode.getSubFeatures() // 获取 geoJSON 数据
        var name = areaNode.getName()

        provinceChart && provinceChart.destroy()
        provinceChart = null
        if (!geoJSON || currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) {
          return
        }
        var dv = processData(geoJSON)
        // start: 计算地图的最佳宽高
        var longitudeRange = dv.range('longitude')
        var lantitudeRange = dv.range('latitude')
        var ratio = (longitudeRange[1] - longitudeRange[0]) / (lantitudeRange[1] - lantitudeRange[0])
        var width = void 0
        var height = void 0
        if (ratio > 1) {
          width = $('#province').width()
          height = width / ratio
        } else {
          width = 300 * ratio
          height = $('#province').height()
        }
        // end: 计算地图的最佳宽高
        provinceChart = new G2.Chart({
          container: 'province',
          width: width,
          height: height,
          padding: 0
        })
        provinceChart.source(dv)
        provinceChart.axis(false)
        provinceChart.tooltip({
          showTitle: false
        })
        provinceChart.polygon().position('longitude*latitude').label('name', {
          textStyle: {
            fill: '#fff',
            fontSize: 10,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }).style({
          stroke: '#fff',
          lineWidth: 1
        }).color('value', '#BAE7FF-#1890FF-#0050B3')
        provinceChart.guide().text({
          position: ['min', 'max'],
          offsetY: 20,
          content: name,
          style: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        })
        provinceChart.render()
      }

      function processData (geoJSON) {
        var mapData = {
          type: 'FeatureCollection',
          features: geoJSON
        }
        // 构造虚拟数据
        var userData = []
        for (var i = 0; i < geoJSON.length; i++) {
          var name = geoJSON[i].properties.name
          userData.push({
            name: name,
            value: Math.round(Math.random() * 1000)
          })
        }
        var ds = new DataSet()
        var geoDataView = ds.createView().source(mapData, {
          type: 'GeoJSON'
        }) // geoJSON 经纬度数据

        // 用户数据
        var dvData = ds.createView().source(userData)
        dvData.transform({
          type: 'geo.region',
          field: 'name',
          geoDataView: geoDataView,
          as: ['longitude', 'latitude']
        })

        return dvData
      }
    }
  }
}
</script>
