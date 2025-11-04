<template>
  <Sidebar :navigation-items="navigationItems" page-title="My Offers">
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">My Offers</h1>
              <p class="text-sm text-gray-500">
                Manage your funding opportunities and review applications
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="router.push('/sponsor/offers/create')"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Create Offer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-coral-100 rounded-lg">
                <DocumentTextIcon class="w-6 h-6 text-coral-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Offers</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ activeOffers }}
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
                  <label for="search" class="sr-only">Search offers</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      v-model="searchQuery"
                      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                      placeholder="Search offers"
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

                <!-- Type Filter -->
                <div>
                  <h3 class="text-sm font-medium text-gray-900 mb-2">Type</h3>
                  <div class="space-y-2">
                    <label v-for="type in offerTypes" :key="type" class="flex items-center">
                      <input
                        type="checkbox"
                        v-model="selectedTypes"
                        :value="type"
                        class="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                      <span class="ml-2 text-sm text-gray-700">{{ type }}</span>
                    </label>
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

          <!-- Offers Grid -->
          <div class="flex-1">
            <div v-if="loading" class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
            </div>

            <div v-else-if="filteredOffers.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No offers found</h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ selectedStatus.length > 0 || selectedTypes.length > 0 ? 'Try adjusting your filters' : 'Get started by creating a new offer' }}
              </p>
              <div class="mt-6">
                <button
                  @click="router.push('/sponsor/offers/create')"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coral-600 hover:bg-coral-700"
                >
                  <PlusIcon class="w-5 h-5 mr-2" />
                  Create Offer
                </button>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 gap-6">
              <div
                v-for="offer in filteredOffers"
                :key="offer.id"
                class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div class="p-6">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        {{ offer.offerTitle }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                        {{ offer.description }}
                      </p>
                    </div>
                    <span
                      :class="[
                        offer.status === 'active' ? 'bg-green-100 text-green-800' : 
                        offer.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800',
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                      ]"
                    >
                      {{ offer.status.charAt(0).toUpperCase() + offer.status.slice(1) }}
                    </span>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Amount</dt>
                      <dd class="mt-1 text-sm font-semibold text-gray-900">${{ offer.amount.toLocaleString() }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Duration</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ offer.duration }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Type</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ offer.type }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Deadline</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ formatDate(offer.deadline) }}</dd>
                    </div>
                  </div>

                  <div class="mt-4">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="major in offer.targetMajors.slice(0, 3)"
                        :key="major"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ major }}
                      </span>
                      <span
                        v-if="offer.targetMajors.length > 3"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        +{{ offer.targetMajors.length - 3 }} more
                      </span>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-end space-x-4">
                    <button
                      @click="viewOffer(offer.id)"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-coral-600 bg-coral-50 hover:bg-coral-100"
                    >
                      View Details
                    </button>
                    <button
                      @click="viewApplications(offer.id)"
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
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOffersStore } from '../../../stores/offers.js';
import { useNotificationStore } from '../../../stores/notifications.js';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems.ts';
import { mockOffers } from '../../../lib/data/mockOffers.ts';
import {
  PlusIcon,
  DocumentTextIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();
const offersStore = useOffersStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const offers = ref(mockOffers);
const searchQuery = ref('');
const selectedStatus = ref([]);
const selectedTypes = ref([]);

// Status options
const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Closed', value: 'closed' }
];

// Offer types
const offerTypes = [
  'Internship Support',
  'Fellowship',
  'Research Grant',
  'Travel Grant',
  'Project Funding',
  'Professional Development',
  'Study Abroad',
  'Other'
];

// Stats computations
const activeOffers = computed(() => 
  offers.value.filter(o => o.status === 'active').length
);

const totalApplicants = computed(() => 
  offers.value.reduce((sum, o) => sum + (o.applicantCount || 0), 0)
);

const totalFunding = computed(() => 
  offers.value.reduce((sum, o) => sum + o.amount, 0)
);

const closingSoon = computed(() => {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  return offers.value.filter(o => 
    new Date(o.deadline) <= thirtyDaysFromNow && 
    new Date(o.deadline) > new Date() && 
    o.status === 'active'
  ).length;
});

// Filtered offers
const filteredOffers = computed(() => {
  return offers.value.filter(offer => {
    // Status filter
    if (selectedStatus.value.length > 0 && !selectedStatus.value.includes(offer.status)) {
      return false;
    }

    // Type filter
    if (selectedTypes.value.length > 0 && !selectedTypes.value.includes(offer.type)) {
      return false;
    }

    // Search query
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase();
      return (
        offer.offerTitle.toLowerCase().includes(search) ||
        offer.description.toLowerCase().includes(search) ||
        offer.type.toLowerCase().includes(search)
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

const viewOffer = (id) => {
  router.push(`/sponsor/offers/${id}`);
};

const viewApplications = (id) => {
  router.push(`/sponsor/manage-applications?offerId=${id}`);
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedStatus.value = [];
  selectedTypes.value = [];
};

onMounted(async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch from the API
    // const response = await offersStore.fetchOffers();
    // offers.value = response.data;
  } catch (error) {
    notificationStore.showError('Failed to load offers');
  } finally {
    loading.value = false;
  }
});
</script>
