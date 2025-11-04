<template>
  <Sidebar :navigation-items="navigationItems" :page-title="offer?.offerTitle || 'Offer Details'">
    <div class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>

      <div v-else-if="offer" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="bg-white shadow-sm rounded-lg px-8 py-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-4">
                <h1 class="text-2xl font-bold text-gray-900">{{ offer.offerTitle }}</h1>
                <span
                  :class="[
                    offer.status === 'active' ? 'bg-green-100 text-green-800' : 
                    offer.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800',
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
                  ]"
                >
                  {{ offer.status.charAt(0).toUpperCase() + offer.status.slice(1) }}
                </span>
              </div>
              <p class="mt-2 text-gray-600">{{ offer.description }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                v-if="offer.status === 'draft'"
                @click="publishOffer"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <CheckIcon class="w-5 h-5 mr-2" />
                Publish
              </button>
              <button
                v-if="offer.status === 'active'"
                @click="closeOffer"
                class="inline-flex items-center px-4 py-2 border border-red-600 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XMarkIcon class="w-5 h-5 mr-2" />
                Close Applications
              </button>
              <button
                v-if="offer.status !== 'closed'"
                @click="editOffer"
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
                <DocumentTextIcon class="w-6 h-6 text-coral-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Type</p>
                <p class="text-lg font-bold text-gray-900">
                  {{ offer.type }}
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
                <p class="text-sm font-medium text-gray-600">Amount</p>
                <p class="text-lg font-bold text-gray-900">
                  ${{ offer.amount.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <ClockIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Duration</p>
                <p class="text-lg font-bold text-gray-900">
                  {{ offer.duration }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-amber-100 rounded-lg">
                <CalendarIcon class="w-6 h-6 text-amber-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Deadline</p>
                <p class="text-lg font-bold text-gray-900">
                  {{ formatDate(offer.deadline) }}
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
                <h3 class="text-lg font-medium text-gray-900 mb-4">Offer Details</h3>
                <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Application Process</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ offer.applicationProcess }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ formatDate(offer.createdAt) }}</dd>
                  </div>
                  <div class="md:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Requirements</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ offer.requirements }}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Target Majors</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="major in offer.targetMajors"
                    :key="major"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ major }}
                  </span>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Benefits</h3>
                <ul class="space-y-2">
                  <li
                    v-for="benefit in offer.additionalBenefits"
                    :key="benefit"
                    class="flex items-center text-sm text-gray-900"
                  >
                    <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
                    {{ benefit }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Applications Tab -->
            <div v-else-if="currentTab === 'applications'" class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Applications</h3>
                  <p class="text-sm text-gray-500 mt-1">Review and manage applications for this offer</p>
                </div>
                <button
                  @click="router.push(`/sponsor/manage-applications?offerId=${offer.id}`)"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Applications
                </button>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      Total Applications: {{ offer.applicantCount || 0 }}
                    </p>
                  </div>
                </div>
                <!-- Applications list would go here -->
                <p class="text-gray-500 text-sm">
                  Recent applications will be displayed here...
                </p>
              </div>
            </div>

            <!-- Settings Tab -->
            <div v-else-if="currentTab === 'settings'" class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Offer Settings</h3>
                <div class="space-y-4">
                  <button
                    @click="editOffer"
                    class="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-900">Edit Offer Details</p>
                      <p class="text-sm text-gray-500">Update offer information and requirements</p>
                    </div>
                    <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    v-if="offer.status === 'active'"
                    @click="closeOffer"
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">Offer not found</h3>
          <p class="mt-1 text-sm text-gray-500">
            The offer you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <div class="mt-6">
            <button
              @click="router.push('/sponsor/offers')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700"
            >
              Back to Offers
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
import { useOffersStore } from '../../../stores/offers.js';
import { useNotificationStore } from '../../../stores/notifications.js';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems.ts';
import { mockOffers } from '../../../lib/data/mockOffers.ts';
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const offersStore = useOffersStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const offer = ref(null);
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

const loadOffer = async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch from the API
    // const response = await offersStore.getOfferById(route.params.id);
    // offer.value = response.data;
    
    // Using mock data for now
    offer.value = mockOffers.find(o => o.id === parseInt(route.params.id));
    
    if (!offer.value) {
      notificationStore.showError('Offer not found');
    }
  } catch (error) {
    notificationStore.showError('Failed to load offer details');
  } finally {
    loading.value = false;
  }
};

const publishOffer = async () => {
  try {
    // In a real application, we would call the API
    offer.value.status = 'active';
    notificationStore.showSuccess('Offer published successfully');
  } catch (error) {
    notificationStore.showError('Failed to publish offer');
  }
};

const closeOffer = async () => {
  try {
    // In a real application, we would call the API
    offer.value.status = 'closed';
    notificationStore.showSuccess('Offer applications closed');
  } catch (error) {
    notificationStore.showError('Failed to close offer');
  }
};

const editOffer = () => {
  router.push(`/sponsor/offers/edit/${offer.value.id}`);
};

onMounted(() => {
  loadOffer();
});
</script>
