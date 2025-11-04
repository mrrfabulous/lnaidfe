<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-indigo-600">Lnaid</h1>
            </router-link>

            <!-- Navigation Links -->
            <div v-if="authStore.isAuthenticated" class="hidden md:block ml-10">
              <div class="flex items-baseline space-x-4">
                <router-link
                  v-if="authStore.user?.role === 'student'"
                  to="/student/dashboard"
                  class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </router-link>
                <router-link
                  v-if="authStore.user?.role === 'sponsor'"
                  to="/sponsor/dashboard"
                  class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </router-link>
                <router-link
                  v-if="authStore.user?.role === 'educator'"
                  to="/educator/dashboard"
                  class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </router-link>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div v-if="authStore.isAuthenticated" class="relative">
              <button
                @click="showNotifications = !showNotifications"
                class="relative p-2 text-gray-600 hover:text-indigo-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v3.5"
                  ></path>
                </svg>
                <span
                  v-if="notificationStore.unreadCount > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ notificationStore.unreadCount }}
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200"
              >
                <div class="p-4 border-b border-gray-200">
                  <div class="flex justify-between items-center">
                    <h3 class="text-lg font-medium text-gray-900">
                      Notifications
                    </h3>
                    <button
                      @click="notificationStore.markAllAsRead()"
                      class="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Mark all read
                    </button>
                  </div>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-if="notificationStore.notifications.length === 0"
                    class="p-4 text-center text-gray-500"
                  >
                    No notifications
                  </div>
                  <div v-else>
                    <div
                      v-for="notification in notificationStore.notifications.slice(
                        0,
                        10
                      )"
                      :key="notification.id"
                      class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      :class="{ 'bg-blue-50': !notification.read }"
                      @click="notificationStore.markAsRead(notification.id)"
                    >
                      <p class="text-sm font-medium text-gray-900">
                        {{ notification.title }}
                      </p>
                      <p
                        v-if="notification.message"
                        class="text-sm text-gray-600 mt-1"
                      >
                        {{ notification.message }}
                      </p>
                      <p class="text-xs text-gray-500 mt-2">
                        {{ formatDate(notification.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Menu -->
            <div v-if="authStore.isAuthenticated" class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <img
                  :src="authStore.user?.avatar"
                  :alt="authStore.user?.name"
                  class="w-8 h-8 rounded-full"
                />
                <span class="text-sm font-medium">{{
                  authStore.user?.name
                }}</span>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
              >
                <div class="py-1">
                  <router-link
                    to="/student/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </router-link>
                  <router-link
                    to="/student/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </router-link>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>

            <!-- Auth Buttons -->
            <div v-else class="flex items-center space-x-4">
              <router-link
                to="/auth/login"
                class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </router-link>
              <router-link
                to="/auth/register"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const showNotifications = ref(false);
const showUserMenu = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showNotifications.value = false;
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
