<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Power of Tech Policy Simulator - Copilot Instructions

This is a Vue.js project for creating an interactive policy simulator that demonstrates the impact of technology policy decisions on digital equity outcomes.

## Project Context

- **Technology Stack**: Vue.js 3, Vite, TailwindCSS, Math.js
- **Purpose**: Interactive policy simulator with real-time calculations
- **Target**: 15-20 hour development timeline

## Key Components

1. **Policy Levers (Sliders)**: 4 input controls for policy variables

   - Per-student Budget (€500-€5,000)
   - Internet Access Rate (50-100%)
   - Teacher Training Index (0-1)
   - Community Support Level (0-1)

2. **Mathematical Model**: Logistic regression using Math.js

   - Formula: Impact = 1/(1 + e^-(αx₁ + βx₂ + γx₃ + δx₄ + c))
   - Coefficients: α=0.003, β=0.05, γ=1.2, δ=0.8, c=-2

3. **Outcomes Display**: Real-time visual feedback
   - Digital Divide Reduction (%)
   - Average Engagement Time (hrs/week)

## Development Guidelines

- Use Vue 3 Composition API for component logic
- Implement reactive data binding for real-time updates
- Create reusable SliderControl component
- Use computed properties for efficient recalculation
- Ensure mobile-responsive design with Tailwind CSS
- Add accessibility features (aria-labels, proper contrast)
- Include tooltips and explanatory content

## File Structure

- `/src/components/` - Vue components (SliderControl, ResultsDisplay, etc.)
- `/src/utils/model.js` - Mathematical model and calculations
- `/src/assets/` - Static assets and styling
- `/methodology.html` - Standalone methodology page
