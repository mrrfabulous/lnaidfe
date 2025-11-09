<template>
  <Sidebar
    page-title="Student Dashboard"
    page-subtitle="Welcome back! Here's what's happening with your education funding."
    :navigation-items="studentNavigationItems"
  >
  
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Appeals</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ studentStats.activeAppeals ?? 0 }}
            </p>
          </div>
          <div class="p-3 bg-blue-100 rounded-xl">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Raised</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              ₦{{ (studentStats.totalRaised ?? 0).toLocaleString() }}
            </p>
          </div>
          <div class="p-3 bg-green-100 rounded-xl">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Applications</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ studentStats.applications }}
            </p>
          </div>
          <div class="p-3 bg-purple-100 rounded-xl">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Available Offers</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ studentStats.availableOffers ?? 0 }}
            </p>
          </div>
          <div class="p-3 bg-coral-100 rounded-xl">
            <svg
              class="w-6 h-6 text-coral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <router-link
        to="/student/appeals/create"
        class="bg-primary rounded-2xl p-8 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="flex items-center">
          <div class="p-3 bg-white/20 rounded-xl mr-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold">Create Appeal</h3>
            <p class="text-blue-100 mt-1">Request funding for your needs</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/student/offers"
        class="bg-secondary rounded-2xl p-8 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="flex items-center">
          <div class="p-3 bg-white/20 rounded-xl mr-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold">Browse Offers</h3>
            <p class="text-green-100 mt-1">Find matching opportunities</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/student/scholarships/apply"
        class="bg-purple-700 to-purple-600 rounded-2xl p-8 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="flex items-center">
          <div class="p-3 bg-white/20 rounded-xl mr-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold">Scholarships</h3>
            <p class="text-purple-200 mt-1">Apply for full scholarships</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Your Appeals -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Your Appeals</h2>
            <router-link
              to="/student/appeals"
              class="text-coral-500 hover:text-coral-600 font-medium"
            >
              Create New
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div v-if="userAppeals.length === 0" class="text-center py-12">
            <div
              class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <p class="text-gray-500 mb-4">No appeals yet</p>
            <router-link
              to="/student/appeals/create"
              class="text-coral-500 hover:text-coral-600 font-medium"
            >
              Create your first appeal
            </router-link>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="appeal in userAppeals.slice(0, 3)"
              :key="appeal.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-gray-900">{{ appeal.title }}</h3>
                <span
                  :class="[
                    'text-xs px-3 py-1 rounded-full font-medium',
                    appeal.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700',
                  ]"
                >
                  {{ appeal.status }}
                </span>
              </div>
              <p class="text-gray-600 text-sm mb-4">
                {{ appeal.description.substring(0, 100) }}...
              </p>
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-500"
                  >₦{{ appeal.raisedAmount.toLocaleString() }} of ₦{{
                    appeal.targetAmount.toLocaleString()
                  }}</span
                >
                <span class="text-sm font-medium text-coral-600"
                  >{{
                    Math.round(
                      (appeal.raisedAmount / appeal.targetAmount) * 100
                    )
                  }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                  :style="{
                    width:
                      Math.min(
                        (appeal.raisedAmount / appeal.targetAmount) * 100,
                        100
                      ) + '%',
                  }"
                ></div>
              </div>
              <router-link
                :to="`/appeals/${appeal.id}`"
                class="text-coral-500 hover:text-coral-600 font-medium text-sm"
              >
                View Details →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Available Offers -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Available Offers</h2>
            <router-link
              to="/student/offers"
              class="text-coral-500 hover:text-coral-600 font-medium"
            >
              View All
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div v-if="matchingOffers.length === 0" class="text-center py-12">
            <div
              class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <p class="text-gray-500 mb-2">No matching offers found</p>
            <p class="text-gray-400 text-sm">
              Complete your profile to see more offers
            </p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="offer in matchingOffers.slice(0, 3)"
              :key="offer.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-gray-900">{{ offer.title }}</h3>
                <span
                  class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                  >New</span
                >
              </div>
              <p class="text-gray-600 text-sm mb-3">{{ offer.description }}</p>
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold text-coral-600"
                  >₦{{ offer.amount.toLocaleString() }}</span
                >
                <span class="text-sm text-gray-500"
                  >by {{ offer.sponsorName }}</span
                >
              </div>
              <router-link
                :to="`/offers/${offer.id}`"
                class="bg-coral-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-coral-600 transition-colors duration-200 inline-block"
              >
                Apply Now
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAppealsStore } from "../../stores/appeals";
import { useOffersStore } from "../../stores/offers";
import { useAccountStore } from "../../stores/account";
import Sidebar from "../../components/Sidebar.vue";
import { studentNavigationItems } from "../../lib/data/navItems";

const authStore = useAuthStore();
const appealsStore = useAppealsStore();
const offersStore = useOffersStore();
const accountStore = useAccountStore();
const studentStats = ref({});
const id = ref(null);

onMounted(async () => {
  try {
    const result = await accountStore.getStudentStats();
    studentStats.value = result.stats;
    id.value = result.id;
    console.log("Student stats:", studentStats.value);
  } catch {
    console.log("Failed to get student stats");
  }
  // appealsStore.getAppeals();
  // offersStore.initializeOffers()
});

const activeAppeals = computed(() => studentStats.value?.pendingRequests || 0);
const totalRaised = computed(
  () => studentStats.value?.totalAmountReceived || 0
);
const applicationCount = computed(() => studentStats.value?.totalRequests || 0);
const availableOffers = computed(() => matchingOffers.value.length);

const userAppeals = computed(() => appealsStore.getUserAppeals(id.value) || []);

const matchingOffers = computed(() => {
  if (!authStore.user) return [];

  const studentProfile = {
    school: authStore.user.school,
    course: authStore.user.course,
    level: authStore.user.level,
    gpa: 3.5, // Mock GPA
  };

  return offersStore.getMatchingOffers(studentProfile);
});
</script>
