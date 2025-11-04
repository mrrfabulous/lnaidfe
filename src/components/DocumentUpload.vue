<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-semibold text-gray-900">Document Management</h3>
      <button
        @click="showUploadModal = true"
        class="px-4 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2 inline" />
        Upload Document
      </button>
    </div>

    <!-- Document List -->
    <div v-if="documents.length > 0" class="space-y-4">
      <div v-for="doc in documents" :key="doc.id" class="border border-gray-200 rounded-xl p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-gray-100 rounded-lg">
              <component :is="getDocumentIcon(doc.type)" class="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ doc.name }}</h4>
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <span>{{ doc.type.toUpperCase() }}</span>
                <span>•</span>
                <span>{{ doc.size }}</span>
                <span>•</span>
                <span>{{ formatDate(doc.uploadedAt) }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <span :class="getStatusBadgeClass(doc.status)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ formatStatus(doc.status) }}
            </span>
            
            <div class="flex items-center space-x-1">
              <button
                @click="downloadDocument(doc)"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="Download"
              >
                <Download class="w-4 h-4" />
              </button>
              
              <button
                @click="replaceDocument(doc)"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="Replace"
              >
                <RotateCcw class="w-4 h-4" />
              </button>
              
              <button
                @click="deleteDocument(doc)"
                class="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                title="Delete"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Document Feedback -->
        <div v-if="doc.feedback" class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-start space-x-2">
            <AlertTriangle class="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-yellow-800">Feedback from Reviewer:</p>
              <p class="text-sm text-yellow-700 mt-1">{{ doc.feedback }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <FileText class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-sm font-medium text-gray-900">No documents uploaded</h3>
      <p class="mt-2 text-sm text-gray-500">Upload your required documents to complete your application.</p>
      <button
        @click="showUploadModal = true"
        class="mt-4 px-4 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors"
      >
        Upload First Document
      </button>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div 
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          @click="closeUploadModal"
        ></div>

        <!-- Modal content -->
        <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Upload Document</h3>
            <button
              @click="closeUploadModal"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="handleUpload" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select
                v-model="uploadForm.documentType"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">Select document type</option>
                <option value="transcript">Academic Transcript</option>
                <option value="recommendation">Letter of Recommendation</option>
                <option value="statement">Personal Statement</option>
                <option value="identification">Valid ID</option>
                <option value="certificate">Certificate</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div v-if="uploadForm.documentType === 'other'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Custom Document Name</label>
              <input
                v-model="uploadForm.customName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                placeholder="Enter document name"
              />
            </div>

            <!-- File Upload Area -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select File</label>
              <div 
                class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-coral-500 transition-colors cursor-pointer"
                @click="$refs.fileInput.click()"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  @change="handleFileSelect"
                />
                
                <div v-if="!uploadForm.selectedFile">
                  <Upload class="mx-auto h-12 w-12 text-gray-400" />
                  <div class="mt-4">
                    <p class="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                    <p class="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                
                <div v-else class="flex items-center justify-center space-x-2">
                  <CheckCircle class="w-6 h-6 text-green-500" />
                  <span class="text-sm font-medium text-gray-900">{{ uploadForm.selectedFile.name }}</span>
                  <button
                    type="button"
                    @click.stop="uploadForm.selectedFile = null"
                    class="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="uploadProgress > 0 && uploadProgress < 100" class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Uploading...</span>
                <span class="text-gray-900">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${uploadProgress}%` }"
                ></div>
              </div>
            </div>

            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                @click="closeUploadModal"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="!canUpload || isUploading"
                class="flex-1 px-4 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ isUploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Plus, Download, RotateCcw, Trash2, X, Upload, CheckCircle, 
  FileText, AlertTriangle 
} from 'lucide-vue-next'
import { useNotificationStore } from '../stores/notifications'
import { useApplicationsStore } from '../stores/applications'

const props = defineProps({
  applicationId: {
    type: Number,
    required: true
  },
  documents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['documentsUpdated'])

const notificationStore = useNotificationStore()
const applicationsStore = useApplicationsStore()

const showUploadModal = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

const uploadForm = ref({
  documentType: '',
  customName: '',
  selectedFile: null
})

const canUpload = computed(() => {
  return uploadForm.value.documentType && 
         uploadForm.value.selectedFile &&
         (uploadForm.value.documentType !== 'other' || uploadForm.value.customName)
})

const getDocumentIcon = (type) => {
  const iconMap = {
    'pdf': FileText,
    'doc': FileText,
    'docx': FileText,
    'jpg': FileText,
    'jpeg': FileText,
    'png': FileText
  }
  return iconMap[type.toLowerCase()] || FileText
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'under_review': 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status) => {
  const statuses = {
    'pending': 'Pending Review',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'under_review': 'Under Review'
  }
  return statuses[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      notificationStore.addNotification({
        type: 'error',
        title: 'File Too Large',
        message: 'Please select a file smaller than 10MB.'
      })
      return
    }
    uploadForm.value.selectedFile = file
  }
}

const handleDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.size > 10 * 1024 * 1024) {
      notificationStore.addNotification({
        type: 'error',
        title: 'File Too Large',
        message: 'Please select a file smaller than 10MB.'
      })
      return
    }
    uploadForm.value.selectedFile = file
  }
}

const simulateUpload = () => {
  return new Promise((resolve) => {
    uploadProgress.value = 0
    const interval = setInterval(() => {
      uploadProgress.value += 10
      if (uploadProgress.value >= 100) {
        clearInterval(interval)
        resolve()
      }
    }, 200)
  })
}

const handleUpload = async () => {
  if (!canUpload.value) return

  isUploading.value = true
  
  try {
    // Simulate file upload progress
    await simulateUpload()
    
    const documentName = uploadForm.value.documentType === 'other' 
      ? uploadForm.value.customName 
      : getDocumentTypeName(uploadForm.value.documentType)
    
    const newDocument = {
      id: Date.now(),
      name: documentName,
      type: uploadForm.value.selectedFile.type.split('/')[1] || 'pdf',
      size: `${(uploadForm.value.selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      status: 'pending',
      uploadedAt: new Date().toISOString(),
      feedback: null
    }

    // Update application documents
    await applicationsStore.uploadDocument(props.applicationId, newDocument)
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Document Uploaded',
      message: `${documentName} has been uploaded successfully.`
    })

    emit('documentsUpdated')
    closeUploadModal()
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Upload Failed',
      message: 'Failed to upload document. Please try again.'
    })
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}

