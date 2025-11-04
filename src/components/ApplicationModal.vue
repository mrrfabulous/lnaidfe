<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        @click="closeModal"
      ></div>

      <!-- Modal content -->
      <div
        class="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              {{ mode === "create" ? "Apply for" : "Edit Application" }}
            </h3>
            <p v-if="mode === 'create'" class="text-gray-600 mt-1">
              {{ item?.title || item?.offerTitle || "Scholarship/Offer" }}
            </p>
          </div>
          <button
            @click="closeModal"
            class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-gray-900"
              >Step {{ currentStep }} of {{ totalSteps }}</span
            >
            <span class="text-sm text-gray-600"
              >{{ Math.round((currentStep / totalSteps) * 100) }}%
              Complete</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-coral-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="submitApplication" class="space-y-6">
          <!-- Step 1: Personal Information -->
          <div v-show="currentStep === 1" class="space-y-6">
            <h4 class="text-lg font-semibold text-gray-900">
              Personal Information
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Full Name</label
                >
                <input
                  v-model="formData.studentName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email Address</label
                >
                <input
                  v-model="formData.studentEmail"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >School/Institution</label
                >
                <input
                  v-model="formData.school"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Enter your school name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Course of Study</label
                >
                <input
                  v-model="formData.course"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Enter your course"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Academic Level</label
                >
                <select
                  v-model="formData.level"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select level</option>
                  <option value="100 Level">100 Level</option>
                  <option value="200 Level">200 Level</option>
                  <option value="300 Level">300 Level</option>
                  <option value="400 Level">400 Level</option>
                  <option value="500 Level">500 Level</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >GPA/CGPA</label
                >
                <input
                  v-model.number="formData.gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="e.g., 3.85"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Cover Letter -->
          <div v-show="currentStep === 2" class="space-y-6">
            <h4 class="text-lg font-semibold text-gray-900">Cover Letter</h4>
            <p class="text-gray-600">
              Write a compelling cover letter explaining why you deserve this
              opportunity.
            </p>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Cover Letter</label
              >
              <textarea
                v-model="formData.coverLetter"
                rows="12"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                placeholder="Dear Selection Committee,&#10;&#10;I am writing to express my strong interest in this opportunity. I believe I am an ideal candidate because..."
              ></textarea>
              <div class="flex justify-between items-center mt-2">
                <span class="text-sm text-gray-500"
                  >{{ formData.coverLetter?.length || 0 }} characters</span
                >
                <span class="text-sm text-gray-500"
                  >Recommended: 500-1000 characters</span
                >
              </div>
            </div>
          </div>

          <!-- Step 3: Document Upload -->
          <div v-show="currentStep === 3" class="space-y-6">
            <h4 class="text-lg font-semibold text-gray-900">
              Required Documents
            </h4>
            <p class="text-gray-600">
              Upload the required documents for your application.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="docType in requiredDocuments"
                :key="docType.name"
                class="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-coral-500 transition-colors"
              >
                <div class="text-center">
                  <Upload class="mx-auto h-12 w-12 text-gray-400" />
                  <div class="mt-4">
                    <h5 class="text-sm font-medium text-gray-900">
                      {{ docType.name }}
                    </h5>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ docType.description }}
                    </p>
                  </div>
                  <div class="mt-4">
                    <input
                      type="file"
                      :id="docType.id"
                      class="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      @change="handleFileUpload($event, docType.id)"
                    />
                    <label
                      :for="docType.id"
                      class="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coral-500"
                    >
                      Choose File
                    </label>
                    <div v-if="uploadedDocuments[docType.id]" class="mt-2">
                      <div class="flex items-center text-sm text-green-600">
                        <CheckCircle class="w-4 h-4 mr-1" />
                        {{ uploadedDocuments[docType.id].name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Review & Submit -->
          <div v-show="currentStep === 4" class="space-y-6">
            <h4 class="text-lg font-semibold text-gray-900">
              Review Your Application
            </h4>
            <p class="text-gray-600">
              Please review all information before submitting your application.
            </p>

            <!-- Application Summary -->
            <div class="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h5 class="font-medium text-gray-900 mb-2">
                  Personal Information
                </h5>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Name:</span>
                    <span class="ml-2 font-medium">{{
                      formData.studentName
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Email:</span>
                    <span class="ml-2 font-medium">{{
                      formData.studentEmail
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">School:</span>
                    <span class="ml-2 font-medium">{{ formData.school }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Course:</span>
                    <span class="ml-2 font-medium">{{ formData.course }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Level:</span>
                    <span class="ml-2 font-medium">{{ formData.level }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">GPA:</span>
                    <span class="ml-2 font-medium">{{ formData.gpa }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 class="font-medium text-gray-900 mb-2">
                  Cover Letter Preview
                </h5>
                <div
                  class="bg-white rounded-lg p-4 text-sm text-gray-700 max-h-32 overflow-y-auto"
                >
                  {{ formData.coverLetter }}
                </div>
              </div>

              <div>
                <h5 class="font-medium text-gray-900 mb-2">
                  Uploaded Documents
                </h5>
                <div class="space-y-2">
                  <div
                    v-for="(doc, key) in uploadedDocuments"
                    :key="key"
                    class="flex items-center text-sm"
                  >
                    <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                    <span>{{
                      requiredDocuments.find((d) => d.id === key)?.name
                    }}</span>
                    <span class="ml-2 text-gray-500">({{ doc.name }})</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start space-x-3">
              <input
                v-model="agreedToTerms"
                type="checkbox"
                class="mt-1 h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
              />
              <label class="text-sm text-gray-700">
                I agree to the
                <a
                  href="#"
                  class="text-coral-600 hover:text-coral-700 font-medium"
                  >Terms and Conditions</a
                >
                and confirm that all information provided is accurate and
                complete.
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div
            class="flex justify-between items-center pt-6 border-t border-gray-200"
          >
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <div v-else></div>

            <div class="flex space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                v-if="currentStep < totalSteps"
                type="button"
                @click="nextStep"
                :disabled="!canProceedToNextStep"
                class="px-6 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>

              <button
                v-else
                type="submit"
                :disabled="!canSubmit || isSubmitting"
                class="px-6 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="isSubmitting">Submitting...</span>
                <span v-else>Submit Application</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { X, Upload, CheckCircle } from "lucide-vue-next";
import { useAuthStore } from "../stores/auth";
import { useApplicationsStore } from "../stores/applications";
import { useNotificationStore } from "../stores/notifications";

const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: "create", // 'create' or 'edit'
    validator: (value) => ["create", "edit"].includes(value),
  },
  item: Object, // scholarship or offer item
  application: Object, // existing application for edit mode
});

const emit = defineEmits(["close", "success"]);

const authStore = useAuthStore();
const applicationsStore = useApplicationsStore();
const notificationStore = useNotificationStore();

const currentStep = ref(1);
const totalSteps = ref(4);
const isSubmitting = ref(false);
const agreedToTerms = ref(false);

const formData = ref({
  studentName: "",
  studentEmail: "",
  school: "",
  course: "",
  level: "",
  gpa: null,
  coverLetter: "",
});

const uploadedDocuments = ref({});

const requiredDocuments = ref([
  {
    id: "transcript",
    name: "Academic Transcript",
    description: "Official academic transcript or report card",
  },
  {
    id: "recommendation",
    name: "Letter of Recommendation",
    description: "Letter from a teacher, professor, or mentor",
  },
  {
    id: "statement",
    name: "Personal Statement",
    description: "Statement of purpose or personal essay",
  },
  {
    id: "identification",
    name: "Valid ID",
    description: "Government-issued ID or passport",
  },
]);

const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (
        formData.value.studentName &&
        formData.value.studentEmail &&
        formData.value.school &&
        formData.value.course &&
        formData.value.level &&
        formData.value.gpa
      );
    case 2:
      return (
        formData.value.coverLetter && formData.value.coverLetter.length >= 100
      );
    case 3:
      return Object.keys(uploadedDocuments.value).length >= 2; // At least 2 documents required
    default:
      return true;
  }
});

const canSubmit = computed(() => {
  return canProceedToNextStep.value && agreedToTerms.value;
});

const initializeForm = () => {
  if (props.mode === "edit" && props.application) {
    // Pre-fill form with existing application data
    formData.value = { ...props.application };
  } else {
    // Pre-fill with user data for new application
    const user = authStore.user;
    formData.value = {
      studentName: user?.name || "",
      studentEmail: user?.email || "",
      school: user?.school || "",
      course: user?.course || "",
      level: user?.level || "",
      gpa: user?.gpa || null,
      coverLetter: "",
    };
  }
};

const nextStep = () => {
  if (canProceedToNextStep.value && currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
};

const handleFileUpload = (event, docType) => {
  const file = event.target.files[0];
  if (file) {
    // In a real app, you would upload the file to a server
    uploadedDocuments.value[docType] = {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    };
  }
};

const submitApplication = async () => {
  if (!canSubmit.value) return;

  isSubmitting.value = true;

  try {
    const applicationData = {
      ...formData.value,
      type: props.item?.type || "scholarship",
      itemId: props.item?.id,
      title: props.item?.title,
      amount: props.item?.amount,
      sponsorName: props.item?.sponsorName,
      documents: Object.entries(uploadedDocuments.value).map(([type, doc]) => ({
        name: requiredDocuments.value.find((d) => d.id === type)?.name,
        type: doc.type,
        size: `${(doc.size / (1024 * 1024)).toFixed(2)} MB`,
        status: "pending",
      })),
      status: "pending",
      studentId: authStore.user?.id,
    };

    if (props.mode === "create") {
      await applicationsStore.createApplication(applicationData);
      notificationStore.addNotification({
        type: "success",
        title: "Application Submitted",
        message: `Your application for "${props.item?.title}" has been submitted successfully.`,
      });
    } else {
      await applicationsStore.updateApplication(
        props.application.id,
        applicationData
      );
      notificationStore.addNotification({
        type: "success",
        title: "Application Updated",
        message: "Your application has been updated successfully.",
      });
    }

    emit("success");
    closeModal();
  } catch (error) {
    notificationStore.addNotification({
      type: "error",
      title: "Submission Failed",
      message: "Failed to submit application. Please try again.",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  // Reset form state
  currentStep.value = 1;
  agreedToTerms.value = false;
  uploadedDocuments.value = {};
  isSubmitting.value = false;

  emit("close");
};

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      initializeForm();
    }
  }
);

onMounted(() => {
  if (props.isOpen) {
    initializeForm();
  }
});
</script>
