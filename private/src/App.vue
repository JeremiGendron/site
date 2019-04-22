<template>
  <div id="app"
    :style="{
      display: 'flex',
      alignItems: 'flex-start',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      backgroundColor: 'aliceblue'
    }"
  >
    <div
      :style="{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '10%',
        backgroundColor: 'cyan'
      }"
    >
      <button
        @click="changeStatus(200)"
        style="background-color: lightgreen"
      >Available</button>
      <button
        @click="changeStatus(502)"
        style="background-color: orange"
      >Busy</button>
      <button
        @click="changeStatus(404)"
        style="background-color: grey"
      >Gone</button>
    </div>
    <audio :src="require('@/assets/tone.mp3')"></audio>
    <div id="convos"
      :style="{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '20%',
        height: '90%',
        overflowY: 'auto'
      }"
    >
      <div class="convoBox"
        v-for="(chat, index) in Object.keys(chats)"
        :key="index"
        :style="{
          maxWidth: '200px',
          maxHeight: '200px',
          backgroundColor: 'lightgrey',
          padding: '10px',
          cursor: 'pointer'
        }"
        @click="openChat(chat)"
      >
        <div v-if="users[chat]">
          <button v-if="Object.keys(users).length > 1" @click="closeConvo(chat)">X</button><span><b>{{users[chat].name}}</b> <u>{{ ' ' + users[chat].email}}</u><em>{{users[chat].company ? users[chat].company + ' ' : null}}</em></span>
          <br><span style="text-align: center">{{mostRecents[chat]}}</span>
        </div>
      </div>
    </div>
    <div id="conversation"
      v-if="openedChat"
      :style="{
        width: '80%',
        height: '90%',
        backgroundColor: 'lightgreen',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }"
    >
      <div id="chattingWith"
        :style="{
          height: '5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }"
      >
        <span><b>{{users[openedChat].name}}</b>|<u>{{ ' ' + users[openedChat].email}}</u>|<em>{{users[openedChat].company ? users[openedChat].company + ' ' : null}}</em></span>
      </div>
      <div id="messagesWith"
        :style="{
          height: '75%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          flexDirection: 'column',
          margin: '10px 0px 10px 0px',
          overflowY: 'auto',
          backgroundColor: 'violet'
        }"
      >
        <div
          v-for="(message, index) in Object.keys(chats[openedChat])"
          :key="index"
          :style="{
            display: 'flex',
            justifyContent: chats[openedChat][message].from !== openedChat ? 'flex-start' : 'flex-end',
            alignItems: 'center',
            width: '90%',
            padding: '20px'
          }"
        >
          {{chats[openedChat][message].message}}
        </div>
      </div>
      <div id="sendMessage"
        :style="{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }"
      >
        <textarea
          :style="{
            width: '90%',
            height: '90%'
          }"
          @keypress="(ev) => processKey(ev)"
          v-model="textarea"
        ></textarea>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },

  data () {
    return {
      mostRecents: {},
      openedChat: '',
      textarea: null
    }
  },

  computed: {
    chats () {
      return this.$store.getters['chats']
    },
    users () {
      return this.$store.getters['users']
    }
  },

  mounted () {
    console.log(this.apiKey)
    this.cycleMessages()
    this.$store.dispatch('changeStatus', 200)
  },

  watch: {
    openedChat() {

    },
    chats() {
      Object.keys(this.chats).forEach((chatkey) => {
        const chat = this.chats[chatkey]
        let recent = 0
        Object.keys(chat).forEach((msgkey) => {
          const message = chat[msgkey]
          if (message.from !== chatkey) return
          let date = message.date
          if (date > recent) recent = date

        })
        this.mostRecents[chatkey] = recent === 0 ? '' : ((Date.now() - recent) / 60000).toFixed(0) + 'm'
      })
    }
  },

  methods: {
    cycleMessages() {
      this.$store.dispatch('getChatReplies')
      setTimeout(() => this.cycleMessages(), 5000)
    },
    openChat(chat) {
      this.openedChat = chat
    },
    mostRecent(chat) {
      const convo = this.chats[chat]
      let recent = 0
      Object.keys(convo).forEach((msgkey) => {
        const message = convo[msgkey]
        console.log(message.from, chat)
        if (message.from !== chat) return
        let date = message.date
        console.log('date:', date)
        if (date > recent) recent = date
      })
      console.log(recent, Date.now())
      return recent === 0 ? '' : ((Date.now() - recent) / 60000).toFixed(0) + 'm'
    },
    processKey(ev) {
      if (ev.key === 'Enter') {
        this.$store.dispatch('postMessage', {text: this.textarea, email: this.openedChat})
        setTimeout(() => this.textarea = '', 500)
      }
    },
    closeConvo(chat) {
      this.$store.dispatch('closeConvo', chat)
    },
    changeStatus(status) {
      this.$store.dispatch('changeStatus', status)
    }
  }
}
</script>

<style>
</style>
