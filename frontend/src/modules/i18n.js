export default {
  namespaced: true,

  state: {
    language: null,
  },

  getters: {
    currentLanguage: state => state.language,
  },

  mutations: {
    changeLanguage: (state) => {
      if (!state.language) state.language = 'en-CA'
      else state.language = state.language == 'en-CA' 
        ? 'fr-CA'
        : 'en-CA'
    },
  },

  actions: {
    changeLanguage ({ commit }) {
      commit('changeLanguage')
    },
  }
}
