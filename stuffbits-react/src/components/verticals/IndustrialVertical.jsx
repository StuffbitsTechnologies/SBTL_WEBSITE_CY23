import { motion } from 'framer-motion'
import {
  Factory,
  Cpu,
  Gauge,
  Network,
  Shield,
  Settings,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import IndustrialHeroBackground from './IndustrialHeroBackground'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SOLUTIONS = [
  {
    icon: Gauge,
    title: 'Process Measurement & Instrumentation',
    description:
      'Embedded systems for sensors, transmitters, and data acquisition — pressure, temperature, flow, level, and analytical instruments with analog and digital interfaces.',
  },
  {
    icon: Cpu,
    title: 'Industrial Control & PLC Integration',
    description:
      'Custom controllers, I/O modules, and firmware for process control, sequencing, and integration with PLCs, SCADA, and DCS systems.',
  },
  {
    icon: Network,
    title: 'Industrial IoT & Industry 4.0',
    description:
      'Edge gateways, machine connectivity, predictive maintenance, and cloud dashboards for smart manufacturing and digital twins.',
  },
  {
    icon: Shield,
    title: 'Rugged & Harsh Environment Design',
    description:
      'Hardware and firmware designed for wide temperature ranges, EMI/EMC compliance, and reliability in demanding industrial settings.',
  },
  {
    icon: Settings,
    title: 'Calibration & Configuration Tools',
    description:
      'Industrial protocol tools for calibration, configuration, and remote diagnostics of industrial devices.',
  },
]

const TECH_STACK = [
  'CAN',
  'CAN FD',
  '4–20 mA',
  'FreeRTOS',
  'STM32 / NXP',
  'Industrial Ethernet',
  'MISRA-C',
  'IEC 61508',
]

const WHY_US = [
  'Experience with process instrumentation and industrial communication protocols',
  'Rugged hardware design for harsh environments and long product life',
  'Full stack: hardware, firmware, and PC-based configuration tools',
  'Agile delivery with documentation suited to compliance and handover',
]

const HERO_IMAGE = '/images/hero/embedded-technology.png'

export default function IndustrialVertical() {
  return (
    <>
      {/* Hero — instrumentation-style canvas (waves/grid); copy unchanged */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden bg-[#0a0d11]">
        <IndustrialHeroBackground />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0a0d11] via-[#0a0d11]/78 to-[#0a0d11]/32 pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative z-10 w-full pb-12 md:pb-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium">
              <Factory size={16} /> Industrial
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-3xl mb-4 leading-tight"
          >
            Embedded Systems for Industrial & Smart Manufacturing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl"
          >
            Process measurement, instrumentation, industrial control, and Industry 4.0 connectivity —
            we deliver rugged hardware and firmware for demanding industrial environments.
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
                Why Industrial at StuffBits
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Industrial applications demand reliability, long life cycles, and compatibility with
                existing protocols and ecosystems. We design embedded systems for process
                measurement, instrumentation, and smart manufacturing — from sensor interfaces
                and control logic to industrial protocols tools and cloud-ready gateways.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a new instrument platform, an industrial IoT gateway, or
                calibration and configuration software, we work with you from concept through
                production — with attention to EMI/EMC, environmental ratings, and compliance.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-navy-gradient shadow-xl border border-slate-200">
                <img
                  src={HERO_IMAGE}
                  alt="Industrial embedded development"
                  className="w-full h-full object-cover"
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
              What We Deliver for Industrial
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end embedded capabilities for instrumentation, control, and Industry 4.0.
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
      <section className="py-16 md:py-20 bg-navy-gradient">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Technologies & Standards
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              We work with the protocols and standards that industrial projects require.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
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
              Why Industrial Teams Work With Us
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
            className="relative overflow-hidden rounded-2xl bg-navy-gradient px-8 py-12 md:px-14 md:py-14 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Ready to Build Your Next Industrial System?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From instrumentation to industrial IoT and control — let's discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/services/embedded-hardware"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                Embedded Hardware
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
