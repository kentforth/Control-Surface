<template>
  <div class="navigation">
    <nav class="nav">
      <button class="hamburger-button" @click="toggleNav">
        <span
          class="hamburger-item"
          :class="{
            'hamburger-active': navigation === 'open'
          }"
        ></span>
        <span
          class="hamburger-item"
          :class="{
            'hamburger-active': navigation === 'open'
          }"
        ></span>
        <span
          class="hamburger-item"
          :class="{
            'hamburger-active': navigation === 'open'
          }"
        ></span>
      </button>
      <div
        class="container"
        :class="{
          'nav-active': navigation === 'open'
        }"
      >
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
  name: "Navigation",
  data() {
    return {
      navigation: "default"
    };
  },
  methods: {
    toggleNav() {
      if (this.navigation === "open") {
        this.navigation = "closed";
      } else {
        this.navigation = "open";
      }
      console.log(this.navigation);
    }
  }
};
</script>

<style scoped lang="scss">
.navigation {
  z-index: 1000;
}
.container {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: max-content;
  padding: rem(20px) 0;
  transition: 0.3s ease;

  @include responsive(tab-land) {
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: rem(15px);
  }

  @include responsive(phone) {
    height: rem(60px);
    overflow: hidden;
  }
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

.logo {
  width: 100%;

  img {
    max-width: 400px;

    @include responsive(tab-land) {
      max-width: 270px;
    }

    @include responsive(phone-small) {
      max-width: 240px;
    }
  }

  a {
    height: 100%;
    display: flex;
  }
}

.links {
  display: flex;
  justify-items: flex-end;
  justify-content: flex-end;
  align-items: center;
  background-color: $dark-purple;

  a {
    margin-left: rem(40px);
    text-shadow: 3px 2px 2px #140905;
    letter-spacing: 1px;
  }

  a:nth-child(1) {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }

  @include responsive(phone) {
    display: grid;
    justify-items: center;
    grid-gap: rem(10px);
  }
}

.github-icon {
  filter: drop-shadow(2px 1px 1px #140905);

  @include responsive(tab-port) {
    width: 40px;
    height: 40px;
  }

  @include responsive(phone) {
    width: 25px;
    height: 25px;
  }
}

.hamburger-button {
  width: 50px;
  height: 60px;
  margin: 0;
  position: absolute;
  top: -10px;
  right: 10px;
  background-color: transparent;
  outline: none;
  border: none;

  .hamburger-item {
    width: 100%;
    height: 4px;
    display: block;
    position: relative;
    border-radius: 9px;
    left: 0;
    opacity: 1;
    transition: $transition;
    transform: rotate(0deg);
    background-color: $white;
  }

  .hamburger-item:nth-child(1) {
    transform-origin: top left;
    top: 0;
  }

  .hamburger-item:nth-child(2) {
    top: 8px;
  }

  .hamburger-item:nth-child(3) {
    transform-origin: bottom left;

    top: 17px;
  }
}

.hamburger-active:nth-child(1) {
  transform: rotate(45deg);
}

.hamburger-active:nth-child(2) {
  opacity: 0;
}

.hamburger-active:nth-child(3) {
  transform: rotate(-45deg);
}

.nav-active {
  height: 60vh;
}
</style>
