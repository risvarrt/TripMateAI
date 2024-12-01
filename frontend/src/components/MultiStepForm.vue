
<template>
  <div>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="trip.location" placeholder="Location" />
      <input type="number" v-model="trip.days" placeholder="Number of Days" />
      <select v-model="trip.type">
        <option value="adventure">Adventure</option>
        <option value="hiking">Hiking</option>
        <option value="relaxed">Relaxed</option>
      </select>
      <input type="number" v-model="trip.groupSize" placeholder="Group Size" />
      <input type="email" v-model="trip.email" placeholder="Email (optional)" />
      <button type="submit">Generate Plan</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trip: {
        location: "",
        days: "",
        type: "",
        groupSize: "",
        email: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("/generate-itinerary", this.trip);
        this.$router.push({ name: "TripPage", params: { data: response.data } });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
