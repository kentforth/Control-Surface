<template>
  <div class="wrapper">
    <div
      class="carousel"
      :style="{ 'margin-left': '-' + 100 * currentSlideIndex + '%' }"
    >
      <CarouselItem
        v-for="item in carousel_data"
        :key="item.id"
        :item_data="item"
      />
    </div>
    <button @cliCck="prevSlide">Prev</button>
    <button @click="nextSlide">Next</button>
  </div>
</template>

<script>
import CarouselItem from "@/components/CarouselItem";

export default {
  name: "Carousel",
  components: { CarouselItem },
  data() {
    return {
      currentSlideIndex: 0
    };
  },
  props: {
    carousel_data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
        console.log(this.currentSlideIndex);
      }
    },
    nextSlide() {
      this.currentSlideIndex++;
      console.log(this.currentSlideIndex);
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 100%;
  overflow: hidden;
  margin: 0 auto;
}

.carousel {
  display: flex;
}
</style>
