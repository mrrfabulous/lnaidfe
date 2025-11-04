<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-bold text-gray-900">
            {{ application.studentName }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">{{ application.studentEmail }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <!-- Status -->
          <span
            :class="[
              'px-2 py-1 text-xs rounded-full font-medium',
              getStatusColor(application.status)
            ]"
          >
            {{ formatStatus(application.status) }}
          </span>
          <!-- Type -->
          <span
            :class="[
              'px-2 py-1 text-xs rounded-full',
              application.type === 'offer'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            ]"
          >
            {{ application.type === 'offer' ? 'Offer' : 'Scholarship' }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left: Application details -->
      <div class="col-span-2">
        <div class="space-y-6">
          <!-- Academic Info -->
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Academic Information</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">School</p>
                  <p class="font-medium text-gray-900">{{ application.school }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Course</p>
                  <p class="font-medium text-gray-900">{{ application.course }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Level</p>
                  <p class="font-medium text-gray-900">{{ application.level }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">GPA</p>
                  <p class="font-medium text-gray-900">{{ application.gpa }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cover Letter -->
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Cover Letter</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <p v-if="application.coverLetter" class="text-gray-700 whitespace-pre-line">
                {{ application.coverLetter }}
              </p>
              <p v-else class="text-gray-400 italic">No cover letter provided.</p>
            </div>
          </div>

          <!-- Documents -->
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Documents</h4>
            <div v-if="application.documents?.length" class="grid grid-cols-2 gap-3">
              <div
                v-for="doc in application.documents"
                :key="doc"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="text-sm text-gray-700">{{ doc }}</span>
              </div>
            </div>
            <p v-else class="text-gray-400 italic">No documents uploaded.</p>
          </div>

          <!-- Review Notes -->
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Review Notes</h4>
            <textarea
              v-model="reviewNotes"
              @blur="emit('update-notes', { id: application.id, notes: reviewNotes })"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add your review notes here..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Right: Actions and Timeline -->
      <div>
        <div class="space-y-4">
          <!-- Timeline -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">Application Timeline</h4>
            <div class="space-y-4">
              <!-- Submitted -->
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Application Submitted</p>
                  <p class="text-xs text-gray-500">{{ formatDate(application.appliedAt) }}</p>
                </div>
              </div>

              <!-- Status Change -->
              <div v-if="application.status !== 'pending'" class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div
                    :class="[
                      'w-2 h-2 mt-2 rounded-full',
                      application.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                    ]"
                  ></div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ application.status === 'approved' ? 'Application Approved' : 'Application Rejected' }}
                  </p>
                  <p class="text-xs text-gray-500">{{ formatDate(application.lastUpdated) }}</p>
                </div>
              </div>

              <!-- Interview -->
              <div v-if="application.interviewDate" class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Interview Scheduled</p>
                  <p class="text-xs text-gray-500">{{ formatDate(application.interviewDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Scholarship Progress -->
          <div v-if="application.type === 'scholarship'" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">Application Progress</h4>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Step {{ application.currentStep }} of 4</span>
                <span class="text-gray-900 font-medium">
                  {{ Math.round((application.currentStep / 4) * 100) }}%
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full transition-all"
                  :style="{ width: `${(application.currentStep / 4) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3 sticky top-4">
            <template v-if="application.status === 'pending'">
              <button
                @click="updateStatus('approved')"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Approve Application
              </button>
              <button
                @click="updateStatus('rejected')"
                class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject Application
              </button>
            </template>

            <button
              v-if="application.status === 'approved' && !application.interviewDate"
              @click="scheduleInterview"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Interview
            </button>

            <button
              @click="sendMessage"
              class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Message Applicant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  application: { type: Object, required: true }
});

const emit = defineEmits(['update-status', 'schedule-interview', 'send-message', 'update-notes']);

const reviewNotes = ref('');

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    interview_scheduled: 'bg-blue-100 text-blue-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatStatus = (status) => {
  const statuses = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    interview_scheduled: 'Interview Scheduled'
  };
  return statuses[status] || status;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
};

const updateStatus = (status) => {
  emit('update-status', { ...props.application, status, reviewNotes: reviewNotes.value });
};

const scheduleInterview = () => {
  emit('schedule-interview', props.application);
};

const sendMessage = () => {
  emit('send-message', props.application);
};
</script>
