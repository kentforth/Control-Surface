<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<script>
export default {};
</script>
<style lang="scss"></style>
