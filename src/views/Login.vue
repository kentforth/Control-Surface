<template>
  <div class="login">
    <form @submit.prevent="submit" class="form">
      <input
        type="text"
        class="input"
        v-model="email"
        placeholder="Email"
        @input="clearEmail"
      />
      <p class="error" :class="hasEmailError ? 'showError' : 'hideError'">
        Email is not correct
      </p>
      <input
        type="password"
        class="input"
        v-model="password"
        placeholder="Password"
        autocomplete="off"
        @input="clearPassword"
      />
      <p class="error" :class="hasPasswordError ? 'showError' : 'hideError'">
        Password is not correct
      </p>
      <button class="btn-login">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    hasEmailError: false,
    hasPasswordError: false
  }),
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.hasEmailError = false;
          this.hasPasswordError = false;
        })
        .catch(error => {
          if (error.code === "auth/invalid-email") {
            this.hasEmailError = true;
          }
          if (error.code === "auth/wrong-password") {
            this.hasPasswordError = true;
          }
        });
    },

    clearEmail() {
      this.hasEmailError = false;
    },
    clearPassword() {
      this.hasPasswordError = false;
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  width: 30%;
  margin: 10em auto 0 auto;

  .input {
    width: 100%;
    background-color: $white;
    border-radius: $border-radius-small;
    outline: none;
    border: none;
    font-size: rem(30px);
    padding: 10px;
    font-weight: 600;
    color: $dark-purple;

    &::placeholder {
      color: $blue-light;
    }
  }

  .error {
    margin-bottom: 1.5em;
    margin-top: 0;
  }

  .btn-login {
    width: 100%;
    font-size: 30px;
    padding: 10px;
    outline: none;
    border: none;
    background: linear-gradient(180deg, #7c87bf 26.88%, #535a80 100%);
    border-radius: $border-radius-small;
    color: $white;
    font-weight: 600;
    cursor: pointer;

    &:active {
      background: linear-gradient(180deg, #535a80 26.88%, #7c87bf 100%);
    }
  }
}
</style>
