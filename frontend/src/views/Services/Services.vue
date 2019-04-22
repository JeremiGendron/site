<template>
  <div class="services"
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 10px 10px 10px',
      marginBottom: $vuetify.breakpoint.xlOnly ? '50px' : '30px',
    }"
  >
    <div
      v-for="(service, index) in services"
      :key="index"
      :style="{
        width: $vuetify.breakpoint.xlOnly ? '80%' : '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: $vuetify.breakpoint.xlOnly ? '30px' : '10px'
      }"
      :ref="service"
    >
      <ResponsiveTitle :text="$t(`SERVICES.${service}.TITLE`)"/>
      <ResponsiveHeading :text="$t(`SERVICES.${service}.SUBTITLE`)" :style="{ fontWeight: 'normal'}"/>
      <ResponsiveDiv
        v-if="examples[service].length > 0"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: $vuetify.breakpoint.xlOnly ? '15px 0px 0px 10px' : '7px 0px 0px 5px'
        }"
      >
        <div
          v-for="(example, i) in examples[service]"
          :key="i"
          @click="goToLink(example.link)"
          :style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }"
        >
          <img
            :src="example.icon"
            :style="{
              maxWidth: $vuetify.breakpoint.xlOnly ? '52px' : '24px',
              maxHeight: $vuetify.breakpoint.xlOnly ? '52px' : '24px'
            }"
          />
          <span
            :class="$vuetify.breakpoint.xlOnly ? 'largeBody2' : 'body-2'"
          >
            {{example.name}}
          </span>
        </div>
      </ResponsiveDiv>
    </div>
  </div>
</template>
<script>
import ResponsiveHeading from '@/components/Responsive/ResponsiveHeading'
import ResponsiveTitle from '@/components/Responsive/ResponsiveTitle'
import ResponsiveDiv from '@/components/Responsive/ResponsiveDiv'

export default {
  name: 'Services',
  components: {
    ResponsiveHeading,
    ResponsiveTitle,
    ResponsiveDiv
  },

  data () {
    return {
      services: [
        'BLOCKCHAIN',
        'BLOG',
        'CUSTOM',
        'CLOUD',
        'MULTIMEDIA'
      ],
      examples: {
        BLOCKCHAIN: [
          {
            name: 'Ark.io',
            icon: 'https://ark.io/images/media-kit/red-square.png',
            link: 'https://github.com/arkecosystem'
          }
        ],
        BLOG: [
          //{}
        ],
        CUSTOM: [
          //{}
        ],
        CLOUD: [
          //{}
        ],
        MULTIMEDIA: [
          //{}
        ],
      }
    }
  },

  computed: {},

  methods: {
    goToLink(link) {
      window.open(link, '_blank')
    },
  },

  mounted () {
    const pathname = window.location.pathname
    const splits = pathname.split('/')
    if (splits.length > 2) {
      const section = splits[2]
      const y = this.$refs[section.toUpperCase()][0].getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y - 70,
        behavior: 'smooth'
      });
    }
  },
  created() {}
}
</script>