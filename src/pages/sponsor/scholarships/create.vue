<template>
  <Sidebar :navigation-items="navigationItems" page-title="Create Scholarships">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Create Scholarship Program
        </h1>
        <p class="text-gray-600 mt-2">
          Set up a comprehensive scholarship program with multi-step application
          process
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
                >Scholarship Title *</label
              >
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Excellence in STEM Scholarship"
              />
            </div>

            <div>
              <label
                for="type"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Scholarship Type *</label
              >
              <select
                id="type"
                v-model="form.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select type</option>
                <option value="full_tuition">Full Tuition Coverage</option>
                <option value="partial_tuition">
                  Partial Tuition Coverage
                </option>
                <option value="stipend">Monthly Stipend</option>
                <option value="research_grant">Research Grant</option>
                <option value="comprehensive">Comprehensive Package</option>
              </select>
            </div>

            <div>
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Amount per Recipient (₦) *</label
              >
              <input
                id="amount"
                v-model.number="form.amount"
                type="number"
                required
                min="10000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="500000"
              />
            </div>

            <div>
              <label
                for="duration"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Duration *</label
              >
              <select
                id="duration"
                v-model="form.duration"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select duration</option>
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Years</option>
                <option value="3 years">3 Years</option>
                <option value="4 years">4 Years</option>
                <option value="5 years">5 Years</option>
                <option value="until_graduation">Until Graduation</option>
              </select>
            </div>

            <div>
              <label
                for="numberOfAwards"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Number of Awards *</label
              >
              <input
                id="numberOfAwards"
                v-model.number="form.numberOfAwards"
                type="number"
                required
                min="1"
                max="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="5"
              />
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
              placeholder="Describe the scholarship program, its mission, and what you're looking for in recipients..."
            ></textarea>
          </div>
        </div>

        <!-- Eligibility Criteria -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Eligibility Criteria
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Schools -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Eligible Schools</label
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
                >Eligible Courses</label
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
              </div>
            </div>

            <!-- GPA Requirement -->
            <div>
              <label
                for="minGPA"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Minimum GPA Required</label
              >
              <input
                id="minGPA"
                v-model.number="form.criteria.minGPA"
                type="number"
                step="0.01"
                min="0"
                max="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="3.5"
              />
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

            <!-- Additional Criteria -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Additional Requirements</label
              >
              <div class="space-y-2">
                <label class="inline-flex items-center">
                  <input
                    v-model="form.criteria.financialNeed"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-900"
                    >Financial need required</span
                  >
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="form.criteria.academicExcellence"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-900"
                    >Academic excellence required</span
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Process -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Application Process
          </h2>

          <div class="space-y-4">
            <div
              v-for="(step, index) in form.applicationProcess"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Step {{ step.step }}: {{ step.title }}
                </h3>
                <button
                  type="button"
                  @click="removeProcessStep(index)"
                  class="text-red-600 hover:text-red-800"
                  :disabled="form.applicationProcess.length === 1"
                >
                  <svg
                    class="w-5 h-5"
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

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Step Title</label
                  >
                  <input
                    v-model="step.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Document Review"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Duration</label
                  >
                  <input
                    v-model="step.duration"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2 weeks"
                  />
                </div>
                <div class="md:col-span-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Description</label
                  >
                  <textarea
                    v-model="step.description"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe what happens in this step"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="addProcessStep"
              class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            >
              <svg
                class="w-4 h-4 mr-1"
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
              Add Process Step
            </button>
          </div>
        </div>

        <!-- Requirements -->
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
        </div>

        <!-- Benefits and Obligations -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Benefits -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
              Scholarship Benefits
            </h2>

            <div>
              <div class="space-y-2">
                <div class="flex">
                  <input
                    v-model="newBenefit"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Full tuition coverage"
                    @keyup.enter="addBenefit"
                  />
                  <button
                    type="button"
                    @click="addBenefit"
                    class="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(benefit, index) in form.benefits"
                    :key="index"
                    class="flex items-center justify-between p-3 bg-green-50 rounded-md"
                  >
                    <span class="text-sm text-gray-900">{{ benefit }}</span>
                    <button
                      type="button"
                      @click="removeBenefit(index)"
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
          </div>

          <!-- Obligations -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
              Recipient Obligations
            </h2>

            <div>
              <div class="space-y-2">
                <div class="flex">
                  <input
                    v-model="newObligation"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Maintain minimum GPA of 3.5"
                    @keyup.enter="addObligation"
                  />
                  <button
                    type="button"
                    @click="addObligation"
                    class="px-4 py-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-700"
                  >
                    Add
                  </button>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(obligation, index) in form.obligations"
                    :key="index"
                    class="flex items-center justify-between p-3 bg-orange-50 rounded-md"
                  >
                    <span class="text-sm text-gray-900">{{ obligation }}</span>
                    <button
                      type="button"
                      @click="removeObligation(index)"
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
          </div>
        </div>

        <!-- Preview -->
        <div class="space-y-6 border-t pt-6">
          <h2 class="text-xl font-semibold text-gray-900">Preview</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ form.title || "Scholarship Title" }}
                </h3>
                <p class="text-sm text-gray-600">
                  by {{ authStore.user?.name || "Your Name" }}
                </p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-purple-600">
                  ₦{{ form.amount?.toLocaleString() || "0" }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ form.type || "Scholarship Type" }}
                </div>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              {{
                form.description ||
                "Scholarship description will appear here..."
              }}
            </p>

            <div class="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span class="font-medium text-gray-900">Duration:</span>
                <span class="ml-2">{{ form.duration || "Not set" }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-900">Awards Available:</span>
                <span class="ml-2">{{ form.numberOfAwards || 0 }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-900">Deadline:</span>
                <span class="ml-2">{{
                  formatDate(form.deadline) || "Not set"
                }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-900">Min GPA:</span>
                <span class="ml-2">{{
                  form.criteria.minGPA || "Not specified"
                }}</span>
              </div>
            </div>

            <div v-if="form.applicationProcess.length" class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">
                Application Process:
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="step in form.applicationProcess"
                  :key="step.step"
                  class="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded"
                >
                  {{ step.step }}. {{ step.title }}
                </span>
              </div>
            </div>

            <div v-if="form.benefits.length" class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">Benefits:</h4>
              <ul class="text-sm text-gray-700 list-disc list-inside">
                <li v-for="benefit in form.benefits.slice(0, 3)" :key="benefit">
                  {{ benefit }}
                </li>
                <li v-if="form.benefits.length > 3" class="text-gray-500">
                  +{{ form.benefits.length - 3 }} more benefits
                </li>
              </ul>
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
              class="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? "Creating Scholarship..." : "Create Scholarship" }}
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
import { useScholarshipsStore } from "../../../stores/scholarships";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { navigationItems } from "../../../lib/data/navItems";

const router = useRouter();
const authStore = useAuthStore();
const scholarshipsStore = useScholarshipsStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const newSchool = ref("");
const newCourse = ref("");
const newRequirement = ref("");
const newBenefit = ref("");
const newObligation = ref("");

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
  type: "",
  amount: "",
  duration: "",
  numberOfAwards: "",
  deadline: "",
  criteria: {
    schools: [],
    courses: [],
    levels: [],
    minGPA: "",
    gender: "any",
    financialNeed: false,
    academicExcellence: false,
  },
  requirements: [
    "Academic transcripts",
    "Personal statement",
    "Two recommendation letters",
  ],
  applicationProcess: [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete online application form",
      duration: "1 week",
    },
    {
      step: 2,
      title: "Document Review",
      description: "Submit and verify required documents",
      duration: "2 weeks",
    },
    {
      step: 3,
      title: "Final Decision",
      description: "Scholarship award notification",
      duration: "1 week",
    },
  ],
  benefits: [
    "Financial support as specified",
    "Mentorship opportunities",
    "Academic guidance",
  ],
  obligations: [
    "Maintain academic performance",
    "Submit progress reports",
    "Participate in program activities",
  ],
});

