<template>
    <Sidebar 
    page-title="Settings"
    page-subtitle="Manage your account settings and preferences"
    :navigation-items="studentNavigationItems"
  >
  
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <div class="space-y-8">
          <!-- Account Settings -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
            
            <div class="space-y-6">
              <!-- Email Verification -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 class="font-medium text-gray-900">Email Verification</h3>
                  <p class="text-sm text-gray-600">{{ authStore.user?.email }}</p>
                </div>
                <div class="flex items-center space-x-3">
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    authStore.user?.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  ]">
                    {{ authStore.user?.verified ? 'Verified' : 'Unverified' }}
                  </span>
                  <button 
                    v-if="!authStore.user?.verified"
                    @click="sendVerificationEmail"
                    class="text-coral-500 hover:text-coral-600 font-medium text-sm"
                  >
                    Verify
                  </button>
                </div>
              </div>
  
              <!-- Change Password -->
              <div class="border-t pt-6">
                <h3 class="font-medium text-gray-900 mb-4">Change Password</h3>
                <form @submit.prevent="handlePasswordChange" class="space-y-4">
                  <div>
                    <label for="currentPassword" class="form-label">Current Password</label>
                    <input
                      id="currentPassword"
                      v-model="passwordForm.currentPassword"
                      type="password"
                      required
                      class="form-input"
                    >
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="newPassword" class="form-label">New Password</label>
                      <input
                        id="newPassword"
                        v-model="passwordForm.newPassword"
                        type="password"
                        required
                        class="form-input"
                      >
                    </div>
                    <div>
                      <label for="confirmPassword" class="form-label">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        v-model="passwordForm.confirmPassword"
                        type="password"
                        required
                        class="form-input"
                      >
                    </div>
                  </div>
                  <button
                    type="submit"
                    :disabled="passwordLoading"
                    class="btn-primary"
                  >
                    {{ passwordLoading ? 'Updating...' : 'Update Password' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
  
          <!-- Notification Preferences -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Email Notifications</h3>
                  <p class="text-sm text-gray-600">Receive updates about your account via email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="settings.emailNotifications" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                </label>
              </div>
  
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Push Notifications</h3>
                  <p class="text-sm text-gray-600">Receive push notifications in your browser</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="settings.pushNotifications" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                </label>
              </div>
  
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Marketing Communications</h3>
                  <p class="text-sm text-gray-600">Receive updates about new features and opportunities</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="settings.marketingEmails" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                </label>
              </div>
  
              <!-- Student-specific notifications -->
              <div v-if="authStore.user?.role === 'student'" class="space-y-4 border-t pt-6">
                <h4 class="font-medium text-gray-900">Student Notifications</h4>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">New Offers</h3>
                    <p class="text-sm text-gray-600">Get notified when new offers match your profile</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="settings.newOffers" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                  </label>
                </div>
  
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">Appeal Updates</h3>
                    <p class="text-sm text-gray-600">Get notified about donations and updates to your appeals</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="settings.appealUpdates" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                  </label>
                </div>
              </div>
  
              <!-- Sponsor-specific notifications -->
              <div v-if="authStore.user?.role === 'sponsor'" class="space-y-4 border-t pt-6">
                <h4 class="font-medium text-gray-900">Sponsor Notifications</h4>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">New Applications</h3>
                    <p class="text-sm text-gray-600">Get notified when students apply to your programs</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="settings.newApplications" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                  </label>
                </div>
  
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">Program Updates</h3>
                    <p class="text-sm text-gray-600">Get notified about your program performance and milestones</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="settings.programUpdates" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                  </label>
                </div>
              </div>
            </div>
  
            <div class="mt-6 pt-6 border-t">
              <button
                @click="saveNotificationSettings"
                :disabled="settingsLoading"
                class="btn-primary"
              >
                {{ settingsLoading ? 'Saving...' : 'Save Preferences' }}
              </button>
            </div>
          </div>
  
          <!-- Privacy Settings -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Profile Visibility</h3>
                  <p class="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="settings.profileVisible" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                </label>
              </div>
  
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Show Contact Information</h3>
                  <p class="text-sm text-gray-600">Allow others to see your contact details</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    v-model="settings.showContact" 
                    type="checkbox" 
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
                </label>
              </div>
            </div>
          </div>
  
          <!-- Danger Zone -->
          <div class="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
            <h2 class="text-xl font-semibold text-red-600 mb-6">Danger Zone</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <h3 class="font-medium text-red-900">Deactivate Account</h3>
                  <p class="text-sm text-red-700">Temporarily disable your account</p>
                </div>
                <button 
                  @click="showDeactivateModal = true"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Deactivate
                </button>
              </div>
  
              <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <h3 class="font-medium text-red-900">Delete Account</h3>
                  <p class="text-sm text-red-700">Permanently delete your account and all data</p>
                </div>
                <button 
                  @click="showDeleteModal = true"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Deactivate Modal -->
        <div v-if="showDeactivateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Deactivate Account</h3>
            <p class="text-gray-600 mb-6">Are you sure you want to deactivate your account? You can reactivate it anytime by logging in.</p>
            <div class="flex space-x-4">
              <button
                @click="showDeactivateModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="deactivateAccount"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
  
        <!-- Delete Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
            <p class="text-gray-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
            <div class="mb-6">
              <label for="confirmDelete" class="form-label">Type "DELETE" to confirm</label>
              <input
                id="confirmDelete"
                v-model="deleteConfirmation"
                type="text"
                class="form-input"
                placeholder="DELETE"
              >
            </div>
            <div class="flex space-x-4">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="deleteAccount"
                :disabled="deleteConfirmation !== 'DELETE'"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../../stores/auth'
  import { useNotificationStore } from '../../stores/notifications'
  import Sidebar from '../../components/Sidebar.vue'
  import { studentNavigationItems } from "../../lib/data/navItems";

  const router = useRouter()
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()
  
  const passwordLoading = ref(false)
  const settingsLoading = ref(false)
  const showDeactivateModal = ref(false)
  const showDeleteModal = ref(false)
  const deleteConfirmation = ref('')
  
  const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const settings = reactive({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    newOffers: true,
    appealUpdates: true,
    newApplications: true,
    programUpdates: true,
    profileVisible: true,
    showContact: false
  })
  
  const sendVerificationEmail = () => {
    notificationStore.addNotification({
      type: 'info',
      title: 'Verification email sent',
      message: 'Please check your email for verification instructions.'
    })
  }
  
  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Password mismatch',
        message: 'New passwords do not match.'
      })
      return
    }
  
    passwordLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      notificationStore.addNotification({
        type: 'success',
        title: 'Password updated',
        message: 'Your password has been updated successfully.'
      })
      
      // Reset form
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } catch (error) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Update failed',
        message: 'Failed to update password. Please try again.'
      })
    } finally {
      passwordLoading.value = false
    }
  }
  



  const saveNotificationSettings = async () => {
    settingsLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      notificationStore.addNotification({
        type: 'success',
        title: 'Settings saved',
        message: 'Your notification preferences have been updated.'
      })
    } catch (error) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Save failed',
        message: 'Failed to save settings. Please try again.'
      })
    } finally {
      settingsLoading.value = false
    }
  }
  
  const deactivateAccount = () => {
    notificationStore.addNotification({
      type: 'info',
      title: 'Account deactivated',
      message: 'Your account has been deactivated. You can reactivate it anytime.'
    })
    showDeactivateModal.value = false
    authStore.logout()
    router.push('/')
  }
  
  const deleteAccount = () => {
    notificationStore.addNotification({
      type: 'success',
      title: 'Account deleted',
      message: 'Your account has been permanently deleted.'
    })
    showDeleteModal.value = false
    authStore.logout()
    router.push('/')
  }
  
  onMounted(() => {
    // Load user settings from localStorage or API
    const savedSettings = localStorage.getItem('edufund_settings')
    if (savedSettings) {
      Object.assign(settings, JSON.parse(savedSettings))
    }
  })
  </script>
  