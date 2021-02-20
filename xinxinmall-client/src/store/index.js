import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const store = new Vuex.Store({
  state: {
    cartList: [],
    isAutnenticated: false, // 是否认证
    user: {} // 储存用户信息
  },
  mutations,
  actions,
  getters
})


// 导出store
export default store