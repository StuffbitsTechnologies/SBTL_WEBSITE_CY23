import { motion } from 'framer-motion'
import { Zap, CheckCircle2, Globe, Users, Cpu } from 'lucide-react'

const POINTS = [
  {
    icon: Zap,
    title: 'Agile & Fast',
    description: 'Iterative delivery with quick turnarounds. We adapt to your timelines without compromising quality.',
  },
  {
    icon: CheckCircle2,
    title: 'Field-Tested Stack',
    description: 'Proven technologies — STM32, NXP, FreeRTOS, Altium — with production-hardened expertise.',
  },
  {
    icon: Globe,
    title: 'Global Clients',
    description: 'Trusted by 50+ companies across India, Europe, and North America for mission-critical projects.',
  },
  {
    icon: Users,
    title: 'Full-Cycle Partner',
    description: 'From concept to deployment — we own hardware, firmware, and integration under one roof.',
  },
  {
    icon: Cpu,
    title: 'Hardware to Dashboard',
    description: 'End-to-end solutions: embedded devices, cloud connectivity, and web/mobile dashboards.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Why Choose StuffBits
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Quality, agility, and partnership — the pillars of every project we deliver.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {POINTS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-xl border border-slate-200 hover:border-gold/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <Icon className="text-gold" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-navy mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
