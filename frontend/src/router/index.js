import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../components/Auth/SignIn.vue";
import Register from "../components/Auth/Register.vue";
import Home from "../components/Home.vue";
import MyTrips from "../components/MyTrips.vue";
import TripPage from "../components/TripPage.vue";
import MultiStepForm from "../components/MultiStepForm.vue";

const routes = [
  {
    path: "/",
    redirect: (to) => {
      const isLoggedIn = localStorage.getItem("accessToken") !== null;
      return isLoggedIn ? "/home" : "/login";
    },
  },
  { path: "/login", component: SignIn },
  { path: "/register", component: Register },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/my-trips", component: MyTrips, meta: { requiresAuth: true } },
  {
    path: "/trip-details",
    name: "tripDetails",
    component: TripPage,
    props: (route) => ({ trip: route.params.trip }),
    meta: { requiresAuth: true },
  },
  { path: "/plan-trip", component: MultiStepForm, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to handle protected routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
