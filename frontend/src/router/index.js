import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../components/Auth/SignIn.vue";
import Register from "../components/Auth/Register.vue";
import Home from "../components/Home.vue";
import MyTrips from "../components/MyTrips.vue";
import TripPage from "../components/TripPage.vue";
import MultiStepForm from "../components/MultiStepForm.vue";

const routes = [
  { path: "/login", component: SignIn },
  { path: "/register", component: Register },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/my-trips", component: MyTrips, meta: { requiresAuth: true } },
  { 
      path: "/trip-details",
      name: "tripDetails",
      component: TripPage,
      props:(route) => ({ trip: route.state.trip || null }),
   meta: { requiresAuth: true },
   props: (route) => ({ trip: route.params.trip }) },
  { path: "/plan-trip", component: MultiStepForm, meta: { requiresAuth: true } },
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
