<template>
  <Sidebar
  page-title="Application Details"
    page-subtitle="application overview and status"
    :navigation-items="studentNavigationItems"
  >
    <div v-if="!application" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Application not found</h1>
        <p class="text-gray-600 mt-2">The application you're looking for doesn't exist or has been removed.</p>
        <router-link to="/student/applications" class="btn-primary mt-4">
          Back to Applications
        </router-link>
      </div>
    </div>

    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <router-link to="/student/applications" class="hover:text-coral-500">My Applications</router-link>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="text-gray-900">{{ application.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Header -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ application.title }}</h1>
                <div class="flex items-center space-x-4">
                  <span :class="getStatusBadgeClass(application.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ formatStatus(application.status) }}
                  </span>
                  <span class="text-gray-600">Applied {{ formatDate(application.appliedAt) }}</span>
                  <span :class="getTypeBadgeClass(application.type)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ application.type }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  v-if="application.status === 'pending' || application.status === 'under_review'"
                  @click="withdrawApplication"
                  class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Withdraw Application
                </button>
                <router-link
                  :to="application.type === 'scholarship' ? `/scholarships/${application.itemId}` : `/offers/${application.itemId}`"
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View {{ application.type === 'scholarship' ? 'Scholarship' : 'Offer' }}
                </router-link>
              </div>
            </div>

            <!-- Progress Steps -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Application Progress</h3>
                <span class="text-sm text-gray-600">Step {{ getCurrentStep() }} of {{ getTotalSteps() }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <div v-for="(step, index) in getProgressSteps()" :key="index" class="flex items-center">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    step.completed ? 'bg-green-500 text-white' : 
                    step.current ? 'bg-coral-500 text-white' : 'bg-gray-200 text-gray-600'
                  ]">
                    <svg v-if="step.completed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div v-if="index < getProgressSteps().length - 1" :class="[
                    'w-16 h-1 mx-2',
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  ]"></div>
                </div>
              </div>
              <div class="flex justify-between mt-2">
                <div v-for="(step, index) in getProgressSteps()" :key="index" class="text-xs text-gray-600 text-center" :style="{ width: index === 0 || index === getProgressSteps().length - 1 ? 'auto' : '100px' }">
                  {{ step.name }}
                </div>
              </div>
            </div>

            <!-- Current Status Details -->
            <div class="p-4 bg-gray-50 rounded-xl">
              <h4 class="font-medium text-gray-900 mb-2">Current Status</h4>
              <p class="text-gray-700">{{ getStatusDescription() }}</p>
              <div v-if="application.nextSteps" class="mt-3">
                <p class="text-sm font-medium text-gray-900 mb-1">Next Steps:</p>
                <p class="text-sm text-gray-600">{{ application.nextSteps }}</p>
              </div>
            </div>
          </div>

          <!-- Application Details -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Application Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Personal Information</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Full Name:</span>
                    <span class="font-medium text-gray-900">{{ application.studentName }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Email:</span>
                    <span class="font-medium text-gray-900">{{ application.studentEmail }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">School:</span>
                    <span class="font-medium text-gray-900">{{ application.school }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Course:</span>
                    <span class="font-medium text-gray-900">{{ application.course }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Level:</span>
                    <span class="font-medium text-gray-900">{{ application.level }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">GPA:</span>
                    <span class="font-medium text-gray-900">{{ application.gpa }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-medium text-gray-900 mb-2">Application Info</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Amount:</span>
                    <span class="font-medium text-gray-900">₦{{ application.amount?.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Applied Date:</span>
                    <span class="font-medium text-gray-900">{{ formatDate(application.appliedAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Deadline:</span>
                    <span class="font-medium text-gray-900">{{ formatDate(application.deadline) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Reference ID:</span>
                    <span class="font-medium text-gray-900">{{ application.referenceId }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cover Letter -->
          <div v-if="application.coverLetter" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Cover Letter</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ application.coverLetter }}</p>
            </div>
          </div>

          <!-- Documents -->
          <div v-if="application.documents?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Submitted Documents</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="doc in application.documents" :key="doc.name" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900">{{ doc.name }}</span>
                  <span :class="getDocumentStatusClass(doc.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ doc.status }}
                  </span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>{{ doc.type }}</span>
                  <span>•</span>
                  <span>{{ doc.size }}</span>
                </div>
                <div v-if="doc.feedback" class="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                  <strong>Feedback:</strong> {{ doc.feedback }}
                </div>
              </div>
            </div>
          </div>

          <!-- Test Results -->
          <div v-if="application.testResults?.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
            <div class="space-y-4">
              <div v-for="test in application.testResults" :key="test.name" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">{{ test.name }}</h3>
                  <span :class="getTestStatusClass(test.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ test.status }}
                  </span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Score:</span>
                    <span class="font-medium text-gray-900 ml-1">{{ test.score }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Max Score:</span>
                    <span class="font-medium text-gray-900 ml-1">{{ test.maxScore }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Date:</span>
                    <span class="font-medium text-gray-900 ml-1">{{ formatDate(test.date) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Percentile:</span>
                    <span class="font-medium text-gray-900 ml-1">{{ test.percentile }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interview Information -->
          <div v-if="application.interview" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Interview Information</h2>
            <div class="p-4 bg-blue-50 rounded-xl">
              <div class="flex items-start space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l6-6m0 0l6 6m-6-6v12"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-medium text-blue-900 mb-2">{{ application.interview.type }} Interview</h3>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-blue-700">Date & Time:</span>
                      <span class="font-medium text-blue-900">{{ formatDateTime(application.interview.scheduledAt) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-blue-700">Duration:</span>
                      <span class="font-medium text-blue-900">{{ application.interview.duration }} minutes</span>
                    </div>
                    <div v-if="application.interview.location" class="flex justify-between">
                      <span class="text-blue-700">Location:</span>
                      <span class="font-medium text-blue-900">{{ application.interview.location }}</span>
                    </div>
                    <div v-if="application.interview.meetingLink" class="flex justify-between">
                      <span class="text-blue-700">Meeting Link:</span>
                      <a :href="application.interview.meetingLink" target="_blank" class="font-medium text-blue-600 hover:text-blue-800">Join Meeting</a>
                    </div>
                  </div>
                  <div v-if="application.interview.instructions" class="mt-3 p-3 bg-white rounded-lg">
                    <p class="text-sm text-gray-700"><strong>Instructions:</strong> {{ application.interview.instructions }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Application Timeline</h2>
            <div class="space-y-4">
              <div v-for="event in application.timeline" :key="event.id" class="flex items-start space-x-3">
                <div :class="[
                  'w-3 h-3 rounded-full mt-2',
                  event.type === 'success' ? 'bg-green-500' :
                  event.type === 'warning' ? 'bg-yellow-500' :
                  event.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                ]"></div>
                <div class="flex-1 pb-4 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-center justify-between mb-1">
                    <h3 class="font-medium text-gray-900">{{ event.title }}</h3>
                    <span class="text-sm text-gray-600">{{ formatDate(event.date) }}</span>
                  </div>
                  <p class="text-gray-700 text-sm">{{ event.description }}</p>
                  <div v-if="event.actionRequired" class="mt-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Action Required
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                v-if="application.status === 'pending' && application.interview"
                @click="rescheduleInterview"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reschedule Interview
              </button>
              <button
                v-if="application.status === 'document_review' && hasRejectedDocuments()"
                @click="resubmitDocuments"
                class="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Resubmit Documents
              </button>
              <button
                @click="downloadApplication"
                class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Download Application
              </button>
              <button
                @click="contactSupport"
                class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>

          <!-- Application Stats -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Application Statistics</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Application ID</span>
                <span class="font-medium text-gray-900">{{ application.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Reference ID</span>
                <span class="font-medium text-gray-900">{{ application.referenceId }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Days Since Applied</span>
                <span class="font-medium text-gray-900">{{ getDaysSinceApplied() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Days to Deadline</span>
                <span class="font-medium text-gray-900">{{ getDaysToDeadline() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Completion Rate</span>
                <span class="font-medium text-gray-900">{{ getCompletionRate() }}%</span>
              </div>
            </div>
          </div>

          <!-- Sponsor Information -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Sponsor Information</h3>
            <div class="flex items-center space-x-3 mb-4">
              <img
                :src="application.sponsorAvatar"
                :alt="application.sponsorName"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <h4 class="font-medium text-gray-900">{{ application.sponsorName }}</h4>
                <p class="text-sm text-gray-600">Verified Sponsor</p>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Response Time</span>
                <span class="font-medium text-gray-900">{{ application.sponsorResponseTime || '2-3 days' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Success Rate</span>
                <span class="font-medium text-gray-900">{{ application.sponsorSuccessRate || '85%' }}</span>
              </div>
            </div>
          </div>

          <!-- Related Applications -->
          <div v-if="relatedApplications.length" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Related Applications</h3>
            <div class="space-y-3">
              <div v-for="related in relatedApplications" :key="related.id" class="border border-gray-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900 text-sm">{{ related.title }}</h4>
                  <span :class="getStatusBadgeClass(related.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ formatStatus(related.status) }}
                  </span>
                </div>
                <p class="text-xs text-gray-600">{{ related.sponsorName }}</p>
                <router-link
                  :to="`/applications/${related.id}`"
                  class="text-xs text-coral-600 hover:text-coral-700 font-medium"
                >
                  View Application →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useNotificationStore } from '../../../stores/notifications'
import { useApplicationsStore } from '../../../stores/applications'
import Sidebar from '../../../components/Sidebar.vue'
import { studentNavigationItems } from '../../../lib/data/navItems'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const applicationsStore = useApplicationsStore()

const application = ref(null)
const relatedApplications = ref([])

const fetchApplicationDetails = () => {
  const appId = parseInt(route.params.id)
  application.value = applicationsStore.getApplication(appId)
  
  if (!application.value) {
    return
  }
  
  // Fetch related applications from the same sponsor or similar type
  relatedApplications.value = applicationsStore.applications
    .filter(app => app.id !== appId && app.studentId === authStore.user?.id)
    .slice(0, 3)
}

const fetchRelatedApplications = () => {
  // Already handled in fetchApplicationDetails
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatStatus = (status) => {
  const statuses = {
    'pending': 'Pending Review',
    'under_review': 'Under Review',
    'document_review': 'Document Review',
    'interview_scheduled': 'Interview Scheduled',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'withdrawn': 'Withdrawn'
  }
  return statuses[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'under_review': 'bg-blue-100 text-blue-800',
    'document_review': 'bg-orange-100 text-orange-800',
    'interview_scheduled': 'bg-purple-100 text-purple-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'withdrawn': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getTypeBadgeClass = (type) => {
  const classes = {
    'scholarship': 'bg-blue-100 text-blue-800',
    'offer': 'bg-green-100 text-green-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getDocumentStatusClass = (status) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getTestStatusClass = (status) => {
  const classes = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getProgressSteps = () => {
  const steps = [
    { name: 'Applied', completed: true, current: false },
    { name: 'Review', completed: false, current: true },
    { name: 'Interview', completed: false, current: false },
    { name: 'Decision', completed: false, current: false }
  ]
  
  // Update based on actual status
  if (application.value.status === 'interview_scheduled') {
    steps[1].completed = true
    steps[1].current = false
    steps[2].current = true
  } else if (application.value.status === 'approved' || application.value.status === 'rejected') {
    steps[1].completed = true
    steps[2].completed = true
    steps[3].completed = true
    steps[3].current = false
  }
  
  return steps
}

const getCurrentStep = () => {
  const steps = getProgressSteps()
  return steps.findIndex(step => step.current) + 1 || steps.filter(step => step.completed).length + 1
}

const getTotalSteps = () => {
  return getProgressSteps().length
}

const getStatusDescription = () => {
  const descriptions = {
    'pending': 'Your application is in the queue and will be reviewed soon.',
    'under_review': 'Our team is currently reviewing your application and documents.',
    'document_review': 'Some of your documents need attention. Please check the documents section below.',
    'interview_scheduled': 'Your interview has been scheduled. Please prepare accordingly.',
    'approved': 'Congratulations! Your application has been approved.',
    'rejected': 'Unfortunately, your application was not successful this time.',
    'withdrawn': 'You have withdrawn this application.'
  }
  return descriptions[application.value.status] || 'Status information not available.'
}

const getDaysSinceApplied = () => {
  const now = new Date()
  const applied = new Date(application.value.appliedAt)
  const diffTime = Math.abs(now - applied)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getDaysToDeadline = () => {
  const now = new Date()
  const deadline = new Date(application.value.deadline)
  const diffTime = deadline - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

const getCompletionRate = () => {
  const totalSteps = getTotalSteps()
  const completedSteps = getProgressSteps().filter(step => step.completed).length
  return Math.round((completedSteps / totalSteps) * 100)
}

const hasRejectedDocuments = () => {
  return application.value.documents?.some(doc => doc.status === 'rejected')
}

const withdrawApplication = async () => {
  if (confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
    try {
      await applicationsStore.withdrawApplication(application.value.id)
      application.value.status = 'withdrawn'
      notificationStore.addNotification({
        type: 'info',
        title: 'Application Withdrawn',
        message: 'Your application has been successfully withdrawn.'
      })
      // Redirect back to applications list after a short delay
      setTimeout(() => {
        router.push('/student/applications')
      }, 2000)
    } catch (error) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to withdraw application. Please try again.'
      })
    }
  }
}

const rescheduleInterview = () => {
  notificationStore.addNotification({
    type: 'info',
    title: 'Interview Rescheduling',
    message: 'Please contact support to reschedule your interview.'
  })
}

const resubmitDocuments = () => {
  notificationStore.addNotification({
    type: 'info',
    title: 'Document Resubmission',
    message: 'Please upload the corrected documents through the application portal.'
  })
}

const downloadApplication = () => {
  notificationStore.addNotification({
    type: 'success',
    title: 'Download Started',
    message: 'Your application PDF is being prepared for download.'
  })
}

const contactSupport = () => {
  notificationStore.addNotification({
    type: 'info',
    title: 'Support Contact',
    message: 'Our support team will contact you within 24 hours.'
  })
}

onMounted(() => {
  fetchApplicationDetails()
  fetchRelatedApplications()
})
</script>
