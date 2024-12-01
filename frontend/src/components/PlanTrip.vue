<template>
    <div class="min-h-screen bg-gray-100 px-10 py-6">
      <h1 class="text-3xl font-bold mb-6">Plan Your Trip</h1>
      <form class="space-y-4">
        <input type="text" placeholder="Trip Duration" v-model="duration" class="block w-full p-2 border rounded" />
        <input type="text" placeholder="Destination" v-model="destination" class="block w-full p-2 border rounded" />
        <input type="date" v-model="startDate" class="block w-full p-2 border rounded" />
        <input type="date" v-model="endDate" class="block w-full p-2 border rounded" />
        <textarea
          v-model="preferences"
          placeholder="Enter Activity Preferences"
          class="block w-full p-2 border rounded"
        ></textarea>
        <input type="text" placeholder="Budget" v-model="budget" class="block w-full p-2 border rounded" />
  
        <button @click.prevent="generateItinerary" class="bg-blue-500 text-white px-4 py-2 rounded">Generate Itinerary</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        duration: "",
        destination: "",
        startDate: "",
        endDate: "",
        preferences: "",
        budget: "",
      };
    },
    methods: {
      generateItinerary() {
        const tripDetails = {
          duration: this.duration,
          destination: this.destination,
          startDate: this.startDate,
          endDate: this.endDate,
          preferences: this.preferences,
          budget: this.budget,
        };
        fetch("http://localhost:3000/trips/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripDetails),
        }).then(() => alert("Itinerary generated successfully!"));
      },
    },
  };
  </script>
  