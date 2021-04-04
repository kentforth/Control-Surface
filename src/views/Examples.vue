<template>
  <div class="container">
    <div class="examples">
      <div class="example-item" v-for="sketch in sketches" :key="sketch.id">
        <h2>{{ sketch.title }}</h2>
        <img
          src="../assets/images/icons/arduino.png"
          :alt="sketch.title"
          class="image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Examples",
  data() {
    return {
      sketches: [
        {
          id: 1,
          title: "CCButton"
        },
        {
          id: 2,
          title: "NoteButtons Matrix"
        },
        {
          id: 3,
          title: "NoteButton"
        }
      ]
    };
  },
  mounted() {
    let currentRoute = this.$router.currentRoute._rawValue.params.title;
    const title = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
    window.document.title = title;
    console.log(currentRoute);
  }
};
</script>

<style scoped lang="scss">
.examples {
  padding: 7em 0 2em 0;
  display: grid;
  grid-gap: rem(60px);
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;

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
}
</style>
