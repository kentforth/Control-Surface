<template>
  <div class="home">
    <div class="content">
      <div class="content__header">
        <h2>Get example sketches for your DIY Midi Controller</h2>
        <img src="../assets/images/icons/download.svg" class="download-icon" />
        <h2>
          Create your own DIY midi controller with library Control Surface
        </h2>
      </div>
    </div>
    <transition name="fade">
      <img
        :key="image"
        :src="require(`../assets/images/slider/${image}`)"
        alt=""
        class="image"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    let imageCounter = 1;

    return {
      imageCounter
    };
  },

  mounted() {
    setInterval(() => {
      if (this.imageCounter > 7) {
        this.imageCounter = 1;
      } else {
        this.imageCounter++;
      }
    }, 3000);
  },
  computed: {
    image() {
      return `Controller${this.imageCounter}.webp`;
    }
  }
};
</script>
<style scoped lang="scss">
.home {
  overflow: hidden;
}

.image {
  opacity: 0.3;
  position: absolute;
  z-index: -3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.content {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: -1;
  &__header {
    max-width: rem(800px);
    background-color: $dark-gray;
    border-radius: 40px;
    padding: $padding * 2;
    position: absolute;
    top: 30%;
    left: 35%;
    display: grid;
    grid-template-columns: 1fr rem(100px);
    justify-items: center;
    align-content: start;

    h2 {
      margin-top: 0;
      font-size: rem(50px);

      @include responsive(phone) {
        font-size: rem(30px);
        margin: 0;
      }

      @include responsive(phone-small) {
        font-size: rem(25px);
      }
    }

    @include responsive(tab-port) {
      left: 11%;
      top: 35%;
      max-width: rem(700px);
    }

    @include responsive(phone) {
      grid-template-columns: 1fr;
      grid-gap: rem(30px);
    }

    @include responsive(phone) {
      top: 20%;
    }

    @include responsive(phone-small) {
      top: 27%;
    }
  }

  @include responsive(tab-port) {
    width: 90%;
  }
}

.download-icon {
  max-width: 80%;

  @include responsive(phone) {
    max-width: 40%;
  }

  @include responsive(phone-small) {
    max-width: 30%;
  }
}

/*ANIMATION*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
