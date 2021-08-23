<template>
  <div class="contact container">
    <a href="mailto:kentforth@mail.ru">
      <fa icon="envelope" type="fas" class="icon" />
      kentforth@mail.ru
    </a>
    <a href="https://vk.com/id157065407" target="_blank">
      <fa icon="vk" type="fab" class="icon icon-vk" />
      vkontakte
    </a>
  </div>
</template>

<script>
export default {
  name: "Contact"
};
</script>

<style scoped lang="scss">
.contact {
  padding: 6em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  margin: 10em auto 0 auto;
  align-items: flex-start;
  width: max-content;

  a {
    display: flex;
    align-items: center;
    font-size: rem(60px);
    width: max-content;
    margin-bottom: 0.7em;

    @include responsive(phone) {
      font-size: rem(30px);
    }

    .icon {
      width: 60px;
      margin-right: 15px;

      @include responsive(phone) {
        width: rem(30px);
      }
    }
  }

  @include responsive(phone) {
    align-items: center;
  }
}
</style>
