import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../components/Auth/SignIn.vue";
import Register from "../components/Auth/Register.vue";
import Home from "../components/Home.vue";
import MyTrips from "../components/MyTrips.vue";
import TripPage from "../components/TripPage.vue";
import PlanTrip from "../components/PlanTrip.vue";

const routes = [
  { path: "/login", component: SignIn },
  { path: "/register", component: Register },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/my-trips", component: MyTrips, meta: { requiresAuth: true } },
  { path: "/trip/:id", component: TripPage, meta: { requiresAuth: true } },
  { path: "/plan-trip", component: PlanTrip, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to protect authenticated routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = () => localStorage.getItem("accessToken") !== null;
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
