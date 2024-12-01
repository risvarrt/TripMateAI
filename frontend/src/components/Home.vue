<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <h1 class="text-4xl font-bold my-6">Welcome to TripMate AI</h1>
    <p class="text-lg text-gray-700 mb-10 text-center">
      Your one-stop solution for planning and managing your trips with ease.
    </p>

    <div class="w-full max-w-6xl">
      <div class="carousel">
        <img v-for="(image, index) in images" :key="index" :src="image" class="w-full rounded-lg mb-6" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://source.unsplash.com/800x400/?beach",
        "https://source.unsplash.com/800x400/?mountains",
        "https://source.unsplash.com/800x400/?city",
      ],
    };
  },
};
</script>

<style>
.carousel img {
  object-fit: cover;
}
</style>


<!-- <script>
export default {
  data() {
    return {
      trips: [], // Fetch this from DynamoDB or local state.
    };
  },
  mounted() {
    // Fetch trips logic here (e.g., API call or DynamoDB)
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken"); // Clear the token
      this.$router.push("/login"); // Redirect to login page
    },
  },
};
</script> -->
