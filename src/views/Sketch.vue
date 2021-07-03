<template>
  <div class="sketch">
    <h1>Sketch</h1>

    <div class="container">
      <p>{{ sketch.description }}</p>
      <div
        class="sketch__text"
        :class="sketch.videoUrl ? 'sketch__text-short' : 'sketch__text-long'"
      >
        <textarea rows="5" cols="20" class="textarea" v-model="sketch.text" />
        <div class="video" v-if="sketch.videoUrl">
          <iframe
            width="100%"
            height="280"
            :src="sketch.videoUrl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>

      <div class="sketch__images">
        <h2>Connection</h2>
        <img :src="sketch.thumbnail" alt="sketch-image" @click="showImages" />
      </div>

      <div class="sketch__button">
        <Button :text="buttonText" class="btn-download" @click="copySketch">
          <fa icon="copy" type="fas" class="icon github-icon"></fa>
        </Button>
        <transition name="fade">
          <p class="text-copied" v-if="isTextCopied">Copied!</p>
        </transition>
      </div>
    </div>

    <vue-easy-lightbox
      escDisabled
      :visible="visible"
      :imgs="sketch.images"
      :index="index"
      @hide="hideImages"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Sketch",
  components: { Button },
  data() {
    return {
      isTextCopied: false,
      visible: false,
      index: 0,
      buttonText: "Copy sketch file",
      sketch: {
        id: 1,
        text: "asdasadasda",
        description: "Send midi cc on button click",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY",
        thumbnail:
          "https://media.istockphoto.com/photos/green-leaf-with-dew-on-dark-nature-background-picture-id1050634172?k=6&m=1050634172&s=612x612&w=0&h=C6CWho9b4RDhCqvaivYOLV2LK6FzygYpAyLPBlF1i2c=",
        images: [
          "https://miro.medium.com/max/8256/1*5lpiSFo6j5dhrr6Z6RFd8Q.jpeg",
          "https://cosmosmagazine.com/wp-content/uploads/2020/02/191010_nature.jpg",
          "https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/content/images/2020/roots_of_the_landscape_protecting_people_and_roads_-_girls_walking_on_local_road_with_grey_engineering_-_emily_goodwin.jpeg?itok=YqBxNHCD"
        ]
      }
    };
  },
  methods: {
    //show easy lightbox
    showImages() {
      this.index = 0;
      this.visible = true;
    },

    // hide easy lightbox
    hideImages() {
      this.visible = false;
    },

    //copy text from textarea
    copySketch() {
      this.isTextCopied = true;

      setTimeout(() => {
        this.isTextCopied = false;
      }, 2000);
      navigator.clipboard.writeText(this.sketch.text);
    }
  }
};
</script>

<style scoped lang="scss">
.sketch {
  padding: 6em 0 2em 0;

  h1 {
    text-align: center;
    color: $white;
    font-size: rem(35px);
  }

  h2 {
    margin: 0 0 rem(20px) 0;
    font-size: rem(27px);
    text-align: center;
  }

  p {
    color: $white;
    white-space: pre-wrap;
    margin-bottom: rem(20px);
    text-align: center;
    font-size: rem(18px);
  }

  &__text {
    display: grid;

    align-items: center;
    grid-gap: rem(50px);
    justify-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;

    .textarea {
      border: 2px solid $white;
      background-color: $gray-blue;
      border-radius: $border-radius-small;
      resize: none;
      outline: none;
      font-size: rem(18px);
      padding: 5px;
      color: $white;
      height: 100%;
      width: 100%;
      font-family: "IBM Plex Sans", sans-serif;
      line-height: 22px;
    }

    .textarea::-webkit-scrollbar {
      width: 12px;
    }

    .textarea::-webkit-scrollbar-track {
      background: $gray-blue;
    }

    .textarea::-webkit-scrollbar-thumb {
      background-color: $blue-light;
      border-radius: 20px;
      border: 3px solid $gray-blue;
    }

    .video {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .video iframe {
      border-radius: $border-radius-small;
    }
  }

  &__text-short {
    grid-template-columns: 1fr 0.5fr;

    @include responsive(tab-port) {
      grid-template-columns: 1fr;
    }
  }

  &__text-long {
    grid-template-columns: 1fr;
    .textarea {
      height: 250px;
    }
  }

  &__images {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    align-items: center;
    margin-top: rem(30px);
    img {
      width: 350px;
      height: 200px;
      object-fit: contain;
      object-position: center;
      cursor: pointer;
    }
  }

  &__button {
    margin: 3em auto 0 auto;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-content: flex-start;
    position: relative;
    width: max-content;

    .text-copied {
      color: $success;
      font-size: rem(18px);
      margin: 0;
      position: absolute;
      top: 0;
      right: rem(-80px);
    }
  }

  .btn-download {
    color: $white;
    background-color: $turquoise;
  }

  @include responsive(tab-port) {
    padding: 10em 0 2em 0;
  }

  @include responsive(phone) {
    padding: 5em 0 2em 0;
  }
}

// Animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
