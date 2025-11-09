<template>
  <Sidebar
  page-title=""
    page-subtitle=""
    :navigation-items="studentNavigationItems"
    >
    <div class="min-h-screen bg-gray-50">
      <div v-if="!offer" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">Offer not found</h1>
          <p class="text-gray-600 mt-2">The offer you're looking for doesn't exist or has been removed.</p>
          <router-link to="/student/offers" class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 mt-4 inline-block">
            Browse Other Offers
          </router-link>
        </div>
      </div>
  
      <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <router-link to="/student/offers" class="hover:text-coral-500">Browse Opportunities</router-link>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-gray-900">{{ offer.title }}</span>
        </nav>
        
        <!-- Header -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <h1 class="text-3xl font-bold text-gray-900">{{ offer.title }}</h1>
                <span v-if="isMatchingOffer" class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                  Perfect Match
                </span>
                <span 
                  :class="getSelectionProcessColor(offer.selectionProcess)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ formatSelectionProcess(offer.selectionProcess) }}
                </span>
              </div>
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="offer.sponsorAvatar" 
                    :alt="offer.sponsorName" 
                    class="w-10 h-10 rounded-full border-2 border-gray-200"
                  >
                  <div>
                    <p class="font-medium text-gray-900">{{ offer.sponsorName }}</p>
                    <p class="text-sm text-gray-500">Sponsor</p>
                  </div>
                </div>
              </div>
              <p class="text-gray-700 text-lg leading-relaxed">{{ offer.description }}</p>
            </div>
            
            <div class="text-right ml-8">
              <div class="text-4xl font-bold text-coral-600 mb-2">₦{{ offer.amount.toLocaleString() }}</div>
              <div class="text-gray-600 mb-4">per student</div>
              <div class="text-sm text-gray-500">
                <p>{{ offer.currentRecipients }}/{{ offer.maxRecipients }} recipients</p>
                <p>Deadline: {{ formatDate(offer.deadline) }}</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <div class="flex items-center space-x-2">
                <Calendar class="h-4 w-4" />
                <span>Posted {{ formatDate(offer.createdAt) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Clock class="h-4 w-4" />
                <span>{{ daysUntilDeadline }} days remaining</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <button
                @click="shareOffer"
                class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Share2 class="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                v-if="!hasApplied"
                @click="applyNow"
                class="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Send class="h-5 w-5" />
                <span>Apply Now</span>
              </button>
              <div v-else class="px-6 py-3 bg-green-100 text-green-700 rounded-lg flex items-center space-x-2">
                <CheckCircle class="h-5 w-5" />
                <span>Applied</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Eligibility Criteria -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Eligibility Criteria</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-if="offer.criteria.schools?.length">
                  <h3 class="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <School class="h-4 w-4" />
                    <span>Eligible Schools</span>
                  </h3>
                  <ul class="space-y-1">
                    <li v-for="school in offer.criteria.schools" :key="school" class="text-gray-600 text-sm">
                      • {{ school }}
                    </li>
                  </ul>
                </div>
  
                <div v-if="offer.criteria.courses?.length">
                  <h3 class="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <GraduationCap class="h-4 w-4" />
                    <span>Eligible Courses</span>
                  </h3>
                  <ul class="space-y-1">
                    <li v-for="course in offer.criteria.courses" :key="course" class="text-gray-600 text-sm">
                      • {{ course }}
                    </li>
                  </ul>
                </div>
  
                <div v-if="offer.criteria.levels?.length">
                  <h3 class="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <Target class="h-4 w-4" />
                    <span>Academic Levels</span>
                  </h3>
                  <ul class="space-y-1">
                    <li v-for="level in offer.criteria.levels" :key="level" class="text-gray-600 text-sm">
                      • {{ level }}
                    </li>
                  </ul>
                </div>
  
                <div v-if="offer.criteria.minGPA">
                  <h3 class="font-medium text-gray-900 mb-2">GPA Requirement</h3>
                  <p class="text-gray-600 text-sm">Minimum GPA: {{ offer.criteria.minGPA }}</p>
                  <p v-if="offer.criteria.maxGPA" class="text-gray-600 text-sm">Maximum GPA: {{ offer.criteria.maxGPA }}</p>
                </div>
  
                <div v-if="offer.criteria.gender !== 'any'">
                  <h3 class="font-medium text-gray-900 mb-2">Gender</h3>
                  <p class="text-gray-600 text-sm capitalize">{{ offer.criteria.gender }} only</p>
                </div>

                <div v-if="offer.criteria.ageRange">
                  <h3 class="font-medium text-gray-900 mb-2">Age Range</h3>
                  <p class="text-gray-600 text-sm">{{ offer.criteria.ageRange.min }} - {{ offer.criteria.ageRange.max }} years</p>
                </div>

                <div v-if="offer.criteria.states?.length">
                  <h3 class="font-medium text-gray-900 mb-2">Eligible States</h3>
                  <ul class="space-y-1">
                    <li v-for="state in offer.criteria.states" :key="state" class="text-gray-600 text-sm">
                      • {{ state }}
                    </li>
                  </ul>
                </div>

                <div v-if="offer.criteria.financialNeed">
                  <h3 class="font-medium text-gray-900 mb-2">Financial Need</h3>
                  <p class="text-gray-600 text-sm">Proof of financial need required</p>
                </div>
              </div>
            </div>

            <!-- Requirements -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText class="h-5 w-5" />
                <span>Application Requirements</span>
              </h2>
              <ul class="space-y-3">
                <li v-for="requirement in offer.requirements" :key="requirement" class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-6 h-6 bg-coral-100 rounded-full flex items-center justify-center mt-0.5">
                    <div class="w-2 h-2 bg-coral-500 rounded-full"></div>
                  </div>
                  <span class="text-gray-700">{{ requirement }}</span>
                </li>
              </ul>
            </div>

            <!-- Selection Process -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Selection Process</h2>
              <div class="flex items-center space-x-3 mb-4">
                <span 
                  :class="getSelectionProcessColor(offer.selectionProcess)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ formatSelectionProcess(offer.selectionProcess) }}
                </span>
              </div>
              <p class="text-gray-600">
                <span v-if="offer.selectionProcess === 'merit_based'">
                  Candidates are selected based on academic performance and achievements.
                </span>
                <span v-else-if="offer.selectionProcess === 'holistic'">
                  Selection considers academic performance, personal background, and overall potential.
                </span>
                <span v-else-if="offer.selectionProcess === 'research_based'">
                  Priority given to candidates with strong research proposals and experience.
                </span>
                <span v-else-if="offer.selectionProcess === 'portfolio_based'">
                  Selection primarily based on submitted portfolio and creative work quality.
                </span>
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Stats -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Award Amount</span>
                  <span class="font-semibold text-coral-600">₦{{ offer.amount.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Total Budget</span>
                  <span class="font-semibold">₦{{ offer.totalBudget.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Remaining Budget</span>
                  <span class="font-semibold">₦{{ offer.remainingBudget.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Recipients</span>
                  <span class="font-semibold">{{ offer.currentRecipients }}/{{ offer.maxRecipients }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Deadline</span>
                  <span class="font-semibold">{{ formatDate(offer.deadline) }}</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Recipients Progress</span>
                  <span>{{ Math.round((offer.currentRecipients / offer.maxRecipients) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (offer.currentRecipients / offer.maxRecipients) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Profile Match -->
            <div v-if="isMatchingOffer" class="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div class="flex items-center space-x-2 mb-3">
                <CheckCircle class="h-5 w-5 text-green-600" />
                <h3 class="text-lg font-semibold text-green-900">Perfect Match!</h3>
              </div>
              <p class="text-green-700 text-sm">
                This opportunity matches your profile perfectly. You meet all the eligibility criteria.
              </p>
            </div>

            <!-- Similar Offers -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Similar Opportunities</h3>
              <div class="space-y-3">
                <div v-for="similarOffer in similarOffers.slice(0, 3)" :key="similarOffer.id" class="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <router-link :to="`/student/offers/${similarOffer.id}`" class="block">
                    <h4 class="font-medium text-gray-900 text-sm">{{ similarOffer.title }}</h4>
                    <p class="text-gray-600 text-xs mt-1">{{ similarOffer.sponsorName }}</p>
                    <p class="text-coral-600 font-semibold text-sm mt-1">₦{{ similarOffer.amount.toLocaleString() }}</p>
                  </router-link>
                </div>
              </div>
              <router-link 
                to="/student/offers" 
                class="text-coral-600 hover:text-coral-700 text-sm font-medium mt-4 inline-flex items-center space-x-1"
              >
                <span>View all opportunities</span>
                <Eye class="h-4 w-4" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Modal -->
    <ApplicationModal
      :is-open="applicationModal.show"
      :mode="applicationModal.mode"
      :item="applicationModal.offer"
      :application="applicationModal.application"
      @close="applicationModal.show = false"
      @success="handleApplicationSuccess"
    />
  </Sidebar>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useOffersStore } from '../../../stores/offers'
import { useApplicationsStore } from '../../../stores/applications'
import { useNotificationStore } from '../../../stores/notifications'
import Sidebar from '../../../components/Sidebar.vue'
import { studentNavigationItems } from '../../../lib/data/navItems'
import ApplicationModal from '../../../components/ApplicationModal.vue'

import { 
  Calendar,
  Clock,
  Share2,
  Send,
  CheckCircle,
  Users,
  School,
  GraduationCap,
  Target,
  FileText,
  Eye
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const offersStore = useOffersStore()
const applicationsStore = useApplicationsStore()
const notificationStore = useNotificationStore()

const applicationModal = reactive({
  show: false,
  mode: 'create',
  offer: null,
  application: null
})

onMounted(() => {
  offersStore.initializeOffers()
  applicationsStore.initializeApplications()
})

const offer = computed(() => 
  offersStore.getOfferById(parseInt(route.params.id))
)

// Mock student profile - in real app this would come from user store
const studentProfile = computed(() => ({
  school: 'University of Lagos',
  course: 'Computer Science',
  level: '400 Level',
  gpa: 4.2,
  gender: 'male',
  state: 'Lagos',
  age: 22
}))

const matchingOffers = computed(() => 
  offersStore.getMatchingOffers(studentProfile.value)
)

const isMatchingOffer = computed(() => {
  if (!offer.value) return false
  return matchingOffers.value.some(match => match.id === offer.value.id)
})

const hasApplied = computed(() => {
  if (!offer.value || !authStore.user) return false
  const userApplications = applicationsStore.getUserApplications(authStore.user.id)
  return userApplications.some(app => 
    app.type === 'offer' && app.itemId === offer.value.id
  )
})

const daysUntilDeadline = computed(() => {
  if (!offer.value?.deadline) return 0
  const deadline = new Date(offer.value.deadline)
  const today = new Date()
  const diffTime = deadline - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
})

const similarOffers = computed(() => {
  if (!offer.value) return []
  return offersStore.getOffers
    .filter(o => o.id !== offer.value.id && o.status === 'active')
    .filter(o => {
      // Find offers with similar criteria
      const currentCourses = offer.value.criteria.courses || []
      const similarCourses = o.criteria.courses || []
      return currentCourses.some(course => similarCourses.includes(course))
    })
    .slice(0, 3)
})

const getSelectionProcessColor = (process) => {
  const colors = {
    'merit_based': 'bg-blue-100 text-blue-700',
    'holistic': 'bg-purple-100 text-purple-700',
    'research_based': 'bg-green-100 text-green-700',
    'portfolio_based': 'bg-orange-100 text-orange-700'
  }
  return colors[process] || 'bg-gray-100 text-gray-700'
}

const formatSelectionProcess = (process) => {
  const processes = {
    'merit_based': 'Merit Based',
    'holistic': 'Holistic Review',
    'research_based': 'Research Based',
    'portfolio_based': 'Portfolio Based'
  }
  return processes[process] || process
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const applyNow = () => {
  if (!offer.value) return
  applicationModal.offer = offer.value
  applicationModal.mode = 'create'
  applicationModal.application = null
  applicationModal.show = true
}

const shareOffer = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: offer.value.title,
        text: offer.value.description,
        url: window.location.href
      })
    } catch (err) {
      console.log('Error sharing:', err)
    }
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    notificationStore.addNotification({
      type: 'success',
      title: 'Link copied',
      message: 'Offer link copied to clipboard!'
    })
  }
}

const handleApplicationSuccess = () => {
  applicationModal.show = false
  notificationStore.addNotification({
    type: 'success',
    title: 'Application submitted',
    message: 'Your application has been submitted successfully!'
  })
}
</script>
