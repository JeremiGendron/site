import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 22,
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
