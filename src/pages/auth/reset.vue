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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">Reset your password</h2>
          <p class="mt-2 text-gray-600">
            Enter your new password below to complete the reset process.
          </p>
        </div>

        <form @submit.prevent="handleResetPassword" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="password" class="form-label">New Password</label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  class="form-input pr-12"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  @click="passwordVisible = !passwordVisible"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <!-- Eye Open Icon (Password Visible) -->
                  <svg
                    v-if="passwordVisible"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <!-- Eye Closed Icon (Password Hidden) -->
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                Password must be at least 8 characters long
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="form-label"
                >Confirm New Password</label
              >
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  required
                  class="form-input pr-12"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  @click="confirmPasswordVisible = !confirmPasswordVisible"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <!-- Eye Open Icon (Password Visible) -->
                  <svg
                    v-if="confirmPasswordVisible"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <!-- Eye Closed Icon (Password Hidden) -->
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                v-if="form.confirmPassword && !passwordsMatch"
                class="mt-2 text-xs text-red-500"
              >
                Passwords do not match
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
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
                Resetting...
              </span>
              <span v-else>Reset Password</span>
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
          <h2 class="text-4xl font-bold mb-6">Secure & Protected</h2>
          <p class="text-xl text-coral-100 mb-8">
            Your account security is our priority. Create a strong password to
            keep your data safe.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotificationStore } from "../../stores/notifications";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const route = useRoute();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const loading = ref(false);
const id = ref(route.query.id || "");
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const form = reactive({
  password: "",
  confirmPassword: "",
});

const passwordsMatch = computed(() => {
  return form.password === form.confirmPassword;
});

const isFormValid = computed(() => {
  return passwordsMatch.value && form.password.length >= 8;
});

const handleResetPassword = async () => {
  if (!id.value) {
    notificationStore.addNotification({
      type: "error",
      title: "Invalid request",
      message: "This reset request is invalid, no userID found.",
    });
    router.push("/auth/forgot-password");
    return;
  }

  loading.value = true;

  try {
    const details = {
      id: id.value,
      password: form.password,
    };

    const result = await authStore.resetPassword(details);

    if (result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Password reset successful!",
        message: result.message,
      });

      router.push("/auth/login");
    }
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Reset failed",
      message: "Failed to reset password. Please try again.",
    });
  } finally {
    loading.value = false;
  }
};
</script>
