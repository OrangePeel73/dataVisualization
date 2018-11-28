import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import corns from './corns/icorns.js'

// 必须在创建store之前调用use函数
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    corns
  },
  getters
})
