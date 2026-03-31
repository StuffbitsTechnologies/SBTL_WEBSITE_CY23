import { motion } from 'framer-motion'
import { Cpu, CircuitBoard, CheckCircle2, Layers, Ruler } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
}

const CAPABILITIES = [
  {
    title: 'System architecture and requirements analysis',
    desc: "We define your product's technical blueprint — block diagrams, interfaces, power budget, and component selection to meet performance and cost targets.",
  },
  {
    title: 'MCU and processor selection',
    desc: 'STM32, NXP, Texas Instruments, Nordic — we choose the right microcontroller or SoC for your application, balancing performance, power, and cost.',
  },
  {
    title: 'Sensor integration and signal conditioning',
    desc: 'Temperature, motion, pressure, gas, optical — we integrate sensors with proper amplification, filtering, and ADC interfaces for reliable data capture.',
  },
  {
    title: 'Power supply design',
    desc: 'Battery management, mains AC/DC, PoE, solar — efficient power conversion and distribution for reliable operation in your target environment.',
  },
  {
    title: 'Connectivity modules',
    desc: 'WiFi, BLE, LoRa, Zigbee, cellular (4G/LTE) — we add wireless connectivity for IoT, remote monitoring, and cloud communication.',
  },
  {
    title: 'Prototyping and validation',
    desc: 'We support breadboard-to-prototype builds, debug, and lab validation to ensure hardware meets specifications before moving to production.',
  },
  {
    title: 'Design for manufacturability (DFM)',
    desc: 'Our designs are optimized for PCB fabrication and assembly — reducing cost, improving yield, and speeding up your path to market.',
  },
]

const PCB_CAPABILITIES = [
  {
    title: 'High-speed PCB design',
    desc: 'DDR memory, PCIe, USB 3.0, Ethernet — we design boards where signal integrity matters. Controlled impedance, length matching, and proper grounding ensure reliable data rates.',
  },
  {
    title: 'Multi-layer layouts (4–16 layers)',
    desc: 'Complex designs need multiple copper layers for routing, power planes, and ground. We optimize layer stack-up for signal quality, thermal management, and cost.',
  },
  {
    title: 'Impedance control and signal integrity',
    desc: 'We specify trace widths, stack-up, and materials to achieve target impedance (50Ω, 90Ω, 100Ω) for high-speed interfaces. Simulations and DRC checks prevent signal issues.',
  },
  {
    title: 'Design for manufacture (DFM) and assembly (DFA)',
    desc: 'Our layouts follow fabricator guidelines — minimum trace/space, annular ring, panelization — and assembly rules for pick-and-place and soldering, reducing cost and defects.',
  },
  {
    title: 'Component placement and routing',
    desc: 'Logical grouping, short signal paths, thermal hotspots — we optimize placement and routing for performance, manufacturability, and ease of debug.',
  },
  {
    title: 'Thermal and EMC considerations',
    desc: 'Thermal vias, copper pour, enclosure airflow — we design for heat dissipation. We also consider EMC (EMI mitigation) to meet regulatory standards.',
  },
  {
    title: 'Fabrication outputs',
    desc: 'Gerber (RS-274X), ODB++, drill files, assembly drawings — we deliver all files your fabricator and assembler need for production.',
  },
]

export default function EmbeddedHardware({ id = 'hardware' }) {
  return (
    <section id={id} className="py-12 bg-white scroll-mt-24">
      <div className="max-w-container mx-auto px-6 space-y-14">
        {/* Embedded Hardware */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Image */}
          <motion.div {...fadeUp} className="relative order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/embedded-hardware-hero.png"
                alt="Embedded hardware design - custom PCB and components"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Cpu className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>What it is:</strong> Embedded hardware is the physical electronic system — circuit boards,
              microcontrollers, sensors, power supplies, and connectivity — that runs your product’s software.
              We design this from scratch or refine existing designs.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We deliver robust, scalable embedded systems tailored for Automotive, Industrial, IoT, and Aerospace.
              From concept to prototype, we handle schematic design, component selection, and validation so you
              get a hardware platform ready for firmware development and production.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <CircuitBoard className="text-gold" size={18} />
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
        </div>

        <div className="h-px bg-slate-200" />

        {/* PCB Layout (as part of Embedded Hardware) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Image */}
          <motion.div {...fadeUp} className="relative order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/pcb-layout.png"
                alt="PCB layout design - multi-layer board"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Layers className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>PCB layout:</strong> A schematic defines what connects to what; layout defines where it goes and how.
              Good layout is critical for signal integrity, EMC, and manufacturability.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We create production-ready layouts from your schematic — whether simple 2-layer boards or complex
              multi-layer designs with high-speed interfaces. Our output is ready for fabrication and assembly.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <Ruler className="text-gold" size={18} />
              PCB Layout Deliverables (part of Embedded Hardware)
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {PCB_CAPABILITIES.map((item, i) => (
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
        </div>
      </div>
    </section>
  )
}
