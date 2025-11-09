[<template>
  <Sidebar :navigation-items="sponsorNavigationItems" page-title="Edit Profile">
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Profile Type Selection -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Profile Type</h3>
            </div>
            <div class="px-6 py-5">
              <div class="flex items-center space-x-4">
                <button
                  type="button"
                  @click="form.sponsorType = 'individual'"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium flex-1',
                    form.sponsorType === 'individual'
                      ? 'bg-coral-50 text-coral-700 border-2 border-coral-500'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Individual Sponsor
                </button>
                <button
                  type="button"
                  @click="form.sponsorType = 'organization'"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium flex-1',
                    form.sponsorType === 'organization'
                      ? 'bg-coral-50 text-coral-700 border-2 border-coral-500'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Organization
                </button>
              </div>
            </div>
          </div>

          <!-- Basic Information -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Basic Information</h3>
            </div>
            <div class="px-6 py-5 space-y-6">
              <div v-if="form.sponsorType === 'organization'" class="space-y-6">
                <div>
                  <label for="organizationName" class="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    v-model="form.organizationName"
                    class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label for="industry" class="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    v-model="form.industry"
                    class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="nonprofit">Non-Profit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label for="yearEstablished" class="block text-sm font-medium text-gray-700">
                    Year Established
                  </label>
                  <input
                    type="number"
                    id="yearEstablished"
                    v-model="form.yearEstablished"
                    min="1800"
                    :max="new Date().getFullYear()"
                    class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>

              <div v-else class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="form.firstName"
                      class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="form.lastName"
                      class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                </div>
                <div>
                  <label for="occupation" class="block text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    v-model="form.occupation"
                    class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Contact Information</h3>
            </div>
            <div class="px-6 py-5 space-y-6">
              <div>
                <label for="primaryEmail" class="block text-sm font-medium text-gray-700">
                  Primary Email
                </label>
                <input
                  type="email"
                  id="primaryEmail"
                  v-model="form.contact.primaryEmail"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.contact.phone"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="street"
                  v-model="form.contact.address.street"
                  placeholder="Street Address"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
                <div class="grid grid-cols-2 gap-6 mt-4">
                  <input
                    type="text"
                    id="city"
                    v-model="form.contact.address.city"
                    placeholder="City"
                    class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                  <input
                    type="text"
                    id="state"
                    v-model="form.contact.address.state"
                    placeholder="State"
                    class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div class="grid grid-cols-2 gap-6 mt-4">
                  <input
                    type="text"
                    id="zipCode"
                    v-model="form.contact.address.zipCode"
                    placeholder="ZIP Code"
                    class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                  <input
                    type="text"
                    id="country"
                    v-model="form.contact.address.country"
                    placeholder="Country"
                    class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Social Media & Website</h3>
            </div>
            <div class="px-6 py-5 space-y-6">
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  v-model="form.website"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label for="linkedin" class="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  v-model="form.socialMedia.linkedin"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label for="twitter" class="block text-sm font-medium text-gray-700">
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  v-model="form.socialMedia.twitter"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
              <div>
                <label for="facebook" class="block text-sm font-medium text-gray-700">
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  v-model="form.socialMedia.facebook"
                  class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-coral-500 focus:border-coral-500"
                />
              </div>
            </div>
          </div>

          <!-- Document Upload -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Documents</h3>
            </div>
            <div class="px-6 py-5 space-y-6">
              <div v-if="form.sponsorType === 'organization'">
                <label class="block text-sm font-medium text-gray-700">
                  Registration Certificate
                </label>
                <div class="mt-1 flex items-center">
                  <input
                    type="file"
                    @change="handleRegistrationCertificateUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-coral-50 file:text-coral-700 hover:file:bg-coral-100"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Tax Document
                </label>
                <div class="mt-1 flex items-center">
                  <input
                    type="file"
                    @change="handleTaxDocumentUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-coral-50 file:text-coral-700 hover:file:bg-coral-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="button"
              @click="router.back()"
              class="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700 disabled:opacity-50"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSponsorProfileStore } from '../../../stores/sponsorProfile';
import { useNotificationStore } from '../../../stores/notifications';
import Sidebar from '../../../components/Sidebar.vue';
import { sponsorNavigationItems } from '../../../lib/data/navItems';

const router = useRouter();
const profileStore = useSponsorProfileStore();
const notificationStore = useNotificationStore();
const loading = ref(false);

const form = ref({
  sponsorType: 'individual',
  // Individual fields
  firstName: '',
  lastName: '',
  occupation: '',
  // Organization fields
  organizationName: '',
  industry: '',
  yearEstablished: '',
  // Common fields
  description: '',
  website: '',
  contact: {
    primaryEmail: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  },
  socialMedia: {
    linkedin: '',
    twitter: '',
    facebook: ''
  },
  documents: {
    registrationCertificate: null,
    taxDocument: null
  }
});

const initializeForm = () => {
  const profile = profileStore.profile;
  if (profile) {
    form.value = {
      sponsorType: profile.sponsorType || 'individual',
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      occupation: profile.occupation || '',
      organizationName: profile.organizationName || '',
      industry: profile.industry || '',
      yearEstablished: profile.yearEstablished || '',
      description: profile.description || '',
      website: profile.website || '',
      contact: {
        primaryEmail: profile.contact?.primaryEmail || '',
        phone: profile.contact?.phone || '',
        address: {
          street: profile.contact?.address?.street || '',
          city: profile.contact?.address?.city || '',
          state: profile.contact?.address?.state || '',
          zipCode: profile.contact?.address?.zipCode || '',
          country: profile.contact?.address?.country || ''
        }
      },
      socialMedia: {
        linkedin: profile.socialMedia?.linkedin || '',
        twitter: profile.socialMedia?.twitter || '',
        facebook: profile.socialMedia?.facebook || ''
      },
      documents: {
        registrationCertificate: null,
        taxDocument: null
      }
    };
  }
};

const handleRegistrationCertificateUpload = (event) => {
  form.value.documents.registrationCertificate = event.target.files[0];
};

const handleTaxDocumentUpload = (event) => {
  form.value.documents.taxDocument = event.target.files[0];
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    // Create FormData for file uploads
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.entries(form.value).forEach(([key, value]) => {
      if (key === 'documents') {
        if (value.registrationCertificate) {
          formData.append('registrationCertificate', value.registrationCertificate);
        }
        if (value.taxDocument) {
          formData.append('taxDocument', value.taxDocument);
        }
      } else if (key === 'contact' || key === 'socialMedia') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    await profileStore.updateProfile(formData);

    notificationStore.addNotification({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.'
    });

    router.push('/sponsor/profile');
  } catch (error) {
    notificationStore.addNotification({
      type: 'error',
      title: 'Update Failed',
      message: error.message || 'Failed to update profile. Please try again.'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  initializeForm();
});
</script>
