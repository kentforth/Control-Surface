import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layouts/Default";
import Blank from "@/layouts/Blank";
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
    path: "/downloads",
    name: "Downloads",
    meta: {
      title: "Downloads",
      layout: Default
    },
    component: () => import("../views/Downloads")
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
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
      layout: Blank
    },
    component: () => import("../views/Login")
  },

  // ADMIN
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/sketches"
  },
  {
    path: "/admin/sketches",
    name: "SketchesList",
    meta: {
      title: "Admin/Sketches",
      layout: Admin
    },
    component: () => import("../views/admin/SketchesList")
  },
  {
    path: "/admin/videos",
    name: "VideosList",
    meta: {
      title: "Admin/Videos",
      layout: Admin
    },
    component: () => import("../views/admin/VideosList")
  },
  {
    path: "/admin/sketches-add",
    name: "Add-Sketch",
    meta: {
      title: "Add Sketch",
      layout: Admin
    },
    component: () => import("../views/admin/AddSketch")
  },
  {
    path: "/admin/video-add",
    name: "Add-Video",
    meta: {
      title: "Add Video",
      layout: Admin
    },
    component: () => import("../views/admin/AddVideo")
  },
  {
    path: "/admin/sketches/edit/:id",
    name: "EditSketch",
    meta: {
      title: "Edit",
      layout: Admin
    },
    component: () => import("../views/admin/EditSketch")
  },
  {
    path: "/admin/videos/edit/:id",
    name: "EditVideo",
    meta: {
      title: "Edit",
      layout: Admin
    },
    component: () => import("../views/admin/EditVideo")
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
