import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/home.vue'
import Index from '@/pages/index/index.vue'
import Type from '@/pages/type/Type.vue'
import Cities from '@/pages/cities/cities.vue'
import Yield from '@/pages/yield/yield.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/type',
      name: 'Type',
      component: Type
    },
    {
      path: '/yield',
      name: 'Yield',
      component: Yield
    }
  ]
})
