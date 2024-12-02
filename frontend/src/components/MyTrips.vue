<template>
  <div class="min-h-screen bg-gray-100 px-10 py-6">
    <h1 class="text-3xl font-bold mb-6">My Trips</h1>
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="trip in trips"
        :key="trip.trip_id"
        class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
      >
        <img :src="trip.image" alt="Trip" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h2 class="text-lg font-bold">{{ trip.destination }}</h2>
        <p class="text-gray-600">Duration: {{ trip.duration }} days</p>
        <div class="mt-4">
          <button
            @click="viewTrip(trip)"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [],
      loading: true,
    };
  },
  async mounted() {
    const userEmail = localStorage.getItem("email");
    try {
      const response = await fetch(`http://localhost:3000/trips/${userEmail}`);
      const data = await response.json();

      // Fetch images for each trip using a public API (e.g., Unsplash)
      this.trips = await Promise.all(
        data.trips.map(async (trip) => {
          try {
            const imageResponse = await fetch(
              `https://api.unsplash.com/search/photos?query=${trip.destination}&client_id=QhkGaSxonCylyGif8m7kc-lXhUZ3oOq9br0j0-miZ9U`
            );
            const imageData = await imageResponse.json();
            const imageUrl = imageData.results[0]?.urls.small || "default.jpg";
            return { ...trip, image: imageUrl };
          } catch {
            return { ...trip, image: "default.jpg" }; // Fallback image
          }
        })
      );
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    viewTrip(trip) {

  localStorage.setItem("selectedTrip", JSON.stringify(trip)); // Store trip in localStorage


      this.$router.push({
        name: "tripDetails",
        params: { trip },
      });
    },
  },
};

</script>
