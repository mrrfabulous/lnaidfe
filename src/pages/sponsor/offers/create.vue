<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Create Scholarships">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Create Funding Offer</h1>
        <p class="text-gray-600 mt-2">
          Set up a targeted funding offer for students based on specific
          criteria
        </p>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-lg shadow p-8 space-y-8"
      >
        <!-- Basic Information -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Basic Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Offer Title *</label
              >
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Tech Innovation Grant"
              />
            </div>

            <div>
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Amount per Student (₦) *</label
              >
              <input
                id="amount"
                v-model.number="form.amount"
                type="number"
                required
                min="1000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="100000"
              />
            </div>

            <div>
              <label
                for="totalBudget"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Total Budget (₦) *</label
              >
              <input
                id="totalBudget"
                v-model.number="form.totalBudget"
                type="number"
                required
                min="1000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="500000"
              />
              <p class="text-sm text-gray-500 mt-1">
                Maximum
                {{ Math.floor(form.totalBudget / form.amount) || 0 }} students
                can benefit
              </p>
            </div>

            <div>
              <label
                for="deadline"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Application Deadline *</label
              >
              <input
                id="deadline"
                v-model="form.deadline"
                type="datetime-local"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Description *</label
            >
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe the purpose of this offer, what you're looking for in applicants, and how the funds should be used..."
            ></textarea>
          </div>
        </div>

        <!-- Targeting Criteria -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Targeting Criteria
          </h2>
          <p class="text-gray-600">
            Define who can apply for this offer. Leave fields empty to include
            all students.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Schools -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Target Schools</label
              >
              <div class="space-y-2">
                <div class="flex">
                  <input
                    v-model="newSchool"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="University name"
                    @keyup.enter="addSchool"
                  />
                  <button
                    type="button"
                    @click="addSchool"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(school, index) in form.criteria.schools"
                    :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {{ school }}
                    <button
                      type="button"
                      @click="removeSchool(index)"
                      class="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <p class="text-xs text-gray-500">
                  Leave empty to include all schools
                </p>
              </div>
            </div>

            <!-- Courses -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Target Courses</label
              >
              <div class="space-y-2">
                <div class="flex">
                  <input
                    v-model="newCourse"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Course name"
                    @keyup.enter="addCourse"
                  />
                  <button
                    type="button"
                    @click="addCourse"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(course, index) in form.criteria.courses"
                    :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {{ course }}
                    <button
                      type="button"
                      @click="removeCourse(index)"
                      class="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <p class="text-xs text-gray-500">
                  Leave empty to include all courses
                </p>
              </div>
            </div>

            <!-- Academic Levels -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Academic Levels</label
              >
              <div class="space-y-2">
                <div
                  v-for="level in availableLevels"
                  :key="level"
                  class="flex items-center"
                >
                  <input
                    :id="`level-${level}`"
                    v-model="form.criteria.levels"
                    :value="level"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    :for="`level-${level}`"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    {{ level }}
                  </label>
                </div>
                <p class="text-xs text-gray-500">
                  Select none to include all levels
                </p>
              </div>
            </div>

            <!-- GPA Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >GPA Requirements</label
              >
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="minGPA" class="block text-xs text-gray-500 mb-1"
                    >Minimum GPA</label
                  >
                  <input
                    id="minGPA"
                    v-model.number="form.criteria.minGPA"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label for="maxGPA" class="block text-xs text-gray-500 mb-1"
                    >Maximum GPA</label
                  >
                  <input
                    id="maxGPA"
                    v-model.number="form.criteria.maxGPA"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="5.00"
                  />
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Leave empty for no GPA restrictions
              </p>
            </div>

            <!-- Gender -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Gender Preference</label
              >
              <select
                v-model="form.criteria.gender"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="any">Any Gender</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
              </select>
            </div>

            <!-- Financial Need -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Financial Need</label
              >
              <div class="space-y-2">
                <label class="inline-flex items-center">
                  <input
                    v-model="form.criteria.financialNeed"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-900"
                    >Require proof of financial need</span
                  >
                </label>
              </div>
            </div>
          </div>

          <!-- Age Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Age Range</label
            >
            <div class="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <label for="minAge" class="block text-xs text-gray-500 mb-1"
                  >Minimum Age</label
                >
                <input
                  id="minAge"
                  v-model.number="form.criteria.ageRange.min"
                  type="number"
                  min="16"
                  max="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="18"
                />
              </div>
              <div>
                <label for="maxAge" class="block text-xs text-gray-500 mb-1"
                  >Maximum Age</label
                >
                <input
                  id="maxAge"
                  v-model.number="form.criteria.ageRange.max"
                  type="number"
                  min="16"
                  max="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Application Requirements -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Application Requirements
          </h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Required Documents/Information</label
            >
            <div class="space-y-2">
              <div class="flex">
                <input
                  v-model="newRequirement"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Academic transcript"
                  @keyup.enter="addRequirement"
                />
                <button
                  type="button"
                  @click="addRequirement"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(requirement, index) in form.requirements"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <span class="text-sm text-gray-900">{{ requirement }}</span>
                  <button
                    type="button"
                    @click="removeRequirement(index)"
                    class="text-red-600 hover:text-red-800"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              for="selectionProcess"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Selection Process</label
            >
            <select
              id="selectionProcess"
              v-model="form.selectionProcess"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="first_come_first_serve">
                First Come, First Serve
              </option>
              <option value="merit_based">Merit-Based Selection</option>
              <option value="holistic">Holistic Review</option>
              <option value="lottery">Random Selection (Lottery)</option>
            </select>
            <p class="text-sm text-gray-500 mt-1">
              How will you select recipients from eligible applicants?
            </p>
          </div>
        </div>

        <!-- Preview -->
        <div class="space-y-6 border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-900">Preview</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ form.title || "Offer Title" }}
                </h3>
                <p class="text-sm text-gray-600">
                  by {{ authStore.user?.name || "Your Name" }}
                </p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600">
                  ₦{{ form.amount?.toLocaleString() || "0" }}
                </div>
                <div class="text-sm text-gray-500">per student</div>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              {{ form.description || "Offer description will appear here..." }}
            </p>

            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-900">Total Budget:</span>
                <span class="ml-2"
                  >₦{{ form.totalBudget?.toLocaleString() || "0" }}</span
                >
              </div>
              <div>
                <span class="font-medium text-gray-900">Max Recipients:</span>
                <span class="ml-2"
                  >{{
                    Math.floor(form.totalBudget / form.amount) || 0
                  }}
                  students</span
                >
              </div>
              <div>
                <span class="font-medium text-gray-900">Deadline:</span>
                <span class="ml-2">{{
                  formatDate(form.deadline) || "Not set"
                }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-900">Selection:</span>
                <span class="ml-2">{{
                  formatSelectionProcess(form.selectionProcess)
                }}</span>
              </div>
            </div>

            <div v-if="hasTargetingCriteria" class="mt-4 pt-4 border-t">
              <h4 class="font-medium text-gray-900 mb-2">
                Targeting Criteria:
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="form.criteria.schools.length"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {{ form.criteria.schools.length }} school(s)
                </span>
                <span
                  v-if="form.criteria.courses.length"
                  class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                >
                  {{ form.criteria.courses.length }} course(s)
                </span>
                <span
                  v-if="form.criteria.levels.length"
                  class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
                >
                  {{ form.criteria.levels.length }} level(s)
                </span>
                <span
                  v-if="form.criteria.minGPA"
                  class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"
                >
                  Min GPA: {{ form.criteria.minGPA }}
                </span>
                <span
                  v-if="form.criteria.gender !== 'any'"
                  class="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded"
                >
                  {{ form.criteria.gender }} only
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="border-t pt-6">
          <div class="flex justify-end space-x-4">
            <router-link
              to="/sponsor/dashboard"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? "Creating Offer..." : "Create Offer" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import { useOffersStore } from "../../../stores/offers";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { sponsorNavigationItems } from "../../../lib/data/navItems";

const router = useRouter();
const authStore = useAuthStore();
const offersStore = useOffersStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const newSchool = ref("");
const newCourse = ref("");
const newRequirement = ref("");

const availableLevels = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "Postgraduate",
];

