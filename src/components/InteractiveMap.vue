<template>
  <div class="map-container bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Regional Impact Visualization</h3>
    
    <!-- Map Controls -->
    <div class="mb-4 flex flex-wrap gap-2">
      <button 
        v-for="region in regions" 
        :key="region.id"
        @click="selectedRegion = region.id"
        :class="{
          'bg-indigo-600 text-white': selectedRegion === region.id,
          'bg-gray-100 text-gray-700 hover:bg-gray-200': selectedRegion !== region.id
        }"
        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
      >
        {{ region.name }}
      </button>
    </div>

    <!-- Realistic European Map -->
    <div class="relative bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-4 mb-4 overflow-hidden">
      <svg viewBox="0 0 1000 600" class="w-full h-80 drop-shadow-sm">
        <!-- Map Background -->
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
          
          <!-- Gradient for water -->
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#bfdbfe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        
        <!-- Water bodies -->
        <rect x="0" y="0" width="1000" height="600" fill="url(#waterGradient)" />
        
        <!-- Nordic Region (Scandinavia + Finland) -->
        <g @click="selectRegion('nordic')" @mouseenter="handleMouseEnter('nordic', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Sweden -->
          <path 
            d="M 450 80 L 470 60 L 490 70 L 510 50 L 520 80 L 515 120 L 505 160 L 485 180 L 465 170 L 455 140 L 450 110 Z" 
            :fill="getRegionColor('nordic')" 
            stroke="#1f2937" stroke-width="1.5" 
            :class="{ 'selected-region': selectedRegion === 'nordic' }"
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Norway -->
          <path 
            d="M 420 50 L 445 45 L 465 65 L 455 95 L 445 120 L 435 145 L 425 130 L 415 100 L 420 75 Z" 
            :fill="getRegionColor('nordic')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Finland -->
          <path 
            d="M 525 85 L 545 70 L 565 90 L 570 120 L 560 150 L 545 165 L 525 160 L 520 130 L 520 100 Z" 
            :fill="getRegionColor('nordic')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Denmark -->
          <path 
            d="M 430 180 L 450 175 L 460 185 L 455 195 L 440 200 L 425 195 Z" 
            :fill="getRegionColor('nordic')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="480" y="120" text-anchor="middle" class="fill-white font-semibold text-sm drop-shadow-lg pointer-events-none">
            Nordic
          </text>
        </g>

        <!-- Western Europe -->
        <g @click="selectRegion('western')" @mouseenter="handleMouseEnter('western', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- United Kingdom -->
          <path 
            d="M 320 160 L 340 155 L 355 165 L 360 180 L 350 195 L 335 200 L 320 195 L 315 180 Z" 
            :fill="getRegionColor('western')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Ireland -->
          <path 
            d="M 285 175 L 305 170 L 310 185 L 305 200 L 285 195 L 280 180 Z" 
            :fill="getRegionColor('western')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- France -->
          <path 
            d="M 360 220 L 420 210 L 440 230 L 435 270 L 415 290 L 385 295 L 355 285 L 345 260 L 350 240 Z" 
            :fill="getRegionColor('western')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Germany -->
          <path 
            d="M 440 200 L 480 195 L 495 215 L 490 245 L 475 265 L 450 260 L 440 235 Z" 
            :fill="getRegionColor('western')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Netherlands + Belgium -->
          <path 
            d="M 420 195 L 445 190 L 450 205 L 440 215 L 415 220 Z" 
            :fill="getRegionColor('western')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="400" y="240" text-anchor="middle" class="fill-white font-semibold text-sm drop-shadow-lg pointer-events-none">
            Western EU
          </text>
        </g>

        <!-- Eastern Europe -->
        <g @click="selectRegion('eastern')" @mouseenter="handleMouseEnter('eastern', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Poland -->
          <path 
            d="M 495 220 L 535 215 L 550 235 L 545 255 L 525 265 L 500 260 L 490 240 Z" 
            :fill="getRegionColor('eastern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Czech Republic + Slovakia -->
          <path 
            d="M 485 265 L 520 260 L 540 275 L 535 290 L 510 295 L 485 285 Z" 
            :fill="getRegionColor('eastern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Hungary -->
          <path 
            d="M 510 295 L 540 290 L 555 305 L 545 320 L 520 325 L 500 315 Z" 
            :fill="getRegionColor('eastern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Baltic States -->
          <path 
            d="M 535 150 L 565 145 L 580 165 L 575 185 L 550 190 L 535 175 Z" 
            :fill="getRegionColor('eastern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Romania + Bulgaria -->
          <path 
            d="M 545 325 L 580 320 L 600 340 L 595 365 L 570 375 L 540 365 L 535 345 Z" 
            :fill="getRegionColor('eastern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="540" y="270" text-anchor="middle" class="fill-white font-semibold text-sm drop-shadow-lg pointer-events-none">
            Eastern EU
          </text>
        </g>

        <!-- Southern Europe -->
        <g @click="selectRegion('southern')" @mouseenter="handleMouseEnter('southern', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Spain -->
          <path 
            d="M 290 320 L 360 315 L 380 335 L 375 365 L 350 380 L 310 375 L 285 355 L 285 335 Z" 
            :fill="getRegionColor('southern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Italy -->
          <path 
            d="M 460 300 L 485 295 L 495 320 L 490 360 L 480 390 L 470 420 L 460 390 L 455 360 L 450 330 L 455 310 Z" 
            :fill="getRegionColor('southern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Greece -->
          <path 
            d="M 520 380 L 545 375 L 560 395 L 555 415 L 535 425 L 515 415 L 510 395 Z" 
            :fill="getRegionColor('southern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Portugal -->
          <path 
            d="M 260 330 L 285 325 L 290 350 L 285 370 L 265 375 L 255 355 Z" 
            :fill="getRegionColor('southern')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="380" y="360" text-anchor="middle" class="fill-white font-semibold text-sm drop-shadow-lg pointer-events-none">
            Southern EU
          </text>
        </g>

        <!-- Developing Regions (Balkans + Turkey outline) -->
        <g @click="selectRegion('developing')" @mouseenter="handleMouseEnter('developing', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Balkans -->
          <path 
            d="M 495 350 L 535 345 L 555 365 L 575 385 L 570 410 L 545 425 L 515 420 L 490 400 L 485 375 Z" 
            :fill="getRegionColor('developing')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Turkey (partial) -->
          <path 
            d="M 575 390 L 620 385 L 650 405 L 645 430 L 615 440 L 580 435 L 570 415 Z" 
            :fill="getRegionColor('developing')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="540" y="400" text-anchor="middle" class="fill-white font-semibold text-sm drop-shadow-lg pointer-events-none">
            Developing
          </text>
        </g>

        <!-- Rural/Remote Areas (represented as scattered regions) -->
        <g @click="selectRegion('rural')" @mouseenter="handleMouseEnter('rural', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Northern Scotland -->
          <path 
            d="M 335 140 L 355 135 L 365 150 L 360 165 L 340 160 L 330 150 Z" 
            :fill="getRegionColor('rural')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Alps region -->
          <path 
            d="M 440 280 L 470 275 L 485 290 L 475 305 L 450 310 L 430 295 Z" 
            :fill="getRegionColor('rural')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Pyrenees -->
          <path 
            d="M 360 310 L 385 305 L 395 320 L 385 330 L 365 325 L 355 315 Z" 
            :fill="getRegionColor('rural')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <!-- Arctic regions -->
          <path 
            d="M 480 20 L 520 15 L 540 35 L 525 55 L 490 60 L 470 40 Z" 
            :fill="getRegionColor('rural')" 
            stroke="#1f2937" stroke-width="1.5" 
            class="hover:brightness-110 transition-all duration-200"
            filter="url(#shadow)"
          />
          <text x="450" y="150" text-anchor="middle" class="fill-white font-semibold text-xs drop-shadow-lg pointer-events-none">
            Rural/Remote
          </text>
        </g>

        <!-- Map Legend -->
        <g class="pointer-events-none">
          <rect x="750" y="450" width="200" height="120" fill="white" fill-opacity="0.9" stroke="#374151" stroke-width="1" rx="8"/>
          <text x="760" y="470" class="text-xs font-semibold fill-gray-800">Impact Level</text>
          
          <rect x="760" y="480" width="15" height="10" fill="#22c55e"/>
          <text x="780" y="490" class="text-xs fill-gray-700">High (≥50%)</text>
          
          <rect x="760" y="500" width="15" height="10" fill="#eab308"/>
          <text x="780" y="510" class="text-xs fill-gray-700">Medium (≥25%)</text>
          
          <rect x="760" y="520" width="15" height="10" fill="#ef4444"/>
          <text x="780" y="530" class="text-xs fill-gray-700">Low (<25%)</text>
          
          <text x="760" y="550" class="text-xs fill-gray-600">Click regions for details</text>
        </g>
      </svg>
      
      <!-- Tooltip -->
      <div 
        v-if="showTooltip && hoveredRegion" 
        class="absolute pointer-events-none bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-10 transition-opacity duration-200"
        :style="{ left: tooltipPosition.x + 10 + 'px', top: tooltipPosition.y - 40 + 'px' }"
      >
        <div class="text-sm font-medium">{{ regionalImpacts[hoveredRegion]?.name }}</div>
        <div class="text-xs text-gray-300">{{ regionalImpacts[hoveredRegion]?.impact.toFixed(1) }}% impact</div>
        <div class="text-xs text-gray-300">Click for details</div>
        <!-- Arrow -->
        <div class="absolute top-full left-1/2 transform -translate-x-1/2">
          <div class="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
    
    <!-- Regional Statistics Overview -->
    <div class="bg-white rounded-lg p-4 mb-4 border border-gray-200">
      <h4 class="font-medium text-gray-900 mb-3">European Impact Overview</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div class="text-center bg-green-50 rounded-lg p-3">
          <div class="text-lg font-bold text-green-600">
            {{ Object.values(regionalImpacts).filter(r => r.impact >= 50).length }}
          </div>
          <div class="text-gray-600">High Impact Regions</div>
        </div>
        <div class="text-center bg-yellow-50 rounded-lg p-3">
          <div class="text-lg font-bold text-yellow-600">
            {{ Object.values(regionalImpacts).filter(r => r.impact >= 25 && r.impact < 50).length }}
          </div>
          <div class="text-gray-600">Medium Impact Regions</div>
        </div>
        <div class="text-center bg-blue-50 rounded-lg p-3">
          <div class="text-lg font-bold text-blue-600">
            {{ Object.values(regionalImpacts).reduce((sum, r) => sum + r.students, 0).toLocaleString() }}
          </div>
          <div class="text-gray-600">Total Students</div>
        </div>
        <div class="text-center bg-purple-50 rounded-lg p-3">
          <div class="text-lg font-bold text-purple-600">
            €{{ Object.values(regionalImpacts).reduce((sum, r) => sum + r.investment, 0).toLocaleString() }}
          </div>
          <div class="text-gray-600">Total Investment</div>
        </div>
      </div>
      
      <!-- Average Impact -->
      <div class="mt-4 text-center">
        <div class="text-2xl font-bold text-indigo-600">
          {{ (Object.values(regionalImpacts).reduce((sum, r) => sum + r.impact, 0) / Object.values(regionalImpacts).length).toFixed(1) }}%
        </div>
        <div class="text-gray-600">Average Regional Impact</div>
      </div>
    </div>
      
    <!-- Selected Region Details -->
    <div v-if="selectedRegionData" class="bg-blue-50 rounded-lg p-4">
      <h4 class="font-medium text-blue-900 mb-3">{{ selectedRegionData.name }} Region Analysis</h4>
      <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-xl font-bold text-blue-600">{{ selectedRegionData.impact.toFixed(1) }}%</div>
          <div class="text-gray-600">Projected Impact</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-green-600">{{ selectedRegionData.students.toLocaleString() }}</div>
          <div class="text-gray-600">Students Affected</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-purple-600">€{{ selectedRegionData.investment.toLocaleString() }}</div>
          <div class="text-gray-600">Required Investment</div>
        </div>
      </div>
      
      <!-- Regional Challenges -->
      <div class="mt-4">
        <h5 class="font-medium text-gray-800 mb-2">Key Challenges & Opportunities</h5>
        <ul class="space-y-1 text-sm text-gray-700">
          <li v-for="challenge in selectedRegionData.challenges" :key="challenge" class="flex items-start space-x-2">
            <span class="text-yellow-500 mt-0.5">•</span>
            <span>{{ challenge }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  currentImpact: {
    type: Number,
    required: true
  },
  policyInputs: {
    type: Array,
    required: true
  }
})

