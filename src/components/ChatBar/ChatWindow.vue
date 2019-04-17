<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      width: '100%',
      maxWidth: $vuetify.breakpoint.xlOnly ? '750px' : '300px',
      bottom: $vuetify.breakpoint.xlOnly ? '72px' : '36px',
      left: 0,
      height: '100%',
      maxHeight: $vuetify.breakpoint.xlOnly ? '750px' : $vuetify.breakpoint.smAndDown ? '320px' : '420px',
      backgroundColor: '#EEEEEE',
      border: '2px solid lightgrey',
      borderBottom: '0px',
      borderLeft: '0px'
    }"
  >
    <div id="messages"
      :style="{
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0.5rem',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }"
      ref="messages"
    >
      <div
        :key="index"
        v-for="(message, index) in messages"
        :style="{
          width: '100%',
          alignSelf: message.user ? 'flex-start' : 'flex-end',
          textAlign: message.user ? 'left' : 'right'
        }"
      >
        <div
          v-if="message.user"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }"
        >
          <div class="usericon">
            <avatar 
              :username="username"
              :size="$vuetify.breakpoint.xlOnly ? 72 : 36"
              :rounded="false"
              :customStyle="{
                color: '#EEEEEE',
                fontSize: $vuetify.breakpoint.xlOnly ? '32px' : '19px',
                fontFamily: 'Roboto',
                minWidth: $vuetify.breakpoint.xlOnly ? '54px' : '36px',
                minHeight: $vuetify.breakpoint.xlOnly ? '54px' : '36px',
              }"
              :style="{
                margin: $vuetify.breakpoint.xlOnly ? '0.5rem' : '0.25rem',
                marginRight: $vuetify.breakpoint.xlOnly ? '1rem' : '0.5rem',
                fontWeight: 'bold'
              }"
            ></avatar>
          </div>
          <span class="message">
            {{message.message}}
          </span>
        </div>
        <div
          v-else
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }"
        >

          <span class="message">
            {{message.message}}
          </span>
          <avatar
            :username="message.from"
            :size="36"
            :rounded="false"
            :customStyle="{
              color: '#EEEEEE',
              fontSize: $vuetify.breakpoint.xlOnly ? '32px' : '19px',
              fontFamily: 'Roboto'
            }"
            :style="{
              margin: '0.25rem',
              fontWeight: 'bold',
              marginLeft: '0.5rem',
              minWidth: $vuetify.breakpoint.xlOnly ? '54px' : '36px',
              minHeight: $vuetify.breakpoint.xlOnly ? '54px' : '36px',
            }"
          ></avatar>
        </div>

      </div>
    </div>
    <div id="textbox"
      :style="{
        height: $vuetify.breakpoint.xlOnly ? '5%' : '12%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }"
    >
      <v-text-field
        :placeholder="$t('CHAT.ENTER')"
        solo
        v-model="chatMessage"
        @keypress="(key) => {
          processKey(key)
        }"
        @submit="() => postChatMessage()"
        :style="{
          height: '30px',
          borderTop: '2px solid lightgrey',
          marginBottom: '20px'
        }"
      >

      </v-text-field>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'ChatWindow',
  components: {
    Avatar
  },

  data () {
    return {
      baseUrl: 'https://a6oenthmea.execute-api.us-east-2.amazonaws.com/chat-api',
      chatMessage: '',
      receivedMessages: {}
    }
  },

  created () {
    this.getMessagesLoop()
  },

  computed: {
    token () {
      return this.$store.getters['data/token']
    },
    messages () {
      return this.$store.getters['data/messages']
    },
    username () {
      return this.$store.getters['data/username']
    }
  },

  methods: {
    getMessagesLoop () {
      if (!this.token) return
      this.getChatMessages()
      setTimeout(() => this.getMessagesLoop(), 5000)
    },
    processKey(key) {
      if (key.key == 'Enter') this.postChatMessage()
    },
    async postChatMessage () {
      if (!this.chatMessage) return
      const message = this.chatMessage
      this.chatMessage = ''
      const response = await fetch(`${this.baseUrl}/chat/new/${this.token}/messages`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message
        })
      })

      if (response.status === 200) {
        this.addUserMessage(message)
      }
    },
    async addUserMessage(message) {
      this.$store.dispatch('data/addMessage', {
        id: Date.now().toString() + message,
        message,
        user: true
      })
      const container = this.$el.querySelector("#messages");
      if (container.scrollHeight > container.scrollTop + container.clientHeight + 100) return
      setTimeout(() => container.scrollTop = container.scrollHeight, 100)
    },
    async addPlatformMessage(message) {
      this.$store.dispatch('data/addMessage', {
        id: message.id,
        message: message.message,
        from: message.from,
        user: false
      })
      const container = this.$el.querySelector("#messages");
      if (container.scrollHeight > container.scrollTop + container.clientHeight + 100) return
      setTimeout(() => container.scrollTop = container.scrollHeight, 100)
      this.markReadChatMessages(message.id)
    },
    async getChatMessages () {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", () => {
        if (oReq.status === 200) {
          const body = JSON.parse(oReq.responseText)
          const messages = Object.keys(body.Item.messages.M)
          if (messages.length > 0) {
            messages.forEach((id) => {
              if (this.messages[id]) return
              this.addPlatformMessage({
                id,
                message: body.Item.messages.M[id].M.message.S,
                from: body.Item.messages.M[id].M.from.S
              })
            })
          }
        }
        
      });
      oReq.open("GET", this.baseUrl + '/chat/new/' + this.token + '/messages');
      oReq.send();
    },
    async markReadChatMessages (id) {
      await fetch(`${this.baseUrl}/chat/new/${this.token}/messages`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          read: [id]
        })
      })
    }
  }
}
</script>

<style>

</style>
