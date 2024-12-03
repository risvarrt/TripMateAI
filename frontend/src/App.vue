<template>
  <div>
    <nav v-if="showNavbar" class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight hover:scale-105 transition-transform">
          TripMate AI
        </h1>
        <ul class="flex space-x-6 items-center text-lg">
          <li><router-link to="/home" class="hover:text-yellow-300 transition-colors duration-200">Home</router-link></li>
          <li><router-link to="/my-trips" class="hover:text-yellow-300 transition-colors duration-200">My Trips</router-link></li>
          <li><router-link to="/plan-trip" class="hover:text-yellow-300 transition-colors duration-200">Plan Trip</router-link></li>
        </ul>
        <button @click="logout" class="bg-red-500 px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition-colors duration-200">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    showNavbar() {
      return !["/login", "/register"].includes(this.$route.path);
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      this.$router.push("/login");
    },
  },
};
</script>
