import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/app.scss";

/*FONT AWESOME ICONS*/
import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
