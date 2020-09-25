import Vue from 'vue'
import App from './App.vue'
import create from '@/utils/create.js'
import router from './krouter'

Vue.config.productionTip = false
// Vue.prototype.$create=create
Vue.use(create)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
