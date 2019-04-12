<template>
  <div
    v-show="loaded"
    :style="{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '50px'
    }"
  >
    <div
      :style="{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
      }"
    >
      <div
        :style="{
        }"
      >
        <div>
          <span
            :style="{
              position: 'absolute',
              top: '0',
              left: '0',
              transition: '0.25s all ease',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              backgroundColor: hovering ? '#000000FF' : '#222222AA',
              padding: `10px ${$vuetify.breakpoint.xlOnly ? '35px' : '15px'} 10px ${$vuetify.breakpoint.xsOnly ? '45px' : $vuetify.breakpoint.xlOnly ? '128px' : '70px'}`,
              color: '#EEEEEEFF',
              fontSize: $vuetify.breakpoint.xlOnly ? '50px' : '17px',
              cursor: 'pointer'
            }"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @click="$router.push(`/services/${slideShowData[currentSlide].name.toLowerCase()}`)"
          > {{$t(`SLIDES.${slideShowData[currentSlide].name}.TITLE`)}} </span>
          <div :style="{
            width: `${$vuetify.breakpoint.xsOnly ? '30px' : $vuetify.breakpoint.xlOnly ? '109px' : '55px'}`,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: '44px',
            backgroundColor: '#EEEEEEBB'
          }"></div>
          <img
            :src="src"
            :style="{
              maxWidth: '100%',
              maxHeight: windowHeight - 150 + 'px',
              userSelect: 'none',
              userDrag: 'none',
              cursor: 'ew-resize',
            }"
            @mouseover="pausing = true"
            @mouseleave="pausing = false"
            v-touch:swipe.left="goToNext"
            v-touch:swipe.right="goToPrev"
            id="activeSlide"
          />
          <span
            :style="{
              position: 'absolute',
              bottom: $vuetify.breakpoint.xlOnly ? '62px' : '44px',
              padding: '7px',
              textAlign: 'center',
              fontFamily: 'Roboto',
              fontSize: $vuetify.breakpoint.smAndDown ? '19px' : $vuetify.breakpoint.xlOnly ? '50px' : '23px',
              left: 0,
              right: 0,
              fontWeight: 'bold',
              backgroundColor: '#222222AA',
              color: '#EEEEEEFF'
            }"
          >
            {{$t(`SLIDES.${slideShowData[currentSlide].name}.DESCRIPTION`)}}
          </span>
        </div>
      </div
      >
        <div id="controller"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            margin: '10px 0px'
          }"
        >
          <div
            v-for="(_, index) in new Array(slideShowData.length).fill(0)"
            :key="index"
          >
            <div
              :style="{
                backgroundColor: currentSlide == index ? '#222222AA' : 'white',
                border: currentSlide == index ? '' : '2px solid #222222AA',
                width:  $vuetify.breakpoint.xlOnly ? '30px' : '10px',
                height: $vuetify.breakpoint.xlOnly ? '30px' : '10px',
                margin: '4px 6px',
                borderRadius: '50%',
                cursor: currentSlide == index ? '' : 'pointer'
              }"
              @click="switchToSlide(index)"
            >

            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideShow',
  components: {},

  props: ['slideShowData'],

  data () {
    return {
      currentSlide: 0,
      hovering: false,
      loaded: false,
      pausing: false,
      lastChanged: 0,
      dragStart: null
    }
  },

  mounted () {
    this.lastChanged = Date.now()
    setTimeout(() => this.loaded = true, 750)
    this.scroll()
  },

  methods: {
    switchToSlide (slide) {
      this.currentSlide = slide
      this.lastChanged = Date.now()
    },
    scroll () {
      if (Date.now() - this.lastChanged < 7500) {
        setTimeout(() => this.scroll(), 10000)
        return
      }
      const nextSlide = this.currentSlide + 1
      if (!this.pausing) this.switchToSlide(nextSlide > this.slideShowData.length - 1 ? 0 : nextSlide)
      setTimeout(() => this.scroll(), 10000)
    },
    dragStartEv (ev) {
      this.dragStart = ev.screenX
    },
    dragEndEv (ev) {
      if (this.dragStart) {
        if (this.dragStart - ev.screenX > 27) {
          this.goToNext()
        }
        else if (this.dragStart - ev.screenX < -27) {
          this.goToPrev()
        }
        this.dragStart = null
      }
    },
    goToNext () {
      let nextSlide = this.currentSlide + 1
      if (nextSlide > this.slideShowData.length - 1) nextSlide = 0
      this.switchToSlide(nextSlide)
    },
    goToPrev () {
      let nextSlide = this.currentSlide - 1
      if (nextSlide < 0) nextSlide = this.slideShowData.length - 1
      this.switchToSlide(nextSlide)
    },
    report (ev) {
      console.log(ev)
    },
  },

  computed: {
    windowHeight () {
      return this.$store.getters['data/windowHeight']
    },

    src () {
      return require(`@/assets/images/${this.slideShowData[this.currentSlide].name.toLowerCase()}.jpg`)
    },
  },  
}
</script>
