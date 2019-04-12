import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    token: '',
    status: '',
    showWindow: false,
    messages: {},
    username: '',
    windowHeight: 0
  },

  getters: {
    token: state => state.token,
    status: state => state.status,
    showWindow: state => state.showWindow,
    messages: state => state.messages,
    username: state => state.username,
    windowHeight: state => state.windowHeight
  },

  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setStatus: (state, status) => {
      state.status = status
    },
    showWindow: (state) => state.showWindow = !state.showWindow,
    hideWindow: (state) => state.showWindow = false,
    addMessage: (state, message) => {
      let newObject = { ...state.messages }
      newObject[message.id] = message
      Vue.set(state, 'messages', newObject)
    },
    setUsername: (state, username) => state.username = username,
    windowHeight: (state, windowHeight) => state.windowHeight = windowHeight,
  },

  actions: {
    setStatus ({ commit }, status) {
      commit('setStatus', status)
    },
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    showWindow({ commit }) {
      commit('showWindow')
    },
    hideWindow({ commit }) {
      commit('hideWindow')
    },
    addMessage({ commit }, message) {
      commit('addMessage', message)
    },
    setUsername({ commit }, username) {
      commit('setUsername', username)
    },
    windowHeight({ commit }, windowHeight) {
      commit('windowHeight', windowHeight)
    }
  }
}