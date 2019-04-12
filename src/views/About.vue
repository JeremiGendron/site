<template>
  <div class="about"
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: $vuetify.breakpoint.lgAndUp ? '20px' : '10px',
      flexDirection: 'column',
      marginBottom: '20px'
    }"
  >
    <div class="description"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'justify'
      }"
    >
      <span>
        <span>
        <span
          :class="$vuetify.breakpoint.xlOnly ? 'largeBody2' : 'body-2'"
        >
          {{$t('ABOUT.NAME1').toUpperCase()}}
        </span>
        <span
          :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1' "
        >
          {{$t('ABOUT.NAME2').toUpperCase()}}
        </span>
        </span>
        <span
          :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
        >{{$t('ABOUT.DESCRIPTION')}}</span>
      </span>
      <p
        :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
      >
        {{$t('ABOUT.DESCRIPTION2')}}
      </p>
    </div>
    <div class="header"
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left'
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
        width: $vuetify.breakpoint.lgAndUp ? '50%' : $vuetify.breakpoint.mdAndDown ? '60%' : '90%',
        maxWidth: '90%',
        textAlign: 'left'
      }"
    >
      <div
        :style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
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
            padding: $vuetify.breakpoint.xlOnly ? '20px' : '10px',
            width: '50%'
          }"
        >
          <img
            :src="member.picture"
            :style="{
              maxWidth: '100%',
              borderRadius: '10px 10px 0px 10px',
              maxHeight: $vuetify.breakpoint.xlOnly ? '480px' : $vuetify.breakpoint.lgOnly ? '280px' : '200px',
              margin: $vuetify.breakpoint.xlOnly ? '40px' : $vuetify.breakpoint.lgOnly ? '20px' : '16px'

            }"
          />
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              alignItems: ''
            }"
          >
            <h3
              :class="$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'"
            >
              {{member.name}}
            </h3>
            <h4
              :class="$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'"
            >
              {{member.role}}
            </h4>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'About',

  data () {
    return {
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
        },
                {
          name: 'Jeremi Gendron',
          picture: require('@/assets/team/jeremi.jpg'),
          role: this.$t('ABOUT.JEREMI.ROLE')
        },
                {
          name: 'Jeremi Gendron',
          picture: require('@/assets/team/jeremi.jpg'),
          role: this.$t('ABOUT.JEREMI.ROLE')
        },        {
          name: 'Jeremi Gendron',
          picture: require('@/assets/team/jeremi.jpg'),
          role: this.$t('ABOUT.JEREMI.ROLE')
        },
        
        
      ]
    }
  }
}
</script>