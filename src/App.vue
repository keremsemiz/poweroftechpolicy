<script setup>
import { ref, computed, onMounted } from 'vue'
import SliderControl from './components/SliderControl.vue'
import ResultsDisplay from './components/ResultsDisplay.vue'
import WorldMap from './components/WorldMap.vue'
import { 
  computeImpact, 
  calculateDigitalDivideReduction, 
  calculateEngagementTime,
  calculateSecondaryMetrics,
  computeEnhancedImpact,
  calculateImplementationTimeline,
  calculateRiskAssessment,
  calculateEquityImpact
} from './utils/model.js'

// Policy lever state with more detailed ranges
const budget = ref(2750) // Default to middle of range (€500-€5000)
const internetRate = ref(75) // Default to middle of range (50-100%)
const teacherIndex = ref(0.5) // Default to middle of range (0-1)
const communitySupport = ref(0.5) // Default to middle of range (0-1)

// Advanced state tracking
const previousImpact = ref(0)
const changeHistory = ref([])
const showAdvancedMetrics = ref(false)
const selectedScenario = ref('custom')

// Real-time sensitivity analysis
const sensitivityAnalysis = computed(() => {
  const baseInputs = [budget.value, internetRate.value / 100, teacherIndex.value, communitySupport.value]
  const baseImpact = computeImpact(baseInputs)
  
  // Calculate impact of 10% increase in each variable
  const budgetSensitivity = computeImpact([budget.value * 1.1, internetRate.value / 100, teacherIndex.value, communitySupport.value]) - baseImpact
  const internetSensitivity = computeImpact([budget.value, (internetRate.value * 1.1) / 100, teacherIndex.value, communitySupport.value]) - baseImpact
  const teacherSensitivity = computeImpact([budget.value, internetRate.value / 100, Math.min(teacherIndex.value * 1.1, 1), communitySupport.value]) - baseImpact
  const communitySensitivity = computeImpact([budget.value, internetRate.value / 100, teacherIndex.value, Math.min(communitySupport.value * 1.1, 1)]) - baseImpact
  
  return {
    budget: budgetSensitivity,
    internet: internetSensitivity,
    teacher: teacherSensitivity,
    community: communitySensitivity
  }
})

// Computed properties for impact calculations
const impactInputs = computed(() => [
  budget.value,
  internetRate.value / 100, // Convert percentage to decimal
  teacherIndex.value,
  communitySupport.value
])

const impactScore = computed(() => {
  const newImpact = computeImpact(impactInputs.value)
  
  // Track changes
  if (Math.abs(newImpact - previousImpact.value) > 0.01) {
    changeHistory.value.push({
      timestamp: new Date().toLocaleTimeString(),
      impact: newImpact,
      scenario: selectedScenario.value
    })
    if (changeHistory.value.length > 10) {
      changeHistory.value.shift()
    }
  }
  previousImpact.value = newImpact
  
  return newImpact
})

const digitalDivideReduction = computed(() => calculateDigitalDivideReduction(impactScore.value))
const engagementTime = computed(() => calculateEngagementTime(impactScore.value))
const secondaryMetrics = computed(() => calculateSecondaryMetrics(impactScore.value))

// Enhanced analytics using new model functions
const implementationTimeline = computed(() => calculateImplementationTimeline(impactInputs.value))
const riskAssessment = computed(() => calculateRiskAssessment(impactInputs.value))
const equityImpact = computed(() => calculateEquityImpact(impactScore.value))

// Enhanced impact with regional adjustments
const regionalImpact = computed(() => ({
  urban: computeEnhancedImpact(impactInputs.value, { isRural: false, socioeconomicLevel: 1.1 }),
  rural: computeEnhancedImpact(impactInputs.value, { isRural: true, socioeconomicLevel: 0.9 })
}))

