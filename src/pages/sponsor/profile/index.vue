<template>
  <Sidebar :navigation-items="navigationItems" page-title="Organization Profile">
    <div class="min-h-screen bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>

      <div v-else-if="profile" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Profile Header -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div class="p-6">
            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <img
                  :src="profile.logo || '/placeholder-logo.svg'"
                  :alt="profile.organizationName"
                  class="h-24 w-24 object-contain rounded-lg"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                      {{ profile.organizationName }}
                    </h1>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ profile.industry }} · Established {{ profile.yearEstablished }}
                    </p>
                  </div>
                  <button
                    @click="router.push('/sponsor/profile/edit')"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PencilIcon class="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
                <div class="mt-4">
                  <p class="text-sm text-gray-600">{{ profile.description }}</p>
                </div>
                <div class="mt-4 flex items-center space-x-4">
                  <a
                    v-if="profile.website"
                    :href="profile.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <GlobeAltIcon class="h-5 w-5" />
                  </a>
                  <a
                    v-if="profile.socialMedia?.linkedin"
                    :href="profile.socialMedia.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <LinkedInIcon class="h-5 w-5" />
                  </a>
                  <a
                    v-if="profile.socialMedia?.twitter"
                    :href="profile.socialMedia.twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <TwitterIcon class="h-5 w-5" />
                  </a>
                  <a
                    v-if="profile.socialMedia?.facebook"
                    :href="profile.socialMedia.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <FacebookIcon class="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">Member Since</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ formatDate(profile.stats.memberSince) }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total Offers</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ profile.stats.totalOffersCreated }} offers
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total Scholarships</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ profile.stats.totalScholarshipsCreated }} scholarships
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total Disbursed</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ formatCurrency(profile.stats.totalDisbursed) }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Contact Information -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Contact Information</h3>
            </div>
            <div class="px-6 py-5">
              <dl class="divide-y divide-gray-200">
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Primary Email</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.contact.primaryEmail }}</dd>
                </div>
                <div v-if="profile.contact.alternateEmail" class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Alternate Email</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.contact.alternateEmail }}</dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Phone</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.contact.phone }}</dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <p>{{ profile.contact.address.street }}</p>
                    <p>{{ profile.contact.address.city }}, {{ profile.contact.address.state }} {{ profile.contact.address.zipCode }}</p>
                    <p>{{ profile.contact.address.country }}</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Documents -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Documents</h3>
            </div>
            <div class="px-6 py-5">
              <dl class="divide-y divide-gray-200">
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Registration Certificate</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <div v-if="profile.documents?.registrationCertificate" class="flex items-center">
                      <DocumentIcon class="h-5 w-5 text-gray-400 mr-2" />
                      <span class="flex-1">{{ profile.documents.registrationCertificate }}</span>
                      <button class="text-coral-600 hover:text-coral-700">Download</button>
                    </div>
                    <p v-else class="text-gray-500">No document uploaded</p>
                  </dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Tax Document</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <div v-if="profile.documents?.taxDocument" class="flex items-center">
                      <DocumentIcon class="h-5 w-5 text-gray-400 mr-2" />
                      <span class="flex-1">{{ profile.documents.taxDocument }}</span>
                      <button class="text-coral-600 hover:text-coral-700">Download</button>
                    </div>
                    <p v-else class="text-gray-500">No document uploaded</p>
                  </dd>
                </div>
                <div v-if="profile.documents?.otherDocuments?.length" class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Other Documents</dt>
                  <dd class="mt-1 space-y-2">
                    <div
                      v-for="doc in profile.documents.otherDocuments"
                      :key="doc"
                      class="flex items-center text-sm text-gray-900"
                    >
                      <DocumentIcon class="h-5 w-5 text-gray-400 mr-2" />
                      <span class="flex-1">{{ doc }}</span>
                      <button class="text-coral-600 hover:text-coral-700">Download</button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Notification Preferences</h3>
            </div>
            <div class="px-6 py-5">
              <dl class="divide-y divide-gray-200">
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Language</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.preferences.language }}</dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Time Zone</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ profile.preferences.timezone }}</dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Email Notifications</dt>
                  <dd class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <CheckCircleIcon
                        :class="[
                          'h-5 w-5 mr-2',
                          profile.preferences.emailNotifications ? 'text-green-500' : 'text-gray-300'
                        ]"
                      />
                      <span class="text-sm text-gray-900">General Email Notifications</span>
                    </div>
                    <div class="flex items-center">
                      <CheckCircleIcon
                        :class="[
                          'h-5 w-5 mr-2',
                          profile.preferences.applicationAlerts ? 'text-green-500' : 'text-gray-300'
                        ]"
                      />
                      <span class="text-sm text-gray-900">Application Alerts</span>
                    </div>
                    <div class="flex items-center">
                      <CheckCircleIcon
                        :class="[
                          'h-5 w-5 mr-2',
                          profile.preferences.monthlyReports ? 'text-green-500' : 'text-gray-300'
                        ]"
                      />
                      <span class="text-sm text-gray-900">Monthly Reports</span>
                    </div>
                    <div class="flex items-center">
                      <CheckCircleIcon
                        :class="[
                          'h-5 w-5 mr-2',
                          profile.preferences.newsletter ? 'text-green-500' : 'text-gray-300'
                        ]"
                      />
                      <span class="text-sm text-gray-900">Newsletter</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Impact Statistics -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Impact Statistics</h3>
            </div>
            <div class="px-6 py-5">
              <dl class="divide-y divide-gray-200">
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Total Beneficiaries</dt>
                  <dd class="mt-1">
                    <div class="flex items-center">
                      <span class="text-2xl font-semibold text-gray-900">
                        {{ profile.stats.totalBeneficiaries }}
                      </span>
                      <span class="ml-2 text-sm text-gray-500">students supported</span>
                    </div>
                  </dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Programs Created</dt>
                  <dd class="mt-1">
                    <div class="flex items-center space-x-4">
                      <div>
                        <span class="text-2xl font-semibold text-gray-900">
                          {{ profile.stats.totalOffersCreated }}
                        </span>
                        <span class="ml-1 text-sm text-gray-500">offers</span>
                      </div>
                      <div>
                        <span class="text-2xl font-semibold text-gray-900">
                          {{ profile.stats.totalScholarshipsCreated }}
                        </span>
                        <span class="ml-1 text-sm text-gray-500">scholarships</span>
                      </div>
                    </div>
                  </dd>
                </div>
                <div class="py-4">
                  <dt class="text-sm font-medium text-gray-500">Total Amount Disbursed</dt>
                  <dd class="mt-1">
                    <div class="flex items-center">
                      <span class="text-2xl font-semibold text-gray-900">
                        {{ formatCurrency(profile.stats.totalDisbursed) }}
                      </span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <ExclamationCircleIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Failed to load profile</h3>
          <p class="mt-1 text-sm text-gray-500">
            There was an error loading your organization profile. Please try again.
          </p>
          <div class="mt-6">
            <button
              @click="loadProfile"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coral-600 hover:bg-coral-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSponsorProfileStore } from '../../../stores/sponsorProfile.ts';
import Sidebar from '../../../components/Sidebar.vue';
import { navigationItems } from '../../../lib/data/navItems';
import {
  PencilIcon,
  DocumentIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline';
import {
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon
} from '../../../components/icons';

const router = useRouter();
const profileStore = useSponsorProfileStore();

const loading = computed(() => profileStore.loading);
const profile = computed(() => profileStore.profile);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const loadProfile = async () => {
  await profileStore.fetchProfile();
};

onMounted(() => {
  loadProfile();
});
</script>
