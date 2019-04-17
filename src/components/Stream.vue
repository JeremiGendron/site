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
    <ResponsiveTitle :text="title" :style="{
      textDecoration: 'underline'
    }"/>
    <br>
    <div
      :style="{
        margin: $vuetify.breakpoint.xsOnly ? '' : '10px'
      }"
    >
      <video
        id="stream-video"
        :style="{
          maxWidth: '100%',
          maxHeight: windowHeight - 150 + 'px',
        }"
        ref="stream-video"
        :poster="src"
        controls
        muted
      >

      </video>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
import ResponsiveTitle from '@/components/Responsive/ResponsiveTitle'

export default {
  name: 'Stream',

  components: {
    ResponsiveTitle
  },

  data () {
    return {
      baseUrl: 'https://a6oenthmea.execute-api.us-east-2.amazonaws.com/chat-api',
      isLive: false,
      src: require('@/assets/live-stream.png')
    }
  },

  computed: {
    windowHeight () {
      return this.$store.getters['data/windowHeight']
    },
    title () {
      return this.$t('HOME.STREAM.TITLE')
    }
  },

  watch: {},

  methods: {
    async initVideo () {
      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", () => {
        if (oReq.status === 200) {
          const body = JSON.parse(oReq.responseText)
          const message = body.data
          const video = document.querySelector('#stream-video')

          if (Hls.isSupported()) {
            const hls = new Hls({
              fragLoadingMaxRetry: 20,
            });
            // bind them together
            hls.attachMedia(video);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              hls.loadSource(`https://jeremigendron.com/stream/sample/${message}/out.m3u8`);
              hls.on(Hls.Events.MANIFEST_PARSED, function () {
              });
            });
          }
          else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = `https://jeremigendron.com/stream/sample/${message}/out.m3u8`;
            video.addEventListener('loadedmetadata', function() {
            });
          }
        }
      });
      oReq.open("GET", this.baseUrl + '/metadata-streams-sample-current');
      oReq.send();
    }
  },

  created () {

  },

  mounted () {
    this.initVideo()
  },
}
</script>

<style>

</style>
