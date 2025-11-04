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

        <div>
          <h2 class="text-center text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p class="mt-2 text-center text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="email" class="form-label">Email address</label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label for="password" class="form-label">Password</label>
              <div class="relative w-full">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  class="form-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword"
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
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <router-link
                to="/auth/forgot-password"
                class="font-medium text-coral-500 hover:text-coral-600"
              >
                Forgot your password?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full flex justify-center items-center"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              {{ loading ? "Signing in..." : "Sign in" }}
            </button>
          </div>

          <!-- Demo Login Options -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"
                  >Try demo accounts</span
                >
              </div>
            </div>

            <div class="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                @click="loginAsDemo('student')"
                class="btn-secondary text-sm py-2"
              >
                Student
              </button>
              <button
                type="button"
                @click="loginAsDemo('sponsor')"
                class="btn-secondary text-sm py-2"
              >
                Sponsor
              </button>
              <button
                type="button"
                @click="loginAsDemo('educator')"
                class="btn-secondary text-sm py-2"
              >
                Educator
              </button>
            </div>
          </div>

          <div class="text-center">
            <span class="text-gray-600">Don't have an account? </span>
            <router-link
              to="/auth/register"
              class="font-medium text-coral-500 hover:text-coral-600"
            >
              Sign up
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
          <h2 class="text-4xl font-bold mb-6">Empowering Education</h2>
          <p class="text-xl text-coral-100 mb-8">
            Connect students with sponsors to bridge funding gaps and promote
            quality education.
          </p>
          <div class="grid grid-cols-2 gap-8 text-center">
            <div>
              <div class="text-3xl font-bold">2,500+</div>
              <div class="text-coral-100">Students Funded</div>
            </div>
            <div>
              <div class="text-3xl font-bold">₦50M+</div>
              <div class="text-coral-100">Total Donations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useNotificationStore } from "../../stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const passwordVisible = ref(false);

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
  role: "student", // default role
});

const handleLogin = async () => {
  loading.value = true;

  try {
    const loginData = {
      email: form.email,
      password: form.password,
    };

    const result = await authStore.login(loginData);

    if (result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Welcome back!",
        message: result.message,
      });

      // Redirect based on user role from store
      const role = authStore.user?.role;
      if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "sponsor") {
        router.push("/sponsor/dashboard");
      } else if (role === "educator") {
        router.push("/educator/dashboard");
      } else {
        router.push("/");
      }
    } else if (
      !result.success &&
      ((result.message &&
        result.message ===
          "Email not verified. Please verify your email to login.") ||
        (result.error &&
          result.error ===
            "Email not verified. Please verify your email to login.") ||
        (result.message &&
          result.message.toLowerCase().includes("email not verified")) ||
        (result.error &&
          result.error.toLowerCase().includes("email not verified")))
    ) {
      notificationStore.addNotification({
        type: "warning",
        title: "Email not verified",
        message:
          result.message ||
          result.error ||
          "Please verify your email before logging in.",
      });
      router.push({
        path: "/auth/verify-email",
        query: { email: form.email, role: form.role },
      });
    } else {
      notificationStore.addNotification({
        type: "error",
        title: "Login failed",
        message: result.message || result.error || "Invalid credentials",
      });
    }
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Login failed",
      message: "An unexpected error occurred",
    });
  } finally {
    loading.value = false;
  }
};

const loginAsDemo = async (role) => {
  loading.value = true;

  try {
    const result = await authStore.login({
      email: `demo.${role}@edufund.com`,
      password: "demo1234",
      role: role,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    });

    if (result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Demo login successful!",
        message: `Logged in as demo ${role}`,
      });

      router.push(`/${role}/dashboard`);
    }
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Demo login failed",
      message: "An unexpected error occurred",
    });
  } finally {
    loading.value = false;
  }
};

const showPassword = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
