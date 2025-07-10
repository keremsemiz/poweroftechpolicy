import { exp, add, multiply } from "mathjs";

/**
 * @param {Array} inputs 
 * @returns {number} 
 */
export function computeImpact(inputs) {
  const [x1, x2, x3, x4] = inputs;

  const alpha = 0.0008;
  const beta = 0.015; 
  const gamma = 0.6;
  const delta = 0.35;
  const c = -4.2; 

  const linear = add(
    multiply(alpha, x1),
    multiply(beta, x2),
    multiply(gamma, x3),
    multiply(delta, x4),
    c
  );

  const rawImpact = 1 / (1 + exp(-linear));
  return Math.min(rawImpact * 0.6, 0.6); 
}

/**
 * @param {number} impactScore
 * @returns {number} 
 */
export function calculateDigitalDivideReduction(impactScore) {
  return impactScore * 100;
}

/**
 * @param {number} impactScore
 * @returns {number}
 */
export function calculateEngagementTime(impactScore) {
  return impactScore * 5 + 1;
}

/**
 * @param {number} impactScore 
 * @returns {Object}
 */
export function calculateSecondaryMetrics(impactScore) {
  const basePopulation = 750000; 
  const studentsEquipped = Math.round(impactScore * basePopulation * 0.08); 
  const schoolsImproved = Math.round(impactScore * 800);
  const teachersTrained = Math.round(impactScore * 4500);

  return {
    studentsEquipped,
    schoolsImproved,
    teachersTrained,
  };
}

/**
 * @param {Array} inputs
 * @param {Object} options
 * @returns {number}
 */
export function computeEnhancedImpact(inputs, options = {}) {
  const [x1, x2, x3, x4] = inputs;

  const alpha = 0.003;
  const beta = 0.05;
  const gamma = 1.2;
  const delta = 0.8;
  const c = -2;

  const regionalMultiplier = options.isRural ? 0.85 : 1.0;
  const socioeconomicMultiplier = options.socioeconomicLevel || 1.0;

  const linear = add(
    multiply(alpha * regionalMultiplier, x1),
    multiply(beta * regionalMultiplier, x2),
    multiply(gamma, x3),
    multiply(delta * socioeconomicMultiplier, x4),
    c
  );

  const baseImpact = 1 / (1 + exp(-linear));

  const diminishingReturns =
    options.applyDiminishingReturns !== false
      ? Math.pow(baseImpact, 0.95)
      : baseImpact;

  return Math.min(diminishingReturns, 0.99); 
}

/**
 * @param {Array} inputs
 * @returns {Object} 
 */
export function calculateImplementationTimeline(inputs) {
  const [budget, internet, training, community] = inputs;

  const infrastructureTime = Math.max(6, 24 - budget / 200);
  const trainingTime = Math.max(3, 18 - training * 15);
  const rolloutTime = Math.max(2, 12 - community * 10);

  return {
    phase1: {
      name: "Infrastructure & Planning",
      duration: Math.round(infrastructureTime),
      activities: ["Hardware procurement", "Network setup", "Policy framework"],
    },
    phase2: {
      name: "Teacher Training & Capacity Building",
      duration: Math.round(trainingTime),
      activities: [
        "Professional development",
        "Curriculum integration",
        "Peer support networks",
      ],
    },
    phase3: {
      name: "Community Engagement & Rollout",
      duration: Math.round(rolloutTime),
      activities: ["Parent education", "Student onboarding", "Support systems"],
    },
    totalDuration: Math.round(infrastructureTime + trainingTime + rolloutTime),
  };
}

/**
 * @param {Array} inputs
 * @returns {Object}
 */
export function calculateRiskAssessment(inputs) {
  const [budget, internet, training, community] = inputs;

  const risks = {
    funding: {
      level: budget < 1500 ? "high" : budget < 3000 ? "medium" : "low",
      probability: Math.max(0.1, 0.8 - budget / 5000),
      impact: "High - Could delay or cancel implementation",
      mitigation: "Secure multiple funding sources, phase implementation",
    },
    technical: {
      level: internet < 70 ? "high" : internet < 85 ? "medium" : "low",
      probability: Math.max(0.15, 0.9 - internet / 100),
      impact: "Medium - May reduce effectiveness",
      mitigation: "Invest in mobile solutions, partner with ISPs",
    },
    capacity: {
      level: training < 0.4 ? "high" : training < 0.7 ? "medium" : "low",
      probability: Math.max(0.2, 1.0 - training),
      impact: "High - Poor adoption and outcomes",
      mitigation: "Comprehensive training programs, ongoing support",
    },
    adoption: {
      level: community < 0.3 ? "high" : community < 0.6 ? "medium" : "low",
      probability: Math.max(0.25, 1.0 - community),
      impact: "Medium - Slower rollout and engagement",
      mitigation: "Community champions, parent education programs",
    },
  };

  return risks;
}

/**
 * @param {number} impactScore
 * @returns {Object}
 */
export function calculateEquityImpact(impactScore) {
  return {
    gender: {
      male: impactScore * 0.98,
      female: impactScore * 1.02,
      nonBinary: impactScore * 0.95,
    },
    disability: {
      withDisability: impactScore * 0.85,
      withoutDisability: impactScore * 1.0,
    },
    language: {
      nativeSpeakers: impactScore * 1.0,
      esl: impactScore * 0.78,
      multilingual: impactScore * 1.05,
    },
    geographic: {
      urban: impactScore * 1.1,
      suburban: impactScore * 1.0,
      rural: impactScore * 0.75,
      remote: impactScore * 0.55,
    },
  };
}
