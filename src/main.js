import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  router,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount('#app')
