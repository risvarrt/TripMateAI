<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl flex">
      <!-- Left Section -->
      <div
        class="w-1/2 hidden md:flex flex-col items-center justify-center p-6 bg-cover bg-center text-black"
        style="background-image: url('https://source.unsplash.com/800x600/?travel');"
      >
        <h1 class="text-5xl font-bold font-serif mb-4">TripMate AI</h1>
        <p class="text-center text-lg">
          Embark on your journey with ease and simplicity.
        </p>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-1/2">
        <h2 class="text-3xl font-extrabold mb-4 text-center text-gray-800">Register</h2>
        <p class="text-gray-600 text-center mb-6">
          Create your account. It’s free and only takes a minute.
        </p>

        <form class="space-y-4" @submit.prevent="register">
          <div class="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              v-model="firstName"
              class="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              v-model="lastName"
              class="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
            required
          />

          <button
            type="submit"
            class="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Register Now
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600">
          Already have an account? 
          <button
            class="text-blue-600 hover:underline transition"
            @click="goToLogin"
          >
            Login here
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      console.log("Requesting to:", `${process.env.VUE_APP_BACKEND_URL}/auth/register`);

      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Registration failed");
        }

        alert("Registration successful!");
        this.$router.push("/login");
      } catch (err) {
        console.error("Error during registration:", err);
        alert(err.message || "An error occurred.");
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
