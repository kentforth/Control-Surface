import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/app.scss";
import VueEasyLightbox from "vue-easy-lightbox";

/*FONT AWESOME ICONS*/
import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
  .use(router)
  .use(VueEasyLightbox)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
