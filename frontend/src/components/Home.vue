<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
      <h1 class="text-5xl font-extrabold mb-4">Welcome to TripMate AI</h1>
      <p class="text-xl font-medium">
        Your one-stop solution for planning and managing your trips with ease.
      </p>
    </div>

    <!-- Carousel Section -->
    <div class="py-10 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="text-4xl font-bold text-center mb-8 text-gray-800">
          Explore the World with TripMate AI
        </h2>

        <!-- Carousel -->
        <div class="relative w-full max-w-5xl mx-auto">
          <div id="carousel" class="carousel flex overflow-hidden rounded-lg shadow-lg">
            <div class="carousel-item flex-none w-full">
              <img
                src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Travel Inspiration"
                class="w-full h-96 object-cover"
              />
              <div class="absolute bottom-10 left-10 bg-white bg-opacity-70 p-4 rounded-lg shadow">
                <p class="text-lg font-semibold text-gray-800 italic">
                  "The world is a book, and those who do not travel read only
                  one page."
                </p>
              </div>
            </div>
            <div class="carousel-item flex-none w-full">
              <img
                src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Adventure Awaits"
                class="w-full h-96 object-cover"
              />
              <div class="absolute bottom-10 left-10 bg-white bg-opacity-70 p-4 rounded-lg shadow">
                <p class="text-lg font-semibold text-gray-800 italic">
                  "Travel is the only thing you buy that makes you richer."
                </p>
              </div>
            </div>
            <div class="carousel-item flex-none w-full">
              <img
                src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"
                alt="Memories to Last a Lifetime"
                class="w-full h-96 object-cover"
              />
              <div class="absolute bottom-10 left-10 bg-white bg-opacity-70 p-4 rounded-lg shadow">
                <p class="text-lg font-semibold text-gray-800 italic">
                  "Life is short, and the world is wide."
                </p>
              </div>
            </div>
          </div>

          <!-- Carousel Controls -->
          <div class="absolute inset-0 flex justify-between items-center pointer-events-none">
            <button
              @click="prevSlide"
              class="pointer-events-auto bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-full"
            >
              ‹
            </button>
            <button
              @click="nextSlide"
              class="pointer-events-auto bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-full"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-blue-600 text-white py-6 text-center">
      <p class="text-sm">
        © 2024 TripMate AI. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    nextSlide() {
      const slides = document.querySelectorAll(".carousel-item");
      slides[this.currentSlide].classList.add("hidden");
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      slides[this.currentSlide].classList.remove("hidden");
    },
    prevSlide() {
      const slides = document.querySelectorAll(".carousel-item");
      slides[this.currentSlide].classList.add("hidden");
      this.currentSlide =
        (this.currentSlide - 1 + slides.length) % slides.length;
      slides[this.currentSlide].classList.remove("hidden");
    },
  },
  mounted() {
    const slides = document.querySelectorAll(".carousel-item");
    slides.forEach((slide, index) => {
      if (index !== this.currentSlide) slide.classList.add("hidden");
    });
  },
};
</script>

<style>
.carousel img {
  object-fit: cover;
}
</style>