const form = reactive({
  title: "",
  description: "",
  amount: "",
  totalBudget: "",
  deadline: "",
  criteria: {
    schools: [],
    courses: [],
    levels: [],
    minGPA: "",
    maxGPA: "",
    gender: "any",
    financialNeed: false,
    ageRange: {
      min: "",
      max: "",
    },
  },
  requirements: ["Academic transcript", "Cover letter"],
  selectionProcess: "merit_based",
});

const isFormValid = computed(
  () =>
    form.title &&
    form.description &&
    form.amount &&
    form.totalBudget &&
    form.deadline &&
    form.amount <= form.totalBudget
);

const hasTargetingCriteria = computed(
  () =>
    form.criteria.schools.length > 0 ||
    form.criteria.courses.length > 0 ||
    form.criteria.levels.length > 0 ||
    form.criteria.minGPA ||
    form.criteria.gender !== "any" ||
    form.criteria.financialNeed
);

const addSchool = () => {
  if (
    newSchool.value.trim() &&
    !form.criteria.schools.includes(newSchool.value.trim())
  ) {
    form.criteria.schools.push(newSchool.value.trim());
    newSchool.value = "";
  }
};

const removeSchool = (index) => {
  form.criteria.schools.splice(index, 1);
};

const addCourse = () => {
  if (
    newCourse.value.trim() &&
    !form.criteria.courses.includes(newCourse.value.trim())
  ) {
    form.criteria.courses.push(newCourse.value.trim());
    newCourse.value = "";
  }
};

