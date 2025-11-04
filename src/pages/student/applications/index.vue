<template>
  <StudentSidebar>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">My Applications</h1>
              <p class="text-sm text-gray-500">Track your scholarship and opportunity applications</p>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">Total: {{ userApplications.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Applications</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ userApplications.length }}</p>
              </div>
              <div class="p-3 bg-blue-100 rounded-xl">
                <FileText class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.pending }}</p>
              </div>
              <div class="p-3 bg-yellow-100 rounded-xl">
                <Clock class="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Under Review</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.underReview }}</p>
              </div>
              <div class="p-3 bg-purple-100 rounded-xl">
                <Search class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Approved</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.approved }}</p>
              </div>
              <div class="p-3 bg-green-100 rounded-xl">
                <CheckCircle class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Success Rate</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ successRate }}%</p>
              </div>
              <div class="p-3 bg-coral-100 rounded-xl">
                <TrendingUp class="w-6 h-6 text-coral-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search applications..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 w-full sm:w-64"
                />
              </div>
              <select
                v-model="filters.status"
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
              <select
                v-model="filters.type"
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">All Types</option>
                <option value="scholarship">Scholarships</option>
                <option value="offer">Opportunities</option>
              </select>
            </div>
            <div class="flex items-center space-x-3">
              <button
                @click="clearFilters"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Applications Grid -->
        <div v-if="filteredApplications.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
          <p class="text-gray-600 mb-6">
            {{ userApplications.length === 0 ? "You haven't submitted any applications yet." : "No applications match your current filters." }}
          </p>
          <div v-if="userApplications.length === 0" class="flex justify-center space-x-4">
            <router-link 
              to="/student/scholarships"
              class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <GraduationCap class="h-5 w-5" />
              <span>Browse Scholarships</span>
            </router-link>
            <router-link 
              to="/student/offers"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Briefcase class="h-5 w-5" />
              <span>Browse Opportunities</span>
            </router-link>
          </div>
        </div>

        <div v-else class="grid gap-6">
          <div
            v-for="application in filteredApplications"
            :key="application.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-xl font-semibold text-gray-900">{{ application.title }}</h3>
                    <span 
                      :class="getStatusColor(application.status)"
                      class="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {{ formatStatus(application.status) }}
                    </span>
                    <span 
                      :class="getTypeColor(application.type)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ application.type === 'scholarship' ? 'Scholarship' : 'Opportunity' }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-2">{{ application.organization }}</p>
                  <p class="text-gray-700 line-clamp-2">{{ application.description }}</p>
                </div>
                <div class="text-right ml-6">
                  <p class="text-2xl font-bold text-coral-600">₦{{ application.amount?.toLocaleString() || 0 }}</p>
                  <p class="text-sm text-gray-500">Award Amount</p>
                </div>
              </div>

              <!-- Application Details -->
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Documents: {{ application.submittedDocuments?.length || 0 }}/{{ application.requirements?.length || 0 }}</span>
                  <span>Deadline: {{ formatDate(application.deadline) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: Math.min(((application.submittedDocuments?.length || 0) / (application.requirements?.length || 1)) * 100, 100) + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar class="h-4 w-4" />
                  <span>Applied {{ formatDate(application.appliedAt) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <router-link
                    :to="`/student/applications/${application.id}`"
                    class="px-4 py-2 text-coral-600 hover:bg-coral-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Eye class="h-4 w-4" />
                    <span>View Details</span>
                  </router-link>
                  <button
                    v-if="application.status === 'pending' || application.status === 'under_review'"
                    @click="handleWithdraw(application)"
                    class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <X class="h-4 w-4" />
                    <span>Withdraw</span>
                  </button>
                  <router-link
                    :to="application.type === 'scholarship' ? `/student/scholarships/${application.itemId}` : `/student/offers/${application.itemId}`"
                    class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <ExternalLink class="h-4 w-4" />
                    <span>View {{ application.type === 'scholarship' ? 'Scholarship' : 'Opportunity' }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Withdraw Confirmation Modal -->
      <div v-if="withdrawModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Withdraw Application</h3>
            <button @click="withdrawModal.show = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-6 w-6" />
            </button>
          </div>
          <p class="text-gray-600 mb-6">Are you sure you want to withdraw your application for "{{ withdrawModal.application?.title }}"? This action cannot be undone.</p>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason for withdrawal (optional)</label>
            <textarea
              v-model="withdrawModal.reason"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              placeholder="Please provide a reason for withdrawing..."
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button
              @click="withdrawModal.show = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmWithdraw"
              class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              Withdraw Application
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Modal -->
    <ApplicationModal
      :is-open="applicationModal.show"
      :mode="applicationModal.mode"
      :item="applicationModal.item"
      :application="applicationModal.application"
      @close="applicationModal.show = false"
      @success="handleApplicationSuccess"
    />

    <!-- Withdraw Modal -->
    <div v-if="withdrawModal.show" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="withdrawModal.show = false"></div>
        <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900">Withdraw Application</h3>
            <button @click="withdrawModal.show = false" class="text-gray-400 hover:text-gray-600">
              <X class="w-5 h-5" />
            </button>
          </div>
          <p class="text-gray-600 mb-4">Are you sure you want to withdraw your application for "{{ withdrawModal.application?.title }}"?</p>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason for withdrawal (optional)</label>
            <textarea
              v-model="withdrawModal.reason"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              placeholder="Please provide a reason..."
            ></textarea>
          </div>
          <div class="flex space-x-3">
            <button
              @click="withdrawModal.show = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmWithdraw"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  </StudentSidebar>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useApplicationsStore } from '../../../stores/applications'
import { useNotificationStore } from '../../../stores/notifications'
import StudentSidebar from '../../../components/StudentSidebar.vue'
import ApplicationModal from '../../../components/ApplicationModal.vue'
import { 
  FileText,
  Clock,
  Search,
  CheckCircle,
  TrendingUp,
  Calendar,
  Eye,
  X,
  ExternalLink,
  GraduationCap,
  Briefcase
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const applicationsStore = useApplicationsStore()
const notificationStore = useNotificationStore()

const filters = reactive({
  status: '',
  type: '',
  search: ''
})

const withdrawModal = reactive({
  show: false,
  application: null,
  reason: ''
})

const applicationModal = reactive({
  show: false,
  mode: 'create',
  item: null,
  application: null
})

onMounted(() => {
  applicationsStore.initializeApplications()
})

const userApplications = computed(() => 
  applicationsStore.getUserApplications(authStore.user?.id) || []
)

const stats = computed(() => {
  const apps = userApplications.value
  return {
    pending: apps.filter(app => app.status === 'pending').length,
    underReview: apps.filter(app => app.status === 'under_review').length,
    approved: apps.filter(app => app.status === 'approved').length,
    rejected: apps.filter(app => app.status === 'rejected').length,
    withdrawn: apps.filter(app => app.status === 'withdrawn').length
  }
})

const successRate = computed(() => {
  const apps = userApplications.value
  const totalCompleted = apps.filter(app => 
    app.status === 'approved' || app.status === 'rejected'
  ).length
  if (totalCompleted === 0) return 0
  const approved = apps.filter(app => app.status === 'approved').length
  return Math.round((approved / totalCompleted) * 100)
})

const filteredApplications = computed(() => {
  let filtered = userApplications.value

  if (filters.status) {
    filtered = filtered.filter(app => app.status === filters.status)
  }

  if (filters.type) {
    filtered = filtered.filter(app => app.type === filters.type)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(app => 
      app.title?.toLowerCase().includes(search) ||
      app.organization?.toLowerCase().includes(search) ||
      app.description?.toLowerCase().includes(search)
    )
  }

  return filtered.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
})

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-700',
    'under_review': 'bg-purple-100 text-purple-700',
    'approved': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700',
    'withdrawn': 'bg-gray-100 text-gray-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getTypeColor = (type) => {
  const colors = {
    'scholarship': 'bg-blue-100 text-blue-700',
    'offer': 'bg-emerald-100 text-emerald-700'
  }
  return colors[type] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status) => {
  const statuses = {
    'pending': 'Pending',
    'under_review': 'Under Review',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'withdrawn': 'Withdrawn'
  }
  return statuses[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const clearFilters = () => {
  filters.status = ''
  filters.type = ''
  filters.search = ''
}

const handleWithdraw = (application) => {
  withdrawModal.application = application
  withdrawModal.reason = ''
  withdrawModal.show = true
}

const confirmWithdraw = () => {
  const success = applicationsStore.withdrawApplication(
    withdrawModal.application.id, 
    withdrawModal.reason
  )
  
  if (success) {
    notificationStore.addNotification({
      type: 'success',
      title: 'Application withdrawn',
      message: 'Your application has been successfully withdrawn.'
    })
  } else {
    notificationStore.addNotification({
      type: 'error',
      title: 'Withdrawal failed',
      message: 'Unable to withdraw application. Please try again.'
    })
  }
  
  withdrawModal.show = false
}

const handleApplicationSuccess = () => {
  // Refresh applications list or handle success
  applicationsStore.initializeApplications()
}
</script>
