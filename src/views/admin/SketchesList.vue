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
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Sketch Text</th>
            <th>Category</th>
            <th>Tutorial URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sketch in sketches" :key="sketch.id">
            <td>{{ sketch.id }}</td>
            <td>{{ sketch.title }}</td>
            <td>{{ sketch.text }}</td>
            <td>{{ sketch.category }}</td>
            <td>{{ sketch.tutorialUrl }}</td>
            <td>
              <div class="sketches__table-buttons">
                <button class="btn-transparent" @click="editSketch(sketch.id)">
                  <fa icon="edit" type="fas" class="icon icon-edit" />
                </button>
                <button class="btn-transparent">
                  <fa icon="trash" type="fas" class="icon icon-trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pulse-loader
      class="spinner"
      :loading="spinner.isLoading"
      :color="spinner.color"
      :size="spinner.size"
    />
  </div>
</template>

<script>
import ButtonAdmin from "@/components/common/ButtonAdmin";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import db from "../../firebase/firebase";

export default {
  name: "SketchesList",
  components: { ButtonAdmin, PulseLoader },
  data: () => ({
    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    sketches: []
  }),
  created() {
    this.getAllSketches();
  },
  beforeUnmount() {
    this.sketches = [];
  },
  methods: {
    addSketch() {
      this.$router.push({ name: "Add-Sketch" });
    },

    /**
     * get all sketches
     * @returns {Promise<void>}
     */
    async getAllSketches() {
      this.spinner.isLoading = true;
      try {
        await db
          .collection("sketches")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.data());
              let document = doc.data();
              document.id = doc.id;
              this.sketches.push(document);
            });
          });
        this.spinner.isLoading = false;
      } catch (e) {
        this.spinner.isLoading = false;
      }
    },

    editSketch(id) {
      this.$router.push({ name: "EditSketch", params: { id: id } });
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

      tbody {
        max-height: 500px;
        overflow-y: scroll;
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

  .spinner {
    position: absolute;
    top: 50%;
    left: 55%;
  }
}
</style>
