import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/HomePage"),
    meta: {
      title: "Home Page",
    },
  },
  {
    name: "about",
    path: "/about",
    component: () => import("@/views/AboutPage"),
    meta: {
      title: "about Page",
    },
  },
  {
    name: "screens",
    path: "/screens",
    component: () => import("@/views/ScreenPages"),
    meta: {
      title: "screens",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
