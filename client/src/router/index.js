import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import EditView from "../views/EditView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
