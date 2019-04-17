<template>
  <h3 
    :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'}`"
    :style="{
      minWidth: '300px',
      width: '50%',
      maxWidth: '90%',
      textAlign: 'left',
      paddingLeft: '2px'
    }"
  >
    {{text}} 
  </h3>
</template>

<script>
export default {
  name: 'ResponsiveHeading',
  props: ['text']
}
</script>

<style>

</style>