// Enhanced detailed metrics with more sophisticated calculations
const detailedMetrics = computed(() => {
  const impact = impactScore.value
  const basePopulation = 750000
  const urbanImpact = regionalImpact.value.urban
  const ruralImpact = regionalImpact.value.rural
  
  return {
    // Regional breakdown with more conservative calculations
    urban: {
      population: Math.round(basePopulation * 0.6),
      studentsEquipped: Math.round(urbanImpact * basePopulation * 0.6 * 0.18), // Reduced from 0.35
      digitalDivideReduction: calculateDigitalDivideReduction(urbanImpact),
      engagementTime: calculateEngagementTime(urbanImpact)
    },
    rural: {
      population: Math.round(basePopulation * 0.4),
      studentsEquipped: Math.round(ruralImpact * basePopulation * 0.4 * 0.12), // Reduced from 0.25
      digitalDivideReduction: calculateDigitalDivideReduction(ruralImpact),
      engagementTime: calculateEngagementTime(ruralImpact)
    },
    // Socioeconomic impact with more conservative equity adjustments
    socioeconomic: {
      lowIncome: Math.round(impact * basePopulation * 0.3 * 0.25), // Reduced from 0.45
      middleIncome: Math.round(impact * basePopulation * 0.5 * 0.18), // Reduced from 0.30
      highIncome: Math.round(impact * basePopulation * 0.2 * 0.08) // Reduced from 0.15
    },
    // Educational outcomes with more conservative projections
    outcomes: {
      literacyImprovement: Math.round(impact * 25 * (1 + teacherIndex.value * 0.3)), // Reduced from 45
      mathImprovement: Math.round(impact * 20 * (1 + (budget.value / 5000) * 0.2)), // Reduced from 38
      scienceImprovement: Math.round(impact * 22 * (1 + (internetRate.value / 100) * 0.15)), // Reduced from 42
      criticalThinking: Math.round(impact * 18 * (1 + communitySupport.value * 0.25)) // Reduced from 35
    },
    // More conservative economic projections
    economic: {
      costPerStudent: Math.round(budget.value + (internetRate.value * 20) + (teacherIndex.value * 1200) + (communitySupport.value * 500)),
      roi5Years: Math.round(impact * 150 + (teacherIndex.value * 30)), // Reduced from 280
      jobReadiness: Math.round(impact * 35 + (teacherIndex.value * 8)), // Reduced from 65
      futureEarnings: Math.round(impact * 4500 + (budget.value * 0.8)) // Reduced from 8500
    },
    // Implementation metrics
    timeline: implementationTimeline.value,
    risks: riskAssessment.value,
    equity: equityImpact.value
  }
})

// Loading and animation state
const isLoading = ref(true)

