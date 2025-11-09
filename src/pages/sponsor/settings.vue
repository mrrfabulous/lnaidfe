<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Settings"
    page-subtitle="Manage your account settings and preferences">

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
                <button v-if="!authStore.user?.verified" @click="sendVerificationEmail"
                  class="text-coral-500 hover:text-coral-600 font-medium text-sm">
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
                  <input id="currentPassword" v-model="passwordForm.currentPassword" type="password" required
                    class="form-input">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="newPassword" class="form-label">New Password</label>
                    <input id="newPassword" v-model="passwordForm.newPassword" type="password" required
                      class="form-input">
                  </div>
                  <div>
                    <label for="confirmPassword" class="form-label">Confirm New Password</label>
                    <input id="confirmPassword" v-model="passwordForm.confirmPassword" type="password" required
                      class="form-input">
                  </div>
                </div>
                <button type="submit" :disabled="passwordLoading" class="btn-primary">
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
                <input v-model="settings.emailNotifications" type="checkbox" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Push Notifications</h3>
                <p class="text-sm text-gray-600">Receive push notifications in your browser</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.pushNotifications" type="checkbox" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Marketing Communications</h3>
                <p class="text-sm text-gray-600">Receive updates about new features and opportunities</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.marketingEmails" type="checkbox" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                </div>
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
                  <input v-model="settings.newOffers" type="checkbox" class="sr-only peer">
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                  </div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Appeal Updates</h3>
                  <p class="text-sm text-gray-600">Get notified about donations and updates to your appeals</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="settings.appealUpdates" type="checkbox" class="sr-only peer">
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                  </div>
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
                  <input v-model="settings.newApplications" type="checkbox" class="sr-only peer">
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                  </div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Program Updates</h3>
                  <p class="text-sm text-gray-600">Get notified about your program performance and milestones</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="settings.programUpdates" type="checkbox" class="sr-only peer">
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t">
            <button @click="saveNotificationSettings" :disabled="settingsLoading" class="btn-primary">
              {{ settingsLoading ? 'Saving...' : 'Save Preferences' }}
            </button>
          </div>
        </div>

        <!-- Team Management -->
        <div v-if="authStore.user?.role === 'sponsor'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Team Management</h2>
            <button @click="showInviteModal = true"
              class="px-4 py-2 bg-coral-600 text-white rounded-lg hover:bg-coral-700 transition-colors duration-200 flex items-center">
              <PlusIcon class="w-5 h-5 mr-2" />
              Invite Member
            </button>
          </div>

          <!-- Team Members List -->
          <div class="space-y-4 mb-8">
            <div v-for="member in teamMembers" :key="member.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div class="flex items-center space-x-4">
                <img :src="member.avatar || '/placeholder-user.jpg'" :alt="member.name"
                  class="w-10 h-10 rounded-full" />
                <div>
                  <h3 class="font-medium text-gray-900">{{ member.name }}</h3>
                  <p class="text-sm text-gray-600">{{ member.email }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <select v-model="member.role" @change="updateMemberRole(member)"
                  class="block w-40 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500">
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
                <button @click="removeMember(member)" class="text-gray-400 hover:text-red-600">
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Role Management -->
          <div class="border-t pt-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Roles & Permissions</h3>
              <button @click="showNewRoleModal = true"
                class="px-4 py-2 text-coral-600 border border-coral-600 rounded-lg hover:bg-coral-50 transition-colors duration-200 flex items-center">
                <PlusIcon class="w-5 h-5 mr-2" />
                Create Role
              </button>
            </div>

            <div class="space-y-6">
              <div v-for="role in roles" :key="role.id" class="p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-gray-900">{{ role.name }}</h4>
                  <div class="flex items-center space-x-2">
                    <button v-if="role.editable" @click="editRole(role)"
                      class="text-gray-400 hover:text-gray-600">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                    <button v-if="role.editable" @click="deleteRole(role)"
                      class="text-gray-400 hover:text-red-600">
                      <TrashIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="permission in role.permissions" :key="permission.id"
                    class="flex items-center text-sm text-gray-600">
                    <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2" />
                    {{ permission.name }}
                  </div>
                </div>
              </div>
            </div>
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
                <input v-model="settings.profileVisible" type="checkbox" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Show Contact Information</h3>
                <p class="text-sm text-gray-600">Allow others to see your contact details</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.showContact" type="checkbox" class="sr-only peer">
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500">
                </div>
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
              <button @click="showDeactivateModal = true"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                Deactivate
              </button>
            </div>

            <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div>
                <h3 class="font-medium text-red-900">Delete Account</h3>
                <p class="text-sm text-red-700">Permanently delete your account and all data</p>
              </div>
              <button @click="showDeleteModal = true"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Deactivate Modal -->
      <div v-if="showDeactivateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Deactivate Account</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to deactivate your account? You can reactivate it anytime
            by logging in.</p>
          <div class="flex space-x-4">
            <button @click="showDeactivateModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="deactivateAccount"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Deactivate
            </button>
          </div>
        </div>
      </div>

      <!-- Invite Team Member Modal -->
      <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Invite Team Member</h3>
          <form @submit.prevent="handleInviteMember">
            <div class="space-y-4">
              <div>
                <label for="inviteEmail" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="inviteEmail" v-model="inviteForm.email" required
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500" />
              </div>
              <div>
                <label for="inviteRole" class="block text-sm font-medium text-gray-700">Role</label>
                <select id="inviteRole" v-model="inviteForm.role" required
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500">
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button type="button" @click="showInviteModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" :disabled="inviteLoading"
                class="px-4 py-2 bg-coral-600 text-white rounded-lg text-sm font-medium hover:bg-coral-700 disabled:opacity-50">
                {{ inviteLoading ? 'Sending...' : 'Send Invitation' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- New/Edit Role Modal -->
      <div v-if="showNewRoleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ editingRole ? 'Edit Role' : 'Create Role' }}
          </h3>
          <form @submit.prevent="handleRoleSubmit">
            <div class="space-y-4">
              <div>
                <label for="roleName" class="block text-sm font-medium text-gray-700">Role Name</label>
                <input type="text" id="roleName" v-model="roleForm.name" required
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div class="space-y-2">
                  <div v-for="permission in availablePermissions" :key="permission.id" class="flex items-center">
                    <input type="checkbox" :id="permission.id" v-model="roleForm.permissions" :value="permission.id"
                      class="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded" />
                    <label :for="permission.id" class="ml-2 text-sm text-gray-700">
                      {{ permission.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button type="button" @click="showNewRoleModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" :disabled="roleLoading"
                class="px-4 py-2 bg-coral-600 text-white rounded-lg text-sm font-medium hover:bg-coral-700 disabled:opacity-50">
                {{ roleLoading ? 'Saving...' : (editingRole ? 'Update Role' : 'Create Role') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
          <p class="text-gray-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
          <div class="mb-6">
            <label for="confirmDelete" class="form-label">Type "DELETE" to confirm</label>
            <input id="confirmDelete" v-model="deleteConfirmation" type="text" class="form-input" placeholder="DELETE">
          </div>
          <div class="flex space-x-4">
            <button @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="deleteAccount" :disabled="deleteConfirmation !== 'DELETE'"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
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
import { sponsorNavigationItems } from "../../lib/data/navItems";
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const passwordLoading = ref(false)
const settingsLoading = ref(false)
const showDeactivateModal = ref(false)
const showDeleteModal = ref(false)
const showInviteModal = ref(false)
const showNewRoleModal = ref(false)
const deleteConfirmation = ref('')
const inviteLoading = ref(false)
const roleLoading = ref(false)
const editingRole = ref(null)

// Team Management
const teamMembers = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder-user.jpg',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/placeholder-user.jpg',
    role: 'manager'
  }
])

const roles = ref([
  {
    id: 'admin',
    name: 'Administrator',
    editable: false,
    permissions: [
      { id: 'manage_team', name: 'Manage Team' },
      { id: 'manage_scholarships', name: 'Manage Scholarships' },
      { id: 'manage_offers', name: 'Manage Offers' },
      { id: 'view_analytics', name: 'View Analytics' }
    ]
  },
  {
    id: 'manager',
    name: 'Manager',
    editable: true,
    permissions: [
      { id: 'manage_scholarships', name: 'Manage Scholarships' },
      { id: 'manage_offers', name: 'Manage Offers' },
      { id: 'view_analytics', name: 'View Analytics' }
    ]
  }
])

const availablePermissions = [
  { id: 'manage_team', name: 'Manage Team' },
  { id: 'manage_scholarships', name: 'Manage Scholarships' },
  { id: 'manage_offers', name: 'Manage Offers' },
  { id: 'view_analytics', name: 'View Analytics' },
  { id: 'manage_applications', name: 'Manage Applications' },
  { id: 'view_reports', name: 'View Reports' }
]

const inviteForm = ref({
  email: '',
  role: ''
})

const roleForm = ref({
  name: '',
  permissions: []
})

// Team Management Methods
const handleInviteMember = async () => {
  inviteLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    teamMembers.value.push({
      id: Date.now(),
      name: inviteForm.value.email.split('@')[0],
      email: inviteForm.value.email,
      avatar: '/placeholder-user.jpg',
      role: inviteForm.value.role
    })

    notificationStore.addNotification({
      type: 'success',
      title: 'Invitation sent',
      message: `Invitation has been sent to ${inviteForm.value.email}`
    })

    showInviteModal.value = false
    inviteForm.value = { email: '', role: '' }
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Invitation failed',
      message: 'Failed to send invitation. Please try again.'
    })
  } finally {
    inviteLoading.value = false
  }
}

const updateMemberRole = async (member) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    notificationStore.addNotification({
      type: 'success',
      title: 'Role updated',
      message: `${member.name}'s role has been updated`
    })
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Update failed',
      message: 'Failed to update role. Please try again.'
    })
  }
}

