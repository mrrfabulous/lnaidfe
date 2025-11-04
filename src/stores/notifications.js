import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref([]);
  const unreadCount = computed(
    () => notifications.value.filter((n) => !n.read).length
  );

  const initializeNotifications = () => {
    const saved = localStorage.getItem("edufund_notifications");
    if (saved) {
      notifications.value = JSON.parse(saved);
    }
  };

  const saveNotifications = () => {
    localStorage.setItem(
      "edufund_notifications",
      JSON.stringify(notifications.value)
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    };

    notifications.value.unshift(newNotification);
    saveNotifications();

    // Auto-remove
    const autoRemoveTypes = ["toast", "success", "error", "info", "warning"];
    if (autoRemoveTypes.includes(notification.type)) {
      // default 5 s
      const duration = notification.duration || 5000;
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, duration);
    }

    return newNotification;
  };

  const markAsRead = (id) => {
    const notification = notifications.value.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
      saveNotifications();
    }
  };

  const markAllAsRead = () => {
    notifications.value.forEach((n) => (n.read = true));
    saveNotifications();
  };

  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
      saveNotifications();
    }
  };

  return {
    notifications,
    unreadCount,
    initializeNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };
});
