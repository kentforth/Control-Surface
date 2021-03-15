<template>
  <div class="default">
    <Navigation />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "Default",
  components: { Navigation }
};
</script>

<style scoped></style>
