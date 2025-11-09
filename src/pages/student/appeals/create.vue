<template>

    <Sidebar 
    page-title="Appeals"
    :navigation-items="studentNavigationItems"
    >
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Create New Appeal</h1>
                <p class="text-sm text-gray-500">Share your story and request funding for your educational needs</p>
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
        </div class="min-h-screen bg-gray-50">
    <!-- Header2 -->
    <!-- <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Create Funding Appeal</h1>
            <p class="text-sm text-gray-500">Tell your story and request funding for your educational needs</p>
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
    </div> -->

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <option value="tuition">Tuition Fees</option>
                <option value="books">Books & Supplies</option>
                <option value="accommodation">Accommodation</option>
                <option value="living">Living Expenses</option>
                <option value="technology">Technology & Equipment</option>
                <option value="emergency">Emergency Funding</option>
                <option value="other">Other</option>
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
              <p class="text-sm text-gray-500">{{ form.description.length }}/1000 characters</p>
              <div v-if="form.description.length > 1000" class="text-sm text-red-500">
                Character limit exceeded
              </div>
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
                :placeholder="authStore.user?.school || 'University of Lagos'"
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
                :placeholder="authStore.user?.course || 'Computer Science'"
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
                <option value="500 Level">500 Level</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label for="gpa" class="block text-sm font-medium text-gray-700 mb-2">Current GPA (Optional)</label>
              <input
                id="gpa"
                v-model.number="form.gpa"
                type="number"
                step="0.01"
                min="0"
                max="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                placeholder="4.50"
              />
            </div>
          </div>
        </div>

        <!-- Supporting Documents -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Supporting Documents</h2>
          <p class="text-gray-600">Upload documents to support your appeal (required)</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Student ID Card</label>
              <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-coral-400 transition-colors">
                <input
                  type="file"
                  @change="handleFileUpload($event, 'idCard')"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="hidden"
                  ref="idCardInput"
                />
                <button
                  type="button"
                  @click="$refs.idCardInput.click()"
                  class="text-coral-600 hover:text-coral-700 transition-colors"
                >
                  <Upload class="w-8 h-8 mx-auto mb-2" />
                  Click to upload ID Card
                </button>
                <p class="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                <div v-if="form.documents.idCard" class="mt-2 text-sm text-green-600 flex items-center justify-center">
                  <Check class="w-4 h-4 mr-1" />
                  {{ form.documents.idCard.name }}
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Supporting Document *</label>
              <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-coral-400 transition-colors">
                <input
                  type="file"
                  @change="handleFileUpload($event, 'document')"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  ref="documentInput"
                />
                <button
                  type="button"
                  @click="$refs.documentInput.click()"
                  class="text-coral-600 hover:text-coral-700 transition-colors"
                >
                  <Upload class="w-8 h-8 mx-auto mb-2" />
                  Click to upload document
                </button>
                <p class="text-sm text-gray-500 mt-1">PDF, DOC, DOCX up to 5MB</p>
                <div v-if="form.documents.document" class="mt-2 text-sm text-green-600 flex items-center justify-center">
                  <Check class="w-4 h-4 mr-1" />
                  {{ form.documents.document.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Budget Breakdown -->
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Budget Breakdown</h2>
          <p class="text-gray-600">Provide a detailed breakdown of how the funds will be used</p>
          
          <div class="space-y-4">
            <div v-for="(item, index) in form.budgetItems" :key="index" class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Item/Service</label>
                <input
                  v-model="item.description"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="e.g., Programming Textbook"
                />
              </div>
              <div class="w-40">
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                <input
                  v-model.number="item.amount"
                  type="number"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <button
                type="button"
                @click="removeBudgetItem(index)"
                class="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors"
                :disabled="form.budgetItems.length === 1"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
            
            <button
              type="button"
              @click="addBudgetItem"
              class="text-coral-600 hover:text-coral-700 text-sm font-medium flex items-center transition-colors"
            >
              <Plus class="w-4 h-4 mr-1" />
              Add Budget Item
            </button>
            
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-900">Total Budget:</span>
                <span class="text-lg font-semibold text-gray-900">₦{{ budgetTotal.toLocaleString() }}</span>
              </div>
              <div v-if="budgetTotal !== form.targetAmount" class="text-sm text-amber-600 mt-1 flex items-center">
                <AlertTriangle class="w-4 h-4 mr-1" />
                Budget total (₦{{ budgetTotal.toLocaleString() }}) doesn't match target amount (₦{{ form.targetAmount.toLocaleString() }})
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex justify-end space-x-4">
            <router-link 
              to="/student/appeals" 
              class="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="px-6 py-3 bg-coral-500 text-white rounded-xl hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{{ loading ? 'Creating Appeal...' : 'Create Appeal' }}</span>
              <ArrowRight v-if="!loading" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
      </div>
    </Sidebar>

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useAppealsStore } from '../../../stores/appeals'
import { useNotificationStore } from '../../../stores/notifications'
import Sidebar from '../../../components/Sidebar.vue'
import { studentNavigationItems } from '../../../lib/data/navItems'

import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Check, 
  Plus, 
  Trash2, 
  AlertTriangle 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const appealsStore = useAppealsStore()
const notificationStore = useNotificationStore()

const loading = ref(false)
const form = reactive({
  title: '',
  category: '',
  targetAmount: '',
  description: '',
  school: authStore.user?.school || '',
  course: authStore.user?.course || '',
  level: authStore.user?.level || '',
  gpa: '',
  documents: {
    idCard: null,
    document: null
  },
  budgetItems: [
    { description: '', amount: 0 }
  ]
})

const budgetTotal = computed(() => 
  form.budgetItems.reduce((total, item) => total + (item.amount || 0), 0)
)

const isFormValid = computed(() => 
  form.title && 
  form.category && 
  form.targetAmount && 
  form.description && 
  form.school && 
  form.course && 
  form.level && 
  form.description.length <= 1000 && 
  form.documents.idCard &&     
  form.documents.document 
)

const handleFileUpload = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      notificationStore.addNotification({
        type: 'error',
        title: 'File too large',
        message: 'Please select a file smaller than 5MB'
      })
      return
    }
    form.documents[type] = file
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    // Create FormData to handle file uploads
    const formData = new FormData()
    
    formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('requestedAmount', form.targetAmount)
      formData.append('category', form.category)
      formData.append('instituteName', form.school)
      formData.append('courseOfStudy', form.course)
      formData.append('level', form.level)
      if (form.gpa) {
        formData.append('gpa', form.gpa)
      }
    
    // Add budget items as JSON string
    const validBudgetItems = form.budgetItems.filter(item => item.description && item.amount > 0)
    formData.append('items', JSON.stringify(validBudgetItems))
    
    // Add actual files
     if (form.documents.idCard) {
      formData.append('idCard', form.documents.idCard)
    }
    
    if (form.documents.document) {
      formData.append('document', form.documents.document) 
    }
    
    // Add metadata
    formData.append('status', 'active')
    formData.append('raisedAmount', '0')
    formData.append('createdAt', new Date().toISOString())
    formData.append('updatedAt', new Date().toISOString())

    //  console.log('=== FormData Debug ===');
    // for (let [key, value] of formData.entries()) {
    //   if (value instanceof File) {
    //     console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
    //   } else {
    //     console.log(`${key}: ${value}`);
    //   }
    // }

    //  console.log('=== End FormData Debug ===');


  // Debug checks
  console.log('Is FormData?', formData instanceof FormData);
  console.log('Files check:');
  console.log('idCard file:', form.documents.idCard);
  console.log('document file:', form.documents.document);
  
  // Make sure both files exist
  if (!form.documents.idCard || !form.documents.document) {
    console.error('Missing files!', {
      idCard: !!form.documents.idCard,
      document: !!form.documents.document
    });
    return;
  }

    // Send FormData instead of JSON
    const result = await appealsStore.createAppeal(formData)
    
    if (result.success) {
      notificationStore.addNotification({
        type: 'success',
        title: 'Appeal created successfully!',
        message: 'Your funding appeal has been published and is now visible to sponsors.'
      })
      router.push(`/student/appeals/${result.id}`)
    } else {      
      notificationStore.addNotification({
        type: 'error',
        title: 'Failed to create appeal',
        message: result?.message || 'An error occurred while creating your appeal. Please try again.'
      })
    }
    
  } catch (error) {
    console.error('Appeal creation error:', error)
    notificationStore.addNotification({
      type: 'error',
      title: 'Failed to create appeal',
      message: 'An error occurred while creating your appeal. Please try again.'
    })
  } finally {
    loading.value = false
  }
}


const addBudgetItem = () => {
  form.budgetItems.push({ description: '', amount: 0 })
}

const removeBudgetItem = (index) => {
  if (form.budgetItems.length > 1) {
    form.budgetItems.splice(index, 1)
  }
}


</script>
