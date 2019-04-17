<template>
  <h2
    :class="$vuetify.breakpoint.xlOnly ? 'largeHeadline' : 'headline'" 
    :style="{
      minWidth: '300px',
      width: '50%',
      maxWidth: '90%',
      textAlign: 'left'
    }"
  >
    {{text}}
  </h2>
</template>

<script>
export default {
  name: 'ResponsiveTitle',

  props: ['text']
}
</script>

<style>

</style>


    