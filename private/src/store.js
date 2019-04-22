import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import aws from 'aws-sdk'
import { credentials } from '../../config.js'

const lambda = new aws.Lambda({ region: 'us-east-2', credentials })
const dynamoDB = new aws.DynamoDB({ region: 'us-east-2', credentials })
const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: {},
    chats: {},
    users: {}
  },

  getters: {
    chats: state => state.chats,
    users: state => state.users,
  },

  mutations: {
    setUserDetails(state, details) {
      console.log('settings details: ', details)
      Vue.set(state.users, `${details.from}`, details)
      console.log(state.users)
    },
    setChats(state, chats) {
      Object.keys(chats).forEach((key) => {
        const chat = chats[key]
        Object.keys(chat).forEach((msgkey) => {
          const message = chat[msgkey]
          if (!state.chats[key]) state.chats[key] = {}
          Vue.set(state, `chats.${key}.${msgkey}`, message)
        })
      })
      //document.querySelector('#audio').click()
    },
    addMessage(state, { chat, message }) {
      Vue.set(state.chats[chat], message.id, message)
      console.log(state.chats)
    },
    closeConvo(state, chat) {
      Vue.delete(state.chats, chat)
    }
  },

  actions: {
    closeConvo({ commit }, chat) {
      commit('closeConvo', chat)
    },
    async getChatReplies({ dispatch }) {
      try {
        const result = await lambda.invoke({
          FunctionName: 'CNAPP_GETCHATREPLIES',
          InvocationType: 'RequestResponse',
        }).promise()
        if (result.StatusCode === 200) {
          const parsedMessages = JSON.parse(JSON.parse(result.Payload).body).Items
          const messages = parsedMessages.map((message) => {
            return {
              date: message.date ? message.date.N : null,
              from: message.from ? message.from.S : null,
              message: message.message ? message.message.S: null,
              token: message.token ? message.token.S : null
            }
          })
          if (messages.length > 0) {
            dispatch('markRead', messages)
            dispatch('organizeChats', messages)
            document.querySelector('audio').play()
          }
        }
      } catch(error) {
        console.log(error)
      }
      
    },

    async markRead(_, messages) {
      const tokens = messages.map((message) => message.token)
      if (tokens.length < 1) return
      try {
        const result = await lambda.invoke({
          FunctionName: 'CNAPP_REPLYCHATMESSAGE',
          InvocationType: 'RequestResponse',
          Payload: JSON.stringify({
            read: tokens,
            path: '/chat-api/chat/reply/token/messages'
          })
        }).promise()
        console.log(result)
      } catch(error) {
        console.log('error:', error)
        return
      }
    },

    organizeChats({ commit, getters, dispatch }, messages) {
      const chats = getters['chats']
      const users = getters['users']
      let gotDetails = {}
      messages.forEach((message) => {
        if (!chats[message.from]) chats[message.from] = {}
        if ((!users[message.from] || !users[message.from].details) && !gotDetails[message.from]) {
          gotDetails[message.from] = true
          dispatch('getDetails', message.from)
        }
        if (!chats[message.from][message.token]) chats[message.from][message.token] = {
          date: message.date,
          message: message.message,
          from: message.from
        }
      })
      commit('setChats', chats)
    },

    async getDetails({ commit }, from) {
      console.log('from:', from)
      if (!from) return
      const params = {
        TableName: 'CNAPP_USERS',
        ExpressionAttributeNames: {
          '#C': 'company',
          '#N': 'name',
          '#E': 'email',
        },
        Key: {
          email: {
            S: from
          }
        },
        ProjectionExpression: '#C,#N,#E'
      }

      try {
        const result = await dynamoDB.getItem(params).promise()
        console.log('details:', result)
        commit('setUserDetails', {
          from: from,
          name: result.Item.name ? result.Item.name.S : null ,
          email: result.Item.email ? new Buffer(result.Item.email.S, 'base64').toString() : null ,
          company: result.Item.company ? result.Item.company.S : null 
        })
        console.log('got user:', result.Item)

      } catch(error) {
        console.log(error)
        return
      }
    },

    async postMessage({ commit }, { text, email }) {
      const params = {
        FunctionName: 'CNAPP_REPLYCHATMESSAGE',
        Payload: JSON.stringify({
          from: 'Jérémi Gendron',
          email,
          message: text
        })
      }

      try {
        const result = await lambda.invoke(params).promise()
        const id = JSON.parse(result.Payload).body
        console.log(id)
        commit('addMessage', {
          message: {
            id,
            message: text,
            from: 'Jérémi Gendron'
          },
          chat: email,
        })
        console.log('postMessage:', result)
      } catch (error) {
        console.log(error)
        return
      }
    },

    async changeStatus(_, status) {
      try {
        const result = await lambda.invoke({
          FunctionName: 'CNAPP_SETSTATUS',
          Payload: JSON.stringify({status})
        }).promise()
        console.log('setStatus result: ', result)
      } catch(error) {
        console.log(error)
      }
    }
  },

  plugins: [vuexLocal.plugin]
})
