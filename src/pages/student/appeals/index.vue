<template>
  <Sidebar
   page-title="Appeals"
    page-subtitle="manage your funding appeals"
    :navigation-items="studentNavigationItems" 
  >
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">My Appeals</h1>
              <p class="text-sm text-gray-500">
                Manage your funding appeals and track their progress
              </p>
            </div>
            <router-link
              to="/student/appeals/create"
              class="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus class="h-5 w-5" />
              <span>Create Appeal</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Appeals</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ userAppeals.length }}
                </p>
              </div>
              <div class="p-3 bg-blue-100 rounded-xl">
                <Heart class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Active Appeals</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ activeAppeals.length }}
                </p>
              </div>
              <div class="p-3 bg-green-100 rounded-xl">
                <Zap class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Raised</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  ₦{{ totalRaised.toLocaleString() }}
                </p>
              </div>
              <div class="p-3 bg-coral-100 rounded-xl">
                <DollarSign class="w-6 h-6 text-coral-600" />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Success Rate</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">
                  {{ successRate }}%
                </p>
              </div>
              <div class="p-3 bg-purple-100 rounded-xl">
                <TrendingUp class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Search -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
          >
            <div
              class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1"
            >
              <div class="relative">
                <Search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                />
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search appeals..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 w-full sm:w-64"
                />
              </div>
              <select
                v-model="filters.status"
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>
              <select
                v-model="filters.category"
                class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value="">All Categories</option>
                <option value="tuition">Tuition Fees</option>
                <option value="books">Books & Supplies</option>
                <option value="accommodation">Accommodation</option>
                <option value="living">Living Expenses</option>
                <option value="technology">Technology & Equipment</option>
                <option value="emergency">Emergency Funding</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="flex items-center space-x-3">
              <button
                @click="clearFilters"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Appeals Grid -->
        <div
          v-if="filteredAppeals.length === 0"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
        >
          <Heart class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No appeals found
          </h3>
          <p class="text-gray-600 mb-6">
            {{
              userAppeals.length === 0
                ? "You haven't created any appeals yet."
                : "No appeals match your current filters."
            }}
          </p>
          <router-link
            v-if="userAppeals.length === 0"
            to="/student/appeals/create"
            class="bg-coral-500 text-white px-6 py-3 rounded-lg hover:bg-coral-600 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Plus class="h-5 w-5" />
            <span>Create Your First Appeal</span>
          </router-link>
        </div>

        <div v-else class="grid gap-6">
          <div
            v-for="appeal in filteredAppeals"
            :key="appeal.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-xl font-semibold text-gray-900">
                      {{ appeal.title }}
                    </h3>
                    <span
                      :class="getStatusColor(appeal.status)"
                      class="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {{ formatStatus(appeal.status) }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-2">{{ appeal.category }}</p>
                  <p class="text-gray-700 line-clamp-2">
                    {{
                      appeal.shortDescription ||
                      appeal.description ||
                      appeal.story
                    }}
                  </p>
                </div>
                <div class="text-right ml-6">
                  <p class="text-2xl font-bold text-gray-900">
                    ₦{{ appeal.raisedAmount?.toLocaleString() || 0 }}
                  </p>
                  <p class="text-sm text-gray-500">
                    of ₦{{ appeal.targetAmount?.toLocaleString() || 0 }}
                  </p>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span
                    >{{
                      Math.round(
                        ((appeal.raisedAmount || 0) /
                          (appeal.targetAmount || 1)) *
                          100
                      )
                    }}% funded</span
                  >
                  <span>{{ appeal.donations?.length || 0 }} donors</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-coral-500 h-2 rounded-full transition-all duration-300"
                    :style="{
                      width:
                        Math.min(
                          ((appeal.raisedAmount || 0) /
                            (appeal.targetAmount || 1)) *
                            100,
                          100
                        ) + '%',
                    }"
                  ></div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div
                class="flex items-center justify-between pt-4 border-t border-gray-100"
              >
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar class="h-4 w-4" />
                  <span>Created {{ formatDate(appeal.createdAt) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <router-link
                    :to="`/student/appeals/${appeal.id}`"
                    class="px-4 py-2 text-coral-600 hover:bg-coral-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Eye class="h-4 w-4" />
                    <span>View</span>
                  </router-link>
                  <router-link
                    :to="`/student/appeals/edit/${appeal.id}`"
                    class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Edit class="h-4 w-4" />
                    <span>Edit</span>
                  </router-link>
                  <button
                    @click="shareAppeal(appeal)"
                    class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Share2 class="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button
                    v-if="appeal.status === 'active'"
                    @click="pauseAppeal(appeal)"
                    class="px-3 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Pause class="h-4 w-4" />
                    <span>Pause</span>
                  </button>
                  <button
                    v-if="appeal.status === 'paused'"
                    @click="resumeAppeal(appeal)"
                    class="px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Play class="h-4 w-4" />
                    <span>Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div
        v-if="shareModal.show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Share Appeal</h3>
            <button
              @click="shareModal.show = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="h-6 w-6" />
            </button>
          </div>
          <p class="text-gray-600 mb-6">
            Share your appeal to reach more potential supporters
          </p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Appeal Link</label
              >
              <div class="flex">
                <input
                  :value="shareModal.link"
                  readonly
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-l-xl bg-gray-50 text-sm"
                />
                <button
                  @click="copyLink"
                  class="px-4 py-2 bg-coral-500 text-white rounded-r-xl hover:bg-coral-600 transition-colors"
                >
                  <Copy class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <button
                @click="shareToSocial('twitter')"
                class="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <span class="text-sm font-medium">Twitter</span>
              </button>
              <button
                @click="shareToSocial('facebook')"
                class="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <span class="text-sm font-medium">Facebook</span>
              </button>
              <button
                @click="shareToSocial('whatsapp')"
                class="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <span class="text-sm font-medium">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import { useAppealsStore } from "../../../stores/appeals";
import { useNotificationStore } from "../../../stores/notifications";
import Sidebar from "../../../components/Sidebar.vue";
import { studentNavigationItems } from "../../../lib/data/navItems";
import {
  Plus,
  Heart,
  Zap,
  DollarSign,
  TrendingUp,
  Search,
  Calendar,
  Eye,
  Edit,
  Share2,
  X,
  Copy,
  Pause,
  Play,
} from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const appealsStore = useAppealsStore();
const notificationStore = useNotificationStore();

const filters = reactive({
  status: "",
  category: "",
  search: "",
});

const shareModal = reactive({
  show: false,
  appeal: null,
  link: "",
});

onMounted(() => {
  appealsStore.getAppeals();
});

const userAppeals = computed(
  () => appealsStore.getUserAppeals(authStore.user?.id) || []
);

const activeAppeals = computed(() =>
  userAppeals.value.filter((appeal) => appeal.status === "active")
);

const totalRaised = computed(() =>
  userAppeals.value.reduce(
    (total, appeal) => total + (appeal.raisedAmount || 0),
    0
  )
);

const successRate = computed(() => {
  if (userAppeals.value.length === 0) return 0;
  const successful = userAppeals.value.filter(
    (appeal) => (appeal.raisedAmount || 0) >= (appeal.targetAmount || 1) * 0.8
  ).length;
  return Math.round((successful / userAppeals.value.length) * 100);
});

const filteredAppeals = computed(() => {
  let filtered = userAppeals.value;

  if (filters.status) {
    filtered = filtered.filter((appeal) => appeal.status === filters.status);
  }

  if (filters.category) {
    filtered = filtered.filter(
      (appeal) => appeal.category === filters.category
    );
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (appeal) =>
        appeal.title?.toLowerCase().includes(search) ||
        appeal.description?.toLowerCase().includes(search) ||
        appeal.story?.toLowerCase().includes(search)
    );
  }

  return filtered.sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt) -
      new Date(a.updatedAt || a.createdAt)
  );
});

