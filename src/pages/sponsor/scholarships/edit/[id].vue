<template>
  <Sidebar :navigation-items="navigationItems" page-title="Edit Scholarship">
    <div class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>

      <div v-else-if="scholarship" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Form Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Edit Scholarship</h1>
          <p class="mt-2 text-sm text-gray-600">
            Update your scholarship details and requirements
          </p>
        </div>

        <!-- Edit Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Basic Information -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div class="space-y-6">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">
                  Scholarship Title*
                </label>
                <input
                  type="text"
                  id="title"
                  v-model="formData.title"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
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
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-700">
                    Award Amount ($)*
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
                  <label for="awardsAvailable" class="block text-sm font-medium text-gray-700">
                    Number of Awards*
                  </label>
                  <input
                    type="number"
                    id="awardsAvailable"
                    v-model="formData.awardsAvailable"
                    min="1"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements and Deadlines -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Requirements and Deadlines</h2>
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
                  placeholder="List the eligibility requirements and necessary qualifications..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  <label for="category" class="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <select
                    id="category"
                    v-model="formData.category"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  >
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Settings -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Additional Settings</h2>
            <div class="space-y-6">
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
                  Changing status to "Active" will make the scholarship visible to students
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">Scholarship not found</h3>
          <p class="mt-1 text-sm text-gray-500">
            The scholarship you're trying to edit doesn't exist or you don't have permission to edit it.
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScholarshipsStore } from '../../../../stores/scholarships.js';
import { useNotificationStore } from '../../../../stores/notifications.js';
import Sidebar from '../../../../components/Sidebar.vue';
import { navigationItems } from '../../../../lib/data/navItems.ts';
import { mockScholarships } from '../../../../lib/data/mockScholarships.ts';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const scholarshipsStore = useScholarshipsStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const scholarship = ref(null);

// Form data with default values
const formData = ref({
  title: '',
  description: '',
  amount: 0,
  awardsAvailable: 1,
  requirements: '',
  deadline: '',
  category: '',
  status: 'draft'
});

// Categories list
const categories = [
  'STEM',
  'Arts',
  'Humanities',
  'Business',
  'Healthcare',
  'Engineering',
  'Technology',
  'Leadership',
  'Environment',
  'Other'
];

// Compute minimum date for deadline (today)
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// Load scholarship data
const loadScholarship = async () => {
  try {
    loading.value = true;
    // In a real application, we would fetch from the API
    // const response = await scholarshipsStore.getScholarshipById(route.params.id);
    // scholarship.value = response.data;
    
    // Using mock data for now
    scholarship.value = mockScholarships.find(s => s.id === parseInt(route.params.id));
    
    if (scholarship.value) {
      // Populate form data
      formData.value = {
        title: scholarship.value.title,
        description: scholarship.value.description,
        amount: scholarship.value.amount,
        awardsAvailable: scholarship.value.awardsAvailable,
        requirements: scholarship.value.requirements,
        deadline: scholarship.value.deadline.split('T')[0], // Format date for input
        category: scholarship.value.category,
        status: scholarship.value.status
      };
    } else {
      notificationStore.showError('Scholarship not found');
    }
  } catch (error) {
    notificationStore.showError('Failed to load scholarship details');
  } finally {
    loading.value = false;
  }
};

// Form submission handler
const handleSubmit = async () => {
  try {
    // In a real application, we would call the API
    // await scholarshipsStore.updateScholarship(route.params.id, formData.value);
    
    // Update mock data
    const index = mockScholarships.findIndex(s => s.id === parseInt(route.params.id));
    if (index !== -1) {
      mockScholarships[index] = {
        ...mockScholarships[index],
        ...formData.value
      };
    }
    
    notificationStore.showSuccess('Scholarship updated successfully');
    router.push(`/sponsor/scholarships/${route.params.id}`);
  } catch (error) {
    notificationStore.showError('Failed to update scholarship');
  }
};

// Cancel edit handler
const cancelEdit = () => {
  router.push(`/sponsor/scholarships/${route.params.id}`);
};

onMounted(() => {
  loadScholarship();
});
</script>
