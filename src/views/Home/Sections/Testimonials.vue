<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '10px',
      width: '100%'

    }"
  >
    <br>
    <ResponsiveTitle :text="$t('HOME.TESTIMONIALS.TITLE')" :style="{
      textDecoration: 'underline'
    }"/>
    <div
      :style="{
        width: $vuetify.breakpoint.xlOnly ? '50%' : $vuetify.breakpoint.xsOnly ? '100%' : $vuetify.breakpoint.smAndDown ? '80%' : '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      padding: $vuetify.breakpoint.xlOnly ? '42px' : $vuetify.breakpoint.xsOnly ? '10px' : '24px',
      }"
    >
      <Quote
        v-for="(quote, index) in quotes"
        :key="index"
        :quote="quote"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import ResponsiveTitle from '@/components/Responsive/ResponsiveTitle'
import Quote from './Components/Quote'

export default {
  name: 'Testimonials',
  components: {
    ResponsiveTitle,
    Quote
  },

  computed: {
    quotes () {
      return [
        {
          title: 'Something longer than a few chars, perhaps spanning a few lines or something like that',
          from: 'Somecorp, Inc.',
          extra: {}
        },
        {
          title: 'Something longer than a few chars, perhaps spanning a few lines or something like that',
          from: 'Somecorp, Inc.',
          extra: {}
        }
      ]
    }
  }
}
</script>

<style>

</style>
