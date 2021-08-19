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
            v-model="form.url"
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
  name: "EditVideo",
  components: { ButtonAdmin, PulseLoader },

  data: () => ({
    button: {
      title: "Update Video",
      icon: "save",
      iconType: "fas"
    },

    form: {
      title: "",
      url: ""
    },

    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    isVideoFound: false,
    hasTitleError: false,
    hasTutorialUrlError: false,
    hasErrors: true
  }),

  created() {
    this.getVideo();
  },
  methods: {
    /**
     * get video from Firebase by id
     */
    getVideo() {
      const id = this.$route.params.id;
      try {
        firebaseApp
          .firestore()
          .collection("videos")
          .doc(id.toString())
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            if (document) {
              this.form = { ...snapshot.data() };
              this.isVideoFound = true;
            } else {
              this.isVideoFound = false;
            }
          });
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
      }
    },

    validateTitle() {
      this.hasTitleError = this.form.title === "";
    },

    validateTutorialUrl() {
      this.hasTutorialUrlError = this.form.url === "";
    },

    /**
     * update video
     */
    async submit() {
      this.validateTitle();
      this.validateTutorialUrl();
      if (!this.hasTitleError && !this.hasTutorialUrlError) {
        this.spinner.isLoading = true;
        await this.updateVideo();
        Object.keys(this.form).forEach(key => {
          this.form[key] = "";
        });
        this.spinner.isLoading = false;
        await this.$router.push({ name: "VideosList" });
      }
    },

    /**
     * update video in Firebase
     */
    updateVideo() {
      const id = this.$route.params.id;
      try {
        this.spinner.isLoading = true;
        firebaseApp
          .firestore()
          .collection("videos")
          .doc(id.toString())
          .update({
            title: this.form.title,
            url: this.form.url
          })
          .then(() => {
            this.spinner.isLoading = false;
          });
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
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
