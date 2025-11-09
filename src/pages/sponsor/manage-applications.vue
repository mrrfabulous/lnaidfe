<template>
  <Sidebar 
    :navigation-items="sponsorNavigationItems" 
    page-title="Settings"
    page-subtitle="Manage your account settings and preferences"
  >
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Manage Applications</h1>
        <p class="text-gray-600 mt-2">Review and manage applications for your offers and scholarships</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="typeFilter" class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              id="typeFilter"
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Types</option>
              <option value="offer">Offers</option>
              <option value="scholarship">Scholarships</option>
            </select>
          </div>

          <div>
            <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              id="statusFilter"
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="interview_scheduled">Interview Scheduled</option>
            </select>
          </div>

          <div>
            <label for="programFilter" class="block text-sm font-medium text-gray-700 mb-2">Program</label>
            <select
              id="programFilter"
              v-model="filters.programId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Programs</option>
              <option v-for="program in allPrograms" :key="program.id" :value="program.id">
                {{ program.title }}
              </option>
            </select>
          </div>

          <div>
            <label for="searchFilter" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              id="searchFilter"
              v-model="filters.search"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Student name or email"
            >
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="toggleSelectAll"
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            >
            <span class="ml-2 text-sm text-gray-600">Select All</span>
          </label>
          <span class="text-sm text-gray-500" v-if="selectedApplications.length">
            {{ selectedApplications.length }} selected
          </span>
        </div>
        <div class="flex items-center space-x-2" v-if="selectedApplications.length">
          <button
            @click="bulkUpdateStatus('approved')"
            class="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Approve Selected
          </button>
          <button
            @click="bulkUpdateStatus('rejected')"
            class="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reject Selected
          </button>
          <button
            @click="bulkScheduleInterviews"
            class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Schedule Interviews
          </button>
          <button
            @click="exportSelected"
            class="px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Export Selected
          </button>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-700">Advanced Filters</h3>
          <button
            @click="clearFilters"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Filters
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div class="flex space-x-2">
              <input
                type="date"
                v-model="filters.dateFrom"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
              <input
                type="date"
                v-model="filters.dateTo"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">GPA Range</label>
            <div class="flex space-x-2">
              <input
                type="number"
                v-model="filters.gpaFrom"
                placeholder="Min"
                step="0.1"
                min="0"
                max="5"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
              <input
                type="number"
                v-model="filters.gpaTo"
                placeholder="Max"
                step="0.1"
                min="0"
                max="5"
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              v-model="sorting.field"
              class="w-2/3 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="appliedAt">Application Date</option>
              <option value="studentName">Student Name</option>
              <option value="gpa">GPA</option>
              <option value="status">Status</option>
            </select>
            <select
              v-model="sorting.order"
              class="w-1/3 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Applications List -->
      <div v-if="selectedApplication" class="bg-white rounded-lg shadow-sm">
        <ApplicationReview
          :application="selectedApplication"
          @update-status="handleStatusUpdate"
          @schedule-interview="openInterviewModal"
          @send-message="handleSendMessage"
        />
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">
            Applications ({{ filteredApplications.length }})
          </h2>
          <div class="flex items-center space-x-2">
            <button
              @click="exportAll"
              class="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Export All</span>
            </button>
          </div>
        </div>

        <div v-if="filteredApplications.length === 0" class="p-8 text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-500">No applications found</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="application in sortedApplications"
            :key="`${application.type}-${application.programId}-${application.id}`"
            class="p-6 hover:bg-gray-50"
          >
            <div class="flex items-start space-x-4">
              <div class="pt-1">
                <input
                  type="checkbox"
                  :checked="isSelected(application)"
                  @change="toggleSelect(application)"
                  class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                >
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-medium text-gray-900">{{ application.studentName }}</h3>
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    getStatusColor(application.status)
                  ]">
                    {{ formatStatus(application.status) }}
                  </span>
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    application.type === 'offer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  ]">
                    {{ application.type === 'offer' ? 'Offer' : 'Scholarship' }}
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span class="font-medium">Program:</span>
                    <span class="ml-1">{{ application.programTitle }}</span>
                  </div>
                  <div>
                    <span class="font-medium">School:</span>
                    <span class="ml-1">{{ application.school }}</span>
                  </div>
                  <div>
                    <span class="font-medium">Course:</span>
                    <span class="ml-1">{{ application.course }}</span>
                  </div>
                  <div>
                    <span class="font-medium">Level:</span>
                    <span class="ml-1">{{ application.level }}</span>
                  </div>
                  <div>
                    <span class="font-medium">GPA:</span>
                    <span class="ml-1">{{ application.gpa }}</span>
                  </div>
                  <div>
                    <span class="font-medium">Applied:</span>
                    <span class="ml-1">{{ formatDate(application.appliedAt) }}</span>
                  </div>
                </div>

                <div v-if="application.coverLetter" class="text-sm text-gray-700 mb-3">
                  <span class="font-medium">Cover Letter:</span>
                  <p class="mt-1">{{ application.coverLetter.substring(0, 200) }}...</p>
                </div>

                <div v-if="application.documents?.length" class="mb-3">
                  <span class="text-sm font-medium text-gray-700">Documents:</span>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="doc in application.documents"
                      :key="doc"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {{ doc }}
                    </span>
                  </div>
                </div>

                <!-- Scholarship specific info -->
                <div v-if="application.type === 'scholarship' && application.currentStep" class="mb-3">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-700">Progress:</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-indigo-600 h-2 rounded-full" 
                        :style="{ width: `${(application.currentStep / getTotalSteps(application.programId)) * 100}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-600">
                      Step {{ application.currentStep }} of {{ getTotalSteps(application.programId) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col space-y-2 ml-4">
                <button
                  @click="viewApplication(application)"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                >
                  View Details
                </button>
                
                <div v-if="application.status === 'pending'" class="flex space-x-2">
                  <button
                    @click="updateApplicationStatus(application, 'approved')"
                    class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    @click="updateApplicationStatus(application, 'rejected')"
                    class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>

                <div v-if="application.type === 'scholarship' && application.status === 'approved'" class="flex space-x-2">
                  <button
                    @click="scheduleInterview(application)"
                    class="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Application Detail View -->
      <div v-if="selectedApplication" class="space-y-6">
        <div class="flex items-center justify-between">
          <button
            @click="selectedApplication = null"
            class="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Applications
          </button>
        </div>

        <ApplicationReview
          :application="selectedApplication"
          @update-status="handleStatusUpdate"
          @schedule-interview="openInterviewModal"
          @send-message="handleSendMessage"
        />
    </div>
  
    <!-- Interview Scheduling Modal -->
    <div v-if="showInterviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Schedule Interview</h3>
          <button @click="closeInterviewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
            <input
              type="datetime-local"
              v-model="interviewForm.datetime"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
            <select
              v-model="interviewForm.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="virtual">Virtual</option>
              <option value="in-person">In Person</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          
          <div v-if="interviewForm.type === 'virtual'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <input
              type="url"
              v-model="interviewForm.link"
              placeholder="https://meet.google.com/..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div v-if="interviewForm.type === 'in-person'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              v-model="interviewForm.location"
              placeholder="Office address..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="interviewForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Any additional information..."
            ></textarea>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeInterviewModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="confirmScheduleInterview"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Schedule Interview
          </button>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Send Message</h3>
          <button @click="closeMessageModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              v-model="messageForm.subject"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Message subject..."
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              v-model="messageForm.content"
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="messageForm.sendCopy"
              id="sendCopy"
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            >
            <label for="sendCopy" class="ml-2 text-sm text-gray-600">
              Send me a copy
            </label>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeMessageModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="sendMessage"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Send Message
          </button>
        </div>
        <!-- Modal Overlays -->
      <div v-if="showInterviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Schedule Interview</h3>
          <button @click="closeInterviewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
            <input
              type="datetime-local"
              v-model="interviewForm.datetime"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
            <select
              v-model="interviewForm.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="virtual">Virtual</option>
              <option value="in-person">In Person</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          
          <div v-if="interviewForm.type === 'virtual'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <input
              type="url"
              v-model="interviewForm.link"
              placeholder="https://meet.google.com/..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div v-if="interviewForm.type === 'in-person'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              v-model="interviewForm.location"
              placeholder="Office address..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="interviewForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Any additional information..."
            ></textarea>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeInterviewModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="confirmScheduleInterview"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Schedule Interview
          </button>
        </div>
      </div>
    </div>

    <div v-if="showMessageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Send Message</h3>
          <button @click="closeMessageModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              v-model="messageForm.subject"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Message subject..."
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              v-model="messageForm.content"
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="messageForm.sendCopy"
              id="sendCopy"
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            >
            <label for="sendCopy" class="ml-2 text-sm text-gray-600">
              Send me a copy
            </label>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeMessageModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="sendMessage"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
  </Sidebar>
</template>

<style scoped>
</style>

<style scoped>
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useOffersStore } from '../../stores/offers'
import { useScholarshipsStore } from '../../stores/scholarships'
import { useNotificationStore } from '../../stores/notifications'
import ApplicationReview from '../../components/ApplicationReview.vue'
import InterviewScheduleModal from '../../components/InterviewScheduleModal.vue'
import Sidebar from '../../components/Sidebar.vue'
import { sponsorNavigationItems } from "../../lib/data/navItems";
const authStore = useAuthStore()
const offersStore = useOffersStore()
const scholarshipsStore = useScholarshipsStore()
const notificationStore = useNotificationStore()

const selectedApplication = ref(null)

// State
const selectedApplications = ref([])
const showInterviewModal = ref(false)
const showMessageModal = ref(false)

const filters = reactive({
  type: '',
  status: '',
  programId: '',
  search: '',
  dateFrom: '',
  dateTo: '',
  gpaFrom: '',
  gpaTo: ''
})

const sorting = reactive({
  field: 'appliedAt',
  order: 'desc'
})

const interviewForm = reactive({
  datetime: '',
  type: 'virtual',
  link: '',
  location: '',
  notes: ''
})

const messageForm = reactive({
  subject: '',
  content: '',
  sendCopy: false
})

offersStore.initializeOffers()
scholarshipsStore.initializeScholarships()


const allPrograms = computed(() => {
  const offers = offersStore.getSponsorOffers(authStore.user?.id) || []
  const scholarships = scholarshipsStore.getSponsorScholarships(authStore.user?.id) || []
  
  return [
    ...offers.map(offer => ({ ...offer, type: 'offer' })),
    ...scholarships.map(scholarship => ({ ...scholarship, type: 'scholarship' }))
  ]
})

const allApplications = computed(() => {
  const applications = []
  
  // Get applications from offers
  const offers = offersStore.getSponsorOffers(authStore.user?.id) || []
  offers.forEach(offer => {
    offer.applications?.forEach(app => {
      applications.push({
        ...app,
        type: 'offer',
        programId: offer.id,
        programTitle: offer.title
      })
    })
  })
  
  // Get applications from scholarships
  const scholarships = scholarshipsStore.getSponsorScholarships(authStore.user?.id) || []
  scholarships.forEach(scholarship => {
    scholarship.applications?.forEach(app => {
      applications.push({
        ...app,
        type: 'scholarship',
        programId: scholarship.id,
        programTitle: scholarship.title
      })
    })
  })
  
  return applications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
})

const filteredApplications = computed(() => {
  let filtered = allApplications.value
  
  if (filters.type) {
    filtered = filtered.filter(app => app.type === filters.type)
  }
  
  if (filters.status) {
    filtered = filtered.filter(app => app.status === filters.status)
  }
  
  if (filters.programId) {
    filtered = filtered.filter(app => app.programId === parseInt(filters.programId))
  }
  
  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(app => 
      app.studentName.toLowerCase().includes(search) ||
      app.studentEmail.toLowerCase().includes(search)
    )
  }
  
  return filtered
})

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'interview_scheduled': 'bg-blue-100 text-blue-800',
    'awarded': 'bg-purple-100 text-purple-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status) => {
  const statuses = {
    'pending': 'Pending Review',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'interview_scheduled': 'Interview Scheduled',
    'awarded': 'Awarded'
  }
  return statuses[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const getTotalSteps = (programId) => {
  const scholarship = scholarshipsStore.getScholarshipById(programId)
  return scholarship?.applicationProcess?.length || 1
}

const viewApplication = (application) => {
  selectedApplication.value = application
}

const updateApplicationStatus = async (application, status) => {
  try {
    if (application.type === 'offer') {
      offersStore.updateApplicationStatus(application.programId, application.id, status)
    } else {
      scholarshipsStore.updateApplicationStatus(application.programId, application.id, status)
    }
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Application updated',
      message: `Application has been ${status}`
    })
    
    selectedApplication.value = null
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Update failed',
      message: 'Failed to update application status'
    })
  }
}

