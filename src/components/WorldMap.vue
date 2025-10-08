<template>
  <div class="map-container bg-white rounded-xl shadow-lg p-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 lg:mb-0">Global Digital Education Impact</h3>
      
      <!-- Advanced Controls -->
      <div class="flex flex-wrap gap-2 items-center">
        <div class="flex items-center gap-2">
          <button 
            @click="toggleAnimation"
            :class="{
              'bg-green-600 text-white': isAnimating,
              'bg-gray-100 text-gray-700 hover:bg-gray-200': !isAnimating
            }"
            class="px-3 py-1 text-sm font-medium rounded-lg transition-colors"
          >
            {{ isAnimating ? 'Pause' : 'Play' }} Animation
          </button>
          
          <button 
            @click="toggleComparisonMode"
            :class="{
              'bg-purple-600 text-white': comparisonMode,
              'bg-gray-100 text-gray-700 hover:bg-gray-200': !comparisonMode
            }"
            class="px-3 py-1 text-sm font-medium rounded-lg transition-colors"
          >
            Compare Regions
          </button>
          
          <button 
            @click="exportData"
            class="bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Data
          </button>
        </div>
        
        <!-- View Options -->
        <div class="flex items-center gap-2 border-l pl-2 ml-2">
          <select 
            v-model="viewMode"
            class="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="impact">Impact View</option>
            <option value="investment">Investment View</option>
            <option value="students">Student Population</option>
            <option value="challenges">Challenge Intensity</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Comparison Mode Selection -->
    <div v-if="comparisonMode" class="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <h4 class="text-sm font-medium text-purple-900 mb-2">Select Regions to Compare</h4>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="region in regions" 
          :key="region.id"
          @click="toggleComparison(region.id)"
          :class="{
            'bg-purple-600 text-white': comparisonRegions.includes(region.id),
            'bg-white text-purple-700 hover:bg-purple-100': !comparisonRegions.includes(region.id)
          }"
          class="px-3 py-1 text-sm font-medium rounded-lg border border-purple-300 transition-colors"
        >
          {{ region.name }}
        </button>
      </div>
    </div>
    
    <!-- Region Selection Controls -->
    <div v-if="!comparisonMode" class="mb-4 flex flex-wrap gap-2">
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

    <!-- Realistic World Map -->
    <div class="relative bg-gradient-to-b from-blue-100 to-blue-300 rounded-lg p-4 mb-4 overflow-hidden">
      <svg viewBox="0 0 1200 600" class="w-full h-96 drop-shadow-sm">
        <!-- Map Background -->
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.4"/>
          </filter>
          
          <!-- Gradient for ocean -->
          <radialGradient id="oceanGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#dbeafe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:0.3" />
          </radialGradient>
          
          <!-- Animated gradient for data flows -->
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
          </linearGradient>
          
          <!-- Pulse animation for data points -->
          <circle id="dataPulse" r="4" fill="#10b981" opacity="0.8">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
          </circle>
        </defs>
        
        <!-- Ocean background -->
        <rect x="0" y="0" width="1200" height="600" fill="url(#oceanGradient)" />
        
        <!-- North America -->
        <g @click="selectRegion('north_america')" @mouseenter="handleMouseEnter('north_america', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- USA -->
          <path 
            d="M 150 200 L 400 190 L 420 220 L 440 250 L 430 290 L 400 320 L 370 340 L 340 350 L 300 340 L 260 330 L 220 310 L 180 290 L 160 260 L 150 230 Z" 
            :fill="getRegionColor('north_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'north_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Canada -->
          <path 
            d="M 150 120 L 450 100 L 470 140 L 450 180 L 400 190 L 150 200 L 140 160 Z" 
            :fill="getRegionColor('north_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'north_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Mexico -->
          <path 
            d="M 200 350 L 280 340 L 300 360 L 290 390 L 260 400 L 220 390 L 200 370 Z" 
            :fill="getRegionColor('north_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'north_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="300" y="250" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            North America
          </text>
        </g>

        <!-- Europe -->
        <g @click="selectRegion('europe')" @mouseenter="handleMouseEnter('europe', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Europe landmass -->
          <path 
            d="M 550 160 L 650 150 L 680 170 L 690 200 L 680 230 L 650 250 L 620 260 L 580 255 L 550 240 L 540 210 L 545 180 Z" 
            :fill="getRegionColor('europe')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'europe' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- UK -->
          <path 
            d="M 520 180 L 540 175 L 545 195 L 535 210 L 520 205 L 515 190 Z" 
            :fill="getRegionColor('europe')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'europe' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Scandinavia -->
          <path 
            d="M 580 120 L 620 110 L 635 140 L 630 170 L 610 180 L 580 175 L 575 150 Z" 
            :fill="getRegionColor('europe')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'europe' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="600" y="200" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            Europe
          </text>
        </g>

        <!-- Asia-Pacific -->
        <g @click="selectRegion('asia_pacific')" @mouseenter="handleMouseEnter('asia_pacific', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- China -->
          <path 
            d="M 780 180 L 900 170 L 920 200 L 910 240 L 890 270 L 860 280 L 820 275 L 780 260 L 770 220 L 775 200 Z" 
            :fill="getRegionColor('asia_pacific')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'asia_pacific' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- India -->
          <path 
            d="M 750 260 L 800 250 L 820 280 L 810 320 L 780 340 L 750 330 L 740 300 L 745 280 Z" 
            :fill="getRegionColor('asia_pacific')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'asia_pacific' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Southeast Asia -->
          <path 
            d="M 850 300 L 920 290 L 940 320 L 930 350 L 900 370 L 860 365 L 840 340 L 845 320 Z" 
            :fill="getRegionColor('asia_pacific')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'asia_pacific' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Japan -->
          <path 
            d="M 960 200 L 980 190 L 990 210 L 985 230 L 970 240 L 955 235 L 950 220 Z" 
            :fill="getRegionColor('asia_pacific')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'asia_pacific' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Australia -->
          <path 
            d="M 900 450 L 1000 440 L 1020 470 L 1010 500 L 980 510 L 920 505 L 890 485 L 895 465 Z" 
            :fill="getRegionColor('asia_pacific')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'asia_pacific' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="850" y="270" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            Asia-Pacific
          </text>
        </g>

        <!-- Latin America -->
        <g @click="selectRegion('latin_america')" @mouseenter="handleMouseEnter('latin_america', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Brazil -->
          <path 
            d="M 350 380 L 450 370 L 480 400 L 470 450 L 450 480 L 420 490 L 380 485 L 340 470 L 330 430 L 340 400 Z" 
            :fill="getRegionColor('latin_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'latin_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Argentina -->
          <path 
            d="M 350 480 L 400 470 L 420 500 L 410 540 L 390 560 L 360 555 L 340 530 L 345 505 Z" 
            :fill="getRegionColor('latin_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'latin_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Central America -->
          <path 
            d="M 250 350 L 320 340 L 340 370 L 320 390 L 280 395 L 250 380 L 245 365 Z" 
            :fill="getRegionColor('latin_america')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'latin_america' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="380" y="430" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            Latin America
          </text>
        </g>

        <!-- Africa -->
        <g @click="selectRegion('africa')" @mouseenter="handleMouseEnter('africa', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Africa continent -->
          <path 
            d="M 550 290 L 650 280 L 680 310 L 690 350 L 680 400 L 660 450 L 640 480 L 610 490 L 580 485 L 550 470 L 530 440 L 520 400 L 530 360 L 540 320 Z" 
            :fill="getRegionColor('africa')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'africa' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <!-- Madagascar -->
          <path 
            d="M 700 460 L 720 455 L 725 475 L 720 495 L 705 500 L 695 485 L 698 470 Z" 
            :fill="getRegionColor('africa')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'africa' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="600" y="390" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            Africa
          </text>
        </g>

        <!-- Middle East -->
        <g @click="selectRegion('middle_east')" @mouseenter="handleMouseEnter('middle_east', $event)" @mouseleave="handleMouseLeave" class="cursor-pointer">
          <!-- Middle East region -->
          <path 
            d="M 650 250 L 750 240 L 770 270 L 760 300 L 730 320 L 700 315 L 670 300 L 650 280 L 645 265 Z" 
            :fill="getRegionColor('middle_east')" 
            stroke="#0f172a" stroke-width="2" 
            :class="{ 'selected-region': selectedRegion === 'middle_east' }"
            class="hover:brightness-110 transition-all duration-300"
            filter="url(#shadow)"
          />
          <text x="710" y="285" text-anchor="middle" class="fill-white font-bold text-sm drop-shadow-lg pointer-events-none">
            Middle East
          </text>
        </g>

        <!-- Animated Data Visualization Layer -->
        <g v-if="isAnimating" class="data-layer">
          <!-- Data Connection Lines -->
          <g class="connection-lines">
            <line 
              v-for="connection in dataConnections" 
              :key="connection.id"
              :x1="connection.from.x" :y1="connection.from.y"
              :x2="connection.to.x" :y2="connection.to.y"
              stroke="url(#dataFlow)" stroke-width="2" opacity="0.6"
              class="data-connection"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,20;20,0;0,20" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </line>
          </g>
          
          <!-- Data Points -->
          <g class="data-points">
            <use 
              v-for="point in dataPoints" 
              :key="point.id"
              :x="point.x" :y="point.y"
              href="#dataPulse"
            />
          </g>
          
          <!-- Investment Flow Indicators -->
          <g class="investment-flows">
            <circle 
              v-for="flow in investmentFlows" 
              :key="flow.id"
              :cx="flow.x" :cy="flow.y"
              :r="flow.size"
              :fill="flow.color"
              opacity="0.7"
            >
              <animate 
                attributeName="r" 
                :values="`${flow.size};${flow.size * 1.5};${flow.size}`" 
                dur="4s" 
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>

        <!-- Progress Indicators -->
        <g v-if="viewMode === 'investment'" class="progress-indicators">
          <rect 
            v-for="region in Object.keys(regionalImpacts)" 
            :key="region"
            :x="getRegionCenter(region).x - 25" 
            :y="getRegionCenter(region).y + 20"
            width="50" height="8"
            fill="white" stroke="#374151" stroke-width="1" rx="4"
          />
          <rect 
            v-for="region in Object.keys(regionalImpacts)" 
            :key="region + '-progress'"
            :x="getRegionCenter(region).x - 25" 
            :y="getRegionCenter(region).y + 20"
            :width="(regionalImpacts[region].impact / 60) * 50" 
            height="8"
            :fill="getRegionColor(region)" 
            rx="4"
          />
        </g>

        <!-- Map Legend -->
        <g class="pointer-events-none">
          <rect x="50" y="450" width="220" height="130" fill="white" fill-opacity="0.95" stroke="#374151" stroke-width="1" rx="8"/>
          <text x="60" y="470" class="text-sm font-bold fill-gray-800">Global Impact Distribution</text>
          
          <rect x="60" y="480" width="15" height="12" fill="#22c55e"/>
          <text x="80" y="492" class="text-xs fill-gray-700">High Impact (≥50%)</text>
          
          <rect x="60" y="500" width="15" height="12" fill="#eab308"/>
          <text x="80" y="512" class="text-xs fill-gray-700">Medium Impact (25-50%)</text>
          
          <rect x="60" y="520" width="15" height="12" fill="#ef4444"/>
          <text x="80" y="532" class="text-xs fill-gray-700">Low Impact (<25%)</text>
          
          <text x="60" y="550" class="text-xs fill-gray-600">Click regions for detailed analysis</text>
          <text x="60" y="565" class="text-xs fill-gray-600">Based on infrastructure & economic factors</text>
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
      <h4 class="font-medium text-gray-900 mb-3">Global Impact Overview</h4>
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
            {{ (Object.values(regionalImpacts).reduce((sum, r) => sum + r.students, 0) / 1000000).toFixed(0) }}M
          </div>
          <div class="text-gray-600">Total Students</div>
        </div>
        <div class="text-center bg-purple-50 rounded-lg p-3">
          <div class="text-lg font-bold text-purple-600">
            €{{ (Object.values(regionalImpacts).reduce((sum, r) => sum + r.investment, 0) / 1000000000).toFixed(1) }}B
          </div>
          <div class="text-gray-600">Total Investment</div>
        </div>
      </div>
      
      <!-- Average Impact -->
      <div class="mt-4 text-center">
        <div class="text-2xl font-bold text-indigo-600">
          {{ (Object.values(regionalImpacts).reduce((sum, r) => sum + r.impact, 0) / Object.values(regionalImpacts).length).toFixed(1) }}%
        </div>
        <div class="text-gray-600">Average Global Impact</div>
      </div>
    </div>
    
    <!-- Comparison Mode Visualization -->
    <div v-if="comparisonMode && comparisonRegions.length > 0" class="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
      <h4 class="font-medium text-purple-900 mb-4">Regional Comparison Analysis</h4>
      
      <!-- Comparison Chart -->
      <div class="space-y-4">
        <div v-for="metric in comparisonMetrics" :key="metric.key" class="bg-white rounded-lg p-4">
          <h5 class="font-medium text-gray-800 mb-3">{{ metric.label }}</h5>
          <div class="space-y-2">
            <div 
              v-for="regionId in comparisonRegions" 
              :key="regionId"
              class="flex items-center justify-between"
            >
              <span class="text-sm font-medium text-gray-700 w-24">
                {{ regionalImpacts[regionId].name }}
              </span>
              <div class="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                <div 
                  class="h-3 rounded-full transition-all duration-500"
                  :style="{ 
                    width: `${getComparisonWidth(regionId, metric.key)}%`,
                    backgroundColor: getRegionColor(regionId)
                  }"
                />
              </div>
              <span class="text-sm font-bold text-gray-900 w-16 text-right">
                {{ formatMetricValue(regionalImpacts[regionId][metric.key], metric.format) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison Insights -->
      <div class="mt-4 p-3 bg-white rounded-lg">
        <h5 class="font-medium text-gray-800 mb-2">Key Insights</h5>
        <ul class="text-sm text-gray-700 space-y-1">
          <li v-for="insight in comparisonInsights" :key="insight" class="flex items-start">
            <span class="text-purple-500 mr-2">•</span>
            <span>{{ insight }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Time-based Simulation Controls -->
    <div v-if="isAnimating" class="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
      <h4 class="font-medium text-blue-900 mb-3">Implementation Timeline Simulation</h4>
      <div class="flex items-center space-x-4 mb-3">
        <label class="text-sm font-medium text-gray-700">Timeline:</label>
        <input 
          type="range" 
          v-model="simulationTime" 
          min="0" 
          max="60" 
          class="flex-1"
        />
        <span class="text-sm font-medium text-blue-600">{{ simulationTime }} months</span>
      </div>
      <div class="text-sm text-gray-600">
        Showing projected impact after {{ simulationTime }} months of implementation
      </div>
    </div>
      
    <!-- Selected Region Details -->
    <div v-if="selectedRegionData" class="bg-blue-50 rounded-lg p-4">
      <h4 class="font-medium text-blue-900 mb-3">{{ selectedRegionData.name }} Analysis</h4>
      <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-xl font-bold text-blue-600">{{ selectedRegionData.impact.toFixed(1) }}%</div>
          <div class="text-gray-600">Projected Impact</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-green-600">{{ (selectedRegionData.students / 1000000).toFixed(0) }}M</div>
          <div class="text-gray-600">Students Affected</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-purple-600">€{{ (selectedRegionData.investment / 1000000000).toFixed(1) }}B</div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
const isAnimating = ref(false)
const comparisonMode = ref(false)
const comparisonRegions = ref([])
const viewMode = ref('impact')
const simulationTime = ref(0)
const animationInterval = ref(null)

// Regional data representing actual world regions
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

// Animated data points for visualization
const dataPoints = computed(() => {
  if (!isAnimating.value) return []
  
  return Object.keys(regionalImpacts.value).map((regionId, index) => {
    const center = getRegionCenter(regionId)
    return {
      id: regionId,
      x: center.x + Math.sin(Date.now() * 0.001 + index) * 10,
      y: center.y + Math.cos(Date.now() * 0.001 + index) * 10,
      impact: regionalImpacts.value[regionId].impact
    }
  })
})

// Data connections between regions
const dataConnections = computed(() => {
  if (!isAnimating.value) return []
  
  const connections = []
  const regions = Object.keys(regionalImpacts.value)
  
  for (let i = 0; i < regions.length; i++) {
    for (let j = i + 1; j < regions.length; j++) {
      if (Math.random() > 0.7) { // Only show some connections
        connections.push({
          id: `${regions[i]}-${regions[j]}`,
          from: getRegionCenter(regions[i]),
          to: getRegionCenter(regions[j])
        })
      }
    }
  }
  
  return connections
})

// Investment flow indicators
const investmentFlows = computed(() => {
  if (!isAnimating.value) return []
  
  return Object.keys(regionalImpacts.value).map(regionId => {
    const center = getRegionCenter(regionId)
    const investment = regionalImpacts.value[regionId].investment
    return {
      id: regionId,
      x: center.x,
      y: center.y,
      size: Math.log(investment) * 2,
      color: getRegionColor(regionId)
    }
  })
})

// Comparison metrics
const comparisonMetrics = ref([
  { key: 'impact', label: 'Digital Divide Reduction', format: 'percent' },
  { key: 'students', label: 'Student Population', format: 'students' },
  { key: 'investment', label: 'Required Investment', format: 'investment' }
])

// Comparison insights
const comparisonInsights = computed(() => {
  if (comparisonRegions.value.length === 0) return []
  
  const insights = []
  const regions = comparisonRegions.value.map(id => regionalImpacts.value[id])
  
  // Find highest impact region
  const highestImpact = regions.reduce((max, region) => 
    region.impact > max.impact ? region : max
  )
  insights.push(`${highestImpact.name} shows the highest potential impact at ${highestImpact.impact.toFixed(1)}%`)
  
  // Find most cost-effective region
  const costEffective = regions.reduce((min, region) => 
    (region.investment / region.students) < (min.investment / min.students) ? region : min
  )
  insights.push(`${costEffective.name} offers the most cost-effective implementation per student`)
  
  // Find largest scale opportunity
  const largestScale = regions.reduce((max, region) => 
    region.students > max.students ? region : max
  )
  insights.push(`${largestScale.name} represents the largest scale opportunity with ${(largestScale.students / 1000000).toFixed(0)}M students`)
  
  return insights
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
  
  if (viewMode.value === 'impact') {
    if (impact >= 50) return '#22c55e' // Green for high impact (≥50%)
    if (impact >= 25) return '#eab308' // Yellow for medium impact (≥25%)
    return '#ef4444' // Red for low impact (<25%)
  } else if (viewMode.value === 'investment') {
    const investment = regionalImpacts.value[regionId].investment
    const maxInvestment = Math.max(...Object.values(regionalImpacts.value).map(r => r.investment))
    const intensity = investment / maxInvestment
    return `rgb(${Math.round(255 * (1 - intensity))}, ${Math.round(255 * intensity)}, 100)`
  } else if (viewMode.value === 'students') {
    const students = regionalImpacts.value[regionId].students
    const maxStudents = Math.max(...Object.values(regionalImpacts.value).map(r => r.students))
    const intensity = students / maxStudents
    return `rgb(100, ${Math.round(255 * intensity)}, ${Math.round(255 * (1 - intensity))})`
  } else {
    // Challenge intensity mode
    const challenges = regionalImpacts.value[regionId].challenges.length
    const maxChallenges = Math.max(...Object.values(regionalImpacts.value).map(r => r.challenges.length))
    const intensity = challenges / maxChallenges
    return `rgb(${Math.round(255 * intensity)}, ${Math.round(255 * (1 - intensity))}, 100)`
  }
}

const getRegionCenter = (regionId) => {
  const centers = {
    north_america: { x: 300, y: 250 },
    europe: { x: 600, y: 200 },
    asia_pacific: { x: 850, y: 270 },
    latin_america: { x: 380, y: 430 },
    africa: { x: 600, y: 390 },
    middle_east: { x: 710, y: 285 }
  }
  return centers[regionId] || { x: 0, y: 0 }
}

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value
  if (isAnimating.value) {
    startSimulation()
  } else {
    stopSimulation()
  }
}

const startSimulation = () => {
  animationInterval.value = setInterval(() => {
    simulationTime.value = (simulationTime.value + 1) % 61
  }, 200)
}

const stopSimulation = () => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value)
    animationInterval.value = null
  }
}

