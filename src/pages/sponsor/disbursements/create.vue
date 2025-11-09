<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Record Disbursement">
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Record Disbursement</h1>
          <p class="mt-2 text-sm text-gray-600">
            Record a new disbursement for an offer or scholarship beneficiary
          </p>
        </div>

        <!-- Disbursement Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Program Selection -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Program Information</h2>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Program Type*
                </label>
                <div class="flex space-x-4">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="formData.programType"
                      value="offer"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Offer</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="formData.programType"
                      value="scholarship"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Scholarship</span>
                  </label>
                </div>
              </div>

              <div v-if="formData.programType">
                <label :for="formData.programType" class="block text-sm font-medium text-gray-700">
                  Select {{ formData.programType === 'offer' ? 'Offer' : 'Scholarship' }}*
                </label>
                <select
                  :id="formData.programType"
                  v-model="formData.programId"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                >
                  <option value="">Select a {{ formData.programType }}</option>
                  <option
                    v-for="program in availablePrograms"
                    :key="program.id"
                    :value="program.id"
                  >
                    {{ program.title }}
                  </option>
                </select>
              </div>

              <div v-if="formData.programId">
                <label for="beneficiary" class="block text-sm font-medium text-gray-700">
                  Select Beneficiary*
                </label>
                <select
                  id="beneficiary"
                  v-model="formData.beneficiaryId"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                >
                  <option value="">Select a beneficiary</option>
                  <option
                    v-for="beneficiary in availableBeneficiaries"
                    :key="beneficiary.id"
                    :value="beneficiary.id"
                  >
                    {{ beneficiary.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Disbursement Details -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Disbursement Details</h2>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Disbursement Type*
                </label>
                <div class="flex space-x-4">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="formData.disbursementType"
                      value="monetary"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Monetary</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="formData.disbursementType"
                      value="non-monetary"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Non-Monetary</span>
                  </label>
                </div>
              </div>

              <div v-if="formData.disbursementType === 'monetary'">
                <label for="amount" class="block text-sm font-medium text-gray-700">
                  Amount ($)*
                </label>
                <input
                  type="number"
                  id="amount"
                  v-model="formData.amount"
                  min="0"
                  step="0.01"
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
                  rows="3"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  placeholder="Describe the disbursement details"
                ></textarea>
              </div>

              <div>
                <label for="disbursementDate" class="block text-sm font-medium text-gray-700">
                  Disbursement Date*
                </label>
                <input
                  type="date"
                  id="disbursementDate"
                  v-model="formData.disbursementDate"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="proofUpload" class="block text-sm font-medium text-gray-700">
                  Proof of Disbursement
                </label>
                <DocumentUpload
                  id="proofUpload"
                  v-model="formData.proofOfDisbursement"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :maxSize="5"
                />
                <p class="mt-2 text-xs text-gray-500">
                  Upload proof of disbursement (receipts, reports, etc.). Max 5MB.
                </p>
              </div>

              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  v-model="formData.notes"
                  rows="2"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
                  placeholder="Any additional information about the disbursement"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end space-x-4">
            <button
              type="button"
              @click="router.push('/sponsor/disbursements')"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 disabled:opacity-50"
            >
              <span v-if="loading" class="mr-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </span>
              Record Disbursement
            </button>
          </div>
        </form>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisbursementsStore } from '../../../stores/disbursements.ts';
import { useNotificationStore } from '../../../stores/notifications';
import Sidebar from '../../../components/Sidebar.vue';
import DocumentUpload from '../../../components/DocumentUpload.vue';
import { sponsorNavigationItems } from '../../../lib/data/navItems';
import { mockOffers } from '../../../lib/data/mockOffers';
import { mockScholarships } from '../../../lib/data/mockScholarships';

const router = useRouter();
const disbursementsStore = useDisbursementsStore();
const notificationStore = useNotificationStore();

const loading = ref(false);

const formData = ref({
  programType: '',
  programId: '',
  beneficiaryId: '',
  disbursementType: '',
  amount: null,
  description: '',
  disbursementDate: '',
  proofOfDisbursement: null,
  notes: '',
});

// In a real app, this would come from the API based on the selected program
const availablePrograms = computed(() => {
  if (formData.value.programType === 'offer') {
    return mockOffers.map(offer => ({
      id: offer.id,
      title: offer.offerTitle
    }));
  } else if (formData.value.programType === 'scholarship') {
    return mockScholarships.map(scholarship => ({
      id: scholarship.id,
      title: scholarship.title
    }));
  }
  return [];
});

// In a real app, this would come from the API based on the selected program
const availableBeneficiaries = computed(() => {
  // Mock beneficiaries for now
  return [
    { id: 101, name: 'John Smith' },
    { id: 102, name: 'Sarah Johnson' },
    { id: 103, name: 'Maria Garcia' }
  ];
});

const handleSubmit = async () => {
  try {
    loading.value = true;

    const disbursementData = {
      beneficiaryId: formData.value.beneficiaryId,
      beneficiaryName: availableBeneficiaries.value.find(b => b.id === formData.value.beneficiaryId)?.name,
      disbursementType: formData.value.disbursementType,
      description: formData.value.description,
      disbursementDate: formData.value.disbursementDate,
      status: 'pending',
      notes: formData.value.notes || undefined,
      proofOfDisbursement: formData.value.proofOfDisbursement
    };

    if (formData.value.programType === 'offer') {
      disbursementData.offerId = formData.value.programId;
      disbursementData.offerTitle = availablePrograms.value.find(p => p.id === formData.value.programId)?.title;
    } else {
      disbursementData.scholarshipId = formData.value.programId;
      disbursementData.scholarshipTitle = availablePrograms.value.find(p => p.id === formData.value.programId)?.title;
    }

    if (formData.value.disbursementType === 'monetary') {
      disbursementData.amount = parseFloat(formData.value.amount);
    }

    await disbursementsStore.createDisbursement(disbursementData);
    notificationStore.showSuccess('Disbursement recorded successfully');
    router.push('/sponsor/disbursements');
  } catch (error) {
    notificationStore.showError('Failed to record disbursement');
  } finally {
    loading.value = false;
  }
};
</script>
