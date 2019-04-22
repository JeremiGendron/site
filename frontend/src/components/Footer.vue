<template>
  <div
    :style="{
      width: '100%',
      backgroundColor: '#EEEEEEFF',
      borderTop: '4px solid #D3D3D3FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      marginBottom: $vuetify.breakpoint.xlOnly ? '72px' : '36px',
      marginTop: '36px'
    }"
  >
      <div class="socialIcon"
        v-for="(social, index) in socials"
        :key="index"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `${$vuetify.breakpoint.smAndDown ? '12px 12px' : $vuetify.breakpoint.xlOnly ? '28px 40px' : '14px 20px'}`,
          cursor: 'pointer',
        }"
        @click="goToLink(social)"
      >
        <img :src="require(`@/assets/socials/${social}.svg`)" 
          :style="{
            width: `${$vuetify.breakpoint.smAndDown ? '24px' : $vuetify.breakpoint.xlOnly ? '72px' : '36px'}`,
            height: `${$vuetify.breakpoint.smAndDown ? '24px' : $vuetify.breakpoint.xlOnly ? '72px' : '36px'}`,
            marginBottom: `${$vuetify.breakpoint.xsOnly ? '10px' : '2px'}`
          }" />
        <span
          :style="{
            fontSize: `${$vuetify.breakpoint.smAndDown ? '12px' : $vuetify.breakpoint.xlOnly ? '32px' : '18px'}`
          }"
        ><u>{{social}}</u></span>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',

  components: {
  },  

  data () {
    return {
      socials: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'],
      links: {
        'Twitter': 'https://twitter.com/jeremigendron',
        'Facebook': 'https://www.facebook.com/jeremigendroncom',
        'LinkedIn': 'https://www.linkedin.com/in/jeremi-gendron', 
        'Instagram': 'https://instagram.com/Jeremi_Gendron'
      }
    }
  },

  methods: {
    goToLink(social) {
      window.open(this.links[social], '_blank')
    }
  },
}
</script>