const removeMember = async (member) => {
  if (!confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
    return
  }

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    teamMembers.value = teamMembers.value.filter(m => m.id !== member.id)
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Member removed',
      message: `${member.name} has been removed from the team`
    })
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Remove failed',
      message: 'Failed to remove team member. Please try again.'
    })
  }
}

const editRole = (role) => {
  editingRole.value = role
  roleForm.value = {
    name: role.name,
    permissions: role.permissions.map(p => p.id)
  }
  showNewRoleModal.value = true
}

const handleRoleSubmit = async () => {
  roleLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const rolePermissions = availablePermissions
      .filter(p => roleForm.value.permissions.includes(p.id))

    if (editingRole.value) {
      const index = roles.value.findIndex(r => r.id === editingRole.value.id)
      if (index !== -1) {
        roles.value[index] = {
          ...editingRole.value,
          name: roleForm.value.name,
          permissions: rolePermissions
        }
      }
    } else {
      roles.value.push({
        id: `role_${Date.now()}`,
        name: roleForm.value.name,
        editable: true,
        permissions: rolePermissions
      })
    }

    notificationStore.addNotification({
      type: 'success',
      title: 'Role saved',
      message: `Role "${roleForm.value.name}" has been ${editingRole.value ? 'updated' : 'created'}`
    })

    showNewRoleModal.value = false
    editingRole.value = null
    roleForm.value = { name: '', permissions: [] }
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Save failed',
      message: `Failed to ${editingRole.value ? 'update' : 'create'} role. Please try again.`
    })
  } finally {
    roleLoading.value = false
  }
}

const deleteRole = async (role) => {
  if (!confirm(`Are you sure you want to delete the ${role.name} role?`)) {
    return
  }

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    roles.value = roles.value.filter(r => r.id !== role.id)
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Role deleted',
      message: `${role.name} role has been deleted`
    })
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Delete failed',
      message: 'Failed to delete role. Please try again.'
    })
  }
}

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