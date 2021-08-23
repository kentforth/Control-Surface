<template>
  <div class="container">
    <div class="examples">
      <div class="example-item" v-for="sketch in sketches" :key="sketch.id">
        <h2>{{ sketch.title }}</h2>
        <router-link :to="{ name: 'Sketch', params: { id: sketch.id } }">
          <img
            src="../assets/images/icons/arduino.png"
            :alt="sketch.title"
            class="image"
          />
        </router-link>
      </div>
    </div>

    <h1 v-if="!isSketchesFound">No sketches found=(</h1>

    <pulse-loader
      class="spinner"
      :loading="spinner.isLoading"
      :color="spinner.color"
      :size="spinner.size"
    />
  </div>
</template>

<script>
import firebaseApp from "../firebase/firebase";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Examples",
  components: { PulseLoader },
  data: () => ({
    isSketchesFound: true,
    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    sketches: []
  }),
  created() {
    this.getSketches();
  },
  mounted() {
    let currentRoute = this.$router.currentRoute._rawValue.params.title;
    const title = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
    window.document.title = title;
  },

  methods: {
    async getSketches() {
      this.spinner.isLoading = true;
      const category = this.$route.params.title;
      try {
        await firebaseApp
          .firestore()
          .collection("sketches")
          .where("category", "==", category)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => [
              this.sketches.push({ ...doc.data(), id: doc.id })
            ]);
            this.isSketchesFound = this.sketches.length > 0;
          });
        this.spinner.isLoading = false;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  h1 {
    color: $accent;
    text-align: center;
  }
}

.examples {
  padding: 7em 0 2em 0;
  display: grid;
  grid-gap: rem(60px);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @include responsive(tab-port) {
    padding-top: 10em;
  }

  @include responsive(phone) {
    padding-top: 4em;
    grid-gap: rem(30px);
  }
}

.example-item {
  display: grid;
  align-content: space-between;

  h2 {
    font-size: rem(30px);
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;

    @include responsive(phone) {
      font-size: rem(25px);
    }
  }
  .image {
    width: 150px;
    object-fit: contain;
    cursor: pointer;
    transition: 0.2s ease;

    @include responsive(phone) {
      width: 120px;
    }
  }

  .image:hover {
    filter: drop-shadow(1px 2px 8px #1ce0ff);
  }

  @include responsive(phone) {
    a {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
