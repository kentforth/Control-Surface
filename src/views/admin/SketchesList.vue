<template>
  <div class="sketches">
    <div class="sketches__buttons">
      <ButtonAdmin
        :title="'Add Sketch'"
        :icon="'video'"
        :icon-type="'fas'"
        :button-admin-background="'btn-admin-background'"
        :button-admin-color="'btn-admin-color'"
        @click="addSketch"
      />
    </div>

    <div class="sketches__table">
      <table>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Sketch Text</th>
          <th>Category</th>
          <th>Tutorial URL</th>
          <th></th>
        </tr>
        <tr v-for="sketch in sketches" :key="sketch.id">
          <td>{{ sketch.id }}</td>
          <td>{{ sketch.title }}</td>
          <td>{{ sketch.text }}</td>
          <td>{{ sketch.category }}</td>
          <td>{{ sketch.tutorialUrl }}</td>
          <td>
            <div class="sketches__table-buttons">
              <button class="btn-transparent">
                <fa icon="edit" type="fas" class="icon icon-edit" />
              </button>
              <button class="btn-transparent">
                <fa icon="trash" type="fas" class="icon icon-trash" />
              </button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ButtonAdmin from "@/components/common/ButtonAdmin";
export default {
  name: "SketchesList",
  components: { ButtonAdmin },
  data: () => ({
    sketches: [
      {
        id: 1,
        title: "SOme Title",
        text: "sketch text",
        category: "Buttons",
        tutorialUrl: "some url"
      },
      {
        id: 2,
        title: "TRwo buttons",
        text: "sketch text 2",
        category: "Potentioometers",
        tutorialUrl: "any URL"
      }
    ]
  }),
  methods: {
    addSketch() {
      this.$router.push({ name: "Add-Sketch" });
    }
  }
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

  &__table {
    margin-top: rem(20px);
    table {
      width: 100%;
      border-collapse: collapse;
      background: linear-gradient(
        90deg,
        rgba(118, 138, 163, 1) 29%,
        rgba(121, 118, 163, 1) 72%
      );
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);

      th {
        font-size: rem(20px);
        background-color: $accent;
        padding: 10px;
        color: $dark-purple;
      }

      th {
        &:nth-child(6) {
          max-width: 200px;
        }
      }

      td {
        padding: 5px 10px;
        color: $white;
      }

      tr {
        text-align: left;
      }
    }
  }

  &__table-buttons {
    .icon-edit {
      color: $accent;
    }

    .icon-trash {
      color: $orange;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
