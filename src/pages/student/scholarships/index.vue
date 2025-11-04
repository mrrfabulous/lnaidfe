<template>
  <StudentSidebar>
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
                @click="showSaved = !showSaved"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  showSaved
                    ? 'bg-coral-600 text-white'
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

      <!-- Stats Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-coral-100 rounded-lg">
                <AcademicCapIcon class="w-6 h-6 text-coral-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">
                  Total Scholarships
                </p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ totalScholarships }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Perfect Matches</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ perfectMatches }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <CurrencyDollarIcon class="w-6 h-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Value</p>
                <p class="text-2xl font-bold text-gray-900">
                  ₦{{ totalValue.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-amber-100 rounded-lg">
                <ClockIcon class="w-6 h-6 text-amber-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Ending Soon</p>
                <p class="text-2xl font-bold text-gray-900">{{ endingSoon }}</p>
              </div>
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
                  <input
                    v-model="filters.search"
                    type="text"
                    placeholder="Search scholarships..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  />
                  <MagnifyingGlassIcon
                    class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                >
                  <option value="">Any Amount</option>
                  <option value="0-50000">₦0 - ₦50,000</option>
                  <option value="50000-100000">₦50,000 - ₦100,000</option>
                  <option value="100000-300000">₦100,000 - ₦300,000</option>
                  <option value="300000+">₦300,000+</option>
                </select>
              </div>

              <!-- School -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >School</label
                >
                <select
                  v-model="filters.school"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                >
                  <option value="">Any School</option>
                  <option
                    v-for="school in availableSchools"
                    :key="school"
                    :value="school"
                  >
                    {{ school }}
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                >
                  <option value="">Any Course</option>
                  <option
                    v-for="course in availableCourses"
                    :key="course"
                    :value="course"
                  >
                    {{ course }}
                  </option>
                </select>
              </div>

              <!-- Level -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Level</label
                >
                <select
                  v-model="filters.level"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                >
                  <option value="">Any Level</option>
                  <option
                    v-for="level in availableLevels"
                    :key="level"
                    :value="level"
                  >
                    {{ level }} Level
                  </option>
                </select>
              </div>

              <!-- Status -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Status</label
                >
                <select
                  v-model="filters.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="ending_soon">Ending Soon</option>
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
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
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

            <!-- Scholarships Grid -->
            <div v-else class="flex flex-col gap-6">
              <div
                v-for="scholarship in paginatedScholarships"
                :key="scholarship._id"
                class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div class="p-6">
                  <!-- Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <!-- Avatar -->
                      <div
                        class="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center"
                      >
                        <img
                          v-if="scholarship.sponsorAvatar"
                          :src="scholarship.sponsorAvatar"
                          :alt="scholarship.sponsorName"
                          class="w-10 h-10 rounded-full"
                        />
                        <AcademicCapIcon
                          v-else="scholarship.sponsorAvatar"
                          class="w-6 h-6 text-coral-600"
                        />
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-900">
                          {{ scholarship.scholarshipTitle }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{
                            scholarship.sponsorId?.email || "Anonymous Sponsor"
                          }}
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
                      <span
                        v-if="isEndingSoon(scholarship)"
                        class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                      >
                        Ending Soon
                      </span>
                      <span
                        v-if="scholarship.isActive"
                        class="px-2 py-1 text-xs font-medium bg-coral-100 text-coral-800 rounded-full"
                      >
                        Active
                      </span>
                      <button
                        @click="toggleSaved(scholarship._id)"
                        :class="[
                          'p-2 rounded-lg transition-colors',
                          savedScholarships.includes(scholarship._id)
                            ? 'text-coral-600 bg-coral-100'
                            : 'text-gray-400 hover:text-gray-600',
                        ]"
                      >
                        <BookmarkIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ scholarship.scholarshipDescription }}
                  </p>

                  <!-- Details -->
                  <div class="space-y-2 mb-4">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Amount:</span>
                      <span class="font-semibold text-gray-900"
                        >₦{{
                          scholarship.scholarshipAmountPerStudent?.toLocaleString()
                        }}</span
                      >
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Duration:</span>
                      <span class="font-medium text-gray-900">{{
                        formatDuration(scholarship.scholarshipDuration)
                      }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Awards Available:</span>
                      <span class="font-medium text-gray-900">{{
                        scholarship.scholarshipNumberOfAwards
                      }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">Deadline:</span>
                      <span class="font-medium text-gray-900">{{
                        formatDate(scholarship.scholarshipDeadline)
                      }}</span>
                    </div>
                    <div
                      class="flex items-center justify-between text-sm"
                      v-if="scholarship.scholarshipTargetGPA"
                    >
                      <span class="text-gray-600">Min GPA:</span>
                      <span class="font-medium text-gray-900">{{
                        scholarship.scholarshipTargetGPA
                      }}</span>
                    </div>
                  </div>

                  <!-- Type Badge -->
                  <!-- <div class="mb-4">
              <span :class="getTypeBadgeClass(scholarship.type)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ formatType(scholarship.type) }}
              </span>
            </div> -->

                  <!-- Actions -->
                  <div class="flex items-center space-x-3">
                    <router-link
                      :to="`/student/scholarships/${scholarship._id}`"
                      class="flex-1 px-4 py-2 bg-coral-600 text-white text-center rounded-lg hover:bg-coral-700 transition-colors font-medium"
                    >
                      View Details
                    </router-link>
                    <button
                      v-if="isEligible(scholarship)"
                      @click="openApplicationModal(scholarship)"
                      class="px-4 py-2 border border-coral-600 text-coral-600 rounded-lg hover:bg-coral-50 transition-colors font-medium"
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
                class="px-4 py-2 bg-coral-600 text-white rounded-lg hover:bg-coral-700 transition-colors"
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

      <!-- Application Modal -->
      <ApplicationModal
        v-if="showApplicationModal"
        :show="showApplicationModal"
        :type="'scholarship'"
        :item="selectedScholarship"
        @close="closeApplicationModal"
        @submit="handleApplicationSubmit"
      />
    </div>
  </StudentSidebar>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useScholarshipsStore } from "../../../stores/scholarships";
import { useAuthStore } from "../../../stores/auth";
import { useNotificationStore } from "../../../stores/notifications";
import { useAccountStore } from "../../../stores/account";
import { useApplicationsStore } from "../../../stores/applications";
import StudentSidebar from "../../../components/StudentSidebar.vue";
import ApplicationModal from "../../../components/ApplicationModal.vue";

import {
  BookmarkIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const scholarshipsStore = useScholarshipsStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const notificationsStore = useNotificationStore();
const applicationsStore = useApplicationsStore();

const loading = ref(true);
const showSaved = ref(false);
const showApplicationModal = ref(false);
const selectedScholarship = ref(null);
const currentPage = ref(1);
const itemsPerPage = 6;
const scholarships = ref([]);

const filters = ref({
  search: "",
  amountRange: "",
  school: "",
  course: "",
  level: "",
  status: "",
});

const bioDetails = ref({});

const sortBy = ref("deadline");
const savedScholarships = ref([]);

// Load scholarships and saved scholarships from localStorage
onMounted(async () => {
  try {
    const result = await scholarshipsStore.getScholarships();
    if (result.success) {
      scholarships.value = result.data;
    }

    const saved = localStorage.getItem("saved_scholarships");
    if (saved) {
      savedScholarships.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading scholarships:", error);
    notificationsStore.addNotification({
      type: "error",
      title: "Error",
      message: "Failed to load scholarships",
    });
  } finally {
    loading.value = false;
  }
});

// Load the student profile to checkel eligibity
onMounted(async () => {
  try {
    // bio details
    const bioResult = await accountStore.getProfile();
    if (bioResult) {
      bioDetails.value = bioResult;
    } else {
      console.log("No details found");
    }
  } catch (error) {
    console.log("Failed to get student stats, see the error here:", error);
  }
});

// Computed properties for filter options
const availableSchools = computed(() => {
  const schools = new Set();
  scholarships.value.forEach((scholarship) => {
    scholarship.scholarshipTargetSchool?.forEach((school) =>
      schools.add(school)
    );
  });
  return Array.from(schools).sort();
});

const availableCourses = computed(() => {
  const courses = new Set();
  scholarships.value.forEach((scholarship) => {
    scholarship.scholarshipTargetCourse?.forEach((course) =>
      courses.add(course)
    );
  });
  return Array.from(courses).sort();
});

const availableLevels = computed(() => {
  const levels = new Set();
  scholarships.value.forEach((scholarship) => {
    scholarship.scholarshipTargetLevel?.forEach((level) => levels.add(level));
  });
  return Array.from(levels).sort();
});

// Computed stats details
const totalScholarships = computed(() => scholarships.value.length);

const perfectMatches = computed(() => {
  const user = authStore.user;
  if (!user) return 0;

  return scholarships.value.filter((scholarship) => isEligible(scholarship))
    .length;
});

const totalValue = computed(() => {
  return scholarships.value.reduce((total, scholarship) => {
    const amount = scholarship.scholarshipAmountPerStudent || 0;
    const awards = scholarship.scholarshipNumberOfAwards || 1;
    return total + amount * awards;
  }, 0);
});

const endingSoon = computed(() => {
  const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return scholarships.value.filter((scholarship) => {
    const deadline = new Date(scholarship.scholarshipDeadline);
    return deadline <= oneWeekFromNow;
  }).length;
});

// Computed properties
const allScholarships = computed(() => {
  if (showSaved.value) {
    return scholarships.value.filter((s) =>
      savedScholarships.value.includes(s._id)
    );
  }
  return scholarships.value;
});

const filteredScholarships = computed(() => {
  let result = allScholarships.value.filter((scholarship) => {
    // Search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      if (
        !scholarship.scholarshipTitle?.toLowerCase().includes(searchTerm) &&
        !scholarship.scholarshipDescription?.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Amount range filter
    if (filters.value.amountRange) {
      const [min, max] = filters.value.amountRange
        .split("-")
        .map((v) => v.replace("+", ""));
      const amount = scholarship.scholarshipAmountPerStudent || 0;
      if (max) {
        if (amount < parseInt(min) || amount > parseInt(max)) return false;
      } else {
        if (amount < parseInt(min)) return false;
      }
    }

    // School filter
    if (filters.value.school) {
      if (
        !scholarship.scholarshipTargetSchool?.length ||
        !scholarship.scholarshipTargetSchool.includes(filters.value.school)
      ) {
        return false;
      }
    }

    // Course filter
    if (filters.value.course) {
      if (
        !scholarship.scholarshipTargetCourse?.length ||
        !scholarship.scholarshipTargetCourse.includes(filters.value.course)
      ) {
        return false;
      }
    }

    // Level filter
    if (filters.value.level) {
      if (
        !scholarship.scholarshipTargetLevel?.length ||
        !scholarship.scholarshipTargetLevel.includes(filters.value.level)
      ) {
        return false;
      }
    }

    // Status filter
    if (filters.value.status) {
      if (filters.value.status === "active" && !scholarship.isActive)
        return false;
      if (filters.value.status === "ending_soon" && !isEndingSoon(scholarship))
        return false;
    }

    return true;
  });

  // Sort results
  result.sort((a, b) => {
    switch (sortBy.value) {
      case "amount":
        return (
          (b.scholarshipAmountPerStudent || 0) -
          (a.scholarshipAmountPerStudent || 0)
        );
      case "created":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "match":
        const aMatch = isEligible(a) ? 1 : 0;
        const bMatch = isEligible(b) ? 1 : 0;
        return bMatch - aMatch;
      case "deadline":
      default:
        return (
          new Date(a.scholarshipDeadline) - new Date(b.scholarshipDeadline)
        );
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

// Methods (updated for new data structure)
const isEligible = (scholarship) => {
  const user = authStore.user;
  if (!user || user.role !== "student") return false;

  // Check school
  if (
    scholarship.scholarshipTargetSchool?.length &&
    !scholarship.scholarshipTargetSchool.includes(bioDetails.instituteName)
  )
    return false;

  // Check course
  if (
    scholarship.scholarshipTargetCourse?.length &&
    !scholarship.scholarshipTargetCourse.includes(bioDetails.courseOfStudy)
  )
    return false;

  // Check level
  if (
    scholarship.scholarshipTargetLevel?.length &&
    !scholarship.scholarshipTargetLevel.includes(bioDetails.level)
  )
    return false;

  // Check GPA
  if (
    scholarship.scholarshipTargetGPA &&
    bioDetails.gpa < scholarship.scholarshipTargetGPA
  )
    return false;

  return true;
};

const isEndingSoon = (scholarship) => {
  const deadline = new Date(scholarship.scholarshipDeadline);
  const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return deadline <= oneWeekFromNow;
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

const openApplicationModal = (scholarship) => {
  selectedScholarship.value = scholarship;
  showApplicationModal.value = true;
};

const closeApplicationModal = () => {
  showApplicationModal.value = false;
  selectedScholarship.value = null;
};

const handleApplicationSubmit = async (applicationData) => {
  try {
    // Create the application using the applications store
    await applicationsStore.createApplication({
      ...applicationData,
      type: "scholarship",
      scholarshipId: selectedScholarship.value._id,
      scholarshipTitle: selectedScholarship.value.scholarshipTitle,
      sponsorName: selectedScholarship.value.sponsorId?.email || "Anonymous",
    });

    notificationsStore.addNotification({
      type: "success",
      title: "Application Submitted",
      message: `Your application for ${selectedScholarship.value.scholarshipTitle} has been submitted successfully.`,
    });

    closeApplicationModal();
  } catch (error) {
    notificationsStore.addNotification({
      type: "error",
      title: "Application Failed",
      message:
        "There was an error submitting your application. Please try again.",
    });
  }
};

const clearFilters = () => {
  filters.value = {
    search: "",
    amountRange: "",
    school: "",
    course: "",
    level: "",
    status: "",
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

const formatDuration = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(date - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 365) {
    return `${Math.floor(diffDays / 365)} year(s)`;
  } else if (diffDays > 30) {
    return `${Math.floor(diffDays / 30)} month(s)`;
  } else {
    return `${diffDays} day(s)`;
  }
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
