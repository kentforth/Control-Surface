<template>
  <div class="tutorials container">
    <h1>Tutorials</h1>
    <div class="videos">
      <div class="videos__item" v-for="video in videos" :key="video.id">
        <iframe
          width="100%"
          height="250"
          :src="video.url"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <h2>{{ video.title }}</h2>
      </div>
    </div>

    <pulse-loader
      class="spinner"
      :loading="spinner.isLoading"
      :color="spinner.color"
      :size="spinner.size"
    />
  </div>
</template>

<script>
import firebaseApp from "@/firebase/firebase";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Tutorials",
  components: { PulseLoader },
  data: () => ({
    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    videos: []
  }),
  created() {
    this.getAllVideos();
  },
  methods: {
    async getAllVideos() {
      this.spinner.isLoading = true;
      try {
        await firebaseApp
          .firestore()
          .collection("videos")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let document = doc.data();
              document.id = doc.id;
              this.videos.push(document);
            });
          });
        this.spinner.isLoading = false;
      } catch (e) {
        this.spinner.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tutorials {
  padding: 6em 0 2em 0;

  h1 {
    text-align: center;
    color: $white;
    font-size: rem(35px);
  }

  .videos {
    display: grid;
    grid-gap: 3em;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

    &__item {
      h2 {
        font-size: rem(25px);
        color: $blue-light;
      }
    }
  }

  @include responsive(tab-port) {
    padding: 10em 0 2em 0;
  }

  @include responsive(phone) {
    padding: 5em 0 2em 0;
  }
}
</style>
