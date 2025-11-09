<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Mobile Overlay -->
    <div v-if="showMobileSidebar" @click="closeMobileSidebar"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>

    <!-- Sidebar -->
    <div :class="[
      'bg-white shadow-xl border-r border-gray-100 transition-all duration-300 flex flex-col',
      // mobile
      'md:relative fixed inset-y-0 left-0 z-40',
      showMobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      // desktop
      isCollapsed ? 'md:w-20' : 'md:w-72',
      'w-72'
    ]">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-gray-100">
        <div :class="!isCollapsed
            ? 'flex items-center justify-between'
            : 'md:flex md:flex-col md:space-y-2 md:items-center flex items-center justify-between'
          ">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-coral-500 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">E</span>
            </div>
            <span :class="[!isCollapsed ? 'block' : 'md:hidden']" class="text-xl font-bold text-gray-900">Lnaid</span>
          </router-link>

          <!-- Desktop toggle button -->
          <button @click="toggleSidebar"
            class="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Mobile close button -->
          <button @click="closeMobileSidebar"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- User Profile -->
      <div :class="!isCollapsed ? 'p-6 border-b border-gray-100' : 'md:p-5 md:pr-1 p-6 border-b border-gray-100'">
        <div class="flex items-center space-x-3">
          <img :src="userDetails.profilePic || '/avatar.png'" :alt="userDetails.firstName"
            class="w-12 h-12 rounded-xl border-2 border-gray-200" />
          <div :class="[!isCollapsed ? 'block' : 'md:hidden']" class="flex-1 min-w-0">
            <p class="text-lg font-semibold text-gray-900 truncate">
              {{ userDetails.name || "User" }}
            </p>
            <p class="text-sm text-gray-500 capitalize">
              {{ authStore.user?.role }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        <div v-for="item in navigationItems" :key="item.name">
          <!-- Main nav item without children -->
          <router-link v-if="!item.children" :to="item.href" @click="closeMobileSidebar" :class="[
            'flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-coral-50 hover:text-coral-600 transition-all duration-200 group',
            isCurrentRoute(item.href) ? 'bg-coral-50 text-coral-600 shadow-sm' : '',
            isCollapsed ? 'md:justify-center' : ''
          ]">
            <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
            <span :class="[!isCollapsed ? 'block' : 'md:hidden']" class="ml-3 font-medium">{{ item.name }}</span>
            <div v-if="item.badge" :class="[!isCollapsed ? 'block' : 'md:hidden']" class="ml-auto">
              <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ item.badge }}</span>
            </div>
          </router-link>

          <!-- Nav item with children -->
          <div v-else class="relative">
            <button @click="toggleSubmenu(item.name)" :class="[
              'w-full flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-coral-50 hover:text-coral-600 transition-all duration-200',
              openSubmenus.includes(item.name) ? 'bg-coral-50 text-coral-600' : '',
              isCollapsed ? 'md:justify-center' : ''
            ]">
              <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
              <span :class="[!isCollapsed ? 'block' : 'md:hidden']" class="ml-3 font-medium flex-1 text-left">{{
                item.name }}</span>
              <svg :class="[
                'w-5 h-5 transition-transform duration-200',
                openSubmenus.includes(item.name) ? 'rotate-90' : '',
                !isCollapsed ? 'block' : 'md:hidden'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>

              <!-- arrow indicator for collapsed -->
              <svg class="hidden md:block w-3 h-3 absolute -right-1 top-1/2 -translate-y-1/2"
                :class="[isCollapsed ? 'md:block' : 'md:hidden']" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>

            <!-- Submenu -->
            <div v-if="openSubmenus.includes(item.name) && !isCollapsed" class="mt-2 ml-6 space-y-1 md:block">
              <router-link v-for="child in item.children" :key="child.name" :to="child.href" @click="closeMobileSidebar"
                :class="[
                  'flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200',
                  isCurrentRoute(child.href) ? 'bg-gray-100 text-gray-900' : ''
                ]">
                <span class="text-sm font-medium">{{ child.name }}</span>
              </router-link>
            </div>

            <!-- Submenu mobile-->
            <div v-if="openSubmenus.includes(item.name) && isCollapsed" class="mt-2 ml-6 space-y-1 md:hidden">
              <router-link v-for="child in item.children" :key="child.name" :to="child.href" @click="closeMobileSidebar"
                :class="[
                  'flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200',
                  isCurrentRoute(child.href) ? 'bg-gray-100 text-gray-900' : ''
                ]">
                <span class="text-sm font-medium">{{ child.name }}</span>
              </router-link>
            </div>

            <!-- Submenu - floating popup for desktop collapsed only -->
            <div v-if="openSubmenus.includes(item.name) && isCollapsed"
              class="hidden md:block absolute left-full top-0 ml-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-2">
              <div class="px-3 py-2 border-b border-gray-100">
                <p class="font-semibold text-gray-900 text-sm">{{ item.name }}</p>
              </div>
              <router-link v-for="child in item.children" :key="child.name" :to="child.href"
                @click="openSubmenus = openSubmenus.filter(name => name !== item.name)" :class="[
                  'flex items-center px-4 py-2 text-gray-600 hover:bg-coral-50 hover:text-coral-600 transition-colors duration-200',
                  isCurrentRoute(child.href) ? 'bg-coral-50 text-coral-600' : ''
                ]">
                <span class="text-sm font-medium">{{ child.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-gray-100">
        <button @click="logout" :class="[
          'w-full flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200',
          isCollapsed ? 'md:justify-center' : ''
        ]">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span :class="[!isCollapsed ? 'block' : 'md:hidden']" class="ml-3 font-medium">Sign Out</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header class="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="hidden md:block">
            <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
            <p v-if="pageSubtitle" class="text-gray-600 mt-1">{{ pageSubtitle }}</p>
          </div>
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileSidebar"
            class="md:hidden"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <!-- Logo for mobile -->
          <div class="md:hidden flex items-center space-x-3">
            <div class="w-10 h-10 bg-coral-500 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">E</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Lnaid</span>

          </div>

          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div class="relative">
              <button @click="showNotifications = !showNotifications"
                class="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v3.5">
                  </path>
                </svg>
                <span v-if="notificationStore.unreadCount > 0"
                  class="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ notificationStore.unreadCount }}
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-100">
                <div class="p-4 border-b border-gray-100">
                  <div class="flex justify-between items-center">
                    <h3 class="font-semibold text-gray-900">Notifications</h3>
                    <button @click="notificationStore.markAllAsRead()"
                      class="text-sm text-coral-500 hover:text-coral-600">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div v-if="notificationStore.notifications.length === 0" class="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                  <div v-else>
                    <div v-for="notification in notificationStore.notifications.slice(0, 5)" :key="notification.id"
                      class="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                      @click="notificationStore.markAsRead(notification.id)">
                      <p class="font-medium text-gray-900 text-sm">{{ notification.title }}</p>
                      <p class="text-gray-600 text-sm mt-1">{{ notification.message }}</p>
                      <p class="text-gray-500 text-xs mt-2">{{ formatDate(notification.createdAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Menu -->
            <div class="relative">
              <button @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <img :src="userDetails.profilePic" :alt="authStore.user?.name" class="w-8 h-8 rounded-lg">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- User Dropdown -->
              <div v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100">
                <div class="py-2">
                  <router-link :to="`/${ authStore.user?.role }/profile`"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</router-link>
                  <router-link :to="`/${ authStore.user?.role }/settings`"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-50">Settings</router-link>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Sign
                    out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>  

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <!-- Page details -->
        <div class=" md:hidden mb-6">
          <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
          <p v-if="pageSubtitle" class="text-gray-600 mt-1">{{ pageSubtitle }}</p>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'
import { useAccountStore } from "../stores/account";


const props = defineProps({
  navigationItems: {
    type: Array,
    required: true
  },
  pageTitle: {
    type: String,
    default: 'Dashboard'
  },
  pageSubtitle: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const accountStore = useAccountStore()
const notificationStore = useNotificationStore()

const isCollapsed = ref(false)
const showMobileSidebar = ref(false)
const openSubmenus = ref([])
const showNotifications = ref(false)
const showUserMenu = ref(false)
const userDetails = ref({});

onMounted(async () => {
  try {
    const userData = await accountStore.getProfile();
    if (userData) {
      userDetails.value = userData;
      userDetails.value.name =
        userData.firstName + " " + userData.lastName || "";
      userDetails.value.profilePic = userData.profilePic || "";
    } else {
      console.error("error");
    }
  } catch (error) {
    console.log("error", error);
  }
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

const closeMobileSidebar = () => {
  showMobileSidebar.value = false
}

const toggleSubmenu = (name) => {
  const index = openSubmenus.value.indexOf(name)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(name)
  }
}

const isCurrentRoute = (href) => {
  return route.path === href
}

const logout = () => {
  authStore.logout()
  router.push('/')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

onMounted(() => {
  const mediaQuery = window.matchMedia("(max-width: 1024px)");

  // Set initial state based on screen size
  isCollapsed.value = mediaQuery.matches;

  //update on window resize
  const handleResize = (e) => {
    isCollapsed.value = e.matches;
  };

  mediaQuery.addEventListener("change", handleResize);

  // Cleanup listener on unmount
  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleResize);
  });
});
</script>