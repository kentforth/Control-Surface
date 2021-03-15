<template>
  <div class="navigation">
    <nav class="nav">
      <div class="container">
        <div class="logo">
          <router-link :to="{ name: 'Home' }">
            <img src="../assets/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div class="links">
          <a href="https://github.com/tttapa/Control-Surface" target="_blank">
            <span>Get Library</span>
            <fa icon="github-alt" type="fab" class="icon github-icon"></fa>
          </a>
          <router-link :to="{ name: 'Home' }">
            <span>Sketch Examples</span>
          </router-link>
          <router-link :to="{ name: 'Home' }">
            <span>Video Tutorials</span>
          </router-link>
          <router-link :to="{ name: 'Home' }">
            <span>Contact</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped lang="scss">
.navigation {
  z-index: 999;
}
.container {
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  padding: rem(20px) 0;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $dark-purple;
  box-shadow: 0 4px 5px 0 hsla(0, 0%, 0%, 0.14),
    0 1px 10px 0 hsla(0, 0%, 0%, 0.12), 0 2px 4px -1px hsla(0, 0%, 0%, 0.2);
}

.logo img {
  max-width: 400px;
}

.links {
  display: flex;
  justify-items: flex-end;
  justify-content: flex-end;
  align-items: center;

  a:nth-child(1) {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }

  a {
    margin-left: rem(40px);
    text-shadow: 3px 2px 2px #140905;
    letter-spacing: 1px;
  }
}

.github-icon {
  filter: drop-shadow(2px 1px 1px #140905);
}
</style>
