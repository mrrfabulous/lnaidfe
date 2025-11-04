<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Browse Scholarships
            </h1>
            <p class="text-gray-600 mt-1">
              Discover scholarship opportunities that match your profile
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="refreshData"
              :disabled="scholarshipsStore.loading"
              class="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <svg
                v-if="scholarshipsStore.loading"
                class="w-4 h-4 inline mr-2 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              {{ scholarshipsStore.loading ? "Refreshing..." : "Refresh" }}
            </button>
            <button
              @click="showSaved = !showSaved"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                showSaved
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              <BookmarkIcon class="w-4 h-4 inline mr-2" />
              Saved ({{ savedScholarships.length }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-80 flex-shrink-0">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Search</label
              >
              <div class="relative">
                <SearchIcon
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search scholarships..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <!-- Amount Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Amount Range</label
              >
              <select
                v-model="filters.amountRange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Any Amount</option>
                <option value="0-100000">₦0 - ₦100,000</option>
                <option value="100000-300000">₦100,000 - ₦300,000</option>
                <option value="300000-500000">₦300,000 - ₦500,000</option>
                <option value="500000+">₦500,000+</option>
              </select>
            </div>

            <!-- Type -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Type</label
              >
              <select
                v-model="filters.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="full_tuition">Full Tuition</option>
                <option value="partial_tuition">Partial Tuition</option>
                <option value="stipend">Stipend</option>
                <option value="research">Research Grant</option>
              </select>
            </div>

            <!-- Duration -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Duration</label
              >
              <select
                v-model="filters.duration"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Any Duration</option>
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Years</option>
                <option value="3 years">3 Years</option>
                <option value="4 years">4 Years</option>
              </select>
            </div>

            <!-- School -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >School</label
              >
              <select
                v-model="filters.school"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Any School</option>
                <option value="University of Lagos">University of Lagos</option>
                <option value="Obafemi Awolowo University">
                  Obafemi Awolowo University
                </option>
                <option value="University of Ibadan">
                  University of Ibadan
                </option>
                <option value="Ahmadu Bello University">
                  Ahmadu Bello University
                </option>
              </select>
            </div>

            <!-- Course -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Course</label
              >
              <select
                v-model="filters.course"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Any Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <!-- Scholarships Grid -->
        <div class="flex-1">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-gray-600">
                {{ filteredScholarships.length }} scholarship{{
                  filteredScholarships.length !== 1 ? "s" : ""
                }}
                found
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="amount">Sort by Amount</option>
                <option value="created">Sort by Newest</option>
                <option value="match">Sort by Match</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="i in 6"
              :key="i"
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
            >
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="scholarshipsStore.loading" class="text-center py-12">
            <div
              class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white"
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading scholarships...
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="scholarshipsStore.error" class="text-center py-12">
            <div class="text-red-600 mb-4">
              <svg
                class="w-12 h-12 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="text-lg font-medium">Failed to load scholarships</h3>
              <p class="text-gray-600 mt-2">{{ scholarshipsStore.error }}</p>
              <button
                @click="refreshData"
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>

          <!-- Scholarships Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="scholarship in paginatedScholarships"
              :key="scholarship.id"
              class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <img
                      :src="scholarship.sponsorAvatar"
                      :alt="scholarship.sponsorName"
                      class="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ scholarship.title }}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {{ scholarship.sponsorName }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      v-if="isEligible(scholarship)"
                      class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                    >
                      Perfect Match
                    </span>
                    <button
                      @click="toggleSaved(scholarship.id)"
                      :class="[
                        'p-2 rounded-lg transition-colors',
                        savedScholarships.includes(scholarship.id)
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-400 hover:text-gray-600',
                      ]"
                    >
                      <BookmarkIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {{ scholarship.description }}
                </p>

                <!-- Details -->
                <div class="space-y-2 mb-4">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Amount:</span>
                    <span class="font-semibold text-gray-900"
                      >₦{{ scholarship.amount.toLocaleString() }}</span
                    >
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Duration:</span>
                    <span class="font-medium text-gray-900">{{
                      scholarship.duration
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Awards Available:</span>
                    <span class="font-medium text-gray-900"
                      >{{ scholarship.remainingAwards }}/{{
                        scholarship.numberOfAwards
                      }}</span
                    >
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Deadline:</span>
                    <span class="font-medium text-gray-900">{{
                      formatDate(scholarship.deadline)
                    }}</span>
                  </div>
                </div>

                <!-- Type Badge -->
                <div class="mb-4">
                  <span
                    :class="getTypeBadgeClass(scholarship.type)"
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ formatType(scholarship.type) }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-3">
                  <router-link
                    :to="`/scholarships/${scholarship.id}`"
                    class="flex-1 px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    View Details
                  </router-link>
                  <button
                    v-if="isEligible(scholarship)"
                    @click="quickApply(scholarship)"
                    class="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="!loading && filteredScholarships.length === 0"
            class="text-center py-12"
          >
            <AcademicCapIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No scholarships found
            </h3>
            <p class="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              @click="clearFilters"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          <!-- Load More -->
          <div v-if="hasMore && !loading" class="text-center mt-8">
            <button
              @click="loadMore"
              class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Load More Scholarships
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Apply Modal -->
    <div
      v-if="showQuickApply"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
        <p class="text-gray-600 mb-4">
          You're about to apply for
          <strong>{{ selectedScholarship?.title }}</strong
          >. This will redirect you to the full application page.
        </p>
        <div class="flex items-center space-x-3">
          <button
            @click="showQuickApply = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <router-link
            :to="`/scholarships/${selectedScholarship?.id}?apply=true`"
            class="flex-1 px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
            @click="showQuickApply = false"
          >
            Continue
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useScholarshipsStore } from "@/stores/scholarships";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notifications";
import {
  MagnifyingGlassIcon as SearchIcon,
  BookmarkIcon,
  AcademicCapIcon,
} from "@heroicons/vue/24/outline";

const scholarshipsStore = useScholarshipsStore();
const authStore = useAuthStore();
const notificationsStore = useNotificationStore();

const loading = ref(true);
const showSaved = ref(false);
const showQuickApply = ref(false);
const selectedScholarship = ref(null);
const currentPage = ref(1);
const itemsPerPage = 6;

const filters = ref({
  search: "",
  amountRange: "",
  type: "",
  duration: "",
  school: "",
  course: "",
});

const sortBy = ref("deadline");
const savedScholarships = ref([]);

// Load scholarships from API and saved scholarships from localStorage
onMounted(async () => {
  try {
    // Initialize scholarships from API
    await scholarshipsStore.initializeScholarships();

    // Load saved scholarships from localStorage
    const saved = localStorage.getItem("saved_scholarships");
    if (saved) {
      savedScholarships.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to initialize scholarships:", error);
    notificationsStore.addNotification({
      type: "error",
      title: "Loading Error",
      message: "Failed to load scholarships. Please try refreshing the page.",
    });
  } finally {
    loading.value = false;
  }
});

// Refresh data function
const refreshData = async () => {
  try {
    await scholarshipsStore.refreshScholarships();
    notificationsStore.addNotification({
      type: "success",
      title: "Data Refreshed",
      message: "Scholarships have been updated from the server.",
    });
  } catch (error) {
    console.error("Failed to refresh scholarships:", error);
    notificationsStore.addNotification({
      type: "error",
      title: "Refresh Failed",
      message: "Failed to refresh scholarships. Please try again.",
    });
  }
};

// Computed properties
const allScholarships = computed(() => {
  if (showSaved.value) {
    return scholarshipsStore.getScholarships.filter((s) =>
      savedScholarships.value.includes(s.id)
    );
  }
  return scholarshipsStore.getScholarships;
});

const filteredScholarships = computed(() => {
  let result = allScholarships.value.filter((scholarship) => {
    // Search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      if (
        !scholarship.title.toLowerCase().includes(searchTerm) &&
        !scholarship.description.toLowerCase().includes(searchTerm) &&
        !scholarship.sponsorName.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Amount range filter
    if (filters.value.amountRange) {
      const [min, max] = filters.value.amountRange
        .split("-")
        .map((v) => v.replace("+", ""));
      const amount = scholarship.amount;
      if (max) {
        if (amount < parseInt(min) || amount > parseInt(max)) return false;
      } else {
        if (amount < parseInt(min)) return false;
      }
    }

    // Type filter
    if (filters.value.type && scholarship.type !== filters.value.type) {
      return false;
    }

    // Duration filter
    if (
      filters.value.duration &&
      scholarship.duration !== filters.value.duration
    ) {
      return false;
    }

    // School filter
    if (filters.value.school) {
      if (
        !scholarship.criteria.schools?.length ||
        !scholarship.criteria.schools.includes(filters.value.school)
      ) {
        return false;
      }
    }

    // Course filter
    if (filters.value.course) {
      if (
        !scholarship.criteria.courses?.length ||
        !scholarship.criteria.courses.includes(filters.value.course)
      ) {
        return false;
      }
    }

    return true;
  });

  // Sort results
  result.sort((a, b) => {
    switch (sortBy.value) {
      case "amount":
        return b.amount - a.amount;
      case "created":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "match":
        const aMatch = isEligible(a) ? 1 : 0;
        const bMatch = isEligible(b) ? 1 : 0;
        return bMatch - aMatch;
      case "deadline":
      default:
        return new Date(a.deadline) - new Date(b.deadline);
    }
  });

  return result;
});

const paginatedScholarships = computed(() => {
  const start = 0;
  const end = currentPage.value * itemsPerPage;
  return filteredScholarships.value.slice(start, end);
});

const hasMore = computed(() => {
  return paginatedScholarships.value.length < filteredScholarships.value.length;
});

// Methods
const isEligible = (scholarship) => {
  const user = authStore.user;
  if (!user || user.role !== "student") return false;

  const criteria = scholarship.criteria;

  // Check school
  if (criteria.schools?.length && !criteria.schools.includes(user.school))
    return false;

  // Check course
  if (criteria.courses?.length && !criteria.courses.includes(user.course))
    return false;

  // Check level
  if (criteria.levels?.length && !criteria.levels.includes(user.level))
    return false;

  // Check GPA
  if (criteria.minGPA && user.gpa < criteria.minGPA) return false;

  // Check gender
  if (
    criteria.gender &&
    criteria.gender !== "any" &&
    user.gender !== criteria.gender
  )
    return false;

  // Check financial need
  if (criteria.financialNeed && !user.financialNeed) return false;

  return true;
};

const toggleSaved = (scholarshipId) => {
  const index = savedScholarships.value.indexOf(scholarshipId);
  if (index > -1) {
    savedScholarships.value.splice(index, 1);
    notificationsStore.addNotification({
      type: "info",
      title: "Scholarship Removed",
      message: "Scholarship removed from saved list",
    });
  } else {
    savedScholarships.value.push(scholarshipId);
    notificationsStore.addNotification({
      type: "success",
      title: "Scholarship Saved",
      message: "Scholarship added to saved list",
    });
  }

  localStorage.setItem(
    "saved_scholarships",
    JSON.stringify(savedScholarships.value)
  );
};

const quickApply = (scholarship) => {
  selectedScholarship.value = scholarship;
  showQuickApply.value = true;
};

const clearFilters = () => {
  filters.value = {
    search: "",
    amountRange: "",
    type: "",
    duration: "",
    school: "",
    course: "",
  };
  currentPage.value = 1;
};

const loadMore = () => {
  currentPage.value++;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatType = (type) => {
  const types = {
    full_tuition: "Full Tuition",
    partial_tuition: "Partial Tuition",
    stipend: "Stipend",
    research: "Research Grant",
  };
  return types[type] || type;
};

const getTypeBadgeClass = (type) => {
  const classes = {
    full_tuition: "bg-green-100 text-green-800",
    partial_tuition: "bg-blue-100 text-blue-800",
    stipend: "bg-purple-100 text-purple-800",
    research: "bg-orange-100 text-orange-800",
  };
  return classes[type] || "bg-gray-100 text-gray-800";
};

// Reset pagination when filters change
watch(
  filters,
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);
</script>