onMounted(() => {
  console.log('Policy Simulator initialized')
  // Simulate brief loading for smooth transition
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

// Enhanced preset configurations
const setPreset = (preset) => {
  selectedScenario.value = preset
  
  switch (preset) {
    case 'low':
      budget.value = 600
      internetRate.value = 52
      teacherIndex.value = 0.15
      communitySupport.value = 0.1
      break
    case 'moderate':
      budget.value = 1800
      internetRate.value = 78
      teacherIndex.value = 0.55
      communitySupport.value = 0.45
      break
    case 'high':
      budget.value = 4200
      internetRate.value = 94
      teacherIndex.value = 0.85
      communitySupport.value = 0.78
      break
    case 'nordic':
      // Nordic countries model
      budget.value = 4800
      internetRate.value = 98
      teacherIndex.value = 0.92
      communitySupport.value = 0.88
      break
    case 'developing':
      // Developing regions model
      budget.value = 650
      internetRate.value = 58
      teacherIndex.value = 0.25
      communitySupport.value = 0.35
      break
    case 'crisis':
      // Crisis/emergency response model
      budget.value = 1200
      internetRate.value = 65
      teacherIndex.value = 0.4
      communitySupport.value = 0.6
      break
  }
}

// Advanced scenario comparison
const scenarioComparison = computed(() => {
  const scenarios = ['low', 'moderate', 'high', 'nordic', 'developing', 'crisis']
  return scenarios.map(scenario => {
    const inputs = getPresetInputs(scenario)
    const impact = computeImpact(inputs)
    return {
      name: scenario,
      impact: impact,
      divideReduction: calculateDigitalDivideReduction(impact),
      engagementTime: calculateEngagementTime(impact)
    }
  })
})

const getPresetInputs = (preset) => {
  switch (preset) {
    case 'low': return [600, 0.52, 0.15, 0.1]
    case 'moderate': return [1800, 0.78, 0.55, 0.45]
    case 'high': return [4200, 0.94, 0.85, 0.78]
    case 'nordic': return [4800, 0.98, 0.92, 0.88]
    case 'developing': return [650, 0.58, 0.25, 0.35]
    case 'crisis': return [1200, 0.65, 0.4, 0.6]
    default: return [2750, 0.75, 0.5, 0.5]
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p class="text-lg text-gray-600">Initializing Policy Simulator...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-show="!isLoading" class="animate-fade-in">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Power of Tech Policy Simulator</h1>
          <p class="mt-2 text-lg text-gray-600">
            Explore how technology policy decisions impact digital equity outcomes
          </p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Policy Levers Section -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900">Policy Levers</h2>
              <div class="flex flex-wrap gap-2">
                <button 
                  @click="setPreset('low')"
                  :class="{'bg-red-200 text-red-800': selectedScenario === 'low'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  Minimal
                </button>
                <button 
                  @click="setPreset('developing')"
                  :class="{'bg-orange-200 text-orange-800': selectedScenario === 'developing'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
                >
                  Developing
                </button>
                <button 
                  @click="setPreset('moderate')"
                  :class="{'bg-yellow-200 text-yellow-800': selectedScenario === 'moderate'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                >
                  Moderate
                </button>
                <button 
                  @click="setPreset('high')"
                  :class="{'bg-green-200 text-green-800': selectedScenario === 'high'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                >
                  Advanced
                </button>
                <button 
                  @click="setPreset('nordic')"
                  :class="{'bg-blue-200 text-blue-800': selectedScenario === 'nordic'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  Nordic Model
                </button>
                <button 
                  @click="setPreset('crisis')"
                  :class="{'bg-purple-200 text-purple-800': selectedScenario === 'crisis'}"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                >
                  Crisis Response
                </button>
              </div>
            </div>
            
            <!-- Sensitivity Analysis Toggle -->
            <div class="mb-4 flex justify-between items-center">
              <span class="text-sm text-gray-600">Current Scenario: {{ selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1) }}</span>
              <button 
                @click="showAdvancedMetrics = !showAdvancedMetrics"
                class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {{ showAdvancedMetrics ? 'Hide' : 'Show' }} Advanced Analytics
              </button>
            </div>
            
            <div class="space-y-6">
              
              <SliderControl
                v-model="budget"
                label="Per-student Budget"
                :min="500"
                :max="5000"
                :step="50"
                unit="€"
                description="Annual digital learning budget per student. Includes devices, software licenses, infrastructure maintenance, and educational content. Nordic countries typically allocate €4,000-€5,000 per student."
              />
              
              <SliderControl
                v-model="internetRate"
                label="Internet Access Rate"
                :min="50"
                :max="100"
                :step="1"
                unit="%"
                description="Percentage of students with reliable high-speed internet access at home. Includes both fixed broadband and mobile connectivity. Rural areas typically have 15-20% lower access rates."
              />
              
              <SliderControl
                v-model="teacherIndex"
                label="Teacher Training Index"
                :min="0"
                :max="1"
                :step="0.05"
                unit=""
                description="Composite measure of digital pedagogy training quality. Includes initial training, ongoing professional development, peer collaboration, and assessment of digital teaching competencies (0=none, 1=comprehensive)."
              />
              
              <SliderControl
                v-model="communitySupport"
                label="Community Support Level"
                :min="0"
                :max="1"
                :step="0.05"
                unit=""
                description="Level of community engagement including parental digital literacy, local tech support programs, public-private partnerships, and community learning centers (0=minimal, 1=extensive)."
              />
              
            </div>
            
            <!-- Sensitivity Analysis Panel -->
            <div v-if="showAdvancedMetrics" class="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 class="text-sm font-semibold text-gray-700 mb-3">Sensitivity Analysis (10% increase impact)</h3>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="flex justify-between">
                  <span>Budget:</span>
                  <span class="font-medium">{{ (sensitivityAnalysis.budget * 100).toFixed(2) }}%</span>
                </div>
                <div class="flex justify-between">
                  <span>Internet:</span>
                  <span class="font-medium">{{ (sensitivityAnalysis.internet * 100).toFixed(2) }}%</span>
                </div>
                <div class="flex justify-between">
                  <span>Teacher Training:</span>
                  <span class="font-medium">{{ (sensitivityAnalysis.teacher * 100).toFixed(2) }}%</span>
                </div>
                <div class="flex justify-between">
                  <span>Community:</span>
                  <span class="font-medium">{{ (sensitivityAnalysis.community * 100).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Results Section -->
          <div class="space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Projected Outcomes</h2>
              
              <ResultsDisplay
                :digital-divide-reduction="digitalDivideReduction"
                :engagement-time="engagementTime"
                :secondary-metrics="secondaryMetrics"
                :impact-score="impactScore"
              />
            </div>
            
            <!-- Detailed Regional Analysis -->
            <div v-if="showAdvancedMetrics" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Regional Impact Analysis</h3>
              <div class="grid md:grid-cols-2 gap-6">
                
                <!-- Urban Impact -->
                <div class="bg-blue-50 rounded-lg p-4">
                  <h4 class="font-medium text-blue-900 mb-3">Urban Areas</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span>Population:</span>
                      <span class="font-medium">{{ detailedMetrics.urban.population.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Students Equipped:</span>
                      <span class="font-medium">{{ detailedMetrics.urban.studentsEquipped.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Divide Reduction:</span>
                      <span class="font-medium">{{ detailedMetrics.urban.digitalDivideReduction.toFixed(1) }}%</span>
                    </div>
                  </div>
                </div>
                
                <!-- Rural Impact -->
                <div class="bg-green-50 rounded-lg p-4">
                  <h4 class="font-medium text-green-900 mb-3">Rural Areas</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span>Population:</span>
                      <span class="font-medium">{{ detailedMetrics.rural.population.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Students Equipped:</span>
                      <span class="font-medium">{{ detailedMetrics.rural.studentsEquipped.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Divide Reduction:</span>
                      <span class="font-medium">{{ detailedMetrics.rural.digitalDivideReduction.toFixed(1) }}%</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Engagement Time:</span>
                      <span class="font-medium">{{ detailedMetrics.rural.engagementTime.toFixed(1) }} hrs/week</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            <!-- World Map Visualization -->
            <div v-if="showAdvancedMetrics" class="bg-white rounded-xl shadow-lg p-6">
              <WorldMap 
                :current-impact="impactScore * 100"
                :policy-inputs="impactInputs"
              />
            </div>
            
            <!-- Economic Impact Analysis -->
            <div v-if="showAdvancedMetrics" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Economic Impact Projections</h3>
              <div class="grid md:grid-cols-3 gap-4">
                
                <div class="text-center bg-indigo-50 rounded-lg p-4">
                  <div class="text-2xl font-bold text-indigo-600">
                    €{{ detailedMetrics.economic.costPerStudent.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-600 mt-1">Cost per Student</div>
                </div>
                
                <div class="text-center bg-emerald-50 rounded-lg p-4">
                  <div class="text-2xl font-bold text-emerald-600">
                    {{ detailedMetrics.economic.roi5Years }}%
                  </div>
                  <div class="text-sm text-gray-600 mt-1">5-Year ROI</div>
                </div>
                
                <div class="text-center bg-amber-50 rounded-lg p-4">
                  <div class="text-2xl font-bold text-amber-600">
                    +€{{ detailedMetrics.economic.futureEarnings.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-600 mt-1">Future Annual Earnings</div>
                </div>
                
              </div>
              
              <!-- Educational Outcomes -->
              <div class="mt-6">
                <h4 class="font-medium text-gray-900 mb-3">Educational Outcome Improvements</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="text-center">
                    <div class="text-lg font-semibold text-blue-600">{{ detailedMetrics.outcomes.literacyImprovement }}%</div>
                    <div class="text-xs text-gray-600">Digital Literacy</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-semibold text-green-600">{{ detailedMetrics.outcomes.mathImprovement }}%</div>
                    <div class="text-xs text-gray-600">Math Skills</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-semibold text-purple-600">{{ detailedMetrics.outcomes.scienceImprovement }}%</div>
                    <div class="text-xs text-gray-600">Science Skills</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-semibold text-orange-600">{{ detailedMetrics.outcomes.criticalThinking }}%</div>
                    <div class="text-xs text-gray-600">Critical Thinking</div>
                  </div>
                </div>
              </div>
              
              <!-- Socioeconomic Impact -->
              <div class="mt-6">
                <h4 class="font-medium text-gray-900 mb-3">Socioeconomic Impact Distribution</h4>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Low Income Families</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full" :style="{width: `${(detailedMetrics.socioeconomic.lowIncome / detailedMetrics.urban.population * 100)}%`}"></div>
                      </div>
                      <span class="text-sm font-medium">{{ detailedMetrics.socioeconomic.lowIncome.toLocaleString() }}</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Middle Income Families</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full" :style="{width: `${(detailedMetrics.socioeconomic.middleIncome / detailedMetrics.urban.population * 100)}%`}"></div>
                      </div>
                      <span class="text-sm font-medium">{{ detailedMetrics.socioeconomic.middleIncome.toLocaleString() }}</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">High Income Families</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" :style="{width: `${(detailedMetrics.socioeconomic.highIncome / detailedMetrics.urban.population * 100)}%`}"></div>
                      </div>
                      <span class="text-sm font-medium">{{ detailedMetrics.socioeconomic.highIncome.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scenario Comparison Panel -->
        <div v-if="showAdvancedMetrics" class="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Scenario Comparison</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2">Scenario</th>
                  <th class="text-right py-2">Impact Score</th>
                  <th class="text-right py-2">Divide Reduction</th>
                  <th class="text-right py-2">Engagement Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="scenario in scenarioComparison" :key="scenario.name" class="border-b hover:bg-gray-50">
                  <td class="py-2 font-medium capitalize">{{ scenario.name }}</td>
                  <td class="text-right py-2">{{ (scenario.impact * 100).toFixed(1) }}%</td>
                  <td class="text-right py-2">{{ scenario.divideReduction.toFixed(1) }}%</td>
                  <td class="text-right py-2">{{ scenario.engagementTime.toFixed(1) }} hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Change History Panel -->
        <div v-if="showAdvancedMetrics && changeHistory.length > 0" class="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Changes</h3>
          <div class="space-y-2">
            <div v-for="change in changeHistory.slice(-5)" :key="change.timestamp" 
                 class="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
              <span>{{ change.timestamp }}</span>
              <span class="font-medium">{{ (change.impact * 100).toFixed(1) }}% impact</span>
              <span class="text-xs text-gray-500 capitalize">{{ change.scenario }}</span>
            </div>
          </div>
        </div>

        <!-- Methodology Link -->
        <div class="mt-8 text-center">
          <a 
            href="/methodology.html" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Methodology
          </a>
        </div>
        
        <!-- Information Panel -->
        <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
          
          <!-- Dynamic Insights -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Current Configuration Analysis</h4>
              <div class="space-y-2 text-sm text-gray-700">
                <div v-if="impactScore > 0.8" class="flex items-start space-x-2">
                  <span class="text-green-500 mt-0.5">✓</span>
                  <span>Excellent configuration with high impact potential across all demographics.</span>
                </div>
                <div v-else-if="impactScore > 0.6" class="flex items-start space-x-2">
                  <span class="text-yellow-500 mt-0.5">⚠</span>
                  <span>Good configuration, but consider increasing the lowest-performing lever for maximum impact.</span>
                </div>
                <div v-else-if="impactScore > 0.4" class="flex items-start space-x-2">
                  <span class="text-orange-500 mt-0.5">!</span>
                  <span>Moderate impact. Focus on teacher training and community engagement for better outcomes.</span>
                </div>
                <div v-else class="flex items-start space-x-2">
                  <span class="text-red-500 mt-0.5">⚠</span>
                  <span>Low impact configuration. Significant increases needed across multiple areas.</span>
                </div>
                
                <div class="mt-3 p-3 bg-blue-50 rounded-lg">
                  <strong>Optimization Tip:</strong> 
                  <span v-if="sensitivityAnalysis.teacher > sensitivityAnalysis.budget">
                    Teacher training shows the highest sensitivity - small improvements here yield significant results.
                  </span>
                  <span v-else-if="sensitivityAnalysis.budget > sensitivityAnalysis.internet">
                    Budget allocation is your most impactful lever - consider reallocating resources here.
                  </span>
                  <span v-else>
                    Internet access improvements offer the best return on investment for your current configuration.
                  </span>
                </div>
              </div>
            </div>
               <div>
            <h4 class="font-medium text-gray-900 mb-3">Implementation Recommendations</h4>
            <div class="space-y-2 text-sm text-gray-700">
              <div v-if="detailedMetrics.risks.funding.level === 'high'" class="flex items-start space-x-2">
                <span class="text-red-500 mt-0.5">⚠</span>
                <span>{{ detailedMetrics.risks.funding.mitigation }}</span>
              </div>
              <div v-if="detailedMetrics.risks.technical.level === 'high'" class="flex items-start space-x-2">
                <span class="text-orange-500 mt-0.5">!</span>
                <span>{{ detailedMetrics.risks.technical.mitigation }}</span>
              </div>
              <div v-if="detailedMetrics.risks.capacity.level === 'high'" class="flex items-start space-x-2">
                <span class="text-yellow-500 mt-0.5">⚠</span>
                <span>{{ detailedMetrics.risks.capacity.mitigation }}</span>
              </div>
              <div v-if="detailedMetrics.risks.adoption.level === 'high'" class="flex items-start space-x-2">
                <span class="text-blue-500 mt-0.5">ℹ</span>
                <span>{{ detailedMetrics.risks.adoption.mitigation }}</span>
              </div>
              
              <!-- Overall risk assessment -->
              <div class="mt-3 p-3 rounded-lg" :class="{
                'bg-red-50': Object.values(detailedMetrics.risks).filter(r => r.level === 'high').length > 2,
                'bg-yellow-50': Object.values(detailedMetrics.risks).filter(r => r.level === 'high').length > 0,
                'bg-green-50': Object.values(detailedMetrics.risks).filter(r => r.level === 'high').length === 0
              }">
                <strong>Overall Risk Level:</strong>
                <span v-if="Object.values(detailedMetrics.risks).filter(r => r.level === 'high').length > 2">
                  High - Multiple critical risks identified. Consider phased approach.
                </span>
                <span v-else-if="Object.values(detailedMetrics.risks).filter(r => r.level === 'high').length > 0">
                  Medium - Some risks present. Implement targeted mitigation strategies.
                </span>
                <span v-else>
                  Low - Configuration shows good balance across all risk factors.
                </span>
              </div>
            </div>
          </div>
          </div>
             <!-- Impact Timeline -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-3">Expected Impact Timeline</h4>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="text-center">
              <div class="text-lg font-semibold text-blue-600">{{ detailedMetrics.timeline.phase1.duration }} months</div>
              <div class="text-gray-600">{{ detailedMetrics.timeline.phase1.name }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ Math.round(impactScore * 15) }}% of projected impact</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-green-600">{{ detailedMetrics.timeline.phase2.duration }} months</div>
              <div class="text-gray-600">{{ detailedMetrics.timeline.phase2.name }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ Math.round(impactScore * 65) }}% of projected impact</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-purple-600">{{ detailedMetrics.timeline.phase3.duration }} months</div>
              <div class="text-gray-600">{{ detailedMetrics.timeline.phase3.name }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ Math.round(impactScore * 100) }}% of projected impact</div>
            </div>
          </div>
          <div class="mt-4 text-center">
            <div class="text-sm font-medium text-gray-700">
              Total Implementation Time: <span class="text-indigo-600">{{ detailedMetrics.timeline.totalDuration }} months</span>
            </div>
          </div>
        </div>
        </div>
        
        <!-- Quick Statistics Summary -->
        <div class="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 class="text-lg font-semibold mb-4">Policy Configuration Summary</h3>
          <div class="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold">{{ Math.round(impactScore * 100) }}%</div>
              <div class="text-sm opacity-90">Overall Impact Score</div>
            </div>
            <div>
              <div class="text-2xl font-bold">{{ Math.round(digitalDivideReduction) }}%</div>
              <div class="text-sm opacity-90">Digital Divide Reduction</div>
            </div>
            <div>
              <div class="text-2xl font-bold">{{ detailedMetrics.economic.costPerStudent.toLocaleString() }}</div>
              <div class="text-sm opacity-90">Cost per Student (€)</div>
            </div>
            <div>
              <div class="text-2xl font-bold">{{ Math.round(detailedMetrics.economic.roi5Years) }}%</div>
              <div class="text-sm opacity-90">5-Year ROI</div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Footer -->
      <footer class="bg-gray-50 border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Educational Tool</h4>
              <p>Designed for policy exploration and educational purposes. Results are based on mathematical modeling and should be interpreted accordingly.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Technology</h4>
              <p>Built with Vue.js, Vite, Tailwind CSS, and Math.js. Open source and available for educational use.</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Model Info</h4>
              <p>Uses logistic regression with coefficients based on education technology research and expert assumptions.</p>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-300 text-center text-gray-500">
            <p>&copy; 2025 Power of Tech Policy Simulator. Educational tool for policy analysis.</p>
          </div>
        </div>
      </footer>
      
    </div> <!-- End of main content div -->
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
