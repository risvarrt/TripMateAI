<template>
    <div class="min-h-screen bg-gray-100 px-10 py-6">
      <h1 class="text-3xl font-bold mb-6">My Trips</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="trip in trips"
          :key="trip.id"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
        >
          <img :src="trip.image" alt="Trip" class="w-full h-40 object-cover rounded-lg mb-4" />
          <h2 class="text-lg font-bold">{{ trip.location }}</h2>
          <p class="text-gray-600">Duration: {{ trip.duration }}</p>
          <div class="mt-4">
            <button @click="viewTrip(trip.id)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">View</button>
            <button class="bg-gray-500 text-white px-4 py-2 rounded">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        trips: [], // Replace with DynamoDB fetched trips
      };
    },
    mounted() {
      // Fetch trips from the backend
      fetch("http://localhost:3000/trips")
        .then((res) => res.json())
        .then((data) => {
          this.trips = data;
        });
    },
    methods: {
      viewTrip(id) {
        this.$router.push(`/trip/${id}`);
      },
    },
  };
  </script>
  