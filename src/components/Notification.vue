<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in toastNotifications"
        :key="notification.id"
        class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm relative overflow-hidden"
        :class="{
          'border-green-200 bg-green-50': notification.type === 'success',
          'border-blue-200 bg-blue-50': notification.type === 'info',
          'border-yellow-200 bg-yellow-50': notification.type === 'warning',
          'border-red-200 bg-red-50': notification.type === 'error',
        }"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              v-if="notification.type === 'success'"
              class="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else-if="notification.type === 'error'"
              class="w-5 h-5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">
              {{ notification.title }}
            </p>
            <p v-if="notification.message" class="text-sm text-gray-600 mt-1">
              {{ notification.message }}
            </p>
          </div>
          <button
            @click="removeNotification(notification.id)"
            class="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Progress bar for auto-dismiss countdown -->
        <div class="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
          <div
            class="h-full transition-all ease-linear"
            :class="{
              'bg-green-400': notification.type === 'success',
              'bg-blue-400': notification.type === 'info',
              'bg-yellow-400': notification.type === 'warning',
              'bg-red-400': notification.type === 'error',
              'bg-gray-400': notification.type === 'toast',
            }"
            :style="{
              width: '100%',
              animation: `shrink ${
                notification.duration || 5000
              }ms linear forwards`,
            }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNotificationStore } from "../stores/notifications";

const notificationStore = useNotificationStore();

const toastNotifications = computed(() =>
  notificationStore.notifications.filter(
    (n) =>
      n.type === "toast" ||
      n.type === "success" ||
      n.type === "error" ||
      n.type === "info" ||
      n.type === "warning"
  )
);

const removeNotification = (id) => {
  notificationStore.removeNotification(id);
};
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