const isAllSelected = computed(() => {
  return filteredApplications.value.length > 0 &&
    filteredApplications.value.every(app => selectedApplications.value.includes(app.id))
})

const sortedApplications = computed(() => {
  return [...filteredApplications.value].sort((a, b) => {
    const aValue = a[sorting.field]
    const bValue = b[sorting.field]
    
    if (sorting.order === 'asc') {
      return aValue < bValue ? -1 : 1
    } else {
      return aValue > bValue ? -1 : 1
    }
  })
})

// Selection methods
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedApplications.value = []
  } else {
    selectedApplications.value = filteredApplications.value.map(app => app.id)
  }
}

const isSelected = (application) => {
  return selectedApplications.value.includes(application.id)
}

const toggleSelect = (application) => {
  const index = selectedApplications.value.indexOf(application.id)
  if (index === -1) {
    selectedApplications.value.push(application.id)
  } else {
    selectedApplications.value.splice(index, 1)
  }
}

// Bulk actions
const bulkUpdateStatus = async (status) => {
  try {
    for (const appId of selectedApplications.value) {
      const app = allApplications.value.find(a => a.id === appId)
      if (app) {
        await updateApplicationStatus(app, status)
      }
    }
    selectedApplications.value = []
    notificationStore.addNotification({
      type: 'success',
      title: 'Bulk update successful',
      message: `Successfully updated ${selectedApplications.value.length} applications`
    })
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Bulk update failed',
      message: 'Failed to update some applications'
    })
  }
}

