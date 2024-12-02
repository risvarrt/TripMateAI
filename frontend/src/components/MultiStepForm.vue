<template>
  <div class="min-h-screen bg-gray-100 px-10 py-6">
    <div class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6">Plan Your Trip</h1>
      <form @submit.prevent="currentStep === steps ? submitForm() : nextStep()">
        <!-- Step 1: Trip Information -->
        <div v-if="currentStep === 1">
          <h2 class="text-xl font-bold mb-4">Step 1: Trip Information</h2>
          <label class="block mb-2 font-bold">Trip Type</label>
          <select v-model="trip.tripType" class="border rounded p-2 mb-4 w-full">
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Couples">Couples</option>
            <option value="Oldage">Oldage</option>
          </select>

          <label class="block mb-2 font-bold">Destination</label>
          <input
            type="text"
            v-model="trip.destination"
            class="border rounded p-2 mb-4 w-full"
            placeholder="Destination"
          />

          <label class="block mb-2 font-bold">Number of People</label>
          <input
            type="number"
            v-model="trip.numberOfPeople"
            class="border rounded p-2 mb-4 w-full"
            placeholder="Group Size"
          />

          <label class="block mb-2 font-bold">Budget (CAD)</label>
          <input
            type="number"
            v-model="trip.budget"
            class="border rounded p-2 mb-4 w-full"
            placeholder="Budget"
          />
        </div>

        <!-- Step 2: Preferences -->
        <div v-if="currentStep === 2">
          <h2 class="text-xl font-bold mb-4">Step 2: Preferences</h2>
          <label class="block mb-2 font-bold">Activity Preferences</label>
          <div class="mb-4">
            <label>
              <input
                type="checkbox"
                value="Adventural"
                v-model="trip.activityPreferences"
              />
              Adventural
            </label>
            <label>
              <input
                type="checkbox"
                value="Tourism"
                v-model="trip.activityPreferences"
              />
              Tourism
            </label>
            <label>
              <input
                type="checkbox"
                value="Activities"
                v-model="trip.activityPreferences"
              />
              Activities
            </label>
            <label>
              <input
                type="checkbox"
                value="Historical"
                v-model="trip.activityPreferences"
              />
              Historical
            </label>
            <label>
              <input
                type="checkbox"
                value="Cultural"
                v-model="trip.activityPreferences"
              />
              Cultural
            </label>
            <label>
              <input
                type="checkbox"
                value="Food Trip"
                v-model="trip.activityPreferences"
              />
              Food Trip
            </label>
          </div>

          <label class="block mb-2 font-bold">Pace</label>
          <select v-model="trip.pace" class="border rounded p-2 mb-4 w-full">
            <option value="Relaxed">Relaxed</option>
            <option value="Moderate">Moderate</option>
            <option value="Fast">Fast</option>
          </select>
        </div>

        <!-- Step 3: Dates -->
        <div v-if="currentStep === 3">
          <h2 class="text-xl font-bold mb-4">Step 3: Dates</h2>
          <label class="block mb-2 font-bold">Start Date</label>
          <input
            type="date"
            v-model="trip.startDate"
            class="border rounded p-2 mb-4 w-full"
          />

          <label class="block mb-2 font-bold">End Date</label>
          <input
            type="date"
            v-model="trip.endDate"
            class="border rounded p-2 mb-4 w-full"
          />

          <label class="block mb-2 font-bold">Duration (days)</label>
          <input
            type="number"
            v-model="trip.duration"
            class="border rounded p-2 mb-4 w-full"
            placeholder="Duration"
          />
        </div>

        <!-- Step 4: Review & Submit -->
        <div v-if="currentStep === 4">
          <h2 class="text-xl font-bold mb-4">Review Your Trip</h2>
          <pre class="bg-gray-100 p-4 rounded">{{ trip }}</pre>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="prevStep"
            class="bg-gray-500 text-white px-4 py-2 rounded"
            :disabled="currentStep === 1"
          >
            Previous
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {{ currentStep === steps ? 'Generate Plan' : 'Next' }}
          </button>
        </div>
      </form>

      <!-- Display Itinerary -->
      <div v-if="itinerary">
        <h1 class="text-2xl font-bold mb-6">Your Itinerary</h1>
        <div v-html="formattedItinerary" class="bg-white shadow p-4 rounded prose"></div>
        <button
          @click="savePDF"
          class="bg-green-500 text-white px-4 py-2 rounded mt-6"
        >
          Save as PDF
        </button>
      </div>

      <!-- Display PDF URL -->
      <div v-if="pdfUrl">
        <h2 class="text-xl font-bold mt-6">Success!</h2>
        <p>Your itinerary has been saved as a PDF. You can download it using the link below:</p>
        <a :href="pdfUrl" target="_blank" class="text-blue-500 underline">Download PDF</a>
        <p class="text-green-700 mt-4">An email of the PDF has been sent to {{ trip.email }}.</p>
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
        tripType: "Family",
        activityPreferences: [],
        endDate: "",
        pace: "Relaxed",
        budget: "",
        startDate: "",
        destination: "",
        numberOfPeople: "",
        email: localStorage.getItem("email"),
        duration: "",
      },
      itinerary: "",
      tripId: null,
      pdfUrl: null,
    };
  },
  computed: {
    formattedItinerary() {
      return marked(this.itinerary || "");
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/trips/plan-trip", this.trip);
        this.itinerary = response.data.itinerary;
        this.tripId = response.data.tripId;
      } catch (err) {
        console.error("Error planning trip:", err);
      }
    },
    async savePDF() {
      try {
        const response = await axios.post("http://localhost:3000/trips/upload-itinerary-pdf", { tripId: this.tripId });
        this.pdfUrl = response.data.url;
        alert("PDF saved successfully! An email has been sent.");
      } catch (err) {
        console.error("Error saving PDF:", err);
      }
    },
  },
};
</script>

<style>
.prose {
  font-family: sans-serif;
  line-height: 1.6;
}
</style>
