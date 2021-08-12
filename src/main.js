import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/app.scss";
import VueEasyLightbox from "vue-easy-lightbox";

/*FONT AWESOME ICONS*/
import { FontAwesomeIcon } from "@/plugins/font-awesome";

/*FIREBASE*/
import firebaseApp from "./firebase/firebase";

createApp(App)
  .use(router)
  .use(firebaseApp)
  .use(VueEasyLightbox)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
