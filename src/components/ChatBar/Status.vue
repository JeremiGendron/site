<template>
  <div
    :style="{
      width: '10px',
      height: '10px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '12px',
    }"
  >
    <img :src="dot"/>
  </div>
</template>

<script>
export default {
  name: 'Status',
  
  data: () => ({
    baseUrl: 'https://a6oenthmea.execute-api.us-east-2.amazonaws.com/chat-api',
    dots: {
      green: require('@/assets/dots/greendot.png'),
      orange: require('@/assets/dots/orangedot.png'),
      black: require('@/assets/dots/blackdot.png'),
    },
  }),
  
  created () {
    this.statusLoop()
  },
  
  methods: {
    async statusLoop () {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", () => {
        const status = JSON.parse(oReq.response).status
        if (status === 200) this.$store.dispatch('data/setStatus', 'green')
        else if (status === 404) this.$store.dispatch('data/setStatus', 'black')
        else if (status === 502) this.$store.dispatch('data/setStatus', 'orange')

      });
      oReq.open("GET", this.baseUrl + '/status');
      oReq.send();
      setTimeout(() => this.statusLoop(), 15000)
    },
  },
  computed: {
    dot () {
      return this.dots[this.$store.getters['data/status']]
    },
    windowHeight () {
      return this.$store.getters['data/windowHeight']
    }
  },
}
</script>

<style>

</style>
