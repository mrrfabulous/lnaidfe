<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div
      class="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Logo -->
        <div class="text-center">
          <router-link to="/" class="inline-flex items-center space-x-2">
            <div
              class="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">E</span>
            </div>
            <span class="text-2xl font-bold text-gray-900">Lnaid</span>
          </router-link>
        </div>

        <div>
          <h2 class="text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-gray-600">
            Join thousands transforming education
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
          <!-- Role Selection -->
          <div>
            <label class="form-label">I am a:</label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                type="button"
                @click="form.role = 'student'"
                :class="[
                  'px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral-500 transition-all duration-200',
                  form.role === 'student'
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                Student
              </button>
              <button
                type="button"
                @click="form.role = 'sponsor'"
                :class="[
                  'px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral-500 transition-all duration-200',
                  form.role === 'sponsor'
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                Sponsor
              </button>
              <button
                type="button"
                @click="form.role = 'educator'"
                :class="[
                  'px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral-500 transition-all duration-200',
                  form.role === 'educator'
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                Educator
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="form-label">First Name</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="form-input"
                  placeholder="First name"
                />
              </div>
              <div>
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label for="password" class="form-label">Password</label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  class="form-input pr-12"
                  placeholder="Create a password"
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
            </div>

            <div>
              <label for="confirmPassword" class="form-label"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  required
                  class="form-input pr-12"
                  placeholder="Confirm your password"
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
            </div>

            <!-- Role-specific fields -->
            <div
              v-if="form.role === 'student'"
              class="space-y-4 pt-4 border-t border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900">
                Student Information
              </h3>
              <div>
                <label for="school" class="form-label">School/University</label>
                <input
                  id="school"
                  v-model="form.instituteName"
                  type="text"
                  required
                  class="form-input"
                  placeholder="University of Lagos"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="course" class="form-label">Course of Study</label>
                  <input
                    id="course"
                    v-model="form.courseOfStudy"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label for="level" class="form-label">Academic Level</label>
                  <select
                    id="level"
                    v-model="form.level"
                    required
                    class="form-input"
                  >
                    <option value="">Select level</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Sponsor-specific fields -->
            <div
              v-if="form.role === 'sponsor'"
              class="space-y-4 pt-4 border-t border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900">
                Sponsor Information
              </h3>
              <div>
                <label for="organization" class="form-label"
                  >Organization (Optional)</label
                >
                <input
                  id="organization"
                  v-model="form.organization"
                  type="text"
                  class="form-input"
                  placeholder="Company or Foundation name"
                />
              </div>
              <div>
                <label class="form-label">Sponsor Type</label>
                <div class="mt-2 space-y-2">
                  <label class="inline-flex items-center">
                    <input
                      v-model="form.sponsorType"
                      type="radio"
                      value="individual"
                      class="form-radio text-coral-500"
                    />
                    <span class="ml-2">Individual</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input
                      v-model="form.sponsorType"
                      type="radio"
                      value="corporate"
                      class="form-radio text-coral-500"
                    />
                    <span class="ml-2">Corporate</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Educator-specific fields -->
            <div
              v-if="form.role === 'educator'"
              class="space-y-4 pt-4 border-t border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900">
                Educator Information
              </h3>
              <div>
                <label for="institution" class="form-label">Institution</label>
                <input
                  id="institution"
                  v-model="form.institution"
                  type="text"
                  required
                  class="form-input"
                  placeholder="School or Educational Institution"
                />
              </div>
              <div>
                <label for="position" class="form-label">Position</label>
                <input
                  id="position"
                  v-model="form.position"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Teacher, Professor, Administrator"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-coral-500 hover:text-coral-600"
                >Terms and Conditions</a
              >
              and
              <a href="#" class="text-coral-500 hover:text-coral-600"
                >Privacy Policy</a
              >
            </label>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
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
              {{ loading ? "Creating account..." : "Create account" }}
            </button>
          </div>

          <div class="text-center">
            <span class="text-gray-600">Already have an account? </span>
            <router-link
              to="/auth/login"
              class="font-medium text-coral-500 hover:text-coral-600"
            >
              Sign in
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
          <h2 class="text-4xl font-bold mb-6">Join Our Community</h2>
          <p class="text-xl text-coral-100 mb-8">
            Be part of a movement that's transforming education through
            community support and innovation.
          </p>
          <div class="grid grid-cols-2 gap-8 text-center">
            <div>
              <div class="text-3xl font-bold">800+</div>
              <div class="text-coral-100">Active Sponsors</div>
            </div>
            <div>
              <div class="text-3xl font-bold">95%</div>
              <div class="text-coral-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useNotificationStore } from "../../stores/notifications";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const form = reactive({
  role: "student",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
  // Student fields
  instituteName: "",
  courseOfStudy: "",
  level: "",
  // Sponsor fields
  organization: "",
  sponsorType: "individual",
  // Educator fields
  institution: "",
  position: "",
});

const isFormValid = computed(() => {
  const baseValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword &&
    form.agreeToTerms;

  if (form.role === "student") {
    return baseValid && form.instituteName && form.courseOfStudy && form.level;
  } else if (form.role === "educator") {
    return baseValid && form.institution && form.position;
  }

  return baseValid;
});

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    notificationStore.addNotification({
      type: "error",
      title: "Password mismatch",
      message: "Passwords do not match",
    });
    return;
  }

  loading.value = true;

  try {
    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    // Add role-specific data

    // Students role
    if (form.role === "student") {
      userData.instituteName = form.instituteName;
      userData.courseOfStudy = form.courseOfStudy;
      userData.level = form.level;

      const result = await authStore.register(userData);
      console.log("Registration result:", result);

      if (result.success) {
        notificationStore.addNotification({
          type: "success",
          title: "Account created successfully!",
          message:
            result.message || "Please check your email for verification code.",
        });

        router.push({
          path: "/auth/verify-email",
          query: {
            email: form.email,
            role: form.role,
          },
        });
      } else {
        notificationStore.addNotification({
          type: "error",
          title: "Registration failed",
          message:
            result.message ||
            result.error ||
            "An error occurred during registration",
        });
      }

      // Sponsor role
    } else if (form.role === "sponsor") {
      userData.organization = form.organization;
      userData.sponsorType = form.sponsorType;

      const result = await authStore.registerSponsor(userData);
      console.log("Registration result:", result);

      if (result.success) {
        notificationStore.addNotification({
          type: "success",
          title: "Account created successfully!",
          message:
            result.message || "Please check your email for verification code.",
        });

        router.push({
          path: "/auth/verify-email",
          query: {
            email: form.email,
            role: form.role,
          },
        });
      } else {
        notificationStore.addNotification({
          type: "error",
          title: "Registration failed",
          message:
            result.message ||
            result.error ||
            "An error occurred during registration",
        });
      }

      // Educator role
    } else if (form.role === "educator") {
      userData.institution = form.institution;
      userData.position = form.position;
    }
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Registration failed",
      message: "An unexpected error occurred",
    });
  } finally {
    loading.value = false;
  }
};
</script>
