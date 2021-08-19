<template>
  <div class="add-sketch">
    <form class="form" @submit.prevent="submit">
      <div class="form__inputs">
        <div class="input">
          <input
            type="text"
            placeholder="Title"
            v-model="form.title"
            @input="validateTitle"
            :class="hasTitleError ? 'input-error' : ''"
          />
          <span class="error" :class="hasTitleError ? 'showError' : 'hideError'"
            >Enter title</span
          >
        </div>

        <div class="input">
          <input
            type="text"
            @input="validateTutorialUrl"
            placeholder="Video Tutorial URL"
            v-model="form.tutorialUrl"
            :class="hasTutorialUrlError ? 'input-error' : ''"
          />
          <span
            class="error"
            :class="hasTutorialUrlError ? 'showError' : 'hideError'"
            >Enter url</span
          >
        </div>
      </div>

      <pulse-loader
        class="form__spinner"
        :loading="spinner.isLoading"
        :color="spinner.color"
        :size="spinner.size"
      />

      <ButtonAdmin
        @click.prevent="submit"
        :title="button.title"
        :icon="button.icon"
        :icon-type="button.iconType"
        :button-admin-background="'btn-admin-background'"
        :button-admin-color="'btn-admin-color'"
      />
    </form>
  </div>
</template>

<script>
import ButtonAdmin from "@/components/common/ButtonAdmin";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import firebaseApp from "../../firebase/firebase";

export default {
  name: "AddVideo",
  components: { ButtonAdmin, PulseLoader },

  data: () => ({
    button: {
      title: "Save Video",
      icon: "save",
      iconType: "fas"
    },

    form: {
      title: "",
      tutorialUrl: ""
    },

    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    uploadImages: [],
    hasTitleError: false,
    hasTutorialUrlError: false,
    hasCategoryError: false,
    hasErrors: true,
    isSelectActive: false,
    category: "Choose Category",
    categoryOptions: [
      {
        id: 1,
        title: "Potentiometers"
      },
      {
        id: 2,
        title: "Buttons"
      },
      {
        id: 3,
        title: "Encoders"
      },
      {
        id: 4,
        title: "Switches"
      },
      {
        id: 5,
        title: "Leds"
      },
      {
        id: 6,
        title: "Banks"
      },
      {
        id: 7,
        title: "Displays"
      },
      {
        id: 8,
        title: "Multiplexers"
      }
    ]
  }),

  computed: {
    selectedArrow() {
      return this.isSelectActive ? "form__category-select-active" : "";
    }
  },
  created() {
    window.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.isSelectActive = false;
      }
    });
  },
  methods: {
    validateTitle() {
      this.hasTitleError = this.form.title === "";
    },

    validateTutorialUrl() {
      this.hasTutorialUrlError = this.form.tutorialUrl === "";
    },

    /**
     * save sketch in firestore
     * @returns {Promise<void>}
     */
    saveTutorialInFirebase() {
      try {
        const dataBase = firebaseApp
          .firestore()
          .collection("videos")
          .doc();
        dataBase.set({
          title: this.form.title,
          url: this.form.tutorialUrl
        });
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
      }
    },

    /**
     * save video
     */
    async submit() {
      this.validateTitle();
      this.validateTutorialUrl();
      if (!this.hasTutorialUrlError && !this.hasTitleError) {
        this.spinner.isLoading = true;
        await this.saveTutorialInFirebase();

        Object.keys(this.form).forEach(key => {
          this.form[key] = "";
        });
        this.spinner.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  width: 80%;

  h2 {
    font-size: rem(30px);
    height: max-content;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
  }

  .input input {
    border: 5px solid $white-dark;
    background-color: transparent;
    height: 60px;
    width: 100%;
    border-radius: $border-radius;
    padding: 10px;
    font-size: rem(20px);
    font-weight: 600;
    color: $gray-middle;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: $gray;
    }
  }

  &__spinner {
    position: absolute;
    top: 80%;
    left: 55%;
  }

  .btn-admin {
    width: 40%;
    margin: 3em auto 3.5em auto;
  }

  .btn-admin-background {
    background-color: $green-middle;
  }

  .btn-admin-color {
    color: $dark-purple;
  }

  ::v-deep(.btn-admin) {
    .icon {
      width: 25px;
    }
  }
}
</style>
