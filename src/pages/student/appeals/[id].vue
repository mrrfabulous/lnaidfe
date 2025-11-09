<template>

    <Sidebar
    page-title=""
    page-subtitle=""
    :navigation-items="studentNavigationItems"
    >
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Appeal Details</h1>
                <p class="text-sm text-gray-500">View and manage your funding appeal</p>
              </div>
              <router-link 
                to="/student/appeals"
                class="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-2"
              >
                <ArrowLeft class="h-5 w-5" />
                <span>Back to Appeals</span>
              </router-link>
            </div>
          </div>
        </div>

    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading appeal...</p>
      </div>
    </div>

    <div v-else-if="!appeal" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Appeal not found</h1>
        <p class="text-gray-600 mt-2">The appeal you're looking for doesn't exist or has been removed.</p>
        <router-link 
          to="/student/appeals" 
          class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 inline-block mt-4"
        >
          Back to My Appeals
        </router-link>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <router-link to="/student/appeals" class="hover:text-coral-500">My Appeals</router-link>
        <ChevronRight class="w-4 h-4" />
        <span class="text-gray-900">{{ appeal.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Header -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ appeal.title }}</h1>
                <div class="flex items-center space-x-4">
                  <span 
                    :class="getStatusBadgeClass(appeal.status)"
                    class="px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ formatStatus(appeal.status) }}
                  </span>
                  <span class="text-gray-600 flex items-center">
                    <Calendar class="w-4 h-4 mr-1" />
                    Created {{ formatDate(appeal.createdAt) }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  v-if="appeal.status === 'active'" 
                  @click="pauseAppeal"
                  class="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors flex items-center space-x-1"
                >
                  <Pause class="w-4 h-4" />
                  <span>Pause</span>
                </button>
                <button 
                  v-if="appeal.status === 'paused'" 
                  @click="resumeAppeal"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                >
                  <Play class="w-4 h-4" />
                  <span>Resume</span>
                </button>
                <router-link 
                  :to="`/student/appeals/edit/${appeal.id}`"
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
                >
                  <Edit class="w-4 h-4" />
                  <span>Edit</span>
                </router-link>
                <button
                  @click="shareAppeal"
                  class="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors flex items-center space-x-1"
                >
                  <Share2 class="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>₦{{ (appeal.raisedAmount || 0).toLocaleString() }} / ₦{{ (appeal.targetAmount || 0).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-coral-500 h-3 rounded-full transition-all duration-300"
                  :style="{ width: Math.min(((appeal.raisedAmount || 0) / (appeal.targetAmount || 1)) * 100, 100) + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-sm text-gray-600 mt-2">
                <span>{{ Math.round(((appeal.raisedAmount || 0) / (appeal.targetAmount || 1)) * 100) }}% funded</span>
                <span>{{ appeal.donations?.length || 0 }} donors</span>
              </div>
            </div>

            <!-- Story -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">My Story</h2>
              <div class="prose prose-gray max-w-none">
                <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ appeal.description || appeal.story || 'No description provided.' }}</p>
              </div>
            </div>
          </div>

          <!-- Academic Information -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500">School/University</h3>
                <p class="text-gray-900">{{ appeal.school || 'Not specified' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Course of Study</h3>
                <p class="text-gray-900">{{ appeal.course || 'Not specified' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Academic Level</h3>
                <p class="text-gray-900">{{ appeal.level || 'Not specified' }}</p>
              </div>
              <div v-if="appeal.gpa">
                <h3 class="text-sm font-medium text-gray-500">GPA</h3>
                <p class="text-gray-900">{{ appeal.gpa }}</p>
              </div>
            </div>
          </div>

          <!-- Budget Breakdown -->
          <div v-if="appeal.budgetItems?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Budget Breakdown</h2>
            <div class="space-y-3">
              <div 
                v-for="(item, index) in appeal.budgetItems" 
                :key="index"
                class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span class="text-gray-700">{{ item.description }}</span>
                <span class="text-gray-900 font-medium">₦{{ item.amount.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div v-if="appeal.documents?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Supporting Documents</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(doc, index) in appeal.documents" 
                :key="index"
                class="border border-gray-200 rounded-lg p-4 hover:border-coral-300 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-coral-100 rounded-lg flex items-center justify-center">
                    <FileText class="w-4 h-4 text-coral-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ doc.name }}</p>
                    <p class="text-xs text-gray-500">{{ doc.type }}</p>
                  </div>
                  <button 
                    @click="downloadDocument(doc)"
                    class="text-coral-500 hover:text-coral-700 transition-colors"
                  >
                    <Download class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Donations -->
          <div v-if="appeal.donations?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
            <div class="space-y-4">
              <div 
                v-for="(donation, index) in appeal.donations.slice(0, 5)" 
                :key="index"
                class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium text-sm">{{ donation.donor.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ donation.donor || 'Anonymous' }}</p>
                    <p class="text-sm text-gray-600">{{ formatDate(donation.date) }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium text-coral-600">₦{{ donation.amount.toLocaleString() }}</p>
                  <p v-if="donation.message" class="text-xs text-gray-500 max-w-32 truncate">{{ donation.message }}</p>
                </div>
              </div>
            </div>
            <div v-if="appeal.donations.length > 5" class="mt-4 text-center">
              <button class="text-coral-500 hover:text-coral-700 text-sm font-medium">
                View all {{ appeal.donations.length }} donations
              </button>
            </div>
          </div>

          <!-- Updates -->
          <div v-if="appeal.updates?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Updates</h2>
            <div class="space-y-6">
              <div 
                v-for="(update, index) in appeal.updates" 
                :key="index"
                class="border-l-4 border-coral-500 pl-4"
              >
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">{{ update.title }}</h3>
                  <span class="text-sm text-gray-500">{{ formatDate(update.date) }}</span>
                </div>
                <p class="text-gray-700 text-sm">{{ update.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Stats -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Appeal Statistics</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Target Amount</span>
                <span class="font-medium">₦{{ (appeal.targetAmount || 0).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Amount Raised</span>
                <span class="font-medium text-coral-600">₦{{ (appeal.raisedAmount || 0).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Total Donors</span>
                <span class="font-medium">{{ appeal.donations?.length || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Category</span>
                <span class="font-medium">{{ appeal.category || 'Not specified' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Last Updated</span>
                <span class="font-medium">{{ formatDate(appeal.updatedAt || appeal.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link 
                :to="`/student/appeals/edit/${appeal.id}`"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit Appeal
              </router-link>
              <button
                @click="shareAppeal"
                class="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Share2 class="w-4 h-4 mr-2" />
                Share Appeal
              </button>
              <button
                @click="duplicateAppeal"
                class="w-full flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Copy class="w-4 h-4 mr-2" />
                Duplicate Appeal
              </button>
              <button
                v-if="appeal.status === 'active'"
                @click="pauseAppeal"
                class="w-full flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Pause class="w-4 h-4 mr-2" />
                Pause Appeal
              </button>
              <button
                v-if="appeal.status === 'paused'"
                @click="resumeAppeal"
                class="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play class="w-4 h-4 mr-2" />
                Resume Appeal
              </button>
              <hr class="border-gray-200">
              <button
                @click="deleteAppeal"
                class="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete Appeal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div v-if="shareModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Share Appeal</h3>
          <button @click="shareModal.show = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>
        <p class="text-gray-600 mb-6">Share your appeal to reach more potential supporters</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Appeal Link</label>
            <div class="flex">
              <input
                :value="shareModal.link"
                readonly
                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-xl bg-gray-50 text-sm"
              />
              <button
                @click="copyLink"
                class="px-4 py-2 bg-coral-500 text-white rounded-r-xl hover:bg-coral-600 transition-colors"
              >
                <Copy class="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-3">
            <button
              @click="shareToSocial('twitter')"
              class="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <span class="text-sm font-medium">Twitter</span>
            </button>
            <button
              @click="shareToSocial('facebook')"
              class="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span class="text-sm font-medium">Facebook</span>
            </button>
            <button
              @click="shareToSocial('whatsapp')"
              class="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <span class="text-sm font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </Sidebar>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppealsStore } from '../../../stores/appeals'
import { useNotificationStore } from '../../../stores/notifications'
import Sidebar from '../../../components/Sidebar.vue'
import { studentNavigationItems } from '../../../lib/data/navItems'
import { 
  ArrowLeft, 
  ChevronRight,
  Calendar,
  Pause,
  Play,
  Edit,
  Share2,
  X,
  Copy,
  FileText,
  Download,
  Trash2
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const appealsStore = useAppealsStore()
const notificationStore = useNotificationStore()

const isLoading = ref(true)
const appeal = ref(null)

const shareModal = reactive({
  show: false,
  link: ''
})

onMounted(async () => {
  await loadAppeal()
})

const loadAppeal = async () => {
  try {
    // Initialize appeals store if not already done
    if (appealsStore.appeals.length === 0) {
      appealsStore.initializeAppeals()
    }
    
    // Get ID from route params first, fallback to URL parsing for hard refresh scenarios
    let appealId = route.params.id
    
    if (!appealId) {
      // Extract ID from current URL path when route params are not available (hard refresh)
      const pathSegments = window.location.pathname.split('/')
      appealId = pathSegments[pathSegments.length - 1]
    }
    
    if (appealId && !isNaN(appealId)) {
      appeal.value = appealsStore.getAppealById(parseInt(appealId))
    } else {
      console.error('Invalid appeal ID:', appealId)
      appeal.value = null
    }
    
    isLoading.value = false
  } catch (error) {
    console.error('Error loading appeal:', error)
    notificationStore.addNotification({
      type: 'error',
      title: 'Error loading appeal',
      message: 'Could not load appeal data. Please try again.'
    })
    router.push('/student/appeals')
  }
}

const getStatusBadgeClass = (status) => {
  const colors = {
    'active': 'bg-green-100 text-green-700',
    'completed': 'bg-blue-100 text-blue-700',
    'paused': 'bg-yellow-100 text-yellow-700',
    'cancelled': 'bg-red-100 text-red-700',
    'draft': 'bg-gray-100 text-gray-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const pauseAppeal = () => {
  appealsStore.updateAppealStatus(appeal.value.id, 'paused')
  appeal.value.status = 'paused'
  notificationStore.addNotification({
    type: 'info',
    title: 'Appeal paused',
    message: 'Your appeal has been paused and is no longer visible to donors.'
  })
}

const resumeAppeal = () => {
  appealsStore.updateAppealStatus(appeal.value.id, 'active')
  appeal.value.status = 'active'
  notificationStore.addNotification({
    type: 'success',
    title: 'Appeal resumed',
    message: 'Your appeal is now active and visible to donors again.'
  })
}

const shareAppeal = () => {
  shareModal.link = `${window.location.origin}/appeals/${appeal.value.id}`
  shareModal.show = true
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareModal.link)
    notificationStore.addNotification({
      type: 'success',
      title: 'Link copied',
      message: 'Appeal link has been copied to clipboard'
    })
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Copy failed',
      message: 'Failed to copy link to clipboard'
    })
  }
}

const duplicateAppeal = () => {
  const newAppeal = { ...appeal.value }
  delete newAppeal.id
  newAppeal.title = `${appeal.value.title} (Copy)`
  newAppeal.status = 'draft'
  newAppeal.raisedAmount = 0
  newAppeal.donations = []
  newAppeal.createdAt = new Date().toISOString()
  
  appealsStore.addAppeal(newAppeal)
  notificationStore.addNotification({
    type: 'success',
    title: 'Appeal duplicated',
    message: 'A copy of your appeal has been created as a draft.'
  })
  router.push('/student/appeals')
}

const deleteAppeal = () => {
  if (confirm('Are you sure you want to delete this appeal? This action cannot be undone.')) {
    appealsStore.deleteAppeal(appeal.value.id)
    notificationStore.addNotification({
      type: 'success',
      title: 'Appeal deleted',
      message: 'Your appeal has been permanently deleted.'
    })
    router.push('/student/appeals')
  }
}

const downloadDocument = (doc) => {
  // In a real app, this would download the actual file
  notificationStore.addNotification({
    type: 'info',
    title: 'Download started',
    message: `Downloading ${doc.name}...`
  })
}

const shareToSocial = (platform) => {
  const link = shareModal.link
  const text = `Help me raise funds for ${appeal.value.title}. ${(appeal.value.description || '').substring(0, 100)}...`
  
  let shareUrl = ''
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`
      break
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`
      break
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}
</script>
