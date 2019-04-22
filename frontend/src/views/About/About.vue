<template>
  <div class="about"
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: $vuetify.breakpoint.lgAndUp ? '20px' : '10px',
      flexDirection: 'column',
    }"
  >
    <div class="header"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: $vuetify.breakpoint.xlOnly ? 'center' : 'justify',
      }"
    >
      <h2
        :class="$vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'headline'"
        :style="{
        }"
      >
        {{$t('ABOUT.TEAM')}}
      </h2>
    </div>
    <div class="section"
      :style="{
        minWidth: '300px',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      <div
        :style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          textAlign: 'justify'
        }"
      >
        <div
          v-for="(member, index) in members"
          :key="index"
          :style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: $vuetify.breakpoint.xlOnly ? '20px' : '10px 10px 0px 10px',
            flexWrap: 'wrap'
          }"
        >
          <img
            :src="member.picture"
            :style="{
              maxWidth: '100%',
              borderRadius: '10px 10px 0px 10px',
              maxHeight: windowHeight - 180 + 'px',
              flex: 1
            }"
            id="member-image"
          />
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              textAlign: $vuetify.breakpoint.xlOnly ? 'center' : 'justify',
              width: '100%',
              padding: '20px'
            }"
          >
            <h3
              :class="$vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'title'"
            >
              {{member.name}}
            </h3>
            <h4
              :class="$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'subheading'"
              :style="{
                textDecoration: 'underline'
              }"
            >
              {{member.role}}
            </h4>
            <h5
              :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
              :style="{
                margin: '15px 0px 0px 0px',
                padding: $vuetify.breakpoint.xlOnly ? '10px 15px' : '3px',
                textAlign: 'left'
              }"
            >
              {{$t('ABOUT.DESCRIPTION')}}
            </h5>
            <p 
              v-if="memberImageWidth > 0" 
              :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
              :style="{
                alignSelf: 'center',
                maxWidth: memberImageWidth + 50  + 'px', 
                textAlign: $vuetify.breakpoint.xlOnly ? 'justify' : 'center',
                padding: $vuetify.breakpoint.xlOnly ? '8px 15px' : '3px'
              }"
            >
              {{$t('ABOUT.DESCRIPTION21')}} <a :href="github" style="display: inline-block">{{$t('ABOUT.GITHUB')}}</a> {{$t('ABOUT.DESCRIPTION22')}}
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'About',

  components: {
  },

  data () {
    return {
      memberImageWidth: 0,
      github: 'https://github.com/jeremigendron/site'
    }
  },

  mounted () {
    this.getImageWidth()
  },

  methods: {
    getImageWidth () {
      this.memberImageWidth = this.$el.querySelector('#member-image').clientWidth
      setTimeout(() => this.getImageWidth(), 400)
    }
  },

  computed: {
    windowHeight () {
      return this.$store.getters['data/windowHeight']
    },
    members () {
      return [
        {
          name: 'Jeremi Gendron',
          picture: require('@/assets/team/jeremi.jpg'),
          role: this.$t('ABOUT.JEREMI.ROLE')
        }
      ]
    }
  }
}
</script>