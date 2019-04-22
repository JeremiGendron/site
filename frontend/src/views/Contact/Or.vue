
<template>
  <div
    :style="{
      marginTop: $vuetify.breakpoint.xlOnly ? '50px' : '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '300px',
      width: '50%',
      maxWidth: '90%',
    }"
  >
    <h4 
      :class="`${$vuetify.breakpoint.xlOnly ? 'largeHeading' : 'heading'}`"
      :style="{
        backgroundColor: 'white'
      }"
    >
      {{$t('COMMON.OR').toUpperCase()}}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'Or'
}
</script>

<style>

</style>