// Local state
const selectedRegion = ref('europe')
const hoveredRegion = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const showTooltip = ref(false)

// Regional data with different characteristics - now representing actual world regions
const regions = ref([
  { id: 'north_america', name: 'North America' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia_pacific', name: 'Asia-Pacific' },
  { id: 'latin_america', name: 'Latin America' },
  { id: 'africa', name: 'Africa' },
  { id: 'middle_east', name: 'Middle East' }
])

// Calculate regional impact based on different global factors
const regionalImpacts = computed(() => {
  const [budget, internet, training, community] = props.policyInputs
  const baseImpact = props.currentImpact

  return {
    north_america: {
      name: 'North America',
      impact: Math.min(baseImpact * 1.2, 60), // High baseline infrastructure
      students: 65000000,
      investment: Math.round(budget * 65000),
      challenges: [
        'High baseline - focus on equity gaps',
        'Rural-urban digital divide',
        'Funding disparities between districts',
        'Teacher retention in technology integration'
      ]
    },
    europe: {
      name: 'Europe',
      impact: Math.min(baseImpact * 1.1, 60), // Strong regulatory framework
      students: 75000000,
      investment: Math.round(budget * 75000),
      challenges: [
        'GDPR compliance and data privacy',
        'Language diversity across regions',
        'Varying national education policies',
        'Integration with existing EU frameworks'
      ]
    },
    asia_pacific: {
      name: 'Asia-Pacific',
      impact: baseImpact * 0.95, // Mixed development levels
      students: 850000000,
      investment: Math.round(budget * 850000),
      challenges: [
        'Massive scale and population diversity',
        'Infrastructure gaps in rural areas',
        'Multiple languages and cultural contexts',
        'Economic disparities between countries'
      ]
    },
    latin_america: {
      name: 'Latin America',
      impact: baseImpact * 0.8, // Infrastructure challenges
      students: 130000000,
      investment: Math.round(budget * 130000),
      challenges: [
        'Limited internet infrastructure',
        'Economic constraints on education budgets',
        'Geographic barriers (mountains, rainforests)',
        'High potential for mobile-first solutions'
      ]
    },
    africa: {
      name: 'Africa',
      impact: baseImpact * 0.7, // Significant infrastructure gaps
      students: 350000000,
      investment: Math.round(budget * 350000),
      challenges: [
        'Limited electricity and internet access',
        'Large youth population with high potential',
        'Multiple languages and education systems',
        'Opportunity for leapfrog technologies'
      ]
    },
    middle_east: {
      name: 'Middle East',
      impact: baseImpact * 0.85, // Mixed economic conditions
      students: 80000000,
      investment: Math.round(budget * 80000),
      challenges: [
        'Political instability in some regions',
        'Cultural considerations for technology adoption',
        'Oil-dependent economies diversifying',
        'Strong potential in Gulf countries'
      ]
    }
  }
})

// Selected region data
const selectedRegionData = computed(() => {
  return regionalImpacts.value[selectedRegion.value]
})

// Methods
const selectRegion = (regionId) => {
  selectedRegion.value = regionId
}

const handleMouseEnter = (regionId, event) => {
  hoveredRegion.value = regionId
  showTooltip.value = true
  updateTooltipPosition(event)
}

const handleMouseLeave = () => {
  hoveredRegion.value = null
  showTooltip.value = false
}

const updateTooltipPosition = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  tooltipPosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

const getRegionColor = (regionId) => {
  const impact = regionalImpacts.value[regionId].impact
  
  if (impact >= 50) return '#22c55e' // Green for high impact (≥50%)
  if (impact >= 25) return '#eab308' // Yellow for medium impact (≥25%)
  return '#ef4444' // Red for low impact (<25%)
}
</script>

<style scoped>
.map-container {
  min-height: 500px;
}

svg {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%);
  border-radius: 12px;
}

svg text {
  font-size: 12px;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Hover effects for better interactivity */
svg g:hover path {
  filter: brightness(1.1) saturate(1.2);
  transform: scale(1.02);
  transform-origin: center;
  transition: all 0.3s ease;
}

/* Pulse animation for selected region */
.selected-region {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.3); }
  100% { filter: brightness(1); }
}

/* Responsive design */
@media (max-width: 768px) {
  svg text {
    font-size: 10px;
  }
  
  .map-container {
    min-height: 350px;
  }
}

@media (max-width: 640px) {
  svg text {
    font-size: 8px;
  }
  
  /* Hide some labels on very small screens */
  svg text:nth-child(odd) {
    display: none;
  }
}
</style>