const removeCourse = (index) => {
  form.criteria.courses.splice(index, 1);
};

const addRequirement = () => {
  if (
    newRequirement.value.trim() &&
    !form.requirements.includes(newRequirement.value.trim())
  ) {
    form.requirements.push(newRequirement.value.trim());
    newRequirement.value = "";
  }
};

const removeRequirement = (index) => {
  form.requirements.splice(index, 1);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

const formatSelectionProcess = (process) => {
  const processes = {
    first_come_first_serve: "First Come, First Serve",
    merit_based: "Merit-Based",
    holistic: "Holistic Review",
    lottery: "Random Selection",
  };
  return processes[process] || process;
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    const offerData = {
      sponsorId: authStore.user.id,
      sponsorName: authStore.user.name,
      sponsorAvatar: authStore.user.avatar,
      offerTitle: form.title,
      offerDescription: form.description,
      offerAmountPerStudent: form.amount,
      offerBudget: form.totalBudget,
      offerTargetSchool: form.criteria.schools,
      offerTargetCourse: form.criteria.courses,
      offerTargetLevel: form.criteria.levels,
      offerTargetGPA: form.criteria.minGPA,
      offerGenderPreference: form.criteria.gender,
      offerAgeRange: form.criteria.ageRange,
      offerSelectionProcess: form.selectionProcess,
      offerDocuments: form.criteria.ageRange,
      requirements: form.requirements,
      offerDeadline: form.deadline,
      // maxRecipients: Math.floor(form.totalBudget / form.amount),
    };

    const newOffer = offersStore.createOffer(offerData);

    notificationStore.addNotification({
      type: "success",
      title: "Offer created successfully!",
      message:
        "Your funding offer is now live and visible to eligible students.",
    });

    router.push(`/offers/${newOffer.id}`);
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Failed to create offer",
      message: "An error occurred while creating your offer. Please try again.",
    });
  } finally {
    loading.value = false;
  }
};
</script>
