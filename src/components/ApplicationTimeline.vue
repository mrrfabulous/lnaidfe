<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-6">Application Timeline</h3>
    
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
      
      <!-- Timeline Events -->
      <div class="space-y-6">
        <div 
          v-for="(event, index) in timeline" 
          :key="event.id"
          class="relative flex items-start"
        >
          <!-- Timeline Dot -->
          <div class="relative z-10">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center border-2',
              getEventStyles(event.type, event.completed)
            ]">
              <component 
                :is="getEventIcon(event.type)" 
                :class="[
                  'w-4 h-4',
                  event.completed ? 'text-white' : 'text-gray-400'
                ]"
              />
            </div>
          </div>
          
          <!-- Event Content -->
          <div class="ml-6 flex-1 pb-6">
            <div class="flex items-center justify-between mb-2">
              <h4 :class="[
                'font-medium',
                event.completed ? 'text-gray-900' : 'text-gray-500'
              ]">
                {{ event.title }}
              </h4>
              <span class="text-sm text-gray-500">
                {{ formatDate(event.date) }}
              </span>
            </div>
            
            <p :class="[
              'text-sm mb-3',
              event.completed ? 'text-gray-700' : 'text-gray-500'
            ]">
              {{ event.description }}
            </p>
            
            <!-- Event Actions/Status -->
            <div class="flex items-center space-x-3">
              <span 
                v-if="event.status"
                :class="getStatusBadgeClass(event.status)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ formatStatus(event.status) }}
              </span>
              
              <span 
                v-if="event.actionRequired"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
              >
                <AlertCircle class="w-3 h-3 mr-1" />
                Action Required
              </span>
              
              <button
                v-if="event.action && event.actionEnabled"
                @click="handleAction(event.action)"
                class="text-xs font-medium text-coral-600 hover:text-coral-700 transition-colors"
              >
                {{ event.action.label }}
              </button>
            </div>
            
            <!-- Additional Event Details -->
            <div v-if="event.details" class="mt-3 p-3 bg-gray-50 rounded-lg">
              <div class="space-y-2">
                <div v-for="(detail, key) in event.details" :key="key" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ formatDetailKey(key) }}:</span>
                  <span class="font-medium text-gray-900">{{ detail }}</span>
                </div>
              </div>
            </div>
            
            <!-- Event Attachments -->
            <div v-if="event.attachments?.length" class="mt-3">
              <p class="text-xs font-medium text-gray-700 mb-2">Attachments:</p>
              <div class="space-y-1">
                <div 
                  v-for="attachment in event.attachments" 
                  :key="attachment.id"
                  class="flex items-center text-xs text-gray-600"
                >
                  <Paperclip class="w-3 h-3 mr-1" />
                  <a 
                    :href="attachment.url" 
                    target="_blank"
                    class="hover:text-coral-600 transition-colors"
                  >
                    {{ attachment.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Future Events -->
      <div v-if="futureEvents.length" class="mt-8">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Upcoming Steps</h4>
        <div class="space-y-3">
          <div 
            v-for="event in futureEvents" 
            :key="event.id"
            class="flex items-center p-3 bg-gray-50 rounded-lg"
          >
            <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <component :is="getEventIcon(event.type)" class="w-3 h-3 text-gray-500" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-700">{{ event.title }}</p>
              <p class="text-xs text-gray-500">{{ event.description }}</p>
            </div>
            <span v-if="event.estimatedDate" class="text-xs text-gray-500">
              {{ formatDate(event.estimatedDate) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  CheckCircle, Clock, FileText, Users, Calendar, 
  AlertCircle, Paperclip, Star, Award, MessageCircle 
} from 'lucide-vue-next'

const props = defineProps({
  timeline: {
    type: Array,
    default: () => []
  },
  futureEvents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['action'])

const getEventIcon = (type) => {
  const icons = {
    'submitted': FileText,
    'review': Clock,
    'document_review': FileText,
    'interview': Users,
    'test': Star,
    'decision': Award,
    'feedback': MessageCircle,
    'notification': AlertCircle,
    'meeting': Calendar,
    'deadline': Clock
  }
  return icons[type] || CheckCircle
}

const getEventStyles = (type, completed) => {
  if (completed) {
    const completedStyles = {
      'submitted': 'bg-green-500 border-green-500',
      'review': 'bg-blue-500 border-blue-500',
      'document_review': 'bg-orange-500 border-orange-500',
      'interview': 'bg-purple-500 border-purple-500',
      'test': 'bg-yellow-500 border-yellow-500',
      'decision': 'bg-green-500 border-green-500',
      'feedback': 'bg-blue-500 border-blue-500'
    }
    return completedStyles[type] || 'bg-green-500 border-green-500'
  } else {
    return 'bg-white border-gray-300'
  }
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'completed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'failed': 'bg-red-100 text-red-800',
    'cancelled': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status) => {
  const statuses = {
    'completed': 'Completed',
    'pending': 'Pending',
    'in_progress': 'In Progress',
    'failed': 'Failed',
    'cancelled': 'Cancelled'
  }
  return statuses[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return date < now ? 'Yesterday' : 'Tomorrow'
  } else if (diffDays <= 7) {
    return `${diffDays} days ${date < now ? 'ago' : 'from now'}`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

const formatDetailKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

const handleAction = (action) => {
  emit('action', action)
}
</script>
