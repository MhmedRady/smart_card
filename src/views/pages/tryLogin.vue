<template>
  <div>
    <h1>Try Login</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('redirectPage', { name: 'tryHome' })
  },
}
</script>
