<template>
  <div class="min-h-screen bg-gray-100 px-10 py-8">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Plan Your Trip
      </h1>
      <form @submit.prevent="currentStep === steps ? submitForm() : validateAndNextStep()">
        <!-- Step 1: Trip Information -->
        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-bold text-gray-700 mb-6">Step 1: Trip Information</h2>
          <label class="block mb-2 font-medium text-gray-700">Trip Type</label>
          <select
            v-model="trip.tripType"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select Trip Type</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Couples">Couples</option>
            <option value="Oldage">Oldage</option>
          </select>
          <span v-if="!trip.tripType && showErrors" class="text-red-500 text-sm">Trip Type is required.</span>

          <label class="block mb-2 font-medium text-gray-700">Destination</label>
          <input
            type="text"
            v-model="trip.destination"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
            placeholder="Enter your destination"
          />
          <span v-if="!trip.destination && showErrors" class="text-red-500 text-sm">Destination is required.</span>

          <label class="block mb-2 font-medium text-gray-700">Number of People</label>
          <input
            type="number"
            v-model="trip.numberOfPeople"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
            placeholder="Group size"
          />
          <span v-if="!trip.numberOfPeople && showErrors" class="text-red-500 text-sm">Number of People is required.</span>

          <label class="block mb-2 font-medium text-gray-700">Budget (CAD)</label>
          <input
            type="number"
            v-model="trip.budget"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
            placeholder="Budget"
          />
          <span v-if="!trip.budget && showErrors" class="text-red-500 text-sm">Budget is required.</span>
        </div>

        <!-- Step 2: Preferences -->
        <div v-if="currentStep === 2">
          <h2 class="text-2xl font-bold text-gray-700 mb-6">Step 2: Preferences</h2>
          <label class="block mb-2 font-medium text-gray-700">Activity Preferences</label>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <label>
              <input
                type="checkbox"
                value="Adventural"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Adventural
            </label>
            <label>
              <input
                type="checkbox"
                value="Tourism"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Tourism
            </label>
            <label>
              <input
                type="checkbox"
                value="Activities"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Activities
            </label>
            <label>
              <input
                type="checkbox"
                value="Historical"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Historical
            </label>
            <label>
              <input
                type="checkbox"
                value="Cultural"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Cultural
            </label>
            <label>
              <input
                type="checkbox"
                value="Food Trip"
                v-model="trip.activityPreferences"
                class="mr-2"
              />
              Food Trip
            </label>
          </div>

          <label class="block mb-2 font-medium text-gray-700">Pace</label>
          <select
            v-model="trip.pace"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select Pace</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Moderate">Moderate</option>
            <option value="Fast">Fast</option>
          </select>
          <span v-if="!trip.pace && showErrors" class="text-red-500 text-sm">Pace is required.</span>
        </div>

        <!-- Step 3: Dates -->
        <div v-if="currentStep === 3">
          <h2 class="text-2xl font-bold text-gray-700 mb-6">Step 3: Dates</h2>
          <label class="block mb-2 font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            v-model="trip.startDate"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
          />
          <span v-if="!trip.startDate && showErrors" class="text-red-500 text-sm">Start Date is required.</span>

          <label class="block mb-2 font-medium text-gray-700">End Date</label>
          <input
            type="date"
            v-model="trip.endDate"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
          />
          <span v-if="!trip.endDate && showErrors" class="text-red-500 text-sm">End Date is required.</span>

          <label class="block mb-2 font-medium text-gray-700">Duration (days)</label>
          <input
            type="number"
            v-model="trip.duration"
            class="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:ring focus:ring-blue-300"
            placeholder="Duration"
          />
          <span v-if="!trip.duration && showErrors" class="text-red-500 text-sm">Duration is required.</span>
        </div>

        <!-- Step 4: Review & Submit -->
        <div v-if="currentStep === 4">
          <h2 class="text-2xl font-bold text-gray-700 mb-6">Review Your Trip</h2>
          <pre class="bg-gray-50 p-4 rounded-lg border border-gray-300">{{ trip }}</pre>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="prevStep"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            :disabled="currentStep === 1"
          >
            Previous
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {{ currentStep === steps ? 'Generate Plan' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Display Itinerary -->
      <div v-if="itinerary" class="mt-8">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Your Itinerary</h1>
        <div v-html="formattedItinerary" class="bg-gray-50 p-6 rounded-lg border border-gray-300"></div>
        <button
          @click="savePDFAndRedirect"
          class="bg-green-500 text-white px-6 py-2 rounded mt-6 hover:bg-green-600 transition"
        >
          Save as PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";

export default {
  data() {
    return {
      currentStep: 1,
      steps: 4,
      trip: {
        tripType: "",
        activityPreferences: [],
        endDate: "",
        pace: "",
        budget: "",
        startDate: "",
        destination: "",
        numberOfPeople: "",
        email: localStorage.getItem("email"),
        duration: "",
      },
      itinerary: "",
      tripId: null,
      showErrors: false, // Flag to show validation errors
    };
  },
  computed: {
    formattedItinerary() {
      const itineraryString = Array.isArray(this.itinerary)
        ? this.itinerary.join("\n")
        : this.itinerary || "";
      return marked(itineraryString);
    },
  },
  methods: {
    validateAndNextStep() {
      // Validation for each step
      if (
        (this.currentStep === 1 &&
          (!this.trip.tripType ||
            !this.trip.destination ||
            !this.trip.numberOfPeople ||
            !this.trip.budget)) ||
        (this.currentStep === 2 && !this.trip.pace) ||
        (this.currentStep === 3 &&
          (!this.trip.startDate || !this.trip.endDate || !this.trip.duration))
      ) {
        this.showErrors = true;
        return;
      }
      this.showErrors = false;
      if (this.currentStep < this.steps) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    async submitForm() {
      try {
        // After
        const response = await axios.post(`${VUE_APP_BACKEND_URL}/trips/plan-trip`, this.trip);
        this.itinerary = response.data.itinerary;
        this.tripId = response.data.tripId;
      } catch (err) {
        console.error("Error planning trip:", err);
      }
    },
    async savePDFAndRedirect() {
      try {
        await axios.post(`${VUE_APP_BACKEND_URL}/trips/upload-itinerary-pdf`, {
          tripId: this.tripId,
        });
        alert("PDF saved successfully! Redirecting to My Trips...");
        this.$router.push("/my-trips");
      } catch (err) {
        console.error("Error saving PDF:", err);
        alert("Failed to save PDF. Please try again.");
      }
    },
  },
};
</script>
