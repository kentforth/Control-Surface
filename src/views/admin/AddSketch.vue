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
            placeholder="Video Tutorial URL"
            v-model="form.tutorialUrl"
          />
        </div>

        <div class="form__image-uploader">
          <label for="file-input">
            <img src="../../assets/images/admin/image-upload.svg" />
          </label>

          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            @change="getImages($event.target.name, $event.target.files)"
          />
          <div class="form__upload-images">
            <span v-for="image in uploadImages" :key="image.name">{{
              image.name
            }}</span>
          </div>
        </div>
      </div>
      <h2>Sketch Text</h2>
      <div class="input">
        <textarea
          name=""
          id=""
          cols="20"
          rows="30"
          class="textarea"
          v-model="form.text"
          @input="validateText"
          :class="hasTextError ? 'input-error' : ''"
        />
        <span class="error" :class="hasTextError ? 'showError' : 'hideError'"
          >Enter text</span
        >
      </div>

      <div class="form__category">
        <div
          class="form__category-select"
          @click="isSelectActive = !isSelectActive"
        >
          <p>{{ category }}</p>
          <div :class="selectedArrow"></div>
        </div>
        <span
          class="error"
          :class="hasCategoryError ? 'showError' : 'hideError'"
          >Choose category</span
        >
        <div class="form__category-options" v-if="isSelectActive">
          <div
            class="form__category-options-item"
            v-for="category in categoryOptions"
            :key="category.id"
            @click="getCategory(category.title)"
          >
            {{ category.title }}
          </div>
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
        :title="buttonSave.title"
        :icon="buttonSave.icon"
        :icon-type="buttonSave.iconType"
        :button-admin-background="'btn-admin-background'"
        :button-admin-color="'btn-admin-color'"
      />
    </form>
  </div>
</template>

<script>
import ButtonAdmin from "@/components/common/ButtonAdmin";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../../firebase/firebase";

export default {
  name: "AddSketch",
  components: { ButtonAdmin, PulseLoader },

  data: () => ({
    buttonSave: {
      title: "Save Sketch",
      icon: "save",
      iconType: "fas"
    },

    form: {
      title: "",
      text: "",
      tutorialUrl: "",
      category: ""
    },

    spinner: {
      isLoading: false,
      color: "#D9D57C",
      size: "20px"
    },

    uploadImages: [],
    hasTitleError: false,
    hasTextError: false,
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
    getCategory(category) {
      this.category = category;
      this.form.category = category;
      this.hasCategoryError = false;
      this.isSelectActive = false;
    },

    validateTitle() {
      this.hasTitleError = this.form.title === "";
    },

    validateText() {
      this.hasTextError = this.form.text === "";
    },

    validateCategory() {
      this.hasCategoryError = this.form.category === "";
    },

    /**
     * get images from upload button
     */
    getImages(event, files) {
      this.uploadImages = files;
    },

    /**
     * save sketch in firestore
     * @returns {Promise<void>}
     */
    saveSketchInFirebase() {
      try {
        const dataBase = db.collection("sketches").doc();
        dataBase.set({
          title: this.form.title,
          text: this.form.text,
          tutorialUrl: this.form.tutorialUrl,
          category: this.form.category,
          imagesCount: this.uploadImages.length
        });
        return dataBase;
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
      }
    },

    uploadImagesToFirebase(id) {
      try {
        this.uploadImages.forEach(el => {
          firebase
            .storage()
            .ref(`sketches/${id}/${el.name}`)
            .put(el);
        });
      } catch (e) {
        this.spinner.isLoading = false;
        throw new Error(e);
      }
    },

    /**
     * save sketch
     */
    async submit() {
      this.validateTitle();
      this.validateText();
      this.validateCategory();
      if (!this.hasTextError && !this.hasTitleError && !this.hasCategoryError) {
        this.spinner.isLoading = true;
        this.form.category = this.form.category.toLowerCase();
        const { id } = await this.saveSketchInFirebase();
        if (this.uploadImages.length) {
          this.uploadImagesToFirebase(id);
        }
        Object.keys(this.form).forEach(key => {
          this.form[key] = "";
        });
        this.category = "Choose Category";
        this.uploadImages = [];
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
  }

  .input input,
  textarea {
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

  .textarea {
    height: 170px;
    width: 67%;
  }

  &__inputs {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    justify-items: center;

    .input {
      width: 100%;

      &:nth-child(2) {
        grid-row: 2;
      }
    }
  }

  &__image-uploader {
    input {
      display: none;
    }

    img {
      cursor: pointer;
      width: 150px;
      transform: translateY(30px);
    }
  }

  &__upload-images {
    transform: translateY(30px);
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    position: fixed;
    top: 30%;
    left: 74.5%;

    span {
      font-size: rem(20px);
      color: $dark-purple;
    }
  }

  &__category {
    position: relative;
  }

  &__category-select {
    background-color: $gray-middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $white;
    width: 67%;
    padding: 15px;
    border-radius: $border-radius;
    margin-top: rem(30px);
    cursor: pointer;
    p {
      font-size: rem(30px);
      margin: 0;
    }

    div {
      transition: all 0.2s ease;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 15px solid $white;
    }
  }

  &__category-select-active {
    transform: rotateX(-180deg);

    transform-origin: center;
  }

  &__category-options {
    background-color: $gray-middle;
    margin-top: rem(10px);
    width: 67%;
    border-radius: $border-radius;
    overflow: hidden;
    position: absolute;
    top: 100px;
    z-index: 9999;
    left: 0;
  }

  &__category-options-item {
    background-color: $gray-middle;
    color: $white;
    cursor: pointer;
    padding: 15px;

    &:hover {
      background-color: $dark;
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
}
</style>
