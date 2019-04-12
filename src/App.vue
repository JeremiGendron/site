<template>
  <v-app>
    <v-toolbar app role="navigation" :style="{
      padding: $vuetify.breakpoint.xlOnly ? '0px 15px' : ''
    }">
      <v-toolbar-title :class="`${$vuetify.breakpoint.xsOnly ? 'title' : $vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'headline'} text-uppercase`">
        <router-link
          role="tab" aria-label="home"
          to="/"
          class="standardLink"
        >
          <span>Future</span>
          <span class="font-weight-light">Hendrix</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items role="tabgroup" class="hidden-xs-only">
        <v-btn flat to="/about" role="tab" :style="{
          fontSize: $vuetify.breakpoint.xlOnly ? '38px' : ''
        }">
            {{ $t('HEADER.ABOUT') }}
        </v-btn>
        <v-btn flat to="/contact" role="tab" :style="{
          fontSize: $vuetify.breakpoint.xlOnly ? '38px' : ''
        }">
          {{ $t('HEADER.CONTACT') }}
        </v-btn>
        <v-btn flat to="/services" role="tab" :style="{
          fontSize: $vuetify.breakpoint.xlOnly ? '38px' : ''
        }">
            {{ $t('HEADER.SERVICES') }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
            >
              Menu
            </v-btn>
          </template>
          <v-list role="tabgroup">
            <v-list-tile
              role="tab"
              v-for="(item, index) in [$t('HEADER.ABOUT'), $t('HEADER.CONTACT'), $t('HEADER.SERVICES')]"
              :key="index"
              @click="() => $router.push(links[index])"
            >
              <v-list-tile-title>
                {{ item }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-btn
        class="hidden-xl-only"
        flat
        @click="changeLanguage"
        icon
        outline
      >
        <span class="">{{ $t(`LANGUAGES.${currentLanguage == 'en-CA' ? 'fr-CA' : 'en-CA' }.CODE`) }}</span>
      </v-btn>
      <v-btn
        class="hidden-lg-and-down largeBody2"
        flat
        @click="changeLanguage"
        icon
        large
        :style="{
          borderRadius: '0%',
        }"
      >
        <span class="">{{ $t(`LANGUAGES.${currentLanguage == 'en-CA' ? 'fr-CA' : 'en-CA' }.CODE`) }}</span>
      </v-btn>
    </v-toolbar>

    <v-content :style="{      marginBottom: $vuetify.breakpoint.xlOnly ? '50px' : '20px' }">
      <router-view></router-view>
    </v-content>

    <v-footer>
      <Footer/>
    </v-footer>
    <v-footer fixed :style="$vuetify.breakpoint.xlOnly ? {     transformOrigin:' bottom left', transform: 'scale(2)'} : {}">
      <ChatBar/>
    </v-footer>
    <ChatWindow v-if="showWindow"/>
  </v-app>
</template>

<script>
import Footer from './components/Footer'
import ChatBar from './components/ChatBar/ChatBar'
import ChatWindow from './components/ChatBar/ChatWindow'

export default {
  name: 'App',
  components: {
    Footer,
    ChatBar,
    ChatWindow
  },
  data () {
    return {
      links: {
        0: "/about",
        1: "/contact",
        2: "/services"
      }
    }
  },

  methods: {
    changeLanguage () {
      this.$i18n.locale
      this.$store.dispatch('i18n/changeLanguage')
    },
    windowHeight () {
      this.$store.dispatch('data/windowHeight', window.innerHeight)
      setTimeout(() => this.windowHeight(), 177)
    }
  },

  created () {
    const currentLanguage = this.$store.getters['i18n/currentLanguage']
    if (!currentLanguage) this.$store.dispatch('i18n/changeLanguage')
    this.$i18n.locale = this.$store.getters['i18n/currentLanguage']
    this.$store.dispatch('data/hideWindow')
    this.windowHeight()
  },

  watch: {
    currentLanguage (value) {
      this.$i18n.locale = value
    }
  },

  computed: {
    currentLanguage () {
      return this.$store.getters['i18n/currentLanguage']
    },
    showWindow () {
      return this.$store.getters['data/showWindow']
    },
    token () {
      return this.$store.getters['data/token']
    },
  },
}
</script>

<style>
.standardLink {
  text-decoration: none;
  color: inherit;
}

.largeHeading {
  font-family: 'Roboto';
  font-size: 42px
}

.largeBody2 {
  font-family: 'Roboto';
  font-size: 28px;
  font-weight: bold
}

.largeBody1 {
  font-family: 'Roboto';
  font-size: 28px
}

.largeHeadline {
  font-family: 'Roboto';
  font-size: 50px
}
</style>
