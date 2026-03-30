import { motion } from 'framer-motion'
import { Cpu, Code2, Package, Monitor } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SERVICES = [
  {
    title: 'Embedded Hardware (incl. PCB Layout)',
    icon: Cpu,
    accent: 'bg-cyan-500/10 group-hover:bg-cyan-500/15',
    iconColor: 'text-cyan-700',
    tags: [
      'STM32',
      'NXP',
      'ARM Cortex',
      'Sensors',
      'Power Systems',
      'BLE/WiFi',
      'LoRa',
      'Zigbee',
      'Altium',
      'KiCad',
      'High-Speed',
      'Impedance Control',
      'DFM',
      'EMC',
      'Gerber',
    ],
  },
  {
    title: 'Embedded Firmware',
    icon: Code2,
    accent: 'bg-emerald-500/10 group-hover:bg-emerald-500/15',
    iconColor: 'text-emerald-700',
    tags: ['C/C++', 'FreeRTOS', 'Zephyr', 'AUTOSAR', 'MISRA-C', 'CAN', 'CAN FD', 'OTA'],
  },
  {
    title: 'Production',
    icon: Package,
    accent: 'bg-amber-500/10 group-hover:bg-amber-500/15',
    iconColor: 'text-amber-700',
    tags: ['SMT', 'Through-Hole', 'ICT', 'Functional Test', 'DFA', 'Supply Chain', 'BOM'],
  },
  {
    title: 'Software Development',
    icon: Monitor,
    accent: 'bg-blue-500/10 group-hover:bg-blue-500/15',
    iconColor: 'text-blue-700',
    tags: ['React', 'Node.js', 'Golang', 'Java', 'Python', 'REST API', 'Cloud', 'Mobile Apps', 'MQTT'],
  },
]

function TagPill({ children }) {
  return (
    <span className="px-2.5 py-1 text-xs font-mono bg-white text-navy rounded border border-slate-200">
      {children}
    </span>
  )
}

export default function TechStackByService() {
  return (
    <section className="sb-section bg-white">
      <div className="sb-container">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="sb-kicker mb-3">Tech Stack</p>
          <h2 className="sb-h2 mb-4">Technology by Service</h2>
          <p className="sb-lead max-w-3xl mx-auto">
            A quick view of the tools, standards, and technologies we commonly use across each service line.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map(({ title, icon: Icon, tags, accent, iconColor }) => (
            <motion.div key={title} {...fadeUp} className="sb-card p-6 group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${accent}`}>
                  <Icon size={22} className={iconColor} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-navy leading-snug">{title}</h3>
                  <p className="text-slate-500 text-sm mt-1">Common stack (can vary per project)</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

