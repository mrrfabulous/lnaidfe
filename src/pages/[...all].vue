<template>
  <Layout>
    <!-- Not Found Section -->
    <div
      class="bg-gradient-to-br from-coral-50 to-indigo-50 min-h-screen flex items-center"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Error Icon -->
        <div class="mb-12">
          <div
            class="w-32 h-32 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg
              class="w-16 h-16 text-coral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Error Content -->
        <div class="mb-16">
          <h1
            class="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight"
          >
            4<span class="text-coral-500">0</span>4
          </h1>
          <h2 class="text-2xl md:text-3xl text-gray-700 mb-6 font-semibold">
            Page Not Found
          </h2>
          <p
            class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <router-link
            to="/"
            class="bg-coral-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Go Home
          </router-link>
          <button
            @click="goBack"
            class="border-2 border-coral-500 text-coral-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral-50 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "../components/Layout.vue";

const goBack = () => {
  window.history.back();
};
</script>
