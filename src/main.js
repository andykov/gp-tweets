import Vue from 'vue'
import App from './App.vue'
import store from './store'
import helpers from './helpers/utils'

Vue.config.productionTip = false

Vue.use({
  install () {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
