<template>
  <div class="sidebar">
    <router-link :to="{ name: 'SketchesList' }">
      <fa icon="file" type="fas" class="icon" />
      Sketches
    </router-link>
    <router-link :to="{ name: 'VideosList' }">
      <fa icon="video" type="fas" class="icon" />
      Videos
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TheSidebar"
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  min-height: 100vh;
  width: 250px;
  background-color: $gray-middle;
  padding: rem(30px);

  a {
    font-weight: 500;
    color: $gray;
    display: flex;
    align-items: center;
    font-size: rem(35px);
    margin-bottom: rem(25px);

    &:hover {
      color: $gray-blue;
    }

    .icon {
      margin-right: 15px;
      width: 35px;
    }

    &:nth-child(2) {
      .icon {
        width: 45px;
      }
    }
  }

  .router-link-exact-active {
    color: $accent;
  }
}
</style>
