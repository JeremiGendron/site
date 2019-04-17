<template>
  <div
    :style="{
      minWidth: '300px',
      width: '50%',
      maxWidth: '90%',
      textAlign: 'left'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveDiv',
}
</script>

<style>

</style>
