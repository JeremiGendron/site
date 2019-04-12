import Vue from 'vue'
import Vuex from 'vuex'
//import VuexPersist from 'vuex-persist'

import data from './modules/data'
import i18n from './modules/i18n'

//const vuexPersist = new VuexPersist({
//  key: 'codenameapp',
//  storage: localStorage
//})

Vue.use(Vuex)

const modules = {
  data,
  i18n
}

export default new Vuex.Store({
  modules,
  plugins: []//vuexPersist.plugin]
})
