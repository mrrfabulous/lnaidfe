<template>
  <Sidebar
    :navigation-items="navigationItems"
    page-title="Sponsor Scholarships"
    page-subtitle="Manage all your scholarships"
  >
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Scholarship Programs</h1>
            <p class="text-gray-600 mt-1">
              Manage your scholarship opportunities and review applications
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="router.push('/sponsor/scholarships/create')"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Create Scholarship
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-coral-100 rounded-lg">
              <AcademicCapIcon class="w-6 h-6 text-coral-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Active Programs</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ activeScholarships }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <UsersIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Applicants</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ totalApplicants }}
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
              <p class="text-sm font-medium text-gray-600">Total Funding</p>
              <p class="text-2xl font-bold text-gray-900">
                ${{ totalFunding.toLocaleString() }}
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
              <p class="text-sm font-medium text-gray-600">Closing Soon</p>
              <p class="text-2xl font-bold text-gray-900">{{ closingSoon }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <div class="space-y-6">
              <!-- Search -->
              <div>
                <label for="search" class="sr-only">Search scholarships</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    v-model="searchQuery"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                    placeholder="Search scholarships"
                    type="search"
                  />
                </div>
              </div>

              <!-- Status Filter -->
              <div>
                <h3 class="text-sm font-medium text-gray-900 mb-2">Status</h3>
                <div class="space-y-2">
                  <label v-for="status in statusOptions" :key="status.value" class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="selectedStatus"
                      :value="status.value"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ status.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Amount Range -->
              <div>
                <h3 class="text-sm font-medium text-gray-900 mb-2">Amount Range</h3>
                <div class="space-y-2">
                  <input
                    type="number"
                    v-model="minAmount"
                    placeholder="Min Amount"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="number"
                    v-model="maxAmount"
                    placeholder="Max Amount"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <!-- Clear Filters -->
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Scholarships Grid -->
        <div class="flex-1">
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
          </div>

          <div v-else-if="filteredScholarships.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No scholarships found</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ selectedStatus.length > 0 ? 'Try adjusting your filters' : 'Get started by creating a new scholarship' }}
            </p>
            <div class="mt-6">
              <button
                @click="router.push('/sponsor/scholarships/create')"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coral-600 hover:bg-coral-700"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Create Scholarship
              </button>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 gap-6">
            <div
              v-for="scholarship in filteredScholarships"
              :key="scholarship.id"
              class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div class="p-6">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ scholarship.title }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                      {{ scholarship.description }}
                    </p>
                  </div>
                  <span
                    :class="[
                      scholarship.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                    ]"
                  >
                    {{ scholarship.status }}
                  </span>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Amount</dt>
                    <dd class="mt-1 text-sm font-semibold text-gray-900">${{ scholarship.amount.toLocaleString() }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Deadline</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ formatDate(scholarship.deadline) }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Applicants</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ scholarship.applicantCount }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Created</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ formatDate(scholarship.createdAt) }}</dd>
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-end space-x-4">
                  <button
                    @click="viewScholarship(scholarship.id)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-coral-600 bg-coral-50 hover:bg-coral-100"
                  >
                    View Details
                  </button>
                  <button
                    @click="viewApplications(scholarship.id)"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Review Applications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import { useScholarshipsStore } from "../../../stores/scholarships";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { navigationItems } from "../../../lib/data/navItems";
import { mockScholarships } from "../../../lib/data/mockScholarships";
import {
  AcademicCapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PlusIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const authStore = useAuthStore();
const scholarshipsStore = useScholarshipsStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const scholarshipsList = ref(mockScholarships);
const searchQuery = ref("");
const selectedStatus = ref([]);
const minAmount = ref("");
const maxAmount = ref("");

// Stats computations
const activeScholarships = computed(() => 
  scholarshipsList.value.filter(s => s.status === 'active').length
);

const totalApplicants = computed(() => 
  scholarshipsList.value.reduce((sum, s) => sum + s.applicantCount, 0)
);

const totalFunding = computed(() => 
  scholarshipsList.value.reduce((sum, s) => sum + s.amount, 0)
);

const closingSoon = computed(() => {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  return scholarshipsList.value.filter(s => 
    new Date(s.deadline) <= thirtyDaysFromNow && 
    new Date(s.deadline) > new Date() && 
    s.status === 'active'
  ).length;
});

// Filter options
const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Closed", value: "closed" },
  { label: "Under Review", value: "review" }
];

// Filtered scholarships
const filteredScholarships = computed(() => {
  return scholarshipsList.value.filter(scholarship => {
    // Status filter
    if (selectedStatus.value.length > 0 && !selectedStatus.value.includes(scholarship.status)) {
      return false;
    }

    // Amount filter
    if (minAmount.value && scholarship.amount < parseInt(minAmount.value)) {
      return false;
    }
    if (maxAmount.value && scholarship.amount > parseInt(maxAmount.value)) {
      return false;
    }

    // Search query
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase();
      return (
        scholarship.title.toLowerCase().includes(search) ||
        scholarship.description.toLowerCase().includes(search)
      );
    }

    return true;
  });
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const viewScholarship = (id) => {
  router.push(`/sponsor/scholarships/${id}`);
};

const viewApplications = (id) => {
  router.push(`/sponsor/manage-applications?scholarshipId=${id}`);
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = [];
  minAmount.value = "";
  maxAmount.value = "";
};

onMounted(async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch the scholarships from the API
    // const response = await scholarshipsStore.getScholarships();
    // scholarshipsList.value = response.data;
  } catch (error) {
    notificationStore.showError("Failed to load scholarships");
  } finally {
    loading.value = false;
  }
});
</script>
