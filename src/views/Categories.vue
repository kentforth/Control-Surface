<template>
  <div class="container">
    <div class="categories">
      <router-link
        :to="{ name: 'Examples', params: { title: category.category } }"
        class="category-item"
        v-for="category in categories"
        :key="category.id"
      >
        <div class="item-header">
          <h2>{{ category.title }}</h2>
        </div>

        <img :src="category.image" :alt="category.title" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      categoryTitle: "",
      categories: [
        {
          id: 1,
          title: "Potentiometers",
          category: "potentiometers",
          image: require("../assets/images/examples/potentiometer.webp")
        },
        {
          id: 2,
          title: "Buttons",
          category: "buttons",
          image: require("../assets/images/examples/button.webp")
        },
        {
          id: 3,
          title: "Encoders",
          category: "encoders",
          image: require("../assets/images/examples/encoder.webp")
        },
        {
          id: 4,
          title: "Switches",
          category: "switches",
          image: require("../assets/images/examples/switch.webp")
        },
        {
          id: 5,
          title: "Leds",
          category: "leds",
          image: require("../assets/images/examples/led.webp")
        },
        {
          id: 6,
          title: "Banks",
          category: "banks",
          image: require("../assets/images/examples/bank.webp")
        },
        {
          id: 7,
          title: "Displays",
          category: "displays",
          image: require("../assets/images/examples/display.webp")
        },
        {
          id: 8,
          title: "Multiplexers",
          category: "multiplexers",
          image: require("../assets/images/examples/multiplexer.webp")
        }
      ]
    };
  }
};
</script>
N
<style scoped lang="scss">
.categories {
  padding: 8em 0 2em 0;
  width: 100%;
  margin: 3em auto 0 auto;
  display: grid;
  grid-gap: rem(70px);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @include responsive(phone) {
    grid-gap: rem(30px);
    padding-top: 2em;
  }
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: $border-radius;
  cursor: pointer;
  background-color: #fff;
  transition: 0.3s ease;

  img {
    width: 100%;
    height: rem(250px);
    object-fit: contain;
    object-position: center;
  }

  h2 {
    margin: 0;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: rem(30px);
    text-align: center;
  }
}

.category-item:hover {
  transform: scale(1.1, 1.1);
}

.item-header {
  background-color: $secondary;
  padding: rem(20px);
  width: 100%;
}

a {
  transition: none;
}
</style>