const isFormValid = computed(
  () =>
    form.title &&
    form.description &&
    form.type &&
    form.amount &&
    form.duration &&
    form.numberOfAwards &&
    form.deadline
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

const addBenefit = () => {
  if (
    newBenefit.value.trim() &&
    !form.benefits.includes(newBenefit.value.trim())
  ) {
    form.benefits.push(newBenefit.value.trim());
    newBenefit.value = "";
  }
};

const removeBenefit = (index) => {
  form.benefits.splice(index, 1);
};

const addObligation = () => {
  if (
    newObligation.value.trim() &&
    !form.obligations.includes(newObligation.value.trim())
  ) {
    form.obligations.push(newObligation.value.trim());
    newObligation.value = "";
  }
};

const removeObligation = (index) => {
  form.obligations.splice(index, 1);
};

const addProcessStep = () => {
  const newStep = form.applicationProcess.length + 1;
  form.applicationProcess.push({
    step: newStep,
    title: "",
    description: "",
    duration: "",
  });
};

const removeProcessStep = (index) => {
  if (form.applicationProcess.length > 1) {
    form.applicationProcess.splice(index, 1);
    // Renumber steps
    form.applicationProcess.forEach((step, idx) => {
      step.step = idx + 1;
    });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    const scholarshipData = {
      sponsorId: authStore.user.id,
      sponsorName: authStore.user.name,
      sponsorAvatar: authStore.user.avatar,
      title: form.title,
      description: form.description,
      type: form.type,
      amount: form.amount,
      duration: form.duration,
      numberOfAwards: form.numberOfAwards,
      criteria: form.criteria,
      requirements: form.requirements,
      applicationProcess: form.applicationProcess,
      benefits: form.benefits,
      obligations: form.obligations,
      deadline: form.deadline,
    };

    const newScholarship = await scholarshipsStore.createScholarship(
      scholarshipData
    );

    console.log(newScholarship);

    // notificationStore.addNotification({
    //   type: "success",
    //   title: "Scholarship created successfully!",
    //   message:
    //     "Your scholarship program is now live and accepting applications.",
    // });

    // router.push(`/scholarships/${newScholarship.id}`);
  } catch (error) {
    console.error("Error creating scholarship:", error);
    console.log("Error creating scholarship:", error);
    // notificationStore.addNotification({
    //   type: "error",
    //   title: "Failed to create scholarship",
    //   message:
    //     "An error occurred while creating your scholarship. Please try again.",
    // });
  } finally {
    loading.value = false;
  }
};
</script>