const bulkScheduleInterviews = () => {
  showInterviewModal.value = true
}

// Interview scheduling
const openInterviewModal = (application) => {
  selectedApplication.value = application;
  showInterviewModal.value = true;
}

const handleScheduleInterview = async (interviewData) => {
  try {
    const application = selectedApplication.value;
    
    // Update the application status and add interview details
    await handleStatusUpdate({
      application,
      status: 'interview_scheduled',
      notes: `Interview scheduled for ${new Date(interviewData.date).toLocaleString()}\n${interviewData.notes || ''}`
    });
    
    // Store interview details
    if (application.type === 'scholarship') {
      await scholarshipsStore.scheduleInterview(application.programId, application.id, interviewData);
    } else {
      await offersStore.scheduleInterview(application.programId, application.id, interviewData);
    }
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Interview Scheduled',
      message: `Interview has been scheduled with ${application.studentName}`
    });
    
    showInterviewModal.value = false;
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Scheduling Failed',
      message: 'Failed to schedule the interview'
    });
  }
}

const closeInterviewModal = () => {
  showInterviewModal.value = false
  Object.assign(interviewForm, {
    datetime: '',
    type: 'virtual',
    link: '',
    location: '',
    notes: ''
  })
}



// Messaging
const openMessageModal = (application) => {
  if (application) {
    selectedApplications.value = [application.id]
  }
  showMessageModal.value = true
}

