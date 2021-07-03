<template>
  <div class="sketches">
    <div class="sketches__buttons">
      <ButtonAdmin
        :title="'Add Sketch'"
        :icon="'video'"
        :icon-type="'fas'"
        :button-admin-background="'btn-admin-background'"
        :button-admin-color="'btn-admin-color'"
      />
    </div>
  </div>
</template>

<script>
import ButtonAdmin from "@/components/common/ButtonAdmin";
export default {
  name: "Sketches",
  components: { ButtonAdmin }
};
</script>

<style scoped lang="scss">
.sketches {
  display: grid;
  grid-template-columns: 1fr;

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    text-align: center;
  }

  .btn-admin-background {
    background-color: $green-middle;
  }

  .btn-admin-color {
    color: $dark-purple;
  }
}
</style>
