import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import App from "./App.vue";
import "./style.css";
import { useAuthStore } from "./stores/auth";

// routes with layouts
const routes = setupLayouts(generatedRoutes);

// router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// pinia store
const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

// navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  let user = authStore.user;

  if (!user) {
    user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role) authStore.user = user;
  }

  const isAuthenticated = !!user?.role;
  const role = user?.role;

  if (!isAuthenticated && !to.path.startsWith("/auth")) {
    return next("/auth/login");
  }

  // Role-based access using path prefixes
  if (to.path.startsWith("/student") && role !== "student") {
    return next("/unauthorized");
  }

  if (to.path.startsWith("/sponsor") && role !== "sponsor") {
    return next("/unauthorized");
  }

  next();
});

app.use(router);

app.mount("#app");
