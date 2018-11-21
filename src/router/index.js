import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/home.vue'
import EchartDemo1 from '@/pages/echart-ui/echart-demo'
import Weather from '@/pages/weather/weather.vue'
import Antv from '@/pages/antv/antv.vue'
import Antv2 from '@/pages/antv/antv2.vue'
import HeatMap from '@/pages/antv/heatmap.vue'
import Cities from '@/pages/cities/cities.vue'
import WolrdMap from '@/pages/worldMap/worldMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/echart-demo1',
      name: 'EchartDemo1',
      component: EchartDemo1
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/antv',
      name: 'Antv',
      component: Antv
    },
    {
      path: '/antv2',
      name: 'Antv2',
      component: Antv2
    },
    {
      path: '/heatmap',
      name: 'HeatMap',
      component: HeatMap
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/worldMap',
      name: 'WorldMap',
      component: WolrdMap
    }
  ]
})
