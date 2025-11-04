<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div
      class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Logo -->
        <div class="text-center">
          <router-link to="/" class="inline-flex items-center space-x-2">
            <div
              class="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">L</span>
            </div>
            <span class="text-2xl font-bold text-gray-900">Lnaid</span>
          </router-link>
        </div>

        <div class="text-center">
          <div
            class="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-coral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p class="mt-2 text-gray-600">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        <form @submit.prevent="handleForgotPassword" class="mt-8 space-y-6">
          <div>
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="form-input"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send reset link</span>
            </button>
          </div>

          <div class="text-center">
            <router-link
              to="/auth/login"
              class="text-sm text-gray-600 hover:text-coral-500"
            >
              ← Back to login
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Side - Image/Branding -->
    <div
      class="hidden lg:block lg:flex-1 bg-gradient-to-br from-coral-500 to-coral-600"
    >
      <div class="flex items-center justify-center h-full p-12">
        <div class="text-center text-white">
          <h2 class="text-4xl font-bold mb-6">Reset Made Easy</h2>
          <p class="text-xl text-coral-100 mb-8">
            We'll help you get back to your educational journey in no time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notifications";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const loading = ref(false);
const form = reactive({
  email: "",
});

const handleForgotPassword = async () => {
  loading.value = true;

  try {
    const result = await authStore.forgotPassword({ email: form.email });

    if (result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Reset successful!",
        message: `${result.message}`,
      });

      router.push({
        path: "/auth/reset",
        query: { id: result.userId },
      });
      console.log(result.userId);
    } else {
      notificationStore.addNotification({
        type: "error",
        title: "Failed to send reset link",
        message: result.error || "An unexpected error occurred",
      });
    }
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Failed to send reset link",
      message: error.message || "Please check your email address and try again",
    });
  } finally {
    loading.value = false;
  }
};
</script>
