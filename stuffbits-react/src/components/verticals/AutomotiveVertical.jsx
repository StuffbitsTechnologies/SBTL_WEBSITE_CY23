import { motion } from 'framer-motion'
import {
  Car,
  Cpu,
  Shield,
  Zap,
  Gauge,
  Radio,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AutomotiveHeroBackground from './AutomotiveHeroBackground'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SOLUTIONS = [
  {
    icon: Cpu,
    title: 'ECU Development',
    description:
      'Electronic Control Unit design and integration for engine management, body control, and chassis systems. From requirements to production-ready hardware and firmware.',
  },
  {
    icon: Shield,
    title: 'AUTOSAR & Safety',
    description:
      'AUTOSAR Classic and Adaptive implementations, MISRA-C compliant code, and ISO 26262-aware development for safety-critical automotive software.',
  },
  {
    icon: Zap,
    title: 'EV & Powertrain Electronics',
    description:
      'Battery management systems (BMS), motor control interfaces, charging systems, and power electronics for electric and hybrid vehicles.',
  },
  {
    icon: Gauge,
    title: 'Instrumentation & Diagnostics',
    description:
      'Dashboard clusters, OBD-II / UDS diagnostics, calibration tools, and test rig interfaces for validation and aftermarket support.',
  },
  {
    icon: Radio,
    title: 'Connected Vehicle & V2X',
    description:
      'Telematics, fleet connectivity, vehicle-to-everything (V2X) modules, and cloud-integrated dashboards for modern connected vehicles.',
  },
]

const TECH_STACK = [
  'AUTOSAR Classic / Adaptive',
  'CAN / CAN FD / LIN',
  'MISRA-C',
  'ISO 26262',
  'FreeRTOS',
  'STM32 / NXP',
  'UDS / OBD-II',
  'BMS / EV',
]

const WHY_US = [
  'Experience with OEM and Tier-1 requirements and delivery cycles',
  'MISRA-C and safety-critical development practices',
  'Full stack: hardware, firmware, PCB, and validation support',
  'Agile delivery with clear milestones and documentation',
]

export default function AutomotiveVertical() {
  return (
    <>
      {/* Hero — circuit mesh canvas background; copy unchanged */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden bg-[#050c14]">
        <AutomotiveHeroBackground />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#050c14] via-[#050c14]/80 to-[#050c14]/35 pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative z-10 w-full pb-12 md:pb-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium">
              <Car size={16} /> Automotive
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-3xl mb-4 leading-tight"
          >
            Embedded Solutions for the Future of Mobility
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl"
          >
            From ECUs and AUTOSAR to EV electronics and connected vehicle systems — we deliver
            hardware, firmware, and validation for automotive OEMs and Tier-1 suppliers.
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                Why Automotive at StuffBits
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The automotive industry demands reliability, safety, and compliance. We combine
                embedded hardware design, real-time firmware (including AUTOSAR), and rigorous
                validation to deliver ECUs, instrumentation, and connected vehicle solutions that
                meet OEM and Tier-1 standards.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a new ECU platform, EV/BMS electronics, diagnostics and calibration
                tools, or telematics and V2X modules, we work as an extension of your team — from
                concept and prototype to production support.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-navy shadow-xl border border-slate-200">
                <img
                  src="/assets/blog/automotive-software-vr.png"
                  alt="Automotive diagnostics and embedded software in a modern workshop"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions / Capabilities */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
              What We Deliver for Automotive
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end embedded capabilities for on-road, off-road, and electric vehicle applications.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="text-gold" size={24} />
                  </div>
                  <h4 className="font-heading font-semibold text-navy mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Technologies & Standards
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              We work with the tools and standards that automotive projects require.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {TECH_STACK.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-slate-200 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose StuffBits */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h3 className="text-2xl font-heading font-bold text-navy mb-6">
              Why Automotive Teams Work With Us
            </h3>
            <ul className="space-y-4">
              {WHY_US.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-navy px-8 py-12 md:px-14 md:py-14 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Ready to Build Your Next Automotive System?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From ECU development to EV electronics and connected vehicle solutions — let's discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/services/embedded-firmware"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                Embedded Firmware
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
