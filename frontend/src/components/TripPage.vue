<template>
  <div class="min-h-screen bg-gray-100 px-10 py-6">
    <div v-if="trip">
      <h1 class="text-3xl font-bold mb-4">{{ trip.destination }}</h1>
      <p class="text-gray-700 mb-6">Trip Type: {{ trip.tripType }}</p>
      <p class="text-gray-700 mb-6">Number of People: {{ trip.numberOfPeople }}</p>
      <p class="text-gray-700 mb-6">Start Date: {{ trip.startDate }}</p>
      <p class="text-gray-700 mb-6">End Date: {{ trip.endDate }}</p>
      <p class="text-gray-700 mb-6">Budget: {{ trip.budget }}</p>

      <h2 class="text-2xl font-bold mt-8">Itinerary</h2>
      <div v-html="formattedItinerary" class="bg-white shadow p-4 rounded"></div>

      <button @click="savePDF" class="bg-green-500 text-white px-4 py-2 rounded mt-6">
        Save PDF
      </button>
    </div>
    <div v-else>
      <p>Loading trip details...</p>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  data() {
    return {
      trip: null, // Initialize trip as null
    };
  },
  computed: {
    formattedItinerary() {
      return marked(this.trip?.itinerary?.replace(/(?:\r\n|\r|\n)/g, "<br />") || "");
    },
  },
  mounted() {
    if (this.$props.trip) {
      this.trip = this.$props.trip; // Use the trip passed via props
    } else {
      const storedTrip = localStorage.getItem("selectedTrip");
      if (storedTrip) {
        this.trip = JSON.parse(storedTrip); // Use trip from localStorage if props are unavailable
      } else {
        console.error("No trip data found.");
      }
    }
  },
  methods: {
    async savePDF() {
      try {
        await fetch("http://localhost:3000/trips/save-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tripId: this.trip.trip_id }),
        });
        alert("PDF saved and emailed successfully!");
      } catch (error) {
        console.error("Error saving PDF:", error);
      }
    },
  },
};
</script>
<style>
/* Optional: Use TailwindCSS or a CSS library for better styling of markdown content */
.prose {
  font-family: sans-serif;
  line-height: 1.6;
}
</style>