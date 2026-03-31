import { motion } from 'framer-motion'
import { Code, CheckCircle2, Shield } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
}

const CAPABILITIES = [
  {
    title: 'Bare-metal and RTOS-based firmware',
    desc: 'We write low-level code that runs directly on the MCU — either bare-metal (no OS) or using FreeRTOS, Zephyr, or other real-time operating systems for task scheduling and concurrency.',
  },
  {
    title: 'AUTOSAR for automotive',
    desc: 'For automotive projects, we implement AUTOSAR Classic and Adaptive stacks — enabling compliance with OEM requirements and standardized software architecture for ECUs.',
  },
  {
    title: 'MISRA-C and safety-critical standards',
    desc: 'We adhere to MISRA-C and industry safety standards (ISO 26262, IEC 61508) for code that meets automotive and industrial safety requirements.',
  },
  {
    title: 'Communication stacks',
    desc: 'CAN, CAN FD, UART, SPI, I2C — we implement protocol stacks for communication between devices, sensors, and cloud backends.',
  },
  {
    title: 'Low-power design',
    desc: 'Sleep modes, wake-on-event, efficient algorithms — we optimize firmware for battery-operated and energy-constrained devices to extend battery life.',
  },
  {
    title: 'Bootloaders and OTA updates',
    desc: 'Secure boot, application bootloaders, and over-the-air (OTA) firmware updates so you can fix bugs and add features remotely without physical access.',
  },
  {
    title: 'Testing and validation',
    desc: 'Unit tests, integration tests, and validation on target hardware — we ensure your firmware is stable, reliable, and ready for production.',
  },
]

export default function EmbeddedFirmware({ id = 'firmware' }) {
  return (
    <section id={id} className="py-12 bg-slate-50 scroll-mt-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Content */}
          <motion.div {...fadeUp}>
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Code className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>What it is:</strong> Embedded firmware is the software that runs on your hardware — the
              low-level code that controls sensors, actuators, communication, and logic. It runs on
              microcontrollers (not full PCs) and must be reliable, efficient, and often real-time.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We deliver production-grade firmware with MISRA-C compliance and expertise in safety-critical
              domains. From bare-metal to RTOS and AUTOSAR, we ensure your product behaves correctly under
              real-world conditions.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <Shield className="text-gold" size={18} />
              What We Deliver
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {CAPABILITIES.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-medium text-slate-800 text-sm">{item.title}</span>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/embedded-firmware.png"
                alt="Embedded firmware - code on embedded device"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
