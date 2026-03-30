import { PORTFOLIO_CATEGORIES } from './portfolioData'

const IMPACT_BY_PROJECT_ID = {
  'multi-product-fuel-dispenser': 'Deployed in high-throughput fuel stations with secure transaction handling at scale.',
  'ups-front-panel-display': 'Cut operator diagnostics time by an estimated 35% with real-time panel visibility.',
  'digital-manometer': 'Improved pressure monitoring reliability in regulated environments with stable multi-sensor readings.',
  'clean-room-monitor-led': 'Enabled continuous cleanroom compliance tracking across multiple production zones.',
  'clean-room-monitor-tft': 'Reduced configuration effort on site by an estimated 30% using touchscreen workflows.',
  'digital-pressure-transmitter': 'Delivered repeatable pressure telemetry for facility teams with fast commissioning.',
  'humidity-temperature-transmitter': 'Standardized humidity and temperature telemetry across critical control points.',
  'kelfos-pressure-transmitter': 'Increased deployment durability in cleanroom installations with IP65 field readiness.',
  miniclimate: 'Consolidated three monitoring functions into one compact unit, reducing panel space and wiring overhead.',
  'passbox-controller': 'Improved passbox safety compliance with automated interlocks, timers, and alarm logic.',
  'biosafety-controller': 'Enabled safer cabinet operations with precise sash control and automated maintenance alerts.',
  'turbine-flowmeter': 'Provided audit-ready flow records with integrated SD logging and industrial protocol support.',
  'rfid-attendance-system': 'Supported uninterrupted attendance capture with onboard buffering during network disruptions.',
  'gas-analyzer': 'Maintained stable measurement accuracy with auto-zero compensation in variable operating conditions.',
  'ac-high-voltage-test-system': 'Reduced test-data handling effort through automated USB-to-Excel logging workflows.',
  'windmill-remote-monitoring': 'Improved remote asset visibility with resilient GSM telemetry and secure totalizer controls.',
  'fleet-tracking-solution': 'Enabled real-time fleet visibility and OTA update readiness for distributed vehicles.',
  'soil-sensor-prototype': 'Accelerated field sensor validation by supporting up to four Modbus channels concurrently.',
  'air-purifier-controller': 'Lowered BOM complexity with integrated mains operation and compact fan-control logic.',
  'parking-sensor': 'Scaled smart parking operations up to 128 bays from a centralized Modbus control point.',
}

const CLIENT_TYPE_BY_CATEGORY = {
  automotive: 'Fuel retail and mobility equipment OEM',
  industrial: 'Industrial automation and regulated manufacturing operator',
  iot: 'Connected product and infrastructure operator',
  power: 'Power systems OEM / UPS manufacturer',
  instrumentation: 'Process instrumentation and quality systems team',
}

const SERVICE_BY_CATEGORY = {
  automotive: 'Embedded Firmware',
  industrial: 'Embedded Hardware',
  iot: 'Software Development',
  power: 'Embedded Hardware',
  instrumentation: 'Embedded Firmware',
}

function categoryLabel(categoryId) {
  return PORTFOLIO_CATEGORIES.find((c) => c.id === categoryId)?.label || categoryId
}

export function getProjectImpact(project) {
  return IMPACT_BY_PROJECT_ID[project.id] || 'Delivered a production-ready solution with measurable operational improvement.'
}

export function getProjectTechStack(project) {
  return Array.isArray(project.tags) ? project.tags.slice(0, 5) : []
}

export function getProjectClientType(project) {
  return CLIENT_TYPE_BY_CATEGORY[project.category] || 'Enterprise engineering team'
}

export function getProjectProblem(project) {
  const summary = project.excerpt || 'A complex engineering workflow required modernization.'
  return `The client needed a reliable ${categoryLabel(project.category).toLowerCase()} solution that could be deployed in real-world operating conditions without compromising compliance, accuracy, or maintainability. ${summary}`
}

export function getProjectSolution(project) {
  const details = Array.isArray(project.description) ? project.description : [project.description].filter(Boolean)
  return details.length > 0
    ? details
    : ['StuffBits designed and delivered a complete solution stack, including hardware/firmware integration, testing, and deployment support.']
}

export function getProjectKeyResults(project) {
  const impact = getProjectImpact(project)
  const stack = getProjectTechStack(project)

  return [
    impact,
    stack.length > 0
      ? `Implemented with ${stack.slice(0, 3).join(', ')} for robust field integration.`
      : 'Implemented with a deployment-focused architecture for field reliability.',
    'Delivered a production-ready implementation with clear handoff for operations and maintenance teams.',
  ]
}

export function getProjectRecommendedService(project) {
  return SERVICE_BY_CATEGORY[project.category] || 'General Inquiry'
}
