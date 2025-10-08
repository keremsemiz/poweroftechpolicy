# Power of Tech Policy Simulator

An interactive web application that demonstrates the impact of technology policy decisions on digital equity outcomes in education.

## 🎯 Overview

This simulator allows policymakers, educators, and researchers to explore how different policy interventions affect digital equity in education. Users can adjust four key policy levers and see real-time projections of their combined impact on reducing digital divides.

## 🚀 Features

- **Interactive Policy Levers**: 4 adjustable sliders for key policy variables

  - Per-student Budget (€500-€5,000)
  - Internet Access Rate (50-100%)
  - Teacher Training Index (0-1)
  - Community Support Level (0-1)

- **Real-time Calculations**: Mathematical model using logistic regression
- **Visual Results**: Dynamic charts and progress indicators
- **Contextual Explanations**: Tooltips and interpretation panels
- **Mobile Responsive**: Works seamlessly on all devices
- **Accessibility**: WCAG 2.1 compliant design

## 🔬 Mathematical Model

The simulator uses a logistic regression model:

```
Impact = 1 / (1 + e^-(αx₁ + βx₂ + γx₃ + δx₄ + c))
```

Where:

- x₁ = Per-student Budget (α = 0.003)
- x₂ = Internet Access Rate (β = 0.05)
- x₃ = Teacher Training Index (γ = 1.2)
- x₄ = Community Support Level (δ = 0.8)
- c = Intercept (-2)

## 🛠 Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Mathematics**: Math.js
- **Deployment**: Static hosting ready

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd poweroftechpolicy

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Usage

1. **Adjust Policy Levers**: Use the sliders in the left panel to set policy parameters
2. **View Results**: See real-time impact calculations in the right panel
3. **Explore Interpretations**: Read dynamic explanations based on your settings
4. **Learn More**: Visit the methodology page for detailed information

## 📊 Output Metrics

- **Digital Divide Reduction (%)**: Primary impact measurement
- **Average Engagement Time**: Weekly hours of digital learning engagement
- **Secondary Metrics**: Students equipped, schools improved, teachers trained

## 📚 Methodology

For detailed information about the mathematical model, data sources, and assumptions, visit the [Methodology page](./public/methodology.html).

## 🎯 Development Timeline

This project was designed to be completed in 15-20 hours:

- **Phase 0**: Project Setup (1 hour)
- **Phase 1**: Slider UI & Events (4 hours)
- **Phase 2**: Model & Results Display (8 hours)
- **Phase 3**: Polish & Explanations (6 hours)
- **Phase 4**: Documentation & Deployment (2 hours)

## 🤝 Contributing

This is an educational tool designed for policy exploration. Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## ⚠️ Limitations

- Model coefficients are based on literature review and expert assumptions
- Does not account for regional variations or interaction effects
- Designed for educational and exploratory purposes
- Real-world validation data not incorporated

## 📄 License

[MIT License](LICENSE) - Feel free to use this tool for educational and research purposes.

## 🔗 Links

- [Live Demo](https://poweroftechpolicy.netlify.app) _(coming soon)_
- [Methodology](./public/methodology.html)
- [Vue.js Documentation](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
