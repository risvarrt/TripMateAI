<template>
  <div>
    <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">TripMate AI</h1>
      <ul class="flex space-x-4">
        <li><router-link to="/home" class="hover:underline">Home</router-link></li>
        <li><router-link to="/my-trips" class="hover:underline">My Trips</router-link></li>
        <li><router-link to="/plan-trip" class="hover:underline">Plan New Trip</router-link></li>
        <li><button @click="logout" class="bg-red-500 px-4 py-2 rounded hover:bg-red-700">Logout</button></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      this.$router.push("/login");
    },
  },
};
</script>
