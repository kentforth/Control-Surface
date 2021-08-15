<template>
  <button class="btn-admin" :class="[buttonAdminBackground, buttonAdminColor]">
    <span>{{ title }}</span>
    <fa :icon="icon" :type="iconType" class="icon" />
  </button>
</template>

<script>
export default {
  name: "ButtonAdmin",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    iconType: {
      type: String,
      default: ""
    },
    buttonAdminBackground: {
      type: String,
      default: ""
    },
    buttonAdminColor: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.btn-admin {
  height: 50px;
  border-radius: $border-radius-small;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: rem(25px);
  cursor: pointer;
  outline: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }

  .icon {
    margin-left: 10px;
    width: 17px;
  }
}
</style>