const getDocumentTypeName = (type) => {
  const names = {
    'transcript': 'Academic Transcript',
    'recommendation': 'Letter of Recommendation',
    'statement': 'Personal Statement',
    'identification': 'Valid ID',
    'certificate': 'Certificate'
  }
  return names[type] || type
}

const downloadDocument = (doc) => {
  // In a real app, this would download the actual file
  notificationStore.addNotification({
    type: 'info',
    title: 'Download Started',
    message: `Downloading ${doc.name}...`
  })
}

const replaceDocument = (doc) => {
  // Pre-fill the upload form with the document type
  uploadForm.value.documentType = getDocumentTypeKey(doc.name)
  showUploadModal.value = true
}

const getDocumentTypeKey = (name) => {
  const typeMap = {
    'Academic Transcript': 'transcript',
    'Letter of Recommendation': 'recommendation',
    'Personal Statement': 'statement',
    'Valid ID': 'identification',
    'Certificate': 'certificate'
  }
  return typeMap[name] || 'other'
}

const deleteDocument = async (doc) => {
  if (confirm(`Are you sure you want to delete "${doc.name}"?`)) {
    try {
      await applicationsStore.deleteDocument(props.applicationId, doc.id)
      
      notificationStore.addNotification({
        type: 'info',
        title: 'Document Deleted',
        message: `${doc.name} has been deleted.`
      })

      emit('documentsUpdated')
    } catch (error) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete document. Please try again.'
      })
    }
  }
}

const closeUploadModal = () => {
  showUploadModal.value = false
  uploadForm.value = {
    documentType: '',
    customName: '',
    selectedFile: null
  }
  uploadProgress.value = 0
  isUploading.value = false
}
</script>
