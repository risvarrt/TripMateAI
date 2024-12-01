<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl flex">
      <!-- Left Section -->
      <div class="w-1/2 hidden md:flex flex-col items-center justify-center p-6 bg-cover bg-center"
        style="background-image: url('https://source.unsplash.com/800x600/?mountains,night');">
        <h1 class="text-4xl font-bold text-white">Welcome</h1>
        <p class="mt-4 text-black text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          suspendisse aliquam varius rutrum purus malesuada ac.
        </p>
        <a href="#" class="mt-4 text-blue-200 underline">Learn more</a>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
        <p class="text-gray-600 text-center mb-6">
          Create your account. It’s free and only takes a minute.
        </p>

        <form class="space-y-4" @submit.prevent="register">
          <div class="flex space-x-4">
            <input 
              type="text" 
              placeholder="First Name" 
              v-model="firstName"
              class="w-1/2 px-4 py-2 border rounded-lg focus:outline-none" 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              v-model="lastName"
              class="w-1/2 px-4 py-2 border rounded-lg focus:outline-none" 
            />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none" 
          />
          <input 
            type="password" 
            placeholder="Confirm Password"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none" 
          />

          <button 
            type="submit"
            class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-xl font-bold mb-4 text-center">Confirm Your Email</h2>
        <p class="text-gray-600 text-center mb-4">
          Enter the confirmation code sent to <strong>{{ email }}</strong>.
        </p>

        <form @submit.prevent="confirmAccount">
          <input 
            type="text" 
            v-model="confirmationCode" 
            placeholder="Confirmation Code" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none mb-4" 
          />
          <button 
            type="submit"
            class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Confirm
          </button>
        </form>

        <p class="mt-4 text-sm text-center text-gray-600">
          Didn't receive the code? 
          <button 
            @click="resendCode"
            class="text-blue-600 hover:underline transition"
          >
            Resend
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
      confirmationCode: "",
      showModal: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

        alert("Registration successful! Please enter the confirmation code sent to your email.");
        this.showModal = true; // Show the modal
      } catch (err) {
        console.error("Error during registration:", err);
        alert(err.message || "An error occurred while registering.");
      }
    },
    async confirmAccount() {
      try {
        const response = await fetch("http://localhost:3000/auth/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email.trim(),
            code: this.confirmationCode.trim(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Confirmation failed");
        }

        alert("Account confirmed successfully! You can now log in.");
        this.showModal = false; // Close the modal
        this.$router.push("/login");
      } catch (err) {
        console.error("Error during confirmation:", err);
        alert(err.message || "An error occurred while confirming the account.");
      }
    },
    async resendCode() {
      try {
        const response = await fetch("http://localhost:3000/auth/resend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email.trim(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Resend failed");
        }

        alert("Confirmation code resent successfully. Check your email.");
      } catch (err) {
        console.error("Error during code resend:", err);
        alert(err.message || "An error occurred while resending the code.");
      }
    },
  },
};
</script>
