<template>
  <div id="app">
    <Notification />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useNotificationStore } from './stores/notifications'
import Notification from './components/Notification.vue'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

onMounted(() => {
  authStore.initializeAuth()
  notificationStore.initializeNotifications()
})
</script>


