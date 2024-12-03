<template>
  <div class="min-h-screen bg-gray-100 px-10 py-10">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6">
        <div v-if="trip">
          <!-- Destination Title -->
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-extrabold text-gray-800">
              {{ trip.destination }}
            </h1>
            <p class="text-sm text-gray-600 italic">
              Budget: CAD {{ trip.budget }}
            </p>
          </div>

          <!-- Trip Details -->
          <div class="grid grid-cols-2 gap-6 mt-6">
            <div>
              <p class="text-gray-500 font-medium">Trip Type:</p>
              <p class="text-lg font-semibold text-gray-800">
                {{ trip.tripType }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 font-medium">Group Size:</p>
              <p class="text-lg font-semibold text-gray-800">
                {{ trip.numberOfPeople }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 font-medium">Start Date:</p>
              <p class="text-lg font-semibold text-gray-800">
                {{ new Date(trip.startDate).toLocaleDateString() }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 font-medium">End Date:</p>
              <p class="text-lg font-semibold text-gray-800">
                {{ new Date(trip.endDate).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <!-- Itinerary Section -->
          <div class="mt-8">
            <h2 class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
              Itinerary
            </h2>
            <div
              v-html="formattedItinerary"
              class="bg-gray-50 mt-4 p-6 rounded-lg shadow-inner prose prose-indigo"
            ></div>
          </div>

          <!-- Back Button -->
          <div class="mt-10 text-center">
            <button
              @click="goToMyTrips"
              class="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow hover:bg-indigo-700 transition"
            >
              Back to My Trips
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-700 text-lg text-center">
            Loading trip details...
          </p>
        </div>
      </div>
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
    goToMyTrips() {
      this.$router.push("/my-trips"); // Navigate back to My Trips page
    },
  },
};
</script>

<style>
/* Additional Styling */
.prose {
  font-family: sans-serif;
  line-height: 1.8;
}
</style>
