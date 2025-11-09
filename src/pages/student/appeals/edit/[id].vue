<template>

    <Sidebar
    page-title="Edit Funding Appeal"
    page-subtitle=""
    :navigation-items="studentNavigationItems"
    >
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Edit Appeal</h1>
                <p class="text-sm text-gray-500">Update your funding appeal details</p>
              </div>
              <router-link 
                :to="`/student/appeals/${route.params.id}`"
                class="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-2"
              >
                <ArrowLeft class="h-5 w-5" />
                <span>Back to Appeal</span>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
            <p class="text-gray-600 mt-4">Loading appeal...</p>
          </div>
        </div>

        <div v-else-if="!appeal" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-900">Appeal not found</h1>
            <p class="text-gray-600 mt-2">The appeal you're trying to edit doesn't exist or has been removed.</p>
            <router-link 
              to="/student/appeals" 
              class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 inline-block mt-4"
            >
              Back to My Appeals
            </router-link>
          </div>
        </div>

        <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <!-- Basic Information -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Basic Information</h2>
              
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Appeal Title *</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="e.g., Computer Science Textbooks for Final Year Project"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    id="category"
                    v-model="form.category"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  >
                    <option value="">Select a category</option>
                    <option value="Education Materials">Education Materials</option>
                    <option value="Research Equipment">Research Equipment</option>
                    <option value="Laboratory Equipment">Laboratory Equipment</option>
                    <option value="School Fees">School Fees</option>
                    <option value="Medical Equipment">Medical Equipment</option>
                    <option value="Research Materials">Research Materials</option>
                    <option value="Professional Development">Professional Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label for="targetAmount" class="block text-sm font-medium text-gray-700 mb-2">Target Amount (₦) *</label>
                  <input
                    id="targetAmount"
                    v-model.number="form.targetAmount"
                    type="number"
                    required
                    min="1000"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                    placeholder="50,000"
                  />
                </div>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  id="description"
                  v-model="form.description"
                  required
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors resize-none"
                  placeholder="Explain your funding needs, how the money will be used, and why it's important for your education..."
                ></textarea>
                <div class="flex justify-between items-center mt-2">
                  <p class="text-sm text-gray-500">{{ form.description.length }}/2000 characters</p>
                </div>
              </div>
            </div>

            <!-- Academic Information -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Academic Information</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="school" class="block text-sm font-medium text-gray-700 mb-2">School/University *</label>
                  <input
                    id="school"
                    v-model="form.school"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                    placeholder="University of Lagos"
                  />
                </div>

                <div>
                  <label for="course" class="block text-sm font-medium text-gray-700 mb-2">Course of Study *</label>
                  <input
                    id="course"
                    v-model="form.course"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label for="level" class="block text-sm font-medium text-gray-700 mb-2">Academic Level *</label>
                  <select
                    id="level"
                    v-model="form.level"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  >
                    <option value="">Select level</option>
                    <option value="100 Level">100 Level</option>
                    <option value="200 Level">200 Level</option>
                    <option value="300 Level">300 Level</option>
                    <option value="400 Level">400 Level</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label for="gpa" class="block text-sm font-medium text-gray-700 mb-2">Current GPA (Optional)</label>
                  <input
                    id="gpa"
                    v-model="form.gpa"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                    placeholder="4.5/5.0"
                  />
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Appeal Status</h2>
              
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                </select>
                <p class="text-sm text-gray-500 mt-1">
                  Choose "Active" to make your appeal visible to sponsors, "Paused" to temporarily hide it, or "Draft" to save without publishing.
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="border-t border-gray-200 pt-6">
              <div class="flex justify-end space-x-4">
                <router-link
                  :to="`/student/appeals/${route.params.id}`"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </router-link>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-3 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span v-if="loading">Updating...</span>
                  <span v-else>Update Appeal</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppealsStore } from '../../../../stores/appeals'
import { useNotificationStore } from '../../../../stores/notifications'
import Sidebar from '../../../../components/Sidebar.vue'
import { studentNavigationItems } from '../../../../lib/data/navItems'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const appealsStore = useAppealsStore()
const notificationStore = useNotificationStore()

const isLoading = ref(true)
const loading = ref(false)
const appeal = ref(null)

const form = reactive({
  title: '',
  category: '',
  targetAmount: 0,
  description: '',
  school: '',
  course: '',
  level: '',
  gpa: '',
  status: 'active'
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
    
    const appealId = route.params.id
    appeal.value = appealsStore.getAppealById(parseInt(appealId))
    
    if (appeal.value) {
      // Populate form with existing data
      Object.assign(form, {
        title: appeal.value.title || '',
        category: appeal.value.category || '',
        targetAmount: appeal.value.targetAmount || 0,
        description: appeal.value.description || '',
        school: appeal.value.school || '',
        course: appeal.value.course || '',
        level: appeal.value.level || '',
        gpa: appeal.value.gpa || '',
        status: appeal.value.status || 'active'
      })
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

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const updates = {
      title: form.title,
      category: form.category,
      targetAmount: form.targetAmount,
      description: form.description,
      school: form.school,
      course: form.course,
      level: form.level,
      gpa: form.gpa,
      status: form.status,
      updatedAt: new Date().toISOString()
    }
    
    appealsStore.updateAppeal(appeal.value.id, updates)
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Appeal updated',
      message: 'Your appeal has been successfully updated.'
    })
    
    router.push(`/student/appeals/${appeal.value.id}`)
  } catch (error) {
    console.error('Error updating appeal:', error)
    notificationStore.addNotification({
      type: 'error',
      title: 'Update failed',
      message: 'Failed to update your appeal. Please try again.'
    })
  } finally {
    loading.value = false
  }
}
</script>
