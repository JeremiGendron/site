<template>
  <div class="contact"
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 10px 10px 10px',
      marginBottom: $vuetify.breakpoint.xlOnly ? '50px' : '30px'
    }"
  >
    <div
      :style="{
        width: '100%',
        height: '10px',
      }"
    >

    </div>
    <ResponsiveTitle :text="$t('CONTACT.TITLE')"/>

    <br>
    <ResponsiveHeading :text="$t('CONTACT.BYEMAIL')"/>

    <br>
    <v-form
      v-model="valid"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        marginTop: '20px'
      }"
    >
      <span
        :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
      >
        {{$t('COMMON.NAME')}} <span style="color: red">*</span>
      </span>
      <v-text-field
        color="#222222AA"
        type="text"
        required
        v-model="name"
        :rules="rules.name"
      ></v-text-field>
      <span
        :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
      >
        {{$t('COMMON.EMAIL')}} <span style="color: red">*</span>

      </span>
      <v-text-field
        color="#222222AA"
        type="email"
        required
        v-model="email"
        :rules="rules.email"
      ></v-text-field>
      <span
        :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
      >
        {{$t('COMMON.COMPANY')}}

      </span>
      <v-text-field
        color="#222222AA"
        type="text"
        v-model="company"
      ></v-text-field>
      <span
        :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
      >
        {{$t('COMMON.MESSAGE')}} <span style="color: red">*</span>

      </span>
      <v-text-field
        color="#222222AA"
        required
        multi-line
        :rules="rules.message"
        v-model="message"
      ></v-text-field>
      <v-btn
        flat
        large
        :outline="!$vuetify.breakpoint.xlOnly"
        :disabled="!valid"
        @click="submit"
        :style="$vuetify.breakpoint.xlOnly ? {
          height: '60px',
          marginTop: '12px',
          fontSize: '38px'
        } : {}"
      >
        {{$t('COMMON.SEND')}}

      </v-btn>
    </v-form>
    <br>

    <Or  :style="{
      marginTop: '20px'
    }"/>
    
    <ResponsiveHeading  :style="{
      marginTop: '20px'
    }" :text="$t('CONTACT.BYPHONE')" />
    <br>
    <ResponsiveDiv>
      <span :class="`${$vuetify.breakpoint.xlOnly ? 'largeBody2' : 'body-2'}`">
        {{$t('CONTACT.CALLUS1')}}<a :href="phoneLink" :style="{display: 'inline-block'}">{{$t('CONTACT.NUMBER')}}</a>{{$t('CONTACT.CALLUS2')}}
      </span>
    </ResponsiveDiv>
    <ResponsiveTitle  :style="{
      marginTop: '20px'
    }" :text="$t('CONTACT.HOURS')"/>
    <BusinessHours/>
    <v-snackbar
      v-model="success"
      color="green"
      :timeout="5000"
    >
      Successfully sent email.
      <v-btn
        dark
        flat
        @click="success = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import BusinessHours from '@/components/BusinessHours'
import ResponsiveTitle from '@/components/Responsive/ResponsiveTitle'
import ResponsiveHeading from '@/components/Responsive/ResponsiveHeading'
import ResponsiveDiv from '@/components/Responsive/ResponsiveDiv'
import Or from './Or'

export default {
  name: 'Contact',

  components: {
    BusinessHours,
    ResponsiveTitle,
    ResponsiveHeading,
    ResponsiveDiv,
    Or
  },

  data () {
    return {
      email: '',
      name: '',
      message: '',
      company: '',
      valid: false,
      success: false,
      messageInvalid: false,
      rules: {
        email: [
          v => !!v || this.$t('CHAT.FORM.VALIDATION.EMAIL.REQUIRED'),
          v => /^.+@[^.].*\.[a-z]{2,}$/.test(v) || this.$t('CHAT.FORM.VALIDATION.EMAIL.VALID')
        ],
        name: [
          v => !!v || this.$t('CHAT.FORM.VALIDATION.NAME.REQUIRED'),
          v => (v && v.length <= 30) || this.$t('CHAT.FORM.VALIDATION.NAME.VALID')
        ],
        message: [
          v => !!v || this.$t('CONTACT.MESSAGE.REQUIRED'),
          v => (v && v.length >= 30) || this.$t('CONTACT.MESSAGE.VALID')
        ]
      },
      phoneLink: 'tel:+15145555555'
    }
  },

  methods: {
    async submit () {
      if (this.message.length < 20) { this.messageInvalid = true; return }
      this.messageInvalid = false
      console.log('fetching')
      fetch('https://a6oenthmea.execute-api.us-east-2.amazonaws.com/chat-api/email', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          message: this.message.trim(),
          company: this.company,
          name: this.name
        })
      })
      this.valid = false
      this.success = true
    }
  },
}
</script>

<style>
.v-text-field {
  padding-top: 0 !important
}

.v-text-field input {
  padding: 0px 0px 3px 0px !important
}
</style>