const closeMessageModal = () => {
  showMessageModal.value = false
  Object.assign(messageForm, {
    subject: '',
    content: '',
    sendCopy: false
  })
}

const handleSendMessage = async (application) => {
  try {
    // Implement the message sending logic here using your API
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicationId: application.id,
        recipientEmail: application.studentEmail,
        subject: 'Application Update',
        message: messageForm.content,
        sendCopy: messageForm.sendCopy
      })
    });

    notificationStore.addNotification({
      type: 'success',
      title: 'Message Sent',
      message: `Message has been sent to ${application.studentName}`
    });

    closeMessageModal();
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Message Failed',
      message: 'Failed to send the message'
    });
  }
}

// Export functionality
const exportSelected = () => {
  const selectedApps = allApplications.value.filter(app => selectedApplications.value.includes(app.id))
  exportApplications(selectedApps)
}

const exportAll = () => {
  exportApplications(filteredApplications.value)
}

const exportApplications = (applications) => {
  // Create CSV content
  const headers = ['Student Name', 'Email', 'Program', 'Type', 'Status', 'Applied Date', 'GPA']
  const rows = applications.map(app => [
    app.studentName,
    app.studentEmail,
    app.programTitle,
    app.type,
    formatStatus(app.status),
    formatDate(app.appliedAt),
    app.gpa
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', `applications-export-${new Date().toISOString()}.csv`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Filter helpers
const clearFilters = () => {
  Object.assign(filters, {
    type: '',
    status: '',
    programId: '',
    search: '',
    dateFrom: '',
    dateTo: '',
    gpaFrom: '',
    gpaTo: ''
  })
}
</script>
