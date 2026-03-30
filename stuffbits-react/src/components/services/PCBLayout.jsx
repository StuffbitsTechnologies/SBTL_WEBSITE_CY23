import { motion } from 'framer-motion'
import { Layers, CheckCircle2, Ruler } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
}

const CAPABILITIES = [
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

const TECH_TAGS = ['Altium', 'KiCad', 'High-Speed', 'Impedance Control', 'DFM', 'EMC', 'Gerber']

export default function PCBLayout({ id = 'pcb' }) {
  return (
    <section id={id} className="py-12 bg-white scroll-mt-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Image */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/pcb-layout.png"
                alt="PCB layout design - multi-layer board"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp}>
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Layers className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>What it is:</strong> PCB layout is the physical arrangement of components and copper
              traces on a printed circuit board. A schematic defines what connects to what; layout
              defines where it goes and how. Good layout is critical for signal integrity, EMC, and manufacturability.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We create production-ready layouts from your schematic — whether simple 2-layer boards or
              complex multi-layer designs with high-speed interfaces. Our output is ready for fabrication
              and assembly.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <Ruler className="text-gold" size={18} />
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

            <div className="flex flex-wrap gap-2">
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-100 text-navy rounded border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
