import { motion } from 'framer-motion'
import {
  Wifi,
  MapPin,
  Cloud,
  Smartphone,
  Cpu,
  Radio,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import IoTHeroBackground from './IoTHeroBackground'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SOLUTIONS = [
  {
    icon: MapPin,
    title: 'GPS & Asset Tracking',
    description:
      'GNSS-based trackers for vehicles, assets, and logistics. Low-power firmware, geofencing, and real-time or batch reporting to your backend or cloud.',
  },
  {
    icon: Radio,
    title: 'BLE, Wi-Fi & Cellular Connectivity',
    description:
      'Bluetooth Low Energy beacons, Wi-Fi gateways, and LTE-M/NB-IoT modules. We design hardware and firmware for reliable connectivity from edge to cloud.',
  },
  {
    icon: Cloud,
    title: 'Cloud Integration & Dashboards',
    description:
      'REST/MQTT integration with AWS, Azure, or your platform. Device provisioning, OTA updates, and web or mobile dashboards for monitoring and control.',
  },
  {
    icon: Cpu,
    title: 'Low-Power & Battery-Optimized Design',
    description:
      'Sleep modes, wake-on-event, and power-efficient firmware so battery-operated devices last months or years in the field.',
  },
  {
    icon: Smartphone,
    title: 'Companion Apps & Fleet Management',
    description:
      'Mobile apps for device setup, configuration, and fleet visibility. Cross-platform and IoT-backend integration when you need a full solution.',
  },
]

const TECH_STACK = [
  'BLE / Bluetooth 5',
  'Wi-Fi / LTE-M / NB-IoT',
  'MQTT / REST',
  'FreeRTOS',
  'STM32 / ESP32 / Nordic',
  'OTA Updates',
  'AWS / Azure',
  'GPS / GNSS',
]

const WHY_US = [
  'End-to-end IoT: hardware, firmware, cloud connectivity, and optional apps',
  'Proven low-power and connectivity design for battery-operated devices',
  'From prototype to volume — scalable architecture and production support',
  'Agile delivery with clear milestones and documentation for integration',
]

const HERO_IMAGE = '/images/hero/embedded-technology.png'

export default function IoTVertical() {
  return (
    <>
      {/* Hero — edge→cloud canvas (ripples, links, uplink); IIoT label matches vertical */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden bg-[#060a12]">
        <IoTHeroBackground />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#060a12] via-[#060a12]/78 to-[#060a12]/28 pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative z-10 w-full pb-12 md:pb-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium">
              <Wifi size={16} /> IIoT
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-3xl mb-4 leading-tight"
          >
            Connected Devices from Edge to Cloud
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl"
          >
            Industrial IoT: GPS tracking, asset monitoring, BLE and cellular connectivity, and
            cloud-integrated solutions — from prototype to deployment at scale.
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
                Why IIoT at StuffBits
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                IoT products need reliable hardware, efficient firmware, and seamless cloud
                connectivity. We deliver full-stack IoT solutions — GPS and asset trackers, BLE and
                cellular devices, low-power sensor nodes, and integration with AWS, Azure, or your
                own backend.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a fleet tracker, a smart sensor product, or a connected gateway,
                we work from concept through production — with OTA updates, dashboards, and
                optional companion apps so your solution is complete and scalable.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-navy-gradient shadow-xl border border-slate-200">
                <img
                  src={HERO_IMAGE}
                  alt="IoT embedded development"
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
              What We Deliver for IoT
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end capabilities for connected devices, tracking, and cloud integration.
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
              Technologies & Platforms
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              We work with the connectivity and cloud stack that IoT products need.
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
              Why IoT Teams Work With Us
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
              Ready to Build Your Next IoT Product?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From trackers to sensor nodes and cloud dashboards — let's discuss your requirements.
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
