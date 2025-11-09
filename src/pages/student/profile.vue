<template>
  <Sidebar
    page-title="Settings"
    page-subtitle="Manage your account settings and preferences"
    :navigation-items="studentNavigationItems"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
        <p class="text-gray-600 mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Picture Section -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="
                    form.avatarUrl || authStore.user?.avatar || '/avatar.png'
                  "
                  :alt="authStore.user?.name"
                  class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mx-auto"
                />
                <button
                  @click="triggerFileUpload"
                  :disabled="!isEditable"
                  :class="[
                    'absolute bottom-0 right-0 p-2 rounded-full transition-colors duration-200',
                    isEditable
                      ? 'bg-coral-500 hover:bg-coral-600'
                      : 'bg-gray-400 cursor-not-allowed',
                  ]"
                >
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleAvatarUpload"
                  class="hidden"
                />
              </div>
              <h2 class="text-xl font-bold text-gray-900 mt-4">
                {{ bioDetails.name }}
              </h2>
              <p class="text-gray-600 capitalize">{{ authStore.user?.role }}</p>
              <div class="mt-4 flex justify-center">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    bioDetails.isEmailVerified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700',
                  ]"
                >
                  {{
                    bioDetails.isEmailVerified
                      ? "Email Verified"
                      : "Pending Email Verification"
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Active Appeals</span>
                <span class="font-semibold text-gray-900">{{
                  studentStats.totalRequests ?? 0
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Total Raised</span>
                <span class="font-semibold text-gray-900"
                  >₦{{
                    (studentStats.totalAmountReceived ?? 0).toLocaleString()
                  }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Available Offers</span>
                <span class="font-semibold text-gray-900">{{
                  studentStats.availableOffers ?? 0
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="font-semibold text-red-900 text-lg">
          stats rEsult:
          {{ studentStats }}
        </div> -->

        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <form
            @submit.prevent="handleUpdateProfile"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-6">
              Personal Information
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="firstName" class="form-label">First Name</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="form-input"
                  :disabled="!isEditable"
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
                  :disabled="!isEditable"
                />
              </div>
            </div>

            <div class="mb-6">
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                :disabled="!isEditable"
              />
            </div>

            <div class="mb-6">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="form-input"
                :disabled="!isEditable"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>

            <div class="mb-6">
              <label for="bio" class="form-label">Bio</label>
              <textarea
                id="bio"
                v-model="form.bio"
                rows="4"
                class="form-input"
                :disabled="!isEditable"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <!-- Student-specific fields -->
            <div
              v-if="authStore.user?.role === 'student'"
              class="space-y-6 mb-6"
            >
              <h4 class="text-md font-semibold text-gray-900 border-t pt-6">
                Academic Information
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="school" class="form-label"
                    >School/University</label
                  >
                  <input
                    id="school"
                    v-model="form.school"
                    type="text"
                    required
                    class="form-input"
                    :disabled="!isEditable"
                  />
                </div>
                <div>
                  <label for="course" class="form-label">Course of Study</label>
                  <input
                    id="course"
                    v-model="form.course"
                    type="text"
                    required
                    class="form-input"
                    :disabled="!isEditable"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label for="level" class="form-label">Academic Level</label>
                  <select
                    id="level"
                    v-model="form.level"
                    required
                    class="form-input"
                    :disabled="!isEditable"
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
                <div>
                  <label for="gpa" class="form-label">Current GPA</label>
                  <input
                    id="gpa"
                    v-model.number="form.gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    class="form-input"
                    :disabled="!isEditable"
                  />
                </div>
                <div>
                  <label for="graduationYear" class="form-label"
                    >Expected Graduation</label
                  >
                  <input
                    id="graduationYear"
                    v-model.number="form.graduationYear"
                    type="number"
                    min="2024"
                    max="2030"
                    class="form-input"
                    :disabled="!isEditable"
                  />
                </div>
              </div>
            </div>

            <!-- Location Information -->
            <div v-if="form.state" class="space-y-6 mb-6">
              <h4 class="text-md font-semibold text-gray-900 border-t pt-6">
                Location
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="state" class="form-label">State</label>
                  <select
                    id="state"
                    v-model="form.state"
                    class="form-input"
                    :disabled="!isEditable"
                  >
                    <option value="">Select state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Kano">Kano</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Kaduna">Kaduna</option>
                    <!-- Add more states -->
                  </select>
                </div>
                <div>
                  <label for="city" class="form-label">City</label>
                  <input
                    id="city"
                    v-model="form.city"
                    type="text"
                    class="form-input"
                    :disabled="!isEditable"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="resetForm"
                :disabled="!isEditable"
                :class="[
                  `px-6 py-2 border border-gray-300 rounded-xl text-gray-700 transition-colors duration-200`,
                  isEditable
                    ? 'hover:bg-gray-200 cursor-pointer'
                    : 'cursor-not-allowed bg-gray-100',
                ]"
              >
                Reset
              </button>
              <button
                v-if="!isEditable"
                type="submit"
                class="btn-primary bg-red-200"
                @click="isEditable = true"
              >
                Edit Profile
              </button>
              <button
                v-else="isEditable"
                type="submit"
                :disabled="loading"
                class="btn-primary"
              >
                {{ loading ? "Updating..." : "Update Profile" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAccountStore } from "../../stores/account";
import { useNotificationStore } from "../../stores/notifications";
import Sidebar from "../../components/Sidebar.vue";
import { studentNavigationItems } from "../../lib/data/navItems";

const authStore = useAuthStore();
const accountStore = useAccountStore();
const notificationStore = useNotificationStore();
const studentStats = ref({});
const bioDetails = ref({});
const isEditable = ref(false);
const originalData = ref({}); //for reset

const loading = ref(false);
const fileInput = ref(null);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bio: "",
  // Student fields
  school: "",
  course: "",
  level: "",
  gpa: "",
  graduationYear: "",
  // Location
  state: "",
  city: "",
  academicAchievements: "",
  goals: "",
  avatar: null,
});

onMounted(async () => {
  try {
    // bio details
    const bioResult = await accountStore.getProfile();
    if (bioResult) {
      bioDetails.value = bioResult;
      bioDetails.value.name =
        bioResult.firstName + " " + bioResult.lastName || "";
      // console.log("details loaded:", bioResult);

      // Initialize form with bio details
      initializeForm(bioDetails.value);
    } else {
      console.log("No details found");
    }

    // student stats
    const statsResult = await accountStore.getStudentStats();
    studentStats.value = statsResult.stats || {};
  } catch (error) {
    console.log("Failed to get student stats");
    console.log("error", error);
  }
});

const initializeForm = (details) => {
  if (details) {
    originalData.value = { ...details };

    // console.log("initializing form details:", details);

    form.firstName = details.firstName;
    form.lastName = details.lastName;
    form.email = details.email || "";
    form.phone = details.phoneNumber || "";
    form.bio = details.bio || "";
    form.school = details.instituteName || "";
    form.course = details.courseOfStudy || "";
    form.level = details.level || "";
    form.gpa = details.gpa ? parseFloat(details.gpa) : "";
    form.graduationYear = details.expectedGraduation
      ? parseFloat(details.expectedGraduation)
      : "unknown";
    form.organization = details.organization || "";
    form.position = details.position || "";
    form.sponsorType = details.sponsorType || "individual";
    form.state = details.location || "";
    form.city = details.city || "";
    form.avatarUrl = details.profilePic || "";
  }
};

const resetForm = () => {
  initializeForm(bioDetails.value);
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.avatar = file;

    // Display the image
    const reader = new FileReader();
    reader.onload = (e) => {
      form.avatarUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    notificationStore.addNotification({
      type: "info",
      title: "Profile picture updated",
      message:
        "Your have add profile picture, click the update profile to save",
    });
  }
};

const handleUpdateProfile = async () => {
  loading.value = true;

  try {
    // Check for file upload
    const hasFileUpload = form.avatar instanceof File;

    // using/FormData for uploading files
    const formData = new FormData();

    // FormData
    formData.append("firstName", form.firstName || "");
    formData.append("lastName", form.lastName || "");
    formData.append("email", form.email || "");
    formData.append("phoneNumber", form.phone || "");
    formData.append("bio", form.bio || "");
    formData.append("instituteName", form.school || "");
    formData.append("courseOfStudy", form.course || "");
    formData.append("level", form.level || "");
    formData.append("gpa", form.gpa ? form.gpa.toString() : "");
    formData.append(
      "expectedGraduation",
      form.graduationYear ? form.graduationYear.toString() : ""
    );
    formData.append("location", form.state || "");
    formData.append("city", form.city || "");
    formData.append("name", `${form.firstName} ${form.lastName}`);

    if (hasFileUpload) {
      formData.append("profilePic", form.avatar);
    }

    const result = await accountStore.editStudentProfile(formData);

    if (result && result.success) {
      notificationStore.addNotification({
        type: "success",
        title: "Profile updated",
        message: "Your profile has been updated successfully.",
        duration: 1900,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      notificationStore.addNotification({
        type: "error",
        title: "Profile unable to update",
        message: result?.message || "Failed to update profile.",
      });
      console.error("Profile update failed:", result);
    }
  } catch (error) {
    console.error("Profile update error:", error);
    notificationStore.addNotification({
      type: "error",
      title: "Update failed",
      message: "Failed to update profile. Please try again.",
    });
  } finally {
    loading.value = false;
    isEditable.value = false;
  }
};
</script>
