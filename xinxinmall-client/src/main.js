import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'network/http'

Vue.config.productionTip = false

// 创建事件总线$bus 
Vue.prototype.$bus = new Vue()

Vue.prototype.$axios = axios

// 使用ElementUI
Vue.use(ElementUI);

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用懒加载的插件
const loadimage = require('assets/img/common/placeholder.png')
Vue.use(VueLazyload, {
  loading: loadimage
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
