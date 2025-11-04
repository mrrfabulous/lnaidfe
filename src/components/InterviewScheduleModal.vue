<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-lg max-w-lg w-full p-6 shadow-xl"
        @keydown.esc="close"
      >
        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-900">Schedule Interview</h3>
          <p class="text-sm text-gray-500 mt-1">
            Schedule an interview with {{ application.studentName }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
            <input
              type="datetime-local"
              v-model="formData.date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              :min="minDate"
            />
          </div>

          <!-- Duration -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <select
              v-model="formData.duration"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
            </select>
          </div>

          <!-- Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
            <select
              v-model="formData.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="video">Video Call</option>
              <option value="in_person">In Person</option>
              <option value="phone">Phone Call</option>
            </select>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location/Link</label>
            <input
              type="text"
              v-model="formData.location"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :placeholder="locationPlaceholder"
              required
            />
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Any additional information for the candidate..."
            ></textarea>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              :disabled="loading"
            >
              {{ loading ? 'Scheduling...' : 'Schedule Interview' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  application: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'schedule']);

const loading = ref(false);
const formData = ref({
  date: '',
  duration: '30',
  type: 'video',
  location: '',
  notes: ''
});

const minDate = computed(() => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // adjust timezone
  return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
});

const locationPlaceholder = computed(() => {
  return {
    video: 'Enter video call link',
    in_person: 'Enter address or location',
    phone: 'Enter phone number'
  }[formData.value.type];
});

const handleSubmit = () => {
  loading.value = true;
  emit('schedule', { ...formData.value, applicationId: props.application.id });
  setTimeout(() => {
    loading.value = false;
    close();
  }, 500); // fake delay for UX, remove if backend handles it
};

const close = () => {
  formData.value = {
    date: '',
    duration: '30',
    type: 'video',
    location: '',
    notes: ''
  };
  emit('close');
};
</script>
