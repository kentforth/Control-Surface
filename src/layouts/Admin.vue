<template>
  <div class="admin">
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
import firebaseApp from ".././firebase/firebase";

export default {
  name: "Admin",
  components: { TheSidebar, Navigation },
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace({ name: "Login" });
      } else if (this.$route.path === "/login") {
        this.$router.replace({ name: "Admin" });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.page {
  margin-top: rem(75px);
  display: flex;
}

.main {
  margin-left: 250px;
  background-color: $gray-deep;
  padding: 3em;
  width: 100%;
  min-height: 92vh;
}
</style>
