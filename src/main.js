// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/components/global.js'
// ecahrts 全局引入
import echarts from 'echarts'
import 'vue-g2'
import 'echarts/lib/chart/map' // echarts 地图
import 'echarts/map/js/china.js'// echarts 地图必须引入 否则不会显示地图
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale',
    'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
