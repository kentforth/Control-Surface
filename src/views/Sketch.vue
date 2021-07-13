<template>
  <div class="sketch">
    <h1>{{ sketch.title }}</h1>

    <div class="container">
      <div class="sketch__instructions">
        <p>1. Copy and paste txt sketch file to Arduino IDE</p>
        <p>2. Upload sketch to Arduino board</p>
        <p>3. Done!</p>
      </div>

      <div
        class="sketch__text"
        :class="sketch.tutorialUrl ? 'sketch__text-short' : 'sketch__text-long'"
      >
        <textarea rows="5" cols="20" class="textarea" v-model="sketch.text" />
        <div class="video" v-if="sketch.tutorialUrl">
          <iframe
            width="100%"
            height="280"
            :src="sketch.tutorialUrl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>

      <div class="sketch__images" v-if="sketch.thumbnail">
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

    <pulse-loader
      class="spinner"
      :loading="spinner.isLoading"
      :color="spinner.color"
      :size="spinner.size"
    />

    <vue-easy-lightbox
      escDisabled
      :visible="visible"
      :imgs="sketch.images"
      :index="index"
      @hide="hideImages"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";
import db from "../firebase/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Sketch",
  components: { Button, PulseLoader },
  data: () => ({
    isTextCopied: false,
    visible: false,
    index: 0,
    buttonText: "Copy sketch file",

    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    sketch: {
      id: 1,
      title: "",
      text: "",
      tutorialUrl: "",
      thumbnail: "",
      images: []
    }
  }),
  created() {
    this.getSketch();
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

    /**
     * copy text from textarea
     */
    copySketch() {
      this.isTextCopied = true;

      setTimeout(() => {
        this.isTextCopied = false;
      }, 2000);
      navigator.clipboard.writeText(this.sketch.text);
    },

    async getSketch() {
      this.spinner.isLoading = true;
      try {
        await db
          .collection("sketches")
          .doc(this.$route.params.id.toString())
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            document.id = snapshot.id;
            this.sketch = document;
            this.sketch.images = [];
            this.getImageFromFirebase();
          });
        this.spinner.isLoading = false;
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
      }
    },

    async getImageFromFirebase() {
      if (this.sketch.imagesCount) {
        for (let i = 1; i <= this.sketch.imagesCount; i++) {
          try {
            const image = await firebase
              .storage()
              .ref(`sketches/${this.sketch.id}`)
              .child(`${this.sketch.title}_${i}.webp`)
              .getDownloadURL();
            this.sketch.images.push(image);
          } catch (e) {
            throw new Error(e);
          }
        }
        this.sketch.thumbnail = this.sketch.images[0];
      }
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

  &__instructions {
    width: 30%;
    margin: 0 auto;

    p {
      text-align: left;
    }
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

  &__button ::v-deep(.btn) {
    margin: 3em auto 0 auto;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-content: flex-start;
    position: relative;
    width: max-content;

    .icon {
      margin-left: 15px;
    }
  }

  .btn-download {
    color: $white;
    background-color: $turquoise;
  }

  .text-copied {
    color: $success;
    font-size: rem(18px);
    margin: 0;
    position: absolute;
    top: 102%;
    left: 60%;
  }

  @include responsive(tab-port) {
    padding: 10em 0 2em 0;
  }

  @include responsive(phone) {
    padding: 5em 0 2em 0;
  }
}

.spinner {
  position: absolute;
  top: 55%;
  left: 50%;
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
