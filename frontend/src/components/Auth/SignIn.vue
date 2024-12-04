<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl flex">
      <!-- Left Section -->
      <div
        class="w-1/2 hidden md:flex flex-col items-center justify-center p-6 bg-cover bg-center text-black"
        style="background-image: url('https://source.unsplash.com/800x600/?city,night');"
      >
        <h1 class="text-5xl font-bold font-serif mb-4">TripMate AI</h1>
        <p class="text-center text-lg">
          Your gateway to unforgettable adventures.
        </p>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-1/2">
        <h2 class="text-3xl font-extrabold mb-4 text-center text-gray-800">Login</h2>
        <p class="text-gray-600 text-center mb-6">
          Enter your credentials to access your account.
        </p>

        <form class="space-y-4" @submit.prevent="signIn">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600">
          Don't have an account? 
          <button
            class="text-blue-600 hover:underline transition"
            @click="goToRegister"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      try {
        console.log(`http://10.0.2.10:3000/trips/plan-trip`);

        const response = await fetch(`${VUE_APP_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed");
        }

        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", this.email);
        alert("Login successful!");
        this.$router.push("/home");
      } catch (err) {
        console.error("Error:", err);
        alert(err.message || "An error occurred.");
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
