<template>
  <div class="results-display space-y-6">
    
    <!-- Primary Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <!-- Digital Divide Reduction -->
      <div class="metric-card bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium opacity-90">Digital Divide Reduction</h3>
            <p class="text-2xl font-bold">{{ digitalDivideReduction.toFixed(1) }}%</p>
          </div>
          <div class="text-right">
            <svg class="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <!-- Progress Bar -->
        <div class="mt-3 bg-blue-400 bg-opacity-30 rounded-full h-2">
          <div 
            class="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${digitalDivideReduction}%` }"
          ></div>
        </div>
      </div>

      <!-- Engagement Time -->
      <div class="metric-card bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium opacity-90">Avg Engagement Time</h3>
            <p class="text-2xl font-bold">{{ engagementTime.toFixed(1) }} hrs/week</p>
          </div>
          <div class="text-right">
            <svg class="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <!-- Progress Bar -->
        <div class="mt-3 bg-green-400 bg-opacity-30 rounded-full h-2">
          <div 
            class="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${(engagementTime / 10) * 100}%` }"
          ></div>
        </div>
      </div>
      
    </div>

    <!-- Impact Score Display -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Overall Impact Score</h3>
      <div class="flex items-center space-x-3">
        <div class="flex-1 bg-gray-200 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${impactScore * 100}%` }"
          ></div>
        </div>
        <span class="text-lg font-semibold text-gray-900">
          {{ (impactScore * 100).toFixed(1) }}%
        </span>
      </div>
    </div>

    <!-- Secondary Metrics -->
    <div class="border-t pt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Impact Translation</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        
        <div class="bg-blue-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">
            {{ secondaryMetrics.studentsEquipped.toLocaleString() }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            Students equipped with reliable internet
          </div>
        </div>
        
        <div class="bg-green-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">
            {{ secondaryMetrics.schoolsImproved.toLocaleString() }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            Schools with improved digital infrastructure
          </div>
        </div>
        
        <div class="bg-purple-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">
            {{ secondaryMetrics.teachersTrained.toLocaleString() }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            Teachers receiving digital skills training
          </div>
        </div>
        
      </div>
    </div>

    <!-- Dynamic Interpretation -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h4 class="text-sm font-medium text-yellow-800 mb-2">Interpretation</h4>
      <div class="text-sm text-yellow-700 space-y-1">
        <p v-if="digitalDivideReduction < 20">
          <strong>Low Impact:</strong> Current policy settings show limited effectiveness in reducing digital inequalities. Consider increasing budget allocation and teacher training.
        </p>
        <p v-else-if="digitalDivideReduction < 50">
          <strong>Moderate Impact:</strong> These policies show promising results but there's room for improvement. Focus on enhancing community support and internet access.
        </p>
        <p v-else-if="digitalDivideReduction < 80">
          <strong>High Impact:</strong> Excellent policy configuration! This approach could significantly reduce digital divides and improve educational outcomes.
        </p>
        <p v-else>
          <strong>Exceptional Impact:</strong> Outstanding results! This comprehensive approach addresses multiple barriers to digital equity simultaneously.
        </p>
        
        <p class="mt-2">
          With your current settings, we project {{ secondaryMetrics.studentsEquipped.toLocaleString() }} 
          additional students will gain reliable internet access, contributing to more equitable educational opportunities.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
// Props
defineProps({
  digitalDivideReduction: {
    type: Number,
    required: true
  },
  engagementTime: {
    type: Number,
    required: true
  },
  secondaryMetrics: {
    type: Object,
    required: true
  },
  impactScore: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.metric-card {
  @apply transition-all duration-300 hover:shadow-lg;
}

.results-display {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
