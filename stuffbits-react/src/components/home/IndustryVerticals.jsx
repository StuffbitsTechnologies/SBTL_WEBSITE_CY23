import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Factory, Wifi, Monitor, ArrowRight, PillIcon } from 'lucide-react'

const VERTICALS = [
  {
    id: 'automotive',
    icon: Car,
    title: 'Automotive',
    description: 'On-road, off-road, testing, and AUTOSAR solutions. We deliver embedded systems for ECUs, instrumentation, and connected vehicle applications.',
    highlights: ['ECU Development', 'AUTOSAR', 'EV Electronics', 'Diagnostics'],
  },
  {
    id: 'industrial and IIOT',
    icon: Factory,
    title: 'Industrial and IIOT',
    description: 'Process measurement, instrumentation, and smart manufacturing. Rugged embedded systems for harsh industrial environments. IIOT solutions for industrial automation, process control, and IoT-based systems.',
    highlights: ['Industrial IoT', 'Process Control', 'Instrumentation', 'Industry 4.0', 'IIOT Solutions', 'Industrial Automation', 'IoT-Based Systems'],
  },
  {
    id: 'Pharmaceutical',
    icon: PillIcon,
    title: 'Pharmaceutical',
    description: 'Pharmaceutical solutions for the healthcare industry. We deliver embedded systems for pharmaceutical instrumentation, process control, and IoT-based systems.',
    highlights: ['Pharmaceutical Instrumentation', 'Process Control', 'IoT-Based Systems', 'Pharmaceutical Automation'],
  },
  {
    id: 'digital',
    icon: Monitor,
    title: 'Software Development',
    description: 'We deliver end-to-end software solutions including websites, mobile apps, desktop applications, and IoT-based systems. If your embedded product needs a companion website or app, we build that too — with full-stack development, ongoing maintenance, and support.',
    highlights: ['Web & App Development',  'Desktop Applications', 'IOT-Based Applications','Maintenance & Support'],
  },
]

export default function IndustryVerticals() {
  const [active, setActive] = useState(0)
  const vertical = VERTICALS[active]
  const VerticalIcon = vertical.icon

  return (
    <section id="industries" className="py-20 bg-navy">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Embedded and digital solutions across Automotive, Industrial and IIOT, Pharmaceutical, and Software Development.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {VERTICALS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                active === i
                  ? 'bg-gold text-navy'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                <VerticalIcon className="text-gold" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  {vertical.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{vertical.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {vertical.highlights.map((h, i) => (
                <span
                  key={`${h}-${i}`}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/verticals"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
          >
            Explore All Verticals <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
