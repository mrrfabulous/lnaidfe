<template>
  <Sidebar :navigation-items="navigationItems" :page-title="scholarship?.title || 'Scholarship Details'">
    <div class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>

      <div v-else-if="scholarship" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="bg-white shadow-sm rounded-lg px-8 py-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-4">
                <h1 class="text-2xl font-bold text-gray-900">{{ scholarship.title }}</h1>
                <span
                  :class="[
                    scholarship.status === 'active' ? 'bg-green-100 text-green-800' : 
                    scholarship.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    scholarship.status === 'closed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800',
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
                  ]"
                >
                  {{ scholarship.status.charAt(0).toUpperCase() + scholarship.status.slice(1) }}
                </span>
              </div>
              <p class="mt-2 text-gray-600">{{ scholarship.description }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                v-if="scholarship.status === 'draft'"
                @click="publishScholarship"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <CheckIcon class="w-5 h-5 mr-2" />
                Publish
              </button>
              <button
                v-if="scholarship.status === 'active'"
                @click="closeScholarship"
                class="inline-flex items-center px-4 py-2 border border-red-600 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XMarkIcon class="w-5 h-5 mr-2" />
                Close Applications
              </button>
              <button
                v-if="scholarship.status !== 'closed'"
                @click="editScholarship"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <PencilIcon class="w-5 h-5 mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-coral-100 rounded-lg">
                <UsersIcon class="w-6 h-6 text-coral-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Applicants</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ scholarship.applicantCount }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <AcademicCapIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Awards Available</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ scholarship.awardsAvailable }}
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
                <p class="text-sm font-medium text-gray-600">Award Amount</p>
                <p class="text-2xl font-bold text-gray-900">
                  ${{ scholarship.amount.toLocaleString() }}
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
                <p class="text-sm font-medium text-gray-600">Application Deadline</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ formatDate(scholarship.deadline) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Tabs -->
        <div class="bg-white shadow-sm rounded-lg">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex" aria-label="Tabs">
              <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="currentTab = tab.id"
                :class="[
                  currentTab === tab.id
                    ? 'border-coral-500 text-coral-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm'
                ]"
              >
                <component
                  :is="tab.icon"
                  :class="[
                    currentTab === tab.id ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  ]"
                />
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-8">
            <!-- Overview Tab -->
            <div v-if="currentTab === 'overview'" class="space-y-8">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Scholarship Details</h3>
                <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Category</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ scholarship.category }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ formatDate(scholarship.createdAt) }}</dd>
                  </div>
                  <div class="md:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Requirements</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ scholarship.requirements }}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Application Progress</h3>
                <div class="bg-gray-50 rounded-lg p-6">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        Total Applications: {{ scholarship.applicantCount }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ scholarship.awardsAvailable }} positions available
                      </p>
                    </div>
                    <button
                      @click="router.push(`/sponsor/manage-applications?scholarshipId=${scholarship.id}`)"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
                    >
                      Review Applications
                    </button>
                  </div>
                  <div class="space-y-4">
                    <div>
                      <div class="flex items-center justify-between text-sm font-medium text-gray-900">
                        <span>Application Progress</span>
                        <span>{{ Math.round((scholarship.applicantCount / scholarship.awardsAvailable) * 100) }}%</span>
                      </div>
                      <div class="mt-2 relative">
                        <div class="overflow-hidden h-2 bg-gray-200 rounded">
                          <div
                            class="h-2 bg-coral-600 rounded"
                            :style="{ width: `${Math.min((scholarship.applicantCount / scholarship.awardsAvailable) * 100, 100)}%` }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Applications Tab -->
            <div v-else-if="currentTab === 'applications'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Recent Applications</h3>
                <button
                  @click="router.push(`/sponsor/manage-applications?scholarshipId=${scholarship.id}`)"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Applications
                </button>
              </div>

              <!-- Applications list would go here -->
              <p class="text-gray-500 text-sm">
                Recent applications will be displayed here...
              </p>
            </div>

            <!-- Settings Tab -->
            <div v-else-if="currentTab === 'settings'" class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Scholarship Settings</h3>
                <div class="space-y-4">
                  <button
                    @click="editScholarship"
                    class="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-900">Edit Scholarship Details</p>
                      <p class="text-sm text-gray-500">Update scholarship information and requirements</p>
                    </div>
                    <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    v-if="scholarship.status === 'active'"
                    @click="closeScholarship"
                    class="w-full flex items-center justify-between px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    <div>
                      <p class="text-sm font-medium text-red-600">Close Applications</p>
                      <p class="text-sm text-red-500">Stop accepting new applications</p>
                    </div>
                    <ChevronRightIcon class="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <ExclamationCircleIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Scholarship not found</h3>
          <p class="mt-1 text-sm text-gray-500">
            The scholarship you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <div class="mt-6">
            <button
              @click="router.push('/sponsor/scholarships')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700"
            >
              Back to Scholarships
            </button>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScholarshipsStore } from '../../../stores/scholarships.js';
import { useNotificationStore } from '../../../stores/notifications.js';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems.ts';
import { mockScholarships } from '../../../lib/data/mockScholarships.ts';
import {
  AcademicCapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const scholarshipsStore = useScholarshipsStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const scholarship = ref(null);
const currentTab = ref('overview');

const tabs = [
  { id: 'overview', name: 'Overview', icon: ClipboardDocumentListIcon },
  { id: 'applications', name: 'Applications', icon: UsersIcon },
  { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
];

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const loadScholarship = async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch from the API
    // const response = await scholarshipsStore.getScholarshipById(route.params.id);
    // scholarship.value = response.data;
    
    // Using mock data for now
    scholarship.value = mockScholarships.find(s => s.id === parseInt(route.params.id));
    
    if (!scholarship.value) {
      notificationStore.showError('Scholarship not found');
    }
  } catch (error) {
    notificationStore.showError('Failed to load scholarship details');
  } finally {
    loading.value = false;
  }
};

const publishScholarship = async () => {
  try {
    // In a real application, we would call the API
    scholarship.value.status = 'active';
    notificationStore.showSuccess('Scholarship published successfully');
  } catch (error) {
    notificationStore.showError('Failed to publish scholarship');
  }
};

const closeScholarship = async () => {
  try {
    // In a real application, we would call the API
    scholarship.value.status = 'closed';
    notificationStore.showSuccess('Scholarship applications closed');
  } catch (error) {
    notificationStore.showError('Failed to close scholarship');
  }
};

const editScholarship = () => {
  router.push(`/sponsor/scholarships/edit/${scholarship.value.id}`);
};

onMounted(() => {
  loadScholarship();
});
</script>
