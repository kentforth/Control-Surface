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
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {
      title: "Categories",
      layout: Default
    },
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/categories/:title",
    name: "Examples",
    meta: {
      title: "Examples",
      layout: Default
    },
    component: () => import("../views/Examples.vue")
  },
  {
    path: "/categories/:title/:id",
    name: "Sketch",
    meta: {
      title: "Sketch",
      layout: Default
    },
    component: () => import("../views/Sketch")
  },
  {
    path: "/tutorials",
    name: "Tutorials",
    meta: {
      title: "Video Tutorials",
      layout: Default
    },
    component: () => import("../views/Tutorials")
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
