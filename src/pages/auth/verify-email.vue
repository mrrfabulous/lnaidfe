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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">Verify your email</h2>
          <p class="mt-2 text-gray-600">We've sent a verification code to</p>
          <p class="font-semibold text-gray-900">{{ email }}</p>
        </div>

        <form @submit.prevent="handleVerification" class="mt-8 space-y-6">
          <div>
            <label for="code" class="form-label">Verification Code</label>
            <div class="flex space-x-2">
              <input
                v-for="(digit, index) in verificationCode"
                :key="index"
                :ref="(el) => (codeInputs[index] = el)"
                v-model="verificationCode[index]"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                @input="handleInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
                @paste="handlePaste"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading || !isCodeComplete"
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
                Verifying...
              </span>
              <span v-else>Verify Email</span>
            </button>
          </div>

          <div class="text-center space-y-4">
            <p class="text-sm text-gray-600">Didn't receive the code?</p>
            <button
              type="button"
              @click="resendCode"
              :disabled="resendLoading || resendCooldown > 0"
              class="text-coral-500 hover:text-coral-600 font-medium text-sm"
            >
              <span v-if="resendLoading">Sending...</span>
              <span v-else-if="resendCooldown > 0">
                Resend in {{ resendCooldown }}s
              </span>
              <span v-else>Resend verification code</span>
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
          <h2 class="text-4xl font-bold mb-6">Almost There!</h2>
          <p class="text-xl text-coral-100 mb-8">
            Just one more step to secure your account and start your educational
            journey.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotificationStore } from "@/stores/notifications";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const loading = ref(false);
const resendLoading = ref(false);
const resendCooldown = ref(0);
const email = ref(route.query.email || "");
const role = ref(route.query.role || "no role");
const verificationCode = reactive(["", "", "", "", "", ""]);
const codeInputs = ref([]);

const isCodeComplete = computed(() => {
  return verificationCode.every((digit) => digit !== "");
});

const handleInput = (index, event) => {
  const value = event.target.value;
  if (value && index < 5) {
    // Move to next input
    codeInputs.value[index + 1]?.focus();
  }
};

const handleKeydown = (index, event) => {
  if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
    // Move to previous input on backspace
    codeInputs.value[index - 1]?.focus();
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const paste = event.clipboardData.getData("text");
  const digits = paste.replace(/\D/g, "").slice(0, 6);

  for (let i = 0; i < digits.length; i++) {
    verificationCode[i] = digits[i];
  }
};

const handleVerification = async () => {
  loading.value = true;

  try {
    const code = verificationCode.join("");
    console.log("Verification code entered:", code);
    console.log("Email:", email.value);
    console.log("Role:", role.value);


    const data = {
      email: email.value,
      code: code,
      otp: code, // incase API expect 'otp' instead of 'code'
      verificationCode: code, // or API expect 'verificationCode'
      role: role.value,
    };

    console.log("Sending verification data:", data);

    // Test if the API client is working
    console.log("calling authStore.verifyEmail...");
    const result = await authStore.verifyEmail(data);
    console.log("Received result from authStore.verifyEmail:", result);

    if (result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Email verified!",
        message: "Your account has been successfully verified.",
      });

      if (role === "student") {
        router.push();
      } else if (role === "sponsor") {
        router.push();
      }
    } else {
      notificationStore.addNotification({
        type: "error",
        title: "Email verification failed",
        message: result.error || "An error occurred during registration",
      });
      throw new Error(result.error);
    }

    router.push("/auth/login");
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Verification failed",
      message: "Invalid verification code. Please try again.",
    });
  } finally {
    loading.value = false;
  }
};

const resendCode = async () => {
  resendLoading.value = true;

  try {
    const data = {
      email: email.value,
    };

    const result = await authStore.resendVerificationCode(data);

    notificationStore.addNotification({
      type: "success",
      title: "Code sent!",
      message: "A new verification code has been sent to your email.",
    });

    // Start cooldown
    resendCooldown.value = 60;
    const interval = setInterval(() => {
      resendCooldown.value--;
      if (resendCooldown.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Failed to resend",
      message: "Could not send verification code. Please try again.",
    });
  } finally {
    resendLoading.value = false;
  }
};

onMounted(() => {
  // Focus first input
  codeInputs.value[0]?.focus();
});
</script>
