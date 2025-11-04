<template>
  <Sidebar :navigation-items="navigationItems" page-title="Wallet & Finance">
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
        </div>

        <div v-else>
          <!-- Wallet Overview -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            <!-- Balance Card -->
            <div class="bg-white overflow-hidden rounded-lg shadow-sm">
              <div class="p-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Wallet Balance</h2>
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      wallet?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ wallet?.status === 'active' ? 'Active' : 'Frozen' }}
                  </span>
                </div>
                <div class="mt-4">
                  <p class="text-3xl font-semibold text-gray-900">
                    {{ formatCurrency(wallet?.balance ?? 0) }}
                  </p>
                  <p class="mt-2 text-sm text-gray-500">
                    Last funded: {{ formatDate(wallet?.lastFunded) }}
                  </p>
                </div>
                <div class="mt-6">
                  <button
                    @click="showFundingModal = true"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700"
                  >
                    <PlusIcon class="h-5 w-5 mr-2" />
                    Fund Wallet
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white overflow-hidden rounded-lg shadow-sm">
              <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total Funded</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">
                      {{ formatCurrency(totalFunded) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total Disbursed</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">
                      {{ formatCurrency(totalDisbursed) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Pending Disbursements</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">{{ pendingDisbursements }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Active Beneficiaries</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">{{ activeBeneficiaries }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- Recent Transactions -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Recent Transactions</h2>
                <button
                  @click="router.push('/sponsor/wallet/transactions')"
                  class="text-sm font-medium text-coral-600 hover:text-coral-700"
                >
                  View All
                </button>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <div
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="px-6 py-4"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ transaction.description }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ formatDate(transaction.createdAt) }} · Ref: {{ transaction.reference }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p
                      :class="[
                        'text-sm font-medium',
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      ]"
                    >
                      {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                    </p>
                    <p class="text-xs text-gray-500">
                      <span
                        :class="[
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          {
                            'bg-green-100 text-green-800': transaction.status === 'completed',
                            'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                            'bg-red-100 text-red-800': transaction.status === 'failed'
                          }
                        ]"
                      >
                        {{ transaction.status }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fund Wallet Modal -->
    <TransitionRoot appear :show="showFundingModal" as="template">
      <Dialog as="div" @close="showFundingModal = false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Fund Your Wallet
                </DialogTitle>

                <form @submit.prevent="handleFunding" class="mt-4">
                  <div class="space-y-4">
                    <div>
                      <label for="amount" class="block text-sm font-medium text-gray-700">
                        Amount to Fund
                      </label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="amount"
                          v-model="fundingAmount"
                          min="0"
                          step="0.01"
                          required
                          class="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                          placeholder="0.00"
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span class="text-gray-500 sm:text-sm">USD</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label for="paymentMethod" class="block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        v-model="paymentMethod"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
                      >
                        <option value="bank">Bank Transfer</option>
                        <option value="card">Credit/Debit Card</option>
                      </select>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      @click="showFundingModal = false"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="processingPayment"
                      class="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 disabled:opacity-50"
                    >
                      <span v-if="processingPayment" class="mr-2">
                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      </span>
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useWalletStore } from '../../../stores/wallet.ts';
import { useNotificationStore } from '../../../stores/notifications';
import { useDisbursementsStore } from '../../../stores/disbursements.ts';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems';
import { PlusIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const walletStore = useWalletStore();
const notificationStore = useNotificationStore();
const disbursementsStore = useDisbursementsStore();

const loading = computed(() => walletStore.loading);
const wallet = computed(() => walletStore.wallet);
const recentTransactions = computed(() => walletStore.recentTransactions);

// Fund wallet modal
const showFundingModal = ref(false);
const fundingAmount = ref('');
const paymentMethod = ref('bank');
const processingPayment = ref(false);

// Quick stats
const totalFunded = computed(() => {
  return wallet.value?.transactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0;
});

const totalDisbursed = computed(() => {
  return wallet.value?.transactions
    .filter(t => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0;
});

const pendingDisbursements = computed(() => {
  return disbursementsStore.disbursements.filter(d => d.status === 'pending').length;
});

const activeBeneficiaries = computed(() => {
  // In a real app, this would come from the backend
  return new Set(disbursementsStore.disbursements.map(d => d.beneficiaryId)).size;
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const handleFunding = async () => {
  try {
    processingPayment.value = true;
    // In a real app, this would integrate with a payment provider
    await walletStore.fundWallet(parseFloat(fundingAmount.value));
    notificationStore.showSuccess('Wallet funded successfully');
    showFundingModal.value = false;
    fundingAmount.value = '';
  } catch (error) {
    notificationStore.showError('Failed to fund wallet');
  } finally {
    processingPayment.value = false;
  }
};

onMounted(async () => {
  await Promise.all([
    walletStore.fetchWallet(),
    disbursementsStore.fetchDisbursements()
  ]);
});
</script>
