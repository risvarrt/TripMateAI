<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl flex">
      <!-- Left Section -->
      <div class="w-1/2 hidden md:flex flex-col items-center justify-center p-6 bg-cover bg-center"
        style="background-image: url('https://source.unsplash.com/800x600/?nature,sky');">
        <h1 class="text-4xl font-bold text-white">Welcome Back</h1>
        <p class="mt-4 text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          suspendisse aliquam varius rutrum purus malesuada ac.
        </p>
        <a href="#" class="mt-4 text-blue-200 underline">Learn more</a>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <p class="text-gray-600 text-center mb-6">
          Enter your credentials to access your account.
        </p>

        <form class="space-y-4" @submit.prevent="signIn">
          <input type="email" placeholder="Email" v-model="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none" />
          <input type="password" placeholder="Password" v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none" />

          <button type="submit"
            class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition">
            Login
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600">
          Don't have an account? 
          <button
            class="text-blue-600 hover:underline transition"
            @click="goToRegister"
          >
            Register
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
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed");
        }

        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken); // Save token to localStorage
        alert("Login successful!");
        this.$router.push("/home"); // Redirect to home page
      } catch (err) {
        console.error(err);
        alert(err.message || "An error occurred while logging in.");
      }
    },
    goToRegister() {
      this.$router.push("/register"); // Navigate to register page
    },
  },
};

</script>
