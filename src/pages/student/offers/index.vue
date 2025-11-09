<template>
  <Sidebar
  page-title="Offers"
    page-subtitle="manage your funding offers"
    :navigation-items="studentNavigationItems" 
  >
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Browse Opportunities
              </h1>
              <p class="text-sm text-gray-500">
                Discover funding opportunities that match your profile
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600"
                >{{ offers.length }} opportunities available</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- <div>
        {{ offers[0] }}
      </div>
      <div>
        {{ offers.length }}
      </div> -->

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Offers</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ offers.length ?? 0 }}
                </p>
              </div>
              <div class="p-3 bg-blue-100 rounded-xl">
                <Briefcase class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Perfect Matches</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ matchingOffers.length }}
                </p>
              </div>
              <div class="p-3 bg-green-100 rounded-xl">
                <Target class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Funding</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  ₦{{ totalBudget.toLocaleString() }}
                  <!-- ₦{{ totalBudget }} -->
                </p>
              </div>
              <div class="p-3 bg-purple-100 rounded-xl">
                <DollarSign class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Avg. Amount</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  ₦{{ Math.floor(averagePerStudent).toLocaleString() }}
                </p>
              </div>
              <div class="p-3 bg-coral-100 rounded-xl">
                <TrendingUp class="w-6 h-6 text-coral-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div class="flex flex-col space-y-4">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
            >
              <div
                class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1"
              >
                <div class="relative">
                  <Search
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                  />
                  <input
                    v-model="filters.search"
                    type="text"
                    placeholder="Search opportunities..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 w-full sm:w-64"
                  />
                </div>
                <select
                  v-model="filters.amountRange"
                  class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Any Amount</option>
                  <option value="0-100000">₦0 - ₦100,000</option>
                  <option value="100000-200000">₦100,000 - ₦200,000</option>
                  <option value="200000-300000">₦200,000 - ₦300,000</option>
                  <option value="300000+">₦300,000+</option>
                </select>
                <select
                  v-model="filters.course"
                  class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">All Courses</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Business Administration">Business</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Fine Arts">Arts</option>
                </select>
              </div>
              <div class="flex items-center space-x-3">
                <button
                  @click="showMatchesOnly = !showMatchesOnly"
                  :class="[
                    'px-4 py-2 rounded-xl transition-colors',
                    showMatchesOnly
                      ? 'bg-coral-500 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
                  ]"
                >
                  {{ showMatchesOnly ? "Show All" : "Perfect Matches Only" }}
                </button>
                <button
                  @click="clearFilters"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Offers Grid -->
        <div
          v-if="filteredOffers.length === 0"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <Briefcase class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No opportunities found
          </h3>
          <p class="text-gray-600 mb-6">
            {{
              showMatchesOnly
                ? "No opportunities match your profile. Try browsing all opportunities."
                : "No opportunities match your current filters."
            }}
          </p>
          <button
            v-if="showMatchesOnly"
            @click="showMatchesOnly = false"
            class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Search class="h-5 w-5" />
            <span>Browse All Opportunities</span>
          </button>
        </div>

        <div v-else class="grid gap-6">
          <div
            v-for="offer in offers"
            :key="offer._id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-xl font-semibold text-gray-900">
                      {{ offer.offerTitle }}
                    </h3>
                    <!-- <span
                      v-if="isMatchingOffer(offer)"
                      class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      Perfect Match
                    </span> -->
                    <span
                      :class="
                        getSelectionProcessColor(offer.offerSelectionProcess)
                      "
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ formatSelectionProcess(offer.offerSelectionProcess) }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2 mb-2">
                    <img
                      :src="offer?.sponsorAvatar"
                      :alt="offer?.sponsorName"
                      class="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <span class="text-gray-600">{{
                      offer?.sponsorName ?? "no name yet"
                    }}</span>
                  </div>
                  <p class="text-gray-700 line-clamp-2">
                    {{ offer.offerDescription }}
                  </p>
                </div>
                <div class="text-right ml-6">
                  <p class="text-2xl font-bold text-coral-600">
                    ₦{{ offer.offerAmountPerStudent.toLocaleString() }}
                  </p>
                  <p class="text-sm text-gray-500">per recipient</p>
                </div>
              </div>

              <!-- Offer Details -->
              <div class="mb-4">
                <div
                  class="flex items-center justify-between text-sm text-gray-600 mb-2"
                >
                  <span>
                    Recipients: {{ offer.currentRecipients ?? 1 }}/{{
                      Math.floor(
                        offer.offerBudget / offer.offerAmountPerStudent
                      )
                    }}
                  </span>
                  <span>Deadline: {{ formatDate(offer.offerDeadline) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                    :style="{
                      width:
                        ((offer.currentRecipients ?? 1) /
                          Math.floor(
                            offer.offerBudget / offer.offerAmountPerStudent
                          )) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>

              <!-- Quick Info -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-if="offer.offerTargetGPA"
                  class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  Min GPA: {{ offer.offerTargetGPA }}
                </span>
                <span
                  v-if="offer.offerGenderPreference !== 'Any'"
                  class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ offer.offerGenderPreference }} only
                </span>
                <!-- <span
                  v-if="offer.criteria.financialNeed"
                  class="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                >
                  Financial need required
                </span> -->
                <!-- <span
                  class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ offer.requirements.length }} requirements
                </span> -->
              </div>

              <!-- Action Buttons -->
              <div
                class="flex items-center justify-between pt-4 border-t border-gray-100"
              >
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar class="h-4 w-4" />
                  <span>Posted {{ formatDate(offer.createdAt) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <router-link
                    :to="`/student/offers/${offer._id}`"
                    class="px-4 py-2 text-coral-600 hover:bg-coral-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Eye class="h-4 w-4" />
                    <span>View Details</span>
                  </router-link>
                  <button
                    @click="quickApply(offer)"
                    class="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Send class="h-4 w-4" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Apply Modal -->
    <ApplicationModal
      :is-open="applicationModal.show"
      :mode="applicationModal.mode"
      :item="applicationModal.offer"
      :application="applicationModal.application"
      @close="applicationModal.show = false"
      @success="handleApplicationSuccess"
    />
  </Sidebar>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import { useOffersStore } from "../../../stores/offers";
import { useAccountStore } from "../../../stores/account";
import { useApplicationsStore } from "../../../stores/applications";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { studentNavigationItems } from "../../../lib/data/navItems";
import ApplicationModal from "../../../components/ApplicationModal.vue";
import {
  Briefcase,
  Target,
  DollarSign,
  TrendingUp,
  Search,
  Calendar,
  Eye,
  Send,
} from "lucide-vue-next";

const router = useRouter();
// const authStore = useAuthStore()
const offersStore = useOffersStore();
const accountStore = useAccountStore();
// const applicationsStore = useApplicationsStore()
const notificationStore = useNotificationStore();

const filters = reactive({
  search: "",
  amountRange: "",
  course: "",
});

const showMatchesOnly = ref(false);

const applicationModal = reactive({
  show: false,
  mode: "create",
  offer: null,
  application: null,
});

const offers = ref([]);
const studentDetails = ref(null);
let totalBudget = ref(0);
let totalPerStudent = ref(0);
let averagePerStudent = ref(0);

onMounted(async () => {
  offersStore.initializeOffers();
  try {
    const [offersResult, studentDetailsResult] = await Promise.allSettled([
      offersStore.fetchOffers(),
      accountStore.getProfile(),
    ]);

    if (offersResult.status === "fulfilled") {
      offers.value = offersResult.value.data;

      totalBudget = offersResult.value.data.reduce(
        (sum, item) => sum + item.offerBudget,
        0
      );

      totalPerStudent = offersResult.value.data.reduce(
        (sum, item) => sum + item.offerAmountPerStudent,
        0
      );

      averagePerStudent = totalPerStudent / offersResult.value.data.length;

      console.log("Total Budget:", totalBudget);

      console.log("Offers data:", offers.value);
    } else {
      console.log("Offers failed:", offersResult.reason);
    }

    if (studentDetailsResult.status === "fulfilled") {
      studentDetails.value = studentDetailsResult.value;
      console.log("Student details:", studentDetails.value);
      // Use studentDetailsResult.value
    } else {
      console.log("Student details failed:", studentDetailsResult.reason);
    }
  } catch (error) {
    console.log("error from the offer page", error);
  }
});

// Mock student profile - in real app this would come from user store
const studentProfile = computed(() => ({
  school: "University of Lagos",
  course: "Computer Science",
  level: "400 Level",
  gpa: 4.2,
  gender: "male",
  state: "Lagos",
  age: 22,
}));

const allOffers = computed(() => offersStore.getOffers);

const matchingOffers = computed(() =>
  offersStore.getMatchingOffers(studentProfile.value)
);

const totalFunding = computed(() =>
  allOffers.value.reduce((total, offer) => total + offer.amount, 0)
);

const averageAmount = computed(() => {
  if (allOffers.value.length === 0) return 0;
  return Math.round(totalFunding.value / allOffers.value.length);
});

const filteredOffers = computed(() => {
  let filtered = showMatchesOnly.value ? matchingOffers.value : allOffers.value;

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (offer) =>
        offer.title?.toLowerCase().includes(search) ||
        offer.sponsorName?.toLowerCase().includes(search) ||
        offer.description?.toLowerCase().includes(search)
    );
  }

  if (filters.amountRange) {
    filtered = filtered.filter((offer) => {
      const amount = offer.amount;
      switch (filters.amountRange) {
        case "0-100000":
          return amount <= 100000;
        case "100000-200000":
          return amount > 100000 && amount <= 200000;
        case "200000-300000":
          return amount > 200000 && amount <= 300000;
        case "300000+":
          return amount > 300000;
        default:
          return true;
      }
    });
  }

  if (filters.course) {
    filtered = filtered.filter(
      (offer) =>
        offer.criteria.courses?.includes(filters.course) ||
        offer.criteria.courses?.length === 0
    );
  }

  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const isMatchingOffer = (offer) => {
  return matchingOffers.value.some((match) => match.id === offer.id);
};

const getSelectionProcessColor = (process) => {
  const colors = {
    merit_based: "bg-blue-100 text-blue-700",
    holistic: "bg-purple-100 text-purple-700",
    research_based: "bg-green-100 text-green-700",
    portfolio_based: "bg-orange-100 text-orange-700",
    // first_come_first_serve: "bg-coral-100 text-coral-700",
  };
  return colors[process] || "bg-gray-100 text-gray-700";
};

const formatSelectionProcess = (process) => {
  const processes = {
    merit_based: "Merit Based",
    holistic: "Holistic Review",
    research_based: "Research Based",
    portfolio_based: "Portfolio Based",
  };
  return processes[process] || process;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const clearFilters = () => {
  filters.search = "";
  filters.amountRange = "";
  filters.course = "";
  showMatchesOnly.value = false;
};

const quickApply = (offer) => {
  applicationModal.offer = offer;
  applicationModal.mode = "create";
  applicationModal.application = null;
  applicationModal.show = true;
};

const handleApplicationSuccess = () => {
  applicationModal.show = false;
  notificationStore.addNotification({
    type: "success",
    title: "Application submitted",
    message: "Your application has been submitted successfully!",
  });
};
</script>
