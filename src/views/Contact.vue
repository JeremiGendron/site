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
    <h2 :class="$vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'headline'" 
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      {{$t('CONTACT.TITLE')}}
    </h2>
    <br>
    <h3 :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'}`"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left',
        paddingLeft: '2px'
      }"
    > 
      {{$t('CONTACT.BYEMAIL')}}
    </h3>
    <br>
    <v-form
      v-model="valid"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%'
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
    <div
      :style="{
        marginTop: $vuetify.breakpoint.xlOnly ? '50px' : '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
      }"
    >
      <h4 
        :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'}`"
        :style="{
          backgroundColor: 'white'
        }"
      >
        {{$t('COMMON.OR').toUpperCase()}}
      </h4>

    </div>

    <br><br>
    <h3 :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'}`"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      {{$t('CONTACT.BYPHONE')}}
    </h3>
    <br>
    <span :class="`${$vuetify.breakpoint.xlOnly ? 'largeBody2' : 'body-2'}`" 
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      {{$t('CONTACT.CALLUS1')}}<a :href="phoneLink" :style="{display: 'inline-block'}">{{$t('CONTACT.NUMBER')}}</a>{{$t('CONTACT.CALLUS2')}}
    </span>
    <br><br>
    <h2 :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'headline'}`" 
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      {{$t('CONTACT.HOURS')}}
    </h2>
    <BusinessHours/>
  </div>
</template>

<script>
import BusinessHours from '../components/BusinessHours'

export default {
  name: 'Contact',

  components: {
    BusinessHours
  },

  data () {
    return {
      email: '',
      name: '',
      message: '',
      company: '',
      valid: false,
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
    submit () {
      if (this.message.length < 20) { this.messageInvalid = true; return }
      this.messageInvalid = false
      return
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
