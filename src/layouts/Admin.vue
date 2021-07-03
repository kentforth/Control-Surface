<template>
  <div class="default">
    <Navigation />
    <div class="page">
      <TheSidebar />
      <main class="main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import TheSidebar from "@/components/admin/TheSidebar";
export default {
  name: "Admin",
  components: { TheSidebar, Navigation }
};
</script>

<style scoped lang="scss">
.page {
  margin-top: rem(75px);
  display: flex;
}

.main {
  margin-left: 250px;
  max-height: 100vh;
  width: 100%;
}
</style>
