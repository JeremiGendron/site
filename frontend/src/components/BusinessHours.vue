<template>
  <div
      :style="{
        minWidth: '300px',
        width: '50%',
        maxWidth: '90%',
        textAlign: 'left',
        padding: '5px 10px 10px 10px',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }"
  >
    <div class="day"
      v-for="(day, index) in days"
      :key="index"
      :style="{
        display: 'inline-block',
        margin: '5px'
      }"
    >
      <span :class="`${$vuetify.breakpoint.xlOnly ? 'largeBody2' : 'body-2'}`"
        :style="{

        }"
      >
        {{day.name}}
      </span><br>
      <span :class="`open ${$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'}`"
        :style="{

        }"
      >
        {{day.open}}
      </span>
      <span :class="`${$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'}`">
        {{$t('COMMON.TO')}}
      </span>
      <span :class="`close ${$vuetify.breakpoint.xlOnly ? 'largeBody1' : 'body-1'}`"
        :style="{

        }"
      >
        {{day.close}}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BusinessHours',

  data () {
    return {}
  },

  methods: {

  },

  computed: {
    days () {
      return [
        {
          name: this.$t('DIAS.MONDAY'),
          open: this.$t('AHORAS.eight'),
          close: this.$t('AHORAS.twenty'),
        },
        {
          name: this.$t('DIAS.TUESDAY'),
          open: this.$t('AHORAS.eight'),
          close: this.$t('AHORAS.twenty'),
        },
        {
          name: this.$t('DIAS.WEDNESDAY'),
          open: this.$t('AHORAS.eight'),
          close: this.$t('AHORAS.twenty'),
        },
        {
          name: this.$t('DIAS.THURSDAY'),
          open: this.$t('AHORAS.eight'),
          close: this.$t('AHORAS.twenty'),
        },
        {
          name: this.$t('DIAS.FRIDAY'),
          open: this.$t('AHORAS.ten'),
          close: this.$t('AHORAS.twenty'),
        },
        {
          name: this.$t('DIAS.SATURDAY'),
          open: this.$t('AHORAS.ten'),
          close: this.$t('AHORAS.twentytwo'),
        },
        {
          name: this.$t('DIAS.SUNDAY'),
          open: this.$t('AHORAS.ten'),
          close: this.$t('AHORAS.twentytwo'),
        },
      ]
    }
  },

}
</script>

<style>

</style>
