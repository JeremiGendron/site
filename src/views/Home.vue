<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      width: '100%',
    }"
  >
    <SlideShow v-bind:slideShowData="slideShowData"/>
  </div>
</template>

<script>
import SlideShow from '../components/SlideShow'
  export default {
    name: 'Home',
    components: {
      SlideShow
    },

    data () {
      return {
        slideShowData: [
          {
            name: 'BLOCKCHAIN',
          },
          {
            name: 'BLOG',
          },
          {
            name: 'CUSTOM'
          },
          {
            name: 'CLOUD'
          },
          {
            name: 'MULTIMEDIA'
          }
        ],
        hovers: {},
        images: 
         [{
            src: require('@/assets/images/blockchain.jpg')
          },
          {
            src: require('@/assets/images/blog.jpg')
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }]
      }
    },

    created () {
    }
  }
</script>

<style>
</style>
