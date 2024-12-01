<template>
  <div class="min-h-screen bg-gray-100 px-10 py-6">
    <h1 class="text-3xl font-bold mb-4">{{ trip.location }}</h1>
    <p class="text-gray-700 mb-6">{{ trip.description }}</p>

    <label for="language" class="block text-lg font-bold mb-2">Select Language</label>
    <select id="language" v-model="language" class="border p-2 rounded mb-4" @change="translateTrip">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>

    <button @click="savePDF" class="bg-green-500 text-white px-4 py-2 rounded">Save PDF</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trip: {},
      language: "en",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`http://localhost:3000/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.trip = data;
      });
  },
  methods: {
    translateTrip() {
      fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: this.trip.description,
          targetLanguage: this.language,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.trip.description = data.translatedText;
        });
    },
    savePDF() {
      fetch("http://localhost:3000/trips/save-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: this.trip.id }),
      }).then(() => alert("PDF saved and emailed successfully!"));
    },
  },
};
</script>
