import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layouts/Default";
import Admin from "@/layouts/Admin";

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
  },
  {
    path: "/contact",
    name: "Contact",
    meta: {
      title: "Contact",
      layout: Default
    },
    component: () => import("../views/Contact")
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/sketches"
  },

  // ADMIN
  {
    path: "/admin/sketches",
    name: "Admin-Sketches",
    meta: {
      title: "Admin/Sketches",
      layout: Admin
    },
    component: () => import("../views/admin/SketchesList")
  },
  {
    path: "/admin/sketches-add",
    name: "Add-Sketch",
    meta: {
      title: "Add Sketch",
      layout: Admin
    },
    component: () => import("../views/admin/AddSketch")
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
