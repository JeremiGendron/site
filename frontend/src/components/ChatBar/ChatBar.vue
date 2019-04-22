<template>
  <div :style="{
    padding: '0.35rem 0.35rem 0.35rem 0.5rem',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999
  }">
    <div
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }"
    >
      <Status/>
      <v-dialog
        v-model="showForm"
        class="dialog"
        hide-overlay
        :width="$vuetify.breakpoint.xlOnly ? 1000 : 500"
        :style="{
          zIndex: '9999 !important'
        }"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="!token"
            flat
            small
            v-on="on"
          >
            {{ $t('CHAT.WITHME') }}
          </v-btn>
        </template>
        <v-form
          ref="form"
          v-model="valid"
          class="dialog"
        >
          <v-container>
            <v-layout
              column
            >
              <v-flex
                xs12
                md4
              >
                <span
                  :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
                >
                  {{$t('COMMON.NAME')}} <span style="color: red">*</span>
                </span>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  color="#222222AA"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <span
                  :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
                >
                  {{$t('COMMON.EMAIL')}} <span style="color: red">*</span>
                </span>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  type="email"
                  color="#222222AA"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <span
                  :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
                >
                  {{$t('COMMON.COMPANY')}}
                </span>
                <v-text-field
                  v-model="company"
                  type="text"
                  color="#222222AA"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-btn 
                  flat
                  :disabled="!valid"
                  @click="submit"
                >
                  {{ $t('CHAT.START')}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-dialog>
      <v-btn
        v-if="token"
        flat
        @click="startChat"
        class="my-0"
      >
        <span>{{ $t('CHAT.WITHME') }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Status from './Status'

export default {
  name: 'ChatBar',
  components: {
    Status,
  },

  data () {
    return {
      baseUrl: 'https://a6oenthmea.execute-api.us-east-2.amazonaws.com/chat-api',
      showForm: false,
      email: '',
      name: '',
      company: '',
      valid: false,
      emailRules: [
        v => !!v || this.$t('CHAT.FORM.VALIDATION.EMAIL.REQUIRED'),
        v => /^.+@[^.].*\.[a-z]{2,}$/.test(v) || this.$t('CHAT.FORM.VALIDATION.EMAIL.VALID')
      ],
      nameRules: [
        v => !!v || this.$t('CHAT.FORM.VALIDATION.NAME.REQUIRED'),
        v => (v && v.length <= 30) || this.$t('CHAT.FORM.VALIDATION.NAME.VALID')
      ],
    }
  },

  computed: {
    token () {
      return this.$store.getters['data/token']
    },
    showWindow () {
      return this.$store.getters['data/showWindow']
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate()
      if (!this.valid) return
      this.newChatToken()
    },
    validate () {
      this.$refs.form.validate()
    },
    startChat () {
      if (!this.token) { this.chatForm(); return }
      else this.openWindow()
    },
    openWindow () {
      this.$store.dispatch('data/showWindow')
    },
    chatForm () {
      this.showForm = !this.showForm
    },
    async newChatToken () {
      if (!this.email
       || !this.name)
      return;

      const oReq = new XMLHttpRequest();
      oReq.open("POST", this.baseUrl + '/chat/new');
      oReq.setRequestHeader("Content-Type", "application/json");
      oReq.addEventListener("load", () => {
        const token = oReq.responseText
        if (oReq.status === 200) {
          this.$store.dispatch('data/setToken', token)
          this.showForm = false
          this.$store.dispatch('data/setUsername', this.name)
          this.startChat()
        }
      });
      oReq.send(JSON.stringify({
        email: this.email,
        name: this.name,
        company: this.company
      }))
    },
    getChatMessages: async () => {
      try {
        const response = await fetch(this.baseUrl + '/chat/new/' + this.token + '/messages')
        const json = await response.json()
        const data = json.statusCode === 200
          ? json.body
          : false
        if (data) {
          const keys = Object.keys(data).map((key) => {
            return data[key].id
          })
          this.postChatMessage(null, keys)
          return data
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    },
    postChatMessage: async (message, read) => {
      try {
        const response = await fetch(this.baseUrl + '/chat/new/' + this.token + '/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            message,
            read
          }
        })
        const json = await response.json()
        const result = json.statusCode === 200
          ? json.body
          : false
        return result
      } catch (error) {
        return false
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
 .v-btn {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
.dialog {
  position: relative;
  background-color: white;
  z-index: 9999 !important;
}
.v-text-field {
  padding-top: 0 !important
}

.v-text-field input {
  padding: 0px 0px 3px 0px !important
}
</style>
