<template>
  <div class="examples">
    Examples
  </div>
</template>

<script>
export default {
  name: "Examples",
  mounted() {
    let currentRoute = this.$router.currentRoute._rawValue.params.title;
    const title = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
    window.document.title = title;
    console.log(currentRoute);
  }
};
</script>

<style scoped lang="scss">
.examples {
  padding: 7em 0;
}
</style>
