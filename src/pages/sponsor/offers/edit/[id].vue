<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Edit Offer">
    <div class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>

      <div v-else-if="offer" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Form Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Edit Offer</h1>
          <p class="mt-2 text-sm text-gray-600">
            Update your offer details and requirements
          </p>
        </div>

        <!-- Edit Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Basic Information -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div class="space-y-6">
              <div>
                <label for="offerTitle" class="block text-sm font-medium text-gray-700">
                  Offer Title*
                </label>
                <input
                  type="text"
                  id="offerTitle"
                  v-model="formData.offerTitle"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  placeholder="e.g., Software Engineering Internship Grant"
                />
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="4"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  placeholder="Describe the purpose and benefits of this offer"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-700">
                    Amount ($)*
                  </label>
                  <input
                    type="number"
                    id="amount"
                    v-model="formData.amount"
                    min="0"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label for="duration" class="block text-sm font-medium text-gray-700">
                    Duration*
                  </label>
                  <input
                    type="text"
                    id="duration"
                    v-model="formData.duration"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                    placeholder="e.g., 3 months, 1 year"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="type" class="block text-sm font-medium text-gray-700">
                    Offer Type*
                  </label>
                  <select
                    id="type"
                    v-model="formData.type"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  >
                    <option v-for="type in offerTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="applicationProcess" class="block text-sm font-medium text-gray-700">
                    Application Process*
                  </label>
                  <select
                    id="applicationProcess"
                    v-model="formData.applicationProcess"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  >
                    <option value="Direct">Direct</option>
                    <option value="Competitive">Competitive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements and Eligibility -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Requirements and Eligibility</h2>
            <div class="space-y-6">
              <div>
                <label for="requirements" class="block text-sm font-medium text-gray-700">
                  Requirements*
                </label>
                <textarea
                  id="requirements"
                  v-model="formData.requirements"
                  rows="4"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  placeholder="List specific requirements and eligibility criteria"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Target Majors*
                </label>
                <div class="space-y-2">
                  <div v-for="(major, index) in formData.targetMajors" :key="index" class="flex items-center gap-2">
                    <input
                      type="text"
                      v-model="formData.targetMajors[index]"
                      class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                      placeholder="Enter major"
                    />
                    <button
                      type="button"
                      @click="removeMajor(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addMajor"
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    Add Major
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Additional Benefits
                </label>
                <div class="space-y-2">
                  <div v-for="(benefit, index) in formData.additionalBenefits" :key="index" class="flex items-center gap-2">
                    <input
                      type="text"
                      v-model="formData.additionalBenefits[index]"
                      class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                      placeholder="Enter benefit"
                    />
                    <button
                      type="button"
                      @click="removeBenefit(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addBenefit"
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    Add Benefit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Deadline and Status -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Deadline and Status</h2>
            <div class="space-y-6">
              <div>
                <label for="deadline" class="block text-sm font-medium text-gray-700">
                  Application Deadline*
                </label>
                <input
                  type="date"
                  id="deadline"
                  v-model="formData.deadline"
                  required
                  :min="minDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="status" class="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
                <p class="mt-2 text-sm text-gray-500">
                  Changing status to "Active" will make the offer visible to students
                </p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end space-x-4">
            <button
              type="button"
              @click="cancelEdit"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- Error State -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <ExclamationCircleIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Offer not found</h3>
          <p class="mt-1 text-sm text-gray-500">
            The offer you're trying to edit doesn't exist or you don't have permission to edit it.
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOffersStore } from '../../../../stores/offers.js';
import { useNotificationStore } from '../../../../stores/notifications.js';
import Sidebar from '../../../../components/Sidebar.vue';
import { sponsorNavigationItems } from '../../../../lib/data/navItems.ts';
import { mockOffers } from '../../../../lib/data/mockOffers.ts';
import {
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const offersStore = useOffersStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const offer = ref(null);

// Offer types list
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

// Form data with default values
const formData = ref({
  offerTitle: '',
  description: '',
  amount: 0,
  duration: '',
  type: '',
  requirements: '',
  deadline: '',
  status: 'draft',
  applicationProcess: 'Direct',
  targetMajors: [''],
  additionalBenefits: ['']
});

// Computed minimum date for deadline (today)
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// Load offer data
const loadOffer = async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch from the API
    // const response = await offersStore.getOfferById(route.params.id);
    // offer.value = response.data;
    
    // Using mock data for now
    offer.value = mockOffers.find(o => o.id === parseInt(route.params.id));
    
    if (offer.value) {
      // Populate form data
      formData.value = {
        offerTitle: offer.value.offerTitle,
        description: offer.value.description,
        amount: offer.value.amount,
        duration: offer.value.duration,
        type: offer.value.type,
        requirements: offer.value.requirements,
        deadline: offer.value.deadline.split('T')[0], // Format date for input
        status: offer.value.status,
        applicationProcess: offer.value.applicationProcess,
        targetMajors: [...offer.value.targetMajors],
        additionalBenefits: [...offer.value.additionalBenefits]
      };
    } else {
      notificationStore.showError('Offer not found');
    }
  } catch (error) {
    notificationStore.showError('Failed to load offer details');
  } finally {
    loading.value = false;
  }
};

// Add/remove target majors
const addMajor = () => {
  formData.value.targetMajors.push('');
};

const removeMajor = (index) => {
  if (formData.value.targetMajors.length > 1) {
    formData.value.targetMajors = formData.value.targetMajors.filter((_, i) => i !== index);
  }
};

// Add/remove additional benefits
const addBenefit = () => {
  formData.value.additionalBenefits.push('');
};

const removeBenefit = (index) => {
  if (formData.value.additionalBenefits.length > 1) {
    formData.value.additionalBenefits = formData.value.additionalBenefits.filter((_, i) => i !== index);
  }
};

// Form submission
const handleSubmit = async () => {
  try {
    // Clean up empty fields
    formData.value.targetMajors = formData.value.targetMajors.filter(major => major.trim());
    formData.value.additionalBenefits = formData.value.additionalBenefits.filter(benefit => benefit.trim());

    // In a real application, we would call the API
    // await offersStore.updateOffer(route.params.id, formData.value);
    
    // Update mock data
    const index = mockOffers.findIndex(o => o.id === parseInt(route.params.id));
    if (index !== -1) {
      mockOffers[index] = {
        ...mockOffers[index],
        ...formData.value
      };
    }
    
    notificationStore.showSuccess('Offer updated successfully');
    router.push(`/sponsor/offers/${route.params.id}`);
  } catch (error) {
    notificationStore.showError('Failed to update offer');
  }
};

// Cancel edit
const cancelEdit = () => {
  router.push(`/sponsor/offers/${route.params.id}`);
};

onMounted(() => {
  loadOffer();
});
</script>