const getStatusColor = (status) => {
  const colors = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    paused: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    draft: "bg-gray-100 text-gray-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const clearFilters = () => {
  filters.status = "";
  filters.category = "";
  filters.search = "";
};

const shareAppeal = (appeal) => {
  shareModal.appeal = appeal;
  shareModal.link = `${window.location.origin}/appeals/${appeal.id}`;
  shareModal.show = true;
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareModal.link);
    notificationStore.addNotification({
      type: "success",
      title: "Link copied",
      message: "Appeal link has been copied to clipboard",
    });
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Copy failed",
      message: "Failed to copy link to clipboard",
    });
  }
};

const shareToSocial = (platform) => {
  const appeal = shareModal.appeal;
  const link = shareModal.link;
  const text = `Help me raise funds for ${appeal.title}. ${(
    appeal.description || ""
  ).substring(0, 100)}...`;

  let shareUrl = "";

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(link)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + link)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
};

const pauseAppeal = (appeal) => {
  appealsStore.updateAppeal(appeal.id, { status: "paused" });
  notificationStore.addNotification({
    type: "info",
    title: "Appeal paused",
    message: "Your appeal has been paused and is no longer visible to donors.",
  });
};

const resumeAppeal = (appeal) => {
  appealsStore.updateAppeal(appeal.id, { status: "active" });
  notificationStore.addNotification({
    type: "success",
    title: "Appeal resumed",
    message: "Your appeal is now active and visible to donors again.",
  });
};
</script>
