import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layouts/Default";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
      layout: Default
    },
    component: () => import("../views/Home.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
