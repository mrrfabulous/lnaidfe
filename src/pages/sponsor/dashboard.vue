<template>
  <Sidebar
  page-title="Sponsor Dashboard"
  page-subtitle="Manage your funding programs and track their impact."
  :navigation-items="sponsorNavigationItems"
  >
    <!-- Quick Stats with Trends -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Programs</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ activePrograms }}
            </p>
          </div>
          <div class="p-3 bg-blue-100 rounded-xl">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-green-600 font-medium flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            +{{ activeProgramsTrend }}%
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Funded</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              ₦{{ totalFunded.toLocaleString() }}
            </p>
          </div>
          <div class="p-3 bg-green-100 rounded-xl">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-green-600 font-medium flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            +{{ fundingTrend }}%            
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
        <div class="mt-4 h-1 bg-gray-100 rounded-full">
          <div 
            class="h-1 bg-green-500 rounded-full" 
            :style="{ width: `${(totalFunded / fundingTarget) * 100}%` }"
          >
        </div>
        </div>
        <div class="mt-2 flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{{ Math.round((totalFunded / fundingTarget) * 100) }}% of target</span>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">Students Helped</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ studentsHelped }} 
            </p>
          </div>
          <div class="p-3 bg-purple-100 rounded-xl">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-green-600 font-medium flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            +{{ studentsTrend }}%            
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
        <div class="mt-4 flex space-x-2">
          <div class="flex-1">
            <div class="text-xs text-gray-500 mb-1">Scholarship</div>
            <div class="h-1 bg-gray-100 rounded-full">
              <div 
                class="h-1 bg-purple-500 rounded-full" 
                :style="{ width: `${(scholarshipStudents / studentsHelped) * 100}%` }"
              ></div>
            </div>
          </div>
          <div class="flex-1">
            <div class="text-xs text-gray-500 mb-1">Offers</div>
            <div class="h-1 bg-gray-100 rounded-full">
              <div 
                class="h-1 bg-blue-500 rounded-full" 
                :style="{ width: `${(offerStudents / studentsHelped) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-600">
              Pending Applications
            </p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ pendingApplications }}              
            </p>
          </div>
          <div class="p-3 bg-coral-100 rounded-xl">
            <svg
              class="w-6 h-6 text-coral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span 
            :class="[
              'text-sm font-medium flex items-center',
              applicationsTrend > 0 ? 'text-green-600' : 'text-red-600'
            ]"
          >
            <svg 
              class="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="applicationsTrend > 0"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            {{ applicationsTrend > 0 ? '+' : '' }}{{ applicationsTrend }}%            
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
        <div class="mt-4">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Response Rate</span>
            <span>{{ responseRate }}%</span>
          </div>
          <div class="h-1 bg-gray-100 rounded-full">
            <div 
              class="h-1 bg-coral-500 rounded-full" 
              :style="{ width: `${responseRate}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link
          to="/sponsor/create-offer"
          class="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 group-hover:text-primary transition-colors">Create Offer</h3>
              <p class="text-sm text-gray-500">Set up targeted funding</p>
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 absolute right-6 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 group-hover:text-primary transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </router-link>

        <router-link
          to="/sponsor/create-scholarship"
          class="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-secondary hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 group-hover:text-secondary transition-colors">Create Scholarship</h3>
              <p class="text-sm text-gray-500">Full program setup</p>
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 absolute right-6 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 group-hover:text-secondary transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </router-link>

        <router-link
          to="/sponsor/manage-applications"
          class="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-coral hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-coral-100 rounded-xl group-hover:bg-coral-600 group-hover:text-white transition-colors">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 group-hover:text-coral transition-colors">Review Applications</h3>
              <p class="text-sm text-gray-500">Manage submissions</p>
            </div>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 absolute right-6 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 group-hover:text-coral transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>

    
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Applications -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Recent Applications</h2>
            <router-link
              to="/sponsor/manage-applications"
              class="text-coral-500 hover:text-coral-600 font-medium"
            >
              View All
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div v-if="recentApplications.length === 0" class="text-center py-12">
            <div
              class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <p class="text-gray-500">No applications yet</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="application in recentApplications.slice(0, 5)"
              :key="application.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-semibold text-gray-900">
                    {{ application.studentName }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ application.programTitle }}
                  </p>
                </div>
                <span
                  :class="[
                    'text-xs px-3 py-1 rounded-full font-medium',
                    getStatusColor(application.status),
                  ]"
                >
                  {{ formatStatus(application.status) }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{
                  formatDate(application.appliedAt)
                }}</span>
                <button
                  class="text-coral-500 hover:text-coral-600 font-medium text-sm"
                >
                  Review →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Performance -->
     <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Program Performance</h2>
            <router-link
              to="/sponsor/analytics"
              class="text-coral-500 hover:text-coral-600 font-medium"
            >
              View Analytics
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div
              v-for="program in topPrograms"
              :key="program.id"
              class="flex items-center justify-between"
            >
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ program.title }}</h3>
                <div class="flex items-center mt-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                    <div
                      class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                      :style="{
                        width: `${
                          (program.currentRecipients / program.maxRecipients) *
                          100
                        }%`,
                      }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600"
                    >{{ program.currentRecipients }}/{{
                      program.maxRecipients
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <!-- Impact Summary -->
    <div class="mt-8 bg-white rounded-2xl p-8 text-black">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">{{ totalImpact.students }}</div>
          <div class="text-accent">Students Impacted</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">
            ₦{{ totalImpact.amount.toLocaleString() }}
          </div>
          <div class="text-coral-500">Total Investment</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">{{ totalImpact.programs }}</div>
          <div class="text-coral-500">Active Programs</div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
  import Sidebar from "../../components/Sidebar.vue";  
  import { sponsorNavigationItems } from "../../lib/data/navItems";
  import { ref, computed, onMounted } from "vue";
  import { format, subDays, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
  import { Line, Bar } from 'vue-chartjs';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
  import { useAuthStore } from "../../stores/auth";
  import { useOffersStore } from "../../stores/offers";
  import { useScholarshipsStore } from "../../stores/scholarships";
  
  // Register ChartJS components
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
  
  const authStore = useAuthStore();
  const offersStore = useOffersStore();
  const scholarshipsStore = useScholarshipsStore();
  
  // Chart state
  const chartPeriod = ref('month');
  const selectedMetric = ref('applications');
  
  onMounted(() => {
    offersStore.initializeOffers();
    scholarshipsStore.initializeScholarships();
  });
  const sponsorOffers = computed(
    () => offersStore.getSponsorOffers(authStore.user?.id) || []
  );
  
const sponsorScholarships = computed(
  () => scholarshipsStore.getSponsorScholarships(authStore.user?.id) || []
);

const activePrograms = computed(
  () =>
    sponsorOffers.value.filter((o) => o.status === "active").length +
    sponsorScholarships.value.filter((s) => s.status === "active").length
);

const totalFunded = computed(() => {
  const offersFunded = sponsorOffers.value.reduce(
    (total, offer) => total + (offer.totalBudget - offer.remainingBudget),
    0
  );
  const scholarshipsFunded = sponsorScholarships.value.reduce(
    (total, scholarship) =>
      total +
      scholarship.amount *
        (scholarship.numberOfAwards - scholarship.remainingAwards),
    0
  );
  return offersFunded + scholarshipsFunded;
});

const studentsHelped = computed(() => {
  const offersHelped = sponsorOffers.value.reduce(
    (total, offer) => total + offer.currentRecipients,
    0
  );
  const scholarshipsHelped = sponsorScholarships.value.reduce(
    (total, scholarship) =>
      total + (scholarship.numberOfAwards - scholarship.remainingAwards),
    0
  );
  return offersHelped + scholarshipsHelped;
});

// Analytics computed properties
const activeProgramsTrend = computed(() => 15); // Placeholder - calculate from historical data
const fundingTrend = computed(() => 23); // Placeholder - calculate from historical data
const studentsTrend = computed(() => 18); // Placeholder - calculate from historical data
const applicationsTrend = computed(() => -5); // Placeholder - calculate from historical data

const fundingTarget = computed(() => 10000000); // Placeholder - get from settings
const responseRate = computed(() => 85); // Placeholder - calculate from application data

const scholarshipStudents = computed(() =>
  sponsorScholarships.value.reduce(
    (total, scholarship) =>
      total + (scholarship.numberOfAwards - scholarship.remainingAwards),
    0
  )
);

const offerStudents = computed(() =>
  sponsorOffers.value.reduce((total, offer) => total + offer.currentRecipients, 0)
);

// Chart data
const applicationTrendsData = computed(() => {
  const dates = generateDateLabels();
  return {
    labels: dates.map(date => format(date, 'MMM d')),
    datasets: [
      {
        label: 'Offers',
        data: dates.map(() => Math.floor(Math.random() * 50)),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // lighter blue
        fill: true,
        tension: 0.4,
        order: 2
      },
      {
        label: 'Scholarships',
        data: dates.map(() => Math.floor(Math.random() * 30)),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)', // lighter purple
        fill: true,
        tension: 0.4,
        order: 1
      }
    ]
  };
});

const programPerformanceData = computed(() => {
  const programs = [...sponsorScholarships.value, ...sponsorOffers.value].slice(0, 5);
  const metric = selectedMetric.value;
  
  return {
    labels: programs.map(p => p.title),
    datasets: [{
      label: metric === 'applications' ? 'Applications' : metric === 'funding' ? 'Amount (₦)' : 'Success Rate (%)',
      data: programs.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: programs.map((_, i) => 
        [`#3B82F6`, '#8B5CF6', '#EC4899', '#F97316', '#10B981'][i]
      )
    }]
  };
});

const areaChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // We're using custom legend
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y} applications`;
        }
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        maxRotation: 0
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        callback: function(value) {
          return value + (value === 1 ? ' app' : ' apps');
        }
      }
    }
  }
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}));

// Applications data
const recentApplications = computed(() => {
  const applications = [];

  sponsorOffers.value.forEach((offer) => {
    offer.applications?.forEach((app) => {
      applications.push({
        ...app,
        programTitle: offer.title,
        type: "offer",
      });
    });
  });

  sponsorScholarships.value.forEach((scholarship) => {
    scholarship.applications?.forEach((app) => {
      applications.push({
        ...app,
        programTitle: scholarship.title,
        type: "scholarship",
      });
    });
  });

  return applications.sort(
    (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
  );
});

const pendingApplications = computed(
  () =>
    recentApplications.value.filter((app) => app.status === "pending").length
);

const topPrograms = computed(() => {
  const programs = [
    ...sponsorOffers.value.map((offer) => ({
      ...offer,
      type: "offer",
    })),
    ...sponsorScholarships.value.map((scholarship) => ({
      ...scholarship,
      maxRecipients: scholarship.numberOfAwards,
      currentRecipients:
        scholarship.numberOfAwards - scholarship.remainingAwards,
      type: "scholarship",
    })),
  ];

  return programs.slice(0, 3);
});

const totalImpact = computed(() => ({
  students: studentsHelped.value,
  amount: totalFunded.value,
  programs: activePrograms.value,
}));

// Helper functions
const generateDateLabels = () => {
  if (chartPeriod.value === 'week') {
    return eachDayOfInterval({
      start: subDays(new Date(), 7),
      end: new Date()
    });
  } else if (chartPeriod.value === 'month') {
    return eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    });
  }
  // Add year case if needed
  return eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });
};

const setChartPeriod = (period) => {
  chartPeriod.value = period;
};

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    interview_scheduled: "bg-blue-100 text-blue-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const formatStatus = (status) => {
  const statuses = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    interview_scheduled: "Interview",
  };
  return statuses[status] || status;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script> 