const toggleComparisonMode = () => {
  comparisonMode.value = !comparisonMode.value
  if (!comparisonMode.value) {
    comparisonRegions.value = []
  }
}

const toggleComparison = (regionId) => {
  const index = comparisonRegions.value.indexOf(regionId)
  if (index === -1) {
    if (comparisonRegions.value.length < 4) { // Limit to 4 regions for readability
      comparisonRegions.value.push(regionId)
    }
  } else {
    comparisonRegions.value.splice(index, 1)
  }
}

const getComparisonWidth = (regionId, metric) => {
  const value = regionalImpacts.value[regionId][metric]
  const maxValue = Math.max(...comparisonRegions.value.map(id => 
    regionalImpacts.value[id][metric]
  ))
  return (value / maxValue) * 100
}

const formatMetricValue = (value, format) => {
  switch (format) {
    case 'percent':
      return `${value.toFixed(1)}%`
    case 'students':
      return `${(value / 1000000).toFixed(1)}M`
    case 'investment':
      return `€${(value / 1000000000).toFixed(1)}B`
    default:
      return value.toString()
  }
}

const exportData = () => {
  const exportData = {
    timestamp: new Date().toISOString(),
    policyInputs: props.policyInputs,
    currentImpact: props.currentImpact,
    selectedRegion: selectedRegion.value,
    regionalImpacts: regionalImpacts.value,
    comparisonRegions: comparisonRegions.value,
    viewMode: viewMode.value
  }
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `policy-impact-analysis-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// Lifecycle hooks
onMounted(() => {
  // Optional: Auto-start animation
  // toggleAnimation()
})

onUnmounted(() => {
  stopSimulation()
})
</script>

<style scoped>
.map-container {
  min-height: 700px;
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

/* Data visualization animations */
.data-connection {
  animation: dataFlow 3s ease-in-out infinite;
}

@keyframes dataFlow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: -20; }
}

.data-points circle {
  animation: dataPulse 2s ease-in-out infinite;
}

@keyframes dataPulse {
  0%, 100% { 
    opacity: 0.8; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.3; 
    transform: scale(1.5); 
  }
}

/* Investment flow animations */
.investment-flows circle {
  animation: investmentPulse 4s ease-in-out infinite;
}

@keyframes investmentPulse {
  0%, 100% { 
    opacity: 0.7; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.4; 
    transform: scale(1.2); 
  }
}

/* Comparison mode styling */
.comparison-bar {
  transition: width 0.5s ease-in-out;
}

/* Enhanced tooltip styling */
.tooltip-advanced {
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Progress indicator styling */
.progress-indicators rect {
  transition: all 0.3s ease;
}

.progress-indicators rect:hover {
  filter: brightness(1.2);
}

/* Responsive design */
@media (max-width: 768px) {
  svg text {
    font-size: 10px;
  }
  
  .map-container {
    min-height: 500px;
  }
  
  /* Hide some animation elements on mobile for performance */
  .data-connection,
  .investment-flows {
    display: none;
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
  
  /* Simplify controls on mobile */
  .data-layer {
    opacity: 0.5;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .data-connection,
  .data-points circle,
  .investment-flows circle,
  .selected-region {
    animation: none;
  }
  
  svg g:hover path {
    transform: none;
  }
}

/* Focus styles for keyboard navigation */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Enhanced visual feedback */
.region-highlight {
  stroke: #3b82f6;
  stroke-width: 3px;
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}
</style>
