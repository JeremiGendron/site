<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      margin: $vuetify.breakpoint.xlOnly ? '42px' : $vuetify.breakpoint.xsOnly ? '10px 0px' : '24px',
      justifyContent: isEven(index) ? 'flex-end': 'flex-start'
    }"
  >
    <h3
      :class="$vuetify.breakpoint.xlOnly ? '' : ''"
      :style="{
        fontStyle: 'italic',
        fontWeight: 'normal',
        width: '100%',
        textAlign: isEven(index) ? 'right': 'left',
        color: '#555555FF',
        fontSize: $vuetify.breakpoint.xlOnly ? '42px' : $vuetify.breakpoint.xsOnly ? '16px' : '24px'
      }"
    >
      "{{quote.title}}" <span :style="{ 
        color: '#222222FF', 
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: $vuetify.breakpoint.xlOnly ? '36px' : $vuetify.breakpoint.xsOnly ? '14px' : '20px'
        }"
        >- {{quote.from}}</span>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'Quote',

  props: ['quote', 'index'],

  components: {},

  data () {
    return {}
  },

  computed: {},

  methods: {
    isEven (index) {
      return index == 0 || index % 2 == 0
    }
  },
}
</script>

<style>

</style>
