import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'

Vue.config.productionTip = false

new Vue({
  Buefy,
  router,
  render: h => h(App)
}).$mount('#app')
