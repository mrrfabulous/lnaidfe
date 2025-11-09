<template>
  <Sidebar
  page-title="Scholarship Details"
    page-subtitle=""
    :navigation-items="studentNavigationItems"
  >
    <!-- Not Found State -->
    <div
      v-if="!scholarship"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Scholarship not found</h1>
        <p class="text-gray-600 mt-2">
          The scholarship you're looking for doesn't exist or has been removed.
        </p>
        <router-link
          to="/student/scholarships"
          class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Other Scholarships
        </router-link>
      </div>
    </div>

    <!-- Main Detail Page -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Breadcrumb -->
      <div class="mb-8">
        <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <router-link to="/student/scholarships" class="hover:text-blue-600">
            Browse Scholarships
          </router-link>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span class="text-gray-900">{{ scholarship.scholarshipTitle }}</span>
        </nav>

        <!-- Title & Amount -->
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ scholarship.scholarshipTitle }}
            </h1>
            <div class="flex items-center space-x-4 flex-wrap">
              <!-- Sponsor -->
              <div class="flex items-center space-x-2">
                <AcademicCapIcon class="w-5 h-5 text-gray-500" />
                <span class="text-gray-600">
                  by {{ scholarship.sponsorId?.email || "Anonymous Sponsor" }}
                </span>
              </div>

              <!-- Perfect Match Badge -->
              <span
                v-if="isEligible"
                class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                Perfect Match
              </span>

              <!-- Ending Soon -->
              <span
                v-if="isEndingSoon"
                class="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                Ending Soon
              </span>

              <!-- Active Status -->
              <span
                v-if="scholarship.isActive"
                class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                Active
              </span>
            </div>
          </div>

          <!-- Amount -->
          <div class="text-right">
            <div class="text-4xl font-bold text-blue-600">
              ₦{{ scholarship.scholarshipAmountPerStudent.toLocaleString() }}
            </div>
            <div class="text-gray-600">
              {{ formatDuration(scholarship.scholarshipDuration) }}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              About This Scholarship
            </h2>
            <p class="text-gray-700 leading-relaxed">
              {{ scholarship.scholarshipDescription }}
            </p>
          </div>

          <!-- Benefits -->
          <div
            v-if="scholarship.scholarshipBenefits?.length"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Scholarship Benefits
            </h2>
            <ul class="space-y-2">
              <li
                v-for="(benefit, index) in scholarship.scholarshipBenefits"
                :key="index"
                class="flex items-start"
              >
                <svg
                  class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <!-- Obligations -->
          <div
            v-if="scholarship.scholarshipObligations?.length"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Scholarship Obligations
            </h2>
            <ul class="space-y-2">
              <li
                v-for="(
                  obligation, index
                ) in scholarship.scholarshipObligations"
                :key="index"
                class="flex items-start"
              >
                <svg
                  class="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span class="text-gray-700">{{ obligation }}</span>
              </li>
            </ul>
          </div>

          <!-- Eligibility Criteria -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Eligibility Criteria
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Target Schools -->
              <div v-if="scholarship.scholarshipTargetSchool?.length">
                <h3 class="font-medium text-gray-900 mb-2">Eligible Schools</h3>
                <ul class="space-y-1">
                  <li
                    v-for="school in scholarship.scholarshipTargetSchool"
                    :key="school"
                    class="text-gray-600 text-sm"
                  >
                    • {{ school }}
                  </li>
                </ul>
              </div>

              <!-- Target Courses -->
              <div v-if="scholarship.scholarshipTargetCourse?.length">
                <h3 class="font-medium text-gray-900 mb-2">Eligible Courses</h3>
                <ul class="space-y-1">
                  <li
                    v-for="course in scholarship.scholarshipTargetCourse"
                    :key="course"
                    class="text-gray-600 text-sm"
                  >
                    • {{ course }}
                  </li>
                </ul>
              </div>

              <!-- Target Levels -->
              <div v-if="scholarship.scholarshipTargetLevel?.length">
                <h3 class="font-medium text-gray-900 mb-2">Academic Levels</h3>
                <ul class="space-y-1">
                  <li
                    v-for="level in scholarship.scholarshipTargetLevel"
                    :key="level"
                    class="text-gray-600 text-sm"
                  >
                    • {{ level }} Level
                  </li>
                </ul>
              </div>

              <!-- Minimum GPA -->
              <div v-if="scholarship.scholarshipTargetGPA">
                <h3 class="font-medium text-gray-900 mb-2">GPA Requirement</h3>
                <p class="text-gray-600 text-sm">
                  Minimum GPA: {{ scholarship.scholarshipTargetGPA }}
                </p>
              </div>
            </div>
          </div>

          <!-- Application Process -->
          <div
            v-if="scholarship.applicationProcess?.length"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Application Process
            </h2>
            <ol class="space-y-4">
              <li
                v-for="step in scholarship.applicationProcess"
                :key="step._id"
                class="flex items-start space-x-4"
              >
                <div
                  class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm"
                >
                  {{ step.stepNumber }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ step.stepTitle }}
                  </h3>
                  <p class="text-gray-600 text-sm">{{ step.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">
                    Duration: {{ step.duration }}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Application Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6"
          >
            <!-- Amount -->
            <div class="text-center mb-6">
              <div class="text-3xl font-bold text-blue-600">
                ₦{{ scholarship.scholarshipAmountPerStudent.toLocaleString() }}
              </div>
              <div class="text-gray-600">
                {{ formatDuration(scholarship.scholarshipDuration) }}
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Awards Available</span>
                <span>{{ scholarship.scholarshipNumberOfAwards }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-blue-500 h-3 rounded-full"
                  :style="{ width: '20%' }"
                ></div>
              </div>
              <div class="text-center text-sm text-gray-600 mt-2">
                Limited awards available
              </div>
            </div>

            <!-- Deadline -->
            <div class="mb-6 p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center text-sm text-gray-600">
                <ClockIcon class="w-4 h-4 mr-2" />
                Application Deadline
              </div>
              <div class="font-semibold text-gray-900 mt-1">
                {{ formatDate(scholarship.scholarshipDeadline) }}
              </div>
              <div class="text-sm text-gray-600 mt-1">
                {{ getTimeRemaining(scholarship.scholarshipDeadline) }}
              </div>
            </div>

            <!-- Eligibility Check -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <span class="font-medium text-gray-900">Your Fit</span>
                <span
                  :class="[
                    'text-sm px-2 py-1 rounded-full',
                    isEligible
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ isEligible ? "Eligible" : "Not Eligible" }}
                </span>
              </div>
              <div class="space-y-2 text-sm">
                <div
                  v-if="scholarship.scholarshipTargetSchool"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-600">School</span>
                  <span
                    :class="schoolMatch ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ schoolMatch ? "✓" : "✗" }}
                  </span>
                </div>
                <div
                  v-if="scholarship.scholarshipTargetCourse"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-600">Course</span>
                  <span
                    :class="courseMatch ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ courseMatch ? "✓" : "✗" }}
                  </span>
                </div>
                <div
                  v-if="scholarship.scholarshipTargetLevel"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-600">Level</span>
                  <span :class="levelMatch ? 'text-green-600' : 'text-red-600'">
                    {{ levelMatch ? "✓" : "✗" }}
                  </span>
                </div>
                <div
                  v-if="scholarship.scholarshipTargetGPA"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-600">GPA</span>
                  <span :class="gpaMatch ? 'text-green-600' : 'text-red-600'">
                    {{ gpaMatch ? "✓" : "✗" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="space-y-3">
              <button
                @click="openApplicationModal"
                :disabled="!isEligible || isDeadlinePassed"
                class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {{ isDeadlinePassed ? "Deadline Passed" : "Apply Now" }}
              </button>

              <button
                @click="toggleSaved"
                :class="[
                  'w-full px-4 py-2 rounded-xl font-medium transition-colors',
                  isSaved
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'border border-gray-300 text-gray-700',
                ]"
              >
                {{ isSaved ? "Saved" : "Save for Later" }}
              </button>
            </div>
          </div>

          <!-- Sponsor Info -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4">
              Sponsor Information
            </h3>
            <div class="flex items-center space-x-3 mb-4">
              <AcademicCapIcon class="w-10 h-10 text-gray-400" />
              <div>
                <h4 class="font-medium text-gray-900">Private Sponsor</h4>
                <p class="text-sm text-gray-600">Individual Contributor</p>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              This scholarship is sponsored through a private individual
              committed to supporting engineering students.
            </p>
          </div>
        </div>
      </div>

      <!-- Application Modal -->
      <ApplicationModal
        v-if="showApplicationModal"
        :show="showApplicationModal"
        :type="'scholarship'"
        :item="scholarship"
        @close="closeApplicationModal"
        @submit="handleApplicationSubmit"
      />
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useScholarshipsStore } from "../../../stores/scholarships";
import { useAccountStore } from "../../../stores/account";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { studentNavigationItems } from "../../../lib/data/navItems";
import ApplicationModal from "../../../components/ApplicationModal.vue";

import {
  BookmarkIcon,
  AcademicCapIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const scholarshipsStore = useScholarshipsStore();
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();

const scholarship = ref(null);
const loading = ref(true);
const showApplicationModal = ref(false);
const savedScholarships = ref([]);

// Load saved scholarships
onMounted(() => {
  const saved = localStorage.getItem("saved_scholarships");
  savedScholarships.value = saved ? JSON.parse(saved) : [];
});

// Fetch scholarship by ID
onMounted(async () => {
  try {
    const result = await scholarshipsStore.getScholarships();
    if (result.success) {
      const found = result.data.find((s) => s._id === route.params.id);
      scholarship.value = found || null;
    }
  } catch (err) {
    console.error("Error loading scholarship:", err);
    notificationStore.addNotification({
      type: "error",
      title: "Error",
      message: "Could not load scholarship details.",
    });
  } finally {
    loading.value = false;
  }
});

// Student profile for eligibility
const studentProfile = computed(() => accountStore.profile || {});

// Eligibility checks
const schoolMatch = computed(() => {
  if (!scholarship.value?.scholarshipTargetSchool?.length) return true;
  return scholarship.value.scholarshipTargetSchool.includes(
    studentProfile.value.instituteName
  );
});

const courseMatch = computed(() => {
  if (!scholarship.value?.scholarshipTargetCourse?.length) return true;
  return scholarship.value.scholarshipTargetCourse.includes(
    studentProfile.value.courseOfStudy
  );
});

const levelMatch = computed(() => {
  if (!scholarship.value?.scholarshipTargetLevel?.length) return true;
  return scholarship.value.scholarshipTargetLevel.includes(
    studentProfile.value.level
  );
});

const gpaMatch = computed(() => {
  if (!scholarship.value?.scholarshipTargetGPA) return true;
  return (
    (studentProfile.value.gpa || 0) >= scholarship.value.scholarshipTargetGPA
  );
});

const isEligible = computed(() => {
  return (
    schoolMatch.value && courseMatch.value && levelMatch.value && gpaMatch.value
  );
});

const isDeadlinePassed = computed(() => {
  return new Date(scholarship.value?.scholarshipDeadline) < new Date();
});

const isEndingSoon = computed(() => {
  const deadline = new Date(scholarship.value?.scholarshipDeadline);
  const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return deadline <= oneWeekFromNow && !isDeadlinePassed.value;
});

// Formatting
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDuration = (dateString) => {
  const end = new Date(dateString);
  const start = new Date();
  const diffYears = end.getFullYear() - start.getFullYear();
  if (diffYears >= 1) return `${diffYears} year(s)`;
  const diffMonths = end.getMonth() - start.getMonth() + diffYears * 12;
  if (diffMonths >= 1) return `${diffMonths} month(s)`;
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return `${diffDays} day(s)`;
};

const getTimeRemaining = (dateString) => {
  const deadline = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "Deadline passed";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "1 day remaining";
  return `${diffDays} days remaining`;
};

// Save/unsave
const isSaved = computed(() => {
  return savedScholarships.value.includes(scholarship.value?._id);
});

const toggleSaved = () => {
  if (!scholarship.value) return;
  const id = scholarship.value._id;
  const index = savedScholarships.value.indexOf(id);
  if (index > -1) {
    savedScholarships.value.splice(index, 1);
    notificationStore.addNotification({
      type: "info",
      title: "Removed",
      message: "Scholarship removed from saved list.",
    });
  } else {
    savedScholarships.value.push(id);
    notificationStore.addNotification({
      type: "success",
      title: "Saved",
      message: "Scholarship saved for later.",
    });
  }
  localStorage.setItem(
    "saved_scholarships",
    JSON.stringify(savedScholarships.value)
  );
};

// Application Modal
const openApplicationModal = () => {
  if (isEligible.value && !isDeadlinePassed.value) {
    showApplicationModal.value = true;
  }
};

const closeApplicationModal = () => {
  showApplicationModal.value = false;
};

const handleApplicationSubmit = async (data) => {
  try {
    await scholarshipsStore.submitApplication(scholarship.value._id, data);
    notificationStore.addNotification({
      type: "success",
      title: "Applied!",
      message: `Your application for "${scholarship.value.scholarshipTitle}" was submitted.`,
    });
    closeApplicationModal();
  } catch (err) {
    notificationStore.addNotification({
      type: "error",
      title: "Failed",
      message: "Could not submit application. Please try again.",
    });
  }
};
</script>
