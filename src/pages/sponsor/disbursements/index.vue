<template>
  <Sidebar :navigation-items="navigationItems" page-title="Disbursements">
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Page Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">Disbursements</h1>
              <p class="mt-1 text-sm text-gray-500">
                Manage and track all disbursements for your offers and scholarships
              </p>
            </div>
            <div>
              <button
                @click="router.push('/sponsor/disbursements/create')"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700"
              >
                <PlusIcon class="h-5 w-5 mr-2" />
                Record Disbursement
              </button>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                v-model="filters.type"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="monetary">Monetary</option>
                <option value="non-monetary">Non-Monetary</option>
              </select>
            </div>
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                v-model="filters.status"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label for="dateRange" class="block text-sm font-medium text-gray-700">Date Range</label>
              <select
                id="dateRange"
                v-model="filters.dateRange"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                v-model="filters.search"
                placeholder="Search beneficiary or description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Disbursements Table -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div v-if="loading" class="p-4 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
          </div>

          <div v-else-if="filteredDisbursements.length === 0" class="p-8 text-center">
            <div class="text-gray-500">
              <DocumentIcon class="mx-auto h-12 w-12" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No disbursements found</h3>
              <p class="mt-1 text-sm text-gray-500">
                Get started by recording a new disbursement
              </p>
            </div>
          </div>

          <table v-else class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header.label }}
                </th>
                <th class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="disbursement in filteredDisbursements" :key="disbursement.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ disbursement.beneficiaryName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ID: {{ disbursement.beneficiaryId }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ disbursement.offerTitle || disbursement.scholarshipTitle }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ disbursement.offerId ? 'Offer' : 'Scholarship' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ disbursement.disbursementType === 'monetary' ? formatCurrency(disbursement.amount) : 'Non-monetary' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ new Date(disbursement.disbursementDate).toLocaleDateString() }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      {
                        'bg-green-100 text-green-800': disbursement.status === 'completed',
                        'bg-yellow-100 text-yellow-800': disbursement.status === 'pending',
                        'bg-red-100 text-red-800': disbursement.status === 'cancelled'
                      }
                    ]"
                  >
                    {{ disbursement.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="router.push(`/sponsor/disbursements/${disbursement.id}`)"
                    class="text-coral-600 hover:text-coral-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    v-if="disbursement.status === 'pending'"
                    @click="router.push(`/sponsor/disbursements/${disbursement.id}/edit`)"
                    class="text-coral-600 hover:text-coral-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDisbursementsStore } from '../../../stores/disbursements.ts';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems';
import {
  PlusIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const disbursementsStore = useDisbursementsStore();

const loading = computed(() => disbursementsStore.loading);
const disbursements = computed(() => disbursementsStore.disbursements);

const filters = ref({
  type: '',
  status: '',
  dateRange: '',
  search: ''
});

const tableHeaders = [
  { key: 'beneficiary', label: 'Beneficiary' },
  { key: 'program', label: 'Program' },
  { key: 'amount', label: 'Amount/Type' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const filteredDisbursements = computed(() => {
  let filtered = [...disbursements.value];

  if (filters.value.type) {
    filtered = filtered.filter(d => d.disbursementType === filters.value.type);
  }

  if (filters.value.status) {
    filtered = filtered.filter(d => d.status === filters.value.status);
  }

  if (filters.value.dateRange) {
    const now = new Date();
    const startDate = new Date();

    switch (filters.value.dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    filtered = filtered.filter(d => new Date(d.disbursementDate) >= startDate);
  }

  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(d =>
      d.beneficiaryName.toLowerCase().includes(searchTerm) ||
      d.description.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
});

onMounted(async () => {
  await disbursementsStore.fetchDisbursements();
});
</script>
