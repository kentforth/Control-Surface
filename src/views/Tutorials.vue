<template>
  <div class="tutorials container">
    <h1>Tutorials</h1>
    <div class="videos">
      <div class="videos__item" v-for="video in videos" :key="video.id">
        <iframe
          width="100%"
          height="250"
          :src="video.videoUrl"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <h2>{{ video.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tutorials",
  data: () => ({
    videos: [
      {
        id: 1,
        title: "Ola Englund",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY"
      },
      {
        id: 2,
        title: "Ola Englund",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY"
      },
      {
        id: 3,
        title: "Ola Englund",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY"
      },
      {
        id: 4,
        title: "Ola Englund",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY"
      },
      {
        id: 5,
        title: "Ola Englund",
        videoUrl: "https://www.youtube.com/embed/hlWiI4xVXKY"
      }
    ]
  })
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

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
