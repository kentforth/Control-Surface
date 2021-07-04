<template>
  <button class="btn">
    {{ text }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
  font-size: rem(30px);
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: rem(15px) rem(30px);
  border-radius: $border-radius;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
