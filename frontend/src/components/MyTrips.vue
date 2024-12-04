<template>
  <div class="min-h-screen bg-gray-100 px-10 py-6">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-800">My Trips</h1>

    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Trip Card -->
      <div
        v-for="trip in trips"
        :key="trip.trip_id"
        class="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="trip.image"
          alt="Trip"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-800">{{ trip.destination }}</h2>
          <p class="text-sm text-gray-600 mt-2">
            Duration: <span class="font-medium">{{ trip.duration }} days</span>
          </p>
          <div class="flex justify-between items-center mt-4">
            <button
              @click="viewTrip(trip)"
              class="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              View Details
            </button>
            <span class="text-gray-500 text-sm italic">
              {{ trip.startDate }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-center text-lg text-gray-600">Loading your trips...</p>
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
      const response = await fetch(`${VUE_APP_BACKEND_URL}/trips/${userEmail}`);
      
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
