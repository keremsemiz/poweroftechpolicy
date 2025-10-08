<template>
  <div class="slider-control">
    <!-- Label and Value Display -->
    <div class="flex justify-between items-center mb-3">
      <label 
        :for="`slider-${label.replace(/\s+/g, '-').toLowerCase()}`"
        class="text-sm font-medium text-gray-700"
      >
        {{ label }}
      </label>
      <div class="flex items-center space-x-2">
        <span class="text-sm font-semibold text-indigo-600">
          {{ formattedValue }}{{ unit }}
        </span>
        <button
          v-if="description"
          @click="showTooltip = !showTooltip"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
          :aria-label="`Information about ${label}`"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Slider Input -->
    <div class="relative">
      <input
        :id="`slider-${label.replace(/\s+/g, '-').toLowerCase()}`"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="handleInput"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        :aria-label="`${label}: ${formattedValue}${unit}`"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
      >
      
      <!-- Range Labels -->
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>{{ min }}{{ unit }}</span>
        <span>{{ max }}{{ unit }}</span>
      </div>
    </div>

    <!-- Tooltip -->
    <div
      v-if="showTooltip && description"
      class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800"
    >
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local state
const showTooltip = ref(false)

// Computed properties
const formattedValue = computed(() => {
  if (props.step < 1) {
    return props.modelValue.toFixed(1)
  }
  return Math.round(props.modelValue).toLocaleString()
})

// Methods
const handleInput = (event) => {
  const value = parseFloat(event.target.value)
  emit('update:modelValue', value)
}
</script>

<style scoped>
/* Custom slider styling */
.slider-thumb {
  @apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
}

.slider-thumb::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 bg-indigo-600 rounded-full cursor-pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-thumb::-webkit-slider-thumb:hover {
  @apply bg-indigo-700;
}

.slider-thumb::-moz-range-thumb {
  @apply w-5 h-5 bg-indigo-600 rounded-full cursor-pointer border-0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-thumb::-moz-range-thumb:hover {
  @apply bg-indigo-700;
}

.slider-thumb::-webkit-slider-track {
  @apply bg-gray-200 rounded-lg;
}

.slider-thumb::-moz-range-track {
  @apply bg-gray-200 rounded-lg border-0;
}
</style>
