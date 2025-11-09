<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Wallet Transactions">
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">Transactions History</h1>
              <p class="mt-1 text-sm text-gray-500">
                View all your wallet transactions and disbursements
              </p>
            </div>
            <div>
              <button
                @click="router.push('/sponsor/wallet')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Wallet
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
                <option value="credit">Credits</option>
                <option value="debit">Debits</option>
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
                <option value="failed">Failed</option>
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
                placeholder="Search by reference or description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Transactions List -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div v-if="loading" class="p-4 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
          </div>

          <div v-else-if="filteredTransactions.length === 0" class="p-8 text-center">
            <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
            <p class="mt-1 text-sm text-gray-500">
              No transactions match your current filters
            </p>
          </div>

          <table v-else class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(transaction.createdAt) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-md truncate">{{ transaction.description }}</div>
                  <div v-if="transaction.metadata" class="text-xs text-gray-500 mt-1">
                    {{ getMetadataText(transaction.metadata) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transaction.reference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="{
                  'text-green-600': transaction.type === 'credit',
                  'text-red-600': transaction.type === 'debit'
                }">
                  {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                    'bg-green-100 text-green-800': transaction.status === 'completed',
                    'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                    'bg-red-100 text-red-800': transaction.status === 'failed'
                  }">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    v-if="transaction.metadata?.disbursementId"
                    @click="router.push(`/sponsor/disbursements/${transaction.metadata.disbursementId}`)"
                    class="text-coral-600 hover:text-coral-900"
                  >
                    View Disbursement
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
import { useWalletStore } from '../../../stores/wallet.ts';
import Sidebar from '../../../components/Sidebar.vue';
import { sponsorNavigationItems } from '../../../lib/data/navItems';
import { DocumentIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const walletStore = useWalletStore();

const loading = computed(() => walletStore.loading);
const transactions = computed(() => walletStore.allTransactions);

const filters = ref({
  type: '',
  status: '',
  dateRange: '',
  search: ''
});

const filteredTransactions = computed(() => {
  let filtered = [...transactions.value];

  if (filters.value.type) {
    filtered = filtered.filter(t => t.type === filters.value.type);
  }

  if (filters.value.status) {
    filtered = filtered.filter(t => t.status === filters.value.status);
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

    filtered = filtered.filter(t => new Date(t.createdAt) >= startDate);
  }

  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.reference.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getMetadataText = (metadata) => {
  if (!metadata) return '';
  
  const parts = [];
  if (metadata.disbursementId) {
    parts.push(`Disbursement ID: ${metadata.disbursementId}`);
  }
  if (metadata.beneficiaryId) {
    parts.push(`Beneficiary ID: ${metadata.beneficiaryId}`);
  }
  if (metadata.offerId) {
    parts.push(`Offer ID: ${metadata.offerId}`);
  }
  if (metadata.scholarshipId) {
    parts.push(`Scholarship ID: ${metadata.scholarshipId}`);
  }
  
  return parts.join(' · ');
};

onMounted(async () => {
  await walletStore.fetchWallet();
});
</script>
