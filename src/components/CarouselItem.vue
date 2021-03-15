<template>
  <div
    class="carousel-item"
    :style="{
      backgroundImage:
        'url(' + require(`@/assets/images/slider/${item_data.img}`) + ')'
    }"
  ></div>
</template>

<script>
export default {
  name: "CarouselItem",
  props: {
    item_data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.carousel-item {
  width: 100%;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: green;
}
</style>
