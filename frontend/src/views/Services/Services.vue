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
      <ResponsiveDiv
        v-if="examples[service].length > 0"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',  
          margin: $vuetify.breakpoint.xlOnly ? '15px 0px 0px 10px' : '7px 0px 0px 5px'
        }"
      >
        <div
          v-for="(example, i) in examples[service]"
          :key="i"
          :style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: '2vh',
            borderRadius: '1vh',
            border: '2px solid black',
            marginBottom: '1vh',
            width: '100%'
          }"
        >
          <div
            :style="{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: '1vh'
            }"
          >
            <img
              :src="example.icon"
              @click="goToLink(example.link)"
              :style="{
                width: $vuetify.breakpoint.xlOnly ? '5vh' : '5vh',
                height: $vuetify.breakpoint.xlOnly ? '5vh' : '5vh',
                borderRadius: '1vh',
                cursor: 'pointer',
              }"
            />
            <span
              :class="$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'subheading'"
              @click="goToLink(example.link)"
              :style="{
                margin: '0vh 1vh',
                cursor: 'pointer',
                fontWeight: 'bold'
              }"
            >
              {{example.name}}
            </span>
          </div>
          <span class="subheading">{{example.description}}</span>
          <div class="points"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: '0.5vh'
            }"
          >
            <span
              v-for="(point, index) in example.points"
              :key="index"
              :style="{
                margin: '0.5vh',
                fontWeight: 'bold'
              }"
            >
              • {{point}}
            </span>
          </div>
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
            link: 'https://github.com/arkecosystem',
            description: this.$t('SERVICES.BLOCKCHAIN.EXAMPLES.ARK.DESCRIPTION'),
            points: [
              this.$t('SERVICES.POINTS.CRYPTOGRAPHY'), 
              this.$t('SERVICES.POINTS.NETWORKING'), 
              this.$t('SERVICES.POINTS.JAVASCRIPT'), 
              this.$t('SERVICES.POINTS.VUEJS'), 
              this.$t('SERVICES.POINTS.NODEJS'), 
              this.$t('SERVICES.POINTS.DOCUMENTATION'),
              this.$t('SERVICES.POINTS.FRONTEND')]
          },
          {
            name: 'artdecenter.com',
            icon: 'https://avatars3.githubusercontent.com/u/46008352?s=200&v=4',
            link: 'https://artdecenter.com',
            description: this.$t('SERVICES.BLOCKCHAIN.EXAMPLES.ARTDECENTER.DESCRIPTION'),
            points: [
              this.$t('SERVICES.POINTS.SOLIDITY'), 
              this.$t('SERVICES.POINTS.ETHEREUM'), 
              this.$t('SERVICES.POINTS.JAVASCRIPT'), 
              this.$t('SERVICES.POINTS.VUEJS'), 
              this.$t('SERVICES.POINTS.NODEJS'), 
              this.$t('SERVICES.POINTS.ARCHITECTURE'), 
              this.$t('SERVICES.POINTS.BACKEND')]
          }
        ],
        BLOG: [
          //{}
        ],
        CUSTOM: [
          //{}
        ],
        CLOUD: [
          {
            name: 'Throwaway.mobi',
            icon: 'https://throwaway.mobi/favicon.ico',
            link: 'https://throwaway.mobi',
            description: this.$t('SERVICES.CLOUD.EXAMPLES.THROWAWAY.DESCRIPTION'),
            points: ['aws', 'lambda', 'dynamodb', 'apigateway', 'route53', 's3', 'cloudfront', 'frontend', 'vuejs']
          }
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