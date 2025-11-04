<!-- pages/student/offers/[id].vue -->
<template>
  <StudentSidebar>
    <!-- Not Found State -->
    <div v-if="!offer" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Offer not found</h1>
        <p class="text-gray-600 mt-2">
          The offer you're looking for doesn't exist or has been removed.
        </p>
        <router-link
          to="/student/offers"
          class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 mt-4 inline-block"
        >
          Browse Other Offers
        </router-link>
      </div>
    </div>

    <!-- Main Detail Page -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <router-link to="/student/offers" class="hover:text-coral-500">
          Browse Opportunities
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
        <span class="text-gray-900">{{ offer.offerTitle }}</span>
      </nav>

      <!-- Header -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-4">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ offer.offerTitle }}
              </h1>
              <span
                v-if="isMatchingOffer"
                class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                Perfect Match
              </span>
              <span
                :class="getSelectionProcessColor(offer.offerSelectionProcess)"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ formatSelectionProcess(offer.offerSelectionProcess) }}
              </span>
            </div>

            <div class="flex items-center space-x-4 mb-4">
              <div class="flex items-center space-x-2">
                <AcademicCapIcon class="w-10 h-10 text-coral-600" />
                <div>
                  <p class="font-medium text-gray-900">
                    {{ offer.sponsorId?.email || "Anonymous Sponsor" }}
                  </p>
                  <p class="text-sm text-gray-500">Sponsor</p>
                </div>
              </div>
            </div>

            <p class="text-gray-700 text-lg leading-relaxed">
              {{ offer.offerDescription }}
            </p>
          </div>

          <!-- Amount -->
          <div class="text-right ml-8">
            <div class="text-4xl font-bold text-coral-600 mb-2">
              <!-- ₦{{ offer.offerAmountPerStudent.toLocaleString() ?? 0 }} -->
              0
            </div>
            <div class="text-gray-600 mb-4">per recipient</div>
            <div class="text-sm text-gray-500">
              <p>Deadline: {{ formatDate(offer.offerDeadline) }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="flex items-center justify-between pt-6 border-t border-gray-100 mt-6"
        >
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center space-x-2">
              <Calendar class="h-4 w-4" />
              <span>Posted {{ formatDate(offer.createdAt) }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <Clock class="h-4 w-4" />
              <span>{{ daysUntilDeadline }} days remaining</span>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="shareOffer"
              class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Share2 class="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              v-if="!hasApplied && !isDeadlinePassed"
              @click="applyNow"
              class="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Send class="h-5 w-5" />
              <span>Apply Now</span>
            </button>
            <div
              v-else
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center space-x-2"
            >
              <CheckCircle class="h-5 w-5" />
              <span>{{ isDeadlinePassed ? "Closed" : "Applied" }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Eligibility Criteria -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Eligibility Criteria
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Target Schools -->
              <div v-if="offer.offerTargetSchool?.length">
                <h3
                  class="font-medium text-gray-900 mb-2 flex items-center space-x-2"
                >
                  <School class="h-4 w-4" />
                  <span>Eligible Schools</span>
                </h3>
                <ul class="space-y-1">
                  <li
                    v-for="school in offer.offerTargetSchool"
                    :key="school"
                    class="text-gray-600 text-sm"
                  >
                    • {{ school }}
                  </li>
                </ul>
              </div>

              <!-- Target Courses -->
              <div v-if="offer.offerTargetCourse?.length">
                <h3
                  class="font-medium text-gray-900 mb-2 flex items-center space-x-2"
                >
                  <AcademicCapIcon class="w-10 h-10 text-coral-600" />
                  <span>Eligible Courses</span>
                </h3>
                <ul class="space-y-1">
                  <li
                    v-for="course in offer.offerTargetCourse"
                    :key="course"
                    class="text-gray-600 text-sm"
                  >
                    • {{ course }}
                  </li>
                </ul>
              </div>

              <!-- Target Levels -->
              <div v-if="offer.offerTargetLevel?.length">
                <h3
                  class="font-medium text-gray-900 mb-2 flex items-center space-x-2"
                >
                  <Target class="h-4 w-4" />
                  <span>Academic Levels</span>
                </h3>
                <ul class="space-y-1">
                  <li
                    v-for="level in offer.offerTargetLevel"
                    :key="level"
                    class="text-gray-600 text-sm"
                  >
                    • {{ level }}
                  </li>
                </ul>
              </div>

              <!-- Minimum GPA -->
              <div v-if="offer.offerTargetGPA">
                <h3 class="font-medium text-gray-900 mb-2">GPA Requirement</h3>
                <p class="text-gray-600 text-sm">
                  Minimum GPA: {{ offer.offerTargetGPA }}
                </p>
              </div>

              <!-- Gender Preference -->
              <div
                v-if="
                  offer.offerGenderPreference &&
                  offer.offerGenderPreference !== 'Any'
                "
              >
                <h3 class="font-medium text-gray-900 mb-2">Gender</h3>
                <p class="text-gray-600 text-sm capitalize">
                  {{ offer.offerGenderPreference }} only
                </p>
              </div>

              <!-- Age Range -->
              <div v-if="offer.offerAgeRange">
                <h3 class="font-medium text-gray-900 mb-2">Age Range</h3>
                <p class="text-gray-600 text-sm">
                  {{ offer.offerAgeRange }}
                </p>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div
            v-if="offer.offerDocuments?.length"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2
              class="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2"
            >
              <FileText class="h-5 w-5" />
              <span>Required Documents</span>
            </h2>
            <ul class="space-y-3">
              <li
                v-for="(doc, index) in offer.offerDocuments"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div
                  class="flex-shrink-0 w-6 h-6 bg-coral-100 rounded-full flex items-center justify-center mt-0.5"
                >
                  <div class="w-2 h-2 bg-coral-500 rounded-full"></div>
                </div>
                <span class="text-gray-700">{{ doc }}</span>
              </li>
            </ul>
          </div>

          <!-- Selection Process -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Selection Process
            </h2>
            <div class="flex items-center space-x-3 mb-4">
              <span
                :class="getSelectionProcessColor(offer.offerSelectionProcess)"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ formatSelectionProcess(offer.offerSelectionProcess) }}
              </span>
            </div>
            <p class="text-gray-600">
              {{ getSelectionDescription(offer.offerSelectionProcess) }}
            </p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Offer Summary
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Amount per Recipient</span>
                <span class="font-semibold text-coral-600">
                  ₦ 0
                  <!-- ₦{{ offer.offerAmountPerStudent.toLocaleString() }} -->
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Total Budget</span>
                <span class="font-semibold">
                  ₦ 0
                  <!-- ₦{{ offer.offerBudget.toLocaleString() }} -->
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Deadline</span>
                <span class="font-semibold">
                  {{ formatDate(offer.offerDeadline) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Status</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    offer.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700',
                  ]"
                >
                  {{ offer.isActive ? "Active" : "Closed" }}
                </span>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="mb-4">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Funding Progress</span>
                <span>{{ fundingProgress }}% used</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-coral-500 h-2 rounded-full"
                  :style="{ width: `${fundingProgress}%` }"
                ></div>
              </div>
              <div class="text-center text-sm text-gray-600 mt-2">
                <!-- ₦{{ amountAwarded.toLocaleString() }} of ₦{{
                  offer.offerBudget.toLocaleString()
                }} -->
                used
              </div>
            </div>
          </div>

          <!-- Profile Match -->
          <div
            v-if="isMatchingOffer"
            class="bg-green-50 border border-green-200 rounded-2xl p-6"
          >
            <div class="flex items-center space-x-2 mb-3">
              <CheckCircle class="h-5 w-5 text-green-600" />
              <h3 class="text-lg font-semibold text-green-900">
                Perfect Match!
              </h3>
            </div>
            <p class="text-green-700 text-sm">
              You meet all the eligibility criteria for this offer.
            </p>
          </div>

          <!-- Similar Offers -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Similar Offers
            </h3>
            <div class="space-y-3">
              <div
                v-for="similar in similarOffers.slice(0, 3)"
                :key="similar._id"
                class="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <router-link
                  :to="`/student/offers/${similar._id}`"
                  class="block"
                >
                  <h4 class="font-medium text-gray-900 text-sm">
                    {{ similar.offerTitle }}
                  </h4>
                  <p class="text-gray-600 text-xs mt-1">
                    {{ similar.sponsorId.email }}
                  </p>
                  <p class="text-coral-600 font-semibold text-sm mt-1">
                    <!-- ₦{{ similar.offerAmountPerStudent.toLocaleString() }} -->
                    ₦ 0
                  </p>
                </router-link>
              </div>
            </div>
            <router-link
              to="/student/offers"
              class="text-coral-600 hover:text-coral-700 text-sm font-medium mt-4 inline-flex items-center space-x-1"
            >
              <span>View all offers</span>
              <Eye class="h-4 w-4" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Modal -->
    <ApplicationModal
      :is-open="applicationModal.show"
      :mode="applicationModal.mode"
      :item="applicationModal.offer"
      :application="applicationModal.application"
      @close="() => (applicationModal.show = false)"
      @success="handleApplicationSuccess"
    />
  </StudentSidebar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useOffersStore } from "../../../stores/offers";
import { useAccountStore } from "../../../stores/account";
import { useApplicationsStore } from "../../../stores/applications";
import { useNotificationStore } from "../../../stores/notifications";
import StudentSidebar from "../../../components/StudentSidebar.vue";
import ApplicationModal from "../../../components/ApplicationModal.vue";

import {
  Calendar,
  Clock,
  Share2,
  Send,
  CheckCircle,
  School,
  GraduationCap,
  Target,
  FileText,
  Eye,
  // AcademicCapIcon,
} from "lucide-vue-next";

import {
  BookmarkIcon,
  AcademicCapIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const offersStore = useOffersStore();
const accountStore = useAccountStore();
const applicationsStore = useApplicationsStore();
const notificationStore = useNotificationStore();

const applicationModal = ref({
  show: false,
  mode: "create",
  offer: null,
  application: null,
});

// Fetch offer by ID
onMounted(() => {
  offersStore.getSingleOffer(route.params.id);
});

const offer = computed(() => {
  const data = offersStore.getSingleOffer(route.params.id);
  return data || null;
});

// Student profile
const studentProfile = computed(() => accountStore.profile || {});

// Is matching offer?
const isMatchingOffer = computed(() => {
  if (!offer.value || !studentProfile.value) return false;

  const { instituteName, courseOfStudy, level, gpa } = studentProfile.value;

  const schoolMatch =
    !offer.value.offerTargetSchool?.length ||
    offer.value.offerTargetSchool.includes(instituteName);

  const courseMatch =
    !offer.value.offerTargetCourse?.length ||
    offer.value.offerTargetCourse.includes(courseOfStudy);

  const levelMatch =
    !offer.value.offerTargetLevel?.length ||
    offer.value.offerTargetLevel.includes(level);

  const gpaMatch =
    !offer.value.offerTargetGPA || (gpa || 0) >= offer.value.offerTargetGPA;

  const genderMatch =
    !offer.value.offerGenderPreference ||
    offer.value.offerGenderPreference === "Any" ||
    offer.value.offerGenderPreference.toLowerCase() ===
      (studentProfile.value.gender || "").toLowerCase();

  return schoolMatch && courseMatch && levelMatch && gpaMatch && genderMatch;
});

// Has applied?
const hasApplied = computed(() => {
  const user = accountStore.user;
  if (!user || !offer.value) return false;

  const userApplications = applicationsStore.getUserApplications(user._id);
  return userApplications.some(
    (app) => app.itemId === offer.value._id && app.type === "offer"
  );
});

// Deadline passed?
const isDeadlinePassed = computed(() => {
  if (!offer.value) return false;
  return new Date(offer.value.offerDeadline) < new Date();
});

// Days until deadline
const daysUntilDeadline = computed(() => {
  if (!offer.value) return 0;
  const deadline = new Date(offer.value.offerDeadline);
  const today = new Date();
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Funding progress
const amountAwarded = computed(() => {
  // In real app, this would come from total awarded
  // For now, simulate based on budget and amount per student
  const maxRecipients = Math.floor(
    offer.value?.offerBudget / offer.value?.offerAmountPerStudent
  );
  const awarded = Math.min(5, maxRecipients); // mock: 5 awarded
  return awarded * (offer.value?.offerAmountPerStudent || 0);
});

const fundingProgress = computed(() => {
  if (!offer.value) return 0;
  return Math.round((amountAwarded.value / offer.value.offerBudget) * 100);
});

// Similar offers
const similarOffers = computed(() => {
  if (!offer.value) return [];
  return offersStore.getOffers
    .filter((o) => o._id !== offer.value._id && o.isActive)
    .filter((o) => {
      const currentCourses = offer.value.offerTargetCourse || [];
      const similarCourses = o.offerTargetCourse || [];
      return currentCourses.some((course) => similarCourses.includes(course));
    })
    .slice(0, 3);
});

// Formatting
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatSelectionProcess = (process) => {
  const map = {
    "First come, first Serve": "First Come, First Served",
    merit_based: "Merit Based",
    holistic: "Holistic Review",
    research_based: "Research Based",
    portfolio_based: "Portfolio Based",
  };
  return map[process] || process;
};

const getSelectionProcessColor = (process) => {
  const colors = {
    "First come, first Serve": "bg-blue-100 text-blue-700",
    merit_based: "bg-blue-100 text-blue-700",
    holistic: "bg-purple-100 text-purple-700",
    research_based: "bg-green-100 text-green-700",
    portfolio_based: "bg-orange-100 text-orange-700",
  };
  return colors[process] || "bg-gray-100 text-gray-700";
};

const getSelectionDescription = (process) => {
  const descriptions = {
    "First come, first Serve":
      "Applications are processed in the order they are received until budget is exhausted.",
    merit_based:
      "Candidates are selected based on academic excellence and achievements.",
    holistic:
      "Selection considers academic performance, personal background, and potential.",
    research_based:
      "Priority given to candidates with strong research experience and proposals.",
    portfolio_based:
      "Selection is based on the quality of creative work and portfolio.",
  };
  return descriptions[process] || "Selection process details not available.";
};

// Actions
const applyNow = () => {
  if (offer.value && !isDeadlinePassed.value) {
    applicationModal.value.offer = offer.value;
    applicationModal.value.mode = "create";
    applicationModal.value.application = null;
    applicationModal.value.show = true;
  }
};

const shareOffer = async () => {
  const url = window.location.href;
  const text = `Check out this opportunity: ${offer.value?.offerTitle}`;
  if (navigator.share) {
    await navigator.share({ title: offer.value?.offerTitle, text, url });
  } else {
    await navigator.clipboard.writeText(url);
    notificationStore.addNotification({
      type: "success",
      title: "Link copied",
      message: "Offer link copied to clipboard!",
    });
  }
};

const handleApplicationSuccess = () => {
  applicationModal.value.show = false;
  notificationStore.addNotification({
    type: "success",
    title: "Applied!",
    message: "Your application has been submitted successfully.",
  });
};
</script>
